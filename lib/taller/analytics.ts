// Eventos de medición del portal (Vercel Analytics).
// Se ven en Vercel → Analytics → Events. Nunca rompen la página si
// analytics no está disponible.

import { track } from "@vercel/analytics";

export type TallerEvento =
  | "taller_login"
  | "taller_registro"
  | "taller_leccion_vista"
  // abierta ≠ completada: "completada" la dispara el reproductor al 80%
  | "taller_leccion_completada"
  | "taller_cta_venta"
  | "taller_cta_comprar"
  | "taller_recurso"
  | "taller_pregunta_vivo"
  | "taller_calendario"
  | "taller_asistente"
  | "taller_pago"
  | "taller_desbloqueo"
  | "taller_diploma_abrir"
  | "taller_diploma_descarga";

export function trackTaller(
  evento: TallerEvento,
  props?: Record<string, string>,
) {
  try {
    track(evento, props);
  } catch {
    // sin analytics no pasa nada
  }
}

// Eventos estándar del Pixel de Meta (brief sección 6). Solo dispara si el
// pixel está activo (requiere consentimiento de cookies — FacebookPixel.tsx).
// Purchase se registra en Hotmart con su propia integración de pixel.
export function trackMeta(
  evento: "ViewContent" | "InitiateCheckout",
  props?: Record<string, string>,
) {
  try {
    const fbq = (window as unknown as { fbq?: (...args: unknown[]) => void }).fbq;
    fbq?.("track", evento, props);
  } catch {
    // sin pixel no pasa nada
  }
}
