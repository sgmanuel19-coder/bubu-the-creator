"use client";

import { motion } from "framer-motion";
import { SITE } from "@/lib/constants";

interface Industry {
  key: string;
  icon: string;
  label: string;
  brands: string[];
  highlight?: boolean;
}

export default function IndustryGrid() {
  const proof = SITE.proof as unknown as {
    industriesTitle: string;
    industriesSubtitle: string;
    industries: Industry[];
  };
  const { industriesTitle, industriesSubtitle, industries } = proof;

  return (
    <section id="industrias" className="relative section-padding">
      <div className="container-base">
        {/* Header */}
        <div className="max-w-2xl mb-12">
          <span className="font-display text-[11px] font-semibold tracking-[0.28em] uppercase text-neon-green mb-5 block">
            Rango de industrias
          </span>
          <h2 className="font-display font-extrabold text-cream tracking-tight leading-[1.05] mb-5"
            style={{ fontSize: "clamp(2rem, 4.2vw, 3.4rem)" }}>
            {industriesTitle}
          </h2>
          <p className="font-body text-muted text-[15px] leading-relaxed">{industriesSubtitle}</p>
        </div>

        {/* Matrix */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px rounded-2xl overflow-hidden"
          style={{ background: "rgba(244,240,222,0.08)" }}>
          {industries.map((ind, i) => {
            const isHi = !!ind.highlight;
            return (
              <motion.div
                key={ind.key}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ duration: 0.4, delay: (i % 3) * 0.05 }}
                className="group relative bg-bg p-6 transition-colors hover:bg-[rgba(26,128,255,0.03)]"
              >
                <div className="flex items-baseline justify-between gap-3 mb-4">
                  <h3 className="font-display font-bold text-cream text-[15px] tracking-tight">{ind.label}</h3>
                  {isHi && (
                    <span className="font-display text-[9px] font-bold tracking-[0.18em] uppercase text-neon-green shrink-0">
                      Fuerte
                    </span>
                  )}
                </div>
                <div className="flex flex-wrap gap-x-3 gap-y-1.5">
                  {ind.brands.map((b, j) => (
                    <span key={b} className="font-body text-[13px] text-muted">
                      {b}{j < ind.brands.length - 1 && <span className="text-cream/15 ml-3">·</span>}
                    </span>
                  ))}
                </div>
                {isHi && (
                  <span className="absolute left-0 top-0 bottom-0 w-px bg-neon-green/40" />
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
