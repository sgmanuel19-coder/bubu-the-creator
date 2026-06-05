"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { SITE } from "@/lib/constants";
import { CaseCard, type Caso } from "@/components/CaseCard";
import FilterChips, { type ChipOption } from "@/components/FilterChips";

const CATEGORIES: ChipOption[] = [
  { key: "todos", label: "Todos" },
  { key: "video-producto", label: "Video Producto" },
  { key: "ugc", label: "UGC" },
  { key: "storytelling", label: "Storytelling" },
  { key: "estrategia", label: "Estrategia" },
  { key: "generativo", label: "Generativo / Visual" },
  { key: "automatizacion", label: "Automatización" },
];

const SERVICE_LABEL: Record<string, string> = {
  "video-producto": "Video Producto IA",
  "ugc": "UGC IA",
  "storytelling": "Storytelling IA",
  "estrategia": "Estrategia IA",
  "generativo": "Generativo / Visual IA",
  "automatizacion": "Automatización IA",
};

function matches(caso: Caso, cat: string) {
  return cat === "todos" || (caso.iaCategories?.includes(cat) ?? false);
}

// ── Wellmax featured card ─────────────────────────────────────────────────────
function WellmaxFeature({ caso }: { caso: Caso }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7 }}
      className="relative rounded-3xl overflow-hidden mb-8 holo-border"
    >
      <div className="relative rounded-[calc(1.5rem-1px)] grid lg:grid-cols-[1.1fr_1fr] gap-0 bg-[rgba(5,8,12,0.95)]">
        {/* Left — copy */}
        <div className="relative z-10 p-7 lg:p-10">
          <div className="flex items-center gap-3 mb-5">
            <span className="inline-flex items-center gap-1.5 text-[10px] font-display font-bold tracking-[0.2em] uppercase px-3 py-1 rounded-full"
              style={{ color: "#1A80FF", background: "rgba(26,128,255,0.12)", border: "1px solid rgba(26,128,255,0.4)" }}>
              <span className="w-1.5 h-1.5 rounded-full bg-neon-green animate-pulse" /> Cliente activo
            </span>
            <span className="text-[10px] font-display font-bold tracking-[0.2em] uppercase text-muted">
              {caso.sector}
            </span>
          </div>

          <h3 className="font-display font-extrabold text-3xl lg:text-4xl text-cream tracking-tight mb-3">
            Wellmax
          </h3>
          <p className="font-display font-semibold text-neon-green text-sm mb-4">
            Sistema de IA completo — producción 100% generada
          </p>
          <p className="font-body text-muted text-sm leading-relaxed mb-6 max-w-md">
            {caso.solution}
          </p>

          {/* 4 service chips */}
          <div className="flex flex-wrap gap-2 mb-7">
            {(caso.iaCategories ?? []).map((c) => (
              <span key={c}
                className="text-[11px] font-display font-semibold px-3 py-1.5 rounded-lg"
                style={{ background: "rgba(26,128,255,0.08)", border: "1px solid rgba(26,128,255,0.22)", color: "rgba(120,180,255,0.95)" }}>
                {SERVICE_LABEL[c] ?? c}
              </span>
            ))}
          </div>

          <Link href={`/casos/${caso.slug}`} className="btn-glow text-sm px-7 py-3 inline-flex">
            Ver el sistema Wellmax →
          </Link>
        </div>

        {/* Right — visual placeholder (videos en producción) */}
        <div className="relative min-h-[260px] lg:min-h-full overflow-hidden flex items-center justify-center"
          style={{ background: "radial-gradient(ellipse at 60% 40%, rgba(26,128,255,0.14) 0%, rgba(5,8,12,0.6) 70%)" }}>
          <div className="absolute inset-0 grid-pattern opacity-20 pointer-events-none" />
          {/* HUD corners */}
          <div className="absolute top-5 left-5 w-6 h-6 border-t-2 border-l-2 border-neon-green/50 rounded-tl" />
          <div className="absolute top-5 right-5 w-6 h-6 border-t-2 border-r-2 border-neon-green/30 rounded-tr" />
          <div className="absolute bottom-5 left-5 w-6 h-6 border-b-2 border-l-2 border-neon-purple/30 rounded-bl" />
          <div className="absolute bottom-5 right-5 w-6 h-6 border-b-2 border-r-2 border-neon-purple/50 rounded-br" />
          <div className="relative z-10 text-center px-6">
            <span className="text-5xl">💡</span>
            <p className="font-display font-bold text-cream text-sm mt-4 tracking-wide">Videos IA en producción</p>
            <p className="font-body text-muted text-[12px] mt-1 max-w-[220px] mx-auto">
              Piezas de producto, UGC y storytelling generadas con IA — próximamente aquí.
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ── Section ───────────────────────────────────────────────────────────────────
export default function IAShowcase() {
  const [cat, setCat] = useState("todos");
  const cases = SITE.proof.cases as unknown as Caso[];

  const iaCases = cases.filter((c) => c.era === "ia");
  const wellmax = iaCases.find((c) => c.status === "activo");
  const others = iaCases.filter((c) => c.status !== "activo");

  const showWellmax = wellmax && matches(wellmax, cat);
  const filteredOthers = others.filter((c) => matches(c, cat));

  return (
    <section id="produccion-ia" className="relative section-padding overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/3 w-[600px] h-[300px] rounded-full bg-neon-green/5 blur-[130px]" />
      </div>

      <div className="container-base relative z-10">
        {/* Header */}
        <div className="mb-8">
          <span className="inline-flex items-center gap-2 text-xs font-display font-semibold tracking-[0.25em] uppercase text-neon-green mb-4">
            <span className="w-6 h-px bg-neon-green/50" />
            Lo que produzco hoy
          </span>
          <h2 className="font-display font-extrabold text-3xl lg:text-5xl tracking-tight leading-[1.05]">
            Producción con IA
          </h2>
          <p className="font-body text-muted text-base mt-4 max-w-2xl">
            IA generativa integrada en cada fase — video de producto, UGC, storytelling, estrategia y automatización.
            El criterio sigue siendo humano; la velocidad y el nivel, potenciados.
          </p>
        </div>

        {/* Category filter */}
        <FilterChips options={CATEGORIES} active={cat} onSelect={setCat} color="green" />

        {/* Wellmax featured */}
        {showWellmax && <WellmaxFeature caso={wellmax!} />}

        {/* Other IA cases */}
        {filteredOthers.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredOthers.map((caso, i) => (
              <CaseCard key={caso.slug} caso={caso} index={i} forceColor="green" />
            ))}
          </div>
        ) : (
          !showWellmax && (
            <p className="font-body text-muted text-sm py-8 text-center">
              No hay piezas en esta categoría todavía — pronto.
            </p>
          )
        )}
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-neon-green/20 to-transparent" />
    </section>
  );
}
