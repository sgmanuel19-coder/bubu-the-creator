-- =============================================================
-- RESUELTO / IA CONTENT SYSTEM — Schema + RLS
-- Ejecutar en el SQL Editor de Supabase (o supabase db push)
-- =============================================================

-- ---------- TABLAS ----------

create table public.clients (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  logo_url text,
  brand_colors jsonb,
  social_links jsonb,
  contacts jsonb,
  brand_kit_links jsonb,
  formats jsonb not null default '[]',
  monthly_deliverables int,
  created_at timestamptz not null default now()
);

create table public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  role text not null check (role in ('admin', 'team', 'client')),
  client_id uuid references public.clients (id) on delete set null,
  full_name text not null default '',
  email text not null default '',
  created_at timestamptz not null default now(),
  constraint client_needs_client_id check (role <> 'client' or client_id is not null)
);

create table public.grids (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null references public.clients (id) on delete cascade,
  month date not null,
  status text not null default 'borrador' check (status in ('borrador', 'presentada', 'aprobada')),
  presented_at timestamptz,
  approved_at timestamptz,
  created_at timestamptz not null default now(),
  unique (client_id, month)
);

create table public.content_pieces (
  id uuid primary key default gen_random_uuid(),
  grid_id uuid references public.grids (id) on delete set null,
  client_id uuid not null references public.clients (id) on delete cascade,
  code text not null,
  title text not null,
  format text,
  type text not null default 'reel' check (type in ('reel', 'carrusel', 'imagen', 'story')),
  platforms text[] not null default '{}',
  funnel_level text not null default 'TOF' check (funnel_level in ('TOF', 'MOF', 'BOF')),
  complexity text not null default 'media' check (complexity in ('baja', 'media', 'alta')),
  duration_target text,
  assignee text,
  scheduled_date date,
  date_confirmed boolean not null default false,
  rescheduled_reason text,
  status text not null default 'planificado' check (status in (
    'planificado','en_guion','concepto_en_revision','concepto_aprobado',
    'en_produccion','pieza_en_revision','correcciones','aprobado','publicado')),
  idea_description text,
  script text,
  copy_out text,
  hashtags text,
  drive_link text,
  current_version int not null default 1,
  revision_rounds int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index content_pieces_client_date on public.content_pieces (client_id, scheduled_date);
create index content_pieces_status on public.content_pieces (status);

create table public.piece_versions (
  id uuid primary key default gen_random_uuid(),
  piece_id uuid not null references public.content_pieces (id) on delete cascade,
  version_number int not null,
  snapshot jsonb not null,
  created_by uuid references public.profiles (id),
  created_at timestamptz not null default now()
);

create table public.storyboard_frames (
  id uuid primary key default gen_random_uuid(),
  piece_id uuid not null references public.content_pieces (id) on delete cascade,
  position int not null default 0,
  image_url text,
  what_we_see text not null default '',
  what_we_say text not null default '',
  duration_seconds int
);

create index storyboard_frames_piece on public.storyboard_frames (piece_id, position);

create table public.approvals (
  id uuid primary key default gen_random_uuid(),
  piece_id uuid not null references public.content_pieces (id) on delete cascade,
  stage text not null check (stage in ('concepto', 'final', 'grilla')),
  requested_at timestamptz not null default now(),
  deadline date,
  status text not null default 'pending' check (status in ('pending', 'approved', 'changes_requested', 'auto_approved')),
  responded_by uuid references public.profiles (id),
  responded_at timestamptz,
  note text,
  out_of_scope boolean not null default false
);

create index approvals_piece on public.approvals (piece_id);
create index approvals_pending on public.approvals (status) where status = 'pending';

create table public.comments (
  id uuid primary key default gen_random_uuid(),
  piece_id uuid not null references public.content_pieces (id) on delete cascade,
  user_id uuid not null references public.profiles (id),
  body text not null,
  resolved boolean not null default false,
  created_at timestamptz not null default now()
);

create index comments_piece on public.comments (piece_id, created_at);

create table public.requests (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null references public.clients (id) on delete cascade,
  direction text not null check (direction in ('client_to_agency', 'agency_to_client')),
  title text not null,
  description text,
  status text not null default 'abierto' check (status in ('abierto', 'en_proceso', 'hecho')),
  due_date date,
  created_by uuid not null references public.profiles (id),
  created_at timestamptz not null default now()
);

create table public.piece_metrics (
  id uuid primary key default gen_random_uuid(),
  piece_id uuid not null references public.content_pieces (id) on delete cascade,
  reach int,
  likes int,
  comments_count int,
  shares int,
  saves int,
  watch_time text,
  measured_at date not null default current_date
);

create table public.account_metrics (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null references public.clients (id) on delete cascade,
  month date not null,
  followers int,
  total_reach int,
  engagement_rate numeric,
  notes text,
  unique (client_id, month)
);

create table public.activity_log (
  id uuid primary key default gen_random_uuid(),
  actor uuid references public.profiles (id),
  action text not null,
  entity text not null,
  entity_id uuid,
  client_id uuid,
  detail jsonb,
  created_at timestamptz not null default now()
);

create index activity_log_client on public.activity_log (client_id, created_at desc);

-- ---------- updated_at automático ----------

create or replace function public.touch_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end $$;

create trigger content_pieces_touch
  before update on public.content_pieces
  for each row execute function public.touch_updated_at();

-- ---------- HELPERS para RLS ----------

create or replace function public.ics_role()
returns text language sql stable security definer set search_path = public as $$
  select role from public.profiles where id = auth.uid()
$$;

create or replace function public.ics_client_id()
returns uuid language sql stable security definer set search_path = public as $$
  select client_id from public.profiles where id = auth.uid()
$$;

create or replace function public.ics_is_staff()
returns boolean language sql stable security definer set search_path = public as $$
  select exists (
    select 1 from public.profiles
    where id = auth.uid() and role in ('admin', 'team')
  )
$$;

-- ---------- RLS ----------

alter table public.clients enable row level security;
alter table public.profiles enable row level security;
alter table public.grids enable row level security;
alter table public.content_pieces enable row level security;
alter table public.piece_versions enable row level security;
alter table public.storyboard_frames enable row level security;
alter table public.approvals enable row level security;
alter table public.comments enable row level security;
alter table public.requests enable row level security;
alter table public.piece_metrics enable row level security;
alter table public.account_metrics enable row level security;
alter table public.activity_log enable row level security;

-- clients: staff todo; cliente solo su marca
create policy clients_select on public.clients for select
  using (public.ics_is_staff() or id = public.ics_client_id());
create policy clients_write on public.clients for all
  using (public.ics_is_staff()) with check (public.ics_is_staff());

-- profiles: cada quien ve el suyo; staff ve todos; escritura solo vía service role
create policy profiles_select on public.profiles for select
  using (id = auth.uid() or public.ics_is_staff());

-- grids
create policy grids_select on public.grids for select
  using (public.ics_is_staff() or client_id = public.ics_client_id());
create policy grids_write on public.grids for all
  using (public.ics_is_staff()) with check (public.ics_is_staff());
-- cliente puede aprobar su grilla (update de status)
create policy grids_client_update on public.grids for update
  using (client_id = public.ics_client_id())
  with check (client_id = public.ics_client_id());

-- content_pieces
create policy pieces_select on public.content_pieces for select
  using (public.ics_is_staff() or client_id = public.ics_client_id());
create policy pieces_write on public.content_pieces for all
  using (public.ics_is_staff()) with check (public.ics_is_staff());

-- piece_versions
create policy versions_select on public.piece_versions for select
  using (public.ics_is_staff() or exists (
    select 1 from public.content_pieces p
    where p.id = piece_id and p.client_id = public.ics_client_id()));
create policy versions_write on public.piece_versions for all
  using (public.ics_is_staff()) with check (public.ics_is_staff());

-- storyboard_frames
create policy frames_select on public.storyboard_frames for select
  using (public.ics_is_staff() or exists (
    select 1 from public.content_pieces p
    where p.id = piece_id and p.client_id = public.ics_client_id()));
create policy frames_write on public.storyboard_frames for all
  using (public.ics_is_staff()) with check (public.ics_is_staff());

-- approvals: cliente ve y responde las de sus piezas
create policy approvals_select on public.approvals for select
  using (public.ics_is_staff() or exists (
    select 1 from public.content_pieces p
    where p.id = piece_id and p.client_id = public.ics_client_id()));
create policy approvals_staff_write on public.approvals for all
  using (public.ics_is_staff()) with check (public.ics_is_staff());
create policy approvals_client_respond on public.approvals for update
  using (exists (
    select 1 from public.content_pieces p
    where p.id = piece_id and p.client_id = public.ics_client_id()))
  with check (exists (
    select 1 from public.content_pieces p
    where p.id = piece_id and p.client_id = public.ics_client_id()));

-- comments: todos los del cliente/staff pueden comentar en piezas visibles
create policy comments_select on public.comments for select
  using (public.ics_is_staff() or exists (
    select 1 from public.content_pieces p
    where p.id = piece_id and p.client_id = public.ics_client_id()));
create policy comments_insert on public.comments for insert
  with check (user_id = auth.uid() and (public.ics_is_staff() or exists (
    select 1 from public.content_pieces p
    where p.id = piece_id and p.client_id = public.ics_client_id())));
create policy comments_update on public.comments for update
  using (user_id = auth.uid() or public.ics_is_staff());

-- requests
create policy requests_select on public.requests for select
  using (public.ics_is_staff() or client_id = public.ics_client_id());
create policy requests_insert on public.requests for insert
  with check (created_by = auth.uid() and (public.ics_is_staff() or client_id = public.ics_client_id()));
create policy requests_update on public.requests for update
  using (public.ics_is_staff() or client_id = public.ics_client_id());

-- metrics
create policy piece_metrics_select on public.piece_metrics for select
  using (public.ics_is_staff() or exists (
    select 1 from public.content_pieces p
    where p.id = piece_id and p.client_id = public.ics_client_id()));
create policy piece_metrics_write on public.piece_metrics for all
  using (public.ics_is_staff()) with check (public.ics_is_staff());

create policy account_metrics_select on public.account_metrics for select
  using (public.ics_is_staff() or client_id = public.ics_client_id());
create policy account_metrics_write on public.account_metrics for all
  using (public.ics_is_staff()) with check (public.ics_is_staff());

-- activity_log: staff ve todo; cliente ve lo de su marca; inserta cualquiera autenticado
create policy activity_select on public.activity_log for select
  using (public.ics_is_staff() or client_id = public.ics_client_id());
create policy activity_insert on public.activity_log for insert
  with check (auth.uid() is not null);

-- ---------- STORAGE: bucket de storyboards ----------

insert into storage.buckets (id, name, public)
values ('storyboards', 'storyboards', true)
on conflict (id) do nothing;

create policy storyboards_read on storage.objects for select
  using (bucket_id = 'storyboards');
create policy storyboards_staff_insert on storage.objects for insert
  with check (bucket_id = 'storyboards' and public.ics_is_staff());
create policy storyboards_staff_update on storage.objects for update
  using (bucket_id = 'storyboards' and public.ics_is_staff());
create policy storyboards_staff_delete on storage.objects for delete
  using (bucket_id = 'storyboards' and public.ics_is_staff());

-- ---------- REALTIME ----------

alter publication supabase_realtime add table public.content_pieces;
alter publication supabase_realtime add table public.comments;
alter publication supabase_realtime add table public.approvals;
