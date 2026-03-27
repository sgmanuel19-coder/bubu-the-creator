"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AnimatedSection from "./AnimatedSection";

const faqs = [
  {
    q: "¿Cuánto cuesta trabajar contigo?",
    a: "No publico tarifas fijas porque cada proyecto es diferente en alcance, urgencia y complejidad. Lo que sí puedo decirte: trabajo en proyectos donde el retorno sobre la inversión tiene sentido para el cliente — no busco el presupuesto más bajo ni el más alto. La primera conversación es para entender tu situación; si tiene sentido avanzar, te presento una propuesta concreta.",
  },
  {
    q: "¿Cuánto tiempo tarda ver resultados?",
    a: "Depende del tipo de trabajo. Un Sistema Comercial Digital (landing, automatización, flujos) entra en funcionamiento en 3 a 6 semanas. Los primeros resultados medibles — leads calificados, mejora en percepción de marca — se suelen notar en las primeras 4 semanas de activación. La autoridad digital tarda más: 2 a 4 meses para que el sistema de comunicación empiece a trabajar solo. Soy directo en los tiempos desde el diagnóstico inicial.",
  },
  {
    q: "¿Por qué tú y no una agencia grande?",
    a: "Porque trabajé en las agencias grandes. Sé exactamente cómo funciona ese modelo: pagas por estructura, no solo por trabajo. Tu cuenta la maneja un ejecutivo junior mientras el senior aparece en la reunión de cierre. En RESUELTO, yo trabajo directamente en tu proyecto — sin intermediarios, sin capas, sin burocracia. Y vengo con el criterio de esas agencias, aplicado con la velocidad de quien no tiene que aprobar 5 niveles antes de ejecutar.",
  },
  {
    q: "¿Trabajas con cualquier tipo de negocio?",
    a: "No. Trabajo con un perfil específico: negocios que venden algo de valor real, donde la confianza es parte del proceso de compra. Inmobiliarias, empresas técnicas, consultoras, negocios de alto ticket, marcas personales serias. Si buscas 'contenido para crecer en Instagram' sin una estrategia comercial detrás, probablemente no soy lo que necesitas. Si buscas que tu comunicación trabaje para cerrar ventas — hablemos.",
  },
  {
    q: "¿Cómo sé si mi negocio está listo para esto?",
    a: "Si ya tienes una oferta que vende (aunque sea poco o lento), un proceso de atención aunque sea manual, y la sensación de que tu comunicación no está a la altura de lo que realmente ofreces — estás listo. No necesitas tener todo perfecto. La primera conversación sirve exactamente para eso: ver dónde estás, dónde deberías estar y qué tiene más sentido construir primero.",
  },
  {
    q: "¿Puedo ver más de tu trabajo antes de decidir?",
    a: "Sí. En la sección de Casos de Éxito encontrarás proyectos reales con contexto, proceso y resultados — no solo logos. También tengo testimonios de clientes actuales. Si después de eso quieres una conversación sin compromiso, el primer paso es agendar 30 minutos para ver si tiene sentido trabajar juntos.",
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
