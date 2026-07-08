# Fase 2 — Supabase para RESUELTO Academy (plan listo para ejecutar)

Documento autocontenido. Cualquier sesión de Claude puede ejecutar esta fase
sin contexto previo. El frontend ya está preparado (portal en `/taller`,
progreso en `lib/taller/progress.ts`, gamificación en `lib/taller/gamificacion.ts`).

## Prerrequisito (lo hace Manuel, 5 minutos)

1. supabase.com → New project: nombre `resuelto-academy`, región São Paulo, plan Free.
2. Settings → API: copiar **Project URL**, **anon key** y **service_role key**.
3. El mismo proyecto sirve también para revivir el IA Content System
   (migraciones 001/002 de esta carpeta).

## Paso 1 — Configuración

- Ejecutar `supabase/migrations/003_academy_schema.sql` en el SQL Editor
  (crea perfiles, progreso, posts, comentarios, likes, notificaciones,
  bucket `academy-recursos`, RLS completo).
- Env vars (local `.env.local` + Vercel production):
  `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`,
  `SUPABASE_SERVICE_ROLE_KEY` (ya existen los nombres por el ICS — actualizar valores).
- Crear el usuario admin de Manuel vía Admin API (email sgmanuel19@gmail.com),
  luego `update academy_profiles set rol='admin' where id='<uuid>';`
- Keep-alive anti-pausa del plan Free: cron de Vercel (`vercel.json`) que haga
  un select trivial diario, o workflow n8n Schedule+HTTP.

## Paso 2 — Auth por alumno (reemplaza la contraseña compartida)

- Cuando Manuel vende, crea el alumno desde su panel (email + contraseña
  generada) → se la envía por correo como hoy.
- `LoginModal` pasa a email+contraseña contra Supabase Auth (mantener la
  contraseña compartida como fallback temporal vía env hasta migrar a todos).
- `estaDesbloqueado()` en `lib/taller/session.ts` pasa a validar la sesión de
  Supabase (patrón ya existente en `middleware.ts` para el ICS).
- Al primer login, migrar el progreso de localStorage → `academy_progreso`
  (leer `taller_vistas_v1`, insertar, limpiar).

## Paso 3 — Features (en orden de valor)

1. **Progreso en la nube**: `lib/taller/progress.ts` cambia sus 4 funciones a
   lecturas/escrituras de `academy_progreso` (los componentes no se tocan —
   fue diseñado así).
2. **Comunidad en Novedades**: feed de `academy_posts` (crear, comentar,
   like, borrar propio; admin fija posts). El mock visual ya existe en
   `ChatStreamer` (EnVivoClient) como referencia de estilo, y la página
   `/taller/novedades` es donde vive.
3. **Panel admin `/taller/admin`**: gate por `academy_profiles.rol='admin'`.
   Métricas (alumnos, activos, % avance por alumno), alta/baja de alumnos,
   publicar novedades/notificaciones, subir archivos al bucket
   `academy-recursos` (bóveda autogestionada → completa `RecursoDetalle`).
4. **Leaderboard**: la gamificación ya calcula XP por vistas
   (`calcularGamificacion`); con `academy_progreso` global es un `group by`.
5. **Conectados en tiempo real**: Supabase Realtime Presence en un channel
   `academy` → contador en `GamificacionHeader`/`ComunidadCard`.
6. **Notificaciones**: campana en `PortalNav` leyendo `academy_notificaciones`.

## Reglas a respetar

- El contenido editable sigue en `lib/taller/content.ts` (cursos, landing).
- No exponer contenido real al público: patrón `desbloqueado` en cada página.
- El copy de la landing sigue las reglas de posicionamiento de Obsidian
  (`RESUELTO CEREBRO MADRE/TALLERES/MASTERCLASS CREATIVIDAD PUBLICITARIA IA`).
- Nav con `<a>` (navegación real), NO `<Link>`: el Router Cache de Next no
  distingue sesión y re-bloquea pestañas (bug ya resuelto — no reintroducir).
