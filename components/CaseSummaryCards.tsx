"use client";

import { useState, useMemo } from "react";
import { SITE } from "@/lib/constants";
import { CaseCard, type Caso } from "@/components/CaseCard";
import FilterChips, { type ChipOption } from "@/components/FilterChips";

const INDUSTRY_LABEL: Record<string, string> = {
  retail: "Retail & Consumo",
  fmcg: "Alimentos / FMCG",
  entretenimiento: "Entretenimiento",
  telecom: "Telecom",
  energia: "Energía / B2B",
  servicios: "B2B / Servicios",
};

export default function CaseSummaryCards() {
  const cases = SITE.proof.cases as unknown as Caso[];
  const tradicional = useMemo(() => cases.filter((c) => c.era === "tradicional"), [cases]);

  // Build industry chips from present cases
  const options: ChipOption[] = useMemo(() => {
    const seen = new Set<string>();
    const opts: ChipOption[] = [{ key: "todos", label: "Todos" }];
    for (const c of tradicional) {
      const ind = c.industry ?? "otros";
      if (!seen.has(ind)) {
        seen.add(ind);
        opts.push({ key: ind, label: INDUSTRY_LABEL[ind] ?? ind });
      }
    }
    return opts;
  }, [tradicional]);

  const [industry, setIndustry] = useState("todos");
  const filtered = industry === "todos" ? tradicional : tradicional.filter((c) => c.industry === industry);

  return (
    <section id="casos-destacados" className="relative section-padding overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-neon-purple/20 to-neon-green/20" />

      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 right-1/4 w-[500px] h-[300px] rounded-full bg-neon-purple/5 blur-[120px]" />
      </div>

      <div className="container-base relative z-10">
        {/* Header */}
        <div className="mb-8">
          <span className="inline-flex items-center gap-2 text-xs font-display font-semibold tracking-[0.2em] uppercase text-neon-purple mb-4">
            <span className="w-6 h-px bg-neon-purple/50" />
            Casos destacados
          </span>
          <h2 className="font-display font-bold text-2xl lg:text-4xl tracking-tight mb-3">
            Años de ejecución real para marcas líderes
          </h2>
          <p className="font-body text-muted text-sm max-w-xl">
            La base de criterio detrás del sistema. Producción de alto nivel para retail, FMCG y entretenimiento —
            con resultados medibles. Pasa el cursor para ver la historia.
          </p>
        </div>

        {/* Industry filter */}
        <FilterChips options={options} active={industry} onSelect={setIndustry} color="purple" />

        {/* Case cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((caso, i) => (
            <CaseCard key={caso.slug} caso={caso} index={i} forceColor="purple" />
          ))}
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-neon-purple/20 to-transparent" />
    </section>
  );
}
