-- =============================================================
-- RESUELTO / IA CONTENT SYSTEM — Seed: clientes reales
-- =============================================================

insert into public.clients (name, slug, formats, monthly_deliverables, social_links)
values
  (
    'WIN Internet',
    'win-internet',
    '[
      {"prefix": "OA", "name": "Objetos Animados", "duration": "30-50s"},
      {"prefix": "WP", "name": "Winnerpedia", "duration": "40-55s"},
      {"prefix": "PR", "name": "Q&A", "duration": "30-50s"},
      {"prefix": "TR", "name": "Trends", "duration": "15-40s"}
    ]'::jsonb,
    11,
    '{"tiktok": "https://www.tiktok.com/@win.internet"}'::jsonb
  ),
  (
    'Wellmax',
    'wellmax',
    '[
      {"prefix": "WX", "name": "Pieza multicanal"}
    ]'::jsonb,
    12,
    '{}'::jsonb
  )
on conflict (slug) do nothing;
