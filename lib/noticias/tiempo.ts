// ============================================================
// LA NOTICIA — formato de tiempo
//
// Vive aparte de feed.ts (que es "server-only") porque lo usan las
// dos orillas: el servidor lo pinta en el HTML y el navegador lo
// recalcula para que no se congele. Ver TiempoRelativo.tsx.
// ============================================================

const fmtFecha = new Intl.DateTimeFormat("es-PE", {
  day: "numeric",
  month: "short",
  timeZone: "America/Lima",
});

const fmtHora = new Intl.DateTimeFormat("es-PE", {
  hour: "2-digit",
  minute: "2-digit",
  timeZone: "America/Lima",
});

/**
 * "hace 2 horas" en vez de "24 ago. · 11:31".
 *
 * Es la convención de la prensa en español (Xataka, El País) y no es
 * cosmética: le ahorra al lector la aritmética mental y hace que el
 * portal se lea vivo. Pasadas 48 h el tiempo relativo deja de ubicar
 * a nadie ("hace 5 días"), así que ahí vuelve la fecha.
 */
export function sello(fecha: Date, ahora: number): string {
  const minutos = Math.round((ahora - fecha.getTime()) / 60_000);

  if (minutos < 1) return "ahora mismo";
  if (minutos < 60) return `hace ${minutos} ${minutos === 1 ? "minuto" : "minutos"}`;

  const horas = Math.round(minutos / 60);
  if (horas < 48) return `hace ${horas} ${horas === 1 ? "hora" : "horas"}`;

  return `${fmtFecha.format(fecha)} · ${fmtHora.format(fecha)}`;
}
