// ============================================================
// PORTAL RESUELTO ACADEMY — CONTENIDO EDITABLE
// Fuente de verdad del copy de la masterclass: Obsidian →
// RESUELTO CEREBRO MADRE/TALLERES/MASTERCLASS CREATIVIDAD PUBLICITARIA IA
// (docs 00, 02, 03, 06). Edita este archivo para actualizar todo. Redeploy.
//
// Cómo obtener el ID de un video de YouTube:
//   https://www.youtube.com/watch?v=ABC123xyz  →  el ID es "ABC123xyz"
//   Sube los videos como "Oculto" (unlisted), nunca como públicos.
// ============================================================

// ── Tipos del Classroom ──────────────────────────────────────
export type Leccion = { titulo: string; duracion: string; youtubeId: string };
export type Modulo = {
  titulo: string;
  descripcion: string;
  disponible: boolean;
  lecciones: Leccion[];
  pptUrl?: string; // link a la presentación del módulo (Google Slides, etc.)
};
export type Recurso = {
  slug: string; // para la página de detalle /taller/recursos/<slug>
  titulo: string;
  descripcion: string; // resumen para la tarjeta
  disponible: boolean;
  // Página de detalle (bóveda): info + archivos descargables.
  contenido?: string[]; // párrafos de info (tipo blog)
  descargas?: { nombre: string; url: string }[]; // archivos con su link
};
export type Curso = {
  slug: string;
  titulo: string;
  descripcion: string;
  portada: { emoji: string; color: string };
  disponible: boolean;
  modulos: Modulo[];
  recursos: Recurso[];
};

// ── Módulos de la masterclass: las 6 partes como capítulos ────
const MODULOS_MASTERCLASS: Modulo[] = [
  {
    titulo: "PARTE 0 — Bienvenida y las bases",
    descripcion:
      "Introducción, bienvenida y presentación: el resultado primero, las 3 máquinas del sistema (Claude, Higgsfield y CapCut) y el mapa completo de lo que viene.",
    disponible: true,
    lecciones: [
      { titulo: "Introducción, bienvenida y presentación", duracion: "", youtubeId: "dxmIy6DqSWs" },
    ],
  },
  {
    titulo: "PARTE 1 — PENSAR: Antes de la IA, piensa como un director creativo",
    descripcion:
      "El protocolo del director creativo, las 4 etapas, el insight y sus 6 tipos, la Big Idea, retóricas, 10 estructuras narrativas, fórmulas de headline y 9 hooks, géneros de storytelling y tipos de campaña.",
    disponible: true,
    lecciones: [
      { titulo: "Conceptos básicos", duracion: "", youtubeId: "PAuFCWbNpmo" },
      { titulo: "La IA amplifica, tú diriges", duracion: "", youtubeId: "GErCgANzB6Q" },
      { titulo: "Qué es un director creativo", duracion: "", youtubeId: "Ie2UY-CvntU" },
      { titulo: "El proceso de creación", duracion: "", youtubeId: "BVpTDEDIdJ8" },
      { titulo: "El insight", duracion: "", youtubeId: "I33SFo6_bDM" },
      { titulo: "Tipos de insights", duracion: "", youtubeId: "GGKqk1Ia0Ag" },
      { titulo: "Del insight al concepto", duracion: "", youtubeId: "lZ_I28591ls" },
      { titulo: "Retóricas publicitarias", duracion: "", youtubeId: "MvzDV0vD4PE" },
      { titulo: "Estructuras narrativas", duracion: "", youtubeId: "ojwjVl6WDik" },
      { titulo: "Géneros de storytelling", duracion: "", youtubeId: "3l4uybim6w8" },
      { titulo: "Cierre", duracion: "", youtubeId: "loc3LYxreLE" },
    ],
    pptUrl: "https://docs.google.com/presentation/d/1HS2vd-B0fVuPhkUl7YlGc5Bccdb_4tcHK53a7GlMUG4/edit?usp=sharing",
  },
  {
    titulo: "PARTE 2 — EL SISTEMA: Cerebro Creativo IA",
    descripcion:
      "La Biblia de 59 documentos, el ADN de marca, el Prompt Maestro, Claude Code y Obsidian, skills, agentes y MCP — con demo del Cerebro razonando en vivo.",
    disponible: true,
    lecciones: [
      { titulo: "El sistema", duracion: "", youtubeId: "fS8WtkGSvd8" },
      { titulo: "Biblia publicitaria", duracion: "", youtubeId: "v0Lc-Jom4Gg" },
      { titulo: "ADN de marca", duracion: "", youtubeId: "_ifX6QY1XhE" },
      { titulo: "Prompt maestro", duracion: "", youtubeId: "6l7YycR5X50" },
      { titulo: "Claude Code y Obsidian", duracion: "", youtubeId: "PhCin3wuCCU" },
      { titulo: "Cierre", duracion: "", youtubeId: "Sg4WPVVA2go" },
    ],
    pptUrl: "https://docs.google.com/presentation/d/1EeYAlNUuW9Q5zgFgfM6Tn9mJUeuEJi7X4klFuGFbkks/edit?usp=sharing",
  },
  {
    titulo: "PARTE 3 — CREAR: producción con IA",
    descripcion:
      "Prompt semiótico, Higgsfield a fondo (Kling, Seedance y consistencia con hoja de personaje), la baraja de GPTs y ensamblaje final en CapCut — explicado en general y mostrado con resultados reales de mi trabajo comercial.",
    disponible: true,
    lecciones: [
      { titulo: "Crear", duracion: "", youtubeId: "-UVwYnMClyQ" },
      { titulo: "Prompt semiótico", duracion: "", youtubeId: "bh-Mj7lxSb8" },
      { titulo: "Introducción a Higgsfield.ai", duracion: "", youtubeId: "HRs0ef7VPQA" },
      { titulo: "Mi stack de GPTs", duracion: "", youtubeId: "UplIh_Wfh8c" },
    ],
    pptUrl: "https://docs.google.com/presentation/d/1nyp6R1LKkMJaCRynxYFBsDVMXKdm65sMzgqMkQVrP_A/edit?usp=sharing",
  },
  {
    titulo: "PARTE 4 — CASOS: marcas reales",
    descripcion:
      "El caso Wellmax completo, el personaje de marca de WIN, galería de referencias y cómo adaptar el sistema a tu caso.",
    disponible: true,
    lecciones: [
      { titulo: "Caso Smart System", duracion: "", youtubeId: "-Omg9T43gN0" },
      { titulo: "Caso Wellmax", duracion: "", youtubeId: "8SfS27Wb-YA" },
      { titulo: "Caso WIN", duracion: "", youtubeId: "EXOMRegCiyA" },
      { titulo: "Más ejemplos IA", duracion: "", youtubeId: "cbHNkDv5gm0" },
    ],
    pptUrl: "https://docs.google.com/presentation/d/169gOJfWmDO63tImlVxfLCzv31u8YF-c0uYun9_lJ3jA/edit?usp=sharing",
  },
  {
    titulo: "PARTE 5 — COBRAR: el negocio",
    descripcion:
      "Tu propuesta de valor, tu oferta irresistible, cuánto cobrar, el pitch de 60 segundos y tu plan de 30 días.",
    disponible: true,
    lecciones: [
      { titulo: "Cobrar", duracion: "", youtubeId: "7Z_scucjzr4" },
      { titulo: "Cierre", duracion: "", youtubeId: "dLLDKMScKpc" },
    ],
  },
];

// ── Módulos del curso bonus StorySelling Pro (Estrategia CAT) ──
// Se van cargando conforme Manuel sube cada video a YouTube en modo
// "No listado". Un objeto por Módulo del curso; si un módulo tiene
// varios videos, se agregan como lecciones dentro del mismo.
const MODULOS_STORYSELLING: Modulo[] = [
  {
    titulo: "Módulo 1 — Introducción",
    descripcion:
      "Qué es la Estrategia CAT y por qué cambia la forma en que produces contenido.",
    disponible: true,
    lecciones: [
      { titulo: "Introducción", duracion: "1:57", youtubeId: "j2r1E_MzEG0" },
    ],
  },
  {
    titulo: "Módulo 2 — El problema que resuelve",
    descripcion:
      "Por qué el contenido cuesta tanto producir y qué es exactamente lo que la Estrategia CAT viene a arreglar.",
    disponible: true,
    lecciones: [
      { titulo: "El problema que resuelve", duracion: "4:08", youtubeId: "afjEC3xhwFw" },
    ],
  },
  {
    titulo: "Módulo 3 — Explicación del método",
    descripcion:
      "El método CAT paso a paso: cómo se aplica y en qué orden.",
    disponible: true,
    lecciones: [
      { titulo: "Explicación del método · Parte 1", duracion: "0:36", youtubeId: "HqsJ77Z3jG0" },
      { titulo: "Explicación del método · Parte 2", duracion: "2:48", youtubeId: "lHE84SRs0rU" },
      { titulo: "Explicación del método · Parte 3", duracion: "1:49", youtubeId: "w_5L2QWBoPY" },
      { titulo: "Explicación del método · Parte 4", duracion: "1:42", youtubeId: "E9tCb7Nr5yk" },
      { titulo: "Explicación del método · Parte 5", duracion: "2:23", youtubeId: "I79ZfIqKcdg" },
    ],
  },
  {
    titulo: "Módulo 4 — Cómo combinar las piezas",
    descripcion:
      "Cómo se arma el contenido juntando las piezas del método en una sola ejecución.",
    disponible: true,
    lecciones: [
      { titulo: "Cómo combinar las piezas · Parte 1", duracion: "0:35", youtubeId: "C0tCt54fqDs" },
      { titulo: "Cómo combinar las piezas · Parte 2", duracion: "2:00", youtubeId: "8lY4nKG683Q" },
      { titulo: "Cómo combinar las piezas · Parte 3", duracion: "1:43", youtubeId: "Arvr4n4CZ7I" },
      { titulo: "Cómo combinar las piezas · Parte 4", duracion: "3:11", youtubeId: "UORYcrK_d-s" },
      { titulo: "Cómo combinar las piezas · Parte 5", duracion: "2:59", youtubeId: "JTD38ef8foU" },
    ],
  },
  {
    titulo: "Módulo 5 — Ejemplos prácticos",
    descripcion:
      "El método aplicado a casos reales, de principio a fin.",
    disponible: true,
    lecciones: [
      { titulo: "Ejemplos prácticos", duracion: "6:39", youtubeId: "I_WBplrq484" },
    ],
  },
  {
    titulo: "Módulo 6 — Aplicación a tu negocio",
    descripcion:
      "Cómo bajar el método a tu propio negocio y dejarlo funcionando.",
    disponible: true,
    lecciones: [
      { titulo: "Aplicación a tu negocio · Parte 1", duracion: "3:56", youtubeId: "3AqwyRq5VnE" },
      { titulo: "Aplicación a tu negocio · Parte 2", duracion: "11:17", youtubeId: "LTVSmV8soak" },
    ],
  },
  {
    titulo: "Módulo 7 — Reconocimiento",
    descripcion:
      "Cómo reconocer el método funcionando en el contenido que ya consumes.",
    disponible: true,
    lecciones: [
      { titulo: "Reconocimiento", duracion: "2:59", youtubeId: "gjvmoLaIpuo" },
    ],
  },
  {
    titulo: "Módulo 8 — Graba y edita tu contenido",
    descripcion:
      "La parte de producción: cómo grabar y cómo editar para que el método se note en pantalla.",
    disponible: true,
    lecciones: [
      { titulo: "Grabar tu contenido · Parte 1", duracion: "0:51", youtubeId: "Yon-Q4AnEw4" },
      { titulo: "Grabar tu contenido · Parte 2", duracion: "1:33", youtubeId: "fOpY99l92Yo" },
      { titulo: "Edita tu contenido · Parte 1", duracion: "3:11", youtubeId: "ynoU1Ljc2Iw" },
      { titulo: "Edita tu contenido · Parte 2", duracion: "10:52", youtubeId: "1n3xLNe2mEY" },
      { titulo: "Edita tu contenido · Parte 3", duracion: "10:59", youtubeId: "iH4yZD0YU2c" },
      { titulo: "Edita tu contenido · Parte 4", duracion: "3:56", youtubeId: "mzRXL-qpQFU" },
      { titulo: "Edita tu contenido · Parte 5", duracion: "10:36", youtubeId: "iHA2a8Kx_JA" },
      { titulo: "Edita tu contenido · Parte 6", duracion: "1:47", youtubeId: "6OGUWRT9raA" },
      { titulo: "Edita tu contenido · Parte 7", duracion: "1:53", youtubeId: "E5GGXKL7Cu0" },
      { titulo: "Edita tu contenido · Parte 8", duracion: "5:50", youtubeId: "U7di4hkkOfg" },
      { titulo: "Edita tu contenido · Parte 9", duracion: "10:51", youtubeId: "T4_cQvWmKxU" },
    ],
  },
  {
    titulo: "Módulo 9 — Cierre",
    descripcion:
      "El resumen del método y qué hacer a partir de aquí.",
    disponible: true,
    lecciones: [
      { titulo: "Cierre", duracion: "11:23", youtubeId: "i_UyvIx_QeE" },
    ],
  },
];

// ── La Biblia Publicitaria ────────────────────────────────────
// Los PDFs viven en private/biblia (FUERA de /public, que es público por
// URL). Se entregan por /api/taller/descarga, que valida el nivel
// "grabado" antes de mandar el archivo.
// Nota: van del DOC 00 al DOC 59 pero el DOC 10 no existe → son 59.
function urlBiblia(archivo: string): string {
  return `/api/taller/descarga/biblia/${encodeURIComponent(archivo)}`;
}

// ── IA en Acción: los tutoriales de herramienta ──────────────
// La Masterclass enseña a DECIDIR; este curso enseña a EJECUTAR.
// Por eso viven separados y no mezclados en el mismo temario.
//
// Todos arrancan con `disponible: false` y `youtubeId: ""`. La UI
// filtra los módulos no disponibles (ver CursoClient), así que la
// estructura completa puede vivir acá sin que se vea nada roto:
// enciende cada módulo poniendo su ID de YouTube y `disponible: true`.
//
// Orden de grabación acordado con Manuel — los tres primeros son los
// que él numeró 1, 2 y 3:
//   1. Seedance 2.5 · prompteo multishot
//   2. Seedance 2.0 · plano x plano
//   3. (el VSL, que no es tutorial y va en la landing)
const MODULOS_IA_EN_ACCION: Modulo[] = [
  {
    titulo: "MÓDULO 0 — Empezar",
    descripcion:
      "Cómo razona un modelo, por qué el mismo prompt da resultados distintos y qué hace cada herramienta del stack. La base que evita perder horas después.",
    disponible: false,
    lecciones: [
      { titulo: "Conceptos básicos: cómo piensa la IA y cómo se le habla", duracion: "", youtubeId: "" },
      { titulo: "El stack completo: qué hace cada herramienta y cuándo usarla", duracion: "", youtubeId: "" },
    ],
  },
  {
    titulo: "MÓDULO 1 — Seedance: el comercial completo",
    descripcion:
      "Los dos métodos para sacar un comercial de Seedance. El primero es rápido y sirve para explorar; el segundo es lento y es el que se entrega a un cliente.",
    disponible: false,
    lecciones: [
      { titulo: "Método 1 · Prompteo multishot en Seedance 2.5", duracion: "", youtubeId: "" },
      { titulo: "Método 2 · Construcción plano x plano con smart system (Seedance 2.0)", duracion: "", youtubeId: "" },
      { titulo: "Cinematográfico de verdad: Kling 3.0 + Seedance 2.0 y 2.5", duracion: "", youtubeId: "" },
    ],
  },
  {
    titulo: "MÓDULO 2 — Personajes que se repiten",
    descripcion:
      "El problema que rompe casi todas las campañas con IA: que el personaje cambie de cara entre plano y plano. Cómo fijarlo y cómo clonarte a ti mismo.",
    disponible: false,
    lecciones: [
      { titulo: "Personaje consistente y clon", duracion: "", youtubeId: "" },
      { titulo: "UGC: el influencer que no existe", duracion: "", youtubeId: "" },
      { titulo: "Foto de producto y foto profesional con influencer IA", duracion: "", youtubeId: "" },
    ],
  },
  {
    titulo: "MÓDULO 3 — Edición",
    descripcion:
      "Lo generado no es la pieza. La edición es donde un montón de clips sueltos se convierte en algo que se puede cobrar.",
    disponible: false,
    lecciones: [
      { titulo: "Edición nivel básico", duracion: "", youtubeId: "" },
      { titulo: "Edición nivel intermedio", duracion: "", youtubeId: "" },
    ],
  },
  {
    titulo: "MÓDULO 4 — Casos reales, de principio a fin",
    descripcion:
      "Dos entregas de clientes que están pagando ahora mismo, sin recortes: el brief, lo que se descartó y la grilla terminada.",
    disponible: false,
    lecciones: [
      { titulo: "Cómo hice la grilla de Wellmax del mes 2 con Kling y Seedance", duracion: "", youtubeId: "" },
      { titulo: "La grilla de contenido de WIN Internet", duracion: "", youtubeId: "" },
    ],
  },
  {
    titulo: "MÓDULO 5 — Claude Code",
    descripcion:
      "La herramienta que no es de video y que igual cambia el negocio: automatizar lo repetitivo y publicar una landing sin depender de nadie.",
    disponible: false,
    lecciones: [
      { titulo: "Introducción a Claude Code", duracion: "", youtubeId: "" },
      { titulo: "Una landing page con Claude Code y Vercel", duracion: "", youtubeId: "" },
    ],
  },
  {
    titulo: "MÓDULO 6 — Cobrarlo",
    descripcion:
      "Saber hacerlo no es lo mismo que saber venderlo. Cómo se arma la oferta, qué se cobra y cómo se presenta.",
    disponible: false,
    lecciones: [
      { titulo: "Desarrollando tu oferta IA", duracion: "", youtubeId: "" },
    ],
  },
];

const BIBLIA_DOCS: string[] = [
  "DOC 00 - El Protocolo de Pensamiento del Director Creativo.pdf",
  "DOC 01 - Análisis de Brief Publicitario.pdf",
  "DOC 02 - Buyer Persona Profundo.pdf",
  "DOC 03 - Customer Journey Map Publicitario.pdf",
  "DOC 04 - Value Proposition Design.pdf",
  "DOC 05 - Oferta Irresistible.pdf",
  "DOC 06 - Propuesta Comercial y Pitch.pdf",
  "DOC 07 - Estrategia de Precios y Psicología del Precio.pdf",
  "DOC 08 - Tipos de Embudos de Venta Publicitarios.pdf",
  "DOC 09 - Tipos de Insight.pdf",
  "DOC 11 - El Concepto Creativo.pdf",
  "DOC 12 - La Big Idea Publicitaria.pdf",
  "DOC 13 - Retóricas Publicitarias e Ideación.pdf",
  "DOC 14 - Tipos de Estructuras Narrativas Publicitarias.pdf",
  "DOC 15 - Técnicas de Redacción Creativa Publicitaria.pdf",
  "DOC 16 - Tipos y Estilos de Hooks Publicitarios.pdf",
  "DOC 17 - Tipos y Estilos de Escritura Creativa Publicitaria.pdf",
  "DOC 18 - Tipos y Estilos de CTA Publicitario.pdf",
  "DOC 19 - Stories Publicitarias.pdf",
  "DOC 20 - Carruseles Virales.pdf",
  "DOC 21 - Reels y Videos Cortos Publicitarios.pdf",
  "DOC 22 - Email Marketing Publicitario.pdf",
  "DOC 23 - Spot Publicitario de TV y Video de Alto Presupuesto.pdf",
  "DOC 24 - OOH y Print Publicitario.pdf",
  "DOC 25 - Radio y Audio Advertising.pdf",
  "DOC 26 - Publicidad Experiencial y Activaciones.pdf",
  "DOC 27 - Técnicas de Conceptualización Visual.pdf",
  "DOC 28 - Cómo Piensa un Director de Arte Nivel Cannes.pdf",
  "DOC 29 - Producción Publicitaria.pdf",
  "DOC 30 - Arquitectura de Campaña Estratégica.pdf",
  "DOC 31 - Brand Voice y Tono de Comunicación.pdf",
  "DOC 32 - Evaluación y Aprobación de Creatividades.pdf",
  "DOC 33 - Prompt Engineering Publicitario para IA.pdf",
  "DOC 34 - Guiones de Storytelling por Formato.pdf",
  "DOC 35 - Estilos y Géneros de Storytelling Publicitario.pdf",
  "DOC 36 - Tipos de Estrategias Comunicacionales.pdf",
  "DOC 37 - Tipos de Estrategias de Contenido.pdf",
  "DOC 38 - Tipos de Estrategias Comerciales con Enfoque Publicitario.pdf",
  "DOC 39 - Investigación Previa a la Campaña.pdf",
  "DOC 40 - Estrategia de Medios y Canales.pdf",
  "DOC 41 - Métricas y KPIs Publicitarios.pdf",
  "DOC 42 - Marketing de Influencers y UGC.pdf",
  "DOC 43 - Landing Pages y Destinos de Campaña.pdf",
  "DOC 44 - Flujo Creativo Integrado con IA.pdf",
  "DOC 45 - Creación de Video Publicitario con Kling.pdf",
  "DOC 46 - Creación de Contenido con Seedance.pdf",
  "DOC 47 - Efectos Visuales y Concepto con Higgsfield.pdf",
  "DOC 48 - Creación Creativa con Nano Banana.pdf",
  "DOC 49 - Generación de Imagen Publicitaria con IA.pdf",
  "DOC 50 - Audio y Voz con IA para Publicidad.pdf",
  "DOC 51 - Meta Ads (Facebook + Instagram).pdf",
  "DOC 52 - Google Ads y SEM.pdf",
  "DOC 53 - TikTok Ads.pdf",
  "DOC 54 - LinkedIn Ads.pdf",
  "DOC 55 - YouTube Advertising.pdf",
  "DOC 56 - SEO de Contenido Publicitario.pdf",
  "DOC 57 - Canales Complementarios.pdf",
  "DOC 58 - Grillas, Calendarios y Planificación de Contenido.pdf",
  "DOC 59 - Media Plan Integrado y Planning Estratégico.pdf",
];

const RECURSOS_MASTERCLASS: Recurso[] = [
  {
    slug: "biblia-publicitaria",
    titulo: "La Biblia Publicitaria (59 PDFs)",
    descripcion:
      "Los 59 documentos que le enseñan a la IA todo el oficio del director creativo — el mismo material que alimenta mi sistema.",
    disponible: true,
    contenido: [
      "La Biblia Publicitaria es el corazón del Cerebro Creativo IA: 59 documentos que condensan el oficio del director creativo — insights, retóricas, estructuras narrativas, hooks, tipos de campaña, producción con IA y pauta.",
      "Descárgala completa y cárgala en tu Cerebro Creativo tal como se muestra en la PARTE 2. Es el material que hace que la IA razone como un creativo senior dentro de tu marca.",
      "Puedes bajar el paquete entero o solo el documento que necesitas: abajo están los 59, en orden.",
    ],
    descargas: [
      { nombre: "Biblia Publicitaria completa — 59 PDFs (.zip)", url: urlBiblia("Biblia-Publicitaria-RESUELTO.zip") },
      ...BIBLIA_DOCS.map((archivo) => ({
        nombre: archivo.replace(/\.pdf$/, "").replace(" - ", " · "),
        url: urlBiblia(archivo),
      })),
    ],
  },
  {
    slug: "baraja-gpts",
    titulo: "La baraja de GPTs de mi proceso",
    descripcion:
      "Links de acceso a las 4 piezas de mi flujo real: CinePromt, Storyboard, UGC y Seedance Director.",
    disponible: true,
    contenido: [
      "Las 4 piezas del flujo de producción: CinePromt, Storyboard, UGC y Seedance Director. Requieren una cuenta de ChatGPT de pago.",
      "⚠️ Los links directos a cada GPT se están subiendo — en cuanto estén, aparecen aquí abajo listos para abrir. Mientras tanto, escríbeme por WhatsApp y te los paso directo.",
    ],
    descargas: [
      // { nombre: "CinePromt", url: "https://chatgpt.com/g/..." },
      // { nombre: "Storyboard", url: "https://chatgpt.com/g/..." },
      // { nombre: "UGC", url: "https://chatgpt.com/g/..." },
      // { nombre: "Seedance Director", url: "https://chatgpt.com/g/..." },
    ],
  },
  {
    slug: "plantillas-sistema",
    titulo: "Plantillas del sistema",
    descripcion: "Hoja de personaje, ADN de marca y biblioteca de prompts.",
    disponible: true,
    contenido: [
      "Las plantillas base del sistema. La hoja de personaje resuelve la consistencia; el ADN de marca alimenta al Cerebro; la biblioteca de prompts acelera cada generación.",
    ],
    descargas: [],
  },
  {
    slug: "checklist-parece-agencia",
    titulo: "Checklist «parece agencia»",
    descripcion:
      "Los detalles de acabado de edición que separan «video de IA» de pieza publicitaria.",
    disponible: true,
    contenido: [
      "Antes de publicar cualquier pieza, pásala por este checklist de acabado. Son los detalles que hacen que un video se vea profesional y no «hecho con IA».",
    ],
    descargas: [],
  },
];

// ── Cómo agregar un curso nuevo al Classroom ─────────────────
// 1) Define sus módulos/recursos como constantes arriba (copia
//    MODULOS_MASTERCLASS y renómbralas, ej. MODULOS_MINICURSO).
// 2) Agrega un objeto al array `cursos` de TALLER con su slug único,
//    título, portada (emoji + color) y esas constantes.
// 3) disponible: true para publicarlo. Redeploy. Nada más.

// ═══════════════════════════════════════════════════════════════
// LA BÓVEDA (/taller/recursos) — guías, repos, proyectos, plantillas
// ═══════════════════════════════════════════════════════════════
// - tipo + nivel alimentan los filtros de la página.
// - premium: { precio } = recurso de paga. La tarjeta abre WhatsApp en
//   pestaña nueva con mensaje prellenado; tú cobras y entregas el
//   material por ahí. NUNCA pongas los archivos premium en `descargas`.
// - linkExterno (repos): la tarjeta abre GitHub en pestaña nueva.
// - Para agregar un recurso: copia un objeto, cambia slug/título/copy.

export type TipoRecurso = "guia" | "repo" | "proyecto" | "plantilla";
export type NivelRecurso = "principiante" | "intermedio" | "avanzado";

// ── Bloques de contenido rico (guías a fondo, estilo artículo) ──
// Una guía completa se arma con secciones numeradas; cada sección mezcla
// bloques: párrafos, listas, pasos, tablas, prompts copiables y notas.
export type BloqueRecurso =
  | { tipo: "parrafo"; texto: string }
  | { tipo: "lista"; items: string[] }
  | { tipo: "pasos"; items: { titulo: string; detalle: string }[] }
  | { tipo: "tabla"; columnas: string[]; filas: string[][] }
  // copiable: prompt o comando con botón de copiar (como la referencia)
  | { tipo: "copiable"; etiqueta: string; contenido: string }
  // nota: advertencia honesta / tip destacado
  | { tipo: "nota"; texto: string }
  // cita: frase de cierre
  | { tipo: "cita"; texto: string };

export type SeccionRecurso = {
  titulo: string; // ej. "El problema" (el número se pinta solo)
  bloques: BloqueRecurso[];
};

export type RecursoBoveda = Recurso & {
  tipo: TipoRecurso;
  nivel: NivelRecurso;
  tags?: string[];
  // premium = de paga. Su nivel de acceso es el propio slug del recurso
  // (agrega la contraseña en la env TALLER_PASSWORDS de Vercel).
  // hotmartUrl opcional = segunda vía de pago con tarjeta.
  premium?: { precio: string; hotmartUrl?: string };
  // gratis = imán público: la guía completa se lee SIN candado, la página
  // se indexa en Google y cierra con CTA a la masterclass. Es la vitrina
  // del método (la bóveda demuestra gratis lo que la academy vende).
  gratis?: boolean;
  linkExterno?: string; // repos: URL de GitHub (abre en pestaña nueva)
  cursoRelacionado?: string; // etiqueta pequeña en la tarjeta
  // Guía a fondo (secciones numeradas). Se define en lib/taller/boveda/
  // y se une aquí por slug. Sin sesión solo se muestra el índice.
  secciones?: SeccionRecurso[];
};

// ── Datos de pago (bandeja antes de WhatsApp) ───────────────────
// Los QR van en /public/images/pagos/ — deja "" hasta subir la imagen
// y la bandeja muestra "QR próximamente".
export const PAGOS = {
  banco: "Interbank",
  titular: "RESUELTO SMART SOLUTIONS S.A.C.",
  cuenta: "2003008386810",
  cci: "00320000300838681036",
  yapePlin: {
    numero: "932 844 074", // cámbialo si tu Yape/Plin usa otro número
    qrYape: "", // ej. "/images/pagos/qr-yape.png"
    qrPlin: "", // ej. "/images/pagos/qr-plin.png"
  },
  pasos: [
    "Transfiere o yapea el monto exacto del recurso.",
    "Toma la captura de tu pago.",
    "Envíamela por WhatsApp y te mando tu acceso al instante.",
  ],
};

// ── Niveles de acceso vendibles (franja de la bóveda) ───────────
// Escalera: "boveda" < "grabado" < "vivo" (implementada en
// lib/taller/session.ts → HEREDA). Cada nivel superior desbloquea también
// los de abajo, así que el precio y el copy deben reflejar eso: "grabado"
// SIEMPRE incluye todo lo de "boveda", y "vivo" incluye todo lo de
// "grabado". El nivel "todo" (acceso maestro) sigue existiendo para tu
// propia clave interna, pero ya no se vende como producto aparte — con
// "vivo" ya se cubre el portal completo.
export type NivelVenta = {
  nivel: "boveda" | "grabado" | "vivo";
  nombre: string;
  precio: string;
  descripcion: string;
  incluye: string[];
};

export const NIVELES_VENTA: NivelVenta[] = [
  {
    nivel: "boveda",
    nombre: "Bóveda de documentos",
    precio: "$25",
    descripcion:
      "Solo los documentos: todas las guías, plantillas y proyectos de la bóveda — incluidos los dos que antes se vendían aparte. Sin las clases en video.",
    incluye: [
      "Toda la bóveda de guías, plantillas y proyectos",
      "Los prompts cinematográficos y la plantilla maestra de campaña (antes de pago)",
      "Actualizaciones: lo nuevo que se publique también entra",
    ],
  },
  {
    nivel: "grabado",
    nombre: "Cursos grabados",
    precio: "$200",
    descripcion:
      "La masterclass completa a tu ritmo + el curso bonus StorySelling Pro, con toda la bóveda de documentos incluida.",
    incluye: [
      "Masterclass grabada completa (6 partes)",
      "Curso bonus: StorySelling Pro (Estrategia CAT)",
      "Toda la bóveda de documentos incluida",
      "Acceso de por vida a las actualizaciones",
    ],
  },
  {
    nivel: "vivo",
    nombre: "Cohorte en vivo",
    precio: "$500",
    descripcion:
      "Las sesiones en vivo de la cohorte actual, con todo el curso grabado y la bóveda completa incluidos.",
    incluye: [
      "Sesiones en vivo de la cohorte + chat de comunidad",
      "Todo el curso grabado incluido (clases + bonus)",
      "Toda la bóveda de documentos incluida",
    ],
  },
];

// ── Antes premium, hoy dentro del nivel "boveda" ($50) ──────────
// Hasta hace poco estos 2 se vendían sueltos por WhatsApp (S/97 y S/147).
// Ahora son recursos normales de la bóveda: los desbloquea el nivel
// "boveda" como a cualquier otro. El campo `premium` queda disponible en
// el tipo por si algún día quieres volver a vender algo suelto.
const BOVEDA_PREMIUM: RecursoBoveda[] = [
  {
    slug: "pack-prompts-cinematograficos",
    titulo: "50 prompts cinematográficos de mi flujo real",
    descripcion:
      "Los prompts exactos que uso para lograr look de película: lente, luz, grade y atmósfera ya resueltos. Pega, adapta a tu marca y genera.",
    tipo: "plantilla",
    nivel: "intermedio",
    disponible: true,
    tags: ["prompts", "cine", "imagen"],
    contenido: [
      "Cada prompt de este pack salió de producción real para clientes: encuadre, óptica, esquema de luz y paleta ya calibrados para que el resultado se vea a pieza publicitaria y no a «imagen de IA».",
      "Están organizados por tipo de plano y por género de campaña, con notas de cuándo usar cada uno y qué variar para tu marca.",
      "Con tu nivel Bóveda desbloqueado, escríbeme por WhatsApp y te lo mando directo — te ayudo a elegir por dónde empezar según lo que produces.",
    ],
  },
  {
    slug: "plantilla-maestra-campana",
    titulo: "De brief a guion en una tarde · plantilla maestra de campaña",
    descripcion:
      "El documento con el que paso de un brief vacío a guiones listos para producir: insight, Big Idea, estructura narrativa y hooks, en un solo flujo.",
    tipo: "plantilla",
    nivel: "avanzado",
    disponible: true,
    tags: ["campaña", "estrategia", "guiones"],
    contenido: [
      "Es la misma plantilla que uso con mis clientes activos: cada sección te obliga a decidir como director creativo antes de tocar cualquier herramienta de IA.",
      "Incluye el orden exacto de las 4 etapas, los espacios para el insight y la Big Idea, y la salida lista para alimentar tu Cerebro Creativo.",
      "Con tu nivel Bóveda desbloqueado, escríbeme por WhatsApp y te la mando directo, con un video corto de cómo la lleno yo, paso a paso.",
    ],
  },
];

// ── Los 4 recursos de la masterclass, con su metadata de bóveda ─
const METADATA_MASTERCLASS: Record<
  string,
  { tipo: TipoRecurso; nivel: NivelRecurso; tags?: string[] }
> = {
  "biblia-publicitaria": { tipo: "plantilla", nivel: "intermedio", tags: ["biblia", "cerebro creativo"] },
  "baraja-gpts": { tipo: "proyecto", nivel: "intermedio", tags: ["gpts", "flujo"] },
  "plantillas-sistema": { tipo: "plantilla", nivel: "principiante", tags: ["plantillas", "marca"] },
  "checklist-parece-agencia": { tipo: "plantilla", nivel: "principiante", tags: ["edición", "acabado"] },
};

const BOVEDA_MASTERCLASS: RecursoBoveda[] = RECURSOS_MASTERCLASS.map((r) => ({
  ...r,
  ...(METADATA_MASTERCLASS[r.slug] ?? { tipo: "plantilla" as const, nivel: "intermedio" as const }),
  cursoRelacionado: "Masterclass",
}));

// ── Guías y proyectos de la comunidad (copy 100% RESUELTO) ─────
const BOVEDA_COMUNIDAD: RecursoBoveda[] = [
  {
    slug: "skills-primer-equipo",
    titulo: "Skills de Claude · instala tu primer equipo de trabajo",
    descripcion:
      "Las skills son empleados que Claude contrata al instante: uno diseña, otro escribe, otro edita. Aquí aprendes a instalar las primeras sin saber programar.",
    tipo: "guia",
    nivel: "principiante",
    disponible: true,
    tags: ["skills", "claude", "primeros pasos"],
    contenido: [
      "Una skill es una carpeta con instrucciones que convierte a Claude en especialista de una tarea: presentaciones, hojas de cálculo, diseño, guiones. No la programas — la instalas y la usas.",
      "Empieza por el repo oficial de Anthropic (está aquí en la bóveda como anthropics/skills): descárgalo, dile a Claude «instala esta skill» y pídele la tarea. Así de directo.",
      "Mi criterio: no acumules skills que no usas. Instala una, prodúcele algo real a tu marca esta semana, y recién ahí suma la siguiente.",
    ],
  },
  {
    slug: "ahorro-de-tokens",
    titulo: "Que Claude Code no te deje a media tarea · ahorro de tokens",
    descripcion:
      "No necesitas pagar un plan más caro: necesitas administrar el contexto. Tres hábitos para que el mismo plan te rinda el doble.",
    tipo: "guia",
    nivel: "principiante",
    disponible: true,
    tags: ["tokens", "claude code", "productividad"],
    contenido: [
      "Primer hábito: una sesión, una tarea. Cuando cambias de tema en la misma conversación, arrastras todo lo anterior y pagas por ello. Cierra y abre sesión nueva.",
      "Segundo: no le pidas que relea archivos que ya leyó, y dile exactamente qué carpeta mirar en vez de dejarlo explorar todo el proyecto.",
      "Tercero: los resúmenes son tus amigos. Antes de cerrar una sesión larga, pídele que deje escrito dónde quedó — la siguiente sesión arranca de ese archivo y no de cero.",
    ],
  },
  {
    slug: "memoria-de-claude",
    titulo: "Memoria de Claude · que recuerde tu marca de un chat al otro",
    descripcion:
      "Cada chat nuevo, Claude nace de nuevo — salvo que le des memoria. Cómo dejar tu marca, tu tono y tus reglas escritas para siempre.",
    tipo: "guia",
    nivel: "principiante",
    disponible: true,
    tags: ["memoria", "adn de marca", "proyectos"],
    contenido: [
      "El error de casi todos: repetirle a la IA quién es tu marca en cada conversación. La solución es un documento de ADN de marca (el mismo concepto que ves en la masterclass) cargado donde Claude lo lea siempre.",
      "En claude.ai usa Proyectos: sube tu ADN de marca y tus referencias una vez, y todos los chats de ese proyecto arrancan sabiéndolo. En Claude Code, el archivo CLAUDE.md cumple ese rol dentro de tu carpeta.",
      "Regla práctica: si te descubres explicándole lo mismo por tercera vez, eso va al documento de memoria hoy.",
    ],
  },
  {
    slug: "comandos-claude-code",
    titulo: "Los comandos de Claude Code que sí vas a usar",
    descripcion:
      "De toda la lista de comandos, estos son los que uso a diario para producir: memoria, sesiones, costos y contexto bajo control.",
    tipo: "guia",
    nivel: "principiante",
    disponible: true,
    tags: ["comandos", "claude code"],
    contenido: [
      "/memory para editar lo que Claude recuerda de tu proyecto. /clear para arrancar limpio sin cerrar la terminal. /cost para saber cuánto llevas gastado antes de que te sorprenda.",
      "Aprende también a interrumpirlo: Escape detiene una respuesta que va por mal camino. Corregir a tiempo cuesta menos que dejarlo terminar.",
      "El resto de comandos existen, pero con estos cubres el 90% del trabajo diario de producción.",
    ],
  },
  {
    slug: "prompts-que-dirigen",
    titulo: "Prompts que dirigen · háblale a la IA como director, no como fan",
    descripcion:
      "Los modelos nuevos obedecen más de lo que crees: un párrafo claro con intención le gana a tres páginas de instrucciones. El método para escribirlo.",
    tipo: "guia",
    nivel: "principiante",
    disponible: true,
    tags: ["prompts", "dirección creativa"],
    contenido: [
      "Un buen prompt tiene la estructura de un buen brief: qué quiero lograr, para quién es, qué referencia manda y qué NO quiero ver. Si tu brief a un humano sería vago, tu prompt también lo es.",
      "Con los modelos actuales, menos es más: di el resultado esperado y el criterio de calidad, y deja que el modelo proponga el camino. Corriges sobre propuesta, igual que con un equipo real.",
      "El salto de calidad no está en palabras mágicas — está en pensar la idea antes. Por eso en mi sistema el prompting es la última etapa, no la primera.",
    ],
  },
  {
    slug: "semana-en-calendar",
    titulo: "Tu semana en Google Calendar con dos prompts",
    descripcion:
      "Conecta Claude a tu calendario, dale tus prioridades y deja que arme la semana — bloques de producción, clientes y descanso incluidos.",
    tipo: "guia",
    nivel: "principiante",
    disponible: true,
    gratis: true,
    tags: ["productividad", "calendar", "organización"],
    contenido: [
      "Activa el conector de Google Calendar en claude.ai (Configuración → Conectores). Con eso Claude puede leer y crear eventos por ti.",
      "Primer prompt: dile tus prioridades de la semana, tus horarios fijos y cuánto tiempo real te toma cada tipo de tarea. Pídele el plan en texto y corrígelo ahí mismo.",
      "Segundo prompt: «pásalo al calendario». Revisa lo creado y ajusta. Cinco minutos un domingo valen más que replanificar toda la semana.",
    ],
  },
  {
    slug: "claude-desde-cero",
    titulo: "Claude desde cero · tu primer día bien hecho",
    descripcion:
      "Para quien recién llega: qué es cada app de Claude, cuál te toca según lo que haces, y los tres primeros usos con los que se paga solo.",
    tipo: "guia",
    nivel: "principiante",
    disponible: true,
    gratis: true,
    tags: ["principiantes", "primeros pasos"],
    contenido: [
      "Claude vive en varios lugares: la app web y móvil (conversar, analizar, crear), Claude Code (construir y automatizar en tu compu) y los conectores que lo enchufan a tus herramientas. No necesitas todos el primer día.",
      "Empieza por la app: súbele un documento de tu negocio y hazle preguntas de verdad. Luego pídele que reescriba un texto tuyo en tu tono. Con eso entiendes cómo piensa.",
      "Cuando sientas el límite de la conversación, ese es el momento de pasar a Claude Code — no antes.",
    ],
  },
  {
    slug: "plugins-de-claude",
    titulo: "Plugins de Claude · vuélvelo experto en tu negocio",
    descripcion:
      "Los plugins instalan de golpe paquetes de habilidades por oficio: marketing, ventas, operaciones, diseño. Cómo elegir los que te tocan.",
    tipo: "guia",
    nivel: "intermedio",
    disponible: true,
    tags: ["plugins", "negocio", "claude code"],
    contenido: [
      "Un plugin es un paquete: skills + agentes + conexiones listas para un rol. En vez de armar pieza por pieza, instalas el rol completo y Claude ya sabe trabajar como ese especialista.",
      "Para un negocio de contenido como el nuestro, los que más rinden son los de marketing y diseño. Instala, pídele una tarea real de tu semana y evalúa el resultado contra tu estándar.",
      "Ojo con el exceso: cada plugin suma instrucciones que el modelo carga. Ten instalado lo que usas, desinstala lo que no.",
    ],
  },
  {
    slug: "disena-hablando",
    titulo: "Diseña hablando · landings y carruseles con Claude",
    descripcion:
      "Describe la pieza como se la describirías a un diseñador senior y deja que Claude arme versiones. El flujo para elegir, afinar y publicar.",
    tipo: "guia",
    nivel: "intermedio",
    disponible: true,
    tags: ["diseño", "landing", "carruseles"],
    contenido: [
      "El secreto no es la herramienta, es el brief: referencia visual clara, jerarquía de mensajes y a quién le hablas. Con eso, Claude te propone variantes en minutos y tú diriges sobre lo concreto.",
      "Pide siempre varias versiones y compáralas contra tu identidad de marca — paleta, tipografía, tono. La versión ganadora se refina con correcciones puntuales, no rehaciendo todo.",
      "En la bóveda tienes los repos de skills de diseño (Vercel, Emil Kowalski, huashu, UI/UX Pro Max) que suben el estándar visual de lo que Claude produce.",
    ],
  },
  {
    slug: "estudio-creativo-en-claude",
    titulo: "El estudio creativo que vive dentro de Claude",
    descripcion:
      "Video por código, voz clonada local y radar de tendencias: las piezas para montar un mini estudio de contenido sin pagar diez suscripciones.",
    tipo: "guia",
    nivel: "intermedio",
    disponible: true,
    tags: ["video", "voz", "tendencias"],
    contenido: [
      "Remotion e Hyperframes (ambos en la bóveda) convierten código en video: Claude escribe la animación y la renderiza a MP4. Ideal para motion graphics de marca repetibles.",
      "Voicebox es el estudio de voz local: clonas una voz y narras guiones sin depender de servicios de pago. Y last30days le da a Claude el pulso de qué está sonando en redes este mes.",
      "El orden que recomiendo: primero define qué formato produce tu marca cada semana, y recién ahí monta la herramienta que lo automatiza. El estudio se arma alrededor del sistema, no al revés.",
    ],
  },
  {
    slug: "saca-informacion-de-internet",
    titulo: "Saca información de internet sin saber programar",
    descripcion:
      "Investigar competencia, jalar comentarios, mapear tendencias: cómo darle a Claude acceso a scraping serio con el MCP de Apify.",
    tipo: "guia",
    nivel: "intermedio",
    disponible: true,
    tags: ["scraping", "investigación", "apify"],
    contenido: [
      "Apify tiene miles de «actors» — robots que extraen datos de redes y webs. Su servidor MCP (está en la bóveda) se los pone a Claude en la mano: tú pides en español, él ejecuta.",
      "Uso típico en mi flujo: bajar los últimos posts de un nicho, pedirle a Claude el patrón de los que mejor rinden, y convertir ese patrón en ideas de contenido propias.",
      "Empieza con una pregunta de negocio concreta («¿de qué habla mi competencia este mes?») y no con la herramienta. El dato sin pregunta es ruido.",
    ],
  },
  {
    slug: "claude-desde-el-telefono",
    titulo: "Claude Code desde el teléfono",
    descripcion:
      "Deja un trabajo corriendo en la compu y síguelo desde la calle: cómo continuar sesiones de Claude Code desde el celular.",
    tipo: "guia",
    nivel: "intermedio",
    disponible: true,
    tags: ["control remoto", "claude code", "móvil"],
    contenido: [
      "Claude Code ya vive también en la web y en el teléfono: una sesión que arrancaste en la compu puede continuar desde la app, y los trabajos largos pueden correr en la nube sin tu máquina prendida.",
      "Mi uso real: lanzo la producción pesada (renders, generación en lote) antes de salir, y desde el teléfono reviso avances y apruebo decisiones.",
      "La clave es dejarle instrucciones completas antes de soltarlo: criterio de calidad, qué hacer si algo falla y dónde dejar el resultado.",
    ],
  },
  {
    slug: "cerebro-externo-base-de-datos",
    titulo: "El cerebro externo · una base de datos para toda tu operación",
    descripcion:
      "En vez de conectar Claude a diez apps sueltas, vuelca todo a una base de datos y dale un solo lugar donde mirar. Arquitectura para operaciones serias.",
    tipo: "guia",
    nivel: "avanzado",
    disponible: true,
    tags: ["base de datos", "mcp", "postgres"],
    contenido: [
      "Cuando tu operación crece, conectar la IA app por app se vuelve lento y frágil. El patrón que escala: tus fuentes (correo, CRM, redes) se vuelcan a Postgres, y Claude consulta esa única base.",
      "Las piezas están en la bóveda: dlt o Airbyte para mover los datos, y postgres-mcp o supabase-mcp para que Claude lea la base con seguridad (modo solo lectura incluido).",
      "Es nivel avanzado de verdad: móntalo cuando tengas datos que ya te duelan por estar regados — no antes.",
    ],
  },
  {
    slug: "matriz-de-contenido",
    titulo: "Matriz de contenido · Claude estudia tus redes y escribe los guiones que siguen",
    descripcion:
      "Proyecto completo: bajar tus métricas reales, encontrar el patrón de lo que funciona y convertirlo en tu próximo mes de guiones.",
    tipo: "proyecto",
    nivel: "intermedio",
    disponible: true,
    tags: ["contenido viral", "guiones", "análisis"],
    contenido: [
      "La mayoría decide su contenido por intuición. Este proyecto lo decide con evidencia: Claude analiza qué publicaste, qué rindió y por qué — hooks, duración, estructura, tema.",
      "Flujo: extraes tus posts y métricas (el MCP de Apify de la bóveda sirve para esto), le pides a Claude la matriz de patrones, y de ahí salen los guiones del siguiente mes escritos sobre lo que ya probó funcionar en TU audiencia.",
      "Este proyecto conecta directo con la PARTE 1 de la masterclass: el patrón te dice el qué; el pensamiento de director creativo te da el cómo contarlo mejor.",
    ],
  },
  {
    slug: "desarma-videos-virales",
    titulo: "Desarma videos virales · la fórmula de cualquier hit, aplicada a tu marca",
    descripcion:
      "Un agente que toma un video que explotó y te devuelve su esqueleto: hook, estructura, ritmo y giro — listo para reescribirlo con tu historia.",
    tipo: "proyecto",
    nivel: "principiante",
    disponible: true,
    gratis: true,
    tags: ["storytelling", "virales", "hooks"],
    contenido: [
      "Detrás de cada video viral hay una estructura que se puede nombrar: tipo de gancho, promesa, desarrollo, recompensa. Este proyecto entrena a Claude para extraerla de cualquier referencia que le pases.",
      "Le das la transcripción o descripción del video, y te devuelve la plantilla narrativa vacía. Tu trabajo de director es llenarla con una historia verdadera de tu marca — copiar la estructura, jamás el contenido.",
      "Combínalo con las 10 estructuras narrativas y los 9 hooks de la masterclass y tienes una fábrica de guiones con criterio.",
    ],
  },
  {
    slug: "tu-web-sin-agencia",
    titulo: "Tu web sin agencia · Claude la diseña, la construye y la publica",
    descripcion:
      "El proyecto para tener una landing profesional sin pagar una: del brief conversado al sitio publicado, dirigido por ti.",
    tipo: "proyecto",
    nivel: "intermedio",
    disponible: true,
    gratis: true,
    tags: ["web", "landing", "claude code"],
    contenido: [
      "Una landing de agencia se cobra en miles por una razón: estrategia + diseño + código. Claude puede ejecutar las tres si tú pones la dirección — este proyecto te da el orden.",
      "Fase 1: conversa el brief (a quién le vendes, qué acción quieres, qué te hace distinto) y pide el blueprint por escrito. Fase 2: Claude Code construye sección por sección contra ese documento. Fase 3: publicar y medir.",
      "Mi consejo de producción: aprueba el texto antes que el diseño, y el diseño antes que el código. Corregir palabras es gratis; corregir código construido, no.",
    ],
  },
  {
    slug: "niveles-de-esfuerzo",
    titulo: "Cuánto piensa Claude · los niveles de esfuerzo y cuándo NO usar el máximo",
    descripcion:
      "Traerlo siempre en máximo no te da mejor resultado — te cobra más, tarda más y en tareas simples hasta responde peor. Cómo elegir el nivel correcto según lo que le pides.",
    tipo: "guia",
    nivel: "intermedio",
    disponible: true,
    tags: ["niveles de esfuerzo", "claude code", "ahorro de tokens"],
    contenido: [
      "El esfuerzo es una perilla, no un botón de «mejor calidad». Subirla en tareas que no la necesitan no mejora el resultado — a veces lo empeora, porque el modelo sobre-piensa algo simple, y de paso quema minutos y presupuesto que necesitas para la tarea grande del día.",
      "La regla práctica: empieza en un nivel medio por default, y sube solo cuando sientas que la respuesta se quedó corta o superficial. Resérvalo alto para estrategia de campaña completa, depurar un problema que no encuentras, o la tarea más pesada del mes — no para lo rutinario.",
      "Antes de lanzar una tarea, pregúntale a Claude en una línea si le conviene más esfuerzo del que trae — cuesta un segundo y te evita pagar de más por algo que no lo necesitaba.",
    ],
  },
  {
    slug: "mas-comandos-claude-code",
    titulo: "Más comandos de Claude Code · los que suman cuando ya no eres principiante",
    descripcion:
      "Ya tienes /memory, /clear y /cost. Estos son los que uso cuando el proyecto crece: repartir tareas, revisar qué está conectado y recuperar una sesión que se cortó.",
    tipo: "guia",
    nivel: "intermedio",
    disponible: true,
    tags: ["comandos", "claude code", "productividad"],
    cursoRelacionado: "Comandos de Claude Code",
    contenido: [
      "Cuando empiezas, con los seis comandos básicos te alcanza. El punto donde necesitas más es cuando el trabajo crece: varias piezas en paralelo, herramientas conectadas que hay que auditar, sesiones que se cortan a media tarea.",
      "/agents arma tu equipo de subagentes especializados corriendo en paralelo. /mcp revisa qué herramientas externas están conectadas a esa sesión. /resume retoma una sesión anterior sin explicar todo de nuevo. /doctor diagnostica tu instalación cuando algo falla. /permissions ajusta qué puede hacer Claude sin pedirte autorización cada vez. /add-dir suma otra carpeta cuando el trabajo cruza más de un proyecto. /export saca la conversación completa a un archivo para guardar una decisión importante.",
      "No memorices la lista: escribe / solo y mira el menú, con una línea de qué hace cada comando. Prueba uno nuevo por semana y anota en tu propio CLAUDE.md los tres o cuatro que terminen entrando de verdad a tu rutina.",
    ],
  },
  {
    slug: "terminal-o-app",
    titulo: "Terminal o app · qué versión de Claude Code te conviene",
    descripcion:
      "Claude Code vive en la terminal y en una app con interfaz. No son lo mismo: una te da control total, la otra velocidad para empezar. Cuál te conviene según lo que produces.",
    tipo: "guia",
    nivel: "principiante",
    disponible: true,
    tags: ["claude code", "terminal", "principiantes"],
    contenido: [
      "Terminal y app corren el mismo Claude Code por debajo, pero cambian cuánto ves y cuánto controlas. La terminal es la versión completa: acceso total a tus archivos, tareas en segundo plano o programadas, y tus propias herramientas (skills, MCP, hooks). La app es la versión guiada: más rápida para empezar, con menos perillas que tocar.",
      "Si estás armando tus primeras piezas de contenido o recién estás probando el sistema, empieza en la app — sin fricción. El día que sientas el límite (necesitas más control, más herramientas conectadas, tareas que corran solas), ese es tu momento de pasar a la terminal, no antes.",
      "No hace falta elegir una para siempre: yo uso ambas según la tarea del día. La herramienta correcta es la que no te hace pensar en la herramienta — solo en lo que estás produciendo.",
    ],
  },
];

// ── Repos de la comunidad (terceros/oficiales, descripciones propias) ─
const BOVEDA_REPOS: RecursoBoveda[] = [
  {
    slug: "repo-anthropics-skills",
    titulo: "anthropics/skills",
    descripcion:
      "El repo oficial de Anthropic con skills listas y de referencia. El mejor punto de partida para instalar tu primer equipo.",
    tipo: "repo",
    nivel: "principiante",
    disponible: true,
    linkExterno: "https://github.com/anthropics/skills",
    tags: ["skills", "oficial"],
  },
  {
    slug: "repo-awesome-claude-skills",
    titulo: "ComposioHQ/awesome-claude-skills",
    descripcion:
      "Colección curada con más de cien skills de la comunidad. Para cuando ya sabes qué buscas y quieres opciones.",
    tipo: "repo",
    nivel: "principiante",
    disponible: true,
    linkExterno: "https://github.com/ComposioHQ/awesome-claude-skills",
    tags: ["skills", "colección"],
  },
  {
    slug: "repo-vercel-agent-skills",
    titulo: "vercel-labs/agent-skills",
    descripcion:
      "Skills de Vercel para Claude; incluye la auditoría de diseño web que reviso antes de publicar cualquier landing.",
    tipo: "repo",
    nivel: "intermedio",
    disponible: true,
    linkExterno: "https://github.com/vercel-labs/agent-skills",
    tags: ["diseño", "web"],
  },
  {
    slug: "repo-emil-skill",
    titulo: "emilkowalski/skill",
    descripcion:
      "La skill de animaciones web de Emil Kowalski: transiciones y micro-interacciones con gusto, no con exceso.",
    tipo: "repo",
    nivel: "intermedio",
    disponible: true,
    linkExterno: "https://github.com/emilkowalski/skill",
    tags: ["animación", "web"],
  },
  {
    slug: "repo-huashu-design",
    titulo: "alchaincyf/huashu-design",
    descripcion:
      "Siete modos de diseño para Claude Code: prototipos, decks, motion e infografías con variantes para elegir.",
    tipo: "repo",
    nivel: "intermedio",
    disponible: true,
    linkExterno: "https://github.com/alchaincyf/huashu-design",
    tags: ["diseño", "decks"],
  },
  {
    slug: "repo-ui-ux-pro-max",
    titulo: "nextlevelbuilder/ui-ux-pro-max-skill",
    descripcion:
      "Biblioteca gigante de estilos, paletas y pareos tipográficos para que tus piezas web no tengan «look de IA».",
    tipo: "repo",
    nivel: "intermedio",
    disponible: true,
    linkExterno: "https://github.com/nextlevelbuilder/ui-ux-pro-max-skill",
    tags: ["ui", "estilos"],
  },
  {
    slug: "repo-remotion",
    titulo: "remotion-dev/remotion",
    descripcion:
      "Video hecho con código React: Claude escribe los componentes y renderiza MP4. Motion graphics de marca repetibles.",
    tipo: "repo",
    nivel: "avanzado",
    disponible: true,
    linkExterno: "https://github.com/remotion-dev/remotion",
    tags: ["video", "código"],
  },
  {
    slug: "repo-hyperframes",
    titulo: "heygen-com/hyperframes",
    descripcion:
      "CLI que convierte HTML/CSS en video MP4. La vía rápida para animaciones de texto y gráficos sin editor.",
    tipo: "repo",
    nivel: "avanzado",
    disponible: true,
    linkExterno: "https://github.com/heygen-com/hyperframes",
    tags: ["video", "código"],
  },
  {
    slug: "repo-voicebox",
    titulo: "jamiepine/voicebox",
    descripcion:
      "Estudio de voz local y gratuito: clona voces y narra guiones en tu propia máquina, sin suscripción.",
    tipo: "repo",
    nivel: "intermedio",
    disponible: true,
    linkExterno: "https://github.com/jamiepine/voicebox",
    tags: ["voz", "audio"],
  },
  {
    slug: "repo-last30days",
    titulo: "mvanhorn/last30days-skill",
    descripcion:
      "El radar de tendencias: jala lo que sonó en Reddit, X, YouTube y GitHub el último mes para alimentar tu matriz de contenido.",
    tipo: "repo",
    nivel: "principiante",
    disponible: true,
    linkExterno: "https://github.com/mvanhorn/last30days-skill",
    tags: ["tendencias", "investigación"],
  },
  {
    slug: "repo-apify-mcp",
    titulo: "apify/apify-mcp-server",
    descripcion:
      "El MCP oficial de Apify: le da a Claude acceso a miles de extractores de datos de redes y webs desde el chat.",
    tipo: "repo",
    nivel: "intermedio",
    disponible: true,
    linkExterno: "https://github.com/apify/apify-mcp-server",
    tags: ["scraping", "mcp"],
  },
  {
    slug: "repo-supabase-mcp",
    titulo: "supabase-community/supabase-mcp",
    descripcion:
      "Conecta tus proyectos de Supabase a Claude por MCP. La puerta de entrada al patrón de «cerebro externo».",
    tipo: "repo",
    nivel: "avanzado",
    disponible: true,
    linkExterno: "https://github.com/supabase-community/supabase-mcp",
    tags: ["base de datos", "mcp"],
  },
  {
    slug: "repo-postgres-mcp",
    titulo: "crystaldba/postgres-mcp",
    descripcion:
      "MCP de Postgres con modo solo lectura y chequeos de salud — para que la IA consulte tu base sin riesgo.",
    tipo: "repo",
    nivel: "avanzado",
    disponible: true,
    linkExterno: "https://github.com/crystaldba/postgres-mcp",
    tags: ["base de datos", "mcp"],
  },
  {
    slug: "repo-dlt",
    titulo: "dlt-hub/dlt",
    descripcion:
      "Librería de Python para volcar tus fuentes (correo, CRM, redes) a una base de datos con poco código.",
    tipo: "repo",
    nivel: "avanzado",
    disponible: true,
    linkExterno: "https://github.com/dlt-hub/dlt",
    tags: ["datos", "pipelines"],
  },
  {
    slug: "repo-airbyte",
    titulo: "airbytehq/airbyte",
    descripcion:
      "Plataforma de sincronización con cientos de conectores para centralizar tus datos. La opción robusta del cerebro externo.",
    tipo: "repo",
    nivel: "avanzado",
    disponible: true,
    linkExterno: "https://github.com/airbytehq/airbyte",
    tags: ["datos", "conectores"],
  },
  {
    slug: "repo-ponytail",
    titulo: "DietrichGebert/ponytail",
    descripcion:
      "Plugin que pone a Claude a escribir solo el código necesario. Menos líneas, menos bugs, proyectos más sanos.",
    tipo: "repo",
    nivel: "intermedio",
    disponible: true,
    linkExterno: "https://github.com/DietrichGebert/ponytail",
    tags: ["claude code", "calidad"],
  },
  {
    slug: "repo-claude-video-vision",
    titulo: "jordanrendric/claude-video-vision",
    descripcion:
      "Le pasas un reel viral y te devuelve su esqueleto: hook, tomas, ritmo y transiciones, plano por plano. El complemento técnico de mi proyecto «Desarma videos virales».",
    tipo: "repo",
    nivel: "intermedio",
    disponible: true,
    linkExterno: "https://github.com/jordanrendric/claude-video-vision",
    tags: ["análisis de video", "virales", "claude code"],
  },
  {
    slug: "repo-humanizer-blader",
    titulo: "blader/humanizer",
    descripcion:
      "La herramienta que le quita a un texto los tics de IA — frases infladas, muletillas de robot — antes de publicarlo. En mi flujo ningún guion sale sin pasar por un humanizer; esta es la versión open-source si quieres la tuya.",
    tipo: "repo",
    nivel: "principiante",
    disponible: true,
    linkExterno: "https://github.com/blader/humanizer",
    tags: ["guiones", "humanizer", "edición de texto"],
  },
  {
    slug: "repo-awesome-gpt-image-2",
    titulo: "YouMind-OpenLab/awesome-gpt-image-2",
    descripcion:
      "Más de 4,000 prompts probados para GPT Image 2 — el mismo modelo que uso dentro de Higgsfield. Banco de referencia para cuando se te seca la idea de cómo pedir una imagen.",
    tipo: "repo",
    nivel: "intermedio",
    disponible: true,
    linkExterno: "https://github.com/YouMind-OpenLab/awesome-gpt-image-2",
    tags: ["prompts", "imagen", "gpt image"],
  },
  {
    slug: "repo-agent-browser-vercel",
    titulo: "vercel-labs/agent-browser",
    descripcion:
      "Un navegador para Claude que le cuesta hasta 10 veces menos investigar en internet. Súmalo a tu kit de scraping — mismo territorio que Apify, pero para cuando la tarea es navegar y leer, no extraer en volumen.",
    tipo: "repo",
    nivel: "intermedio",
    disponible: true,
    linkExterno: "https://github.com/vercel-labs/agent-browser",
    tags: ["navegador", "scraping", "investigación"],
  },
  {
    slug: "repo-claude-ads-agricidaniel",
    titulo: "AgriciDaniel/claude-ads",
    descripcion:
      "Skill de la comunidad que audita tus campañas de Meta Ads con reglas de seguridad incluidas. Segundo par de ojos antes de subir presupuesto — no reemplaza el criterio de «Mide lo que vende», lo complementa.",
    tipo: "repo",
    nivel: "intermedio",
    disponible: true,
    linkExterno: "https://github.com/AgriciDaniel/claude-ads",
    tags: ["meta ads", "auditoría", "claude code"],
  },
  {
    slug: "repo-awesome-design-md",
    titulo: "VoltAgent/awesome-design-md",
    descripcion:
      "55 documentos de identidad de marca de empresas reales, en el mismo formato que tu ADN de marca. Cópiate uno como plantilla y Claude diseña ya alineado a ese estilo.",
    tipo: "repo",
    nivel: "principiante",
    disponible: true,
    linkExterno: "https://github.com/VoltAgent/awesome-design-md",
    tags: ["identidad de marca", "diseño", "adn de marca"],
  },
  {
    slug: "repo-marketing-skills-stack",
    titulo: "coreyhaines31/marketingskills",
    descripcion:
      "Un stack de más de 25 skills de marketing para Claude Code — copywriting, SEO, ads, email — instalables juntas. Para cuando quieres que Claude piense como un equipo de marketing completo, no solo un redactor.",
    tipo: "repo",
    nivel: "intermedio",
    disponible: true,
    linkExterno: "https://github.com/coreyhaines31/marketingskills",
    tags: ["marketing", "skills", "claude code"],
  },
];

// ── Meta Ads (pauta con criterio, no con suerte) ────────────────
const BOVEDA_META_ADS: RecursoBoveda[] = [
  {
    slug: "meta-ads-sin-quemar-plata",
    titulo: "Tu primera campaña en Meta Ads sin quemar plata",
    descripcion:
      "Lo que haría si empezara de cero con presupuesto chico: un objetivo, un creativo fuerte y una sola variable de prueba a la vez.",
    tipo: "guia",
    nivel: "principiante",
    disponible: true,
    gratis: true,
    tags: ["meta ads", "pauta", "facebook", "instagram"],
    contenido: [
      "El error número uno en Meta Ads no es la segmentación — es entrar sin saber qué acción quieres provocar. Antes de tocar el administrador de anuncios, define una sola cosa: ¿este ad existe para que te vean, para que te escriban o para que compren? Cada objetivo se configura distinto y se mide distinto.",
      "Con presupuesto chico, la disciplina es una: prueba UNA variable a la vez. Mismo creativo con dos audiencias, o misma audiencia con dos creativos — nunca todo junto, porque después no sabes qué funcionó.",
      "Y la verdad incómoda: hoy el creativo pesa más que la segmentación. Meta encuentra a tu gente si el video es bueno. Por eso en este sistema la pauta viene DESPUÉS del contenido, no antes.",
    ],
  },
  {
    slug: "follow-me-ads",
    titulo: "Follow Me Ads · la pauta chica que trabaja mientras duermes",
    descripcion:
      "Entre $5 y $10 al día para perseguir a quien ya te vio: el formato de remarketing que convierte contenido en conversaciones de venta.",
    tipo: "guia",
    nivel: "intermedio",
    disponible: true,
    tags: ["meta ads", "remarketing", "follow me ads"],
    contenido: [
      "La lógica es simple: la primera vez que alguien te ve, no te compra. Los Follow Me Ads son campañas de presupuesto bajo ($5–10 diarios) dirigidas a gente que ya interactuó contigo — vieron tus reels, visitaron tu perfil, te dejaron un like. Ya te conocen; ahora toca que te recuerden.",
      "El creativo correcto para este formato NO es tu reel más viral — es tu contenido más técnico y específico, el que demuestra que sabes. El viral atrae a todos; el técnico convence al que va a pagar.",
      "El cierre pasa en el DM: el ad invita a comentar o escribirte, y la conversación hace la venta. Mide conversaciones iniciadas y ventas, no likes.",
    ],
  },
  {
    slug: "creativos-para-ads",
    titulo: "El creativo decide · ads que parecen contenido",
    descripcion:
      "Los anuncios que funcionan hoy no parecen anuncios. Cómo producir creativos nativos con el mismo sistema que usas para tu contenido orgánico.",
    tipo: "guia",
    nivel: "intermedio",
    disponible: true,
    tags: ["meta ads", "creativos", "video"],
    contenido: [
      "El usuario huele el anuncio a un scroll de distancia y lo salta. Los creativos que rinden se ven como contenido: gancho en el primer segundo, formato vertical nativo, subtítulos, ritmo de reel. La única diferencia con tu orgánico es que este lleva pauta detrás.",
      "Produce variantes del mismo mensaje con ganchos distintos (aquí conecta directo con «Los 10 ganchos» de esta bóveda): Meta reparte el presupuesto hacia el que funciona y tú aprendes qué le duele a tu audiencia.",
      "Cuando un creativo gana, no lo toques — escálalo. Y cuando se agote (la frecuencia sube y el costo también), no cambies la audiencia: cambia el creativo. Se itera el video, no el público.",
    ],
  },
  {
    slug: "medir-lo-que-vende",
    titulo: "Mide lo que vende · píxel, eventos y el número que importa",
    descripcion:
      "Likes no pagan facturas. Cómo instalar la medición mínima para saber exactamente qué anuncio te trae clientes y cuánto te cuesta cada uno.",
    tipo: "guia",
    nivel: "intermedio",
    disponible: true,
    tags: ["meta ads", "píxel", "medición"],
    contenido: [
      "Sin medición, la pauta es apuesta. El píxel de Meta en tu web (o los eventos de mensaje si vendes por DM/WhatsApp) le dice al algoritmo quién sí hizo lo que querías — y a ti, qué anuncio lo provocó.",
      "El único número que manda es el costo por resultado: cuánto te cuesta una conversación iniciada, un registro o una venta. Un ad con miles de reproducciones y cero conversaciones es un mal ad con buena máscara.",
      "Revisa la campaña con calendario, no con ansiedad: una vez cada 3–4 días. Los cambios diarios reinician el aprendizaje del algoritmo y te cuestan plata.",
    ],
  },
];

// ── Producción con IA (Higgsfield + el stack real del sistema) ──
const BOVEDA_PRODUCCION: RecursoBoveda[] = [
  {
    slug: "higgsfield-desde-cero",
    titulo: "Higgsfield desde cero · la máquina de imagen del sistema",
    descripcion:
      "La plataforma donde genero imagen y motion para clientes reales: qué modelo usar para qué (Nano, Banana Pro, GPT-2 Image) y cómo encaja en el flujo.",
    tipo: "guia",
    nivel: "principiante",
    disponible: true,
    tags: ["higgsfield", "imagen", "producción"],
    contenido: [
      "Higgsfield es la máquina de generación del sistema: imagen, motion y video en una sola plataforma. Pero la máquina no piensa — ejecuta. Por eso en mi flujo el prompt llega a Higgsfield ya pensado: primero la idea (dirección creativa), después la generación.",
      "Cada modelo tiene su cancha: Nano para volumen y velocidad, Banana Pro cuando la pieza pide detalle y realismo, GPT-2 Image cuando necesitas que respete texto e instrucciones finas. Probar el mismo prompt en dos modelos te enseña más que cualquier tutorial.",
      "El prompt que funciona es el que describe como director de foto: lente, luz, atmósfera, paleta. En la bóveda tienes el pack premium de prompts cinematográficos si quieres los míos calibrados de producción real.",
    ],
  },
  {
    slug: "personaje-consistente",
    titulo: "Personaje consistente · la misma cara en toda tu campaña",
    descripcion:
      "El problema número uno del video con IA: que tu personaje cambie de cara entre escenas. El método de la hoja de personaje para resolverlo.",
    tipo: "guia",
    nivel: "intermedio",
    disponible: true,
    tags: ["higgsfield", "consistencia", "personaje"],
    contenido: [
      "Una campaña necesita un protagonista que sea EL MISMO en la escena 1 y en la 12. La IA por defecto no te lo da: cada generación inventa una cara nueva. La solución no es suerte — es documentación.",
      "La hoja de personaje (está en «Plantillas del sistema», aquí en la bóveda) fija lo que no puede cambiar: rasgos, edad, vestuario, actitud, iluminación de referencia. Esa descripción viaja COMPLETA en cada prompt, palabra por palabra.",
      "Trabaja con imagen de referencia siempre que la plataforma lo permita: generas tu personaje una vez, lo apruebas, y esa imagen ancla todas las escenas siguientes. Cambia la acción y el fondo — nunca la descripción del personaje.",
    ],
  },
  {
    slug: "de-imagen-a-video",
    titulo: "De imagen a video · Kling y Seedance dirigidos con intención",
    descripcion:
      "Los dos motores de video de máxima calidad del stack: Kling 3.0 para movimiento realista y Seedance 2.5 —ya con edición por región, 50 referencias y audio nativo— cuando la pieza lleva voz y audio sincronizado.",
    tipo: "guia",
    nivel: "intermedio",
    disponible: true,
    tags: ["kling", "seedance", "seedance 2.5", "video"],
    contenido: [
      "El salto de calidad en video IA no está en generar más — está en dirigir mejor. Kling 3.0 es mi elección cuando la escena pide física creíble: caminatas, telas, agua, cámara en movimiento. Seedance 2.5 entra cuando el video necesita voz o audio sincronizado con la imagen — y desde su salto de versión, además corrige un detalle puntual sin regenerar el clip entero.",
      "El prompt de video se escribe como una escena de guion: quién hace qué, cómo se mueve la cámara, qué pasa al inicio y qué pasa al final de los segundos que dura. «Mujer caminando» es una lotería; una escena descrita con intención es una toma.",
      "Regla de producción: la imagen primero. Genera y aprueba el frame inicial en Higgsfield, y recién ahí anímalo. Corregir una imagen cuesta segundos; corregir un video generado, cuesta el render entero.",
    ],
  },
  {
    slug: "voz-y-presentadores-ia",
    titulo: "Voz y presentadores IA · ElevenLabs y HeyGen bien usados",
    descripcion:
      "Voiceover con intención y avatares que no dan vergüenza ajena: dónde brillan estas dos herramientas y dónde es mejor no usarlas.",
    tipo: "guia",
    nivel: "principiante",
    disponible: true,
    tags: ["elevenlabs", "heygen", "voz"],
    contenido: [
      "ElevenLabs pone la narración: elige una voz que suene a tu marca (no la más «épica» — la más creíble) y dirígela con puntuación: las comas y los puntos son tus pausas, las palabras en mayúscula tu énfasis. Un buen guion mal narrado muere; uno bien narrado sostiene el video entero.",
      "HeyGen resuelve el talking-head cuando no puedes grabar: presentadores para videos corporativos, versiones en otros idiomas, avatares de marca. Funciona mejor con guiones cortos y directos que con monólogos largos.",
      "Dónde NO usarlos: cuando la pieza pide emoción humana real (testimonios, historia personal fuerte). Ahí la cámara del teléfono le gana a cualquier IA — y mezclar ambos mundos es exactamente lo que hace que tu contenido no se sienta «hecho con IA».",
    ],
  },
];

// ── Contenido (el sistema de reels que uso para mí y mis clientes) ──
const BOVEDA_CONTENIDO: RecursoBoveda[] = [
  {
    slug: "los-10-ganchos",
    titulo: "Los 10 ganchos que detienen el scroll",
    descripcion:
      "El primer segundo decide todo. Los diez tipos de gancho que uso en guiones reales, con la lógica de cuándo dispara cada uno.",
    tipo: "guia",
    nivel: "principiante",
    disponible: true,
    tags: ["ganchos", "hooks", "reels", "contenido"],
    contenido: [
      "Un reel sin gancho es un reel muerto, aunque el resto sea brillante. Los diez tipos que trabajo: dopamínico (contradice una creencia), cuantitativo (cifras específicas), curiosidad (misterio abierto), promesa (resultado claro), autoridad personal (el «cómo lo hice yo»), exclusividad (grupo selecto), dolor/urgencia (pérdida inminente), novedad (lo que nadie ha visto), comparación (contraste directo) y desafío (participación en comentarios).",
      "Cada gancho activa un resorte psicológico distinto: la curiosidad abre un vacío que el cerebro necesita cerrar; la contradicción interrumpe el patrón del scroll; la cifra concreta vuelve creíble la promesa. Elegir gancho es elegir qué resorte tocas.",
      "Ejercicio de esta semana: toma tu próximo guion y escríbele cinco ganchos de tipos distintos antes de grabar. El que te incomode un poco suele ser el bueno.",
    ],
  },
  {
    slug: "estructuras-que-retienen",
    titulo: "Estructuras que retienen · del gancho al CTA sin perder gente",
    descripcion:
      "Las cuatro estructuras narrativas que sostienen un reel completo: GVCTA, GHMA, DEI y Problema–Solución–Prueba. Cuál usar según lo que vendes.",
    tipo: "guia",
    nivel: "intermedio",
    disponible: true,
    tags: ["estructuras", "guiones", "storytelling"],
    contenido: [
      "El gancho te compra tres segundos; la estructura te compra el video entero. Las cuatro que uso: Gancho–Valor–CTA (la base de todo contenido educativo), Gancho–Historia–Moraleja–Acción (cuando cuentas experiencia propia), Demo–Explicación–Invitación (perfecta para mostrar IA con efecto «wow») y Problema–Solución–Prueba–CTA (la de venta directa).",
      "La elección depende del objetivo: ¿atracción, autoridad o conversión? Un video de atracción vive del gancho y el valor rápido; uno de autoridad respira más y demuestra profundidad; uno de conversión necesita prueba (cifras, casos, testimonios) antes del CTA.",
      "Y la regla que nadie respeta: UN concepto por video. Si tu guion explica tres ideas, son tres videos — saturar una pieza es la forma más cara de perder audiencia.",
    ],
  },
  {
    slug: "edicion-con-ritmo",
    titulo: "Edición con ritmo · las reglas de CapCut que separan amateur de pro",
    descripcion:
      "Cortes, subtítulos, zooms y b-roll: las reglas de edición que hacen que un video retenga — y las diferencias entre TikTok y YouTube.",
    tipo: "guia",
    nivel: "principiante",
    disponible: true,
    tags: ["edición", "capcut", "ritmo"],
    contenido: [
      "La retención se edita: cortes cada 1–3 segundos (cada corte resetea la atención), subtítulos en colores contrastantes con énfasis en palabras clave, zooms en los puntos importantes y b-roll que visualice lo que dices en vez de dejarte hablando a cámara dos minutos.",
      "Lo no negociable es lo básico: audio limpio y buena iluminación. El espectador perdona imagen imperfecta; no perdona no entender lo que dices. Y el logo va en la esquina, presente pero sin gritar.",
      "Ajusta la agresividad al canal: TikTok pide edición rápida y densa; YouTube respira más. El mismo guion se edita distinto según dónde vive — reciclar el export exacto entre plataformas es dejar retención sobre la mesa.",
    ],
  },
  {
    slug: "calendario-mes-en-una-tarde",
    titulo: "Tu mes de contenido en una tarde",
    descripcion:
      "Proyecto: el sistema de pilares por objetivo (atracción, autoridad, conversión) para planear y dejar escrito un mes completo en una sola sesión.",
    tipo: "proyecto",
    nivel: "principiante",
    disponible: true,
    tags: ["calendario", "planificación", "contenido"],
    contenido: [
      "La inconsistencia mata más cuentas que el mal contenido. Este proyecto arma tu mes en una tarde: primero defines tus pilares por objetivo — piezas de atracción (ganchos fuertes, demos, comparaciones), de autoridad (frameworks, casos, análisis) y de conversión (CTA directo, historias de transformación).",
      "Con los pilares claros, la proporción: la mayoría del mes atrae, una parte demuestra autoridad y unas pocas piezas venden. De ahí sale la matriz: tema + gancho + estructura por cada fecha del calendario.",
      "Los guiones los escribes en lote con tu Cerebro Creativo (como se trabaja en la masterclass): misma sesión, mismo contexto de marca, diez guiones de una sentada. Grabar y editar se vuelve ejecución, no decisión diaria.",
    ],
  },
  {
    slug: "embudo-del-reel-al-cliente",
    titulo: "El embudo completo · del reel al DM al cliente",
    descripcion:
      "Proyecto: cómo se conecta todo — contenido que atrae, DMs que nutren, Follow Me Ads que persiguen y el número de negocio que de verdad importa.",
    tipo: "proyecto",
    nivel: "intermedio",
    disponible: true,
    tags: ["embudo", "ventas", "dm", "contenido"],
    contenido: [
      "El contenido sin embudo es entretenimiento gratis. El circuito completo: reels con gancho atraen → el CTA lleva a un lead magnet o a una palabra clave en comentarios → la conversación de DM nutre con valor real → la oferta cierra → y los Follow Me Ads (guía aparte en esta bóveda) persiguen a quien vio pero no escribió.",
      "Cada etapa tiene su métrica: alcance en atracción, conversaciones iniciadas en nutrición, ventas en conversión. Si mides likes, estás midiendo el aplauso y no la caja.",
      "El error clásico es publicar sin seguimiento: el 80% del resultado está en qué pasa DESPUÉS de que alguien comenta. Responde rápido, con guion de conversación (no de robot), y registra cada lead — aunque tu CRM sea una hoja de cálculo.",
    ],
  },
];

// Los recursos de la bóveda SIN las guías a fondo. El ensamblado final
// (que une las secciones por slug) vive en lib/taller/boveda-server.ts y
// SOLO se importa desde páginas/rutas del servidor: si un componente
// cliente importara la bóveda completa, todo el contenido de pago se
// filtraría en el JS del navegador.
// ── Creatividad publicitaria (el oficio antes de la herramienta) ─
// Salen del Cerebro de Aprendizaje. Van GRATIS a propósito: son la
// vitrina del método y la entrada SEO al embudo. Sus guías a fondo
// viven en lib/taller/boveda/guias-creatividad.ts.
const BOVEDA_CREATIVIDAD: RecursoBoveda[] = [
  {
    slug: "insight-los-6-tipos",
    titulo: "El insight: los 6 tipos y cómo excavarlos",
    descripcion:
      "El dato no es el insight. Los cuatro niveles que separan un número de una verdad humana, y los seis lugares donde de verdad se busca.",
    tipo: "guia",
    nivel: "principiante",
    disponible: true,
    gratis: true,
    tags: ["insight", "estrategia", "dirección creativa"],
  },
  {
    slug: "del-insight-al-concepto",
    titulo: "Del insight al concepto · los 5 tipos que existen",
    descripcion:
      "Concepto, idea y ejecución no son lo mismo, y confundirlos es por lo que una campaña se cae en la segunda pieza.",
    tipo: "guia",
    nivel: "intermedio",
    disponible: true,
    gratis: true,
    tags: ["concepto", "ideación", "campaña"],
  },
  {
    slug: "la-big-idea",
    titulo: "La Big Idea · los 5 tipos y cómo saber si la tuya es grande",
    descripcion:
      "Arriba del concepto hay otro piso. Qué distingue una idea que dura décadas de una que se agota en la segunda temporada.",
    tipo: "guia",
    nivel: "avanzado",
    disponible: true,
    gratis: true,
    tags: ["big idea", "marca", "estrategia"],
  },
  {
    slug: "retorica-publicitaria",
    titulo: "Retórica publicitaria · las 12 figuras del oficio",
    descripcion:
      "Sin retórica no hay concepto. Los doce mecanismos que hacen que lo dicho signifique más de lo que las palabras dicen.",
    tipo: "guia",
    nivel: "intermedio",
    disponible: true,
    gratis: true,
    tags: ["retórica", "ideación", "copy"],
  },
  {
    slug: "estructuras-narrativas",
    titulo: "Las 10 estructuras narrativas publicitarias",
    descripcion:
      "El orden en que entregas la información decide si te ven completo. Las diez estructuras, con su «cuándo NO usarla».",
    tipo: "guia",
    nivel: "intermedio",
    disponible: true,
    gratis: true,
    tags: ["guion", "narrativa", "spot"],
  },
  {
    slug: "formulas-de-headline",
    titulo: "Las 8 fórmulas de headline que no fallan",
    descripcion:
      "Antes de elegir fórmula hay que saber si escribes respuesta directa o marca: las reglas se contradicen y mezclarlas mata las dos.",
    tipo: "guia",
    nivel: "principiante",
    disponible: true,
    gratis: true,
    tags: ["copy", "headline", "redacción"],
  },
  {
    slug: "generos-del-storytelling",
    titulo: "Los 10 géneros del storytelling publicitario",
    descripcion:
      "El género es un contrato emocional: define casting, música, edición, color y hasta el lente. Elegirlo mal es el error invisible.",
    tipo: "guia",
    nivel: "intermedio",
    disponible: true,
    gratis: true,
    tags: ["storytelling", "género", "producción"],
  },
  {
    slug: "arquitectura-de-campana",
    titulo: "Arquitectura de campaña · Hero, Hub y Help",
    descripcion:
      "Lo que hace que veinte piezas se sientan como una sola cosa. Las tres velocidades del contenido y la matriz que las ordena.",
    tipo: "guia",
    nivel: "avanzado",
    disponible: true,
    gratis: true,
    tags: ["campaña", "estrategia", "contenido"],
  },
];

// ── Producción con Higgsfield (documentación del fabricante) ────
// Escritas desde el blog oficial de Higgsfield y bajadas al flujo real
// de RESUELTO. Van con candado: son el «cómo se hace» que compra el
// alumno, no la vitrina. Guías en lib/taller/boveda/guias-higgsfield.ts.
const BOVEDA_HIGGSFIELD: RecursoBoveda[] = [
  {
    slug: "control-de-camara-ia",
    titulo: "Control de cámara, ángulos y lente en video IA",
    descripcion:
      "Por qué «dolly lento» te da algo distinto en cada corrida, y qué se fija como parámetro para que una toma sea repetible — actualizado con los controles de Cinema Studio 4.0: Tempo, Emotion Wheel y época.",
    tipo: "guia",
    nivel: "intermedio",
    disponible: true,
    tags: ["cámara", "higgsfield", "dirección", "video", "cinema studio"],
  },
  {
    slug: "manos-y-caras-ia",
    titulo: "Manos y caras: por qué la IA las rompe y cómo evitarlo",
    descripcion:
      "Las dos cosas que el espectador detecta más rápido. Por qué fallan de forma estructural y los cinco arreglos que sí funcionan.",
    tipo: "guia",
    nivel: "intermedio",
    disponible: true,
    tags: ["consistencia", "soul id", "errores", "higgsfield"],
  },
  {
    slug: "video-de-producto-sin-estudio",
    titulo: "Video de producto sin estudio, sin cámara y sin equipo",
    descripcion:
      "Los formatos de anuncio que existen, cuál va con cada producto, y el flujo completo que arranca desde la URL del producto.",
    tipo: "guia",
    nivel: "principiante",
    disponible: true,
    tags: ["producto", "ugc", "anuncios", "higgsfield"],
  },
  {
    slug: "motion-design-con-ia",
    titulo: "Motion design con IA · placas, datos y cierres de marca",
    descripcion:
      "El motion es estructura, no escena: tiempos, jerarquía y tipografía. Dónde rinde y por qué no se resuelve con video generativo.",
    tipo: "guia",
    nivel: "intermedio",
    disponible: true,
    tags: ["motion", "infografía", "marca", "higgsfield"],
  },
  {
    slug: "higgsfield-en-after-effects",
    titulo: "Higgsfield dentro de After Effects y Premiere",
    descripcion:
      "Generar, quitar fondo, reencuadrar y escalar sobre tu propia línea de tiempo. Se acabó el ida y vuelta con el navegador.",
    tipo: "guia",
    nivel: "avanzado",
    disponible: true,
    tags: ["after effects", "premiere", "postproducción", "higgsfield"],
  },
  {
    slug: "higgsfield-en-figma",
    titulo: "Consistencia visual de marca en Figma con Higgsfield",
    descripcion:
      "Relight, color grading, expand y angles: las herramientas que meten en cintura las imágenes que te manda el cliente.",
    tipo: "guia",
    nivel: "intermedio",
    disponible: true,
    tags: ["figma", "diseño", "consistencia", "higgsfield"],
  },
  {
    slug: "produccion-por-lotes",
    titulo: "Producción por lotes · de un clip a cincuenta",
    descripcion:
      "Cuando el cuello de botella deja de ser la calidad de una pieza y pasa a ser el throughput. Qué usar para generar en volumen.",
    tipo: "guia",
    nivel: "avanzado",
    disponible: true,
    tags: ["lotes", "escala", "pauta", "producción"],
  },
  {
    slug: "higgsfield-mcp-con-claude",
    titulo: "Higgsfield MCP con Claude · el plan baja a producción solo",
    descripcion:
      "Claude piensa y Higgsfield produce, en la misma conversación. La extensión natural del Cerebro Creativo.",
    tipo: "proyecto",
    nivel: "avanzado",
    disponible: true,
    tags: ["mcp", "claude", "higgsfield", "flujo"],
  },
];

export const BOVEDA_BASE: RecursoBoveda[] = [
  ...BOVEDA_PREMIUM,
  ...BOVEDA_MASTERCLASS,
  ...BOVEDA_CREATIVIDAD,
  ...BOVEDA_HIGGSFIELD,
  ...BOVEDA_COMUNIDAD,
  ...BOVEDA_META_ADS,
  ...BOVEDA_PRODUCCION,
  ...BOVEDA_CONTENIDO,
  ...BOVEDA_REPOS,
];

export const TALLER = {
  nombre: "Masterclass de Creatividad Publicitaria IA",
  marca: "RESUELTO Academy",
  whatsapp: "https://wa.me/51932844074",

  // ── Asistente virtual (personaje pixel art, 100% offline) ──
  asistente: {
    activo: true,
    nombre: "Bubu",
  },

  // ── Comunidad (tarjeta estilo Skool + contadores) ───────────
  // "miembros" y "admins" los ajustas tú. El conteo de "conectados
  // en tiempo real" llega con la base de datos (Fase 2).
  comunidad: {
    nombre: "RESUELTO Academy",
    cover: "🎬", // miniatura de la comunidad (emoji; luego imagen)
    descripcion:
      "Aprende a producir campañas publicitarias con IA y a cobrar por ello.",
    miembros: 0, // total de alumnos — súbelo cuando vendas
    admins: 1, // tú (y tu equipo si sumas a alguien)
    // Precio de membresía mensual, ej. "$57/mes". "" oculta la línea.
    precioMembresia: "",
  },

  // ── Novedades / anuncios (tablón del portal) ─────────────────
  // Lo más nuevo arriba. fecha en texto libre, ej. "6 jul 2026".
  novedades: [
    {
      fecha: "",
      titulo: "¡Bienvenido a RESUELTO Academy!",
      texto:
        "Aquí verás cada novedad: nuevos módulos, recursos y fechas de los en vivo. Empieza por tu primer curso en la pestaña Cursos.",
    },
  ] as { fecha: string; titulo: string; texto: string }[],

  // ── Landing de venta ─────────────────────────────────────────
  gate: {
    headline:
      "Deja de generar al azar. En 7 días aprendes a pensar y dirigir la IA como un director creativo.",
    subheadline:
      "La Masterclass de Creatividad Publicitaria IA: el proceso real de un director creativo — insight, concepto y guion — y la producción completa con IA hasta el video final. Sin cámara, sin productora, sin equipo de rodaje. Empiezas desde cero si hace falta.",
    // Video de venta (VSL) — ID de YouTube oculto. Si lo dejas "" se
    // muestra un recuadro con marcador de posición ("Aquí va tu VSL").
    vslYoutubeId: "",
    // Videos de ejemplo (galería "Míralo en acción"). Agrega piezas que
    // hayas producido con el sistema. [] muestra marcadores de posición.
    // driveId = ID del archivo de Google Drive (compartido "Cualquiera con
    // el enlace"); youtubeId tiene prioridad si ambos están presentes.
    videosEjemplo: [
      { titulo: "Ejemplo 1", youtubeId: "", driveId: "1d03L84gglfzdu5j5JqzYmx2JUPnMEL_B" },
      { titulo: "Ejemplo 2", youtubeId: "", driveId: "1VWYG-tRzJpZYa3c6b8FdtgV-FkGMqaIv" },
      { titulo: "Ejemplo 3", youtubeId: "", driveId: "1tozakeM6avmDrvTPMwRZWCjagOIbHm2Y" },
    ] as { titulo: string; youtubeId: string; driveId?: string }[],
    // Prueba social, ej. "+15 alumnos en la primera cohorte". "" lo oculta.
    alumnos: "",
    // Tamaño real del programa grabado (se muestra bajo el CTA principal).
    duracion: "28 clases en 6 partes · ~6 horas de masterclass grabada",

    // Visual "iceberg": la punta que todos ven vs. el sistema debajo.
    iceberg: {
      tip: "Lo que todos hacen: «pedirle videos a la IA»",
      capas: [
        "Estrategia creativa: qué contar, a quién y por qué",
        "El Cerebro Creativo IA — el proceso que lo cambia todo",
        "La Biblia Publicitaria: 59 documentos de oficio",
        "Dirección de arte, storyboard y consistencia",
        "Producción cinematográfica y edición con IA",
        "Empaquetarlo y cobrarlo — proyectos desde $2,000",
      ],
    },

    // Comparativo animado: producción tradicional vs. tu sistema.
    versus: [
      { metrica: "Costo por campaña", tradicional: "Hasta S/50,000", sistema: "Una fracción", barraTrad: 100, barraSis: 8 },
      { metrica: "Tiempo de producción", tradicional: "4 – 6 semanas", sistema: "Días", barraTrad: 100, barraSis: 12 },
      { metrica: "Equipo necesario", tradicional: "Productora completa", sistema: "Tú + tu laptop", barraTrad: 100, barraSis: 10 },
    ],

    dolor: {
      titulo: "El problema no eres tú",
      parrafos: [
        "Ya generaste videos con IA. Se ven bien. Y no venden nada — porque nadie decidió qué decir, a quién decírselo, ni por qué debería importarle a alguien.",
        "Ese paso no es una herramienta más: es el trabajo que hace un director creativo antes de tocar una cámara. Es lo que las agencias cobran más caro, y es justo lo que la mayoría de cursos de «IA para contenido» se saltan — te enseñan a generar, no a pensar.",
        "Yo construí un proceso para meter ese oficio dentro de tu flujo con IA. Se llama Cerebro Creativo, lo inventé yo, y es lo primero que aprendes — antes de generar un solo frame.",
      ],
    },

    // Las 5 partes reales del programa (mismo orden y nombre que los
    // decks y que el classroom). Antes la landing mostraba solo 3 actos
    // y dejaba fuera EL SISTEMA (el diferenciador) y CASOS (la prueba).
    actos: [
      {
        numero: "PARTE 1",
        titulo: "PENSAR",
        subtitulo: "Antes de la IA, piensa como un director creativo",
        texto:
          "El oficio que va antes de generar nada: cómo se excava un insight de verdad (y sus 6 tipos), cómo pasa a concepto y a Big Idea, las retóricas publicitarias, las 10 estructuras narrativas, las fórmulas de headline y los 9 hooks. Es el trabajo que las agencias cobran más caro, aplicado a tu negocio.",
      },
      {
        numero: "PARTE 2",
        titulo: "EL SISTEMA",
        subtitulo: "El Cerebro Creativo IA — lo que no vas a encontrar en otro curso",
        texto:
          "Aquí construyes el mecanismo: la Biblia Publicitaria (59 documentos que le enseñan el oficio a la IA), el ADN de tu marca y el Prompt Maestro que los une, viviendo en Claude Code y Obsidian. Deja de escribir prompts sueltos: tienes un director creativo que ya conoce tu negocio y responde con criterio.",
      },
      {
        numero: "PARTE 3",
        titulo: "CREAR",
        subtitulo: "La estrategia, hecha pieza terminada",
        texto:
          "Con el guion listo produces la campaña completa: prompt semiótico para dirigir la imagen, hoja de personaje para que la marca no cambie de toma a toma, storyboard, animación con Higgsfield, Kling y Seedance, y montaje final en CapCut. El objetivo no es coleccionar herramientas: es que la pieza salga con nivel de agencia.",
      },
      {
        numero: "PARTE 4",
        titulo: "CASOS",
        subtitulo: "Marcas reales, de principio a fin",
        texto:
          "El sistema completo desarmado en campañas que ya cobré: Smart System, Wellmax y el personaje de marca de WIN — del pedido del cliente al video entregado, paso por paso. Cierra con el método más rápido: tomar un formato que ya funciona, leerle el esqueleto y adaptarlo a tu marca.",
      },
      {
        numero: "PARTE 5",
        titulo: "COBRAR",
        subtitulo: "El negocio",
        texto:
          "Tu propuesta de valor con la fórmula exacta, los 6 componentes de una oferta irresistible, el precio como señal (por qué cobrar barato te abarata), el pitch de 60 segundos y tu plan de 30 días. Un proyecto con este sistema se ofrece a empresas desde $2,000.",
      },
    ],

    // Stack de valor — el orden importa: la Biblia va primero después
    // de la masterclass (bono estrella).
    stack: [
      { item: "Masterclass completa en módulos", valor: "$600" },
      {
        item: "La Biblia Publicitaria completa: los 59 documentos que le enseñan a la IA todo el oficio del director creativo — el mismo material que alimenta mi sistema",
        valor: "$600",
        estrella: true,
      },
      {
        item: "La baraja de GPTs de mi proceso: CinePromt, Storyboard, UGC y Seedance Director",
        valor: "$300",
      },
      {
        item: "Plantillas: hoja de personaje, ADN de marca y biblioteca de prompts",
        valor: "$200",
      },
      { item: "Comunidad de alumnos + soporte por WhatsApp por 30 días", valor: "$100" },
      {
        item: "Solo en vivo: sesión Q&A en directo + revisión grupal de tu primer proyecto",
        valor: "$200",
        soloVivo: true,
      },
    ],

    ancla:
      "Un proyecto de contenido publicitario con este sistema lo ofrezco a empresas desde $2,000. Hoy aprendes el sistema completo por menos del 10% de eso.",

    productos: {
      boveda: {
        nombre: "Bóveda de documentos",
        precio: "$25",
        precioLocal: "S/95",
        nota: "sin las clases en video · acceso de por vida, con actualizaciones",
        valorTotal: "",
        beneficios: [
          "Todas las guías, plantillas y proyectos de la bóveda",
          "Los prompts cinematográficos y la plantilla maestra de campaña (antes de pago)",
          "Actualizaciones: lo nuevo que se publique también entra",
        ],
        garantia:
          "Te garantizo que lo que enseño es real: es lo que aplico hoy para trabajar con marcas grandes.",
        garantiaLink: "https://www.resueltoagency.com/casos",
        cta: "Quiero la bóveda",
        mensajeWhatsApp:
          "Hola Manuel, quiero comprar el acceso a la Bóveda de documentos de la Masterclass de Creatividad Publicitaria IA",
      },
      grabado: {
        nombre: "Curso grabado",
        precio: "$200",
        precioLocal: "S/760",
        nota: "acceso inmediato · de por vida, con actualizaciones · cuotas disponibles",
        valorTotal: "$1,800",
        beneficios: [
          "Las 6 partes completas: 28 clases, ~6 horas en total",
          "Curso bonus: StorySelling Pro (28 clases más, 2h04)",
          "Toda la bóveda de documentos y plantillas incluida",
          "La Biblia Publicitaria completa (59 documentos)",
          "La baraja de GPTs de mi proceso",
          "Comunidad + soporte WhatsApp 30 días",
        ],
        garantia:
          "Te garantizo que lo que enseño es real: es lo que aplico hoy para trabajar con marcas grandes.",
        garantiaLink: "https://www.resueltoagency.com/casos",
        cta: "Quiero el sistema completo",
        // Link de checkout de Hotmart. "" → el botón cae a WhatsApp.
        hotmartUrl: "",
        mensajeWhatsApp:
          "Hola Manuel, quiero comprar el curso grabado de la Masterclass de Creatividad Publicitaria IA",
      },
      vivo: {
        nombre: "Masterclass en vivo",
        precio: "$500",
        precioLocal: "S/1,900",
        nota: "cohorte grupal · incluye el grabado de por vida · cuotas disponibles",
        valorTotal: "$2,000",
        // Precio fundador — "" lo oculta. Ej: "Precio fundador cohorte 1: $197 — solo primeros 10"
        precioFundador: "",
        // Fecha de la próxima cohorte — "" lo oculta.
        proximaCohorte: "",
        // Cupos — "" lo oculta. Ej: "Quedan 12 de 20 cupos". Solo escasez REAL.
        cupos: "",
        beneficios: [
          "Todo lo del curso grabado, de por vida",
          "~4.5 horas en vivo con Manuel, grupo de 15-20 personas",
          "Sesión Q&A en directo",
          "Revisión grupal de tu primer proyecto",
        ],
        garantia:
          "Te garantizo que lo que enseño es real: es lo que aplico hoy para trabajar con marcas grandes.",
        garantiaLink: "https://www.resueltoagency.com/casos",
        cta: "Próxima fecha aún no disponible",
        mensajeWhatsApp:
          "Hola Manuel, quiero que me avisen de la próxima fecha de la Masterclass en vivo",
      },
      mentoria: {
        nombre: "Mentoría para empresas",
        precio: "",
        precioLocal: "",
        nota: "individual 1 a 1 o grupal para tu equipo · contenido adaptado a tu especialidad",
        valorTotal: "",
        beneficios: [
          "Todo lo del curso grabado, de por vida",
          "Sesiones en vivo adaptadas a tu marca o a tu equipo",
          "Fechas a tu medida, cuando la necesites",
          "Individual 1 a 1 o grupal para varias personas de tu empresa",
        ],
        garantia:
          "Te garantizo que lo que enseño es real: es lo que aplico hoy para trabajar con marcas grandes.",
        garantiaLink: "https://www.resueltoagency.com/casos",
        cta: "Cotizar mi mentoría",
        mensajeWhatsApp:
          "Hola Manuel, quiero información sobre la mentoría individual o grupal empresarial de la Masterclass de Creatividad Publicitaria IA",
      },
    },

    credenciales:
      "Dictado por Manuel Severo — ex TBWA Perú y Fahrenheit DDB. +2,000 piezas producidas para marcas como Wong, BCP, Cencosud y Redondos. Validado: el primer taller privado se vendió a $250.",

    // Tarjeta "Quién te enseña" — foto + historia en primera persona.
    // No repite las credenciales de arriba: es el POR QUÉ, no el currículum.
    instructor: {
      foto: "/images/equipo/manuel.jpg",
      nombre: "Manuel Severo",
      rol: "Fundador de RESUELTO Agency · Creador del Cerebro Creativo IA",
      historia:
        "Llevo años produciendo publicidad para marcas que no perdonan un error: si la pieza no vende, no hay excusa. Cuando la IA generativa llegó, no me puse a aprender prompts sueltos — le enseñé el mismo oficio que ya aplicaba con clientes reales. Este sistema no es una teoría que armé para vender un curso: es literalmente cómo trabajo hoy, todos los días, en RESUELTO.",
    },

    paraQuien:
      "¿Vives de crear contenido o quieres vivir de eso? Esto es para ti. Creativos, community managers, editores y freelancers que quieren cobrar por producir contenido con IA; dueños de agencias chicas y emprendedores con marca propia. ¿Solo tienes curiosidad por la IA? No lo es.",

    // Testimonios de alumnos reales. [] oculta la sección — no inventes.
    testimonios: [] as { texto: string; nombre: string }[],

    faq: [
      {
        q: "¿Es un curso de herramientas de IA (Higgsfield, Claude Code, CapCut)?",
        a: "No. Vas a usarlas para producir, pero el curso no es un tutorial de esas plataformas — es el proceso estratégico que decide qué producir y por qué, antes de tocarlas. Te explico lo necesario de cada herramienta sobre la marcha, para que puedas aplicar el sistema aunque nunca las hayas usado.",
      },
      {
        q: "¿Cuál elijo: la bóveda, el grabado o el vivo?",
        a: "Si solo quieres las guías y plantillas para aplicar el sistema por tu cuenta, la Bóveda ($25) alcanza. Si quieres las clases completas paso a paso, el curso grabado ($200) — incluye la bóveda. Si además quieres verlo conmigo en vivo, con Q&A y revisión de tu proyecto, el vivo ($500) — incluye todo lo anterior.",
      },
      {
        q: "¿Necesito saber de publicidad?",
        a: "No. El sistema incluye la parte estratégica; empiezas desde cero.",
      },
      {
        q: "¿Qué herramientas necesito pagar?",
        a: "Cuatro: el plan básico de Higgsfield, el plan básico de Claude Code, una cuenta de ChatGPT de pago para la baraja de GPTs, y CapCut + Canva para edición y diseño (Pro recomendado). Todo junto cuesta menos que una cena de negocios al mes, y un solo cliente lo paga por un año. Dentro de la masterclass te doy la lista completa con precios y el orden en que conviene contratar cada cosa. Si ya pagas alguna herramienta de IA, vas con ventaja.",
      },
      {
        q: "¿Esto sirve si ya tengo una agencia o marca?",
        a: "Sí. El módulo final es justamente cómo integrarlo a un servicio o negocio existente.",
      },
      {
        q: "¿Puedo usar comercialmente lo que genere?",
        a: "Sí. Las plataformas del stack permiten uso comercial en sus planes de pago, y en la masterclass te explico las buenas prácticas para trabajar con marcas de clientes sin problemas.",
      },
      {
        q: "¿Cuánto tiempo tengo el acceso?",
        a: "De por vida, con las actualizaciones del contenido.",
      },
    ],
  },

  // ── Transmisión en vivo (cohortes) ───────────────────────────
  enVivo: {
    // ID del video de YouTube Live (déjalo "" si aún no creas el stream).
    youtubeId: "",
    // Fecha y hora de la próxima cohorte (hora de Lima, GMT-5).
    // Formato: "2026-08-05T19:00:00-05:00". Déjalo "" si no hay fecha.
    proximaFecha: "",
    titulo: "Masterclass en vivo",
    descripcion:
      "La transmisión se activa aquí mismo el día de la cohorte. Entra unos minutos antes con esta misma contraseña, y ven con una marca o producto en mente: lo vamos a trabajar en vivo.",
    // Agenda del día — se muestra junto al stream. Déjala [] para ocultarla.
    // Las 5 partes del deck real (1 Pensar · 2 El Sistema · 3 Crear ·
    // 4 Casos · 5 Cobrar) + apertura. Los minutos son proporcionales al
    // peso de cada deck y suman ~4h30, que es lo que promete el producto.
    agenda: [
      "Apertura — el resultado primero y las bases (15 min)",
      "PARTE 1 · PENSAR — Insight, concepto y guion de director creativo (70 min)",
      "Pausa (10 min)",
      "PARTE 2 · EL SISTEMA — Biblia, ADN de marca y Prompt Maestro (45 min)",
      "PARTE 3 · CREAR — Producción completa con IA (75 min)",
      "PARTE 4 · CASOS — Wellmax, WIN y el método de adaptación (30 min)",
      "PARTE 5 · COBRAR — Propuesta, oferta y precio (25 min)",
    ] as string[],
  },

  // ── Próximas sesiones (Calendar) ─────────────────────────────
  // fecha en formato ISO con zona Lima: "2026-08-05T19:00:00-05:00"
  sesiones: [] as { titulo: string; fecha: string; duracionMin: number }[],

  // ── CLASSROOM: catálogo de cursos (estilo Skool) ─────────────
  // Cada curso tiene su tarjeta en /taller/curso y su página propia
  // en /taller/curso/<slug>. Ver la nota de arriba para agregar uno.
  cursos: [
    {
      slug: "masterclass",
      titulo: "Masterclass de Creatividad Publicitaria IA",
      descripcion:
        "El sistema completo: estrategia con el Cerebro Creativo IA, producción cinematográfica y cómo cobrarlo.",
      // Portada de la tarjeta: emoji grande + color de fondo.
      portada: { emoji: "🎬", color: "rgba(26,128,255,0.18)" },
      disponible: true,
      modulos: MODULOS_MASTERCLASS,
      recursos: RECURSOS_MASTERCLASS,
    },
    {
      // Curso bonus incluido en la compra. Se llena con los módulos y sus
      // IDs de YouTube (no listado) conforme se suban.
      slug: "storyselling-pro",
      titulo: "StorySelling Pro: Estrategia CAT para creación de contenido Express",
      descripcion:
        "El método CAT para crear contenido que vende sin partir de cero cada vez: de la idea al guion en minutos.",
      portada: { emoji: "🎁", color: "rgba(244,240,222,0.10)" },
      disponible: true,
      modulos: MODULOS_STORYSELLING,
      recursos: [],
    },
    {
      // El temario ya está armado (MODULOS_IA_EN_ACCION). Sigue en
      // `disponible: false` porque todavía no hay ni un video subido y
      // la página del curso hace notFound() si no está disponible.
      // Para encenderlo: pon el youtubeId de las lecciones grabadas,
      // marca ESE módulo como disponible y cambia esto a true.
      slug: "ia-en-accion",
      titulo: "IA en Acción",
      descripcion:
        "Tutoriales creando piezas con IA, paso a paso: Seedance, Kling, personajes consistentes, edición y casos reales de clientes.",
      portada: { emoji: "⚡", color: "rgba(255,209,102,0.15)" },
      disponible: false,
      modulos: MODULOS_IA_EN_ACCION,
      recursos: [],
    },
  ] as Curso[],

  // ── Backend post-compra (dentro de la plataforma) ────────────
  venta: {
    titulo: "¿Quieres ir más rápido?",
    texto:
      "Ya tienes el sistema. Si quieres resultados sin armar todo solo, hay dos caminos:",
    opciones: [
      {
        titulo: "Te lo dejo instalado",
        texto:
          "Implementación done-with-you: te monto el Cerebro Creativo en tu negocio en 2 semanas — Biblia instalada, el ADN de tu marca generado, Claude Code y Obsidian configurados, y 2 sesiones 1:1.",
        cta: "Quiero la implementación",
        mensajeWhatsApp:
          "Hola Manuel, terminé la masterclass y quiero la implementación del Cerebro Creativo en mi negocio",
      },
      {
        titulo: "Mi equipo lo produce por ti",
        texto:
          "Proyectos de contenido publicitario con este sistema, desde $2,000. Tú pones la marca, nosotros la campaña completa.",
        cta: "Quiero cotizar un proyecto",
        mensajeWhatsApp:
          "Hola Manuel, quiero cotizar un proyecto de contenido publicitario para mi marca",
      },
    ],
  },
};

// ── Helpers del Classroom ─────────────────────────────────────
export function buscarCurso(slug: string): Curso | undefined {
  return TALLER.cursos.find((c) => c.slug === slug);
}

// Busca un recurso por slug en todos los cursos (para su página de detalle).
export function buscarRecurso(
  slug: string,
): { recurso: Recurso; curso: Curso } | undefined {
  for (const curso of TALLER.cursos) {
    const recurso = curso.recursos.find((r) => r.slug === slug);
    if (recurso) return { recurso, curso };
  }
  return undefined;
}

// Todos los recursos de cursos publicados (para la bóveda /taller/recursos).
export function recursosGlobales(): { recurso: Recurso; curso: Curso }[] {
  return TALLER.cursos
    .filter((c) => c.disponible)
    .flatMap((c) => c.recursos.map((recurso) => ({ recurso, curso: c })));
}

// ── Tipo "tarjeta" de la bóveda ─────────────────────────────────
// Versión de un recurso SIN secciones, contenido ni descargas. Es lo
// único que puede viajar a componentes cliente en listados — las props
// de un client component se serializan al navegador aunque no se
// rendericen. Los helpers que la producen viven en boveda-server.ts.
export type RecursoTarjeta = Omit<RecursoBoveda, "secciones" | "contenido" | "descargas"> & {
  nDescargas: number; // solo el conteo — nunca las URLs
};

// Todas las lecciones con video de los cursos disponibles (para el
// progreso global que usa el asistente).
export function leccionesConVideoGlobal(): Leccion[] {
  return TALLER.cursos
    .filter((c) => c.disponible)
    .flatMap((c) => c.modulos)
    .filter((m) => m.disponible)
    .flatMap((m) => m.lecciones)
    .filter((l) => l.youtubeId);
}
