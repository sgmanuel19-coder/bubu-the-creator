"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { SITE } from "@/lib/constants";
import AnimatedSection from "./AnimatedSection";

// Alternating green/purple for each step
const stepColors = [
  { bg: "bg-neon-green", border: "border-neon-green/60", text: "text-black", shadow: "shadow-neon-green/40" },
  { bg: "bg-neon-purple/20", border: "border-neon-purple/45", text: "text-neon-purple", shadow: "shadow-neon-purple/25" },
  { bg: "bg-neon-green/20", border: "border-neon-green/45", text: "text-neon-green", shadow: "shadow-neon-green/25" },
  { bg: "bg-neon-purple/20", border: "border-neon-purple/45", text: "text-neon-purple", shadow: "shadow-neon-purple/25" },
  { bg: "bg-neon-green/20", border: "border-neon-green/45", text: "text-neon-green", shadow: "shadow-neon-green/25" },
  { bg: "bg-neon-purple/20", border: "border-neon-purple/45", text: "text-neon-purple", shadow: "shadow-neon-purple/25" },
  { bg: "bg-neon-green/20", border: "border-neon-green/45", text: "text-neon-green", shadow: "shadow-neon-green/25" },
  { bg: "bg-neon-purple/20", border: "border-neon-purple/45", text: "text-neon-purple", shadow: "shadow-neon-purple/25" },
];

export default function HowIWork() {
  const lineRef = useRef(null);
  const lineInView = useInView(lineRef, { once: true, margin: "-60px" });

  return (
    <section id="proceso" className="relative section-padding bg-surface overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-neon-green/30 to-neon-purple/30" />
      <div className="absolute top-1/2 right-0 w-[400px] h-[400px] rounded-full bg-neon-purple/5 blur-[80px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] rounded-full bg-neon-green/4 blur-[80px] pointer-events-none" />

      <div className="container-base relative z-10">
        {/* Header */}
        <AnimatedSection className="text-center mb-16">
          <span className="inline-flex items-center gap-2 text-xs font-display font-semibold tracking-[0.2em] uppercase text-neon-green mb-4">
            <span className="w-6 h-px bg-neon-green/50" />
            Proceso
            <span className="w-6 h-px bg-neon-green/50" />
          </span>
          <h2 className="font-display font-bold text-3xl lg:text-5xl tracking-tight mb-3">
            {SITE.howIWork.title}
          </h2>
          <p className="font-body text-muted text-base lg:text-lg">
            {SITE.howIWork.subtitle}
          </p>
        </AnimatedSection>

        {/* Steps */}
        <div ref={lineRef} className="relative">
          {/* Desktop */}
          <div className="hidden lg:block">
            {/* Track line */}
            <div className="absolute top-8 left-[10%] right-[10%] h-px bg-white/5" />
            {/* Animated fill — green → purple */}
            <motion.div
              className="absolute top-8 left-[10%] h-px"
              style={{
                background: "linear-gradient(90deg, #00d4ff 0%, #cc44ff 100%)",
              }}
              initial={{ width: "0%" }}
              animate={lineInView ? { width: "80%" } : { width: "0%" }}
              transition={{ duration: 2.2, ease: [0.21, 0.47, 0.32, 0.98], delay: 0.4 }}
            />

            <div className="grid grid-cols-4 gap-4">
              {SITE.howIWork.steps.map((step, i) => {
                const c = stepColors[i];
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 30 }}
                    animate={lineInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.2 + i * 0.2, ease: [0.21, 0.47, 0.32, 0.98] }}
                    className="flex flex-col items-center text-center group"
                  >
                    <div className={`relative z-10 w-16 h-16 rounded-full flex items-center justify-center mb-5
                      border transition-all duration-300 ${c.bg} ${c.border} shadow-lg ${c.shadow}
                      group-hover:scale-110`}>
                      <span className={`font-display font-bold text-sm ${c.text}`}>
                        {step.number}
                      </span>
                    </div>
                    <h3 className="font-display font-semibold text-sm text-cream mb-2">
                      {step.title}
                    </h3>
                    <p className="font-body text-muted text-xs leading-relaxed">
                      {step.description}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Mobile */}
          <div className="lg:hidden">
            <div className="relative pl-10">
              <div className="absolute left-4 top-0 bottom-0 w-px bg-white/5" />
              <motion.div
                className="absolute left-4 top-0 w-px"
                style={{ background: "linear-gradient(to bottom, #00d4ff, #cc44ff)" }}
                initial={{ height: "0%" }}
                animate={lineInView ? { height: "100%" } : { height: "0%" }}
                transition={{ duration: 2.5, ease: "easeOut", delay: 0.2 }}
              />

              <div className="space-y-8">
                {SITE.howIWork.steps.map((step, i) => {
                  const c = stepColors[i];
                  return (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      animate={lineInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ duration: 0.5, delay: 0.2 + i * 0.15 }}
                      className="relative"
                    >
                      <div className={`absolute -left-10 top-0 w-8 h-8 rounded-full flex items-center justify-center
                        border ${c.bg} ${c.border}`}>
                        <span className={`font-display font-bold text-[10px] ${c.text}`}>
                          {step.number}
                        </span>
                      </div>
                      <div>
                        <h3 className="font-display font-semibold text-base text-cream mb-2">
                          {step.title}
                        </h3>
                        <p className="font-body text-muted text-sm leading-relaxed">
                          {step.description}
                        </p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-neon-purple/30 to-neon-green/30" />
    </section>
  );
}
