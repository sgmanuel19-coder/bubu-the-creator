"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import AnimatedSection from "./AnimatedSection";

// ── Video slot placeholder ─────────────────────────────────────────────────
function VideoSlot({ label }: { label: string }) {
  return (
    <div className="relative w-full max-w-[200px] mx-auto"
      style={{ aspectRatio: "9/16" }}>
      {/* HUD corners */}
      <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-neon-green/50 rounded-tl z-10" />
      <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-neon-green/50 rounded-tr z-10" />
      <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-neon-green/50 rounded-bl z-10" />
      <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-neon-green/50 rounded-br z-10" />

      {/* Scanline */}
      <div className="absolute inset-0 overflow-hidden rounded-xl pointer-events-none"
        style={{ background: "repeating-linear-gradient(0deg,rgba(0,0,0,0.05) 0px,rgba(0,0,0,0.05) 1px,transparent 1px,transparent 4px)" }} />

      {/* Content */}
      <div className="w-full h-full rounded-xl border border-white/10 bg-white/[0.03] flex flex-col items-center justify-center gap-3">
        {/* Play button */}
        <div className="w-12 h-12 rounded-full border border-neon-green/40 bg-neon-green/10 flex items-center justify-center">
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-neon-green ml-0.5">
            <path d="M8 5v14l11-7z" />
          </svg>
        </div>
        <p className="text-[10px] font-display tracking-widest uppercase text-muted/50 text-center px-3">{label}</p>
      </div>
    </div>
  );
}

// ── Deliverable types ───────────────────────────────────────────────────────
type BonusItem = { type: "bonus"; bonusNum: 1 | 2; label: string; icon: string; title: string; description: string; detail: string[] };
type MainItem  = { type: "main";  num: number; title: string; description: string; detail: string[]; hasVideo: boolean; videoLabel: string };
type Item = BonusItem | MainItem;

const deliverables: Item[] = [
  {
    type: "bonus",
    bonusNum: 1,
    label: "BONUS 1",
    icon: "🧠",
    title: "Agente IA — Cerebro Creativo",
    description: "Un sistema de inteligencia artificial entrenado con la lógica, el tono y la estrategia comunicacional de tu marca.",
    detail: [
      "Disponible en ChatGPT, Gemini o Claude según tu preferencia",
      "Entrenado con tu mensaje central, propuesta de valor y ejes de contenido",
      "Genera guiones, copys, ideas y respuestas alineadas a tu marca en segundos",
      "Es un activo permanente — no expira con el servicio",
      "Tu equipo puede usarlo de forma autónoma para futuras piezas",
      "Reduce el tiempo de producción de contenido en más del 60%",
    ],
  },
  {
    type: "main",
    num: 1,
    title: "Video Caso VSL",
    description: "Video de 2 a 3 minutos que documenta tu proyecto o empresa como un caso de éxito, con storytelling real, expertos hablando en cámara y grabaciones en locaciones clave.",
    detail: [
      "Dirección de producción completa",
      "Grabación con expertos / voceros de la empresa",
      "Locaciones: oficinas, planta, feria, campo o proyecto",
      "Storytelling estratégico: contexto → problema → solución → resultado",
      "Edición cinematográfica con música, motion y subtítulos",
      "Genera confianza y autoridad antes de la primera reunión",
    ],
    hasVideo: true,
    videoLabel: "Ejemplo · Video VSL",
  },
  {
    type: "main",
    num: 2,
    title: "Cobertura Audiovisual",
    description: "Cobertura de tu feria, evento, oficina o planta industrial para contenido de acción en redes — verlos trabajar, interactuar, gestionar y demostrar presencia autoritaria en el rubro.",
    detail: [
      "Grabación de hasta 6 horas en campo",
      "Edición express profesional incluida",
      "1 video resumen de 1 minuto: estilo práctico, minimalista, montaje profesional",
      "Material adicional de apoyo para redes (clips cortos, momentos clave)",
      "Captura de atmósfera real: equipo, proceso, espacio, dinámica",
      "Ideal para ferias, lanzamientos, eventos o recorridos industriales",
    ],
    hasVideo: true,
    videoLabel: "Ejemplo · Cobertura",
  },
  {
    type: "main",
    num: 3,
    title: "Contenido Profesional con IA",
    description: "Grabaciones de tus voceros o expertos hablando a cámara sobre temas comerciales relevantes, con tomas de apoyo generadas con IA generativa profesional.",
    detail: [
      "8 videos verticales para redes sociales",
      "Grabación en oficinas, industria, fábrica o locación clave",
      "Edición profesional con ritmo y estética premium",
      "Tomas de apoyo con IA generativa: renders 3D, motion graphics, simulaciones según requiera",
      "Estilo cinematográfico adaptado al rubro técnico e industrial",
      "Piezas diseñadas para generar autoridad, educar y convertir",
    ],
    hasVideo: true,
    videoLabel: "Ejemplo · Contenido IA",
  },
  {
    type: "bonus",
    bonusNum: 2,
    label: "BONUS 2",
    icon: "🎨",
    title: "Carruseles Generados con IA",
    description: "Activos visuales comerciales para redes, presentaciones y prospección, generados con IA bajo la identidad de tu marca.",
    detail: [
      "3 carruseles estratégicos (para educar, posicionar o convertir)",
      "2 imágenes post independientes para redes",
      "Diseñados con IA bajo la paleta y tono de tu marca",
      "Listos para publicar o usar en presentaciones comerciales",
      "Reutilizables en futuras campañas",
    ],
  },
];

export default function Deliverables() {
  const [expanded, setExpanded] = useState<number | null>(null);

  return (
    <section className="relative section-padding overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-neon-green/25 to-neon-purple/25" />
      <div className="absolute top-1/3 right-0 w-[400px] h-[400px] rounded-full bg-neon-green/4 blur-[100px] pointer-events-none" />

      <div className="container-base relative z-10">
        <AnimatedSection className="text-center mb-16">
          <span className="inline-flex items-center gap-2 text-xs font-display font-semibold tracking-[0.2em] uppercase text-neon-green mb-4">
            <span className="w-6 h-px bg-neon-green/50" />
            Entregables
            <span className="w-6 h-px bg-neon-green/50" />
          </span>
          <h2 className="font-display font-bold text-3xl lg:text-5xl tracking-tight mb-4">
            Al terminar los 60 días,<br />
            <span className="text-gradient-green">tu empresa obtiene</span>
          </h2>
          <p className="font-body text-muted text-base lg:text-lg max-w-2xl mx-auto">
            No son piezas sueltas. Es un sistema completo de comunicación comercial listo para usar.
          </p>
        </AnimatedSection>

        <div className="space-y-4">
          {deliverables.map((item, i) => {
            const isBonus = item.type === "bonus";
            const isOpen = expanded === i;
            const isGreen = i % 2 === 0;

            return (
              <AnimatedSection key={i} delay={i * 0.06}>
                <motion.div
                  className={`rounded-2xl border overflow-hidden cursor-pointer transition-all duration-300
                    ${isOpen
                      ? isBonus
                        ? "border-neon-green/40 bg-neon-green/[0.04]"
                        : isGreen
                          ? "border-neon-green/30 bg-neon-green/[0.03]"
                          : "border-neon-purple/30 bg-neon-purple/[0.03]"
                      : "border-white/8 bg-white/[0.02] hover:border-white/15"
                    }`}
                  onClick={() => setExpanded(isOpen ? null : i)}
                >
                  {/* Top accent bar */}
                  {isOpen && (
                    <div className={`h-0.5 w-full ${
                      isBonus ? "bg-gradient-to-r from-neon-green to-neon-purple"
                      : isGreen ? "bg-gradient-to-r from-neon-green/80 to-transparent"
                      : "bg-gradient-to-r from-neon-purple/80 to-transparent"
                    }`} />
                  )}

                  {/* Header row */}
                  <div className="flex items-center gap-5 px-6 py-5">
                    {/* Number / bonus label */}
                    <div className={`shrink-0 flex flex-col items-center justify-center rounded-xl
                      ${isBonus
                        ? "w-14 h-14 bg-gradient-to-br from-neon-green/20 to-neon-purple/20 border border-neon-green/30"
                        : isGreen
                          ? "w-12 h-12 bg-neon-green/10 border border-neon-green/25"
                          : "w-12 h-12 bg-neon-purple/10 border border-neon-purple/25"
                      }`}>
                      {isBonus ? (
                        <>
                          <span className="text-xl leading-none">{(item as BonusItem).icon}</span>
                          <span className="text-[8px] font-display font-bold tracking-widest text-neon-green/70 mt-0.5">
                            {(item as BonusItem).label}
                          </span>
                        </>
                      ) : (
                        <span className={`font-display font-bold text-lg ${isGreen ? "text-neon-green" : "text-neon-purple"}`}>
                          0{(item as MainItem).num}
                        </span>
                      )}
                    </div>

                    {/* Title + description */}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-display font-bold text-base lg:text-lg text-cream leading-tight">
                        {item.title}
                      </h3>
                      <p className="font-body text-muted text-sm mt-1 leading-snug line-clamp-1">
                        {item.description}
                      </p>
                    </div>

                    {/* Expand icon */}
                    <motion.div
                      animate={{ rotate: isOpen ? 45 : 0 }}
                      transition={{ duration: 0.2 }}
                      className={`shrink-0 w-8 h-8 rounded-full border flex items-center justify-center text-sm font-bold transition-colors duration-300
                        ${isOpen
                          ? isGreen || isBonus ? "border-neon-green/50 text-neon-green bg-neon-green/10" : "border-neon-purple/50 text-neon-purple bg-neon-purple/10"
                          : "border-white/15 text-muted"
                        }`}
                    >
                      +
                    </motion.div>
                  </div>

                  {/* Expanded content */}
                  <motion.div
                    initial={false}
                    animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
                    transition={{ duration: 0.3, ease: [0.21, 0.47, 0.32, 0.98] }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-7">
                      <div className={`flex flex-col ${(item as MainItem).hasVideo ? "lg:flex-row" : ""} gap-8`}>
                        {/* Detail list */}
                        <div className="flex-1">
                          <p className="font-body text-muted/80 text-sm leading-relaxed mb-5">
                            {item.description}
                          </p>
                          <ul className="space-y-2.5">
                            {item.detail.map((d, j) => (
                              <li key={j} className="flex items-start gap-3">
                                <span className={`shrink-0 w-5 h-5 rounded-full flex items-center justify-center mt-0.5 text-[10px] font-bold
                                  ${isBonus || isGreen
                                    ? "bg-neon-green/12 border border-neon-green/30 text-neon-green"
                                    : "bg-neon-purple/12 border border-neon-purple/30 text-neon-purple"
                                  }`}>
                                  ✓
                                </span>
                                <span className="font-body text-sm text-cream/75 leading-snug">{d}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Video slot */}
                        {(item as MainItem).hasVideo && (
                          <div className="lg:w-48 flex-shrink-0">
                            <VideoSlot label={(item as MainItem).videoLabel} />
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              </AnimatedSection>
            );
          })}
        </div>

        {/* Summary bar */}
        <AnimatedSection delay={0.4} className="mt-10">
          <div className="relative flex flex-wrap items-center justify-center gap-4 py-5 px-6 rounded-2xl border border-white/8 bg-white/[0.02]">
            {[
              { label: "Cerebro IA", color: "green" },
              { label: "1 Video VSL", color: "green" },
              { label: "1 Cobertura", color: "purple" },
              { label: "8 Videos con IA", color: "green" },
              { label: "3 Carruseles + 2 Posts", color: "purple" },
            ].map((tag, i) => (
              <span key={i} className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-display font-semibold
                ${tag.color === "green"
                  ? "bg-neon-green/10 border border-neon-green/25 text-neon-green"
                  : "bg-neon-purple/10 border border-neon-purple/25 text-neon-purple"
                }`}>
                <span className={`w-1.5 h-1.5 rounded-full ${tag.color === "green" ? "bg-neon-green" : "bg-neon-purple"}`} />
                {tag.label}
              </span>
            ))}
          </div>
        </AnimatedSection>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-neon-purple/25 to-transparent" />
    </section>
  );
}
