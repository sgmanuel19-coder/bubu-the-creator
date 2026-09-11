// ═══════════════════════════════════════════════════════════════
// BÓVEDA COMPLETA — SOLO SERVIDOR
// ═══════════════════════════════════════════════════════════════
// Une los recursos de content.ts con sus guías a fondo (secciones).
// ⚠️ NUNCA importar este módulo desde un componente "use client":
// el contenido de pago terminaría dentro del JS del navegador.
// Los componentes cliente reciben solo RecursoTarjeta (sin contenido)
// o el recurso ya despojado por la página server-side.

import {
  BOVEDA_BASE,
  TALLER,
  type RecursoBoveda,
  type RecursoTarjeta,
} from "@/lib/taller/content";
import { SECCIONES_BOVEDA } from "@/lib/taller/boveda/secciones";

// La bóveda completa, con las guías a fondo unidas por slug.
export const BOVEDA: RecursoBoveda[] = BOVEDA_BASE.map((r) => ({
  ...r,
  secciones: SECCIONES_BOVEDA[r.slug] ?? r.secciones,
}));

export function bovedaGlobal(): RecursoBoveda[] {
  return BOVEDA;
}

export function recursoBovedaPorSlug(slug: string): RecursoBoveda | undefined {
  return BOVEDA.find((r) => r.slug === slug);
}

// Versión segura para listados en cliente: sin secciones, contenido ni
// URLs de descarga (solo el conteo).
export function bovedaParaTarjetas(): RecursoTarjeta[] {
  return BOVEDA.map(({ secciones: _s, contenido: _c, descargas, ...tarjeta }) => ({
    ...tarjeta,
    nDescargas: descargas?.length ?? 0,
  }));
}

// ── Novedades ────────────────────────────────────────────────────
// Las guías con `publicado` generan su entrada en Novedades solas,
// agrupadas por día (y bajo el nombre del curso cuando todas son del
// mismo). Las manuales de TALLER.novedades van después. Así el tablón
// se mueve con cada publicación sin escribir nada a mano.
export type Novedad = { fecha: string; titulo: string; texto: string; href?: string };

const MESES = ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"];
function fechaCorta(iso: string): string {
  const [y, m, d] = iso.split("-").map(Number);
  return `${d} ${MESES[(m ?? 1) - 1]} ${y}`;
}

export function novedadesGlobales(): Novedad[] {
  const porDia = new Map<string, RecursoBoveda[]>();
  for (const r of BOVEDA) {
    if (!r.publicado || !r.disponible) continue;
    porDia.set(r.publicado, [...(porDia.get(r.publicado) ?? []), r]);
  }

  const derivadas: Novedad[] = [...porDia.entries()]
    .sort(([a], [b]) => (a < b ? 1 : -1))
    .map(([iso, guias]) => {
      const cursos = new Set(guias.map((g) => g.cursoRelacionado).filter(Boolean));
      const curso = cursos.size === 1 ? [...cursos][0] : undefined;
      const cursoSlug = curso ? TALLER.cursos.find((c) => c.titulo === curso)?.slug : undefined;
      const n = guias.length;

      if (n === 1) {
        const g = guias[0];
        return {
          fecha: fechaCorta(iso),
          titulo: `Nueva guía: ${g.titulo}`,
          texto: g.descripcion,
          href: `/taller/recursos/${g.slug}`,
        };
      }
      return {
        fecha: fechaCorta(iso),
        titulo: curso ? `${curso}: ${n} lecturas nuevas` : `${n} guías nuevas en la bóveda`,
        texto: guias.map((g) => g.titulo).join(" · "),
        href: cursoSlug ? `/taller/curso/${cursoSlug}` : "/taller/recursos",
      };
    });

  return [...derivadas, ...TALLER.novedades];
}
