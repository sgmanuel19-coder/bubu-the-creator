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

export function getUltimaLeccion(): string | null {
  return safeGet(ULTIMA_KEY);
}

export function setUltimaLeccion(youtubeId: string) {
  safeSet(ULTIMA_KEY, youtubeId);
}
