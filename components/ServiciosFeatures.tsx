"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

// ── Replace with YouTube/Vimeo ID when ready ──────────────────
const VSL_EMBED_ID: string | null = null;

const steps = [
  {
    num: "01",
    icon: "🎯",
    title: "Diagnóstico estratégico",
    desc: "Una conversación profunda para entender tu empresa, tus clientes y el gap de comunicación. Salimos con el mensaje central claro.",
    color: "green" as const,
  },
  {
    num: "02",
    icon: "🎬",
    title: "60 días de implementación",
    desc: "Producción real en campo, edición profesional, IA generativa y entrega de activos. Sin apuros, sin intermediarios.",
    color: "purple" as const,
  },
  {
    num: "03",
    icon: "✨",
    title: "Sistema instalado y activo",
    desc: "Tu empresa sale con videos, estrategia, Cerebro IA y activos de comunicación listos para escalar.",
    color: "green" as const,
  },
];

// ── VSL Section ───────────────────────────────────────────────

function VSLPlayer() {
  const [hovered, setHovered] = useState(false);

  if (VSL_EMBED_ID) {
    return (
      <div
        className="relative rounded-2xl overflow-hidden border border-neon-green/25"
        style={{ aspectRatio: "16/9" }}
      >
        <iframe
          src={`https://www.youtube.com/embed/${VSL_EMBED_ID}?rel=0`}
          className="absolute inset-0 w-full h-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    );
  }

  return (
    <div
      className="relative rounded-2xl overflow-hidden"
      style={{
        aspectRatio: "16/9",
        background: "rgba(4,5,8,0.98)",
        border: `1px solid ${hovered ? "rgba(0,255,135,0.45)" : "rgba(0,255,135,0.15)"}`,
        boxShadow: hovered
          ? "0 0 0 1px rgba(0,255,135,0.2), 0 0 80px rgba(0,255,135,0.12), inset 0 0 60px rgba(0,255,135,0.03)"
          : "none",
        transition: "border-color 0.35s ease, box-shadow 0.35s ease",
        cursor: "default",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Grid overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,255,135,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,135,0.04) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
          opacity: hovered ? 1 : 0.5,
          transition: "opacity 0.35s ease",
        }}
      />
      {/* Scanlines */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "repeating-linear-gradient(0deg, rgba(0,0,0,0.06) 0px, rgba(0,0,0,0.06) 1px, transparent 1px, transparent 5px)",
        }}
      />
      {/* Radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at 50% 50%, rgba(0,255,135,0.07) 0%, transparent 65%)",
          opacity: hovered ? 1 : 0.4,
          transition: "opacity 0.35s ease",
        }}
      />

      {/* HUD corners */}
      <div className="absolute top-5 left-5 w-7 h-7" style={{ borderTop: "1.5px solid rgba(0,255,135,0.55)", borderLeft: "1.5px solid rgba(0,255,135,0.55)", borderRadius: "5px 0 0 0" }} />
      <div className="absolute top-5 right-5 w-7 h-7" style={{ borderTop: "1.5px solid rgba(0,255,135,0.55)", borderRight: "1.5px solid rgba(0,255,135,0.55)", borderRadius: "0 5px 0 0" }} />
      <div className="absolute bottom-5 left-5 w-7 h-7" style={{ borderBottom: "1.5px solid rgba(0,255,135,0.55)", borderLeft: "1.5px solid rgba(0,255,135,0.55)", borderRadius: "0 0 0 5px" }} />
      <div className="absolute bottom-5 right-5 w-7 h-7" style={{ borderBottom: "1.5px solid rgba(0,255,135,0.55)", borderRight: "1.5px solid rgba(0,255,135,0.55)", borderRadius: "0 0 5px 0" }} />

      {/* Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-6">
        {/* Play button */}
        <div className="relative">
          {/* Pulse rings */}
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{ background: "rgba(0,255,135,0.06)" }}
            animate={{ scale: [1, 1.8, 1], opacity: [0.6, 0, 0.6] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{ background: "rgba(0,255,135,0.04)" }}
            animate={{ scale: [1, 2.4, 1], opacity: [0.4, 0, 0.4] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
          />
          {/* Button */}
          <motion.div
            className="relative flex items-center justify-center"
            style={{
              width: 80, height: 80,
              borderRadius: "50%",
              background: "rgba(0,255,135,0.1)",
              border: "1.5px solid rgba(0,255,135,0.5)",
              boxShadow: hovered ? "0 0 40px rgba(0,255,135,0.3)" : "0 0 20px rgba(0,255,135,0.12)",
              transition: "box-shadow 0.35s ease",
            }}
            animate={{ scale: [1, 1.04, 1] }}
            transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-9 h-9 text-neon-green ml-1">
              <path d="M8 5v14l11-7z" />
            </svg>
          </motion.div>
        </div>

        <div className="text-center px-6">
          <p className="font-display font-bold text-cream text-base mb-1.5">Video de presentación — próximamente</p>
          <p className="font-body text-muted/55 text-sm">
            Aquí irá el VSL explicando el sistema cuando esté grabado
          </p>
        </div>

        {/* Bottom tag */}
        <div
          className="absolute bottom-5 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full"
          style={{
            background: "rgba(0,255,135,0.08)",
            border: "1px solid rgba(0,255,135,0.2)",
          }}
        >
          <span className="font-display font-semibold text-[10px] tracking-[0.2em] uppercase text-neon-green/70">
            Sistema Audiovisual de Autoridad · 3 min
          </span>
        </div>
      </div>

      {/* Top accent line */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, rgba(0,255,135,0.7), transparent)" }}
      />
    </div>
  );
}

function VSLSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section ref={ref} className="relative py-14 overflow-hidden" style={{ background: "#050608" }}>
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-neon-green/20 to-transparent" />
      <div className="absolute top-0 right-0 w-[500px] h-[300px] rounded-full bg-neon-green/5 blur-[100px] pointer-events-none" />

      <div className="container-base">
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, ease: [0.21, 0.47, 0.32, 0.98] }}
        >
          <span className="inline-flex items-center gap-2 text-xs font-display font-semibold tracking-[0.2em] uppercase text-neon-green mb-3">
            <span className="w-5 h-px bg-neon-green/50" />
            Ve el sistema antes de decidir
            <span className="w-5 h-px bg-neon-green/50" />
          </span>
          <h2 className="font-display font-bold text-2xl lg:text-3xl text-cream">
            ¿Qué es el Sistema Audiovisual de Autoridad?
          </h2>
        </motion.div>

        <motion.div
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.12, ease: [0.21, 0.47, 0.32, 0.98] }}
        >
          <VSLPlayer />
        </motion.div>
      </div>
    </section>
  );
}

// ── How It Works Section ──────────────────────────────────────

function StepCard({
  step,
  index,
  inView,
}: {
  step: (typeof steps)[0];
  index: number;
  inView: boolean;
}) {
  const [hovered, setHovered] = useState(false);
  const isGreen = step.color === "green";
  const rgb = isGreen ? "0,255,135" : "204,68,255";

  return (
    <motion.div
      initial={{ opacity: 0, y: 36 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: 0.1 + index * 0.12, ease: [0.21, 0.47, 0.32, 0.98] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        borderRadius: 20,
        padding: "32px 28px",
        border: `1px solid ${hovered ? `rgba(${rgb},0.5)` : `rgba(${rgb},0.12)`}`,
        background: hovered ? `rgba(${rgb},0.06)` : `rgba(${rgb},0.02)`,
        boxShadow: hovered
          ? `0 0 0 1px rgba(${rgb},0.2), 0 0 50px rgba(${rgb},0.1), inset 0 0 40px rgba(${rgb},0.04)`
          : "none",
        transform: hovered ? "translateY(-5px)" : "translateY(0)",
        transition: "border-color 0.3s ease, background 0.3s ease, box-shadow 0.3s ease, transform 0.3s ease",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Top accent line */}
      <div
        style={{
          position: "absolute", top: 0, left: 0, right: 0, height: 2,
          background: `linear-gradient(90deg, rgba(${rgb},0.85) 0%, transparent 100%)`,
          opacity: hovered ? 1 : 0.25,
          transition: "opacity 0.3s ease",
        }}
      />
      {/* Inner bloom */}
      <div
        style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          background: `radial-gradient(ellipse at 20% 0%, rgba(${rgb},0.08) 0%, transparent 65%)`,
          opacity: hovered ? 1 : 0,
          transition: "opacity 0.3s ease",
        }}
      />

      {/* Number + icon row */}
      <div className="flex items-start justify-between mb-5">
        <span
          style={{
            fontFamily: "Space Grotesk, sans-serif",
            fontWeight: 800,
            fontSize: "3.5rem",
            lineHeight: 1,
            background: `linear-gradient(135deg, rgba(${rgb},0.95) 0%, rgba(${rgb},0.25) 100%)`,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            opacity: hovered ? 1 : 0.8,
            transition: "opacity 0.3s ease",
          }}
        >
          {step.num}
        </span>
        <div
          style={{
            width: 48, height: 48, borderRadius: 14, flexShrink: 0,
            background: `rgba(${rgb},0.1)`,
            border: `1px solid rgba(${rgb},0.28)`,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: "1.35rem",
            boxShadow: hovered ? `0 0 24px rgba(${rgb},0.25)` : "none",
            transition: "box-shadow 0.3s ease",
          }}
        >
          {step.icon}
        </div>
      </div>

      {/* Divider */}
      <div
        style={{
          height: 1, marginBottom: 16,
          background: `linear-gradient(90deg, rgba(${rgb},0.5) 0%, transparent 100%)`,
          transform: hovered ? "scaleX(1)" : "scaleX(0.5)",
          transformOrigin: "left",
          transition: "transform 0.35s ease",
        }}
      />

      <h3 className="font-display font-bold text-lg text-cream tracking-tight mb-2">
        {step.title}
      </h3>
      <p className="font-body text-sm leading-relaxed" style={{ color: "rgba(176,200,184,0.85)" }}>
        {step.desc}
      </p>
    </motion.div>
  );
}

function HowItWorksSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section ref={ref} className="relative py-16 overflow-hidden" style={{ background: "#050608" }}>
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-neon-purple/20 to-neon-green/20" />
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse at 50% 50%, rgba(204,68,255,0.04) 0%, transparent 60%)" }} />

      <div className="container-base">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98] }}
        >
          <span className="inline-flex items-center gap-2 text-xs font-display font-semibold tracking-[0.2em] uppercase text-neon-purple mb-3">
            <span className="w-5 h-px bg-neon-purple/50" />
            El proceso
            <span className="w-5 h-px bg-neon-purple/50" />
          </span>
          <h2 className="font-display font-bold text-2xl lg:text-3xl text-cream mb-3">
            Cómo funciona en 3 pasos
          </h2>
          <p className="font-body text-muted text-sm max-w-lg mx-auto">
            Sin burocracia. Sin capas. Directo desde el diagnóstico hasta el sistema instalado.
          </p>
        </motion.div>

        {/* Steps grid */}
        <div className="relative grid lg:grid-cols-3 gap-5">
          {/* Connector line (desktop) */}
          <motion.div
            className="hidden lg:block absolute pointer-events-none"
            style={{
              top: 36,
              left: "calc(33.33% - 10px)",
              right: "calc(33.33% - 10px)",
              height: 1,
              background: "linear-gradient(90deg, rgba(0,255,135,0.3) 0%, rgba(204,68,255,0.5) 50%, rgba(0,255,135,0.3) 100%)",
            }}
            initial={{ scaleX: 0 }}
            animate={inView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          />
          {steps.map((step, i) => (
            <StepCard key={i} step={step} index={i} inView={inView} />
          ))}
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-neon-green/20 to-transparent" />
    </section>
  );
}

// ── Main export ───────────────────────────────────────────────

export default function ServiciosFeatures() {
  return (
    <>
      <VSLSection />
      <HowItWorksSection />
    </>
  );
}
