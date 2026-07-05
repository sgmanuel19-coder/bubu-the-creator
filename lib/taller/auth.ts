// Auth por contraseña compartida para el portal /taller.
// La cookie guarda el SHA-256 de la contraseña vigente: cambiar
// TALLER_PASSWORD en Vercel invalida automáticamente todas las sesiones.
// Usa Web Crypto para que funcione igual en middleware (edge) y en Node.

export const TALLER_COOKIE = "taller_session";
export const TALLER_SESSION_DAYS = 30;

export async function hashPassword(password: string): Promise<string> {
  const data = new TextEncoder().encode(`resuelto-taller:${password}`);
  const digest = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

export async function isValidSession(
  cookieValue: string | undefined,
): Promise<boolean> {
  const password = process.env.TALLER_PASSWORD;
  if (!password || !cookieValue) return false;
  return cookieValue === (await hashPassword(password));
}
