// ============================================================
// SERVICIOS — DATA EDITABLE (tarjetas de /servicios)
//
// 2026-10-08: la cartera sigue la "Propuesta de rediseño web" revisada con
// los socios (PDF del 8-oct): 8 servicios en 3 áreas, una página por
// servicio en /servicios/[id]. Los ids son las URLs finales, elegidas por
// palabra clave (doc 07 §0) — cambiar un id cambia una URL indexada.
//
// Este archivo alimenta las tarjetas del índice. El contenido largo de cada
// página (oferta, casos, paquetes, FAQ) vive en lib/servicios-detalle.ts.
//
// Precios: todos en null → "Inversión a cotizar" (decisión 2026-10).
// ============================================================

export type AreaId = 1 | 2 | 3;

export const AREAS: Record<AreaId, { n: string; nombre: string; titulo: string; para: string }> = {
  1: {
    n: "01",
    nombre: "Marketing digital y ventas online",
    titulo: "Marketing digital en Lima: Google Ads, SEO, páginas web y tiendas virtuales",
    para: "Para que te encuentren cuando buscan lo que vendes y cada visita termine en una venta o una conversación por WhatsApp.",
  },
  2: {
    n: "02",
    nombre: "Publicidad con IA y eventos",
    titulo: "Publicidad con IA y eventos corporativos: spots, ferias y videojuegos a medida",
    para: "Para que tu marca se vea a la altura de lo que cobras: en pantalla, en el stand y en lo que la gente juega y recuerda.",
  },
  3: {
    n: "03",
    nombre: "Capacitación en IA",
    titulo: "Capacitación en IA para empresas",
    para: "Para que tu equipo produzca con IA y con criterio, sin depender de un proveedor para cada pieza.",
  },
};

export type Servicio = {
  n: string;
  id: string; // = slug de /servicios/[id]
  area: AreaId;
  // Acento propio del servicio, en RGB suelto para componer rgba() en CSS.
  // Paleta curada: tonos medios (nada neón) que funcionan sobre el fondo oscuro.
  accentRgb: string;
  title: string; // nombre corto: menú, tarjetas, migas de pan
  tagline: string; // frase de la tarjeta
  problema: string; // la tensión que abre el detalle
  desc: string; // qué hacemos
  resultado: string[]; // qué se lleva el cliente, en concreto
  incluye: string[];
  proceso?: { paso: string; texto: string }[];
  paraQuien?: string;
  factores?: string[]; // qué mueve la inversión
  precio: { desde: string; hasta?: string; nota?: string } | null;
  // Herramientas reales con las que se ejecuta el servicio. No son
  // entregables: es la cinta de "con qué está hecho".
  stack?: string[];
  tags: string[];
};

export const SERVICIOS: Servicio[] = [
  // ══════════════ ÁREA 01 · MARKETING DIGITAL Y VENTAS ONLINE ══════════════
  {
    n: "01",
    id: "google-ads",
    area: 1,
    accentRgb: "26,128,255",
    title: "Google Ads",
    tagline: "¿Inviertes en anuncios y no sabes qué clic se volvió venta? Medimos cada contacto hasta su origen.",
    problema:
      "Pagas cada clic y a fin de mes no sabes cuáles terminaron en un cliente. Sin medición, cualquier ajuste a la campaña es a ciegas: subes el presupuesto en lo que no vende y apagas lo que sí.",
    desc: "Armamos y gestionamos tus campañas de búsqueda y, según tu objetivo, de YouTube, Demand Gen y Performance Max. Empezamos por la medición: sin saber qué clic termina en un contacto, cualquier optimización es a ciegas. La cuenta queda a tu nombre, la pauta se paga directo a Google y tú ves el panel cuando quieras.",
    resultado: [
      "Saber qué campaña trae clientes y cuál solo gasta",
      "El presupuesto movido hacia lo que sí vende",
      "Una cuenta a tu nombre, con su historial y su medición",
      "Cada mes, la lectura y las decisiones por escrito",
    ],
    incluye: [
      "Medición de conversiones: clics a WhatsApp, llamadas y formularios",
      "Campañas de búsqueda y, según el objetivo, YouTube, Demand Gen o Performance Max",
      "Panel conectado a Google Ads y Google Analytics 4",
      "Ciclo semanal sobre términos de búsqueda, pujas y presupuesto",
      "Revisión mensual de la meta contigo",
    ],
    proceso: [
      { paso: "Medición", texto: "Antes de gastar un sol: conversiones configuradas, meta acordada por escrito y una línea base para comparar." },
      { paso: "Lanzamiento", texto: "Campañas, anuncios y página de destino en línea. Las dos primeras semanas revisamos gasto y anuncios todos los días." },
      { paso: "Optimización", texto: "Ciclo semanal sobre términos de búsqueda, pujas y presupuesto, y revisión mensual de la meta contigo." },
    ],
    paraQuien:
      "Empresas cuyo cliente busca en Google antes de comprar y que quieren saber, contacto por contacto, qué les devuelve cada sol invertido.",
    factores: ["Inversión mensual en pauta", "Número de campañas", "Medición que hay que configurar", "Página de destino"],
    precio: null,
    stack: ["Google Ads", "Google Analytics 4", "Google Tag Manager", "Looker Studio"],
    tags: ["Anuncios en Google", "Medido hasta WhatsApp", "Panel en vivo", "Cuenta a tu nombre"],
  },
  {
    n: "02",
    id: "posicionamiento-seo",
    area: 1,
    accentRgb: "0,169,196",
    title: "Posicionamiento SEO",
    tagline: "¿Tu competencia aparece en Google y tú no? Posicionamos las búsquedas que traen clientes.",
    problema:
      "Tu cliente busca exactamente lo que vendes y encuentra a tu competencia. Tu web existe, pero Google no la entiende o no la considera la mejor respuesta, y cada mes pierdes consultas que ni sabes que existieron.",
    desc: "Empezamos por las búsquedas que hace tu cliente antes de comprar y por el estado técnico de tu web. Corregimos lo que impide que Google la entienda —velocidad, estructura, títulos, datos estructurados— y le damos a cada servicio o producto una página preparada para la búsqueda que le corresponde. Después medimos qué visitas desde Google terminan en un contacto, no solo cuántas llegan.",
    resultado: [
      "Visitas que llegan buscando lo que vendes, no tráfico de relleno",
      "Una web que Google puede leer, sin errores técnicos que la frenen",
      "Contenido que responde lo que tu cliente pregunta antes de comprar",
      "Un canal que sigue trabajando aunque pauses la publicidad",
    ],
    incluye: [
      "Auditoría técnica de tu web",
      "Mapa de las búsquedas que traen clientes en tu sector",
      "Correcciones técnicas: velocidad, estructura, títulos y datos estructurados",
      "Páginas o contenidos que falten para cada búsqueda",
      "Seguimiento mensual en Search Console y Analytics",
    ],
    proceso: [
      { paso: "Diagnóstico", texto: "Auditoría técnica de tu web y mapa de las búsquedas que traen clientes en tu sector. Aquí se decide qué página trabaja cada búsqueda." },
      { paso: "Optimización", texto: "Correcciones técnicas, títulos, estructura y datos estructurados, y las páginas o contenidos que falten." },
      { paso: "Seguimiento", texto: "Medición mensual en Search Console y Analytics: qué búsquedas suben, qué visitas escriben y qué ajustamos." },
    ],
    paraQuien:
      "Empresas con un mercado que busca en Google y que quieren depender menos de pagar cada visita.",
    factores: ["Estado técnico de la web", "Número de páginas a trabajar", "Competencia del sector", "Ritmo de contenido nuevo"],
    precio: null,
    stack: ["Google Search Console", "Google Analytics 4", "Google Tag Manager", "Planificador de Palabras Clave"],
    tags: ["SEO técnico", "Palabras clave", "Contenido", "Contactos medidos"],
  },
  {
    n: "03",
    id: "diseno-paginas-web",
    area: 1,
    accentRgb: "46,158,107",
    title: "Diseño de páginas web",
    tagline: "¿Tu web existe y nadie te escribe? Diseñamos páginas para vender, no folletos en línea.",
    problema:
      "Tu web se ve correcta y no trae a nadie. O trae visitas que se van sin escribir. Estás pagando por un folleto en línea mientras tu competencia se queda con las búsquedas que deberían ser tuyas.",
    desc: "Diseñamos tu sitio con estándar visual de agencia y con un solo objetivo: que quien busca lo que ofreces te encuentre y te escriba. Una landing para una campaña o una web corporativa para tu empresa, con tus servicios, tus casos y tu contacto. La dejamos lista para posicionar desde el código y medida, para que sepas qué visita terminó en contacto.",
    resultado: [
      "Una web medida por los contactos que genera, no por cómo se ve",
      "Cada visita con un camino claro a WhatsApp o formulario",
      "Una web que se ve y se usa bien en el celular, donde te buscan",
      "Textos y estructura pensados para tu cliente, no una plantilla rellenada",
    ],
    incluye: [
      "Estrategia: objetivo del sitio, arquitectura de contenido y palabras clave",
      "Diseño y desarrollo completo, adaptado a celular",
      "SEO técnico y on-page desde el desarrollo",
      "Medición de contactos configurada antes de publicar",
      "Textos orientados a conversión y contacto directo por WhatsApp",
    ],
    proceso: [
      { paso: "Estrategia", texto: "Objetivo del sitio, arquitectura de contenido y las palabras clave que traen clientes. Aquí se decide si necesitas una landing, una web corporativa o una tienda virtual." },
      { paso: "Desarrollo", texto: "Construcción visual y técnica con el posicionamiento incorporado desde el código, no parchado después." },
      { paso: "Lanzamiento", texto: "Publicación, medición de contactos y ajustes con datos reales durante las primeras semanas." },
    ],
    paraQuien:
      "Empresas cuyo cliente busca en Google antes de comprar: servicios profesionales, B2B, industria, salud y educación.",
    factores: ["Landing o web corporativa", "Número de secciones", "Integraciones", "Contenido que hay que producir"],
    precio: null,
    stack: ["Next.js", "Tailwind CSS", "Vercel", "Google Search Console", "Google Analytics 4"],
    tags: ["Landing pages", "Webs corporativas", "SEO desde el código", "Contactos medidos"],
  },
  {
    n: "04",
    id: "tienda-virtual",
    area: 1,
    accentRgb: "90,190,190",
    title: "Tienda virtual y ecommerce",
    tagline: "¿Vendes por chat y quieres tu propia tienda virtual? Una página por producto, con cada pedido medido.",
    problema:
      "Vendes por WhatsApp e Instagram, y cada venta depende de que alguien conteste a tiempo y mande la foto correcta. No tienes dónde mostrar tu catálogo completo, Google no encuentra tus productos y no sabes qué consulta terminó en venta.",
    desc: "Construimos tu tienda virtual con estándar visual de agencia: una ficha por producto con fotos, especificaciones y precio, filtros por categoría y la forma de cerrar la venta que le sirve a tu negocio. Si tu cliente compra solo y en volumen, carrito y pago en línea. Si necesita asesoría o el ticket es alto, un catálogo online con un botón para cotizar por WhatsApp con el producto ya elegido.",
    resultado: [
      "Una tienda que muestra y vende a cualquier hora",
      "Menos tiempo de tu equipo respondiendo precios y fichas uno por uno",
      "Un catálogo ordenado que el cliente recorre solo, desde el celular",
      "La consulta por WhatsApp llega con el producto ya elegido",
    ],
    incluye: [
      "Estructura del catálogo: categorías, filtros y datos de cada ficha",
      "Fichas de producto con fotos, especificaciones y ficha técnica descargable",
      "Carrito y pasarela de pago, si vendes en línea",
      "Botón de cotización por WhatsApp con el producto preseleccionado",
      "Medición de ventas y consultas",
    ],
    proceso: [
      { paso: "Estructura", texto: "Ordenamos tus productos: categorías, filtros y qué datos lleva cada ficha. Aquí se decide si cobras en línea, cotizas por WhatsApp o ambas cosas." },
      { paso: "Desarrollo", texto: "Fichas, carrito o botón de cotización construidos con el posicionamiento incorporado desde el código." },
      { paso: "Lanzamiento", texto: "Publicación, medición de ventas y consultas, y ajustes con datos reales durante las primeras semanas." },
    ],
    paraQuien:
      "Empresas que hoy venden por chat o redes y quieren su propia web para vender, con volumen o con ticket alto.",
    factores: ["Número de productos", "Pago en línea o cotización", "Integraciones", "Contenido de producto"],
    precio: null,
    stack: ["Next.js", "Tailwind CSS", "Vercel", "Google Search Console", "Google Analytics 4"],
    tags: ["Tienda virtual", "Pago en línea", "Catálogo con WhatsApp", "Una página por producto"],
  },

  // ══════════════ ÁREA 02 · PUBLICIDAD CON IA Y EVENTOS ══════════════
  {
    n: "05",
    id: "spot-publicitario-ia",
    area: 2,
    accentRgb: "217,164,65",
    title: "Spot publicitario con IA",
    tagline: "¿Cómo destacar cuando vendes lo mismo que tus competidores? Con un spot que nadie más tiene.",
    problema:
      "Con producción tradicional un spot cuesta entre $10,000 y $100,000 y tarda meses: casting, locación, equipo y postproducción. Y cuando por fin sale, no hay presupuesto para el contenido que lo acompaña el resto del mes.",
    desc: "Producimos el spot y el contenido del mes con el mismo criterio de dirección. El comercial se dirige plano por plano —guion, storyboard, shot list, consistencia de personaje— y el contenido mensual sale de esa misma línea visual, así que todo se reconoce como tu marca. La diferencia entre un video hecho con IA y un comercial es la dirección, y eso es lo que ponemos.",
    resultado: [
      "Lo que no se puede filmar, visto: procesos internos, escalas y lugares imposibles",
      "Un comercial en semanas, sin rodaje, locación ni casting",
      "El contenido del mes con la misma línea visual del spot",
      "Una pieza que tu equipo comercial usa también en la sala de ventas",
    ],
    incluye: [
      "Concepto, guion, storyboard y shot list",
      "Generación plano por plano con consistencia de rostro y movimiento",
      "Edición, color, diseño sonoro, locución y música",
      "Contenido mensual: videos, carruseles e imágenes de marca",
      "Formatos y cortes listos para cada canal",
    ],
    proceso: [
      { paso: "Dirección", texto: "Concepto, guion y definición del look. Nada se genera hasta que la pieza está resuelta en papel." },
      { paso: "Producción", texto: "Generación plano por plano, con las iteraciones necesarias hasta lograr consistencia real." },
      { paso: "Acabado", texto: "Edición, color, sonido y exportación por formato. Se entrega el paquete completo, no piezas sueltas." },
    ],
    paraQuien:
      "Marcas con un momento comercial concreto —lanzamiento, temporada alta, reposicionamiento— que necesitan verse a la altura de lo que cobran.",
    factores: ["Duración del spot", "Personajes y sincronía labial", "Volumen de contenido mensual", "Locución y música"],
    precio: null,
    stack: ["Higgsfield", "Kling 3.0", "Seedance 2.0", "Nano Banana Pro", "ElevenLabs", "HeyGen", "Suno", "CapCut Pro", "DaVinci Resolve"],
    tags: ["Spots con IA", "Contenido mensual", "Cinemática 4K", "Plano por plano"],
  },
  {
    n: "06",
    id: "eventos-corporativos",
    area: 2,
    accentRgb: "224,112,92",
    title: "Eventos corporativos y ferias",
    tagline: "¿Tu stand deja de rendir cuando termina la feria? Cobertura, activación y contenido para semanas.",
    problema:
      "Pagaste el stand, el montaje y tres días de feria. Al día siguiente queda una carpeta de fotos sin editar, ningún video que valga la pena publicar y todo el impacto se fue con los que pasaron por ahí.",
    desc: "Cubrimos el evento de punta a punta: montaje, días de feria y desmontaje, con fotografía y video editado. Si lo necesitas, también armamos la activación de marca en el stand —barra, demostración en vivo del producto o un videojuego hecho a medida— coordinando a los proveedores. Todo se piensa desde el inicio como contenido, así que cuando la feria cierra te queda material para semanas de comunicación.",
    resultado: [
      "Un stand que la gente recuerda, no un salón con tu logo pegado",
      "Piezas editadas y entregadas, no una carpeta sin procesar",
      "Material reutilizable para el equipo comercial",
      "Contenido publicado mientras la feria todavía se recuerda",
    ],
    incluye: [
      "Presencia en montaje y desmontaje",
      "Cobertura de cada día de feria en foto y video",
      "Videoreels editados para redes",
      "Activación de marca en el stand, si el evento la pide",
      "After movie y piezas post-evento",
    ],
    proceso: [
      { paso: "Concepto", texto: "Definimos qué tiene que lograr el stand, qué se muestra, qué se juega y qué experiencia vive el visitante." },
      { paso: "Montaje y feria", texto: "Cobertura desde el montaje hasta el último día, con la activación funcionando y el registro en marcha." },
      { paso: "Contenido", texto: "Edición y entrega de las piezas, para publicar mientras el evento todavía se recuerda." },
    ],
    paraQuien:
      "Empresas con ferias, lanzamientos o convenciones en agenda que quieren que el evento siga trabajando después.",
    factores: ["Días de evento", "Bloques que se contratan", "Activación en el stand", "Piezas post-evento"],
    precio: null,
    stack: ["Notion", "CapCut Pro", "Adobe Premiere", "ElevenLabs"],
    tags: ["Cobertura de eventos", "Activaciones de marca", "Juegos para el stand", "After movie"],
  },
  {
    n: "07",
    id: "videojuegos-a-medida",
    area: 2,
    accentRgb: "139,108,255",
    title: "Videojuegos a medida",
    tagline: "¿Y si tu cliente entendiera tu producto jugando? Juegos para tu stand, tu marca o tu equipo.",
    problema:
      "En la feria la gente pasa de largo frente al stand, y en la capacitación interna el equipo hace clic hasta el final sin retener nada. El material está bien hecho, pero nadie participa porque nada le pide participar.",
    desc: "Desarrollamos experiencias interactivas a medida —juegos de marca, dinámicas para stands, simuladores y capacitación gamificada— que funcionan en navegador, pantalla táctil o celular. La mecánica se diseña alrededor de tu objetivo: captar datos en una feria, enseñar un procedimiento o hacer que alguien entienda tu producto jugando.",
    resultado: [
      "Gente que se detiene en tu stand y participa",
      "Tu producto entendido sin leer un folleto",
      "Datos de participación para medir el stand, no impresiones",
      "Un motivo para que te recuerden después de la feria",
    ],
    incluye: [
      "Diseño de la mecánica según tu objetivo",
      "Desarrollo para pantalla táctil, navegador o celular",
      "Arte y animación con la identidad de tu marca",
      "Pruebas con usuarios reales antes del lanzamiento",
      "Montaje y soporte durante el evento",
    ],
    proceso: [
      { paso: "Mecánica", texto: "Definimos qué tiene que lograr la experiencia y qué dinámica lo consigue en el tiempo que la gente realmente dedica." },
      { paso: "Producción", texto: "Desarrollo, arte y pruebas con usuarios reales antes del día del lanzamiento." },
      { paso: "Operación", texto: "Montaje, soporte en vivo y entrega de los datos y métricas de participación." },
    ],
    paraQuien:
      "Empresas con presencia en ferias y activaciones, o con capacitación interna que hoy nadie termina.",
    factores: ["Complejidad de la mecánica", "Nivel de arte", "Soporte en evento", "Integraciones"],
    precio: null,
    stack: ["Next.js", "Three.js", "Supabase", "Vercel", "Nano Banana Pro", "Higgsfield"],
    tags: ["Juegos para el stand", "Activaciones de marca", "Táctil, web o celular", "Funciona sin internet"],
  },

  // ══════════════ ÁREA 03 · CAPACITACIÓN EN IA ══════════════
  {
    n: "08",
    id: "capacitacion-ia",
    area: 3,
    accentRgb: "199,125,187",
    title: "Capacitación en IA para empresas",
    tagline: "¿Tu equipo prueba IA y todo sale genérico? En cuatro sesiones, con tu propia marca.",
    problema:
      "Tu equipo ya probó las herramientas de IA y lo que sale se nota hecho con IA y no se parece a tu marca. El problema no son las herramientas: nadie les enseñó el criterio que va antes de la herramienta, y los cursos del mercado enseñan a usar software, no a dirigir.",
    desc: "Programa in-company en vivo, personalizado a tu marca. No es un curso grabado ni una demo de herramientas: tu equipo trabaja sobre su propio negocio durante las sesiones y sale con el sistema construido y funcionando. Lo dicta quien produce todos los meses para clientes reales, no un instructor de catálogo.",
    resultado: [
      "El Cerebro Creativo IA de tu marca construido y funcionando",
      "Una pieza real de tu marca producida durante la capacitación",
      "La grilla de contenido de los próximos 30 días, lista para ejecutar",
      "Un equipo que produce con criterio propio",
    ],
    incluye: [
      "4 sesiones en vivo de 3.5 horas, personalizadas a tu marca",
      "Sesión 1 — Pensar: insight, concepto y estructuras narrativas",
      "Sesión 2 — El sistema: el Cerebro Creativo IA de la marca",
      "Sesión 3 — Crear: producción de una pieza real",
      "Sesión 4 — Operar: flujo de trabajo, calidad y grilla mensual",
    ],
    proceso: [
      { paso: "Diagnóstico", texto: "Revisamos qué produce hoy el equipo, con qué herramientas y dónde se rompe el resultado." },
      { paso: "Capacitación", texto: "Cuatro sesiones en vivo, cada una con bloque de contenido y bloque de trabajo aplicado a la marca." },
      { paso: "Operación", texto: "El equipo arma su grilla del mes siguiente y queda con el flujo de trabajo definido." },
    ],
    paraQuien:
      "Equipos de marketing que ya intentan producir con IA y necesitan criterio y método, no más herramientas.",
    factores: ["Número de participantes", "Modalidad", "Adaptación a tu industria", "Acompañamiento posterior"],
    precio: null,
    stack: ["Higgsfield", "Kling 3.0", "Nano Banana Pro", "ElevenLabs", "ChatGPT", "Claude", "Notion"],
    tags: ["In-company", "4 sesiones en vivo", "Equipos de marketing", "Entregables reales"],
  },
];

export const SERVICIOS_STACK = [
  "Higgsfield", "Kling 3.0", "Seedance 2.0", "ElevenLabs", "HeyGen", "Suno",
  "Google Ads", "Google Analytics 4", "Next.js", "Claude Code", "DaVinci Resolve", "CapCut Pro",
];

// "Según tu situación": empieza por el servicio que resuelve el cuello de
// botella y sigue con el que suele venir después. Texto de la propuesta.
export const SITUACIONES: { situacion: string; empieza: string; luego: string }[] = [
  { situacion: "No te encuentran cuando buscan lo que ofreces", empieza: "google-ads", luego: "diseno-paginas-web" },
  { situacion: "Vendes por chat y quieres vender en tu propia web", empieza: "tienda-virtual", luego: "posicionamiento-seo" },
  { situacion: "Tu marca no se ve a la altura de lo que cobras", empieza: "spot-publicitario-ia", luego: "google-ads" },
  { situacion: "Tienes una feria y tu stand pasa desapercibido", empieza: "eventos-corporativos", luego: "videojuegos-a-medida" },
];
