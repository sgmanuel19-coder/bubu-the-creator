"use client";

import { motion } from "framer-motion";

const FRENTES = [
  {
    icon: "🧠",
    label: "Estrategia",
    title: "Cerebro Creativo IA",
    description:
      "Un sistema de IA entrenado en la lógica de tu marca. Genera ángulos editoriales, buyer personas, benchmarks y prompts maestros. La estrategia sale más rápido — y con más criterio.",
    items: [
      "Brief y contrabrief de marca",
      "Ángulos y formatos por campaña",
      "Prompts maestros para comunicación",
      "Benchmark con IA nacional e internacional",
    ],
    rgb: "26,128,255",
    hex: "#1A80FF",
  },
  {
    icon: "🎬",
    label: "Contenido",
    title: "Producción asistida con IA",
    description:
      "IA generativa en cada fase de producción: recursos visuales, locuciones, motion y postproducción asistida. Más nivel de pieza, más velocidad de entrega — con criterio humano encima de todo.",
    items: [
      "Recursos visuales generativos",
      "Locuciones y voz IA de nivel cinematográfico",
      "Motion y efectos asistidos",
      "Postproducción acelerada con IA",
    ],
    rgb: "77,159,255",
    hex: "#4D9FFF",
  },
  {
    icon: "⚙️",
    label: "Automatización",
    title: "Sistemas que trabajan solos",
    description:
      "Flujos en N8N que conectan herramientas, eliminan tareas manuales y entregan resultados sin intervención constante. Bots, reportes, notificaciones y procesos que corren en segundo plano.",
    items: [
      "Flujos automáticos en N8N",
      "Bots de atención y seguimiento",
      "Reportes y alertas automatizadas",
      "Integraciones entre plataformas",
    ],
    rgb: "10,77,170",
    hex: "#0A4DAA",
  },
] as const;

export default function IAfrentes() {
  return (
    <section className="relative section-padding overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-neon-green/20 to-neon-purple/20" />

      {/* Background glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/4 w-[400px] h-[200px] rounded-full bg-neon-green/4 blur-[100px]" />
        <div className="absolute bottom-1/3 right-1/4 w-[400px] h-[200px] rounded-full bg-neon-purple/4 blur-[100px]" />
      </div>

      <div className="container-base relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-10"
        >
          <span className="inline-flex items-center gap-2 text-xs font-display font-semibold tracking-[0.25em] uppercase text-neon-green mb-4">
            <span className="w-6 h-px bg-neon-green/50" />
            IA integrada en el proceso
          </span>
          <h2 className="font-display font-bold text-2xl lg:text-4xl tracking-tight mb-3">
            No es herramienta. Es parte del sistema.
          </h2>
          <p className="font-body text-muted max-w-2xl">
            La IA atraviesa los tres frentes del trabajo: la pienso, la produzco y la automatizo.
            El criterio sigue siendo humano. La velocidad y el nivel, potenciados.
          </p>
        </motion.div>

        {/* 3-column grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {FRENTES.map((frente, i) => (
            <motion.div
              key={frente.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="relative rounded-2xl p-6 border group hover:-translate-y-1 transition-transform duration-300"
              style={{
                background: "rgba(5,7,10,0.85)",
                borderColor: `rgba(${frente.rgb},0.15)`,
              }}
            >
              {/* Top accent bar */}
              <div
                className="absolute top-0 left-0 right-0 h-px rounded-t-2xl"
                style={{
                  background: `linear-gradient(90deg, ${frente.hex}cc 0%, ${frente.hex}44 60%, transparent 100%)`,
                }}
              />

              {/* Icon + label */}
              <div className="flex items-center gap-3 mb-4">
                <span className="text-2xl">{frente.icon}</span>
                <span
                  className="text-[10px] font-display font-bold tracking-widest uppercase px-2.5 py-1 rounded-full"
                  style={{
                    color: frente.hex,
                    background: `rgba(${frente.rgb},0.08)`,
                    border: `1px solid rgba(${frente.rgb},0.2)`,
                  }}
                >
                  {frente.label}
                </span>
              </div>

              <h3 className="font-display font-bold text-lg text-cream mb-2">
                {frente.title}
              </h3>
              <p className="font-body text-muted text-sm leading-relaxed mb-4">
                {frente.description}
              </p>

              {/* Item list */}
              <ul className="space-y-2">
                {frente.items.map((item, j) => (
                  <li key={j} className="flex items-start gap-2">
                    <span
                      className="shrink-0 w-1 h-1 rounded-full mt-2"
                      style={{ background: frente.hex }}
                    />
                    <span className="font-body text-muted text-[12px] leading-snug">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-neon-purple/20 to-transparent" />
    </section>
  );
}
