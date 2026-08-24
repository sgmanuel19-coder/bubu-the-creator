-- ============================================================
-- LA NOTICIA — suscriptores de la newsletter
--
-- Para qué: hoy el lector entra, hace clic a Xataka y no vuelve.
-- Esta tabla es lo que convierte tráfico de paso en audiencia
-- propia, que es lo que hace falta para vender la Academia.
--
-- Cómo ejecutarlo: Supabase Dashboard → SQL Editor → pegar y Run.
-- Autónoma: no depende de 001-004.
-- ============================================================

create table if not exists noticias_suscriptores (
  id uuid primary key default gen_random_uuid(),

  -- Se guarda siempre en minúsculas y sin espacios (lo normaliza la
  -- API antes de insertar). Único para que reenviar el formulario no
  -- duplique a nadie.
  email text not null unique,

  -- De dónde vino: "portada", "produccion", "plataformas"… Sirve para
  -- saber qué página convierte y no adivinar.
  origen text not null default 'portada',

  -- Baja sin borrar la fila: si alguien se da de baja y vuelve a
  -- suscribirse queremos saberlo, y borrar perdería esa historia.
  activo boolean not null default true,

  -- Token para el enlace de baja del correo. Es obligatorio en
  -- cualquier envío masivo, y con esto la baja es un solo clic sin
  -- pedir contraseña.
  token_baja uuid not null default gen_random_uuid(),

  created_at timestamptz not null default now(),
  baja_at timestamptz
);

create index if not exists noticias_suscriptores_activo_idx
  on noticias_suscriptores (activo, created_at desc);
create unique index if not exists noticias_suscriptores_token_idx
  on noticias_suscriptores (token_baja);

-- ── RLS ─────────────────────────────────────────────────────
-- Al revés que el archivo: acá NO hay lectura pública. Una lista de
-- correos legible por cualquiera con la llave del navegador sería
-- una filtración de datos personales. Todo pasa por el servidor con
-- la service_role, que se salta RLS por diseño.
alter table noticias_suscriptores enable row level security;

-- Sin ninguna policy, anon y authenticated no pueden hacer nada.
-- Es intencional: no agregar policies de lectura acá.

revoke all on noticias_suscriptores from anon, authenticated;
grant all on noticias_suscriptores to service_role;
