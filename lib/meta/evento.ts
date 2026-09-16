/**
 * Un evento de Meta por los dos canales a la vez.
 *
 * El Pixel del navegador se pierde con los bloqueadores y con iOS; la
 * Conversions API sale del servidor y sobrevive a los dos. Meta deduplica
 * ambos por `eventID`, así que mandar los dos no infla la cuenta.
 *
 * Solo dispara si el visitante aceptó cookies: sin consentimiento, `fbq`
 * no existe y no se llama a CAPI tampoco.
 */

type Datos = {
  contentName?: string;
  /** La ruta, para separar en Events Manager la pauta del orgánico. */
  contentCategory?: string;
  value?: number;
  currency?: string;
};

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

function leerCookie(nombre: string): string | undefined {
  return document.cookie
    .split("; ")
    .find((c) => c.startsWith(`${nombre}=`))
    ?.split("=")[1];
}

export function eventoMeta(nombre: string, datos: Datos = {}): void {
  if (typeof window === "undefined" || typeof window.fbq !== "function") return;

  const eventId = `${nombre.toLowerCase()}.${Date.now()}.${Math.random()
    .toString(36)
    .slice(2, 10)}`;
  const contentCategory = datos.contentCategory ?? window.location.pathname;

  window.fbq(
    "track",
    nombre,
    {
      ...(datos.contentName ? { content_name: datos.contentName } : {}),
      content_category: contentCategory,
      ...(datos.value !== undefined ? { value: datos.value } : {}),
      ...(datos.currency ? { currency: datos.currency } : {}),
    },
    { eventID: eventId },
  );

  // `keepalive` deja que la petición termine de salir aunque el navegador
  // ya se esté yendo a la pasarela de pago.
  fetch("/api/meta/capi", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    keepalive: true,
    body: JSON.stringify({
      eventName: nombre,
      eventId,
      eventSourceUrl: window.location.href,
      contentName: datos.contentName,
      contentCategory,
      value: datos.value,
      currency: datos.currency,
      fbp: leerCookie("_fbp"),
      fbc: leerCookie("_fbc"),
    }),
  }).catch(() => {
    // Si CAPI falla, el Pixel del navegador ya cubrió el evento.
  });
}
