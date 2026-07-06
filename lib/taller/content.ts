// ============================================================
// PORTAL DEL TALLER — CONTENIDO EDITABLE
// Edita este archivo para actualizar el stream en vivo y los
// módulos del curso. No hace falta tocar nada más.
//
// Cómo obtener el ID de un video de YouTube:
//   https://www.youtube.com/watch?v=ABC123xyz  →  el ID es "ABC123xyz"
//   Sube los videos como "Oculto" (unlisted), nunca como públicos.
// ============================================================

export const TALLER = {
  nombre: "Dirección Creativa con IA",
  marca: "RESUELTO Academy",

  // ── Landing pública de /taller (estilo Skool About page) ────
  gate: {
    // Texto libre, ej. "Próxima cohorte: martes 15 de julio · 7:00 pm (Lima)".
    // Déjalo "" para ocultarlo.
    proximoTaller: "",
    // Promesa del hero (subtítulo grande debajo del nombre del taller).
    promesa:
      "Aprende a dirigir la IA como un director creativo y produce piezas publicitarias de nivel cinematográfico — sin cámara, sin equipo y sin experiencia previa.",
    // Video de venta (VSL) — ID de YouTube oculto. "" lo oculta.
    vslYoutubeId: "",
    // Prueba social, ej. "+40 alumnos ya están dentro". "" lo oculta.
    alumnos: "",
    precio: {
      monto: "S/ 350",
      nota: "pago único · incluye el en vivo y el grabado para siempre",
    },
    ctaComprar: "Unirme al taller",
    // Mensaje que llega a tu WhatsApp cuando tocan el botón de compra.
    mensajeCompra: "Hola Manuel, quiero unirme al taller Dirección Creativa con IA",
    incluye: [
      "3 días de taller en vivo con Manuel Severo",
      "Acceso al curso grabado, para verlo cuando quieras",
      "Prompts maestros y plantillas descargables",
      "Q&A en vivo para resolver tu caso",
    ],
    credenciales:
      "Dictado por Manuel Severo — ex TBWA Perú y Fahrenheit DDB. +2,000 piezas producidas para marcas como Wong, BCP, Cencosud y Redondos.",
    // Testimonios de alumnos reales. [] oculta la sección — no inventes.
    testimonios: [] as { texto: string; nombre: string }[],
    faq: [
      {
        q: "¿Cómo recibo mi acceso después de pagar?",
        a: "Te enviamos la contraseña del portal a tu correo el mismo día. Con ella entras al taller en vivo y al curso grabado desde cualquier dispositivo.",
      },
      {
        q: "¿Necesito experiencia con IA o con edición?",
        a: "No. El taller empieza desde el criterio creativo y te lleva paso a paso por las herramientas. Si sabes usar un navegador, puedes con esto.",
      },
      {
        q: "¿Qué herramientas se usan y cuánto cuestan?",
        a: "Trabajamos con Higgsfield, Kling y Seedance. Puedes empezar con sus planes de entrada; en el taller te digo exactamente cuál conviene según tu caso.",
      },
      {
        q: "¿Hasta cuándo tengo acceso al grabado?",
        a: "Para siempre. El curso queda en tu portal y se actualiza cuando mejoro el material.",
      },
    ],
  },

  // ── Próximas sesiones (Calendar) ────────────────────────────
  // fecha en formato ISO con zona Lima: "2026-07-15T19:00:00-05:00"
  sesiones: [] as { titulo: string; fecha: string; duracionMin: number }[],

  // ── Transmisión en vivo ─────────────────────────────────────
  enVivo: {
    // ID del video de YouTube Live (déjalo "" si aún no creas el stream).
    youtubeId: "",
    // Fecha y hora del próximo en vivo (hora de Lima, GMT-5).
    // Formato: "2026-07-15T19:00:00-05:00". Déjalo "" si no hay fecha.
    proximaFecha: "",
    titulo: "Taller en vivo",
    descripcion:
      "La transmisión se activa aquí mismo el día del taller. Entra unos minutos antes con esta misma contraseña.",
    // Agenda del día — se muestra junto al stream. Déjala [] para ocultarla.
    agenda: [] as string[],
  },

  // ── Recursos descargables ───────────────────────────────────
  // url: link de Google Drive/Notion/PDF. disponible: false lo muestra
  // como "próximamente" sin link.
  recursos: [
    {
      titulo: "Prompts maestros del taller",
      descripcion: "Los prompts exactos que uso para dirección de arte y generación cinematográfica.",
      url: "",
      disponible: false,
    },
    {
      titulo: "Plantilla de guion publicitario",
      descripcion: "La estructura con la que escribo cada pieza antes de generarla.",
      url: "",
      disponible: false,
    },
  ],

  // ── CTA de venta (al final del curso) ───────────────────────
  venta: {
    titulo: "¿Quieres que este sistema trabaje para tu marca?",
    texto:
      "Lo que viste en el taller es exactamente lo que implemento para empresas: estrategia, producción cinematográfica con IA y sistema de contenido funcionando en 60 días. Si quieres que lo instale contigo, hablemos.",
    ctaPrincipal: "Agendar una llamada con Manuel",
    urlCalendly: "https://calendly.com/sgmanuel19/30min",
    ctaSecundario: "Escribir por WhatsApp",
  },

  // ── Curso en módulos ────────────────────────────────────────
  modulos: [
    {
      titulo: "Día 1 — Fundamentos de dirección creativa con IA",
      descripcion:
        "El criterio antes que la herramienta: cómo piensa un director creativo y cómo trasladar ese criterio a la IA.",
      disponible: true,
      lecciones: [
        {
          titulo: "Bienvenida y método del taller",
          duracion: "08:00",
          youtubeId: "",
        },
        {
          titulo: "El stack de producción IA (Higgsfield, Kling, Seedance)",
          duracion: "22:00",
          youtubeId: "",
        },
      ],
    },
    {
      titulo: "Día 2 — Producción cinematográfica con IA",
      descripcion:
        "De la idea al video terminado: prompts maestros, dirección de arte y generación de escenas con nivel publicitario.",
      disponible: true,
      lecciones: [
        {
          titulo: "Prompt engineering cinematográfico",
          duracion: "25:00",
          youtubeId: "",
        },
        {
          titulo: "Generación y edición de la pieza final",
          duracion: "30:00",
          youtubeId: "",
        },
      ],
    },
    {
      titulo: "Día 3 — Sistema y salida comercial",
      descripcion:
        "Cómo convertir lo aprendido en un sistema repetible y en piezas que venden.",
      disponible: false,
      lecciones: [
        {
          titulo: "El sistema completo en acción",
          duracion: "28:00",
          youtubeId: "",
        },
      ],
    },
  ],

  // ── Contacto para soporte ───────────────────────────────────
  whatsapp: "https://wa.me/51932844074",
};

export type Modulo = (typeof TALLER.modulos)[number];
export type Leccion = Modulo["lecciones"][number];
