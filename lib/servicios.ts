// ============================================================
// SERVICIOS — DATA EDITABLE
// Cada servicio es una tarjeta; al hacer clic se abre su detalle.
//
// Para poner precio a un servicio pendiente, edita `precio`:
//   precio: { desde: "$500", nota: "por proyecto" }
// Si `precio` es null se muestra "Inversión a cotizar".
// ============================================================

export type Servicio = {
  n: string;
  id: string;
  categoria: "Producción IA" | "Diseño" | "Web" | "Automatización" | "Estrategia" | "Producción";
  // Acento propio del servicio, en RGB suelto para componer rgba() en CSS.
  // Paleta curada: tonos medios (nada neón) que funcionan sobre el fondo oscuro.
  accentRgb: string;
  title: string;
  tagline: string; // frase corta de la tarjeta
  desc: string; // párrafo de apertura del detalle
  incluye: string[];
  proceso?: { paso: string; texto: string }[];
  factores?: string[]; // qué mueve la inversión
  precio: { desde: string; hasta?: string; nota?: string } | null;
  tags: string[];
  destacado?: boolean; // tarjeta grande en la grilla
};

export const SERVICIOS: Servicio[] = [
  {
    n: "01",
    id: "contenido-ia",
    accentRgb: "26,128,255",
    categoria: "Producción IA",
    title: "Contenido IA",
    tagline: "Presencia de marca sostenida en redes — videos, carruseles e imágenes con línea visual unificada.",
    desc: "Producimos tu presencia mensual completa en redes con los motores de imagen, video y sonido de última generación: Higgsfield, Kling 3.0, Seedance 2.0, ElevenLabs, HeyGen y Suno. Piezas listas para publicar, en ciclos rápidos, con una línea visual que se siente de marca — no genérica.",
    incluye: [
      "6 videos de contenido IA (composición referencial de 12 piezas)",
      "3 carruseles IA",
      "3 imágenes IA de marca",
      "Planificación de grilla mensual",
      "Consistencia de línea visual de marca",
      "Música, subtítulos y formatos listos para publicar",
      "Rondas de revisión incluidas",
    ],
    proceso: [
      { paso: "Dirección y concepto", texto: "Idea, guion, referencias visuales y definición del look de marca." },
      { paso: "Generación de piezas", texto: "Cada pieza se genera y ajusta hasta lograr consistencia y encuadre correctos." },
      { paso: "Acabado y entrega", texto: "Edición, música, subtítulos y formatos verticales listos para publicar." },
    ],
    factores: [
      "Volumen de piezas por mes",
      "Duración y número de planos por video",
      "Presencia de voz o locución",
      "Nivel de realismo requerido",
    ],
    precio: { desde: "$200", hasta: "$3,000", nota: "desde $200 por video · paquetes mensuales $1,500 – $3,000" },
    tags: ["Videos", "Carruseles", "Imágenes de marca", "Grilla mensual"],
    destacado: true,
  },
  {
    n: "02",
    id: "comerciales-ia",
    accentRgb: "99,110,250",
    categoria: "Producción IA",
    title: "Comerciales IA",
    tagline: "Producción tipo TV: spot dirigido plano por plano, con cinemática de alta gama.",
    desc: "No se trata de generar clips: se dirige la pieza como un comercial de televisión, plano por plano, buscando una cinemática consistente, pulcra y de alta gama. Un comercial tradicional equivalente cuesta entre $10,000 y $100,000+ — con IA, la misma calidad comercial se entrega en semanas, no meses.",
    incluye: [
      "Concepto, guion, storyboard y shot list",
      "Definición de personajes y look cinematográfico",
      "Generación plano por plano con consistencia de rostro y movimiento",
      "Edición y color grade cinematográfico",
      "Diseño sonoro, locución y música",
      "VFX de acabado y control de calidad",
      "Precio cerrado por proyecto, sin sorpresas",
    ],
    proceso: [
      { paso: "Preproducción", texto: "Concepto, guion, storyboard, shot list, referencias y definición de personajes y look." },
      { paso: "Producción IA", texto: "Generación plano por plano. Decenas o cientos de iteraciones para consistencia de rostro, encuadre y movimiento." },
      { paso: "Postproducción", texto: "Edición, color grade cinematográfico, diseño sonoro, locución, música y VFX de acabado." },
    ],
    factores: [
      "Personajes con consistencia visual en todos los planos",
      "Diálogo y sincronía labial (lipsync)",
      "Número de planos y tomas complejas",
      "Duración de la pieza (30s vs 60s)",
      "Locución profesional o voz clonada",
      "Música original y diseño sonoro",
      "VFX y acabado avanzado",
    ],
    precio: { desde: "$2,500", hasta: "$10,000", nota: "proyecto cerrado según brief — vs. $10,000 – $100,000+ de un comercial tradicional" },
    tags: ["Spot TV", "Cinemática 4K", "Plano por plano", "Proyecto cerrado"],
    destacado: true,
  },
  {
    n: "03",
    id: "paginas-web",
    accentRgb: "0,169,196",
    categoria: "Web",
    title: "Desarrollo Web, SEO y SEM",
    tagline: "Sitios que venden y que además te encuentran: desarrollo, posicionamiento y campañas de búsqueda.",
    desc: "No basta con tener una web bonita: tiene que cargar rápido, aparecer en Google y convertir. Desarrollamos el sitio con estándar visual de agencia, lo optimizamos para posicionar orgánicamente (SEO) y activamos campañas de búsqueda pagada (SEM) para traer tráfico calificado desde el día uno.",
    incluye: [
      "Diseño y desarrollo completo, publicado en tu dominio",
      "Adaptación total a celular y tablet",
      "Optimización de velocidad y Core Web Vitals",
      "SEO técnico y on-page (estructura, metadatos, indexación)",
      "Investigación de palabras clave y contenido optimizado",
      "Campañas SEM en Google Ads con seguimiento de conversiones",
      "Textos orientados a conversión y contacto directo (WhatsApp)",
      "Reportes de posicionamiento y rendimiento",
    ],
    proceso: [
      { paso: "Estrategia y estructura", texto: "Objetivo del sitio, arquitectura de contenido e investigación de palabras clave." },
      { paso: "Diseño, desarrollo y SEO", texto: "Construcción visual y técnica con optimización de posicionamiento incorporada." },
      { paso: "Lanzamiento y SEM", texto: "Publicación, campañas de búsqueda activas y medición continua." },
    ],
    precio: null,
    tags: ["Landing pages", "Sitios corporativos", "SEO", "Google Ads"],
  },
  {
    n: "04",
    id: "packaging",
    accentRgb: "217,164,65",
    categoria: "Diseño",
    title: "Packaging",
    tagline: "Empaques que se hacen notar en góndola y en cámara.",
    desc: "Diseño de empaque potenciado con IA: exploramos decenas de direcciones visuales en días, no semanas, y aterrizamos la ganadora en un empaque listo para producción — con mockups fotorealistas para validar antes de imprimir.",
    incluye: [
      "Exploración de direcciones visuales con IA",
      "Diseño final de empaque listo para imprenta",
      "Mockups fotorealistas del producto",
      "Adaptaciones por formato y presentación",
      "Archivos finales en formatos de producción",
    ],
    proceso: [
      { paso: "Exploración", texto: "Generamos múltiples direcciones visuales sobre tu brief." },
      { paso: "Refinamiento", texto: "Aterrizamos la dirección elegida en el diseño final." },
      { paso: "Entrega", texto: "Archivos de producción + mockups para presentación." },
    ],
    precio: null,
    tags: ["Diseño de empaque", "Mockups", "Etiquetas", "Línea de producto"],
  },
  {
    n: "05",
    id: "diseno-ia-btl",
    accentRgb: "199,125,187",
    categoria: "Diseño",
    title: "Diseño IA / BTL",
    tagline: "Key visuals, gráficas de campaña y material BTL generados con IA.",
    desc: "Piezas gráficas de campaña con nivel de producción fotográfica — sin sesión de fotos. Key visuals, gráficas para redes y vía pública, y material BTL con la consistencia visual de una campaña real.",
    incluye: [
      "Key visuals de campaña",
      "Gráficas para redes, impresos y vía pública",
      "Material BTL (activaciones, stands, merchandising)",
      "Consistencia de línea visual entre todas las piezas",
      "Adaptaciones de formato incluidas",
    ],
    proceso: [
      { paso: "Concepto", texto: "Dirección de arte y referencias sobre tu campaña." },
      { paso: "Generación", texto: "Producción de piezas con consistencia de marca." },
      { paso: "Adaptación", texto: "Formatos finales para cada canal y soporte." },
    ],
    precio: null,
    tags: ["Key visual", "Campañas", "BTL", "Vía pública"],
  },
  {
    n: "06",
    id: "chatbot-ia",
    accentRgb: "139,108,255",
    categoria: "Automatización",
    title: "Super Agente Chatbot",
    tagline: "Un agente IA que atiende, responde y vende por ti — 24/7, en WhatsApp y web.",
    desc: "Instalamos un agente de IA entrenado en tu negocio que responde consultas, califica clientes y agenda ventas las 24 horas — en WhatsApp o en tu web. Deja de perder clientes por responder tarde.",
    incluye: [
      "Agente IA entrenado con la información de tu negocio",
      "Atención automática 24/7 en WhatsApp y/o web",
      "Calificación de clientes potenciales",
      "Derivación a humano cuando la venta lo requiere",
      "Panel de conversaciones y ajustes de tono de marca",
    ],
    proceso: [
      { paso: "Entrenamiento", texto: "Cargamos tu catálogo, precios, preguntas frecuentes y tono." },
      { paso: "Instalación", texto: "Conectamos el agente a tu WhatsApp o web." },
      { paso: "Optimización", texto: "Ajustamos respuestas con datos reales de conversación." },
    ],
    precio: null,
    tags: ["WhatsApp", "Atención 24/7", "Ventas", "IA entrenada"],
  },
  {
    n: "07",
    id: "base-de-datos",
    accentRgb: "46,158,107",
    categoria: "Automatización",
    title: "Construcción de Base de Datos",
    tagline: "Convierte cada contacto en un dato ordenado y accionable.",
    desc: "Automatizamos la captura, limpieza y organización de tus contactos y clientes: cada lead que llega por tus canales queda registrado, segmentado y listo para activarse en campañas — sin trabajo manual.",
    incluye: [
      "Captura automática de leads desde tus canales (web, WhatsApp, formularios)",
      "Base de datos centralizada y segmentada",
      "Limpieza y deduplicación de contactos",
      "Integración con tu CRM o herramientas actuales",
      "Reportes de crecimiento de la base",
    ],
    proceso: [
      { paso: "Auditoría", texto: "Mapeamos dónde llegan hoy tus contactos y qué se pierde." },
      { paso: "Automatización", texto: "Conectamos los canales a una base centralizada." },
      { paso: "Activación", texto: "La base queda lista para campañas y seguimiento." },
    ],
    precio: null,
    tags: ["Leads", "CRM", "Segmentación", "Integración"],
  },
  {
    n: "08",
    id: "email-marketing",
    accentRgb: "224,112,92",
    categoria: "Automatización",
    title: "Email Marketing",
    tagline: "Secuencias automatizadas que venden mientras duermes.",
    desc: "Diseñamos y automatizamos tus campañas de email: secuencias de bienvenida, recuperación y venta que se disparan solas según el comportamiento de cada contacto — con textos y diseño alineados a tu marca.",
    incluye: [
      "Estrategia de secuencias (bienvenida, venta, recuperación)",
      "Redacción y diseño de los correos",
      "Automatización por comportamiento del contacto",
      "Segmentación de la base de datos",
      "Reportes de apertura, clics y conversión",
    ],
    proceso: [
      { paso: "Estrategia", texto: "Definimos las secuencias según tu embudo de venta." },
      { paso: "Producción", texto: "Escribimos, diseñamos y montamos los correos." },
      { paso: "Automatización", texto: "Todo queda disparándose solo, con reportes mensuales." },
    ],
    precio: null,
    tags: ["Secuencias", "Automatización", "Segmentación", "Reportes"],
  },
  {
    n: "09",
    id: "estrategia-crecimiento",
    accentRgb: "219,92,140",
    categoria: "Estrategia",
    title: "Estrategia de Crecimiento",
    tagline: "GTM y sales marketing: el plan que convierte tu oferta en un motor de ventas.",
    desc: "Antes de producir una sola pieza hay que responder qué se vende, a quién y cómo. Diseñamos tu estrategia de salida al mercado (Go-To-Market) y el sistema comercial que la sostiene: propuesta de valor, segmentos, canales, embudo y las métricas que dicen si está funcionando.",
    incluye: [
      "Diagnóstico de negocio y posicionamiento actual",
      "Propuesta de valor y mensajes por segmento",
      "Definición de cliente ideal y buyer personas",
      "Plan Go-To-Market por canal",
      "Diseño del embudo comercial de punta a punta",
      "Estructura de oferta y estrategia de precios",
      "KPIs y tablero de seguimiento",
    ],
    proceso: [
      { paso: "Diagnóstico", texto: "Analizamos negocio, competencia, oferta y datos comerciales existentes." },
      { paso: "Estrategia", texto: "Definimos posicionamiento, segmentos, canales y embudo." },
      { paso: "Plan de acción", texto: "Entregamos el roadmap ejecutable con métricas y responsables." },
    ],
    precio: null,
    tags: ["Go-To-Market", "Sales marketing", "Embudo", "Posicionamiento"],
  },
  {
    n: "10",
    id: "campanas-integrales",
    accentRgb: "150,196,90",
    categoria: "Estrategia",
    title: "Campañas Integrales",
    tagline: "Marketing digital de punta a punta: una campaña coordinada en todos los canales.",
    desc: "Campañas completas donde estrategia, piezas, pauta y medición van coordinadas — no esfuerzos sueltos. Definimos el concepto, producimos todo el material, activamos la pauta en cada canal y optimizamos con datos reales durante toda la campaña.",
    incluye: [
      "Concepto creativo y territorio de campaña",
      "Producción de todas las piezas (video, gráfica, copy)",
      "Plan de medios y distribución por canal",
      "Gestión de pauta (Meta, Google, TikTok, LinkedIn)",
      "Landing pages y piezas de conversión",
      "Optimización continua durante la campaña",
      "Reporte de resultados con aprendizajes",
    ],
    proceso: [
      { paso: "Concepto y plan", texto: "Objetivo, mensaje central, canales y presupuesto por medio." },
      { paso: "Producción", texto: "Creamos todas las piezas adaptadas a cada formato y canal." },
      { paso: "Activación y optimización", texto: "Lanzamos, medimos y ajustamos en vivo hasta cerrar la campaña." },
    ],
    precio: null,
    tags: ["360°", "Pauta", "Multicanal", "Medición"],
  },
  {
    n: "11",
    id: "consultoria-marketing",
    accentRgb: "196,170,120",
    categoria: "Estrategia",
    title: "Consultoría de Marketing",
    tagline: "Criterio senior a tu disposición, sin contratar un equipo interno.",
    desc: "Acompañamiento estratégico para equipos que ya ejecutan pero necesitan dirección: auditamos lo que estás haciendo, identificamos qué está frenando el crecimiento y trabajamos contigo en las decisiones — con la experiencia de años dentro de agencias globales.",
    incluye: [
      "Auditoría de marketing y comunicación actual",
      "Diagnóstico de canales, mensajes y presupuesto",
      "Sesiones de trabajo periódicas con tu equipo",
      "Recomendaciones priorizadas y accionables",
      "Revisión de piezas y campañas en curso",
      "Acompañamiento en decisiones de inversión",
    ],
    proceso: [
      { paso: "Auditoría", texto: "Revisamos qué se está haciendo hoy y qué resultados da." },
      { paso: "Diagnóstico", texto: "Identificamos los cuellos de botella reales del crecimiento." },
      { paso: "Acompañamiento", texto: "Sesiones periódicas para ejecutar y corregir el rumbo." },
    ],
    precio: null,
    tags: ["Auditoría", "Asesoría", "Sesiones", "Dirección"],
  },
  {
    n: "12",
    id: "eventos-corporativos",
    accentRgb: "90,190,190",
    categoria: "Producción",
    title: "Eventos Corporativos",
    tagline: "Del concepto al registro audiovisual: eventos que se ven tan bien como se viven.",
    desc: "Producimos eventos corporativos con mirada de marca: concepto, identidad visual, materiales, ambientación y la cobertura audiovisual completa — para que el evento no termine cuando se apagan las luces, sino que siga rindiendo como contenido.",
    incluye: [
      "Concepto e identidad visual del evento",
      "Diseño de materiales, señalética y ambientación",
      "Producción audiovisual previa (teasers e invitaciones)",
      "Cobertura del evento en foto y video",
      "Edición de after movie y piezas para redes",
      "Coordinación con proveedores y locación",
    ],
    proceso: [
      { paso: "Concepto", texto: "Definimos la idea, la identidad y la experiencia del evento." },
      { paso: "Producción", texto: "Materiales, ambientación y coordinación previa al día D." },
      { paso: "Cobertura y entrega", texto: "Registro audiovisual completo y piezas editadas post-evento." },
    ],
    precio: null,
    tags: ["Concepto", "Ambientación", "Cobertura", "After movie"],
  },
  {
    n: "13",
    id: "produccion-musical",
    accentRgb: "176,110,224",
    categoria: "Producción",
    title: "Producción Musical",
    tagline: "Jingles, sonido de marca y música original — con IA y con músicos reales.",
    desc: "El sonido es la mitad de una pieza y casi nadie lo trabaja. Producimos música original para tus campañas: jingles memorables, identidad sonora de marca, score para comerciales y diseño de sonido — combinando motores de generación musical con producción y mezcla profesional.",
    incluye: [
      "Jingles y música original para campañas",
      "Identidad sonora de marca (sound logo)",
      "Score y musicalización para comerciales",
      "Diseño de sonido y efectos",
      "Locución y voces (reales o clonadas con IA)",
      "Mezcla y masterización final",
      "Entrega en todos los formatos y duraciones",
    ],
    proceso: [
      { paso: "Referencia y concepto", texto: "Definimos el territorio sonoro y las referencias de la marca." },
      { paso: "Producción", texto: "Componemos y producimos las versiones para revisión." },
      { paso: "Mezcla y entrega", texto: "Mezcla, masterización y adaptación a cada formato." },
    ],
    precio: null,
    tags: ["Jingles", "Sound logo", "Score", "Mezcla"],
  },
];

export const SERVICIOS_STACK = [
  "Higgsfield", "Kling 3.0", "Seedance 2.0", "ElevenLabs", "HeyGen", "Suno",
  "Claude Code", "ChatGPT", "Premiere Pro", "DaVinci Resolve", "CapCut Pro",
];
