// ============================================================
// SOBRE NOSOTROS — DATA EDITABLE
//
// ⚠️ PENDIENTE: la información de Julio Peña y Roberth Reyes es
// PROVISIONAL (roles, bios y trayectoria). Reemplazar con los datos
// reales. Las fotos van en /public/images/equipo/ y se cargan poniendo
// la ruta en `photo` (hoy en null → se muestra el placeholder).
// ============================================================

export type Socio = {
  n: string;
  id: string;
  nombre: string;
  iniciales: string;
  rol: string;
  accentRgb: string;
  photo: string | null;
  bio: string;
  focos: string[];
  provisional?: boolean; // marca interna: copy aún por confirmar
};

export const SOCIOS: Socio[] = [
  {
    n: "01",
    id: "manuel-severo",
    nombre: "Manuel Severo",
    iniciales: "MS",
    rol: "Socio fundador · Dirección Creativa y Producción IA",
    accentRgb: "26,128,255",
    photo: null,
    bio: "Cinco años dentro de agencias donde el error no tiene margen: Fahrenheit DDB, Quanticofilms y TBWA Perú, produciendo para Wong, BCP, Cencosud y Metro. Hoy dirige la producción con IA de Resuelto — el criterio publicitario de siempre, ejecutado con los motores de generación más avanzados del mercado.",
    focos: ["Dirección creativa", "Producción con IA", "Storytelling", "Contenido"],
  },
  {
    n: "02",
    id: "julio-pena",
    nombre: "Julio Peña",
    iniciales: "JP",
    rol: "Socio · Estrategia y Crecimiento",
    accentRgb: "219,92,140",
    photo: null,
    bio: "Lidera la estrategia comercial de la agencia: define cómo se posiciona cada marca, por qué canales sale al mercado y cómo se convierte la atención en ventas. Del plan Go-To-Market al embudo que lo sostiene.",
    focos: ["Go-To-Market", "Estrategia", "Campañas", "Consultoría"],
    provisional: true,
  },
  {
    n: "03",
    id: "roberth-reyes",
    nombre: "Roberth Reyes",
    iniciales: "RR",
    rol: "Socio · Tecnología y Automatización",
    accentRgb: "0,169,196",
    photo: null,
    bio: "Construye la infraestructura que hace que todo funcione solo: sitios web rápidos y posicionados, agentes de IA que atienden 24/7, bases de datos que capturan cada contacto y automatizaciones que trabajan cuando el equipo no está.",
    focos: ["Desarrollo web", "SEO / SEM", "Automatización", "Agentes IA"],
    provisional: true,
  },
];

// Tesis de la agencia — reemplaza la bio en primera persona.
export const MANIFIESTO = [
  "Resuelto nació de una constatación incómoda: la mayoría de los negocios con ofertas realmente valiosas comunican muy por debajo de lo que valen. No es un problema de esfuerzo — es un problema de criterio.",
  "Ese criterio se forjó adentro: años produciendo para las marcas más exigentes del país, en agencias donde una entrega mal hecha cuesta la cuenta. Wong, BCP, Cencosud, Redondos, San Fernando, WIN, Livoltek.",
  "Hoy somos tres socios que cubren el ciclo completo: la estrategia que define qué se dice, la producción con IA que lo convierte en piezas de nivel televisión, y la tecnología que hace que todo siga funcionando solo. La IA nos da velocidad. El criterio sigue siendo humano.",
];

// Los pilares que ordenan a la agencia (y que mapean a los servicios).
export const PILARES = [
  {
    n: "I",
    title: "Estrategia",
    text: "Antes de producir, decidir. Posicionamiento, segmentos, canales y embudo — el plan que hace que cada pieza tenga un trabajo que cumplir.",
  },
  {
    n: "II",
    title: "Producción",
    text: "Comerciales, contenido, diseño y sonido con motores de IA de última generación. Nivel de agencia global, entregado en semanas.",
  },
  {
    n: "III",
    title: "Tecnología",
    text: "Web, posicionamiento y automatización comercial. La infraestructura que convierte la atención en clientes, sin intervención manual.",
  },
];

// De dónde viene el criterio — trayectoria fundacional de la agencia.
export const TRAYECTORIA = [
  { year: "2019", company: "Remax Perú", text: "Primer contacto con generación de leads y conversión real. Comunicar bien mueve ventas." },
  { year: "2020", company: "Fahrenheit DDB", text: "Concepto, redacción y producción para marcas exigentes. Criterio bajo presión real." },
  { year: "2021–23", company: "Quanticofilms", text: "Contenido estratégico para marcas de alto reconocimiento e influencers de primer nivel." },
  { year: "2023", company: "TBWA Perú", text: "Agencia global top-tier. Wong, BCP, Cencosud, Metro. Estándar de clase mundial." },
  { year: "2023–24", company: "WIN · Livoltek", text: "Del contenido al sistema: conversión, presencia premium y automatización." },
  { year: "Hoy", company: "RESUELTO", text: "Tres socios, un sistema completo: estrategia, producción con IA y tecnología." },
];
