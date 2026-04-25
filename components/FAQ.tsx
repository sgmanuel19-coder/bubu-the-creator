"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AnimatedSection from "./AnimatedSection";
import { SITE } from "@/lib/constants";

const faqs = [
  {
    q: "¿Cuánto es la inversión?",
    a: "Hay tres planes: Señal ($500 +IGV, pago único) para probar con un servicio específico; Presencia ($1,000/mes +IGV, mín. 3 meses) para presencia activa sostenida; Autoridad ($3,000 +IGV, pago único) para el sistema completo con ~23 piezas. No es un gasto de marketing — es un activo de comunicación comercial que tu empresa reutiliza.",
  },
  {
    q: "¿Cómo se organiza el trabajo?",
    a: "Señal: servicio elegido ejecutado en 1–2 semanas. Presencia: jornada mensual + dirección + ~10 piezas entregadas. Autoridad (2 meses): Estrategia → Preproducción → Grabaciones → Edición, IA y entrega final.",
  },
  {
    q: "¿Cuánto tiempo toma ver resultados?",
    a: "Señal: primera pieza en 1–2 semanas. Presencia: ~10 piezas activas el primer mes. Autoridad: al día 60, ~23 activos listos para redes, ventas y ferias. No prometemos viralidad — prometemos un sistema instalado y funcional.",
  },
  {
    q: "¿Para qué tipo de empresa está diseñado?",
    a: "Para empresas B2B, técnicas e industriales: telecomunicaciones, energía, ingeniería, agro, manufactura, infraestructura, tecnología. Requisito: vocero disponible y responsable interno para feedback.",
  },
  {
    q: "¿Por qué Resuelto y no hacerlo internamente?",
    a: "Instalar un sistema de comunicación requiere cuatro disciplinas a la vez: estrategia publicitaria, producción audiovisual, IA aplicada y diseño comercial. La mayoría de equipos internos tiene una o dos. Resuelto opera con las cuatro — criterio de agencia global, ejecución directa.",
  },
  {
    q: "¿Qué pasa después del primer plan?",
    a: "Clientes del Plan Señal tienen acceso preferencial a Presencia o Autoridad. Clientes del Plan Autoridad tienen precio preferencial en Presencia para mantener la base activa.",
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
          {faqs.map((faq, i) => {
            const isOpen = open === i;
            const isGreen = i % 2 === 0;
            return (
              <AnimatedSection key={i} delay={i * 0.05}>
                <div
                  className={`rounded-xl overflow-hidden transition-all duration-300 border
                    ${isOpen
                      ? isGreen
                        ? "border-neon-green/30 bg-neon-green/[0.03]"
                        : "border-neon-purple/30 bg-neon-purple/[0.03]"
                      : "border-white/8 bg-white/[0.02] hover:border-white/15"
                    }`}
                >
                  <button
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="w-full flex items-center gap-4 px-5 py-5 text-left"
                  >
                    <span className={`shrink-0 w-7 h-7 rounded-lg flex items-center justify-center text-xs font-display font-bold
                      transition-all duration-300
                      ${isOpen
                        ? isGreen ? "bg-neon-green/20 text-neon-green" : "bg-neon-purple/20 text-neon-purple"
                        : "bg-white/5 text-muted/90"
                      }`}>
                      {String(i + 1).padStart(2, "0")}
                    </span>

                    <span className="flex-1 font-display font-semibold text-sm md:text-base text-cream leading-snug">
                      {faq.q}
                    </span>

                    <motion.div
                      animate={{ rotate: isOpen ? 45 : 0 }}
                      transition={{ duration: 0.2 }}
                      className={`shrink-0 w-7 h-7 rounded-full border flex items-center justify-center text-sm font-bold transition-colors duration-300
                        ${isOpen
                          ? isGreen ? "border-neon-green/50 text-neon-green bg-neon-green/10" : "border-neon-purple/50 text-neon-purple bg-neon-purple/10"
                          : "border-white/15 text-muted"
                        }`}
                    >
                      +
                    </motion.div>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: "easeInOut" }}
                      >
                        <div className={`mx-5 mb-5 p-4 rounded-lg border-l-2 bg-white/[0.02]
                          ${isGreen ? "border-neon-green/40" : "border-neon-purple/40"}`}>
                          <p className="font-body text-muted text-sm md:text-base leading-relaxed">
                            {faq.a}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </AnimatedSection>
            );
          })}
        </div>

        <AnimatedSection delay={0.3} className="mt-10 text-center">
          <p className="font-body text-muted/90 text-sm">
            ¿Tienes una pregunta que no está aquí?{" "}
            <a
              href={SITE.links.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
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
