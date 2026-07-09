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
