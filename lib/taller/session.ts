import { cookies } from "next/headers";
import { isValidSession, TALLER_COOKIE } from "@/lib/taller/auth";

// Lee la cookie de sesión en el servidor. Las páginas del portal la usan
// para decidir si muestran el contenido real (alumno) o la vista previa
// bloqueada (público). Nunca se filtran videos/URLs si está bloqueado.
export async function estaDesbloqueado(): Promise<boolean> {
  const store = await cookies();
  return isValidSession(store.get(TALLER_COOKIE)?.value);
}
