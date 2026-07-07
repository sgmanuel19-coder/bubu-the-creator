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
      "El resultado primero, las 3 máquinas del sistema (Claude, Higgsfield y CapCut) y el mapa completo de lo que viene.",
    disponible: true,
    lecciones: [
      { titulo: "El resultado primero: lo que vas a poder producir", duracion: "", youtubeId: "" },
      { titulo: "Las 3 máquinas: Claude, Higgsfield y CapCut", duracion: "", youtubeId: "" },
      { titulo: "El mapa de la masterclass", duracion: "", youtubeId: "" },
    ],
  },
  {
    titulo: "PARTE 1 — PENSAR: el pensamiento del director creativo",
    descripcion:
      "El protocolo del director creativo, las 4 etapas, el insight y sus 6 tipos, la Big Idea, retóricas, 10 estructuras narrativas, fórmulas de headline y 9 hooks, géneros de storytelling y tipos de campaña.",
    disponible: true,
    lecciones: [
      { titulo: "El protocolo del director creativo y las 4 etapas", duracion: "", youtubeId: "" },
      { titulo: "El insight y sus 6 tipos", duracion: "", youtubeId: "" },
      { titulo: "Big Idea y retóricas publicitarias", duracion: "", youtubeId: "" },
      { titulo: "Las 10 estructuras narrativas", duracion: "", youtubeId: "" },
      { titulo: "Fórmulas de headline y los 9 hooks", duracion: "", youtubeId: "" },
      { titulo: "Géneros de storytelling y tipos de campaña — el mapa completo", duracion: "", youtubeId: "" },
    ],
  },
  {
    titulo: "PARTE 2 — EL SISTEMA: Cerebro Creativo IA",
    descripcion:
      "La Biblia de 60 documentos, el ADN de marca, el Prompt Maestro, Claude Code y Obsidian, skills, agentes y MCP — con demo del Cerebro razonando en vivo.",
    disponible: true,
    lecciones: [
      { titulo: "La Biblia Publicitaria: los 60 documentos", duracion: "", youtubeId: "" },
      { titulo: "El ADN de marca y el Prompt Maestro", duracion: "", youtubeId: "" },
      { titulo: "Claude Code y Obsidian como centro de operaciones", duracion: "", youtubeId: "" },
      { titulo: "Skills, agentes y MCP", duracion: "", youtubeId: "" },
      { titulo: "Demo: el Cerebro Creativo razonando una campaña", duracion: "", youtubeId: "" },
    ],
  },
  {
    titulo: "PARTE 3 — CREAR: producción con IA",
    descripcion:
      "Prompt engineering, Higgsfield a fondo, Kling y Seedance, audio y voz IA, la baraja de GPTs, consistencia con hoja de personaje, y ensamblaje y montaje en CapCut.",
    disponible: true,
    lecciones: [
      { titulo: "Prompt engineering profesional", duracion: "", youtubeId: "" },
      { titulo: "Higgsfield a fondo (Nano Banana Pro, GPT Image 2)", duracion: "", youtubeId: "" },
      { titulo: "Storyboard y hoja de personaje: consistencia total", duracion: "", youtubeId: "" },
      { titulo: "Animación con Kling y Seedance (Seedance Director)", duracion: "", youtubeId: "" },
      { titulo: "Audio, voz IA y UGC", duracion: "", youtubeId: "" },
      { titulo: "Ensamblaje y montaje en CapCut", duracion: "", youtubeId: "" },
    ],
  },
  {
    titulo: "PARTE 4 — CASOS: marcas reales",
    descripcion:
      "El caso Wellmax completo, el personaje de marca de WIN, galería de referencias y cómo adaptar el sistema a tu caso.",
    disponible: true,
    lecciones: [
      { titulo: "Caso Wellmax: la campaña completa", duracion: "", youtubeId: "" },
      { titulo: "Caso WIN: personaje de marca", duracion: "", youtubeId: "" },
      { titulo: "Galería y adaptación a tu caso", duracion: "", youtubeId: "" },
    ],
  },
  {
    titulo: "PARTE 5 — COBRAR: el negocio",
    descripcion:
      "Tu propuesta de valor, tu oferta irresistible, cuánto cobrar, el pitch de 60 segundos y tu plan de 30 días.",
    disponible: true,
    lecciones: [
      { titulo: "Propuesta de valor y oferta irresistible", duracion: "", youtubeId: "" },
      { titulo: "Cuánto cobrar: rangos reales de mercado", duracion: "", youtubeId: "" },
      { titulo: "El pitch de 60 segundos", duracion: "", youtubeId: "" },
      { titulo: "Tu plan de 30 días", duracion: "", youtubeId: "" },
    ],
  },
];

const RECURSOS_MASTERCLASS: Recurso[] = [
  {
    slug: "biblia-publicitaria",
    titulo: "La Biblia Publicitaria (60 PDFs)",
    descripcion:
      "Los 60 documentos que le enseñan a la IA todo el oficio del director creativo — el mismo material que alimenta mi sistema.",
    disponible: false,
    contenido: [
      "La Biblia Publicitaria es el corazón del Cerebro Creativo IA: 60 documentos que condensan el oficio del director creativo — insights, retóricas, estructuras narrativas, hooks, tipos de campaña y más.",
      "Descárgala completa y cárgala en tu Cerebro Creativo tal como se muestra en la PARTE 2. Es el material que hace que la IA razone como un creativo senior dentro de tu marca.",
    ],
    descargas: [
      // { nombre: "Biblia Publicitaria — 60 PDFs (.zip)", url: "https://..." },
    ],
  },
  {
    slug: "baraja-gpts",
    titulo: "La baraja de GPTs de mi proceso",
    descripcion:
      "Links de acceso a las 4 piezas de mi flujo real: CinePromt, Storyboard, UGC y Seedance Director.",
    disponible: false,
    contenido: [
      "Las 4 piezas del flujo de producción. Requieren una cuenta de ChatGPT de pago. Ábrelas y guárdalas en tus favoritos.",
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
    disponible: false,
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
    disponible: false,
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
      "No te enseño a usar la IA. Te enseño a que la IA piense como un director creativo con 20 años de experiencia en tu negocio.",
    subheadline:
      "La masterclass del Cerebro Creativo IA: genera estrategia, conceptos y guiones publicitarios con criterio de agencia, y produce la campaña completa con calidad de cine. Sin cámara, sin productora.",
    // Video de venta (VSL) — ID de YouTube oculto. Si lo dejas "" se
    // muestra un recuadro con marcador de posición ("Aquí va tu VSL").
    vslYoutubeId: "",
    // Videos de ejemplo (galería "Míralo en acción"). Agrega piezas que
    // hayas producido con el sistema. [] muestra marcadores de posición.
    videosEjemplo: [] as { titulo: string; youtubeId: string }[],
    // Prueba social, ej. "+15 alumnos en la primera cohorte". "" lo oculta.
    alumnos: "",

    // Visual "iceberg": la punta que todos ven vs. el sistema debajo.
    iceberg: {
      tip: "Lo que todos hacen: «pedirle videos a la IA»",
      capas: [
        "Estrategia creativa: qué contar, a quién y por qué",
        "El Cerebro Creativo IA — el proceso que lo cambia todo",
        "La Biblia Publicitaria: 60 documentos de oficio",
        "Dirección de arte, storyboard y consistencia",
        "Producción cinematográfica y edición con IA",
        "Empaquetarlo y cobrarlo — proyectos desde $2,000",
      ],
    },

    dolor: {
      titulo: "El problema no eres tú",
      parrafos: [
        "Ya viste los tutoriales. Ya probaste las herramientas. Y el resultado es el mismo de todos: videos bonitos que no dicen nada y no venden nada.",
        "El problema no eres tú ni las herramientas. Es que te saltaste el paso que las agencias cobran más caro: la estrategia creativa. El pensamiento que decide qué contar, a quién y por qué va a funcionar, antes de generar un solo frame. Ese trabajo lo hacen directores creativos con 20 años de oficio, y las grandes agencias lo siguen haciendo a la antigua: brief, reuniones, semanas de espera y presupuestos de cinco cifras.",
        "Yo construí un proceso que mete ese oficio dentro de la IA. Se llama Cerebro Creativo, lo inventé yo, y no lo vas a encontrar en ningún otro curso.",
      ],
    },

    actos: [
      {
        numero: "ACTO 1",
        titulo: "PENSAR",
        subtitulo: "Lo que nadie más enseña",
        texto:
          "El Cerebro Creativo IA: el proceso para que la IA piense como un director creativo con 20 años de experiencia en tu negocio. Estrategia, insights, conceptos de campaña, Big Ideas, estructuras narrativas, hooks y guiones que venden.",
      },
      {
        numero: "ACTO 2",
        titulo: "CREAR",
        subtitulo: "Producción con calidad de cine",
        texto:
          "Producción cinematográfica completa: prompting profesional, storyboard escena por escena, hoja de personaje para consistencia total, frames de cine con CinePromt, animación con Seedance Director, Kling y Seedance, UGC con IA y edición final en CapCut.",
      },
      {
        numero: "ACTO 3",
        titulo: "COBRAR",
        subtitulo: "El negocio",
        texto:
          "Casos reales con marcas que pagaron por esto, tu propuesta de valor, tu oferta irresistible y cuánto cobrar: un proyecto con este sistema se ofrece a empresas desde $2,000.",
      },
    ],

    // Stack de valor — el orden importa: la Biblia va primero después
    // de la masterclass (bono estrella).
    stack: [
      { item: "Masterclass completa en módulos", valor: "$497" },
      {
        item: "La Biblia Publicitaria completa: los 60 documentos que le enseñan a la IA todo el oficio del director creativo — el mismo material que alimenta mi sistema",
        valor: "$497",
        estrella: true,
      },
      {
        item: "La baraja de GPTs de mi proceso: CinePromt, Storyboard, UGC y Seedance Director",
        valor: "$297",
      },
      {
        item: "Plantillas: hoja de personaje, ADN de marca y biblioteca de prompts",
        valor: "$197",
      },
      { item: "Comunidad de alumnos + soporte por WhatsApp por 30 días", valor: "$97" },
      {
        item: "Llamada grupal de seguimiento a los 14 días: revisamos tus avances",
        valor: "$97",
      },
      {
        item: "Solo en vivo: sesión Q&A en directo + revisión grupal de tu primer proyecto",
        valor: "$150",
        soloVivo: true,
      },
    ],

    ancla:
      "Un proyecto de contenido publicitario con este sistema lo ofrezco a empresas desde $2,000. Hoy aprendes el sistema completo por menos del 10% de eso.",

    productos: {
      grabado: {
        nombre: "Curso grabado",
        precio: "$120",
        precioLocal: "S/450",
        nota: "acceso inmediato · de por vida, con actualizaciones · cuotas disponibles",
        valorTotal: "$1,682",
        beneficios: [
          "Las 6 partes completas en módulos de 15-25 min",
          "La Biblia Publicitaria completa (60 documentos)",
          "La baraja de GPTs de mi proceso",
          "Todas las plantillas del sistema",
          "Comunidad + soporte WhatsApp 30 días",
          "Llamada grupal de seguimiento (día 14)",
        ],
        garantia:
          "7 días de garantía: si entras, lo ves y sientes que no es para ti, te devuelvo el dinero completo. Sin formularios raros ni preguntas incómodas.",
        cta: "Quiero el sistema completo",
        // Link de checkout de Hotmart. "" → el botón cae a WhatsApp.
        hotmartUrl: "",
        mensajeWhatsApp:
          "Hola Manuel, quiero comprar el curso grabado de la Masterclass de Creatividad Publicitaria IA",
      },
      vivo: {
        nombre: "Masterclass en vivo",
        precio: "$250",
        precioLocal: "S/950",
        nota: "cohorte con fecha fija · incluye el grabado de por vida · cuotas disponibles",
        valorTotal: "$1,832",
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
          "Asiste a la masterclass, aplica el sistema, y si en 7 días no produces tu primer spot con IA, te devuelvo el 100%.",
        cta: "Quiero mi cupo en vivo",
        mensajeWhatsApp:
          "Hola Manuel, quiero info de la Masterclass de Creatividad Publicitaria IA en vivo",
      },
    },

    credenciales:
      "Dictado por Manuel Severo — ex TBWA Perú y Fahrenheit DDB. +2,000 piezas producidas para marcas como Wong, BCP, Cencosud y Redondos. Validado: el primer taller privado se vendió a $250.",

    paraQuien:
      "¿Vives de crear contenido o quieres vivir de eso? Esto es para ti. Creativos, community managers, editores y freelancers que quieren cobrar por producir contenido con IA; dueños de agencias chicas y emprendedores con marca propia. ¿Solo tienes curiosidad por la IA? No lo es.",

    // Testimonios de alumnos reales. [] oculta la sección — no inventes.
    testimonios: [] as { texto: string; nombre: string }[],

    faq: [
      {
        q: "¿Necesito saber de publicidad?",
        a: "No. El sistema incluye la parte estratégica; empiezas desde cero.",
      },
      {
        q: "¿Qué herramientas necesito pagar?",
        a: "Como mínimo, el plan básico de Higgsfield y el plan básico de Claude Code, más una cuenta de ChatGPT de pago para la baraja de GPTs. Dentro de la masterclass te doy la lista completa del stack, con precios y el orden en que conviene contratar cada cosa. Si ya pagas alguna herramienta de IA, vas con ventaja.",
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
    agenda: [
      "ACTO 1 · PENSAR — Estrategia y Cerebro Creativo IA (80 min)",
      "Pausa (10 min)",
      "ACTO 2 · CREAR — Producción completa (90 min)",
      "ACTO 3 · COBRAR — Casos y negocio (40 min)",
      "Cierre — Q&A + revisión de proyectos (20 min)",
    ] as string[],
  },

  // ── Próximas sesiones (Calendar) ─────────────────────────────
  // fecha en formato ISO con zona Lima: "2026-08-05T19:00:00-05:00"
  // Incluye aquí también la llamada de seguimiento del día 14.
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
      // Plantilla del próximo curso. Cámbiala cuando subas tu curso
      // complementario, o pon disponible: false mientras tanto.
      slug: "proximo-curso",
      titulo: "Nuevo curso complementario",
      descripcion:
        "Un curso corto para llevar tu sistema aún más lejos. Muy pronto en tu Classroom.",
      portada: { emoji: "🎁", color: "rgba(244,240,222,0.10)" },
      disponible: false,
      modulos: [],
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
