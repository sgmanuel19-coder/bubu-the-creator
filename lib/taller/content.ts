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

// ── Niveles de acceso vendibles (tarjeta Acceso total + franja) ─
// El nivel "todo" abre TODO el portal (cursos + en vivo + todos los
// premium). Ajusta precios aquí; las contraseñas van en Vercel.
export type NivelVenta = {
  nivel: "todo" | "grabado" | "vivo";
  nombre: string;
  precio: string;
  descripcion: string;
  incluye: string[];
};

export const NIVELES_VENTA: NivelVenta[] = [
  {
    nivel: "todo",
    nombre: "Acceso total",
    precio: "S/497", // ← PLACEHOLDER: define tu precio real
    descripcion:
      "Todo el portal, para siempre: la masterclass completa, los en vivo y cada recurso premium de la bóveda — los de hoy y los que se sumen.",
    incluye: [
      "Masterclass grabada completa (6 partes)",
      "Acceso a las sesiones en vivo",
      "TODOS los recursos premium de la bóveda",
      "Todo lo premium que se publique después",
    ],
  },
  {
    nivel: "grabado",
    nombre: "Cursos grabados",
    precio: "$120",
    descripcion:
      "La masterclass completa a tu ritmo + los recursos del curso en la bóveda.",
    incluye: [
      "Masterclass grabada completa (6 partes)",
      "Biblia, plantillas y recursos del curso",
      "Acceso de por vida a las actualizaciones del grabado",
    ],
  },
  {
    nivel: "vivo",
    nombre: "Cohorte en vivo",
    precio: "$250",
    descripcion:
      "Las sesiones en vivo de la cohorte actual, con acceso al chat de la comunidad.",
    incluye: [
      "Sesiones en vivo de la cohorte",
      "Chat en vivo de la comunidad",
      "Acceso durante toda la cohorte",
    ],
  },
];

// ── Premium (vitrina para todos; ajusta precios aquí) ──────────
const BOVEDA_PREMIUM: RecursoBoveda[] = [
  {
    slug: "pack-prompts-cinematograficos",
    titulo: "50 prompts cinematográficos de mi flujo real",
    descripcion:
      "Los prompts exactos que uso para lograr look de película: lente, luz, grade y atmósfera ya resueltos. Pega, adapta a tu marca y genera.",
    tipo: "plantilla",
    nivel: "intermedio",
    disponible: true,
    premium: { precio: "S/97" },
    tags: ["prompts", "cine", "imagen"],
    contenido: [
      "Cada prompt de este pack salió de producción real para clientes: encuadre, óptica, esquema de luz y paleta ya calibrados para que el resultado se vea a pieza publicitaria y no a «imagen de IA».",
      "Están organizados por tipo de plano y por género de campaña, con notas de cuándo usar cada uno y qué variar para tu marca.",
      "Al escribirme por WhatsApp te lo envío directo y te ayudo a elegir por dónde empezar según lo que produces.",
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
    premium: { precio: "S/147" },
    tags: ["campaña", "estrategia", "guiones"],
    contenido: [
      "Es la misma plantilla que uso con mis clientes activos: cada sección te obliga a decidir como director creativo antes de tocar cualquier herramienta de IA.",
      "Incluye el orden exacto de las 4 etapas, los espacios para el insight y la Big Idea, y la salida lista para alimentar tu Cerebro Creativo.",
      "Te la entrego por WhatsApp con un video corto de cómo la lleno yo, paso a paso.",
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
      "Los dos motores de video de máxima calidad del stack: Kling 3.0 para movimiento realista y Seedance 2.0 cuando la pieza lleva voz y audio sincronizado.",
    tipo: "guia",
    nivel: "intermedio",
    disponible: true,
    tags: ["kling", "seedance", "video"],
    contenido: [
      "El salto de calidad en video IA no está en generar más — está en dirigir mejor. Kling 3.0 es mi elección cuando la escena pide física creíble: caminatas, telas, agua, cámara en movimiento. Seedance 2.0 entra cuando el video necesita voz o audio sincronizado con la imagen.",
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
export const BOVEDA_BASE: RecursoBoveda[] = [
  ...BOVEDA_PREMIUM,
  ...BOVEDA_MASTERCLASS,
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

    // Comparativo animado: producción tradicional vs. tu sistema.
    versus: [
      { metrica: "Costo por campaña", tradicional: "$5,000 – $50,000", sistema: "Una fracción", barraTrad: 100, barraSis: 8 },
      { metrica: "Tiempo de producción", tradicional: "4 – 6 semanas", sistema: "Días", barraTrad: 100, barraSis: 12 },
      { metrica: "Equipo necesario", tradicional: "Productora completa", sistema: "Tú + tu laptop", barraTrad: 100, barraSis: 10 },
    ],

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
