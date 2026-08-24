-- ============================================================
-- LA NOTICIA — archivo permanente
--
-- La portada solo muestra 7 días (DIAS_MAXIMOS en feed.ts) y no
-- guarda nada: cada regeneración relee los RSS y arma la portada
-- de cero, así que lo viejo desaparece. Esta tabla es la memoria:
-- el cron diario vuelca aquí todo lo publicable antes de que la
-- ventana lo tire.
--
-- Cómo ejecutarlo: Supabase Dashboard → SQL Editor → pegar y Run.
-- Es autónoma: NO depende de 001/002 (ICS) ni de 003 (Academy).
-- ============================================================

create table if not exists noticias_archivo (
  -- Misma huella que usa el portal en memoria: "fuenteId:url".
  -- Es lo que hace el volcado idempotente: el cron puede correr
  -- diez veces el mismo día sin duplicar una sola nota.
  id text primary key,

  titulo text not null,
  extracto text not null default '',
  url text not null,
  imagen text,
  fecha timestamptz not null,

  -- Los datos de la fuente van desnormalizados a propósito: el
  -- registro de fuentes vive en TypeScript (fuentes.ts), no en la
  -- base. Si algún día se cae un medio o le cambia el nombre, el
  -- archivo tiene que seguir contando qué se publicó y de dónde.
  fuente_id text not null,
  fuente_nombre text not null,
  fuente_corto text not null,
  fuente_sitio text not null,
  fuente_idioma text not null default 'es' check (fuente_idioma in ('es', 'en')),

  seccion text not null,
  puntaje integer not null default 0,

  -- Título normalizado y recortado: sirve para detectar la misma
  -- nota rebotada por dos medios. Va SIN unique a propósito — dos
  -- notas distintas pueden compartir los primeros 55 caracteres, y
  -- un choque no debe hacer fallar el volcado entero. El dedupe de
  -- verdad se hace al leer, con deduplicar() en feed.ts.
  huella text not null,

  archivado_at timestamptz not null default now()
);

create index if not exists noticias_archivo_fecha_idx
  on noticias_archivo (fecha desc);
create index if not exists noticias_archivo_seccion_fecha_idx
  on noticias_archivo (seccion, fecha desc);
create index if not exists noticias_archivo_huella_idx
  on noticias_archivo (huella);
create index if not exists noticias_archivo_fuente_idx
  on noticias_archivo (fuente_id, fecha desc);

-- ── RLS ─────────────────────────────────────────────────────
-- El archivo es público: son titulares y enlaces que ya salieron
-- en la portada. Lectura para cualquiera; escritura solo desde el
-- cron, que usa la service_role key y se salta RLS por diseño.
alter table noticias_archivo enable row level security;

drop policy if exists "noticias_archivo lectura publica" on noticias_archivo;
create policy "noticias_archivo lectura publica"
  on noticias_archivo for select
  to anon, authenticated
  using (true);

-- Permisos explícitos a nivel de tabla.
--
-- RLS y GRANT son dos capas distintas y hacen falta LAS DOS: una
-- policy de select no sirve de nada si el rol no tiene el GRANT.
-- Si al crear el proyecto se desmarcó "Automatically expose new
-- tables" (Supabase lo recomienda), los privilegios por defecto NO
-- se otorgan y sin estas líneas la tabla responde "permission
-- denied" — incluso al cron. Dejarlo escrito acá hace que la
-- migración funcione con esa casilla marcada o desmarcada.
grant usage on schema public to anon, authenticated, service_role;
grant select on noticias_archivo to anon, authenticated;
grant all on noticias_archivo to service_role;
