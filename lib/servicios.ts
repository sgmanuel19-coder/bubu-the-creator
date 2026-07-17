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
  categoria: "Producción IA" | "Diseño" | "Web" | "Automatización";
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
    categoria: "Web",
    title: "Páginas Web",
    tagline: "Sitios que venden: diseño premium, rápido y pensado para convertir.",
    desc: "Diseñamos y desarrollamos páginas web con estándar visual de agencia: landing pages de venta, sitios corporativos y portales — rápidos, adaptados a celular y construidos para convertir visitas en clientes.",
    incluye: [
      "Diseño visual a medida, alineado a tu marca",
      "Desarrollo completo y publicación en tu dominio",
      "Adaptación total a celular y tablet",
      "Optimización de velocidad de carga",
      "Textos orientados a conversión",
      "Formularios y botones de contacto directo (WhatsApp)",
    ],
    proceso: [
      { paso: "Brief y estructura", texto: "Definimos objetivo, secciones y contenido del sitio." },
      { paso: "Diseño y desarrollo", texto: "Construcción visual y técnica con revisiones incluidas." },
      { paso: "Publicación", texto: "Deploy en tu dominio, listo para recibir tráfico." },
    ],
    precio: null,
    tags: ["Landing pages", "Sitios corporativos", "E-commerce", "Conversión"],
  },
  {
    n: "04",
    id: "packaging",
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
];

export const SERVICIOS_STACK = [
  "Higgsfield", "Kling 3.0", "Seedance 2.0", "ElevenLabs", "HeyGen", "Suno",
  "Claude Code", "ChatGPT", "Premiere Pro", "DaVinci Resolve", "CapCut Pro",
];
