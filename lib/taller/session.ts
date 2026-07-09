import { cookies } from "next/headers";
import { NIVELES_COOKIE, nivelesValidos, TALLER_COOKIE } from "@/lib/taller/auth";

// Lee las cookies de sesión en el servidor. Las páginas del portal las usan
// para decidir si muestran el contenido real o la vista previa bloqueada.
// Nunca se filtran videos/URLs/descargas si el nivel no alcanza.

async function activos(): Promise<string[]> {
  const store = await cookies();
  return nivelesValidos(
    store.get(NIVELES_COOKIE)?.value,
    store.get(TALLER_COOKIE)?.value,
  );
}

// Sin argumento: ¿tiene ALGÚN nivel válido? (nav, landing, calendario).
// Con nivel: ¿tiene ese nivel o el acceso maestro "todo"?
export async function estaDesbloqueado(nivel?: string): Promise<boolean> {
  const lista = await activos();
  if (!nivel) return lista.length > 0;
  return lista.includes("todo") || lista.includes(nivel);
}

// Lista de niveles válidos (la bóveda marca los premium desbloqueados).
export async function nivelesActivos(): Promise<string[]> {
  return activos();
}
