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
import { SECCIONES_IA_EN_ACCION } from "@/lib/taller/boveda/guias-ia-en-accion";
import { SECCIONES_EMPIEZA_AQUI } from "@/lib/taller/boveda/guias-empieza-aqui";
import { AMPLIACIONES_IA_EN_ACCION } from "@/lib/taller/boveda/guias-ia-en-accion-ampliaciones";
import { SECCIONES_COBRAR } from "@/lib/taller/boveda/guias-masterclass-cobrar";
import { AMPLIACIONES } from "@/lib/taller/boveda/guias-ampliaciones";

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
  ...SECCIONES_IA_EN_ACCION,
  ...SECCIONES_EMPIEZA_AQUI,
  ...SECCIONES_COBRAR,
};

// Secciones que se SUMAN al final de una guía que ya existía, sin
// reemplazar nada:
//  · AMPLIACIONES_IA_EN_ACCION → el paso a paso que IA en Acción añade
//    a tres guías de producción.
//  · AMPLIACIONES → el detalle con que se alargan las guías que se
//    habían quedado cortas (concepto, ejemplo desarrollado y
//    comprobación de lectura).
for (const grupo of [AMPLIACIONES_IA_EN_ACCION, AMPLIACIONES]) {
  for (const [slug, extra] of Object.entries(grupo)) {
    SECCIONES_BOVEDA[slug] = [...(SECCIONES_BOVEDA[slug] ?? []), ...extra];
  }
}
