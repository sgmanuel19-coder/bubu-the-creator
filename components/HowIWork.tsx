"use client";

import { useState } from "react";
import { SITE } from "@/lib/constants";
import AnimatedSection from "./AnimatedSection";
import { motion, AnimatePresence } from "framer-motion";

const phases = [
  { label: "Fase 1", name: "Estrategia", weeks: "Sem. 1–2", icon: "🎯", color: "green", steps: [0, 1] },
  { label: "Fase 2", name: "Base Creativa", weeks: "Sem. 3–4", icon: "🎨", color: "purple", steps: [2, 3] },
  { label: "Fase 3", name: "Producción", weeks: "Sem. 5–6", icon: "🎬", color: "green", steps: [4, 5] },
  { label: "Fase 4", name: "Entrega", weeks: "Sem. 7–8", icon: "✨", color: "purple", steps: [6, 7] },
];

function PhaseCard({ phase, index, isActive, onHover }: {
  phase: typeof phases[0];
  index: number;
  isActive: boolean;
  onHover: (i: number | null) => void;
}) {
  const isGreen = phase.color === "green";
  const accent = isGreen ? "neon-green" : "neon-purple";
  const borderActive = isGreen ? "border-neon-green/50" : "border-neon-purple/50";
  const borderIdle = isGreen ? "border-neon-green/15" : "border-neon-purple/15";
  const bgActive = isGreen ? "bg-neon-green/[0.06]" : "bg-neon-purple/[0.06]";
  const bgIdle = "bg-white/[0.02]";
  const textAccent = isGreen ? "text-neon-green" : "text-neon-purple";
  const shadowColor = isGreen ? "rgba(0,255,135,0.12)" : "rgba(204,68,255,0.12)";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ type: "spring", stiffness: 180, damping: 22, delay: index * 0.1 }}
      onMouseEnter={() => onHover(index)}
      onMouseLeave={() => onHover(null)}
      className={`relative rounded-2xl border transition-all duration-300 cursor-default flex-1 min-w-0
        ${isActive ? `${borderActive} ${bgActive}` : `${borderIdle} ${bgIdle}`}`}
      style={{ boxShadow: isActive ? `0 0 32px ${shadowColor}` : "none" }}
    >
      {/* Top accent bar */}
      <div className={`h-0.5 w-full rounded-t-2xl transition-opacity duration-300
        ${isGreen ? "bg-gradient-to-r from-neon-green/80 to-transparent" : "bg-gradient-to-r from-neon-purple/80 to-transparent"}
        ${isActive ? "opacity-100" : "opacity-0"}`} />

      <div className="p-5 lg:p-6">
        {/* Phase header */}
        <div className="flex items-start justify-between gap-2 mb-4">
          <div className="flex items-center gap-2.5">
            <span className="text-xl">{phase.icon}</span>
            <div>
              <p className={`text-[9px] font-display font-bold tracking-[0.3em] uppercase ${textAccent}/60`}>
                {phase.label}
              </p>
              <p className={`font-display font-bold text-sm lg:text-base ${textAccent}`}>
                {phase.name}
              </p>
            </div>
          </div>
          <span className={`shrink-0 text-[10px] font-display font-semibold tracking-wide px-2.5 py-1 rounded-full border
            ${isGreen ? "border-neon-green/20 text-neon-green/60" : "border-neon-purple/20 text-neon-purple/60"}`}>
            {phase.weeks}
          </span>
        </div>

        {/* Steps — revealed on hover */}
        <AnimatePresence>
          {isActive && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <div className="space-y-3 pt-1 border-t border-white/5">
                {phase.steps.map((stepIndex, si) => {
                  const step = SITE.howIWork.steps[stepIndex];
                  return (
                    <div key={si} className="flex gap-3 pt-3">
                      <span className={`shrink-0 w-4 h-4 rounded-full flex items-center justify-center mt-0.5 text-[9px] font-bold
                        ${isGreen ? "bg-neon-green/15 border border-neon-green/30 text-neon-green" : "bg-neon-purple/15 border border-neon-purple/30 text-neon-purple"}`}>
                        {si + 1}
                      </span>
                      <div>
                        <p className="font-display font-semibold text-xs text-cream mb-0.5">{step.title}</p>
                        <p className="font-body text-muted/60 text-[11px] leading-relaxed">{step.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Idle hint */}
        {!isActive && (
          <p className="font-body text-muted/35 text-[11px]">
            {SITE.howIWork.steps[phase.steps[0]].title} · {SITE.howIWork.steps[phase.steps[1]].title}
          </p>
        )}
      </div>
    </motion.div>
  );
}

export default function HowIWork() {
  const [activePhase, setActivePhase] = useState<number | null>(null);

  return (
    <section id="proceso" className="relative section-padding bg-surface overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-neon-green/30 to-neon-purple/30" />
      <div className="absolute top-1/2 right-0 w-[400px] h-[400px] rounded-full bg-neon-purple/5 blur-[80px] pointer-events-none" />

      <div className="container-base relative z-10">
        {/* Header */}
        <AnimatedSection className="mb-12">
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

        {/* Progress bar header — desktop only */}
        <AnimatedSection delay={0.15} className="hidden lg:flex items-center gap-0 mb-3">
          {phases.map((phase, i) => {
            const isGreen = phase.color === "green";
            return (
              <div key={i} className="flex items-center flex-1">
                <div className={`shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-display font-bold border
                  ${isGreen ? "border-neon-green/40 text-neon-green bg-neon-green/10" : "border-neon-purple/40 text-neon-purple bg-neon-purple/10"}`}>
                  {i + 1}
                </div>
                {i < phases.length - 1 && (
                  <div className="flex-1 h-px mx-2"
                    style={{ background: "linear-gradient(to right, rgba(0,255,135,0.3), rgba(204,68,255,0.3))" }} />
                )}
              </div>
            );
          })}
        </AnimatedSection>

        {/* Phase cards — horizontal on desktop, vertical on mobile */}
        <div className="flex flex-col lg:flex-row gap-4">
          {phases.map((phase, i) => (
            <PhaseCard
              key={i}
              phase={phase}
              index={i}
              isActive={activePhase === i}
              onHover={setActivePhase}
            />
          ))}
        </div>

        {/* Hint text */}
        <AnimatedSection delay={0.3} className="mt-4 text-center">
          <p className="text-[11px] font-body text-muted/35 tracking-wide">
            Pasa el cursor sobre cada fase para ver los pasos internos
          </p>
        </AnimatedSection>

        {/* Result bar */}
        <AnimatedSection delay={0.4} className="mt-8">
          <div className="relative flex items-center gap-0 max-w-3xl mx-auto">
            <div className="flex-1 h-px bg-gradient-to-r from-neon-green/40 to-neon-purple/40" />
            <div className="px-6 py-3 rounded-full border border-white/10 bg-white/[0.04] text-center">
              <p className="font-display font-semibold text-sm text-cream">
                Sistema completo · Listo para usar al día 60
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
