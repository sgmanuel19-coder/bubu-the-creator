"use client";

import { motion, useReducedMotion } from "framer-motion";
import { SITE } from "@/lib/constants";
import AnimatedSection from "./AnimatedSection";

export default function Transition() {
  const reduceMotion = useReducedMotion();
  const pairs = SITE.transition.before.map((b, i) => ({
    before: b,
    after: SITE.transition.after[i] ?? "",
  }));

  return (
    <section className="relative section-padding overflow-hidden">
      {/* Atmósfera */}
      <div className="absolute inset-0 grid-pattern opacity-[0.06] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full bg-neon-green/4 blur-[120px] pointer-events-none" />

      <div className="container-base relative z-10">
        {/* Header */}
        <AnimatedSection className="max-w-2xl mb-12">
          <span className="inline-flex items-center gap-2 text-xs font-display font-semibold tracking-[0.2em] uppercase text-neon-green mb-4">
            <span className="w-6 h-px bg-neon-green/50" />
            Mi enfoque
          </span>
          <h2
            className="font-display font-extrabold tracking-tighter leading-[1.03]"
            style={{ fontSize: "clamp(2rem, 4.5vw, 3.6rem)" }}
          >
            {SITE.transition.title}
          </h2>
        </AnimatedSection>

        {/* Párrafos */}
        <div className="grid lg:grid-cols-3 gap-6 mb-16 max-w-5xl">
          {SITE.transition.paragraphs.map((para, i) => (
            <AnimatedSection key={i} delay={i * 0.1}>
              <p className="font-body text-muted text-[15px] leading-relaxed">
                {para}
              </p>
            </AnimatedSection>
          ))}
        </div>

        {/* ── Tabla de transformación: antes → ahora ── */}
        <div className="max-w-4xl mx-auto">
          {/* Cabecera de columnas */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-[1fr_52px_1fr] items-center mb-5 px-1"
          >
            <span className="text-[10px] font-display font-bold tracking-[0.3em] uppercase text-muted/40">
              Sin sistema
            </span>
            <span />
            <span className="text-[10px] font-display font-bold tracking-[0.3em] uppercase text-neon-green/80 text-right sm:text-left">
              Con RESUELTO
            </span>
          </motion.div>

          <div className="space-y-3">
            {pairs.map((pair, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.55, delay: i * 0.09, ease: [0.21, 0.47, 0.32, 0.98] }}
                className="group grid grid-cols-1 sm:grid-cols-[1fr_52px_1fr] items-stretch gap-2 sm:gap-0"
              >
                {/* Antes — apagado */}
                <div
                  className="relative rounded-xl sm:rounded-r-none border border-white/6 bg-white/[0.012] px-5 py-4 flex items-center transition-all duration-300 group-hover:border-white/10"
                  style={{ filter: "saturate(0.4)" }}
                >
                  <span className="shrink-0 w-5 h-5 rounded-full border border-white/12 bg-white/[0.03] flex items-center justify-center text-[10px] text-muted/50 mr-3">
                    ✕
                  </span>
                  <p className="font-body text-muted/60 text-sm leading-snug">{pair.before}</p>
                </div>

                {/* Conector — flecha que se enciende */}
                <div className="hidden sm:flex items-center justify-center relative">
                  <div className="absolute inset-y-0 left-1/2 w-px bg-white/5" />
                  <motion.span
                    initial={{ opacity: 0, x: -6 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.25 + i * 0.09 }}
                    className="relative z-10 w-7 h-7 rounded-full border border-neon-green/30 bg-bg flex items-center justify-center text-neon-green text-xs transition-all duration-300 group-hover:border-neon-green/70 group-hover:shadow-[0_0_16px_rgba(26,128,255,0.5)]"
                    style={
                      reduceMotion
                        ? {}
                        : { transitionProperty: "border-color, box-shadow, transform" }
                    }
                  >
                    →
                  </motion.span>
                </div>

                {/* Ahora — vivo */}
                <div className="relative rounded-xl sm:rounded-l-none border border-neon-green/20 bg-neon-green/[0.04] px-5 py-4 flex items-center overflow-hidden transition-all duration-300 group-hover:border-neon-green/45 group-hover:bg-neon-green/[0.07]">
                  {/* Accent line */}
                  <span className="absolute top-0 left-0 bottom-0 w-[2px] bg-gradient-to-b from-neon-green to-neon-green/20" />
                  <span className="shrink-0 w-5 h-5 rounded-full border border-neon-green/40 bg-neon-green/12 flex items-center justify-center text-[10px] font-bold text-neon-green mr-3">
                    ✓
                  </span>
                  <p className="font-body text-cream/90 text-sm leading-snug font-medium">{pair.after}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
