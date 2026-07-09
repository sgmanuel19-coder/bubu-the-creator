import type { SeccionRecurso } from "@/lib/taller/content";
import { SECCIONES_CLAUDE_BASE } from "@/lib/taller/boveda/guias-claude-base";
import { SECCIONES_CLAUDE_PRO } from "@/lib/taller/boveda/guias-claude-pro";
import { SECCIONES_NEGOCIO } from "@/lib/taller/boveda/guias-negocio";
import { SECCIONES_PRODUCCION } from "@/lib/taller/boveda/guias-produccion";

// Une todas las guías a fondo de la bóveda (slug → secciones).
// content.ts las adjunta a cada recurso al ensamblar BOVEDA.
// Para agregar una guía nueva: escribe sus secciones en el archivo del
// dominio que corresponda (o crea uno nuevo) y su slug debe existir en
// los arrays de BOVEDA de content.ts.
export const SECCIONES_BOVEDA: Record<string, SeccionRecurso[]> = {
  ...SECCIONES_CLAUDE_BASE,
  ...SECCIONES_CLAUDE_PRO,
  ...SECCIONES_NEGOCIO,
  ...SECCIONES_PRODUCCION,
};
