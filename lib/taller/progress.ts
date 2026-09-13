// Progreso del alumno guardado en el navegador (localStorage).
// Sin cuentas individuales este es el máximo rastreo posible: vive por
// dispositivo. Al migrar a Supabase, estas funciones se reemplazan por
// lecturas/escrituras a la base de datos sin tocar los componentes.

const VISTAS_KEY = "taller_vistas_v1";
const ULTIMA_KEY = "taller_ultima_v1";

function safeGet(key: string): string | null {
  try {
    return window.localStorage.getItem(key);
  } catch {
    return null;
  }
}

function safeSet(key: string, value: string) {
  try {
    window.localStorage.setItem(key, value);
  } catch {
    // modo incógnito estricto / storage lleno — el portal sigue funcionando
  }
}

export function getVistas(): Record<string, boolean> {
  const raw = safeGet(VISTAS_KEY);
  if (!raw) return {};
  try {
    const parsed = JSON.parse(raw);
    return parsed && typeof parsed === "object" ? parsed : {};
  } catch {
    return {};
  }
}

export function setVista(youtubeId: string, vista: boolean) {
  const vistas = getVistas();
  if (vista) vistas[youtubeId] = true;
  else delete vistas[youtubeId];
  safeSet(VISTAS_KEY, JSON.stringify(vistas));
}

// ── Ruta guiada ─────────────────────────────────────────────────
// Con la ruta activa (por defecto), cada tema se abre al terminar el
// anterior: obliga a pasar por todo en orden. El alumno puede apagarla
// para ver el temario completo y saltar donde quiera; la preferencia se
// guarda por dispositivo, igual que el progreso.
const RUTA_KEY = "taller_ruta_v1";

export function getModoRuta(): boolean {
  return safeGet(RUTA_KEY) !== "0";
}

export function setModoRuta(activa: boolean) {
  safeSet(RUTA_KEY, activa ? "1" : "0");
}

// Marca un artículo como leído y avisa a la página: el lector paso a
// paso lo llama al terminar, y el botón "Lo leí" se pone al día sin
// recargar.
export const EVENTO_LEIDO = "taller:leido";

export function marcarLeido(slug: string) {
  setVista(`leido:${slug}`, true);
  try {
    window.dispatchEvent(new CustomEvent(EVENTO_LEIDO, { detail: slug }));
  } catch {
    // sin window (render en servidor): no hay a quién avisar
  }
}

// ── Lector paso a paso ──────────────────────────────────────────
// null = el alumno no ha elegido, y cada artículo aplica su default
// (clase paso a paso en el material de alumno, lectura corrida en las
// guías gratis, que son vitrina pública).
const LECTOR_KEY = "taller_lector_v1";

export function getModoPasos(): boolean | null {
  const raw = safeGet(LECTOR_KEY);
  return raw === null ? null : raw === "1";
}

export function setModoPasos(activo: boolean) {
  safeSet(LECTOR_KEY, activo ? "1" : "0");
}

export function getUltimaLeccion(): string | null {
  return safeGet(ULTIMA_KEY);
}

export function setUltimaLeccion(youtubeId: string) {
  safeSet(ULTIMA_KEY, youtubeId);
}
