// ============================================================
// LA NOTICIA — registro de fuentes y línea editorial
// Portal público en /noticias. Solo feeds RSS públicos:
// titular + extracto corto + enlace a la fuente original.
// Nunca reproducimos el artículo completo.
//
// REGLA 1 — ESPAÑOL PRIMERO, INGLÉS ETIQUETADO. El grueso del
// portal es prensa en español, para que el lector haga clic y
// llegue a algo que puede leer. No hay traducción automática
// (requeriría una API key que no existe en Vercel, y traducir el
// titular no arregla el destino en inglés). Las pocas fuentes en
// inglés que entran son las que NO tienen equivalente en español
// —cine, VFX, fotografía y ciencia dura— y llevan la etiqueta EN
// visible en la tarjeta, para que nadie haga clic a ciegas.
//
// REGLA 2 — IA APLICADA: lo que alguien puede usar, construir o
// vender. Ancho a propósito (producción, herramientas, proyectos,
// negocio, medicina, inventos) con una frontera: se cae lo que no
// le cambia el día a nadie que produce. Fuera por VETO: rondas de
// inversión, chips, papers, drama corporativo, ciberseguridad,
// ofertas de afiliados y reviews de celulares.
//
// REGLA 3 — Ningún medio de esta lista es exclusivo de IA, así que
// TODA nota tiene que mencionar IA de verdad para entrar. Sin eso
// se cuela media redacción de tecnología de consumo.
//
// El match del filtro es por LÍMITE DE PALABRA, no por subcadena
// (ver compilar() en feed.ts).
// ============================================================

export type Seccion =
  | "Producción"
  | "Herramientas"
  | "Hecho con IA"
  | "Negocio"
  | "Frontera";

/** Qué promete cada sección al lector. Se pinta en la portada. */
export const SECCIONES: Record<Seccion, { bajada: string; color: string }> = {
  Producción: {
    bajada: "Imagen, video, voz y edición — lo que cambia cómo produces",
    color: "#1A80FF",
  },
  Herramientas: {
    bajada: "Agentes, Claude, Codex y automatización — lo que instalas y usas",
    color: "#4D9FFF",
  },
  "Hecho con IA": {
    bajada: "Proyectos, inventos y campañas que alguien construyó — y cómo lo hizo",
    color: "#7BC47F",
  },
  Negocio: {
    bajada: "Agencias, marcas, campañas y dinero — lo que cambia cuánto cobras",
    color: "#E0A93C",
  },
  Frontera: {
    bajada: "Medicina, ciencia y el mundo real — hacia dónde va todo esto",
    color: "#C9A0DC",
  },
};

export type TipoFuente = "ia" | "publicidad" | "creativo";
export type Idioma = "es" | "en";

export type Fuente = {
  id: string;
  nombre: string;
  corto: string;
  url: string;
  tipo: TipoFuente;
  idioma: Idioma;
  sitio: string;
  seccionBase: Seccion;
  peso: number;
};

export const FUENTES: Fuente[] = [
  // ── Tecnología en español ────────────────────────────────────
  {
    id: "xataka",
    nombre: "Xataka",
    corto: "Xataka",
    url: "https://www.xataka.com/feedburner.xml",
    tipo: "ia",
    idioma: "es",
    sitio: "xataka.com",
    seccionBase: "Herramientas",
    peso: 9,
  },
  {
    id: "xataka-mx",
    nombre: "Xataka México",
    corto: "Xataka MX",
    url: "https://www.xataka.com.mx/feedburner.xml",
    tipo: "ia",
    idioma: "es",
    sitio: "xataka.com.mx",
    seccionBase: "Herramientas",
    peso: 8,
  },
  {
    id: "hipertextual",
    nombre: "Hipertextual",
    corto: "Hipertextual",
    url: "https://hipertextual.com/feed",
    tipo: "ia",
    idioma: "es",
    sitio: "hipertextual.com",
    seccionBase: "Herramientas",
    peso: 8,
  },
  {
    id: "genbeta",
    nombre: "Genbeta",
    corto: "Genbeta",
    url: "https://www.genbeta.com/feedburner.xml",
    tipo: "ia",
    idioma: "es",
    sitio: "genbeta.com",
    seccionBase: "Herramientas",
    peso: 8,
  },
  {
    id: "computerhoy",
    nombre: "Computer Hoy",
    corto: "Computer Hoy",
    url: "https://computerhoy.20minutos.es/rss",
    tipo: "ia",
    idioma: "es",
    sitio: "computerhoy.20minutos.es",
    seccionBase: "Herramientas",
    peso: 7,
  },
  {
    id: "wwwhatsnew",
    nombre: "WWWhat's new",
    corto: "WWWhat's new",
    url: "https://wwwhatsnew.com/feed/",
    tipo: "ia",
    idioma: "es",
    sitio: "wwwhatsnew.com",
    seccionBase: "Hecho con IA",
    peso: 8,
  },
  {
    id: "enterco",
    nombre: "ENTER.CO",
    corto: "ENTER.CO",
    url: "https://www.enter.co/feed/",
    tipo: "ia",
    idioma: "es",
    sitio: "enter.co",
    seccionBase: "Hecho con IA",
    peso: 7,
  },
  {
    id: "unocero",
    nombre: "unocero",
    corto: "unocero",
    url: "https://www.unocero.com/feed/",
    tipo: "ia",
    idioma: "es",
    sitio: "unocero.com",
    seccionBase: "Herramientas",
    peso: 6,
  },
  {
    id: "blogthinkbig",
    nombre: "Think Big",
    corto: "Think Big",
    url: "https://blogthinkbig.com/feed",
    tipo: "ia",
    idioma: "es",
    sitio: "blogthinkbig.com",
    seccionBase: "Hecho con IA",
    peso: 6,
  },

  {
    id: "wired-es",
    nombre: "WIRED en Español",
    corto: "WIRED",
    url: "https://es.wired.com/feed/rss",
    tipo: "ia",
    idioma: "es",
    sitio: "es.wired.com",
    seccionBase: "Frontera",
    peso: 9,
  },
  {
    id: "muycomputer",
    nombre: "MuyComputer",
    corto: "MuyComputer",
    url: "https://www.muycomputer.com/feed/",
    tipo: "ia",
    idioma: "es",
    sitio: "muycomputer.com",
    seccionBase: "Herramientas",
    peso: 6,
  },
  {
    id: "eltiempo",
    nombre: "El Tiempo · Tecnósfera",
    corto: "El Tiempo",
    url: "https://www.eltiempo.com/rss/tecnosfera.xml",
    tipo: "ia",
    idioma: "es",
    sitio: "eltiempo.com",
    seccionBase: "Herramientas",
    peso: 6,
  },

  // ── Ciencia y mundo real en español ──────────────────────────
  {
    id: "muyinteresante",
    nombre: "Muy Interesante",
    corto: "Muy Interesante",
    url: "https://www.muyinteresante.com/rss",
    tipo: "ia",
    idioma: "es",
    sitio: "muyinteresante.com",
    seccionBase: "Frontera",
    peso: 7,
  },

  // ── Prensa generalista, sección tecnología ───────────────────
  // Aportan el volumen y la cobertura de IA aplicada a medicina,
  // ciencia y sociedad que la prensa tech pura no cubre.
  {
    id: "elpais",
    nombre: "El País · Tecnología",
    corto: "El País",
    url: "https://elpais.com/rss/tecnologia/portada.xml",
    tipo: "ia",
    idioma: "es",
    sitio: "elpais.com",
    seccionBase: "Frontera",
    peso: 9,
  },
  {
    id: "lavanguardia",
    nombre: "La Vanguardia · Tecnología",
    corto: "La Vanguardia",
    url: "https://www.lavanguardia.com/rss/tecnologia.xml",
    tipo: "ia",
    idioma: "es",
    sitio: "lavanguardia.com",
    seccionBase: "Frontera",
    peso: 7,
  },
  {
    id: "20minutos",
    nombre: "20minutos · Tecnología",
    corto: "20minutos",
    url: "https://www.20minutos.es/rss/tecnologia/",
    tipo: "ia",
    idioma: "es",
    sitio: "20minutos.es",
    seccionBase: "Herramientas",
    peso: 6,
  },
  {
    id: "abc",
    nombre: "ABC · Tecnología",
    corto: "ABC",
    url: "https://www.abc.es/rss/2.0/tecnologia/",
    tipo: "ia",
    idioma: "es",
    sitio: "abc.es",
    seccionBase: "Frontera",
    peso: 6,
  },
  {
    id: "clarin",
    nombre: "Clarín · Tecnología",
    corto: "Clarín",
    url: "https://www.clarin.com/rss/tecnologia/",
    tipo: "ia",
    idioma: "es",
    sitio: "clarin.com",
    seccionBase: "Herramientas",
    peso: 7,
  },

  // ── Publicidad y marketing en español ────────────────────────
  {
    id: "roastbrief",
    nombre: "Roastbrief",
    corto: "Roastbrief",
    url: "https://www.roastbrief.com.mx/feed/",
    tipo: "publicidad",
    idioma: "es",
    sitio: "roastbrief.com.mx",
    seccionBase: "Negocio",
    peso: 9,
  },
  {
    id: "marketing4ecommerce",
    nombre: "Marketing4eCommerce",
    corto: "Marketing4eCommerce",
    url: "https://marketing4ecommerce.net/feed/",
    tipo: "publicidad",
    idioma: "es",
    sitio: "marketing4ecommerce.net",
    seccionBase: "Negocio",
    peso: 8,
  },
  {
    id: "merca20",
    nombre: "Merca2.0",
    corto: "Merca2.0",
    url: "https://www.merca20.com/feed/",
    tipo: "publicidad",
    idioma: "es",
    sitio: "merca20.com",
    seccionBase: "Negocio",
    peso: 7,
  },

  // ── Cine, VFX, foto y ciencia en inglés ──────────────────────
  // Excepción a la Regla 1, acordada aparte: la prensa en español
  // no cubre producción audiovisual ni VFX a este nivel, y era el
  // hueco más grande del portal. Van con la etiqueta EN a la vista
  // (PieFuente en Radar.tsx la pinta sola con idioma: "en") y con
  // peso moderado, para que no le ganen la portada al español.
  {
    id: "nofilmschool",
    nombre: "No Film School",
    corto: "No Film School",
    url: "https://nofilmschool.com/rss.xml",
    tipo: "creativo",
    idioma: "en",
    sitio: "nofilmschool.com",
    seccionBase: "Producción",
    peso: 7,
  },
  {
    id: "petapixel",
    nombre: "PetaPixel",
    corto: "PetaPixel",
    url: "https://petapixel.com/feed/",
    tipo: "creativo",
    idioma: "en",
    sitio: "petapixel.com",
    seccionBase: "Producción",
    peso: 7,
  },
  {
    id: "beforesandafters",
    nombre: "befores & afters",
    corto: "befores & afters",
    url: "https://beforesandafters.com/feed/",
    tipo: "creativo",
    idioma: "en",
    sitio: "beforesandafters.com",
    seccionBase: "Producción",
    peso: 7,
  },
  {
    id: "ieee-spectrum-ia",
    nombre: "IEEE Spectrum · AI",
    corto: "IEEE Spectrum",
    url: "https://spectrum.ieee.org/feeds/topic/artificial-intelligence.rss",
    tipo: "ia",
    idioma: "en",
    sitio: "spectrum.ieee.org",
    seccionBase: "Frontera",
    peso: 8,
  },
];

/**
 * Feeds cuya URL ya está acotada a IA: no se les exige que la nota
 * repita la palabra. SIGUE VACÍO a propósito.
 *
 * El topic feed de IA de IEEE Spectrum era el único candidato real,
 * y se probó: exento del filtro dejaba entrar notas de carrera
 * profesional ("What It Takes to Be an Adaptable Engineer") que
 * están en ese feed por sección de la revista, no por hablar de IA.
 * Pasándolo por el filtro estricto como a todos, entra lo mismo
 * menos el relleno. La Regla 3 se sostiene: TODA nota menciona IA.
 */
export const FEEDS_SOLO_IA = new Set<string>([]);

// ── Vocabulario del filtro ────────────────────────────────────
// Minúsculas y sin tildes: el clasificador normaliza antes.

/** Señales de que la nota habla de IA. */
export const TERMINOS_IA = [
  "ia", "ai", "inteligencia artificial", "artificial intelligence",
  "generativa", "generativo", "genai", "machine learning",
  "aprendizaje automatico", "llm", "chatbot", "red neuronal", "neuronal",
  "modelo de lenguaje", "algoritmo", "algoritmos", "agente", "agentes",
  "openai", "anthropic", "claude", "chatgpt", "gemini", "deepmind",
  "midjourney", "stable diffusion", "copilot", "llama", "mistral",
  "kling", "seedance", "higgsfield", "elevenlabs", "heygen", "runway",
  "nano banana", "veo", "flux", "sora", "grok", "perplexity", "deepseek",
  "deepfake", "sintetico", "sintetica", "automatizado", "automatizada",
  // Refuerzo para las fuentes en inglés ("ai" y "llm" ya cubren mucho).
  "generative", "neural", "deep learning", "diffusion", "text to video",
  "text to image", "ai-generated", "ai generated", "agentic",
];

/** Señales de a qué sección pertenece. Gana el grupo con más coincidencias. */
export const TERMINOS_SECCION: Record<Seccion, string[]> = {
  Producción: [
    "video", "videos", "imagen", "imagenes", "foto", "fotos", "fotografia",
    "visual", "edicion", "editar", "editor", "render", "animacion",
    "animar", "voz", "voces", "avatar", "camara", "cine", "cinematografia",
    "pelicula", "peliculas", "cortometraje", "corto", "videoclip",
    "sonido", "musica", "audio", "arte", "artista", "artistas",
    "ilustracion", "diseno", "disenador", "montaje", "rodaje", "guion",
    "efectos", "vfx", "capcut", "photoshop", "figma", "premiere", "3d",
    // Inglés (No Film School, PetaPixel, befores & afters).
    "film", "filmmaker", "filmmakers", "filmmaking", "footage", "camera",
    "cameras", "lens", "photo", "photos", "photography", "photographer",
    "photographers", "image", "images", "editing", "edit", "grading",
    "color grading", "post production", "cinematography", "short film",
    "animation", "animator", "visual effects", "compositing", "rendering",
    "storyboard", "lighting", "shoot", "sound", "music", "voice",
    "motion graphics", "documentary", "cut", "frame", "frames",
  ],
  // Sin relleno periodístico ("lanza", "presenta", "actualización",
  // "función", "app"): aparece en todo titular tecnológico y hacía que
  // esta sección se tragara notas que pertenecían a otra.
  Herramientas: [
    "herramienta", "herramientas", "automatizacion", "flujo de trabajo",
    "complemento", "plugin", "extension", "asistente", "codigo abierto",
    "open source", "programar", "programacion", "codigo", "api",
    "integracion", "prompt", "prompts", "terminal", "navegador",
    "buscador", "asistentes", "copiloto", "suscripcion",
    // Inglés.
    "tool", "tools", "toolkit", "workflow", "workflows", "assistant",
    "assistants", "open-source", "coding", "code", "developer",
    "developers", "integration", "browser", "cli", "sdk", "automation",
    "self-hosted", "subscription", "release notes",
  ],
  "Hecho con IA": [
    "creo", "crearon", "construyo", "construyeron", "desarrollo",
    "desarrollaron", "invento", "inventaron", "invencion", "proyecto",
    "proyectos", "prototipo", "experimento", "emprendedor", "emprendedores",
    "startup", "fundador", "fundadora", "robot", "robots", "dispositivo",
    "granja", "granjero", "agricultura", "cultivo", "cosecha", "premio",
    "premios", "festival", "concurso", "campana ganadora", "caso de exito",
    "asi lo hizo", "logro", "consiguio", "hazana", "drone", "dron",
    // Inglés. Verbos en pasado: no chocan con nada en español.
    "built", "created", "made with", "developed", "invented", "invention",
    "project", "prototype", "experiment", "founder", "founders", "maker",
    "hackathon", "award", "awards", "contest", "case study",
    "behind the scenes", "how they made",
  ],
  Negocio: [
    "publicidad", "publicitario", "publicitaria", "anuncio", "anuncios",
    "campana", "campanas", "marca", "marcas", "agencia", "agencias",
    "cliente", "clientes", "comercial", "negocio", "negocios", "empresa",
    "empresas", "marketing", "ingresos", "facturacion", "precio", "precios",
    "monetizar", "vender", "ventas", "comercio electronico", "ecommerce",
    "empleo", "empleos", "trabajo", "trabajadores", "derechos de autor",
    "demanda", "juicio", "regulacion", "normativa", "ley", "licencia",
    "creadores", "influencer", "influencers", "tiktok", "instagram",
    "youtube", "meta", "reels",
    // Inglés.
    "advertising", "advertiser", "advertisers", "ad campaign", "brand",
    "brands", "agency", "agencies", "client", "clients", "revenue",
    "pricing", "monetize", "monetization", "sales", "jobs", "workers",
    "copyright", "lawsuit", "licensing", "license", "regulation",
    "creator", "creators",
  ],
  Frontera: [
    "medico", "medica", "medicina", "clinico", "salud", "paciente",
    "pacientes", "diagnostico", "ciencia", "cientifico", "cientificos",
    "investigacion", "biologia", "proteina", "genoma", "farmaco",
    "medicamento", "vacuna", "vacunas", "cancer", "enfermedad", "cura",
    "tratamiento", "clima", "energia", "espacio", "fisica", "educacion",
    "sociedad", "medio ambiente", "descubrimiento", "transporte",
    "accesibilidad", "idioma", "traduccion", "universidad", "hospital",
    // Inglés (sobre todo IEEE Spectrum).
    "medical", "medicine", "clinical", "health", "patient", "patients",
    "diagnosis", "science", "scientist", "scientists", "research",
    "biology", "protein", "genome", "vaccine", "disease", "treatment",
    "climate", "energy", "physics", "education", "society",
    "environment", "discovery", "accessibility", "translation",
    "university", "engineering", "robotics",
  ],
};

/** La frontera del portal. Si el titular cae aquí, se descarta. */
export const VETO = [
  // Negocio de los laboratorios, no de quien usa la IA.
  "ronda de financiacion", "serie a", "serie b", "valoracion", "bolsa",
  "acciones", "inversores", "capital riesgo", "sale a bolsa", "opa",
  "funding round", "valuation", "ipo", "stock", "run rate",
  // Infraestructura.
  "chip", "chips", "gpu", "centro de datos", "semiconductor",
  "semiconductores", "data center", "nvidia",
  // Research puro sin producto.
  "paper", "arxiv", "benchmark", "leaderboard",
  // Drama corporativo y nombramientos.
  "dimite", "renuncia", "despidos", "nombramiento", "nombra a",
  "resigns", "steps down", "reorg",
  // Ciberseguridad: fuera por pedido explícito.
  "ciberseguridad", "ciberataque", "hackeo", "hackers", "estafa",
  "estafas", "fraude", "malware", "ransomware", "phishing", "virus",
  "vigilancia", "militar", "cybersecurity",
  // Promoción, afiliados y patrocinado.
  "sorteo", "sorteos", "oferta", "ofertas", "descuento", "descuentos",
  "chollo", "chollos", "cupon", "rebajas", "black friday", "cyber monday",
  "precio minimo", "aprovecha el", "suscriptores de", "codigo promocional",
  "mejor precio", "patrocinado", "en oferta",
  // Reviews de aparatos de consumo.
  "galaxy s", "iphone", "one ui", "android auto", "smartwatch",
  "auriculares", "tablet", "portatil", "smartphone", "movil mas",
  "analisis del", "probamos el",
  // Inglés: promoción, afiliados y movidas de sala de juntas.
  "giveaway", "giveaways", "sweepstakes", "discount", "discounts",
  "coupon", "affiliate", "sponsored", "best deals", "hands-on",
  "raises", "acquires", "acquisition", "shuts down", "layoffs",
];
