# Auditoría del sitio completo + plan de trabajo (handoff Fable → Opus)

Escrito por Fable 5 al cierre de su última sesión (2026-07-07), con conocimiento
directo de todo el código. Cada ítem es ejecutable por una sesión futura sin más
contexto que este repo + `CLAUDE.md` + la memoria del proyecto.

## Estado por página

### `/` (Inicio agencia) — sólida, pesada
- Carga VSL (iframe YouTube) arriba del pliegue + secciones three.js/framer
  (HeroScene, CursorTrail, shaders). **Mejora:** facade para el VSL (thumbnail
  + click para cargar iframe) y `next/dynamic` para los componentes three.js;
  medir LCP móvil antes/después.
- Cursor custom (`cursor:none`) es apuesta estética válida; verificar que no
  afecte accesibilidad por teclado.

### `/sobre-mi`, `/casos`, `/servicios` — correctas
- Contenido desde `lib/constants.ts` (bien). **Mejoras:** revisar metadata/OG
  individual por página (hoy heredan); en `/casos` los casos IA merecen video
  embebido (facade) en vez de solo imagen; CTA de WhatsApp consistente al
  final de las tres.

### `/sistemas-ia` — revisar vigencia
- Landing del bot IA. **Decisión de negocio pendiente:** ¿sigue activa la
  oferta? Si no, retirar del sitemap o redirigir (patrón ya usado con
  /academy → next.config redirects).

### `/taller` (landing Academy) — completa; faltan activos de Manuel
- Todo construido y optimizado (SEO, OG, sticky, visuales gamificados,
  seguridad). **Bloqueadores de conversión NO técnicos:** vslYoutubeId,
  videosEjemplo, testimonios, alumnos, proximaCohorte, hotmartUrl — todos en
  `lib/taller/content.ts`. Sin esto la landing rinde a la mitad.

### `/taller/curso`, `/en-vivo`, `/recursos`, `/calendario`, `/novedades`
- Funcionales con candado público. **Mejoras menores:** breadcrumb en detalle
  de recurso; estado vacío del calendario podría ofrecer registro; en curso,
  facade también para los players cuando existan muchos videos.

### `/ia-content-system` — muerto hasta Supabase
- Reactivar con el MISMO proyecto Supabase de la Fase 2 (migraciones 001/002).

## Prioridades para las sesiones con Opus (en orden)

1. **P0 Manuel (no código):** Activate FormSubmit · hotmartUrl · VSL +
   testimonios + fecha cohorte · crear Supabase (claves).
2. **Fase 2 Supabase** — plan completo en
   `2026-07-07-fase2-supabase-plan.md` + SQL en
   `supabase/migrations/003_academy_schema.sql`. Orden: auth alumnos →
   progreso nube → comunidad en Novedades → panel admin → leaderboard →
   presence → notificaciones. Respetar reglas de CLAUDE.md (candado, nav
   `<a>`, copy de posicionamiento).
3. **Performance home:** facade VSL + dynamic three.js (medir con
   PageSpeed antes/después; objetivo LCP móvil < 2.5s).
4. **Copy fino** de todas las páginas (a trabajar con Manuel; el copy de
   /taller viene del Copy Maestro de Obsidian — NO reescribir sin él).
5. **Metadata/OG por página** en sobre-mi/casos/servicios (patrón ya hecho
   en app/taller/page.tsx + opengraph-image.tsx).
6. **Video hosting** de pago (Bunny/Vimeo Pro) cuando haya ventas — YouTube
   oculto es la fuga conocida.

## Reglas que Opus NO debe romper (aprendidas con bugs reales)
- Nav del portal con `<a>`, nunca `<Link>` (Router Cache no distingue sesión).
- `Cache-Control immutable` de `/_next/static` solo en producción.
- Contenido real del portal solo se renderiza con `desbloqueado`.
- Todo contenido editable vive en `lib/taller/content.ts` / `lib/constants.ts`.
- GPTs = «de mi proceso»; liderar con Cerebro Creativo; ancla $2,000.
