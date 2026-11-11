-- ============================================================
-- COTIZACIONES: ID del clic de Google y término (10-nov-2026)
--
-- Para qué: guardar el gclid/gbraid/wbraid real de cada pedido que
-- llega desde un anuncio, para subirlo a Google Ads como conversión
-- offline («Lead calificado») aunque la persona no acepte cookies.
-- Antes solo se guardaba si hubo clic (true/false), sin el ID.
--
-- Cómo ejecutarlo: Supabase Dashboard → SQL Editor → pegar y Run.
-- Mientras no se corra, la API guarda el pedido sin estas columnas
-- y el ID del clic igual llega en el correo.
-- ============================================================

alter table cotizaciones add column if not exists click_id text;
alter table cotizaciones add column if not exists click_tipo text;
alter table cotizaciones add column if not exists utm_term text;
alter table cotizaciones add column if not exists landing text;
