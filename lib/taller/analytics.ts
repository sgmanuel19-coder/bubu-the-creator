// Eventos de medición del portal (Vercel Analytics).
// Se ven en Vercel → Analytics → Events. Nunca rompen la página si
// analytics no está disponible.

import { track } from "@vercel/analytics";

export type TallerEvento =
  | "taller_login"
  | "taller_registro"
  | "taller_leccion_vista"
  | "taller_cta_venta"
  | "taller_recurso"
  | "taller_pregunta_vivo";

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
