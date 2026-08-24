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
  problema: string; // la tensión que abre el detalle
  desc: string; // párrafo de apertura del detalle
  resultado: string[]; // qué se lleva el cliente, en concreto
  incluye: string[];
  proceso?: { paso: string; texto: string }[];
  paraQuien?: string;
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
    tagline: "Tu marca publicando todo el mes, con calidad de producción y sin montar un rodaje.",
    problema:
      "Publicas cuando alcanza el tiempo. Un mes bien, dos meses en silencio, y cada vez que retomas la marca vuelve a empezar de cero. Contratar un equipo de producción mensual cuesta más de lo que el contenido devuelve, y hacerlo con el celular no aguanta la comparación con la competencia.",
    desc: "Producimos tu presencia mensual completa en redes con los motores de imagen, video y sonido de última generación: Higgsfield, Kling 3.0, Seedance 2.0, ElevenLabs, HeyGen y Suno. Piezas listas para publicar, entregadas antes de que empiece el mes, con una línea visual que se reconoce como tuya y no como plantilla de IA.",
    resultado: [
      "El mes completo de contenido en tus manos antes del día 1",
      "Una línea visual reconocible: identifican tu marca sin leer el nombre",
      "Costo por pieza que ninguna productora mensual puede igualar",
      "Grilla planificada: sabes qué sale cada día y con qué objetivo",
      "Cero dependencia de agenda de rodaje, locación o modelos",
    ],
    incluye: [
      "6 videos de contenido IA (composición referencial de 12 piezas)",
      "3 carruseles IA",
      "3 imágenes IA de marca",
      "Planificación de grilla mensual con objetivo por pieza",
      "Guion y dirección de arte de cada pieza",
      "Música, subtítulos y formatos verticales listos para publicar",
      "Rondas de revisión incluidas antes de cada entrega",
    ],
    proceso: [
      { paso: "Dirección y concepto", texto: "Idea, guion, referencias visuales y definición del look que va a repetirse todo el mes." },
      { paso: "Generación de piezas", texto: "Cada pieza se genera y se vuelve a generar hasta que el encuadre, el rostro y el color son consistentes con el resto." },
      { paso: "Acabado y entrega", texto: "Edición, música, subtítulos y exportación por formato. Entregamos el paquete completo, no piezas sueltas." },
    ],
    paraQuien:
      "Marcas que ya venden y necesitan presencia constante sin abrir un área interna de contenido ni firmar con una productora mensual.",
    factores: [
      "Volumen de piezas por mes",
      "Duración y número de planos por video",
      "Presencia de voz, locución o avatar",
      "Nivel de realismo requerido",
      "Cantidad de líneas de producto a cubrir",
    ],
    precio: { desde: "$2,800", hasta: "$10,000", nota: "paquete completo de 12 piezas: 6 videos + 3 carruseles + 3 imágenes · sube según volumen mensual" },
    tags: ["Videos", "Carruseles", "Imágenes de marca", "Grilla mensual"],
    destacado: true,
  },
  {
    n: "02",
    id: "comerciales-ia",
    accentRgb: "99,110,250",
    categoria: "Producción IA",
    title: "Comerciales IA",
    tagline: "Un spot con acabado de cine, dirigido plano por plano, sin set ni jornada de rodaje.",
    problema:
      "Tienes la ambición de un comercial de televisión y el presupuesto de una campaña digital. Con producción tradicional esos dos números no se cruzan: entre casting, locación, equipo y post, la pieza cuesta entre $10,000 y $100,000 y tarda meses en estar lista.",
    desc: "Aquí no se generan clips sueltos y se pegan. La pieza se dirige como un comercial de TV: guion, storyboard, shot list, definición de personajes y un look cinematográfico que se sostiene de la primera toma a la última. La diferencia entre un video de IA y un comercial es la dirección, y eso es exactamente lo que ponemos.",
    resultado: [
      "Un spot terminado, listo para TV, YouTube, Meta y sala de ventas",
      "Personajes que se ven iguales en todos los planos, no cinco caras distintas",
      "Color, luz y ritmo de comercial de agencia, no de generador",
      "Semanas de producción en lugar de meses",
      "Precio cerrado desde el brief: sabes el total antes de empezar",
    ],
    incluye: [
      "Concepto, guion, storyboard y shot list",
      "Definición de personajes y look cinematográfico de la pieza",
      "Generación plano por plano con consistencia de rostro y movimiento",
      "Edición y color grade cinematográfico",
      "Diseño sonoro, locución y música",
      "VFX de acabado y control de calidad plano por plano",
      "Versiones y cortes adicionales para redes",
    ],
    proceso: [
      { paso: "Preproducción", texto: "Concepto, guion, storyboard, shot list, referencias y definición de personajes. Nada se genera hasta que la pieza está resuelta en papel." },
      { paso: "Producción IA", texto: "Generación plano por plano. Decenas o cientos de iteraciones por toma hasta lograr consistencia de rostro, encuadre y movimiento." },
      { paso: "Postproducción", texto: "Edición, color grade, diseño sonoro, locución, música y VFX de acabado. Sale con estándar de entrega de agencia." },
    ],
    paraQuien:
      "Marcas que necesitan una pieza ancla de campaña —lanzamiento, reposicionamiento, temporada alta— y quieren nivel de comercial sin el presupuesto ni los plazos de un rodaje.",
    factores: [
      "Personajes con consistencia visual en todos los planos",
      "Diálogo y sincronía labial (lipsync)",
      "Número de planos y tomas complejas",
      "Duración de la pieza (30s vs 60s)",
      "Locución profesional o voz clonada",
      "Música original y diseño sonoro",
      "VFX y acabado avanzado",
    ],
    precio: { desde: "$2,000", hasta: "$10,000", nota: "proyecto cerrado según brief — vs. $10,000 – $100,000+ de un comercial tradicional" },
    tags: ["Spot TV", "Cinemática 4K", "Plano por plano", "Proyecto cerrado"],
    destacado: true,
  },
  {
    n: "03",
    id: "paginas-web",
    accentRgb: "0,169,196",
    categoria: "Web",
    title: "Desarrollo Web, SEO y SEM",
    tagline: "Una web que carga rápido, aparece en Google y termina en una conversación de venta.",
    problema:
      "O tu web existe y nadie llega, o llegan y no escriben. En ambos casos estás pagando hosting por un folleto: se ve bien, no vende, y cada mes que pasa tu competencia se queda con las búsquedas que deberían ser tuyas.",
    desc: "Construimos el sitio con estándar visual de agencia, lo optimizamos para posicionar orgánicamente y activamos campañas de búsqueda pagada para que entre tráfico calificado desde la primera semana. El objetivo no es que la web se vea bien: es que la gente que ya está buscando lo que vendes te encuentre y te escriba.",
    resultado: [
      "Un sitio que carga en menos de dos segundos en celular",
      "Presencia orgánica en las búsquedas que traen clientes, no visitas vacías",
      "Tráfico calificado entrando desde Google Ads desde el primer mes",
      "Cada visita con un camino claro hacia WhatsApp o formulario",
      "Reportes donde ves de dónde vino cada contacto",
    ],
    incluye: [
      "Diseño y desarrollo completo, publicado en tu dominio",
      "Adaptación total a celular y tablet",
      "Optimización de velocidad y Core Web Vitals",
      "SEO técnico y on-page (estructura, metadatos, indexación)",
      "Investigación de palabras clave y contenido optimizado",
      "Campañas SEM en Google Ads con seguimiento de conversiones",
      "Textos orientados a conversión y contacto directo por WhatsApp",
      "Reportes mensuales de posicionamiento y rendimiento",
    ],
    proceso: [
      { paso: "Estrategia y estructura", texto: "Objetivo del sitio, arquitectura de contenido e investigación de las palabras clave que de verdad traen clientes." },
      { paso: "Diseño, desarrollo y SEO", texto: "Construcción visual y técnica con el posicionamiento incorporado desde el código, no parchado después." },
      { paso: "Lanzamiento y SEM", texto: "Publicación, campañas de búsqueda activas, medición de conversiones y optimización mes a mes." },
    ],
    paraQuien:
      "Negocios cuyos clientes buscan en Google antes de comprar: servicios profesionales, B2B, retail especializado, inmobiliaria, salud, educación.",
    factores: [
      "Número de páginas y secciones del sitio",
      "Catálogo o e-commerce vs. sitio institucional",
      "Integraciones (CRM, pasarela de pago, reservas)",
      "Alcance del trabajo de SEO y competencia del sector",
      "Presupuesto y número de campañas SEM a gestionar",
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
    tagline: "Empaques que ganan la góndola y que ya se ven perfectos en cámara.",
    problema:
      "En góndola tienes menos de tres segundos y compites hombro a hombro con marcas que invirtieron cien veces más en su diseño. Y cuando por fin apruebas un empaque, llega el momento de fotografiarlo para redes y aparece otro presupuesto que nadie había contemplado.",
    desc: "Diseño de empaque potenciado con IA: exploramos decenas de direcciones visuales en días en lugar de semanas, aterrizamos la ganadora en un archivo listo para imprenta, y de paso entregamos los mockups fotorealistas que normalmente exigirían una sesión de producto.",
    resultado: [
      "Ver tu producto en varias direcciones visuales antes de comprometerte con una",
      "Archivos listos para imprenta, sin ida y vuelta con el proveedor",
      "Mockups fotorealistas para validar internamente y para vender en redes",
      "Una línea coherente entre todas las presentaciones y sabores",
      "Semanas menos de proceso frente a un estudio de diseño tradicional",
    ],
    incluye: [
      "Exploración de múltiples direcciones visuales con IA",
      "Diseño final de empaque listo para imprenta",
      "Mockups fotorealistas del producto en distintos contextos",
      "Adaptaciones por formato, presentación y variedad",
      "Archivos finales en formatos de producción y línea de corte",
    ],
    proceso: [
      { paso: "Exploración", texto: "Generamos varias direcciones visuales completas sobre tu brief para que elijas viendo, no imaginando." },
      { paso: "Refinamiento", texto: "Aterrizamos la dirección elegida en el diseño final, con tipografía, jerarquía e información legal resueltas." },
      { paso: "Entrega", texto: "Archivos de producción listos para el impresor y mockups para presentación y redes." },
    ],
    paraQuien:
      "Marcas de consumo que lanzan un producto, renuevan su línea o necesitan competir visualmente en un anaquel donde hoy pasan desapercibidas.",
    factores: [
      "Número de presentaciones y variedades",
      "Tipo de empaque y complejidad del troquel",
      "Rondas de exploración previas a la decisión",
      "Cantidad y nivel de acabado de los mockups",
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
    tagline: "Key visuals con nivel de producción fotográfica, sin sesión de fotos.",
    problema:
      "Una campaña necesita un key visual fuerte y decenas de adaptaciones. La ruta tradicional es sesión de fotos, casting, locación y retoque: cinco cifras y tres semanas antes de ver la primera propuesta, con el riesgo de que la idea no funcione y ya no haya presupuesto para repetirla.",
    desc: "Producimos las piezas gráficas de tu campaña con acabado fotográfico generado con IA: el key visual, sus adaptaciones a cada canal y el material BTL de activación, todo con la misma consistencia visual que tendría una campaña fotografiada en un solo día.",
    resultado: [
      "El key visual de tu campaña sin agendar una sesión de fotos",
      "Todas las adaptaciones por canal salidas de la misma pieza madre",
      "Poder probar tres conceptos por lo que costaba producir uno",
      "Material BTL que se ve del mismo mundo que el aviso digital",
      "Cambios de última hora resueltos en horas, no en otra sesión",
    ],
    incluye: [
      "Key visuals de campaña con acabado fotográfico",
      "Gráficas para redes, impresos y vía pública",
      "Material BTL (activaciones, stands, merchandising)",
      "Consistencia de línea visual entre todas las piezas",
      "Adaptaciones a cada formato y soporte incluidas",
      "Archivos en alta para producción de gran formato",
    ],
    proceso: [
      { paso: "Concepto", texto: "Dirección de arte, referencias y definición del mundo visual de la campaña." },
      { paso: "Generación", texto: "Producción del key visual y sus variantes, con control de consistencia entre piezas." },
      { paso: "Adaptación", texto: "Bajada a cada formato y soporte, en los archivos que pide cada proveedor." },
    ],
    paraQuien:
      "Marcas y agencias que necesitan material de campaña con nivel de producción alto y plazos que una producción fotográfica no alcanza a cubrir.",
    factores: [
      "Número de key visuals y conceptos a explorar",
      "Cantidad de adaptaciones y formatos por canal",
      "Presencia de personas y nivel de realismo requerido",
      "Piezas de gran formato o producción física BTL",
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
    tagline: "Un agente entrenado en tu negocio que atiende, califica y agenda 24/7.",
    problema:
      "El cliente escribe a las 10 de la noche y le respondes al día siguiente a las once. Para entonces ya compró en otro lado. Y los mensajes que sí contestas se van en repetir el mismo precio, el mismo horario y la misma dirección treinta veces al día.",
    desc: "Instalamos un agente de IA entrenado con tu catálogo, tus precios y tu forma de hablar. Responde en WhatsApp o en tu web a cualquier hora, resuelve las consultas repetitivas, califica al que sí está listo para comprar y te lo pasa a ti con el contexto de la conversación ya resuelto.",
    resultado: [
      "Respuesta en segundos a cualquier hora, incluidos fines de semana",
      "Las preguntas repetitivas dejan de ocupar a tu equipo",
      "Cada conversación queda registrada, no perdida en un celular",
      "Los clientes tibios llegan a ti ya calificados y con contexto",
      "Un canal de venta que no crece en costo cuando crece el volumen",
    ],
    incluye: [
      "Agente IA entrenado con tu catálogo, precios y preguntas frecuentes",
      "Atención automática 24/7 en WhatsApp y/o tu web",
      "Calificación de clientes potenciales según tus criterios",
      "Derivación a humano en el momento en que la venta lo requiere",
      "Panel de conversaciones y ajuste del tono de marca",
      "Ajustes de respuestas durante el primer mes de operación",
    ],
    proceso: [
      { paso: "Entrenamiento", texto: "Cargamos tu catálogo, precios, preguntas frecuentes, objeciones y el tono con el que hablas a tus clientes." },
      { paso: "Instalación", texto: "Conectamos el agente a tu WhatsApp Business o a tu web y probamos con conversaciones reales antes de abrirlo." },
      { paso: "Optimización", texto: "Revisamos conversaciones reales y afinamos respuestas donde el agente dudó o perdió la venta." },
    ],
    paraQuien:
      "Negocios que reciben consultas por WhatsApp todos los días y pierden ventas por tiempo de respuesta: retail, servicios, inmobiliaria, clínicas, educación.",
    factores: [
      "Tamaño del catálogo y complejidad de las consultas",
      "Canales conectados (WhatsApp, web, Instagram)",
      "Integración con CRM, agenda o pasarela de pago",
      "Nivel de automatización de la venta (informar vs. cerrar)",
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
    tagline: "Cada contacto que ya tocaste, convertido en un activo que puedes volver a activar.",
    problema:
      "Tus contactos están repartidos entre el WhatsApp de un vendedor, un Excel de hace dos años y los formularios de la web que nadie revisa. Ya pagaste por conseguir a esa gente, y hoy no puedes escribirles porque no sabes ni cuántos son.",
    desc: "Automatizamos la captura, limpieza y organización de tus contactos: cada lead que entra por cualquier canal queda registrado, sin duplicados, segmentado y listo para activarse en una campaña. Sin nadie copiando y pegando en una hoja de cálculo.",
    resultado: [
      "Una sola base con todos tus contactos, no cinco listas sueltas",
      "Cada lead nuevo entra solo, sin carga manual",
      "Segmentos listos para campañas de email o WhatsApp",
      "Contactos duplicados y datos rotos limpiados de una vez",
      "Un activo que crece todos los meses y no depende de un vendedor",
    ],
    incluye: [
      "Captura automática de leads desde web, WhatsApp y formularios",
      "Base de datos centralizada y segmentada por criterios de negocio",
      "Limpieza, normalización y deduplicación de contactos existentes",
      "Integración con tu CRM o las herramientas que ya usas",
      "Reportes de crecimiento y calidad de la base",
    ],
    proceso: [
      { paso: "Auditoría", texto: "Mapeamos por dónde entran hoy tus contactos, dónde terminan y cuántos se están perdiendo en el camino." },
      { paso: "Automatización", texto: "Conectamos cada canal a una base centralizada con las reglas de limpieza y segmentación ya aplicadas." },
      { paso: "Activación", texto: "Dejamos la base lista para campañas y te entregamos cómo usarla sin depender de nosotros." },
    ],
    paraQuien:
      "Negocios con volumen de consultas que hoy no reaprovechan: cada mes generan contactos nuevos y nunca vuelven a hablarle a los del mes pasado.",
    factores: [
      "Cantidad y estado de los contactos existentes",
      "Número de canales y fuentes a conectar",
      "CRM o herramienta destino y su nivel de integración",
      "Complejidad de las reglas de segmentación",
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
    tagline: "Secuencias que siguen vendiendo a tus contactos cuando ya nadie los está atendiendo.",
    problema:
      "El 90% de la gente que te consulta no compra ese día, y ahí termina la historia. Nadie los vuelve a contactar, la venta se enfría, y el mes siguiente vuelves a pagar pauta para conseguir gente nueva en lugar de cerrar a la que ya tenías.",
    desc: "Diseñamos y automatizamos las secuencias de correo que trabajan ese intervalo: bienvenida, seguimiento, recuperación de carrito y reactivación. Se disparan solas según lo que hace cada contacto, con textos y diseño alineados a tu marca, y siguen corriendo mes tras mes sin que nadie las toque.",
    resultado: [
      "Contactos que se enfriaban ahora reciben seguimiento automático",
      "Ventas que se cierran sin que nadie del equipo intervenga",
      "Un canal propio, que no depende del algoritmo ni del costo de pauta",
      "Saber qué mensaje convierte y cuál no, con datos",
      "Todo montado una vez y funcionando de forma indefinida",
    ],
    incluye: [
      "Estrategia de secuencias según tu embudo (bienvenida, venta, recuperación, reactivación)",
      "Redacción y diseño de cada correo",
      "Automatización disparada por el comportamiento del contacto",
      "Segmentación de la base para que cada quien reciba lo suyo",
      "Reportes de apertura, clics y conversión",
      "Pruebas A/B de asuntos y mensajes clave",
    ],
    proceso: [
      { paso: "Estrategia", texto: "Definimos qué secuencias necesita tu embudo y qué debe pasar en cada punto de contacto." },
      { paso: "Producción", texto: "Escribimos, diseñamos y montamos los correos en tu plataforma." },
      { paso: "Automatización", texto: "Todo queda disparándose solo, medido, con reportes y ajustes mensuales." },
    ],
    paraQuien:
      "Negocios con una base de contactos que hoy no se está usando, o con un ciclo de venta donde el cliente compara antes de decidir.",
    factores: [
      "Número de secuencias y correos por secuencia",
      "Tamaño y estado de la base de datos",
      "Plataforma de envío y complejidad de las integraciones",
      "Gestión mensual continua o montaje de una sola vez",
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
    tagline: "El plan que define qué vendes, a quién y por qué te compran a ti.",
    problema:
      "Estás produciendo contenido, pagando pauta y contestando mensajes, y aun así el mes cierra parecido al anterior. El problema casi nunca está en las piezas: está en que la oferta, el segmento y el precio nunca se definieron con criterio, así que cada esfuerzo empuja en una dirección distinta.",
    desc: "Antes de producir una sola pieza hay que responder qué se vende, a quién y cómo. Diseñamos tu estrategia de salida al mercado y el sistema comercial que la sostiene: propuesta de valor, segmentos, canales, embudo, estructura de precios y las métricas que te dicen si está funcionando o no.",
    resultado: [
      "Saber exactamente a quién le vendes y qué le duele",
      "Una propuesta de valor que no suena igual que la de tu competencia",
      "Un embudo dibujado de punta a punta, con responsables por etapa",
      "Estructura de oferta y precios sustentada, no copiada del mercado",
      "Un tablero de métricas que te dice qué corregir y cuándo",
    ],
    incluye: [
      "Diagnóstico de negocio y posicionamiento actual",
      "Propuesta de valor y mensajes por segmento",
      "Definición de cliente ideal y buyer personas",
      "Plan Go-To-Market canal por canal",
      "Diseño del embudo comercial de punta a punta",
      "Estructura de oferta y estrategia de precios",
      "KPIs y tablero de seguimiento",
      "Roadmap ejecutable con prioridades y plazos",
    ],
    proceso: [
      { paso: "Diagnóstico", texto: "Analizamos negocio, competencia, oferta y los datos comerciales que ya tienes, aunque estén desordenados." },
      { paso: "Estrategia", texto: "Definimos posicionamiento, segmentos, canales, embudo y estructura de precios." },
      { paso: "Plan de acción", texto: "Entregamos el roadmap ejecutable con métricas, responsables y orden de prioridad." },
    ],
    paraQuien:
      "Negocios que ya facturan pero crecieron sin plan, o que están por lanzar algo nuevo y no quieren descubrir el mercado gastando pauta.",
    factores: [
      "Tamaño del negocio y número de líneas o unidades",
      "Cantidad de segmentos y canales a cubrir",
      "Profundidad del análisis de competencia y mercado",
      "Acompañamiento en la ejecución posterior",
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
    tagline: "Una campaña coordinada de punta a punta: concepto, piezas, pauta y medición.",
    problema:
      "Un proveedor hace el video, otro lleva la pauta, la web la ve un tercero y nadie responde por el resultado. Cuando la campaña no funciona, cada uno señala al otro y tú te quedas con la factura y sin aprendizaje.",
    desc: "Campañas completas donde estrategia, producción, pauta y medición van bajo un mismo responsable. Definimos el concepto, producimos todo el material, activamos la inversión en cada canal y optimizamos con datos reales mientras la campaña está corriendo, no cuando ya terminó.",
    resultado: [
      "Un solo responsable de la campaña completa y su resultado",
      "Todas las piezas hablando el mismo idioma en todos los canales",
      "Ajustes durante la campaña, con la pauta todavía corriendo",
      "Un reporte final que te dice qué repetir y qué no",
      "Menos coordinación de proveedores en tu agenda",
    ],
    incluye: [
      "Concepto creativo y territorio de campaña",
      "Producción de todas las piezas (video, gráfica, copy)",
      "Plan de medios y distribución de presupuesto por canal",
      "Gestión de pauta en Meta, Google, TikTok y LinkedIn",
      "Landing pages y piezas de conversión",
      "Optimización continua mientras la campaña corre",
      "Reporte de resultados con aprendizajes para la siguiente",
    ],
    proceso: [
      { paso: "Concepto y plan", texto: "Objetivo, mensaje central, canales y reparto de presupuesto por medio." },
      { paso: "Producción", texto: "Creamos todas las piezas adaptadas a cada formato y canal, listas antes del lanzamiento." },
      { paso: "Activación y optimización", texto: "Lanzamos, medimos y ajustamos en vivo hasta cerrar la campaña con el reporte final." },
    ],
    paraQuien:
      "Marcas con un lanzamiento, temporada alta o momento comercial concreto, que prefieren un responsable único en lugar de coordinar cuatro proveedores.",
    factores: [
      "Duración de la campaña y número de canales",
      "Volumen de piezas y formatos a producir",
      "Presupuesto de medios a gestionar",
      "Nivel de medición e integración de datos",
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
    tagline: "Criterio senior sentado en tus reuniones, sin el costo de contratarlo full time.",
    problema:
      "Tu equipo ejecuta bien pero le falta a quién preguntarle. Las decisiones grandes —cuánto invertir, qué canal soltar, si la agencia está rindiendo— las estás tomando por intuición, y un director de marketing con esa experiencia cuesta un sueldo que hoy no se justifica.",
    desc: "Acompañamiento estratégico para equipos que ya ejecutan pero necesitan dirección. Auditamos lo que estás haciendo, identificamos qué está frenando el crecimiento y nos sentamos contigo en las decisiones, con la experiencia de años trabajando dentro de agencias globales y con marcas grandes.",
    resultado: [
      "Un diagnóstico honesto de qué está funcionando y qué no",
      "Decisiones de inversión tomadas con criterio, no por intuición",
      "Tu equipo interno subiendo de nivel en cada sesión",
      "Una opinión independiente sobre lo que te entregan tus proveedores",
      "Acceso a experiencia senior sin sumar un sueldo a la planilla",
    ],
    incluye: [
      "Auditoría de marketing y comunicación actual",
      "Diagnóstico de canales, mensajes y reparto de presupuesto",
      "Sesiones de trabajo periódicas con tu equipo",
      "Recomendaciones priorizadas y accionables, no un PDF de teoría",
      "Revisión de piezas y campañas en curso antes de que salgan",
      "Acompañamiento en decisiones de inversión y elección de proveedores",
    ],
    proceso: [
      { paso: "Auditoría", texto: "Revisamos qué se está haciendo hoy, cuánto cuesta y qué resultado está dando." },
      { paso: "Diagnóstico", texto: "Identificamos los cuellos de botella reales del crecimiento, no los síntomas visibles." },
      { paso: "Acompañamiento", texto: "Sesiones periódicas para ejecutar, revisar y corregir el rumbo con datos sobre la mesa." },
    ],
    paraQuien:
      "Empresas con equipo de marketing propio o agencia contratada, que necesitan criterio senior para dirigir y auditar en lugar de más manos para ejecutar.",
    factores: [
      "Frecuencia y duración de las sesiones",
      "Tamaño del equipo y número de marcas o unidades",
      "Alcance de la auditoría inicial",
      "Nivel de involucramiento en la ejecución",
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
    tagline: "Del concepto al after movie: eventos que siguen rindiendo como contenido.",
    problema:
      "Invertiste meses y un presupuesto grande en un evento que duró cuatro horas. Al día siguiente queda una carpeta de fotos sin editar, ningún video que valga la pena publicar, y todo el impacto se evaporó con los que estuvieron ahí.",
    desc: "Producimos eventos corporativos con mirada de marca: concepto, identidad visual, materiales, ambientación y la cobertura audiovisual completa. La diferencia es que el evento se piensa desde el inicio también como contenido, así que cuando termina te queda material para semanas de comunicación.",
    resultado: [
      "Un evento con identidad propia, no un salón con tu logo pegado",
      "Cobertura foto y video resuelta desde el mismo equipo que lo diseñó",
      "After movie y piezas para redes editadas y entregadas",
      "Material suficiente para comunicar semanas después del evento",
      "Un solo interlocutor para concepto, producción y registro",
    ],
    incluye: [
      "Concepto e identidad visual del evento",
      "Diseño de materiales, señalética y ambientación",
      "Producción audiovisual previa (teasers e invitaciones)",
      "Cobertura del evento en foto y video",
      "Edición de after movie y piezas verticales para redes",
      "Coordinación con proveedores y locación",
    ],
    proceso: [
      { paso: "Concepto", texto: "Definimos la idea, la identidad y la experiencia que va a vivir el asistente." },
      { paso: "Producción", texto: "Materiales, ambientación, teasers y coordinación de proveedores antes del día del evento." },
      { paso: "Cobertura y entrega", texto: "Registro audiovisual completo el día D y entrega de piezas editadas después." },
    ],
    paraQuien:
      "Empresas con lanzamientos, convenciones, aniversarios o activaciones que quieren que el evento comunique más allá de los que asistieron.",
    factores: [
      "Escala del evento y número de asistentes",
      "Alcance de la ambientación y materiales físicos",
      "Tamaño del equipo de cobertura audiovisual",
      "Cantidad de piezas editadas post-evento",
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
    tagline: "Jingles, identidad sonora y score original — donde casi nadie está compitiendo.",
    problema:
      "El sonido es la mitad de una pieza audiovisual y suele resolverse en los últimos veinte minutos con una pista de banco que también usan otras cien marcas. El resultado se ve bien y suena a genérico, y esa es exactamente la parte que la gente recuerda.",
    desc: "Producimos música original para tus campañas: jingles que se quedan pegados, identidad sonora de marca, score para comerciales y diseño de sonido. Combinamos motores de generación musical con producción y mezcla profesional, de modo que el resultado es tuyo y no una pista licenciada que mañana usa tu competencia.",
    resultado: [
      "Una pista original que ninguna otra marca puede usar",
      "Identidad sonora reconocible en todas tus piezas",
      "Sonido mezclado y masterizado, no música pegada encima",
      "Versiones y duraciones listas para cada formato",
      "Locución incluida, en voz real o clonada",
    ],
    incluye: [
      "Jingles y música original para campañas",
      "Identidad sonora de marca (sound logo)",
      "Score y musicalización para comerciales",
      "Diseño de sonido y efectos",
      "Locución y voces, reales o clonadas con IA",
      "Mezcla y masterización final",
      "Entrega en todas las duraciones y formatos que necesites",
    ],
    proceso: [
      { paso: "Referencia y concepto", texto: "Definimos el territorio sonoro de la marca con referencias concretas, no adjetivos." },
      { paso: "Producción", texto: "Componemos y producimos varias versiones para que elijas escuchando." },
      { paso: "Mezcla y entrega", texto: "Mezcla, masterización y adaptación a cada formato y duración." },
    ],
    paraQuien:
      "Marcas que van a sonar de forma repetida —campañas, spots, retail, radio— y quieren que ese sonido las identifique en lugar de sonar a librería.",
    factores: [
      "Duración y número de versiones",
      "Composición original vs. adaptación",
      "Instrumentación y músicos reales involucrados",
      "Locución profesional o voz clonada",
      "Alcance de la cesión de derechos",
    ],
    precio: null,
    tags: ["Jingles", "Sound logo", "Score", "Mezcla"],
  },
];

export const SERVICIOS_STACK = [
  "Higgsfield", "Kling 3.0", "Seedance 2.0", "ElevenLabs", "HeyGen", "Suno",
  "Claude Code", "ChatGPT", "Premiere Pro", "DaVinci Resolve", "CapCut Pro",
];
