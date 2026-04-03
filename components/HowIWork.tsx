"use client";

import { SITE } from "@/lib/constants";
import AnimatedSection from "./AnimatedSection";
import { motion } from "framer-motion";

// Group steps into 4 phases of 2 weeks each
const phases = [
  { label: "Fase 1", name: "Estrategia", weeks: "Semanas 1–2", color: "green", steps: [0, 1] },
  { label: "Fase 2", name: "Base creativa", weeks: "Semanas 3–4", color: "purple", steps: [2, 3] },
  { label: "Fase 3", name: "Producción", weeks: "Semanas 5–6", color: "green", steps: [4, 5] },
  { label: "Fase 4", name: "Edición y entrega", weeks: "Semanas 7–8", color: "purple", steps: [6, 7] },
];

export default function HowIWork() {
  return (
    <section id="proceso" className="relative section-padding bg-surface overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-neon-green/30 to-neon-purple/30" />
      <div className="absolute top-1/2 right-0 w-[400px] h-[400px] rounded-full bg-neon-purple/5 blur-[80px] pointer-events-none" />

      <div className="container-base relative z-10">
        {/* Header */}
        <AnimatedSection className="mb-16">
          <span className="inline-flex items-center gap-2 text-xs font-display font-semibold tracking-[0.2em] uppercase text-neon-green mb-4">
            <span className="w-6 h-px bg-neon-green/50" />
            Proceso
          </span>
          <h2 className="font-display font-bold text-3xl lg:text-5xl tracking-tight mb-3">
            {SITE.howIWork.title}
          </h2>
          <p className="font-body text-muted text-base lg:text-lg">
            {SITE.howIWork.subtitle}
          </p>
        </AnimatedSection>

        {/* Phases — grid 2x2 on desktop, vertical on mobile */}
        <div className="grid md:grid-cols-2 gap-6">
          {phases.map((phase, pi) => {
            const isGreen = phase.color === "green";
            const accentColor = isGreen ? "neon-green" : "neon-purple";
            const borderClass = isGreen ? "border-neon-green/20" : "border-neon-purple/20";
            const bgClass = isGreen ? "from-neon-green/5" : "from-neon-purple/5";
            const textClass = isGreen ? "text-neon-green" : "text-neon-purple";
            const dotClass = isGreen ? "bg-neon-green border-neon-green/60" : "bg-neon-purple border-neon-purple/60";
            const lineClass = isGreen ? "from-neon-green/40 to-neon-green/10" : "from-neon-purple/40 to-neon-purple/10";

            return (
              <motion.div
                key={pi}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.6, delay: pi * 0.12, ease: [0.21, 0.47, 0.32, 0.98] }}
                className={`relative rounded-2xl border ${borderClass} overflow-hidden`}
                style={{ background: "rgba(8,10,13,0.9)" }}
              >
                {/* Phase header */}
                <div className={`bg-gradient-to-r ${bgClass} to-transparent px-7 py-5 border-b ${borderClass}`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className={`font-display font-bold text-[10px] tracking-[0.3em] uppercase ${textClass}`}>
                        {phase.label}
                      </span>
                      <span className="text-muted/30">·</span>
                      <span className={`font-display font-bold text-sm ${textClass}`}>
                        {phase.name}
                      </span>
                    </div>
                    <span className="text-xs font-body text-muted/50">{phase.weeks}</span>
                  </div>
                </div>

                {/* Steps — connected vertically */}
                <div className="px-7 py-6">
                  <div className="relative">
                    {/* Connecting line */}
                    <div className={`absolute left-[9px] top-4 bottom-4 w-px bg-gradient-to-b ${lineClass}`} />

                    <div className="space-y-6">
                      {phase.steps.map((stepIndex, si) => {
                        const step = SITE.howIWork.steps[stepIndex];
                        return (
                          <div key={si} className="flex gap-5">
                            {/* Dot */}
                            <div className={`relative z-10 shrink-0 mt-1 w-[18px] h-[18px] rounded-full border ${dotClass}`} />
                            {/* Content */}
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1.5">
                                <span className={`font-display font-bold text-[10px] tracking-widest uppercase ${textClass}/70`}>
                                  {step.number}
                                </span>
                                <span className="font-display font-semibold text-sm text-cream">
                                  {step.title}
                                </span>
                              </div>
                              <p className="font-body text-muted/70 text-xs leading-relaxed">
                                {step.description}
                              </p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Result connector */}
        <AnimatedSection delay={0.4} className="mt-10">
          <div className="relative flex items-center gap-0 max-w-3xl mx-auto">
            <div className="flex-1 h-px bg-gradient-to-r from-neon-green/40 to-neon-purple/40" />
            <div className="px-6 py-3 rounded-full border border-white/10 bg-white/[0.04] text-center">
              <p className="font-display font-semibold text-sm text-cream">
                15 piezas entregadas · Sistema completo y funcional
              </p>
            </div>
            <div className="flex-1 h-px bg-gradient-to-r from-neon-purple/40 to-neon-green/40" />
          </div>
        </AnimatedSection>

      </div>
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-neon-purple/30 to-neon-green/30" />
    </section>
  );
}
