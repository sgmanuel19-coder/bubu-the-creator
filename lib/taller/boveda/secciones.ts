import type { SeccionRecurso } from "@/lib/taller/content";
import { SECCIONES_CLAUDE_BASE } from "@/lib/taller/boveda/guias-claude-base";
import { SECCIONES_CLAUDE_PRO } from "@/lib/taller/boveda/guias-claude-pro";
import { SECCIONES_NEGOCIO } from "@/lib/taller/boveda/guias-negocio";
import { SECCIONES_PRODUCCION } from "@/lib/taller/boveda/guias-produccion";
import { SECCIONES_CREATIVIDAD } from "@/lib/taller/boveda/guias-creatividad";
import { SECCIONES_NARRATIVA } from "@/lib/taller/boveda/guias-narrativa";
import { SECCIONES_HIGGSFIELD } from "@/lib/taller/boveda/guias-higgsfield";
import { SECCIONES_MASTERCLASS } from "@/lib/taller/boveda/guias-masterclass";
import { SECCIONES_REPOS_SKILLS } from "@/lib/taller/boveda/guias-repos-skills";
import { SECCIONES_REPOS_DATOS } from "@/lib/taller/boveda/guias-repos-datos";

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
  ...SECCIONES_CREATIVIDAD,
  ...SECCIONES_NARRATIVA,
  ...SECCIONES_HIGGSFIELD,
  ...SECCIONES_MASTERCLASS,
  ...SECCIONES_REPOS_SKILLS,
  ...SECCIONES_REPOS_DATOS,
};
