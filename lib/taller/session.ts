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

// Escalera de acceso: quien tiene un nivel de la derecha también desbloquea
// los de la izquierda. "vivo" incluye "grabado", que a su vez incluye
// "boveda" — así Manuel solo manda UN link mágico por compra en vez de uno
// por cada nivel que el producto dice incluir.
const HEREDA: Record<string, string[]> = {
  grabado: ["boveda"],
  vivo: ["grabado", "boveda"],
};

// Sin argumento: ¿tiene ALGÚN nivel válido? (nav, landing, calendario).
// Con nivel: ¿tiene ese nivel, uno superior en la escalera, o "todo"?
export async function estaDesbloqueado(nivel?: string): Promise<boolean> {
  const lista = await activos();
  if (!nivel) return lista.length > 0;
  if (lista.includes("todo") || lista.includes(nivel)) return true;
  return lista.some((activo) => (HEREDA[activo] ?? []).includes(nivel));
}

// Lista de niveles válidos (la bóveda marca los premium desbloqueados).
export async function nivelesActivos(): Promise<string[]> {
  return activos();
}

// Versión expandida con los niveles heredados por la escalera (ej. "vivo"
// también cuenta como "grabado" y "boveda"). Úsala cuando un componente
// CLIENTE necesita decidir tarjeta por tarjeta qué nivel le hace falta,
// sin reimplementar la escalera en el navegador.
export async function nivelesEfectivos(): Promise<string[]> {
  const lista = await activos();
  const set = new Set(lista);
  for (const n of lista) for (const heredado of HEREDA[n] ?? []) set.add(heredado);
  return [...set];
}
