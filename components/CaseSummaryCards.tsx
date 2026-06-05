"use client";

import { SITE } from "@/lib/constants";
import { type Caso } from "@/components/CaseCard";
import CaseBlock from "@/components/CaseBlock";

export default function CaseSummaryCards() {
  // Deep cases with real portfolio imagery (exclude the image-less active-only entries)
  const cases = (SITE.proof.cases as unknown as Caso[]).filter(
    (c) => c.slug !== "wellmax" && c.slug !== "resuelto-ia"
  );

  return (
    <section id="casos-destacados" className="relative section-padding">
      <div className="container-base">
        {/* Header */}
        <div className="max-w-2xl mb-4">
          <span className="font-display text-[11px] font-semibold tracking-[0.28em] uppercase text-neon-green mb-5 block">
            Casos destacados
          </span>
          <h2 className="font-display font-extrabold text-cream tracking-tight leading-[1.05] mb-5"
            style={{ fontSize: "clamp(2rem, 4.2vw, 3.4rem)" }}>
            Años de ejecución para marcas líderes
          </h2>
          <p className="font-body text-muted text-[15px] leading-relaxed">
            El criterio detrás del sistema. Producción de alto nivel en telecom, energía B2B, retail premium,
            FMCG y entretenimiento — con resultados medibles, no promesas.
          </p>
        </div>

        {/* Editorial blocks, alternating */}
        <div className="divide-y divide-cream/8">
          {cases.map((caso, i) => (
            <CaseBlock key={caso.slug} caso={caso} index={i} reverse={i % 2 === 1} />
          ))}
        </div>
      </div>
    </section>
  );
}
