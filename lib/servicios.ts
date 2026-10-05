// ============================================================
// SERVICIOS — DATA EDITABLE
// Cada servicio es una tarjeta; al hacer clic se abre su detalle.
//
// Estructura de oferta de cada servicio (en este orden en el modal):
//   problema  → la tensión real que vive el cliente hoy
//   desc      → qué hacemos exactamente
//   resultado → qué se lleva, en concreto
//   incluye   → entregables
//   proceso   → cómo trabajamos
//   paraQuien → filtro honesto de a quién le sirve
//   factores  → qué mueve la inversión (hace transparente el "a cotizar")
//
// Para poner precio a un servicio, edita `precio`:
//   precio: { desde: "$500", nota: "por proyecto" }
// Si `precio` es null se muestra "Inversión a cotizar" (estado actual de todos).
//
// 2026-10: la cartera se redujo de 13 a 6 servicios para concentrar la oferta.
// Los servicios retirados (packaging, BTL, chatbot, base de datos, email
// marketing, estrategia, campañas integrales, consultoría, producción musical)
// siguen en el historial de git si alguna vez hay que recuperarlos.
// ============================================================

export type Servicio = {
  n: string;
  id: string;
  categoria: "Producción IA" | "Desarrollo" | "Eventos" | "Formación";
  // Acento propio del servicio, en RGB suelto para componer rgba() en CSS.
  // Paleta curada: tonos medios (nada neón) que funcionan sobre el fondo oscuro.
  accentRgb: string;
  title: string;
  tagline: string; // frase corta de la tarjeta
  problema: string; // la tensión que abre el detalle
  desc: string; // párrafo de apertura del detalle
  resultado: string[]; // qué se lleva el cliente, en concreto
  incluye: string[];
  proceso?: { paso: string; texto: string }[];
  paraQuien?: string;
  factores?: string[]; // qué mueve la inversión
  precio: { desde: string; hasta?: string; nota?: string } | null;
  // Herramientas reales con las que se ejecuta el servicio. No son
  // entregables: es la cinta de "con qué está hecho" que corre en el detalle.
  stack?: string[];
  tags: string[];
  destacado?: boolean; // tarjeta grande en la grilla
};

export const SERVICIOS: Servicio[] = [
  {
    n: "01",
    id: "produccion-audiovisual-ia",
    accentRgb: "26,128,255",
    categoria: "Producción IA",
    title: "Producción Audiovisual IA",
    tagline: "Comerciales con acabado de cine y contenido mensual constante, sin set ni rodaje.",
    problema:
      "Necesitas dos cosas que no suelen convivir en un presupuesto: una pieza ancla con nivel de comercial de TV, y contenido suficiente para no desaparecer de las redes el resto del mes. Con producción tradicional el spot cuesta entre $10,000 y $100,000 y tarda meses, y el contenido mensual exige un equipo fijo que cuesta más de lo que devuelve.",
    desc: "Producimos las dos cosas con el mismo criterio de dirección. El comercial se dirige plano por plano —guion, storyboard, shot list, consistencia de personaje— y el contenido mensual sale de esa misma línea visual, así que todo se reconoce como tu marca. La diferencia entre un video hecho con IA y un comercial es la dirección, y eso es lo que ponemos.",
    resultado: [
      "Una pieza ancla lista para TV, YouTube, Meta y sala de ventas",
      "El contenido del mes entregado antes de que empiece el mes",
      "Una línea visual reconocible: identifican tu marca sin leer el nombre",
      "Semanas de producción en lugar de meses, sin agenda de rodaje ni locación",
    ],
    incluye: [
      "Concepto, guion, storyboard y shot list del comercial",
      "Generación plano por plano con consistencia de rostro y movimiento",
      "Paquete mensual de contenido: videos, carruseles e imágenes de marca",
      "Edición, color grade, diseño sonoro, locución y música",
      "Planificación de grilla con objetivo por pieza",
      "Formatos y cortes listos para publicar en cada canal",
    ],
    proceso: [
      { paso: "Dirección", texto: "Concepto, guion y definición del look. Nada se genera hasta que la pieza está resuelta en papel." },
      { paso: "Producción", texto: "Generación plano por plano, con las iteraciones necesarias hasta lograr consistencia real." },
      { paso: "Acabado", texto: "Edición, color, sonido y exportación por formato. Se entrega el paquete completo, no piezas sueltas." },
    ],
    paraQuien:
      "Marcas con un momento comercial concreto —lanzamiento, temporada alta, reposicionamiento— que además necesitan presencia sostenida sin montar un área interna de contenido.",
    factores: [
      "Duración de la pieza y número de planos",
      "Personajes con consistencia visual y sincronía labial",
      "Volumen de piezas mensuales",
      "Locución profesional, música original y VFX de acabado",
    ],
    precio: null,
    stack: ["Higgsfield", "Kling 3.0", "Seedance 2.0", "Nano Banana Pro", "ElevenLabs", "HeyGen", "Suno", "CapCut Pro", "DaVinci Resolve"],
    tags: ["Comerciales", "Contenido mensual", "Cinemática 4K", "Plano por plano"],
    destacado: true,
  },
  {
    n: "02",
    id: "paginas-web",
    accentRgb: "0,169,196",
    categoria: "Desarrollo",
    title: "Desarrollo Web, SEO y SEM",
    tagline: "Una web que carga rápido, aparece en Google y termina en una conversación de venta.",
    problema:
      "O tu web existe y nadie llega, o llegan y no escriben. En ambos casos estás pagando hosting por un folleto: se ve bien, no vende, y cada mes tu competencia se queda con las búsquedas que deberían ser tuyas.",
    desc: "Construimos el sitio con estándar visual de agencia, lo optimizamos para posicionar orgánicamente y activamos campañas de búsqueda pagada para que entre tráfico calificado desde la primera semana. El objetivo no es que la web se vea bien: es que quien ya está buscando lo que vendes te encuentre y te escriba.",
    resultado: [
      "Un sitio que carga en menos de dos segundos en celular",
      "Presencia orgánica en las búsquedas que traen clientes, no visitas vacías",
      "Tráfico calificado entrando desde Google Ads desde el primer mes",
      "Reportes donde ves de dónde vino cada contacto",
    ],
    incluye: [
      "Diseño y desarrollo completo, publicado en tu dominio",
      "Adaptación total a celular y optimización de velocidad",
      "SEO técnico y on-page, con investigación de palabras clave",
      "Campañas en Google Ads con seguimiento de conversiones",
      "Textos orientados a conversión y contacto directo por WhatsApp",
      "Reportes mensuales de posicionamiento y rendimiento",
    ],
    proceso: [
      { paso: "Estrategia", texto: "Objetivo del sitio, arquitectura de contenido e investigación de las palabras clave que traen clientes." },
      { paso: "Desarrollo", texto: "Construcción visual y técnica con el posicionamiento incorporado desde el código, no parchado después." },
      { paso: "Lanzamiento", texto: "Publicación, campañas activas, medición de conversiones y optimización mes a mes." },
    ],
    paraQuien:
      "Negocios cuyos clientes buscan en Google antes de comprar: servicios profesionales, B2B, industria, salud, educación e inmobiliaria.",
    factores: [
      "Número de páginas y secciones",
      "Catálogo o e-commerce vs. sitio institucional",
      "Integraciones con CRM, pasarela de pago o reservas",
      "Competencia del sector y alcance del trabajo de SEO",
    ],
    precio: null,
    stack: ["Next.js", "Tailwind CSS", "Vercel", "Google Search Console", "Google Ads", "Google Analytics 4", "Mercado Libre", "Falabella Seller"],
    tags: ["Landing pages", "Sitios corporativos", "SEO", "Google Ads"],
  },
  {
    n: "03",
    id: "plataformas-saas",
    accentRgb: "46,158,107",
    categoria: "Desarrollo",
    // ⚠️ BORRADOR 2026-10: servicio nuevo sin documentación previa. El contenido
    // de abajo es una propuesta a validar con Manuel, no una descripción
    // verificada de lo que ya se entrega.
    title: "Plataformas de Gestión SaaS",
    tagline: "El sistema a medida que reemplaza el Excel, el WhatsApp y la cabeza de dos personas.",
    problema:
      "Tu operación corre en hojas de cálculo que solo entiende quien las armó, grupos de WhatsApp donde se pierde la información y procesos que viven en la memoria de un par de personas. Cada vez que alguien se va o el volumen sube, el sistema se rompe. Y el software genérico que probaste no se parece a cómo trabajas.",
    desc: "Desarrollamos la plataforma que tu operación necesita: un sistema web propio, con los usuarios, permisos y flujos de tu negocio, al que tu equipo entra desde cualquier lugar. No adaptamos tu forma de trabajar a un software enlatado — construimos el software alrededor de cómo ya trabajas.",
    resultado: [
      "Una sola fuente de verdad en lugar de archivos sueltos y versiones duplicadas",
      "Cada persona viendo exactamente lo que le corresponde, con su propio acceso",
      "Reportes que se arman solos, sin que nadie consolide a mano",
      "Un sistema que escala con el volumen en lugar de romperse con él",
    ],
    incluye: [
      "Relevamiento de procesos y diseño funcional antes de programar",
      "Plataforma web a medida con usuarios, roles y permisos",
      "Panel de control con los indicadores de tu operación",
      "Integración con las herramientas que ya usas",
      "Capacitación al equipo y documentación de uso",
      "Soporte y mejoras durante la puesta en marcha",
    ],
    proceso: [
      { paso: "Relevamiento", texto: "Mapeamos cómo trabajas hoy, dónde se pierde información y qué tiene que resolver el sistema." },
      { paso: "Construcción", texto: "Desarrollo por etapas, con entregas parciales que puedes usar antes de que esté todo terminado." },
      { paso: "Puesta en marcha", texto: "Migración de datos, capacitación del equipo y ajustes con uso real durante las primeras semanas." },
    ],
    paraQuien:
      "Empresas con una operación que ya no entra en Excel y procesos propios que ningún software de catálogo resuelve bien.",
    factores: [
      "Cantidad de módulos y complejidad de los flujos",
      "Número de usuarios y niveles de permiso",
      "Integraciones con sistemas existentes",
      "Migración de datos históricos",
    ],
    precio: null,
    stack: ["Next.js", "Supabase", "Vercel", "n8n", "Railway", "Notion"],
    tags: ["Software a medida", "Panel de control", "Multiusuario", "Integraciones"],
  },
  {
    n: "04",
    id: "eventos-b2b",
    accentRgb: "90,190,190",
    categoria: "Eventos",
    title: "Gestión de Eventos B2B",
    tagline: "Del concepto al after movie: eventos corporativos que siguen rindiendo como contenido.",
    problema:
      "Invertiste meses y un presupuesto grande en un evento que duró unas horas. Al día siguiente queda una carpeta de fotos sin editar, ningún video que valga la pena publicar, y todo el impacto se evaporó con los que estuvieron ahí.",
    desc: "Producimos eventos corporativos con mirada de marca: concepto, identidad visual, materiales, ambientación y la cobertura audiovisual completa. La diferencia es que el evento se piensa desde el inicio también como contenido, así que cuando termina te queda material para semanas de comunicación.",
    resultado: [
      "Un evento con identidad propia, no un salón con tu logo pegado",
      "After movie y piezas para redes editadas y entregadas",
      "Material suficiente para comunicar semanas después del evento",
      "Un solo interlocutor para concepto, producción y registro",
    ],
    incluye: [
      "Concepto e identidad visual del evento",
      "Diseño de materiales, señalética y ambientación",
      "Producción audiovisual previa: teasers e invitaciones",
      "Cobertura del evento en foto y video",
      "Edición de after movie y piezas verticales para redes",
      "Coordinación con proveedores y locación",
    ],
    proceso: [
      { paso: "Concepto", texto: "Definimos la idea, la identidad y la experiencia que va a vivir el asistente." },
      { paso: "Producción", texto: "Materiales, ambientación, teasers y coordinación de proveedores antes del día del evento." },
      { paso: "Cobertura", texto: "Registro audiovisual completo el día del evento y entrega de piezas editadas después." },
    ],
    paraQuien:
      "Empresas con lanzamientos, convenciones, ferias o activaciones que quieren que el evento comunique más allá de los que asistieron.",
    factores: [
      "Escala del evento y número de asistentes",
      "Alcance de la ambientación y materiales físicos",
      "Tamaño del equipo de cobertura audiovisual",
      "Cantidad de piezas editadas post-evento",
    ],
    precio: null,
    stack: ["Notion", "CapCut Pro", "Adobe Premiere", "ElevenLabs"],
    tags: ["Concepto", "Ambientación", "Cobertura", "After movie"],
  },
  {
    n: "05",
    id: "capacitacion-ia",
    accentRgb: "217,164,65",
    categoria: "Formación",
    title: "Capacitación Empresarial en IA Generativa",
    tagline: "Tu equipo de marketing produciendo con IA y criterio, en cuatro sesiones.",
    problema:
      "Tu equipo ya probó las herramientas de IA y los resultados salen genéricos: piezas que se notan hechas con IA y no se parecen a la marca. El problema no son las herramientas, es que nadie les enseñó el criterio que va antes de la herramienta. Y los cursos del mercado enseñan a usar software, no a dirigir.",
    desc: "Programa in-company en vivo, personalizado a tu marca. No es un curso grabado ni una demo de herramientas: tu equipo trabaja sobre su propio negocio durante las sesiones y sale con el sistema construido y funcionando. Lo dicta quien produce todos los meses para clientes reales, no un instructor de catálogo.",
    resultado: [
      "El Cerebro Creativo IA de tu marca construido y funcionando",
      "Una pieza real de tu marca producida durante la capacitación",
      "La grilla de contenido de los siguientes 30 días, lista para ejecutar",
      "Un equipo que produce con criterio propio, sin depender de proveedores para cada pieza",
    ],
    incluye: [
      "4 sesiones en vivo de 3.5 horas, personalizadas a tu marca",
      "Sesión 1 — Pensar: insight, concepto y estructuras narrativas",
      "Sesión 2 — El sistema: construyen el Cerebro Creativo IA de la marca",
      "Sesión 3 — Crear: producción de una pieza real con criterio de dirección",
      "Sesión 4 — Operar: flujo de trabajo, control de calidad y grilla mensual",
      "Plantillas del sistema y material de apoyo para el equipo",
    ],
    proceso: [
      { paso: "Diagnóstico", texto: "Revisamos qué produce hoy el equipo, con qué herramientas y dónde se rompe el resultado." },
      { paso: "Capacitación", texto: "Cuatro sesiones en vivo, cada una con bloque de contenido y bloque de trabajo aplicado a la marca." },
      { paso: "Operación", texto: "El equipo arma su grilla del mes siguiente y queda con el flujo de trabajo definido." },
    ],
    paraQuien:
      "Empresas con equipo de marketing propio que ya intenta producir con IA y necesita criterio y método, no más herramientas.",
    factores: [
      "Número de participantes",
      "Modalidad presencial o remota",
      "Nivel de personalización del contenido a la industria",
      "Acompañamiento posterior a las sesiones",
    ],
    precio: null,
    stack: ["Higgsfield", "Kling 3.0", "Nano Banana Pro", "ElevenLabs", "ChatGPT", "Claude", "Notion"],
    tags: ["In-company", "4 sesiones en vivo", "Equipos de marketing", "Entregables reales"],
    destacado: true,
  },
  {
    n: "06",
    id: "plataformas-interactivas",
    accentRgb: "176,110,224",
    categoria: "Desarrollo",
    // ⚠️ BORRADOR 2026-10: servicio nuevo sin documentación previa. El contenido
    // de abajo es una propuesta a validar con Manuel, no una descripción
    // verificada de lo que ya se entrega.
    title: "Plataformas Interactivas y Videojuegos",
    tagline: "Experiencias jugables que convierten una activación o una capacitación en algo que la gente quiere hacer.",
    problema:
      "En una feria la gente pasa de largo frente al stand, y en una capacitación interna el equipo abre el módulo, hace clic hasta el final y no retiene nada. El material está bien hecho, pero es pasivo: nadie participa porque nada le pide participar.",
    desc: "Desarrollamos experiencias interactivas a medida —juegos de marca, dinámicas para stands, simuladores y capacitación gamificada— que funcionan en navegador, pantalla táctil o celular. La mecánica se diseña alrededor de tu objetivo: captar datos en una feria, enseñar un procedimiento o hacer que alguien entienda tu producto jugando.",
    resultado: [
      "Gente que se detiene, participa y deja sus datos sin que haya que perseguirla",
      "Capacitaciones que el equipo termina porque quiere, no porque es obligatorio",
      "Métricas reales de participación: quién jugó, cuánto duró, qué respondió",
      "Una pieza reutilizable en varias ferias, campañas o sedes",
    ],
    incluye: [
      "Diseño de la mecánica según el objetivo comercial o formativo",
      "Desarrollo de la experiencia para navegador, táctil o celular",
      "Arte y animación con la identidad de tu marca",
      "Captura de datos de participantes y panel de resultados",
      "Montaje y soporte durante el evento o el lanzamiento interno",
      "Ajustes y nuevas versiones para reutilizarla después",
    ],
    proceso: [
      { paso: "Mecánica", texto: "Definimos qué tiene que lograr la experiencia y qué dinámica lo consigue en el tiempo que la gente realmente dedica." },
      { paso: "Producción", texto: "Desarrollo, arte y pruebas con usuarios reales antes del día del lanzamiento." },
      { paso: "Operación", texto: "Montaje, soporte en vivo y entrega de los datos y métricas de participación." },
    ],
    paraQuien:
      "Empresas con presencia en ferias y activaciones, o con capacitación interna que hoy nadie termina de leer.",
    factores: [
      "Complejidad de la mecánica y duración de la experiencia",
      "Nivel de arte y animación requerido",
      "Soporte en evento y número de sedes o fechas",
      "Integración con CRM o base de datos de participantes",
    ],
    precio: null,
    stack: ["Next.js", "Three.js", "Supabase", "Vercel", "Nano Banana Pro", "Higgsfield"],
    tags: ["Gamificación", "Ferias y activaciones", "Capacitación interna", "Captura de datos"],
  },
];

export const SERVICIOS_STACK = [
  "Higgsfield", "Kling 3.0", "Seedance 2.0", "ElevenLabs", "HeyGen", "Suno",
  "Claude Code", "ChatGPT", "Premiere Pro", "DaVinci Resolve", "CapCut Pro",
];
