-- ============================================================
-- LIBRO DE RECLAMACIONES VIRTUAL
--
-- Para qué: el Código de Protección y Defensa del Consumidor
-- (Ley 29571) y su reglamento (D.S. 011-2011-PCM, modificado por
-- el D.S. 101-2022-PCM) obligan a tener el libro y a conservar cada
-- hoja al menos 2 años. El id es el número correlativo de la hoja.
--
-- Cómo ejecutarlo: Supabase Dashboard → SQL Editor → pegar y Run.
-- Autónoma: no depende de 001-005.
-- ============================================================

create table if not exists libro_reclamaciones (
  -- Correlativo de la hoja (000001-2026…). bigserial no reutiliza
  -- números aunque se borre una fila, que es lo que pide la norma.
  id bigserial primary key,
  -- Se completa justo después del insert, cuando ya se conoce el id.
  codigo text unique,

  -- 1. Consumidor
  nombre text not null,
  tipo_documento text not null,
  numero_documento text not null,
  domicilio text not null,
  telefono text,
  email text not null,
  menor_de_edad boolean not null default false,
  apoderado text,

  -- 2. Bien contratado
  tipo_bien text not null check (tipo_bien in ('producto', 'servicio')),
  monto numeric(12, 2),
  descripcion_bien text not null,

  -- 3. Reclamo o queja
  tipo text not null check (tipo in ('reclamo', 'queja')),
  detalle text not null,
  pedido text not null,

  -- 4. Respuesta del proveedor (se llena a mano desde el dashboard)
  respuesta text,
  respondido_at timestamptz,

  created_at timestamptz not null default now()
);

create index if not exists libro_reclamaciones_created_idx
  on libro_reclamaciones (created_at desc);

-- ── RLS ─────────────────────────────────────────────────────
-- Datos personales: sin lectura pública. Solo el servidor escribe,
-- con la service_role.
alter table libro_reclamaciones enable row level security;
revoke all on libro_reclamaciones from anon, authenticated;
grant all on libro_reclamaciones to service_role;
grant usage, select on sequence libro_reclamaciones_id_seq to service_role;
