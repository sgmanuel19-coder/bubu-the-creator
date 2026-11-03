-- ============================================================
-- COTIZACIONES (formulario /cotizar)
--
-- Para qué: guardar cada pedido de cotización de la web. Es la
-- conversión principal de las campañas de Google Ads (evento
-- generate_lead); el aviso llega por correo a Manuel y Roberth.
--
-- Cómo ejecutarlo: Supabase Dashboard → SQL Editor → pegar y Run.
-- Autónoma: no depende de 001-006. Mientras no se corra, los pedidos
-- igual llegan por correo (la API no falla).
-- ============================================================

create table if not exists cotizaciones (
  id bigserial primary key,
  -- C-000001: se completa justo después del insert.
  codigo text unique,

  servicio text not null,
  rango_presupuesto text not null,
  plazo text not null,
  empresa text not null,
  nombre text not null,
  whatsapp text not null,
  email text,
  comentario text,

  -- Origen de la visita (sin datos personales).
  origen text,
  utm_source text,
  utm_campaign text,
  gclid boolean not null default false,
  pagina text,

  -- Seguimiento comercial (se llena a mano desde el dashboard).
  estado text not null default 'nuevo',
  notas text,

  created_at timestamptz not null default now()
);

create index if not exists cotizaciones_created_idx on cotizaciones (created_at desc);

-- ── RLS ─────────────────────────────────────────────────────
-- Datos personales: sin lectura pública. Solo el servidor escribe,
-- con la service_role.
alter table cotizaciones enable row level security;
revoke all on cotizaciones from anon, authenticated;
grant all on cotizaciones to service_role;
grant usage, select on sequence cotizaciones_id_seq to service_role;
