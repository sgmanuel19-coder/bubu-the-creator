# RESUELTO — Sitio principal (resueltoagency.com)

Monorepo Next.js 16 (App Router) de Manuel Severo. Deploy en Vercel
(proyecto `bubuthecreator`), auto-deploy con `git push` a main.
GitHub: `sgmanuel19-coder/bubu-the-creator`.

## Qué vive aquí (3 productos en un repo)

| Ruta | Qué es | Estado |
|---|---|---|
| `/` + `/casos`, `/servicios`, `/sobre-mi`, `/academy` | Landing de Resuelto Agency | Producción |
| `/sistemas-ia` | Redirect 308 → `/servicios` (landing absorbida por las tarjetas de automatización) | Redirect |
| `/taller/*` | **RESUELTO Academy**: landing de venta + plataforma de cursos de la Masterclass de Creatividad Publicitaria IA | Producción |
| `/ia-content-system/*` | Portal cliente-agencia (Supabase) | Deployado, Supabase caído |

## RESUELTO Academy (`/taller`) — reglas críticas

- **Todo el contenido editable vive en `lib/taller/content.ts`** (cursos,
  módulos, lecciones con IDs de YouTube ocultos, recursos de la bóveda,
  precios, FAQ, sesiones del calendario, novedades). Editar ahí + redeploy.
- **Acceso**: contraseña compartida en env `TALLER_PASSWORD` (Vercel).
  Cookie = SHA-256 (`lib/taller/auth.ts`). Todo `/taller/*` es PÚBLICO en
  modo "vista previa con candado": cada página lee la sesión server-side
  (`lib/taller/session.ts` → `estaDesbloqueado()`) y solo renderiza el
  contenido real (iframes de video, links de descarga) si hay sesión.
  **Nunca** filtrar contenido real al público.
- **Nav del portal usa `<a>` (navegación real), NO `<Link>`**: el Router
  Cache de Next cachea por ruta sin distinguir sesión y re-bloquea pestañas
  a alumnos logueados. Bug ya resuelto — no reintroducir `<Link>` ahí.
- **Copy de la landing**: sigue reglas de posicionamiento estrictas
  (Obsidian → `RESUELTO CEREBRO MADRE/TALLERES/MASTERCLASS CREATIVIDAD
  PUBLICITARIA IA/06 - Brief...`): liderar con estrategia/Cerebro Creativo
  (nunca "aprende IA"), Biblia como bono estrella, ancla $2,000, GPTs son
  "de mi proceso" (nunca "los creé"), urgencia solo real, CTA vivo →
  WhatsApp / CTA grabado → Hotmart (`gate.productos.grabado.hotmartUrl`).
- **Asistente Bubu**: 100% offline (`lib/taller/bubu.ts`); modo "ventas" en
  `/taller` (no revela detalle de módulos) y modo "curso" adentro.
- **Leads del registro**: `/api/taller/registro` → n8n (`TALLER_N8N_WEBHOOK`)
  con respaldo a correo vía FormSubmit (`TALLER_LEADS_EMAIL`).
- **Fase 2 (pendiente de claves de Supabase)**: plan completo en
  `docs/superpowers/specs/2026-07-07-fase2-supabase-plan.md` + esquema en
  `supabase/migrations/003_academy_schema.sql`.

## Reglas del repo

1. La separación por dominio se maneja en `middleware.ts` — NO agregar
   `redirect()` en `app/page.tsx`.
2. El header `Cache-Control: immutable` de `/_next/static` aplica SOLO en
   producción (en dev rompe HMR/hidratación) — ya condicionado en
   `next.config.ts`. No quitar la condición.
3. CSP en `next.config.ts`: si se embebe un origen nuevo en iframe,
   agregarlo a `frame-src`.
4. Identidad visual del sitio: tokens en `app/globals.css` (`--bg` #0D0C08,
   `--cream` #F4F0DE, azul `--green` #1A80FF, Inter). El portal usa
   `.taller-root` (cursor normal).
5. Probar con `npm run build` antes de push (el push a main deploya solo).

## Env vars (Vercel)

`TALLER_PASSWORD` (acceso alumnos) · `TALLER_N8N_WEBHOOK` (leads, opcional) ·
`TALLER_LEADS_EMAIL` (respaldo leads, default sgmanuel19@gmail.com) ·
`NEXT_PUBLIC_FACEBOOK_PIXEL_ID` · `NEXT_PUBLIC_SUPABASE_URL` +
`NEXT_PUBLIC_SUPABASE_ANON_KEY` + `SUPABASE_SERVICE_ROLE_KEY` (ICS/Fase 2).
