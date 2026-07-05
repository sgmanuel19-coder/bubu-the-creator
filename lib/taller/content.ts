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
