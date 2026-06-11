"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AnimatedSection from "./AnimatedSection";
import { SITE } from "@/lib/constants";

const faqs = [
  {
    q: "¿Qué hace exactamente RESUELTO?",
    a: "RESUELTO opera en dos líneas: creación de contenido con IA para empresas B2B (videos con nivel cinematográfico generados con IA, estrategia y dirección creativa humana) y sistemas de automatización inteligente (chatbots IA, prospección automatizada, webs de conversión). Ambos tienen el mismo objetivo: que tu empresa se vea y opere al nivel que realmente merece.",
  },
  {
    q: "¿Por qué producir con IA en vez de una productora tradicional?",
    a: "Una producción audiovisual tradicional cuesta entre $5,000 y $50,000, requiere equipo completo y toma de 4 a 6 semanas. Con IA entregamos el mismo nivel visual en días — a una fracción del costo. Además podemos crear lo que una cámara no puede capturar: productos que aún no existen, conceptos técnicos invisibles, escenas imposibles de grabar. La diferencia no está en la herramienta, está en la dirección creativa detrás.",
  },
  {
    q: "¿Cuánto cuesta y qué incluye?",
    a: "Hay tres formas de entrar: videos IA a demanda (sin retainer, se cotizan según proyecto, entrega en 5 días hábiles), el Sistema de Contenido IA mensual de S/ 4,500 +IGV con 10 videos + Cerebro Creativo IA + posts y carruseles, y el sistema completo con automatización. Cada video incluye hasta 2 rondas de ajuste; las iteraciones adicionales consumen tokens de IA y se cotizan por separado.",
  },
  {
    q: "¿Con qué tipo de empresas trabajas?",
    a: "Con empresas B2B, técnicas e industriales — telecomunicaciones, energía, ingeniería, agro, manufactura, tecnología — que ya tienen algo valioso pero todavía no lo comunican con claridad ni con el nivel que deberían. También con startups y consultoras que quieren escalar sin depender de procesos manuales.",
  },
  {
    q: "¿De dónde viene tu experiencia?",
    a: "Más de 5 años ejecutando en proyectos reales. Pasé por Fahrenheit DDB y TBWA Perú — dos de las agencias creativas globales más exigentes. Trabajé con Wong, BCP, Interbank, San Fernando, Cencosud y más de 20 marcas. Hoy aplico todo eso directamente a empresas que quieren comunicar con criterio de primer nivel.",
  },
  {
    q: "¿Cómo es tu metodología de trabajo?",
    a: "Todo empieza con estrategia: entender el negocio, el mensaje y el objetivo antes de producir cualquier pieza. Después viene ejecución dirigida — sin improvisar. Y termina con activos listos para usar, no carpetas de archivos sin contexto. La lógica es siempre la misma: pensar primero, producir después.",
  },
  {
    q: "¿Trabajas solo o con un equipo?",
    a: "RESUELTO es una operación boutique: yo dirijo cada proyecto de punta a punta. No hay capas de intermediarios ni ejecutivos de cuenta. Trabajo con colaboradores especializados según el proyecto, pero la dirección estratégica y creativa es siempre mía. Eso garantiza criterio consistente en todo lo que se entrega.",
  },
  {
    q: "¿Por dónde se empieza?",
    a: "Con una conversación. Sin formularios largos ni propuestas genéricas. Me cuentas qué está pasando en tu empresa, yo evalúo si tiene sentido trabajar juntos y qué tiene más impacto primero. Si hay fit, avanzamos. Si no aplica tu caso, te lo digo directo.",
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
                    aria-expanded={isOpen}
                    className="w-full flex items-center gap-4 px-5 py-5 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-neon-green/40"
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
