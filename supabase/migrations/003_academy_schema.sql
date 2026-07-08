-- ============================================================
-- RESUELTO ACADEMY — Fase 2: esquema completo
-- Cuentas por alumno, progreso en la nube, comunidad (posts,
-- comentarios, likes) y notificaciones. Con RLS estricto.
--
-- Cómo ejecutarlo: Supabase Dashboard → SQL Editor → pegar y Run.
-- Prefijo academy_ para convivir con las tablas del ICS.
-- ============================================================

-- ── Perfiles (1:1 con auth.users) ───────────────────────────
create table if not exists academy_profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  nombre text not null default '',
  rol text not null default 'alumno' check (rol in ('alumno', 'admin')),
  created_at timestamptz not null default now()
);

-- Perfil automático al registrarse un usuario.
create or replace function academy_handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into academy_profiles (id, nombre)
  values (new.id, coalesce(new.raw_user_meta_data ->> 'nombre', ''))
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists academy_on_auth_user_created on auth.users;
create trigger academy_on_auth_user_created
  after insert on auth.users
  for each row execute function academy_handle_new_user();

-- ¿El usuario actual es admin? (security definer para usar en policies)
create or replace function academy_es_admin()
returns boolean
language sql
security definer set search_path = public
stable
as $$
  select exists (
    select 1 from academy_profiles
    where id = auth.uid() and rol = 'admin'
  );
$$;

-- ── Progreso por alumno (reemplaza el localStorage) ─────────
create table if not exists academy_progreso (
  user_id uuid not null references academy_profiles (id) on delete cascade,
  youtube_id text not null,
  visto_at timestamptz not null default now(),
  primary key (user_id, youtube_id)
);

-- ── Comunidad: publicaciones, comentarios y likes ───────────
create table if not exists academy_posts (
  id uuid primary key default gen_random_uuid (),
  user_id uuid not null references academy_profiles (id) on delete cascade,
  texto text not null check (char_length(texto) between 1 and 4000),
  fijado boolean not null default false, -- solo admin (comentario destacado)
  created_at timestamptz not null default now()
);

create table if not exists academy_comentarios (
  id uuid primary key default gen_random_uuid (),
  post_id uuid not null references academy_posts (id) on delete cascade,
  user_id uuid not null references academy_profiles (id) on delete cascade,
  texto text not null check (char_length(texto) between 1 and 2000),
  created_at timestamptz not null default now()
);

create table if not exists academy_likes (
  post_id uuid not null references academy_posts (id) on delete cascade,
  user_id uuid not null references academy_profiles (id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (post_id, user_id)
);

-- ── Notificaciones por usuario ──────────────────────────────
create table if not exists academy_notificaciones (
  id uuid primary key default gen_random_uuid (),
  user_id uuid not null references academy_profiles (id) on delete cascade,
  titulo text not null,
  texto text not null default '',
  url text not null default '',
  leida boolean not null default false,
  created_at timestamptz not null default now()
);

create index if not exists academy_notif_user_idx
  on academy_notificaciones (user_id, leida, created_at desc);
create index if not exists academy_comentarios_post_idx
  on academy_comentarios (post_id, created_at);
create index if not exists academy_posts_created_idx
  on academy_posts (created_at desc);

-- ── RLS ─────────────────────────────────────────────────────
alter table academy_profiles enable row level security;
alter table academy_progreso enable row level security;
alter table academy_posts enable row level security;
alter table academy_comentarios enable row level security;
alter table academy_likes enable row level security;
alter table academy_notificaciones enable row level security;

-- Perfiles: todos los alumnos se ven entre sí (directorio de miembros);
-- cada uno edita su nombre; el rol solo lo cambia el service role.
create policy "perfiles visibles para alumnos" on academy_profiles
  for select to authenticated using (true);
create policy "editar mi perfil" on academy_profiles
  for update to authenticated
  using (id = auth.uid())
  with check (id = auth.uid() and rol = (select rol from academy_profiles p where p.id = auth.uid()));

-- Progreso: privado de cada alumno (el admin lo lee vía service role).
create policy "mi progreso - leer" on academy_progreso
  for select to authenticated using (user_id = auth.uid());
create policy "mi progreso - marcar" on academy_progreso
  for insert to authenticated with check (user_id = auth.uid());
create policy "mi progreso - desmarcar" on academy_progreso
  for delete to authenticated using (user_id = auth.uid());

-- Posts: leen todos los alumnos; publica cada uno el suyo; borra el autor
-- o un admin; "fijado" solo lo toca un admin.
create policy "posts - leer" on academy_posts
  for select to authenticated using (true);
create policy "posts - crear" on academy_posts
  for insert to authenticated with check (user_id = auth.uid() and fijado = false);
create policy "posts - borrar" on academy_posts
  for delete to authenticated using (user_id = auth.uid() or academy_es_admin());
create policy "posts - fijar (admin)" on academy_posts
  for update to authenticated using (academy_es_admin()) with check (academy_es_admin());

-- Comentarios: leen todos; comenta cada uno; borra autor o admin.
create policy "comentarios - leer" on academy_comentarios
  for select to authenticated using (true);
create policy "comentarios - crear" on academy_comentarios
  for insert to authenticated with check (user_id = auth.uid());
create policy "comentarios - borrar" on academy_comentarios
  for delete to authenticated using (user_id = auth.uid() or academy_es_admin());

-- Likes: leen todos; cada uno da/quita el suyo.
create policy "likes - leer" on academy_likes
  for select to authenticated using (true);
create policy "likes - dar" on academy_likes
  for insert to authenticated with check (user_id = auth.uid());
create policy "likes - quitar" on academy_likes
  for delete to authenticated using (user_id = auth.uid());

-- Notificaciones: cada uno lee/marca las suyas; las crea el admin
-- (service role desde el panel, sin policy de insert para alumnos).
create policy "notif - leer mias" on academy_notificaciones
  for select to authenticated using (user_id = auth.uid());
create policy "notif - marcar leida" on academy_notificaciones
  for update to authenticated
  using (user_id = auth.uid()) with check (user_id = auth.uid());

-- ── Storage: bucket para los descargables de la bóveda ──────
insert into storage.buckets (id, name, public)
values ('academy-recursos', 'academy-recursos', false)
on conflict (id) do nothing;

create policy "recursos - descargar (alumnos)" on storage.objects
  for select to authenticated using (bucket_id = 'academy-recursos');
create policy "recursos - subir (admin)" on storage.objects
  for insert to authenticated
  with check (bucket_id = 'academy-recursos' and academy_es_admin());
create policy "recursos - borrar (admin)" on storage.objects
  for delete to authenticated
  using (bucket_id = 'academy-recursos' and academy_es_admin());
