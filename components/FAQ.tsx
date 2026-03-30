"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AnimatedSection from "./AnimatedSection";

const faqs = [
  {
    q: "¿Cuánto cuesta la implementación?",
    a: "La implementación completa de 60 días tiene un valor de USD 3,200. Incluye dirección estratégica, Cerebro Creativo IA, guiones, dos jornadas de grabación, edición integral y entrega de 15 piezas: 1 video caso horizontal, 8 reels verticales con experto, 2 videos con locución e IA, y 4 carruseles generados con IA. La cobertura está incluida dentro de Lima Metropolitana.",
  },
  {
    q: "¿Qué recibe exactamente mi empresa?",
    a: "Al terminar los 60 días recibes: 1 Cerebro Creativo IA entrenado con la lógica de tu marca, 1 Video Caso horizontal de autoridad, 8 Reels Verticales con experto y tomas de apoyo, 2 Videos con Locución e integración de IA, y 4 Carruseles generados con IA. Total: 15 piezas estratégicas no pensadas para publicar por publicar — pensadas para elevar percepción, explicar lo técnico y apoyar ventas.",
  },
  {
    q: "¿Cuánto tiempo toma ver resultados?",
    a: "La implementación dura 60 días con un cronograma claro semana a semana. Al llegar al día 60, tu empresa tiene activos audiovisuales reutilizables, una narrativa más clara y una base comunicacional que puede usarse en redes, presentaciones, ventas, prospección y futuras campañas. No prometemos viralidad ni leads mágicos — prometemos una infraestructura más sólida.",
  },
  {
    q: "¿Para qué tipo de empresa está diseñado?",
    a: "Para empresas B2B, técnicas e industriales: telecomunicaciones, energía, ingeniería, agro, manufactura, infraestructura, tecnología. Empresas que ya tienen algo valioso pero no lo comunican con la claridad y el nivel que deberían. Es requisito contar con un vocero disponible para las jornadas de grabación y un responsable interno para feedback y aprobaciones.",
  },
  {
    q: "¿Por qué Resuelto y no hacerlo internamente?",
    a: "Porque producir contenido técnico con nivel requiere tres cosas juntas: dirección estratégica (qué decir y cómo), criterio narrativo (cómo se estructura cada pieza) y producción audiovisual (cómo se graba, dirige y edita). La mayoría de equipos internos tienen una o dos. Resuelto opera con las tres. Y lo hace en 60 días con un cronograma claro, sin burocracia.",
  },
  {
    q: "¿Qué pasa después de los 60 días?",
    a: "Al terminar la implementación, la empresa puede seguir por tres caminos: continuidad mensual (nuevas piezas y campañas de forma sostenida), continuidad trimestral (bloques de trabajo más grandes con más previsibilidad), o uso interno (el equipo aprovecha los activos y el Cerebro Creativo IA para futuras acciones). La base ya está construida — la decisión es cómo aprovecharla.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="relative section-padding overflow-hidden">
      <div className="absolute inset-0 grid-pattern opacity-15 pointer-events-none" />

      <div className="container-base max-w-3xl mx-auto relative z-10">
        <AnimatedSection className="mb-12 text-center">
          <span className="inline-flex items-center gap-2 text-xs font-display font-semibold tracking-[0.25em] uppercase text-neon-green mb-4">
            <span className="w-6 h-px bg-neon-green/50" />
            Preguntas frecuentes
            <span className="w-6 h-px bg-neon-green/50" />
          </span>
          <h2
            className="font-display font-bold tracking-tighter leading-tight"
            style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)" }}
          >
            Todo lo que te estás preguntando
          </h2>
          <p className="font-body text-muted text-base mt-3 max-w-xl mx-auto">
            Respuestas directas. Sin rodeos.
          </p>
        </AnimatedSection>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <AnimatedSection key={i} delay={i * 0.05}>
              <div
                className="border border-white/10 rounded-lg overflow-hidden bg-white/[0.02] hover:border-neon-green/20 transition-colors duration-300"
              >
                <button
                  onClick={() => setOpen(open === i ? null : i)}
                  className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
                >
                  <span className="font-display font-semibold text-sm md:text-base text-cream leading-snug">
                    {faq.q}
                  </span>
                  <motion.span
                    animate={{ rotate: open === i ? 45 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="flex-shrink-0 w-6 h-6 rounded-full border border-neon-green/40 flex items-center justify-center text-neon-green text-sm"
                  >
                    +
                  </motion.span>
                </button>

                <AnimatePresence initial={false}>
                  {open === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                    >
                      <div className="px-6 pb-5 border-t border-white/5">
                        <p className="font-body text-muted text-sm md:text-base leading-relaxed pt-4">
                          {faq.a}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection delay={0.3} className="mt-10 text-center">
          <p className="font-body text-muted/60 text-sm">
            ¿Tienes una pregunta que no está aquí?{" "}
            <a
              href="/contacto"
              className="text-neon-green underline underline-offset-2 hover:text-neon-green/80 transition-colors"
            >
              Escríbeme directo →
            </a>
          </p>
        </AnimatedSection>
      </div>
    </section>
  );
}
