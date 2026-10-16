// ============================================================
// SERVICIOS — CONTENIDO DE CADA PÁGINA (/servicios/[slug])
//
// Fusión de dos fuentes (2026-10-08):
//   · "Propuesta de rediseño web" revisada con los socios (PDF del 8-oct):
//     títulos por palabra clave (doc 07 §0), líder por servicio, problema en
//     forma de pregunta, maqueta del mecanismo, qué prometemos y qué no,
//     casos reales, FAQ, servicios relacionados y pendientes por página.
//   · Oferta de Resuelto: promesa, sacrificios que desarma, velocidad,
//     3 paquetes + configurador, y el portafolio con espacios por cargar.
//
// La página se cuenta en tres actos: I · la oferta, II · la prueba,
// III · la decisión. Componente: components/ServicioDetalle.tsx.
//
// ─ REVISIÓN vs PRODUCCIÓN ────────────────────────────────────
// Lo marcado con `requiereAutorizacion` y los `pendientes` solo se ven en
// local y en las previews de Vercel. En producción no salen.
//
// ─ PIEZAS POR CARGAR ─────────────────────────────────────────
// Una pieza "pendiente" se dibuja como un cuadro de storyboard que dice qué
// producir. Cuando la tengas, cámbiala por "video" o "imagen". Para esconder
// todos los pendientes: MOSTRAR_PENDIENTES = false.
//
// ⚠️ Los paquetes y variables de los 8 servicios son una propuesta de Claude
// sobre la oferta de cada uno: la PDF no los define. Validar con los socios.
// ============================================================

export type Formato = "16/9" | "9/16" | "1/1" | "4/5";

export type Pieza =
  | { tipo: "video"; src: string; poster: string; titulo: string; detalle?: string; formato: Formato }
  | { tipo: "imagen"; src: string; titulo: string; detalle?: string; formato: Formato }
  | { tipo: "pendiente"; medio: "video" | "foto" | "captura"; titulo: string; detalle: string; formato: Formato };

export type Paquete = {
  nivel: 1 | 2 | 3;
  nombre: string;
  para: string;
  base?: string; // "Todo lo del Nivel 1, más:"
  incluye: string[];
  recomendado?: boolean;
};

export type Variable = { id: string; label: string; opciones: string[]; multiple?: boolean };

export type Lider = "manuel" | "julio" | "roberth";

// Maqueta del hero: muestra el mecanismo del servicio. Las de interfaz llevan
// el rótulo "vista de ejemplo, no datos reales"; la de medio es pieza real.
export type Mockup =
  | { tipo: "ads" | "seo" | "web" | "tienda" | "juego" | "programa" }
  | { tipo: "media"; src: string; poster: string; etiqueta: string };

export type Destacado =
  | {
      tipo: "comparar";
      label: string;
      titulo: string;
      texto: string;
      columnas: { nombre: string; cuando: string; puntos: string[] }[];
      nota?: string;
    }
  | {
      tipo: "pasos";
      label: string;
      titulo: string;
      texto: string;
      pasos: { titulo: string; texto: string; seLlevan?: string }[];
      nota?: string;
      requiereAutorizacion?: boolean;
    }
  | {
      tipo: "panel";
      label: string;
      titulo: string;
      texto: string;
      items: string[];
    };

export type Caso = {
  cliente: string;
  sector: string;
  titulo: string;
  texto: string;
  servicios: string[];
  cifras?: string[];
  href?: string; // página del caso, si existe
  poster?: string;
  nuevo?: boolean;
  requiereAutorizacion?: boolean;
};

export type DetalleServicio = {
  // Cabecera (propuesta)
  h1: string;
  h1Acento: string; // remate del H1, en el color del servicio
  bajada: string;
  pregunta: string; // el problema, como pregunta
  cierre: string; // pregunta de cierre antes del CTA final
  lidera: Lider[];
  mockup: Mockup;

  // Acto I — la oferta
  oferta: string;
  promesa: string;
  sin: { miedo: string; porque: string; como: string }[];
  velocidad: { primera: { cuando: string; que: string }; final: { cuando: string; que: string } };
  destacado?: Destacado;
  prometemos: string[];
  noPrometemos: { pregunta: string; respuesta: string };
  noEsPara: string;

  // Acto II — la prueba
  casos: Caso[];
  casoPendiente?: string;
  portafolio: Pieza[];

  // Acto III — la decisión
  paquetes: [Paquete, Paquete, Paquete];
  notaPaquetes?: string;
  variables: Variable[];
  faq: { p: string; r: string }[];
  relacionados: { titulo: string; texto: string; ids: string[] };

  pendientes: string[];
  borrador?: boolean;
};

export const MOSTRAR_PENDIENTES = true;

export const LIDERES: Record<Lider, { nombre: string; foto: string; rol: string }> = {
  manuel: { nombre: "Manuel Severo", foto: "/images/equipo/manuel.jpg", rol: "Dirección creativa y producción IA" },
  julio: { nombre: "Julio Peña", foto: "/images/equipo/julio.jpg", rol: "Dirección de arte y desarrollo" },
  roberth: { nombre: "Roberth Reyes", foto: "/images/equipo/roberth.jpg", rol: "Estrategia digital y eventos" },
};

const PENDIENTE_PAQUETES =
  "Paquetes y variables propuestos por Claude sobre la oferta del servicio: la PDF del 8-oct no los define. Validar niveles y nombres con los socios.";

export const DETALLE: Record<string, DetalleServicio> = {
  // ════════════════════════════════════════════════════════════
  // 01 · GOOGLE ADS
  // ════════════════════════════════════════════════════════════
  "google-ads": {
    h1: "Agencia de Google Ads en Lima:",
    h1Acento: "anuncios en Google para empresas",
    bajada:
      "Campañas que aparecen cuando tu cliente busca lo que vendes, medidas hasta el contacto por WhatsApp. La cuenta queda a tu nombre, la pauta se paga directo a Google y el panel lo ves cuando quieras.",
    pregunta: "¿Por qué tus anuncios en Google traen clics y no ventas?",
    cierre: "¿Inviertes en Google Ads y no sabes qué clic se volvió venta?",
    lidera: ["roberth"],
    mockup: { tipo: "ads" },
    oferta: "Google Ads medido hasta el WhatsApp",
    promesa:
      "Que sepas, contacto por contacto, qué campaña lo trajo y cuánto costó — sin pagar a ciegas y sin perder el control de tu cuenta.",
    sin: [
      {
        miedo: "Pagar clics a ciegas",
        porque: "Sin medición, se sube el presupuesto en lo que no vende y se apaga lo que sí.",
        como: "Antes de gastar un sol configuramos qué cuenta como contacto y acordamos la meta.",
      },
      {
        miedo: "Perder tu cuenta si cambias de agencia",
        porque: "Muchas agencias manejan la pauta desde cuentas propias.",
        como: "La cuenta queda a tu nombre y la pauta se paga directo a Google, con tu tarjeta.",
      },
      {
        miedo: "Recibir reportes que nadie entiende",
        porque: "Un PDF con clics e impresiones no dice qué decisión tomar.",
        como: "A fin de mes recibes la lectura y las decisiones, no solo cifras.",
      },
    ],
    velocidad: {
      primera: { cuando: "Semana 1", que: "Medición configurada, meta firmada y campañas en línea." },
      final: { cuando: "Mes 1", que: "La primera revisión de la meta, con cada contacto y su origen." },
    },
    destacado: {
      tipo: "panel",
      label: "Qué ves en tu panel",
      titulo: "Panel de Google Ads en vivo: inversión, contactos y costo por contacto",
      texto:
        "Conectado a Google Ads y Google Analytics 4: lo abres cuando quieras y ves lo mismo que nosotros. Si el gasto se dispara o Google rechaza un anuncio, salta una alerta.",
      items: [
        "Inversión, contactos y costo por contacto, al día",
        "Contactos separados por canal: WhatsApp, llamada y formulario",
        "Alertas de gasto y de anuncios rechazados",
        "Acceso desde la computadora o el celular, sin pedir un reporte",
      ],
    },
    prometemos: [
      "Una meta medible, firmada antes de empezar",
      "Cada contacto con su origen y su costo",
      "Revisión diaria las dos primeras semanas",
      "La evaluación de la meta contigo, en la fecha fijada",
    ],
    noPrometemos: {
      pregunta: "¿Una agencia de Google Ads puede asegurarte ventas?",
      respuesta:
        "No, y desconfía de quien lo prometa: las ventas dependen también de tu oferta, tu precio y tu atención. Lo que sí firmamos antes de empezar es una meta medible, y la evaluamos contigo en una fecha fijada.",
    },
    noEsPara: "Quien busca resultados garantizados o no puede atender a tiempo las consultas que lleguen.",
    casos: [],
    casoPendiente: "Aquí va el primer caso de Google Ads: una campaña real con cifras y permiso del cliente.",
    portafolio: [
      {
        tipo: "pendiente", medio: "captura", formato: "16/9",
        titulo: "Panel de campañas",
        detalle: "Captura del panel en vivo de una cuenta real: inversión, contactos y costo por contacto. Datos anonimizados.",
      },
      {
        tipo: "pendiente", medio: "captura", formato: "16/9",
        titulo: "Anuncio publicado",
        detalle: "El anuncio tal como aparece en Google para una búsqueda real del cliente.",
      },
      {
        tipo: "pendiente", medio: "captura", formato: "9/16",
        titulo: "Contacto medido",
        detalle: "El mensaje de WhatsApp que llegó desde el anuncio, con su origen registrado.",
      },
    ],
    paquetes: [
      {
        nivel: 1,
        nombre: "Arranque medido",
        para: "Una campaña de búsqueda bien medida, para empezar sin gastar a ciegas.",
        incluye: [
          "Medición de conversiones configurada antes de lanzar",
          "Una campaña de búsqueda",
          "Revisión diaria las dos primeras semanas",
          "Informe mensual con lectura y decisiones",
        ],
      },
      {
        nivel: 2,
        nombre: "Gestión completa",
        para: "Todas las campañas que tu objetivo necesite, con panel en vivo y alertas.",
        base: "Todo lo del Nivel 1, más:",
        incluye: [
          "Búsqueda, YouTube, Demand Gen o Performance Max según el objetivo",
          "Panel en vivo conectado a Google Ads y Analytics 4",
          "Alertas de gasto y de anuncios rechazados",
          "Ciclo semanal de optimización",
          "Revisión mensual de la meta contigo",
        ],
        recomendado: true,
      },
      {
        nivel: 3,
        nombre: "A medida",
        para: "Varias marcas, tienda online o integración con tu CRM.",
        base: "Sobre la Gestión completa:",
        incluye: [
          "Varias cuentas o líneas de negocio",
          "Campañas de Shopping para tienda virtual",
          "Integración de contactos con tu CRM",
          "Página de destino diseñada por nuestro equipo",
        ],
      },
    ],
    variables: [
      { id: "pauta", label: "Inversión mensual en pauta", opciones: ["Hasta S/ 3,000", "S/ 3,000 a 10,000", "Más de S/ 10,000"] },
      { id: "campanas", label: "Tipos de campaña", multiple: true, opciones: ["Búsqueda", "YouTube", "Performance Max", "Demand Gen"] },
      { id: "medicion", label: "Medición actual", opciones: ["No tengo", "Tengo algo", "Está completa"] },
      { id: "destino", label: "Página de destino", opciones: ["Ya la tengo", "Necesito una"] },
    ],
    faq: [
      {
        p: "¿Cuánto cuesta gestionar Google Ads?",
        r: "Son dos costos separados. La pauta se paga directo a Google, desde tu cuenta y con tu tarjeta. Nuestro honorario de gestión se cotiza según la inversión mensual, el número de campañas y la medición que haga falta configurar. En la primera llamada revisamos tu caso y te enviamos una propuesta cerrada.",
      },
      {
        p: "¿Pueden asegurarme resultados?",
        r: "No, y desconfía de quien lo haga. Las ventas dependen también de tu oferta, tu precio y tu atención. Lo que sí firmamos antes de empezar es una meta medible, y la evaluamos contigo en una fecha fijada.",
      },
      {
        p: "¿La cuenta de Google Ads queda a mi nombre?",
        r: "Sí. La cuenta es de tu empresa y la pauta se paga directo a Google con tu tarjeta. Si un día dejas de trabajar con nosotros, la cuenta, su historial y su medición se quedan contigo.",
      },
      {
        p: "¿Cuánto demoran los resultados de los anuncios en Google?",
        r: "Las campañas de búsqueda empiezan a mostrarse desde que se publican. Las dos primeras semanas son de ajuste diario, y la meta se evalúa en la fecha que acordamos contigo antes de empezar.",
      },
      {
        p: "¿Qué miden como resultado?",
        r: "Contactos, no clics: mensajes a WhatsApp, llamadas y formularios enviados desde el anuncio, cada uno con la campaña y la búsqueda que lo trajo.",
      },
      {
        p: "¿Qué tipo de campañas manejan?",
        r: "Búsqueda y, según tu objetivo, YouTube, Demand Gen y Performance Max.",
      },
    ],
    relacionados: {
      titulo: "Google Ads rinde lo que rinde tu página: servicios que lo completan",
      texto:
        "Un anuncio bien medido no salva una web que no convence. Por eso suele ir con una página web que convierte y con posicionamiento SEO, para depender menos de pagar cada visita.",
      ids: ["diseno-paginas-web", "posicionamiento-seo"],
    },
    pendientes: [
      "Caso real con cifras y permiso del cliente. Propuesta: la campaña propia de Resuelto (doc 03) cuando tenga datos.",
      "Confirmar que se ofrecerá panel en vivo (Looker Studio) y alertas de gasto, y quién las revisa a diario.",
      "Credenciales verificables de Roberth (certificación Google Ads, insignia Partner): solo con comprobante.",
      "Definir si habrá cláusula de desempeño con reembolso. Si se publica, debe estar escrita y visible (política de Google Ads).",
      "Medición del doc 02 implementada antes de lanzar cualquier campaña.",
      PENDIENTE_PAQUETES,
    ],
  },

  // ════════════════════════════════════════════════════════════
  // 02 · POSICIONAMIENTO SEO
  // ════════════════════════════════════════════════════════════
  "posicionamiento-seo": {
    borrador: true,
    h1: "Agencia SEO en Lima:",
    h1Acento: "posicionamiento SEO para empresas",
    bajada:
      "Trabajamos las búsquedas que hace tu cliente antes de comprar y el estado técnico de tu web, para que Google te muestre y cada visita tenga un camino al contacto.",
    pregunta: "¿Por qué tu empresa no aparece en Google cuando te buscan?",
    cierre: "¿Tu competencia aparece en Google y tú no?",
    lidera: ["roberth"],
    mockup: { tipo: "seo" },
    oferta: "Posicionamiento para conseguir clientes, no solo visitas",
    promesa:
      "Que aparezcas en las búsquedas que hace tu cliente antes de comprar y que esas visitas terminen en contactos — sin depender de pagar cada clic.",
    sin: [
      {
        miedo: "Pagar cada visita para siempre",
        porque: "La pauta trae consultas mientras pagas; cuando paras, se acaban.",
        como: "El SEO construye visitas que llegan sin pagar cada clic.",
      },
      {
        miedo: "Contar visitas que no escriben",
        porque: "Mucho tráfico de búsquedas sin intención de compra no vende nada.",
        como: "Elegimos búsquedas con intención de compra y medimos cuántas visitas escriben.",
      },
      {
        miedo: "Rehacer la web sin necesidad",
        porque: "Tirar un sitio que funciona cuesta más de lo que arregla.",
        como: "El diagnóstico dice qué se corrige y qué de verdad hay que rehacer.",
      },
    ],
    velocidad: {
      primera: { cuando: "Mes 1", que: "La web corregida y el mapa de búsquedas asignado a cada página." },
      final: { cuando: "Mes 3 a 6", que: "Tráfico relevante desde Google, según tu competencia y tu dominio." },
    },
    destacado: {
      tipo: "comparar",
      label: "SEO o pauta",
      titulo: "¿SEO o Google Ads? Qué le conviene a tu empresa",
      texto: "No compiten: hacen trabajos distintos en tiempos distintos.",
      columnas: [
        {
          nombre: "Google Ads",
          cuando: "Capta la demanda de hoy",
          puntos: ["Consultas desde la primera semana", "Pagas cada clic", "Se apaga cuando paras la pauta"],
        },
        {
          nombre: "Posicionamiento SEO",
          cuando: "Construye la demanda de mañana",
          puntos: ["Tarda de tres a seis meses en mostrar tráfico relevante", "No pagas cada visita", "Lo ganado se mantiene con trabajo mensual"],
        },
      ],
      nota: "La mayoría de empresas necesita las dos: la pauta capta la demanda de hoy mientras el SEO construye la de mañana.",
    },
    prometemos: [
      "Un diagnóstico técnico y un mapa de búsquedas por escrito",
      "Cada búsqueda importante asignada a una página",
      "Medición de qué visitas terminan en contacto",
      "Un reporte mensual de qué sube y qué ajustamos",
    ],
    noPrometemos: {
      pregunta: "¿Una agencia SEO te puede asegurar el primer lugar en Google?",
      respuesta:
        "No. Nadie controla el algoritmo de Google, y quien te asegura el primer lugar te está vendiendo humo. Lo que sí prometemos es el trabajo técnico y de contenido, medido mes a mes en Search Console.",
    },
    noEsPara: "Quien necesita consultas este mes y no puede esperar: para eso, Google Ads.",
    casos: [],
    casoPendiente: "Aquí va el primer caso de posicionamiento SEO: datos de Search Console con permiso del cliente.",
    portafolio: [
      {
        tipo: "pendiente", medio: "captura", formato: "16/9",
        titulo: "Búsquedas que suben",
        detalle: "Captura de Search Console con la evolución de impresiones y clics de un sitio trabajado.",
      },
      {
        tipo: "pendiente", medio: "captura", formato: "1/1",
        titulo: "Antes y después",
        detalle: "La posición de una búsqueda clave antes y después de la optimización.",
      },
      {
        tipo: "pendiente", medio: "captura", formato: "16/9",
        titulo: "Auditoría técnica",
        detalle: "Una página del diagnóstico entregado: errores encontrados y prioridad de cada uno.",
      },
    ],
    paquetes: [
      {
        nivel: 1,
        nombre: "Diagnóstico SEO",
        para: "Saber qué frena a tu web y qué búsquedas te conviene trabajar.",
        incluye: [
          "Auditoría técnica de tu web",
          "Mapa de las búsquedas que traen clientes en tu sector",
          "Plan priorizado: qué se corrige y en qué orden",
          "Reunión de lectura del diagnóstico",
        ],
      },
      {
        nivel: 2,
        nombre: "Posicionamiento mensual",
        para: "El diagnóstico ejecutado y trabajado mes a mes.",
        base: "Todo lo del Nivel 1, más:",
        incluye: [
          "Correcciones técnicas: velocidad, estructura, títulos y datos estructurados",
          "Páginas o contenidos que falten para cada búsqueda",
          "Medición de visitas que terminan en contacto",
          "Seguimiento mensual en Search Console y Analytics",
        ],
        recomendado: true,
      },
      {
        nivel: 3,
        nombre: "A medida",
        para: "Catálogos grandes, varias sedes o varios países.",
        base: "Sobre el Posicionamiento mensual:",
        incluye: [
          "SEO para tiendas virtuales y catálogos grandes",
          "SEO local para varias sedes",
          "Sitios en más de un idioma o país",
          "Ritmo de contenido intensivo",
        ],
      },
    ],
    variables: [
      { id: "web", label: "Tu web hoy", opciones: ["Tengo web", "No tengo web"] },
      { id: "paginas", label: "Páginas a trabajar", opciones: ["Hasta 10", "11 a 50", "Más de 50"] },
      { id: "alcance", label: "Alcance", opciones: ["Lima", "Todo el Perú", "Varios países"] },
      { id: "contenido", label: "Ritmo de contenido", opciones: ["Bajo", "Medio", "Alto"] },
    ],
    faq: [
      {
        p: "¿Cuánto tarda el posicionamiento SEO?",
        r: "En un dominio con poca autoridad, el SEO suele tardar de tres a seis meses en mostrar tráfico relevante. Depende de tu competencia y del estado de tu web. Si necesitas consultas antes, Google Ads puede traerlas desde la primera semana mientras el SEO crece.",
      },
      {
        p: "¿Una agencia SEO me puede asegurar el primer lugar en Google?",
        r: "No. Nadie controla el algoritmo de Google. Lo que sí podemos asegurar es el trabajo técnico y de contenido, y medirlo cada mes.",
      },
      {
        p: "¿Qué diferencia hay entre SEO y Google Ads?",
        r: "Google Ads trae consultas desde la primera semana y pagas cada clic. El SEO tarda meses, pero las visitas que gana llegan sin pagar cada una. La mayoría de empresas usa las dos.",
      },
      {
        p: "¿Necesito una web nueva para hacer SEO?",
        r: "No necesariamente. El diagnóstico dice si tu web actual se puede corregir o si conviene rehacerla, y por qué.",
      },
      {
        p: "¿Cómo sé si el SEO está funcionando?",
        r: "Cada mes ves en Search Console y Analytics qué búsquedas suben, cuántas visitas llegan desde Google y cuántas terminan en un contacto.",
      },
    ],
    relacionados: {
      titulo: "Servicios que se combinan con el posicionamiento SEO",
      texto:
        "El SEO necesita una web que Google pueda leer y que convenza a quien llega. Y mientras crece, Google Ads trae las consultas del mes.",
      ids: ["diseno-paginas-web", "google-ads"],
    },
    pendientes: [
      "Página nueva: el SEO se separó de Google Ads el 8-oct. Validar el alcance real (qué entregables se dan cada mes) y quién lo lidera.",
      "Caso con datos de Search Console y permiso del cliente. Alternativa: el propio sitio de Resuelto cuando tenga línea base.",
      PENDIENTE_PAQUETES,
    ],
  },

  // ════════════════════════════════════════════════════════════
  // 03 · DISEÑO DE PÁGINAS WEB
  // ════════════════════════════════════════════════════════════
  "diseno-paginas-web": {
    h1: "Diseño de páginas web",
    h1Acento: "en Lima para empresas",
    bajada:
      "Landings y webs corporativas con estándar visual de agencia, listas para posicionar desde el código y medidas para que sepas qué visita terminó en contacto.",
    pregunta: "¿Por qué tu página web no te trae clientes?",
    cierre: "¿Tu web existe y nadie te escribe?",
    lidera: ["julio"],
    mockup: { tipo: "web" },
    oferta: "Una página web para vender, no un folleto en línea",
    promesa:
      "Que quien busca lo que ofreces te encuentre, entienda qué haces en segundos y te escriba — sin pagar hosting por un folleto que nadie mide.",
    sin: [
      {
        miedo: "Pagar por un folleto en línea",
        porque: "Una web que no trae contactos es un gasto fijo que nadie mide.",
        como: "Medimos la web por los contactos que genera, no por cómo se ve.",
      },
      {
        miedo: "Parchar el SEO después de publicar",
        porque: "Lo que no se pensó en el código cuesta el doble corregirlo después.",
        como: "El posicionamiento y la medición se deciden en la estrategia, antes de construir.",
      },
      {
        miedo: "Un proyecto sin fecha de entrega",
        porque: "Los proyectos web sin cronograma se estiran meses.",
        como: "Antes de empezar recibes el cronograma por fechas.",
      },
    ],
    velocidad: {
      primera: { cuando: "Semana 1", que: "Estrategia aprobada: tipo de sitio, contenido y palabras clave." },
      final: { cuando: "Al lanzar", que: "El sitio publicado, con cada contacto medido desde el primer día." },
    },
    destacado: {
      tipo: "comparar",
      label: "Tipos de página web",
      titulo: "¿Landing, web corporativa o tienda virtual? Qué página web necesita tu empresa",
      texto: "Depende de dónde viene tu cliente y de cómo compra. Estas son las tres opciones y cuándo conviene cada una.",
      columnas: [
        {
          nombre: "Landing page",
          cuando: "Una campaña o un servicio",
          puntos: ["Una sola página con un solo objetivo", "Ideal para recibir tráfico de anuncios", "Se publica más rápido"],
        },
        {
          nombre: "Web corporativa",
          cuando: "Tu empresa completa",
          puntos: ["Servicios, casos, equipo y contacto", "Una página por servicio para posicionar", "La base de tu presencia en Google"],
        },
        {
          nombre: "Tienda virtual",
          cuando: "Vender productos en línea",
          puntos: ["Una ficha por producto", "Pago en línea o cotización por WhatsApp", "Cada pedido medido"],
        },
      ],
    },
    prometemos: [
      "El cronograma por fechas antes de empezar",
      "SEO técnico y on-page resuelto desde el desarrollo",
      "La medición de contactos configurada antes de publicar",
      "La puntuación de velocidad medida en cada entrega",
    ],
    noPrometemos: {
      pregunta: "¿Una web nueva te asegura salir primero en Google?",
      respuesta:
        "No. Dejamos resuelto lo técnico desde el desarrollo, pero salir bien posicionado depende además de tu competencia y de tu contenido, y suele tardar meses. Por eso puedes sumar Google Ads para captar consultas desde las primeras semanas.",
    },
    noEsPara: "Quien necesita una web solo para tenerla, sin intención de que traiga clientes.",
    casos: [],
    casoPendiente: "Aquí va el primer caso de diseño de páginas web, con enlace al sitio en vivo.",
    portafolio: [
      {
        tipo: "pendiente", medio: "captura", formato: "16/9",
        titulo: "Sitio corporativo · escritorio",
        detalle: "Captura completa de la portada de un sitio publicado, con su enlace en vivo.",
      },
      {
        tipo: "pendiente", medio: "video", formato: "9/16",
        titulo: "Vista en celular",
        detalle: "Grabación de pantalla de 10 segundos haciendo scroll por el mismo sitio.",
      },
      {
        tipo: "pendiente", medio: "video", formato: "16/9",
        titulo: "Recorrido del sitio",
        detalle: "Grabación de 20 a 30 segundos navegando de la portada al contacto.",
      },
      {
        tipo: "pendiente", medio: "captura", formato: "1/1",
        titulo: "Velocidad medida",
        detalle: "La puntuación de PageSpeed del sitio publicado, en celular.",
      },
    ],
    paquetes: [
      {
        nivel: 1,
        nombre: "Landing page",
        para: "Una página para una campaña o un servicio, lista para recibir anuncios.",
        incluye: [
          "Una página con un solo objetivo",
          "Textos orientados a conversión",
          "Contacto por WhatsApp y formulario",
          "SEO técnico de base y medición de contactos",
        ],
      },
      {
        nivel: 2,
        nombre: "Web corporativa",
        para: "Tu empresa completa, con una página por servicio lista para posicionar.",
        base: "Todo lo del Nivel 1, más:",
        incluye: [
          "Estrategia: arquitectura de contenido y palabras clave",
          "Servicios, casos, equipo y contacto",
          "Una página por servicio preparada para su búsqueda",
          "Cronograma por fechas y ajustes con datos reales tras el lanzamiento",
        ],
        recomendado: true,
      },
      {
        nivel: 3,
        nombre: "A medida",
        para: "Web y tienda en un mismo sitio, varios idiomas o integraciones.",
        base: "Sobre la Web corporativa:",
        incluye: [
          "Tienda virtual o catálogo dentro del mismo sitio",
          "Sitio en más de un idioma",
          "Integración con CRM, reservas o sistemas propios",
          "Varias marcas o sitios",
        ],
      },
    ],
    variables: [
      { id: "tipo", label: "Tipo de sitio", opciones: ["Landing", "Web corporativa"] },
      { id: "secciones", label: "Secciones", opciones: ["Hasta 5", "6 a 10", "Más de 10"] },
      { id: "contenido", label: "Contenido", multiple: true, opciones: ["Ya lo tengo", "Necesito redacción", "Necesito fotos o video"] },
      { id: "integraciones", label: "Integraciones", multiple: true, opciones: ["CRM", "Reservas", "WhatsApp Business"] },
      { id: "idioma", label: "Idiomas", opciones: ["Español", "Español + inglés"] },
    ],
    faq: [
      {
        p: "¿Mi página web va a salir en Google?",
        r: "Dejamos resuelto el SEO técnico y on-page desde el desarrollo: velocidad, estructura, títulos y datos estructurados. Salir bien posicionado depende además de tu competencia y de tu contenido, y suele tardar meses. Por eso puedes sumar campañas de Google Ads para captar consultas desde las primeras semanas.",
      },
      {
        p: "¿Cuánto demora el diseño de una página web?",
        r: "Depende del tipo de sitio y de cuánto contenido haya que producir. Antes de empezar recibes un cronograma con las fechas de cada etapa.",
      },
      {
        p: "¿Qué diferencia hay entre una landing page y una web corporativa?",
        r: "Una landing es una sola página con un solo objetivo, ideal para una campaña. Una web corporativa presenta tu empresa completa, con una página por servicio que puede posicionarse en Google.",
      },
      {
        p: "¿También hacen tiendas virtuales?",
        r: "Sí. Tienen su propio servicio, con fichas de producto, pago en línea o cotización por WhatsApp.",
      },
      {
        p: "¿Con qué tecnología hacen las páginas web?",
        r: "Next.js, Tailwind CSS y Vercel, con Google Search Console y Google Analytics 4 para la medición.",
      },
    ],
    relacionados: {
      titulo: "Servicios que hacen rendir tu página web",
      texto:
        "Una web sin tráfico es un local sin vitrina a la calle. Google Ads trae visitas desde la primera semana y el posicionamiento SEO las hace crecer sin pagar cada clic.",
      ids: ["google-ads", "posicionamiento-seo"],
    },
    pendientes: [
      "Casos de web con enlace en vivo (Julio): Grimm Store y Kalimbo están en /sobre-mi, falta confirmar que se muestran como caso.",
      "Plazos reales por tipo de proyecto (landing, corporativa). El texto no promete días.",
      "Definir a nombre de quién quedan dominio y hosting, y decirlo en la página si es a nombre del cliente.",
      "\"Carga en menos de dos segundos en celular\" se retiró como promesa: medirlo con PageSpeed en cada entrega antes de publicarlo.",
      PENDIENTE_PAQUETES,
    ],
  },

  // ════════════════════════════════════════════════════════════
  // 04 · TIENDA VIRTUAL Y ECOMMERCE
  // ════════════════════════════════════════════════════════════
  "tienda-virtual": {
    borrador: true,
    h1: "Tienda virtual para tu empresa:",
    h1Acento: "ecommerce y catálogo online en Lima",
    bajada:
      "Una ficha por producto, filtros por categoría y la forma de cerrar la venta que le sirve a tu negocio: pago en línea o cotización por WhatsApp con el producto ya elegido.",
    pregunta: "¿Vendes por WhatsApp e Instagram y todavía no tienes tienda virtual?",
    cierre: "¿Vendes por chat y quieres tu propia tienda virtual?",
    lidera: ["julio"],
    mockup: { tipo: "tienda" },
    oferta: "Una tienda virtual que vende a cualquier hora",
    promesa:
      "Que tu catálogo completo esté en línea, que Google encuentre tus productos y que cada pedido o consulta llegue con todo lo necesario para cerrar — sin depender de contestar a tiempo cada chat.",
    sin: [
      {
        miedo: "Mandar fotos por chat una por una",
        porque: "Cada venta depende de que alguien conteste a tiempo y mande la foto correcta.",
        como: "Cada producto tiene su página con fotos, especificaciones y ficha técnica.",
      },
      {
        miedo: "Que tu cliente sea del marketplace",
        porque: "En un marketplace la marca, los datos y la relación son del marketplace.",
        como: "Tu tienda es tuya, y puede convivir con tus marketplaces.",
      },
      {
        miedo: "No saber qué consulta terminó en venta",
        porque: "Sin medición no sabes qué producto o qué campaña vende.",
        como: "Cada pedido y cada consulta quedan medidos hasta su origen.",
      },
    ],
    velocidad: {
      primera: { cuando: "Semana 1", que: "El catálogo ordenado: categorías, filtros y cómo se cobra." },
      final: { cuando: "Al lanzar", que: "La tienda publicada, con ventas y consultas medidas desde el primer día." },
    },
    destacado: {
      tipo: "comparar",
      label: "Tienda o catálogo",
      titulo: "¿Tienda virtual con pago en línea o catálogo online con WhatsApp?",
      texto: "La diferencia está en cómo se cierra la venta. Pueden convivir en el mismo sitio.",
      columnas: [
        {
          nombre: "Tienda con pago en línea",
          cuando: "Volumen y compra repetida",
          puntos: ["Carrito y pasarela de pago", "El cliente compra solo, a cualquier hora", "Conviene con ticket bajo o medio"],
        },
        {
          nombre: "Catálogo con WhatsApp",
          cuando: "Ticket alto o asesoría",
          puntos: ["Fichas con fotos y especificaciones", "Botón de cotizar con el producto ya elegido", "El cierre ocurre en la conversación"],
        },
      ],
    },
    prometemos: [
      "Una ficha por producto preparada para Google",
      "La forma de cobrar decidida antes de diseñar",
      "Ventas y consultas medidas desde el lanzamiento",
      "El cronograma por fechas antes de empezar",
    ],
    noPrometemos: {
      pregunta: "¿Una tienda virtual vende sola desde el primer día?",
      respuesta:
        "No. Una tienda sin visitas no vende. La dejamos lista para posicionar y medida, pero las visitas llegan con Google Ads o con SEO, y eso conviene planificarlo desde el inicio.",
    },
    noEsPara: "Quien busca vender como consumidor por catálogo de otra marca: esto es para empresas con productos propios.",
    casos: [],
    casoPendiente: "Aquí va el primer caso de tienda virtual, o una demo navegable.",
    portafolio: [
      {
        tipo: "pendiente", medio: "captura", formato: "16/9",
        titulo: "Ficha de producto",
        detalle: "Captura de una ficha real: fotos, especificaciones, precio y botón de compra o cotización.",
      },
      {
        tipo: "pendiente", medio: "video", formato: "9/16",
        titulo: "Compra en el celular",
        detalle: "Grabación de pantalla de 15 segundos: elegir un producto y llegar al pago o al WhatsApp.",
      },
      {
        tipo: "pendiente", medio: "captura", formato: "9/16",
        titulo: "Cotización recibida",
        detalle: "El mensaje de WhatsApp que llega con el producto ya elegido.",
      },
      {
        tipo: "pendiente", medio: "captura", formato: "16/9",
        titulo: "Catálogo con filtros",
        detalle: "La vista de una categoría con sus filtros funcionando.",
      },
    ],
    paquetes: [
      {
        nivel: 1,
        nombre: "Catálogo con WhatsApp",
        para: "Tu catálogo en línea, con el cierre en la conversación.",
        incluye: [
          "Estructura de categorías y filtros",
          "Una ficha por producto con fotos y especificaciones",
          "Botón de cotización por WhatsApp con el producto preseleccionado",
          "Medición de consultas",
        ],
      },
      {
        nivel: 2,
        nombre: "Tienda virtual",
        para: "Venta completa en línea: carrito, pago y cada pedido medido.",
        base: "Todo lo del Nivel 1, más:",
        incluye: [
          "Carrito y pasarela de pago",
          "Ficha técnica descargable por producto",
          "Cada producto preparado para su búsqueda en Google",
          "Medición de ventas y consultas",
          "Ajustes con datos reales tras el lanzamiento",
        ],
        recomendado: true,
      },
      {
        nivel: 3,
        nombre: "A medida",
        para: "Catálogos grandes, venta B2B o integración con tus sistemas.",
        base: "Sobre la Tienda virtual:",
        incluye: [
          "Catálogo grande con carga masiva de productos",
          "Integración con inventario o facturación",
          "Venta B2B con condiciones por cliente",
          "Publicación coordinada con tus marketplaces",
        ],
      },
    ],
    variables: [
      { id: "cierre", label: "Cómo se cierra la venta", opciones: ["Cotización por WhatsApp", "Pago en línea", "Ambas"] },
      { id: "productos", label: "Productos", opciones: ["Hasta 50", "51 a 300", "Más de 300"] },
      { id: "ficha", label: "Ficha técnica descargable", opciones: ["No", "Sí"] },
      { id: "integraciones", label: "Integraciones", multiple: true, opciones: ["Inventario", "Facturación", "CRM"] },
    ],
    faq: [
      {
        p: "¿Qué diferencia hay entre una tienda virtual y un catálogo online?",
        r: "La tienda suma carrito y pago en línea, y conviene para volumen y compra repetida. El catálogo muestra tus productos con fotos y especificaciones, y el cierre ocurre por WhatsApp o llamada: conviene cuando el ticket es alto o el cliente necesita asesoría. Pueden convivir en el mismo sitio.",
      },
      {
        p: "¿Cómo funciona la cotización por WhatsApp?",
        r: "Cada ficha tiene un botón que abre WhatsApp con un mensaje que ya incluye el producto elegido. Tu equipo recibe la consulta con todo lo necesario para responder.",
      },
      {
        p: "¿Puedo cobrar en línea con tarjeta?",
        r: "Sí, con carrito y pasarela de pago. Qué pasarela conviene se define en la propuesta según tu negocio.",
      },
      {
        p: "¿Mis productos van a aparecer en Google?",
        r: "Cada producto tiene su propia página preparada para la búsqueda que le corresponde. Aparecer bien posicionado depende además de tu competencia, y suele tardar meses.",
      },
      {
        p: "¿Por qué una tienda propia y no solo un marketplace?",
        r: "En el marketplace la marca, los datos y la relación con el cliente son del marketplace. En tu tienda son tuyos. No es una u otra: pueden convivir.",
      },
    ],
    relacionados: {
      titulo: "Servicios que llevan clientes a tu tienda virtual",
      texto:
        "Una tienda sin visitas no vende. Google Ads lleva a quien ya busca tu producto, y el SEO hace crecer las visitas sin pagar cada clic.",
      ids: ["google-ads", "posicionamiento-seo"],
    },
    pendientes: [
      "Página nueva (8-oct): reemplaza a \"catálogo digital\", porque esa búsqueda la hacen consumidores (Yanbal, Natura). Público: empresas que quieren su propia web para vender.",
      "Caso o demo navegable de una tienda. Confirmar con Julio si Grimm Store (en /sobre-mi) es una tienda hecha por el equipo y se puede mostrar.",
      "Confirmar con Julio qué pasarelas de pago se integran y si el cliente administra productos y precios por su cuenta.",
      "Definir a nombre de quién quedan dominio y hosting.",
      PENDIENTE_PAQUETES,
    ],
  },

  // ════════════════════════════════════════════════════════════
  // 05 · SPOT PUBLICITARIO CON IA
  // ════════════════════════════════════════════════════════════
  "spot-publicitario-ia": {
    h1: "Spot publicitario con IA:",
    h1Acento: "productora audiovisual en Lima",
    bajada:
      "Spots con acabado de cine y el contenido del mes que los acompaña, sin set ni rodaje. Dirigidos plano por plano y entregados en semanas.",
    pregunta: "¿Por qué un spot publicitario tradicional cuesta tanto y tarda meses?",
    cierre: "¿Vendes lo mismo que tu competencia y no se nota la diferencia?",
    lidera: ["manuel", "julio"],
    mockup: { tipo: "media", src: "/videos/comercial-04.mp4", poster: "/images/portfolio/posters/comercial-04.jpg", etiqueta: "Comercial IA · WIN Internet" },
    oferta: "Spots dirigidos plano por plano, no generados al azar",
    promesa:
      "Que tu marca se vea a la altura de lo que cobras, con un spot que nadie más tiene y el contenido del mes con la misma línea visual — sin rodaje, sin locación y sin esperar meses.",
    sin: [
      {
        miedo: "Pagar un rodaje de cinco cifras",
        porque: "Casting, locación, equipo y postproducción antes de ver una sola toma.",
        como: "Sin rodaje, sin set, sin cast: se dirige y se genera plano por plano.",
      },
      {
        miedo: "Que se note hecho con IA",
        porque: "Los clips sueltos generados al azar se ven genéricos.",
        como: "Nada se genera hasta que la pieza está resuelta en papel: guion, storyboard y shot list.",
      },
      {
        miedo: "Un spot sin contenido que lo acompañe",
        porque: "El presupuesto se va en la pieza ancla y el resto del mes no hay nada.",
        como: "El contenido mensual sale de la misma línea visual del spot.",
      },
    ],
    velocidad: {
      primera: { cuando: "Semana 1", que: "Guion, storyboard y look aprobados: la pieza resuelta en papel." },
      final: { cuando: "Semanas, no meses", que: "El spot terminado y exportado para cada canal." },
    },
    prometemos: [
      "Guion, storyboard y shot list aprobados antes de generar",
      "Consistencia de personaje en todos los planos",
      "El spot en los formatos que pide cada canal",
      "Declarar siempre qué es generado",
    ],
    noPrometemos: {
      pregunta: "¿Un video hecho con IA siempre se ve como un comercial?",
      respuesta:
        "No. Lo que define si se nota o no que es IA es la dirección. Sin guion, storyboard y criterio de color y sonido, la IA produce clips genéricos. Esa parte no la automatizamos.",
    },
    noEsPara: "Quien busca solo volumen de publicaciones para redes, sin una idea detrás.",
    casos: [
      {
        cliente: "WIN Internet",
        sector: "Telecomunicaciones",
        titulo: "Más de tres años de comunicación digital",
        texto: "Gestión integral de contenido con consistencia editorial y la campaña de Fibrín para el Mundial.",
        servicios: ["Spot publicitario con IA"],
        cifras: ["+2.5M vistas orgánicas en TikTok por año", "+99 piezas con consistencia editorial", "+3 años de gestión integral"],
        href: "/casos/win-internet",
        poster: "/images/portfolio/posters/comercial-04.jpg",
      },
      {
        cliente: "Livoltek",
        sector: "Energía solar / B2B",
        titulo: "Video caso y cobertura en ExpoSolar 2025",
        texto: "Con IA para explicar lo técnico: cómo encajan inversor, batería y medidor en un mismo sistema.",
        servicios: ["Spot publicitario con IA", "Eventos corporativos y ferias"],
        href: "/casos/livoltek",
        poster: "/images/portfolio/posters/trad-comerciales-02.jpg",
      },
      {
        cliente: "Wellmax",
        sector: "Retail / iluminación LED",
        titulo: "Sistema de producción 100% IA",
        texto: "Para una marca de iluminación con un catálogo amplio de productos.",
        servicios: ["Spot publicitario con IA"],
        href: "/casos/wellmax",
      },
    ],
    portafolio: [
      { tipo: "video", src: "/videos/comercial-04.mp4", poster: "/images/portfolio/posters/comercial-04.jpg", titulo: "Comercial IA", detalle: "WIN Internet · La Copa Mundial", formato: "16/9" },
      { tipo: "video", src: "/videos/producto-03.mp4", poster: "/images/portfolio/posters/producto-03.jpg", titulo: "Video de producto", formato: "9/16" },
      { tipo: "video", src: "/videos/comercial-11.mp4", poster: "/images/portfolio/posters/comercial-11.jpg", titulo: "Comercial IA", detalle: "Industrial · lo que no se puede filmar", formato: "16/9" },
      { tipo: "video", src: "/videos/comercial-07.mp4", poster: "/images/portfolio/posters/comercial-07.jpg", titulo: "Comercial IA", detalle: "WIN Internet", formato: "16/9" },
      { tipo: "video", src: "/videos/story-01.mp4", poster: "/images/portfolio/posters/story-01.jpg", titulo: "Contenido de marca", formato: "9/16" },
      {
        tipo: "pendiente", medio: "video", formato: "16/9",
        titulo: "Pieza propia de Wellmax",
        detalle: "Un video o foto de producto de Wellmax para su caso. Hoy el caso no tiene pieza propia.",
      },
      { tipo: "video", src: "/videos/comercial-01.mp4", poster: "/images/portfolio/posters/comercial-01.jpg", titulo: "Comercial IA", formato: "16/9" },
    ],
    paquetes: [
      {
        nivel: 1,
        nombre: "Spot",
        para: "Un spot dirigido plano por plano, listo para cada canal.",
        incluye: [
          "Concepto, guion, storyboard y shot list",
          "Generación plano por plano con consistencia de personaje",
          "Edición, color, diseño sonoro y música",
          "Versiones por formato: TV, YouTube, Meta y vertical",
        ],
      },
      {
        nivel: 2,
        nombre: "Spot + contenido del mes",
        para: "El spot y el contenido que lo sostiene, con la misma línea visual.",
        base: "Todo lo del Nivel 1, más:",
        incluye: [
          "Contenido mensual: videos, carruseles e imágenes de marca",
          "Grilla del mes con objetivo por pieza",
          "Locución y subtítulos en cada pieza",
          "Rondas de revisión antes de cada entrega",
        ],
        recomendado: true,
      },
      {
        nivel: 3,
        nombre: "A medida",
        para: "Campañas completas, personajes recurrentes o material de venta industrial.",
        base: "Sobre el Spot + contenido:",
        incluye: [
          "Varios spots en una misma campaña",
          "Personajes propios que se repiten pieza a pieza",
          "Caso de aplicación técnico para venta industrial",
          "Versiones en inglés para casa matriz o fabricante",
        ],
      },
    ],
    variables: [
      { id: "duracion", label: "Duración del spot", opciones: ["15 s", "30 s", "60 s o más"] },
      { id: "personajes", label: "Personajes", opciones: ["Sin personajes", "Uno", "Varios"] },
      { id: "dialogo", label: "Diálogo con sincronía labial", opciones: ["No", "Sí"] },
      { id: "locucion", label: "Locución", opciones: ["Voz IA", "Locutor profesional"] },
      { id: "musica", label: "Música", opciones: ["De banco", "Original"] },
      { id: "contenido", label: "Contenido mensual", opciones: ["No", "Sí"] },
    ],
    faq: [
      {
        p: "¿Un spot publicitario hecho con IA se puede pasar en televisión?",
        r: "Producimos con acabado de comercial: guion, storyboard, consistencia de personaje, color, sonido y locución. Entregamos el spot en los formatos que pide cada canal: TV, YouTube, Meta y sala de ventas. Lo que define si se nota o no que es IA es la dirección, y esa es la parte que no automatizamos.",
      },
      {
        p: "¿La IA no produce videos publicitarios genéricos?",
        r: "Los produce cuando no hay dirección. Por eso nada se genera hasta que la pieza está resuelta en papel, y cada plano se itera hasta que es consistente con el resto.",
      },
      {
        p: "¿Cuánto demora producir un spot con IA?",
        r: "Semanas, no meses: no hay rodaje, locación ni agenda de cast. El plazo exacto depende de la duración y de la complejidad, y va con fechas en la propuesta.",
      },
      {
        p: "¿Qué herramientas de IA usan?",
        r: "Higgsfield, Kling 3.0, Seedance 2.0, Nano Banana Pro, ElevenLabs, HeyGen y Suno para generar, y CapCut Pro y DaVinci Resolve para el acabado.",
      },
      {
        p: "¿Sirve para empresas técnicas o industriales?",
        r: "Sí, y ahí es donde más rinde: lo que no se puede filmar —el interior de un equipo, un corte técnico, la escala real de una obra— se genera. Livoltek es un caso.",
      },
    ],
    relacionados: {
      titulo: "Servicios que se combinan con tu spot publicitario",
      texto:
        "El spot rinde más cuando tiene dónde mostrarse: en la pantalla de tu stand durante una feria o en campañas de video con Google Ads.",
      ids: ["eventos-corporativos", "google-ads"],
    },
    pendientes: [
      "La landing /produccion-ia se unifica con esta página con un 301 (decisión D1). Ya está aplicado en esta rama (next.config.ts).",
      "Revisar en Google que \"spot publicitario\" tenga intención comercial y no escolar antes de publicar (doc 07 §0).",
      "Wellmax necesita una pieza propia (video o foto de producto) para su caso.",
      PENDIENTE_PAQUETES,
    ],
  },

  // ════════════════════════════════════════════════════════════
  // 06 · EVENTOS CORPORATIVOS Y FERIAS
  // ════════════════════════════════════════════════════════════
  "eventos-corporativos": {
    h1: "Eventos corporativos y ferias en Lima:",
    h1Acento: "cobertura, activaciones de marca y juegos para tu stand",
    bajada:
      "Cubrimos la feria de punta a punta, armamos la activación de tu stand y convertimos todo en contenido para las semanas siguientes. Un solo interlocutor del montaje a la entrega.",
    pregunta: "¿Por qué tu stand deja de rendir cuando termina la feria?",
    cierre: "¿Tienes una feria o un evento corporativo en agenda?",
    lidera: ["roberth"],
    mockup: { tipo: "media", src: "/videos/trad-coberturas-02.mp4", poster: "/images/portfolio/posters/trad-coberturas-02.jpg", etiqueta: "Cobertura de evento" },
    oferta: "Eventos corporativos pensados como contenido para semanas",
    promesa:
      "Que tu feria siga trabajando después de que se apagan las luces — sin coordinar cinco proveedores y sin quedarte con una carpeta de fotos sin editar.",
    sin: [
      {
        miedo: "Coordinar cinco proveedores",
        porque: "Ambientación, video, foto, diseño e impresión, cada uno con su agenda.",
        como: "Un solo interlocutor del montaje a la entrega de las piezas.",
      },
      {
        miedo: "Quedarte con una carpeta sin procesar",
        porque: "La cobertura suele llegar cuando ya nadie se acuerda del evento.",
        como: "Piezas editadas y entregadas para publicar mientras el evento se recuerda.",
      },
      {
        miedo: "Un stand que pasa desapercibido",
        porque: "Un salón con tu logo pegado no detiene a nadie.",
        como: "Una activación pensada para que el visitante se acerque, pruebe y juegue.",
      },
    ],
    velocidad: {
      primera: { cuando: "El mismo día", que: "Cobertura en marcha desde el montaje y reels de cada día de feria." },
      final: { cuando: "Después de la feria", que: "After movie y piezas post-evento entregadas para seguir comunicando." },
    },
    destacado: {
      tipo: "comparar",
      label: "Tu paquete",
      titulo: "Paquete para ferias: cobertura, activación de marca y contenido post-evento",
      texto: "Se arma con tres bloques, y te decimos con claridad cuál ejecuta nuestro equipo y cuál un proveedor especializado.",
      columnas: [
        {
          nombre: "Cobertura de marketing",
          cuando: "Bloque 1",
          puntos: ["Presencia en montaje y desmontaje", "Cobertura de cada día de feria", "Fotografía del evento y del stand", "Videoreels editados para redes"],
        },
        {
          nombre: "Activación de marca en el stand",
          cuando: "Bloque 2",
          puntos: ["Barra o atención al visitante, con horario definido", "Circuito o demostración en vivo de tu producto", "Juego interactivo para el stand"],
        },
        {
          nombre: "Contenido post-evento",
          cuando: "Bloque 3",
          puntos: ["After movie del evento", "Piezas verticales para redes", "Material reutilizable para el equipo comercial"],
        },
      ],
    },
    prometemos: [
      "Un solo interlocutor del montaje a la entrega",
      "Qué ejecuta nuestro equipo y qué un proveedor, dicho por escrito",
      "Cobertura de cada día de feria",
      "Lo que entra en cada bloque, definido en la propuesta",
    ],
    noPrometemos: {
      pregunta: "¿Hacen todo con equipo propio?",
      respuesta:
        "No siempre, y te lo decimos antes. La cobertura y el contenido son nuestros; parte de la activación —barra, mobiliario, montaje— puede ejecutarla un proveedor especializado que coordinamos nosotros.",
    },
    noEsPara: "Eventos privados sin objetivo comercial ni de comunicación.",
    casos: [
      {
        cliente: "Z-Link",
        sector: "Agua y medición",
        titulo: "Expo Agua 2026",
        texto: "Cobertura de marketing, open bar y circuito de demostración en vivo con dos líneas de medidores.",
        servicios: ["Eventos corporativos y ferias"],
        cifras: ["3 días de feria", "2 videoreels", "2 líneas de demostración (DN15 y DN20)"],
        nuevo: true,
        requiereAutorizacion: true,
      },
      {
        cliente: "Livoltek",
        sector: "Energía solar / B2B",
        titulo: "ExpoSolar 2025",
        texto: "Video caso y cobertura de su participación, con IA para explicar lo técnico.",
        servicios: ["Eventos corporativos y ferias", "Spot publicitario con IA"],
        href: "/casos/livoltek",
        poster: "/images/portfolio/posters/trad-comerciales-02.jpg",
      },
    ],
    portafolio: [
      { tipo: "video", src: "/videos/trad-coberturas-01.mp4", poster: "/images/portfolio/posters/trad-coberturas-01.jpg", titulo: "Cobertura de evento", formato: "9/16" },
      {
        tipo: "pendiente", medio: "video", formato: "16/9",
        titulo: "After movie de feria",
        detalle: "El evento completo en 60 a 90 segundos, horizontal. Ideal: Z-Link en Expo Agua 2026.",
      },
      { tipo: "video", src: "/videos/trad-coberturas-02.mp4", poster: "/images/portfolio/posters/trad-coberturas-02.jpg", titulo: "Cobertura de evento", formato: "9/16" },
      { tipo: "video", src: "/videos/trad-coberturas-03.mp4", poster: "/images/portfolio/posters/trad-coberturas-03.jpg", titulo: "Cobertura de evento", formato: "9/16" },
      {
        tipo: "pendiente", medio: "foto", formato: "4/5",
        titulo: "Stand con gente",
        detalle: "El stand terminado y con visitantes. De 4 a 6 fotos.",
      },
      {
        tipo: "pendiente", medio: "foto", formato: "1/1",
        titulo: "Activación en vivo",
        detalle: "La demostración o el juego funcionando en el stand.",
      },
      { tipo: "video", src: "/videos/trad-coberturas-05.mp4", poster: "/images/portfolio/posters/trad-coberturas-05.jpg", titulo: "Cobertura de evento", formato: "9/16" },
    ],
    paquetes: [
      {
        nivel: 1,
        nombre: "Cobertura",
        para: "Ya tienes el stand armado. Falta que se vea y que quede en contenido.",
        incluye: [
          "Presencia en montaje y desmontaje",
          "Cobertura de cada día de feria en foto y video",
          "Videoreels editados para redes",
          "After movie del evento",
        ],
      },
      {
        nivel: 2,
        nombre: "Feria completa",
        para: "Los tres bloques: cobertura, activación del stand y contenido post-evento.",
        base: "Todo lo del Nivel 1, más:",
        incluye: [
          "Concepto del stand y de la experiencia del visitante",
          "Activación de marca: barra, demostración en vivo o juego",
          "Coordinación de proveedores, con qué ejecuta cada uno por escrito",
          "Piezas verticales y material reutilizable para el equipo comercial",
        ],
        recomendado: true,
      },
      {
        nivel: 3,
        nombre: "A medida",
        para: "Varios eventos al año, ferias fuera del país o un videojuego propio.",
        base: "Sobre la Feria completa:",
        incluye: [
          "Calendario anual de ferias y eventos",
          "Ferias internacionales",
          "Videojuego a medida para el stand",
          "Voceros y entrevistas durante el evento",
        ],
      },
    ],
    notaPaquetes: "Los tres bloques salen del acuerdo con Z-Link. Cada propuesta dice qué ejecuta nuestro equipo y qué un proveedor especializado.",
    variables: [
      { id: "dias", label: "Días de evento", opciones: ["1", "2 a 3", "Más de 3"] },
      { id: "bloques", label: "Bloques", multiple: true, opciones: ["Cobertura", "Activación del stand", "Contenido post-evento"] },
      { id: "activacion", label: "Activación", multiple: true, opciones: ["Barra o atención", "Demostración en vivo", "Juego interactivo"] },
      { id: "tipo", label: "Tipo de evento", opciones: ["Feria", "Lanzamiento", "Convención u otro"] },
    ],
    faq: [
      {
        p: "¿Qué incluye la cobertura de un evento corporativo o una feria?",
        r: "Presencia en el montaje y el desmontaje, cobertura de cada día en fotografía y video, y edición de videoreels para redes. Si el evento lo pide, sumamos la activación de marca en el stand y el after movie. Lo que entra en cada caso se define en la propuesta, bloque por bloque.",
      },
      {
        p: "¿Se encargan también de la activación de marca en el stand?",
        r: "Sí, coordinando a los proveedores. En la propuesta te decimos qué ejecuta nuestro equipo y qué un proveedor especializado.",
      },
      {
        p: "¿Pueden hacer un juego para nuestro stand?",
        r: "Sí. Los videojuegos a medida tienen su propio servicio y se integran a la cobertura del evento.",
      },
      {
        p: "¿Qué recibo después del evento?",
        r: "Las piezas editadas: after movie, videoreels, piezas verticales y fotos. Qué entra exactamente se define en la propuesta.",
      },
      {
        p: "¿Trabajan eventos corporativos que no son ferias?",
        r: "Sí: lanzamientos, convenciones y activaciones de marca, con la misma lógica de cobertura y contenido.",
      },
    ],
    relacionados: {
      titulo: "Servicios que se suman a tu evento corporativo",
      texto:
        "Un videojuego a medida le da al visitante una razón para detenerse en tu stand, y un spot publicitario con IA convierte el material del evento en piezas para tus redes y tu equipo comercial.",
      ids: ["videojuegos-a-medida", "spot-publicitario-ia"],
    },
    pendientes: [
      "Julio dejó el hueco \"inserte lo que incluye el paquete\": los 3 bloques salen del acuerdo con Z-Link y hay que validarlos con Roberth.",
      "Plazos de entrega del contenido post-evento (el texto no promete días).",
      "Confirmar qué hace el equipo propio y qué un proveedor, para no prometer lo que no se ejecuta internamente.",
      "No publicar el dato \"capacitaciones con ANDET\" del Excel de Z-Link: no está confirmado que sea una sigla real.",
      "Caso Z-Link: autorizado, falta que apruebe el texto final. Solo se muestra en revisión hasta entonces.",
      PENDIENTE_PAQUETES,
    ],
  },

  // ════════════════════════════════════════════════════════════
  // 07 · VIDEOJUEGOS A MEDIDA
  // ════════════════════════════════════════════════════════════
  "videojuegos-a-medida": {
    borrador: true,
    h1: "Videojuegos a medida para eventos y ferias:",
    h1Acento: "juegos interactivos para activaciones de marca",
    bajada:
      "Juegos para tu stand, simuladores y capacitación gamificada que funcionan en pantalla táctil, navegador o celular. La mecánica se diseña alrededor de tu objetivo.",
    pregunta: "¿Por qué la gente pasa de largo frente a tu stand?",
    cierre: "¿Y si tu cliente entendiera tu producto jugando?",
    lidera: ["julio"],
    mockup: { tipo: "juego" },
    oferta: "Juegos interactivos: gente que participa, no que mira",
    promesa:
      "Que la gente se detenga en tu stand, juegue y entienda tu producto sin leer un folleto — con una pieza que vuelves a usar en la siguiente feria.",
    sin: [
      {
        miedo: "Perseguir a la gente con un volante",
        porque: "Nadie se detiene por un papel que no pidió.",
        como: "Una experiencia que la gente quiere probar.",
      },
      {
        miedo: "Explicar lo técnico con una charla",
        porque: "Un folleto o una charla técnica pierde al visitante en el primer minuto.",
        como: "El visitante entiende cómo funciona tu producto jugando.",
      },
      {
        miedo: "Pagar algo que sirve una sola vez",
        porque: "Un juego para una sola feria es un gasto, no una inversión.",
        como: "Se reutiliza en otras ferias, sedes o campañas.",
      },
    ],
    velocidad: {
      primera: { cuando: "Primeras semanas", que: "Un prototipo jugable de la mecánica, probado con personas reales." },
      final: { cuando: "Antes del evento", que: "El juego listo, probado y montado en el stand." },
    },
    destacado: {
      tipo: "pasos",
      label: "Caso en curso · ExpoSolar",
      titulo: "Videojuego a medida para Livoltek en ExpoSolar: así se juega",
      texto:
        "Un instalador, un almacén con los equipos de Livoltek y cuatro casas por encender. El visitante entiende cómo funciona el sistema solar sin leer un folleto.",
      pasos: [
        { titulo: "Recoge", texto: "El visitante mueve al instalador hasta el almacén Livoltek y toma un equipo: inversor GF1, batería LiFePO4 o medidor Hexing." },
        { titulo: "Instala", texto: "Lo lleva a una de las cuatro casas de la isla. Cada casa necesita los tres equipos para funcionar." },
        { titulo: "Enciende", texto: "La casa completa se ilumina y se conecta al centro de control: una app en el celular con los kW generados y el consumo diario en soles." },
      ],
      nota: "Juego vertical para pantalla táctil, ambientado en la selva peruana, que funciona sin internet.",
      requiereAutorizacion: true,
    },
    prometemos: [
      "Una mecánica diseñada para tu objetivo, no un juego genérico con tu logo",
      "Pruebas con usuarios reales antes del evento",
      "Montaje y soporte durante el evento",
      "Una versión que se puede reutilizar",
    ],
    noPrometemos: {
      pregunta: "¿Todo juego a medida registra los datos de quien juega?",
      respuesta:
        "No por defecto. Si tu objetivo es captar datos, el juego se diseña para registrarlos; si es explicar tu producto, se mide la participación. Se decide en la propuesta, antes de construir.",
    },
    noEsPara: "Quien busca un juego de entretenimiento sin un objetivo comercial ni formativo detrás.",
    casos: [
      {
        cliente: "Livoltek",
        sector: "Energía solar / B2B",
        titulo: "Juego para el stand de ExpoSolar",
        texto: "El visitante instala inversor, batería y medidor en cuatro casas y ve la energía en la app.",
        servicios: ["Videojuegos a medida", "Eventos corporativos y ferias"],
        cifras: ["4 casas por encender", "3 equipos Livoltek por casa", "Funciona sin internet"],
        nuevo: true,
        requiereAutorizacion: true,
      },
    ],
    portafolio: [
      {
        tipo: "pendiente", medio: "video", formato: "9/16",
        titulo: "Gameplay",
        detalle: "El juego de Livoltek grabado de punta a punta en la pantalla vertical, 30 segundos.",
      },
      {
        tipo: "pendiente", medio: "foto", formato: "4/5",
        titulo: "Gente jugando en el stand",
        detalle: "Foto real de visitantes frente a la pantalla táctil.",
      },
      {
        tipo: "pendiente", medio: "captura", formato: "16/9",
        titulo: "Centro de control",
        detalle: "La app del juego que muestra los kW generados y el consumo en soles.",
      },
      {
        tipo: "pendiente", medio: "foto", formato: "1/1",
        titulo: "Montaje en feria",
        detalle: "La pantalla instalada en el stand.",
      },
    ],
    paquetes: [
      {
        nivel: 1,
        nombre: "Dinámica de stand",
        para: "Una experiencia corta que detiene a la gente.",
        incluye: [
          "Juego de uno a dos minutos",
          "Pantalla táctil, sin depender del internet del recinto",
          "Arte con la identidad de tu marca",
          "Pruebas antes del evento",
        ],
      },
      {
        nivel: 2,
        nombre: "Videojuego de marca",
        para: "Una mecánica a medida que explica tu producto, con soporte en el evento.",
        base: "Todo lo del Nivel 1, más:",
        incluye: [
          "Mecánica diseñada según tu objetivo",
          "Arte y animación a medida",
          "Pruebas con usuarios reales",
          "Montaje y soporte en vivo",
          "Versión reutilizable para otras ferias",
        ],
        recomendado: true,
      },
      {
        nivel: 3,
        nombre: "A medida",
        para: "Capacitación gamificada, simuladores o varias sedes.",
        base: "Sobre el Videojuego de marca:",
        incluye: [
          "Capacitación interna con puntaje",
          "Simuladores de producto o de proceso",
          "Registro de participantes e integración con tu CRM",
          "Despliegue en varias sedes",
        ],
      },
    ],
    variables: [
      { id: "objetivo", label: "Objetivo", opciones: ["Explicar un producto", "Captar datos", "Capacitar"] },
      { id: "dispositivo", label: "Dónde se juega", opciones: ["Pantalla táctil", "Navegador", "Celular del visitante"] },
      { id: "duracion", label: "Duración de la partida", opciones: ["1 a 2 min", "3 a 5 min", "Más de 5 min"] },
      { id: "soporte", label: "Soporte en el evento", opciones: ["No", "Sí"] },
    ],
    faq: [
      {
        p: "¿Qué es un videojuego a medida para una marca?",
        r: "Es un juego o una dinámica hecha para tu objetivo que explica tu producto o servicio de forma amigable: un reto en el stand, un simulador, una trivia o una capacitación con puntaje. La mecánica se diseña alrededor de lo que necesitas: captar datos, enseñar un procedimiento o que alguien entienda tu producto jugando.",
      },
      {
        p: "¿En qué se puede jugar?",
        r: "En pantalla táctil, navegador o celular. Para ferias lo preparamos para funcionar sin depender del internet del recinto.",
      },
      {
        p: "¿Qué datos me entrega el juego?",
        r: "Depende del objetivo. Si el juego debe captar datos, se diseña para registrar a quien juega; si no, se mide la participación. Se define en la propuesta.",
      },
      {
        p: "¿Se puede combinar con la cobertura del evento?",
        r: "Sí. El juego rinde más dentro de un evento bien cubierto, con la activación del stand coordinada por el mismo equipo.",
      },
    ],
    relacionados: {
      titulo: "Servicios que se combinan con tu videojuego a medida",
      texto:
        "El juego rinde más dentro de un evento bien cubierto, con la activación del stand coordinada por el mismo equipo. Y si es para tu personal, se vuelve una capacitación que la gente termina.",
      ids: ["eventos-corporativos", "capacitacion-ia"],
    },
    pendientes: [
      "Caso Livoltek / ExpoSolar en curso: falta autorización para mostrarlo, fecha de la feria y capturas o video del juego en el stand. Solo se muestra en revisión.",
      "Decidir si la página enlaza o embebe el juego de Livoltek como demo jugable.",
      "El acceso por usuario y clave de livoltek-juego.vercel.app se valida en el navegador y la clave está en el código: no protege nada. Si el juego no debe ser público, protegerlo desde Vercel.",
      "El juego de Livoltek no registra datos de participantes: la captura de datos quedó como opción, no como promesa.",
      "Servicio en borrador: validar contenido con Manuel y Julio.",
      PENDIENTE_PAQUETES,
    ],
  },

  // ════════════════════════════════════════════════════════════
  // 08 · CAPACITACIÓN EN IA PARA EMPRESAS
  // Fuente del programa: MENTORIA IN-COMPANY - Estructura y propuesta.md
  // ════════════════════════════════════════════════════════════
  "capacitacion-ia": {
    h1: "Capacitación en IA para empresas:",
    h1Acento: "in-company y en vivo",
    bajada:
      "Un programa de cuatro sesiones en vivo sobre tu propia marca. Tu equipo no sale con apuntes: sale con su sistema construido, una pieza terminada y la grilla del mes siguiente.",
    pregunta: "¿Por qué lo que tu equipo hace con IA sale genérico?",
    cierre: "¿Tu equipo prueba IA y todo sale genérico?",
    lidera: ["manuel", "julio"],
    mockup: { tipo: "programa" },
    oferta: "Tu equipo sale con el sistema funcionando",
    promesa:
      "Que tu equipo produzca con IA piezas que se parecen a tu marca — sin depender de un proveedor para cada pieza y sin un curso grabado que nadie termina.",
    sin: [
      {
        miedo: "Un curso grabado que nadie termina",
        porque: "El contenido genérico no se aplica a tu marca y se abandona.",
        como: "Sesiones en vivo, trabajando sobre tu propia marca.",
      },
      {
        miedo: "Aprender herramientas que cambian cada mes",
        porque: "La herramienta de hoy es un botón mañana.",
        como: "Enseñamos el criterio que va antes de la herramienta.",
      },
      {
        miedo: "Salir con apuntes y no con resultados",
        porque: "Una capacitación sin entregable se olvida en una semana.",
        como: "Cada sesión termina con algo construido sobre tu marca.",
      },
    ],
    velocidad: {
      primera: { cuando: "Sesión 2", que: "El Cerebro Creativo de tu marca construido y funcionando." },
      final: { cuando: "Sesión 4", que: "Una pieza real producida y la grilla de los próximos 30 días." },
    },
    destacado: {
      tipo: "pasos",
      label: "El programa",
      titulo: "Programa de la capacitación en inteligencia artificial: cuatro sesiones en vivo de 3.5 horas",
      texto: "Cada sesión tiene un bloque de contenido y un bloque de trabajo aplicado a tu marca.",
      pasos: [
        { titulo: "Pensar", texto: "El criterio que va antes de la IA: insight, concepto y estructuras narrativas.", seLlevan: "El insight y el concepto de su marca, escritos" },
        { titulo: "El sistema", texto: "El ADN comunicacional de la marca y cómo alimentar la IA con oficio.", seLlevan: "Su Cerebro Creativo IA funcionando" },
        { titulo: "Crear", texto: "Dirigir la imagen con intención, consistencia de marca y del guion al storyboard.", seLlevan: "Una pieza real de su marca, terminada" },
        { titulo: "Operar", texto: "Flujo de trabajo del equipo, control de calidad y qué medir.", seLlevan: "La grilla de contenido de 30 días" },
      ],
    },
    prometemos: [
      "Cuatro sesiones en vivo, personalizadas a tu marca",
      "Trabajo aplicado en cada sesión, no solo teoría",
      "Entregables construidos sobre tu negocio",
      "El flujo de trabajo del equipo definido al cerrar",
    ],
    noPrometemos: {
      pregunta: "¿Cuatro sesiones convierten a tu equipo en productora?",
      respuesta:
        "No. Le dan criterio, método y un sistema funcionando para producir el día a día con calidad. Las piezas de mayor exigencia —un spot para televisión, por ejemplo— siguen pidiendo dirección especializada.",
    },
    noEsPara: "Equipos que buscan una demostración de herramientas o un certificado.",
    casos: [],
    casoPendiente: "Aquí va el primer caso de capacitación: un equipo con nombre y su testimonio.",
    portafolio: [
      {
        tipo: "pendiente", medio: "foto", formato: "16/9",
        titulo: "Sesión en vivo",
        detalle: "El equipo trabajando sobre su marca durante una sesión. Plano abierto con pantallas.",
      },
      {
        tipo: "pendiente", medio: "video", formato: "9/16",
        titulo: "Testimonio de participante",
        detalle: "De 30 a 45 segundos: qué hacía antes y qué hace ahora.",
      },
      {
        tipo: "pendiente", medio: "captura", formato: "16/9",
        titulo: "Cerebro Creativo de una marca",
        detalle: "Captura del sistema construido en clase, con datos sensibles tapados.",
      },
      {
        tipo: "pendiente", medio: "foto", formato: "1/1",
        titulo: "Pieza producida en clase",
        detalle: "La pieza real que el equipo terminó en la tercera sesión.",
      },
    ],
    paquetes: [
      {
        nivel: 1,
        nombre: "Sesión intensiva",
        para: "Alinear al equipo en el criterio antes de producir.",
        incluye: [
          "Una sesión en vivo de 3.5 horas",
          "Insight, concepto y estructuras narrativas aplicados a tu marca",
          "Demostración de producción en vivo",
          "Plantillas base del sistema",
        ],
      },
      {
        nivel: 2,
        nombre: "Programa completo",
        para: "El equipo sale con el sistema construido y funcionando.",
        base: "Todo lo del Nivel 1, más:",
        incluye: [
          "Cuatro sesiones en vivo de 3.5 horas",
          "El Cerebro Creativo IA de tu marca, construido en clase",
          "Una pieza real producida por el equipo",
          "La grilla de contenido de los próximos 30 días",
          "Flujo de trabajo y control de calidad definidos",
        ],
        recomendado: true,
      },
      {
        nivel: 3,
        nombre: "A medida",
        para: "Varios equipos, varias áreas o acompañamiento continuo.",
        base: "Sobre el Programa completo:",
        incluye: [
          "Programa para más de un equipo o área",
          "Acompañamiento mensual después del programa",
          "Contenido adaptado a tu industria",
          "Revisión de las piezas del equipo",
        ],
      },
    ],
    variables: [
      { id: "participantes", label: "Participantes", opciones: ["Hasta 4", "5 a 10", "Más de 10"] },
      { id: "modalidad", label: "Modalidad", opciones: ["Remota", "Presencial"] },
      { id: "industria", label: "Adaptación a tu industria", opciones: ["Estándar", "Profunda"] },
      { id: "acompanamiento", label: "Acompañamiento posterior", opciones: ["Sin acompañamiento", "1 mes", "3 meses"] },
    ],
    faq: [
      {
        p: "¿Para quién es esta capacitación en IA?",
        r: "Para equipos de marketing que ya intentan producir con IA y necesitan criterio y método, no más herramientas. Si lo que buscas es aplicar IA a otros procesos de tu empresa, cuéntanos cuáles y armamos el contenido a medida.",
      },
      {
        p: "¿Es un curso grabado?",
        r: "No. Son sesiones en vivo, y una parte de cada una es trabajo aplicado sobre tu propia marca.",
      },
      {
        p: "¿Qué se llevan al final?",
        r: "Su Cerebro Creativo IA funcionando, una pieza real terminada y la grilla de contenido de los próximos 30 días.",
      },
      {
        p: "¿Se puede hacer presencial o remota?",
        r: "La modalidad se define en la propuesta, según dónde está tu equipo.",
      },
    ],
    relacionados: {
      titulo: "Servicios que se combinan con la capacitación en IA",
      texto:
        "Si prefieres que un equipo externo produzca mientras el tuyo aprende, nuestros spots publicitarios con IA usan el mismo método. Y si la capacitación es para todo tu personal, un juego a medida la vuelve algo que se termina.",
      ids: ["spot-publicitario-ia", "videojuegos-a-medida"],
    },
    pendientes: [
      "Julio habla de capacitar \"para mejorar tus procesos\"; el programa actual es de marketing. Decidir si hay una segunda versión para procesos internos.",
      "Un testimonio o cohorte previa con nombre (la Academy tiene alumnos; ver qué se puede mostrar).",
      "\"Curso de ia\" (1k–10k búsquedas) es búsqueda de la Academy, no de esta página: no apuntarla aquí.",
      "Confirmar modalidades reales (remota, presencial, regiones). La FAQ no promete ninguna.",
      PENDIENTE_PAQUETES,
    ],
  },
};
