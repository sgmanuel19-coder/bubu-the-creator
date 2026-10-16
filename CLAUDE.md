# RESUELTO — Sitio principal (resueltoagency.com)

Monorepo Next.js 16 (App Router) de Manuel Severo. Deploy en Vercel
(proyecto `bubuthecreator`), auto-deploy con `git push` a main.
GitHub: `sgmanuel19-coder/bubu-the-creator`.

## Qué vive aquí (3 productos en un repo)

| Ruta | Qué es | Estado |
|---|---|---|
| `/` + `/casos`, `/servicios`, `/sobre-mi`, `/academy` | Landing de Resuelto Agency | Producción |
| `/sistemas-ia` | Redirect 308 → `/servicios` (landing absorbida por las tarjetas de automatización) | Redirect |
| `/appstudio/*` | **RESUELTO IA Studio** (modo comunidad, claves de cada usuario). Proyecto Vercel aparte `resuelto-appstudio` con `basePath: /appstudio`; aquí solo hay un `rewrites()` en `next.config.ts` | Producción |
| `/empezar`, `/masterclass` | Embudos de pauta de la Academy (noindex). Datos en `lib/academy/content.ts`, leads en `/api/registro` | Producción |
| `/ia-content-system/*` | Portal cliente-agencia (Supabase) | Deployado, Supabase caído |

## RESUELTO Academy → Skool

El portal `/taller` se eliminó el 2026-10-14: la Academy vive en Skool
(https://www.skool.com/the-ai-creative-process-3410). `/academy` redirige ahí.
No volver a crear rutas `/taller`.

## RESUELTO IA Studio (`/appstudio`)

- Código: copia de distribución `Documents/Codex/.../outputs/resuelto-studio-appstudio`
  (generada con `npm run package:community` desde `ugc-avatar-studio`, más
  `basePath`, rutas `/appstudio/...` en el cliente y `serverActions.allowedOrigins`).
- Deploy: `vercel deploy --prod --yes` desde esa carpeta. Env: `NEXT_PUBLIC_STUDIO_MODE=community`,
  `HF_API_BASE_URL`, `HF_COOKIE_SECRET` (sensible). Nunca `local` ni claves del dueño.

## Reglas del repo

1. La separación por dominio se maneja en `middleware.ts` — NO agregar
   `redirect()` en `app/page.tsx`.
2. El header `Cache-Control: immutable` de `/_next/static` aplica SOLO en
   producción (en dev rompe HMR/hidratación) — ya condicionado en
   `next.config.ts`. No quitar la condición.
3. CSP en `next.config.ts`: si se embebe un origen nuevo en iframe,
   agregarlo a `frame-src`.
4. Identidad visual del sitio: tokens en `app/globals.css` (`--bg` #0D0C08,
   `--cream` #F4F0DE, azul `--green` #1A80FF, Inter).
5. Probar con `npm run build` antes de push (el push a main deploya solo).

## Env vars (Vercel)

`TALLER_N8N_WEBHOOK` (leads de /api/registro, opcional) ·
`TALLER_LEADS_EMAIL` (respaldo leads, default sgmanuel19@gmail.com) ·
`NEXT_PUBLIC_FACEBOOK_PIXEL_ID` · `NEXT_PUBLIC_SUPABASE_URL` +
`NEXT_PUBLIC_SUPABASE_ANON_KEY` + `SUPABASE_SERVICE_ROLE_KEY` (ICS/Fase 2).
