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

  // ── Puerta de entrada (lo que ve quien aún no tiene contraseña)
  gate: {
    // Texto libre, ej. "Próxima cohorte: martes 15 de julio · 7:00 pm (Lima)".
    // Déjalo "" para ocultarlo.
    proximoTaller: "",
    incluye: [
      "3 días de taller en vivo con Manuel Severo",
      "Acceso al curso grabado, para verlo cuando quieras",
      "Prompts maestros y plantillas descargables",
      "Q&A en vivo para resolver tu caso",
    ],
    credenciales:
      "Dictado por Manuel Severo — ex TBWA Perú y Fahrenheit DDB. +2,000 piezas producidas para marcas como Wong, BCP, Cencosud y Redondos.",
  },

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
