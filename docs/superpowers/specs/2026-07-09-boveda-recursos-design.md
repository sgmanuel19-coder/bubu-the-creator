# La Bóveda 2.0 — /taller/recursos (diseño aprobado)

Aprobado por Manuel el 2026-07-09. Referencia visual/estructural:
tododeia.com/community (solo estructura y temas; todo el copy es original
de RESUELTO — nunca copiar texto de esa página).

## Qué se construye

Rediseño de la bóveda de recursos del portal Academy al estilo de una
"community vault": filtros por tipo y nivel, tarjetas con badges, repos
externos y recursos premium desbloqueables por WhatsApp.

## Decisiones tomadas (con Manuel)

1. **Contenido inicial:** los mismos repos públicos de GitHub que lista la
   referencia (solo terceros/oficiales — NO los repos "exclusivos de
   tododeia") + guías/proyectos sobre los mismos temas escritos 100% con
   el estilo y método de Manuel (Cerebro Creativo, dirección creativa).
2. **Premium:** precio visible en la tarjeta + botón «Desbloquear por
   WhatsApp» que abre wa.me en pestaña nueva con mensaje prellenado.
   Manuel cobra y entrega el material manualmente. Los archivos premium
   NUNCA se ponen en `descargas` (se entregan por WhatsApp).
3. **Visibilidad premium:** todos los visitantes los ven (vitrina), con o
   sin contraseña de alumno. Los recursos normales mantienen el candado
   (`TALLER_PASSWORD`).

## Modelo de datos (lib/taller/content.ts)

```ts
export type TipoRecurso = "guia" | "repo" | "proyecto" | "plantilla";
export type NivelRecurso = "principiante" | "intermedio" | "avanzado";
export type RecursoBoveda = Recurso & {
  tipo: TipoRecurso;
  nivel: NivelRecurso;
  tags?: string[];
  premium?: { precio: string };   // presencia = de paga (ej. "S/97")
  linkExterno?: string;           // repos → GitHub (pestaña nueva)
  cursoRelacionado?: string;      // etiqueta en la tarjeta
};
```

- `BOVEDA: RecursoBoveda[]` = premium (arriba, vitrina) + los 4 recursos
  actuales de la masterclass migrados (mismos slugs → URLs intactas;
  contenido derivado de `RECURSOS_MASTERCLASS`, sin duplicar) + los
  recursos de comunidad nuevos.
- Helpers: `bovedaGlobal()`, `recursoBovedaPorSlug(slug)`,
  `linkWhatsAppPremium(recurso)` (usa `TALLER.whatsapp` + texto
  prellenado con título y precio).
- `curso.recursos` y `CursoClient` no se tocan (la pestaña del curso sigue
  funcionando igual).

## UI

- **RecursosClient** (rewrite): header «La Bóveda», buscador actual,
  pills de tipo (Todo/Guías/Repos/Proyectos/Plantillas) + pills de nivel
  (Todos/Principiante/Intermedio/Avanzado), contador de resultados.
  Tarjetas: badge de tipo (tinte azul), badge de nivel, eyebrow del curso
  si aplica, título, descripción, footer según tipo:
  - normal → «Abrir →» (detalle) con candado si no es alumno
  - repo → abre `linkExterno` en pestaña nueva («GitHub ↗»)
  - premium → tarjeta entera es `<a>` a wa.me `target="_blank"` con 💎 +
    precio + «Desbloquear por WhatsApp →» (tinte dorado)
- **RecursoDetalle**: acepta `RecursoBoveda`. Premium: sin banner de
  alumno; caja de compra (precio + CTA WhatsApp pestaña nueva) en vez de
  Descargables. Repos: botón «Abrir repo en GitHub». La sección
  Descargables solo se muestra cuando aplica.
- **/taller/recursos/[slug]**: resuelve contra `recursoBovedaPorSlug` y
  `bovedaGlobal()` (generateStaticParams).

## Contenido semilla (copy original, voz de Manuel)

- 16 repos de terceros (anthropics/skills, awesome-claude-skills,
  vercel-labs/agent-skills, emilkowalski/skill, huashu-design,
  ui-ux-pro-max-skill, remotion, hyperframes, voicebox, last30days,
  apify-mcp-server, supabase-mcp, postgres-mcp, dlt, airbyte, ponytail)
  con descripciones propias.
- ~16 guías/proyectos sobre los temas de la referencia (skills, tokens,
  memoria, comandos, prompting, plugins, diseño, estudio creativo,
  scraping, control remoto, cerebro/BD, matriz de contenido, desarmar
  virales, web sin agencia, primer día, semana en Calendar) con 2-3
  párrafos de `contenido` cada una, escritos desde el método RESUELTO.
- 2 premium de ejemplo con precio placeholder (Manuel los ajusta):
  pack de prompts cinematográficos (S/97) y plantilla maestra de campaña
  (S/147).

## Reglas que no se rompen

- Candado server-side: descargas/videos reales solo con `desbloqueado`.
- Nav del portal con `<a>`, nunca `<Link>`.
- Todo editable en `lib/taller/content.ts` + redeploy.
- Posicionamiento: GPTs «de mi proceso», liderar con estrategia.
- Premium sin links de archivos en el código.
