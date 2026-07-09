// Auth por contraseñas compartidas con NIVELES para el portal /taller.
//
// Niveles (scopes): "todo" (maestro), "vivo", "grabado" y uno por cada
// recurso premium de la bóveda (su slug). Las contraseñas viven en la env
// TALLER_PASSWORDS (JSON nivel → contraseña) en Vercel; TALLER_PASSWORD
// sigue funcionando como "todo" (compatibilidad con alumnos actuales).
//
// Cookie taller_niveles = "nivel:token|nivel:token" donde
// token = SHA-256("nivel|contraseña vigente"): cambiar una contraseña en
// Vercel invalida SOLO las sesiones de ese nivel. La cookie legada
// taller_session (hash de TALLER_PASSWORD) vale como "todo".
//
// Usa Web Crypto para que funcione igual en middleware (edge) y en Node.

export const TALLER_COOKIE = "taller_session"; // legada (= nivel "todo")
export const NIVELES_COOKIE = "taller_niveles";
export const TALLER_SESSION_DAYS = 30;

export async function hashPassword(password: string): Promise<string> {
  const data = new TextEncoder().encode(`resuelto-taller:${password}`);
  const digest = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

// Mapa nivel → contraseña desde las envs. Nunca llega al cliente:
// solo se usa en rutas de API y páginas server-side.
export function passwordsPorNivel(): Record<string, string> {
  let mapa: Record<string, string> = {};
  try {
    const crudo = JSON.parse(process.env.TALLER_PASSWORDS ?? "{}");
    for (const [nivel, pass] of Object.entries(crudo)) {
      if (typeof pass === "string" && pass.length > 0) mapa[nivel] = pass;
    }
  } catch {
    mapa = {};
  }
  if (process.env.TALLER_PASSWORD && !mapa.todo) {
    mapa.todo = process.env.TALLER_PASSWORD;
  }
  return mapa;
}

// Token de sesión de un nivel: atado a su contraseña vigente.
export async function tokenDeNivel(nivel: string, password: string): Promise<string> {
  return hashPassword(`${nivel}|${password}`);
}

export function parseNiveles(cookieValue: string | undefined): Map<string, string> {
  const mapa = new Map<string, string>();
  if (!cookieValue) return mapa;
  for (const par of cookieValue.split("|")) {
    const idx = par.indexOf(":");
    if (idx > 0) mapa.set(par.slice(0, idx), par.slice(idx + 1));
  }
  return mapa;
}

export function serializarNiveles(mapa: Map<string, string>): string {
  return [...mapa.entries()].map(([n, t]) => `${n}:${t}`).join("|");
}

// Niveles con token válido dentro de la cookie de niveles (+ la cookie
// legada, que cuenta como "todo").
export async function nivelesValidos(
  nivelesCookie: string | undefined,
  legadaCookie: string | undefined,
): Promise<string[]> {
  const configuradas = passwordsPorNivel();
  const activos = new Set<string>();

  const presentes = parseNiveles(nivelesCookie);
  for (const [nivel, token] of presentes) {
    const pass = configuradas[nivel];
    if (pass && token === (await tokenDeNivel(nivel, pass))) activos.add(nivel);
  }

  if (legadaCookie && configuradas.todo) {
    if (legadaCookie === (await hashPassword(configuradas.todo))) activos.add("todo");
  }

  return [...activos];
}

// Compatibilidad con el middleware/código existente (cookie legada).
export async function isValidSession(
  cookieValue: string | undefined,
): Promise<boolean> {
  const password = process.env.TALLER_PASSWORD;
  if (!password || !cookieValue) return false;
  return cookieValue === (await hashPassword(password));
}
