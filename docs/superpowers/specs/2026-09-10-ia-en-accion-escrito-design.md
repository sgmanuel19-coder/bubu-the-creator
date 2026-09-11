# IA en Acción — de curso grabado a lista mixta (escrito + video)

Fecha: 2026-09-10
Estado: aprobado por Manuel, pendiente de plan de implementación

---

## El problema

`IA en Acción` está definido en `lib/taller/content.ts` como un curso de 7
módulos y ~16 lecciones, todas con `disponible: false` y `youtubeId: ""`.
Nada de eso está grabado. El módulo lleva meses bloqueado porque grabar 16
lecciones es el cuello de botella — no la falta de contenido.

La masterclass grabada (con Manuel en cámara) sí existe y es el producto
ancla. IA en Acción es el material de ejecución que la acompaña.

## La decisión

IA en Acción deja de ser un temario de video y pasa a ser **una lista
ordenada de temas que crece**, donde cada tema declara su formato de
entrega. Lo que no está grabado se publica escrito, con imágenes, prompts
y enlaces. El video no se descarta: se encima después sobre el mismo tema,
sin reescribir el texto.

Principio de reparto:
- **Escrito** lo que es decisión, prompt, configuración o resultado
  estático — se consulta, se relee y se corrige sin regrabar.
- **Video con cámara** lo que vive del criterio de Manuel y necesita su
  cara para sostener confianza.
- **Video de solo pantalla** lo que vive del movimiento, la secuencia y el
  timing.

Frontera que no se cruza (ya está escrita en el código): la masterclass
enseña a DECIDIR, IA en Acción enseña a EJECUTAR.

## La lista

Un solo listado del 1 al 21. La columna Formato se muestra en el portal
(📄 lee / ▶ mira). Los ✚ son adiciones nuevas al temario original.

### A. Artículo escrito con imágenes

| # | Tema | Acceso |
|---|---|---|
| 1 | Conceptos básicos: cómo piensa un modelo y cómo se le habla | Abierto |
| 2 | El stack: qué hace cada herramienta y cuándo usarla | Abierto |
| 3 | Personaje consistente: la hoja de personaje | Abierto |
| 4 | Clon y UGC: el influencer que no existe | Candado |
| 5 | Foto de producto con IA | Candado |
| 6 | Fotos profesionales con IA | Candado |
| 7 | ✚ Voz y locución con IA (ElevenLabs) | Candado |
| 8 | ✚ Los errores que delatan una imagen IA y cómo taparlos | Candado |
| 9 | ✚ Banco de prompts maestros | Candado |

Los tres abiertos son el imán: se indexan en Google, demuestran el método
y dejan el valor de pago en fotoproducto, cinematográfico y Claude Code.
Cambiar cualquiera de acceso es una línea (`gratis: true`).

### B. Video con Manuel en cámara + pantalla

| # | Tema |
|---|---|
| 10 | ✚ Cómo usar IA en Acción (3 min de arranque) |
| 11 | Caso real: la grilla de Wellmax, mes 2 |
| 12 | Caso real: la grilla de WIN Internet |
| 13 | Armar tu oferta y cobrarla |

### C. Video de solo grabación de pantalla

| # | Tema |
|---|---|
| 14 | Seedance 2.5: prompteo multishot (método rápido) |
| 15 | Seedance 2.0: plano x plano con smart system (método de entrega) |
| 16 | Cinematográfico de verdad: Kling 3.0 + Seedance |
| 17 | Edición nivel básico |
| 18 | Edición nivel intermedio |
| 19 | Introducción a Claude Code |
| 20 | Landing page con Claude Code y Vercel |
| 21 | ✚ Upscale y acabado final |

## Qué hay que construir

### 1. Bloques nuevos en el motor de secciones

`BloqueRecurso` en `lib/taller/content.ts` soporta hoy siete tipos, todos
de texto plano: `parrafo`, `lista`, `pasos`, `tabla`, `copiable`, `nota`,
`cita`. Faltan tres:

- `{ tipo: "imagen"; src: string; pie?: string }`
- `{ tipo: "video"; youtubeId: string; pie?: string }` — para mostrar la
  pieza resultante dentro de un artículo, no a Manuel hablando.
- `{ tipo: "enlace"; url: string; texto: string; nota?: string }`

Se renderizan en `components/taller/SeccionesRecurso.tsx`, que hoy tiene un
`switch` de siete casos.

### 2. Formato y video opcional por tema

Cada tema de la lista declara:

- `formato: "escrito" | "video-camara" | "video-pantalla"` — define el
  icono y el orden de lectura en el portal.
- `videoId?: string` — opcional en los temas escritos. Cuando se llena,
  el reproductor aparece arriba del artículo y el texto se queda abajo.
  No reemplaza: suma.

Los temas de los grupos B y C arrancan sin `videoId` y se muestran como
"próximamente", igual que hoy.

### 3. Dónde viven los archivos

- Contenido de los artículos: `lib/taller/boveda/guias-ia-en-accion.ts`,
  siguiendo el patrón de los diez archivos de guías que ya existen, y
  registrado en `lib/taller/boveda/secciones.ts`.
- Imágenes: `/public/images/ia-en-accion/`.

Caveat conocido: `/public` se sirve por URL directa, así que las imágenes
de un artículo con candado son accesibles si alguien adivina la ruta. Se
acepta — no hay datos sensibles ahí.

## Formato de cada artículo

El mismo de la bóveda: secciones numeradas que mezclan párrafos, pasos,
tablas y prompts copiables, más las imágenes nuevas.

La diferencia contra un tutorial cualquiera, y lo que no se copia: en cada
decisión se escribe **por qué se eligió eso** — qué modelo, qué falló y
qué se corrigió.

## Orden de trabajo

1. Construir los tres bloques nuevos y el campo `videoId` (sin esto, un
   artículo de hoja de personaje no puede mostrar la hoja de personaje).
2. Escribir el tema 3, Personaje consistente — es el que prueba el formato
   completo de punta a punta: hoja, prompts, imágenes y resultado.
3. Revisar cómo quedó y recién ahí escribir los ocho restantes del grupo A.
4. Los grupos B y C quedan como lista de grabación, fuera de este spec.

## Fuera de alcance

- Grabar cualquier video de los grupos B o C.
- Los anuncios para vender el producto (trabajo aparte, ya conversado).
- Migrar a Skool: descartado. Pagaría plataforma mensual, no indexaría en
  Google y perdería el motor de bóveda ya construido.
- Edición, casos reales y armar la oferta ya no se escriben — Manuel
  confirmó que esos sí los graba.
