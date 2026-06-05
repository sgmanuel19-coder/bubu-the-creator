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
    <section id="industrias" className="relative section-padding overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-neon-green/15 to-neon-purple/15" />

      <div className="container-base relative z-10">
        <div className="mb-10 max-w-2xl">
          <span className="inline-flex items-center gap-2 text-xs font-display font-semibold tracking-[0.2em] uppercase text-neon-green mb-4">
            <span className="w-6 h-px bg-neon-green/50" />
            Rango de industrias
          </span>
          <h2 className="font-display font-bold text-2xl lg:text-4xl tracking-tight mb-3">
            {industriesTitle}
          </h2>
          <p className="font-body text-muted text-sm">{industriesSubtitle}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {industries.map((ind, i) => {
            const isHi = !!ind.highlight;
            const rgb = isHi ? "26,128,255" : "77,159,255";
            return (
              <motion.div
                key={ind.key}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ duration: 0.45, delay: (i % 3) * 0.06 }}
                className="relative rounded-xl p-5 overflow-hidden"
                style={{
                  background: isHi ? `rgba(${rgb},0.05)` : "rgba(5,7,10,0.7)",
                  border: `1px solid rgba(${rgb},${isHi ? 0.3 : 0.12})`,
                }}
              >
                {isHi && (
                  <span className="absolute top-3 right-3 text-[8px] font-display font-bold tracking-widest uppercase px-2 py-0.5 rounded-full"
                    style={{ color: "#1A80FF", background: "rgba(26,128,255,0.12)", border: "1px solid rgba(26,128,255,0.3)" }}>
                    Fuerte
                  </span>
                )}
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-2xl">{ind.icon}</span>
                  <h3 className="font-display font-bold text-cream text-sm leading-tight">{ind.label}</h3>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {ind.brands.map((b) => (
                    <span key={b}
                      className="text-[10px] font-body px-2 py-0.5 rounded-full"
                      style={{ background: `rgba(${rgb},0.06)`, border: `1px solid rgba(${rgb},0.15)`, color: "rgba(220,230,245,0.85)" }}>
                      {b}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
