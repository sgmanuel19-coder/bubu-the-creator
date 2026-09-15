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

// Nota: hubo una "ruta guiada" que cerraba los temas hasta terminar el
// anterior. Se quitó a propósito — el orden se sugiere en el temario
// ("sigue aquí") pero ninguna lección se bloquea, para que el alumno
// pueda entrar a ver lo que quiera cuando quiera.

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
