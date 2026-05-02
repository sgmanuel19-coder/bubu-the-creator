"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Stethoscope, Home, Scale, GraduationCap, Heart, TrendingUp, Building2, Wifi, Zap, Briefcase, X, CheckCircle2 } from "lucide-react";
import { Gravity, MatterBody } from "@/components/ui/gravity";
import { WaveText } from "@/components/ui/wave-text";

// ── Types ─────────────────────────────────────────────────────
type Step = { number: string; title: string; description: string };
type Industry = { icon: React.ElementType; label: string; description: string };

// ── VSL Section ───────────────────────────────────────────────
const VSL_EMBED_ID: string | null = "pKEcI6peLSA";

function VSLPlayer() {
  const [hovered, setHovered] = useState(false);

  if (VSL_EMBED_ID) {
    return (
      <div
        className="relative rounded-2xl overflow-hidden"
        style={{ aspectRatio: "16/9", border: "1px solid rgba(26,128,255,0.25)" }}
      >
        <iframe
          src={`https://www.youtube.com/embed/${VSL_EMBED_ID}?rel=0`}
          className="absolute inset-0 w-full h-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          loading="lazy"
          title="Conoce el Sistema RESUELTO IA — Automatización WhatsApp para tu negocio"
        />
      </div>
    );
  }

  return (
    <div
      className="relative rounded-2xl overflow-hidden"
      style={{
        aspectRatio: "16/9",
        background: "rgba(4,4,6,0.98)",
        border: `1px solid ${hovered ? "rgba(26,128,255,0.5)" : "rgba(26,128,255,0.12)"}`,
        boxShadow: hovered
          ? "0 0 0 1px rgba(26,128,255,0.2), 0 0 80px rgba(26,128,255,0.12), inset 0 0 60px rgba(26,128,255,0.03)"
          : "none",
        transition: "border-color 0.35s ease, box-shadow 0.35s ease",
        cursor: "default",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(26,128,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(26,128,255,0.04) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
          opacity: hovered ? 1 : 0.5,
          transition: "opacity 0.35s ease",
        }}
      />
      {/* Scanlines */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "repeating-linear-gradient(0deg, rgba(0,0,0,0.06) 0px, rgba(0,0,0,0.06) 1px, transparent 1px, transparent 5px)",
        }}
      />
      {/* Radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at 50% 50%, rgba(26,128,255,0.07) 0%, transparent 65%)",
          opacity: hovered ? 1 : 0.4,
          transition: "opacity 0.35s ease",
        }}
      />
      {/* HUD corners */}
      <div className="absolute top-5 left-5 w-7 h-7" style={{ borderTop: "1.5px solid rgba(26,128,255,0.55)", borderLeft: "1.5px solid rgba(26,128,255,0.55)", borderRadius: "5px 0 0 0" }} />
      <div className="absolute top-5 right-5 w-7 h-7" style={{ borderTop: "1.5px solid rgba(26,128,255,0.55)", borderRight: "1.5px solid rgba(26,128,255,0.55)", borderRadius: "0 5px 0 0" }} />
      <div className="absolute bottom-5 left-5 w-7 h-7" style={{ borderBottom: "1.5px solid rgba(26,128,255,0.55)", borderLeft: "1.5px solid rgba(26,128,255,0.55)", borderRadius: "0 0 0 5px" }} />
      <div className="absolute bottom-5 right-5 w-7 h-7" style={{ borderBottom: "1.5px solid rgba(26,128,255,0.55)", borderRight: "1.5px solid rgba(26,128,255,0.55)", borderRadius: "0 0 5px 0" }} />
      {/* Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-6">
        <div className="relative">
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{ background: "rgba(26,128,255,0.06)" }}
            animate={{ scale: [1, 1.8, 1], opacity: [0.6, 0, 0.6] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{ background: "rgba(26,128,255,0.04)" }}
            animate={{ scale: [1, 2.5, 1], opacity: [0.4, 0, 0.4] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
          />
          <motion.div
            className="relative flex items-center justify-center"
            style={{
              width: 80, height: 80, borderRadius: "50%",
              background: "rgba(26,128,255,0.1)",
              border: "1.5px solid rgba(26,128,255,0.5)",
              boxShadow: hovered ? "0 0 40px rgba(26,128,255,0.3)" : "0 0 20px rgba(26,128,255,0.12)",
              transition: "box-shadow 0.35s ease",
            }}
            animate={{ scale: [1, 1.04, 1] }}
            transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
          >
            <svg viewBox="0 0 24 24" fill="#1A80FF" style={{ width: 32, height: 32, marginLeft: 4 }}>
              <path d="M8 5v14l11-7z" />
            </svg>
          </motion.div>
        </div>
        <div style={{ textAlign: "center", padding: "0 24px" }}>
          <p style={{ fontFamily: "Poppins, sans-serif", fontWeight: 700, color: "#f8f8f2", fontSize: "1rem", marginBottom: 6 }}>
            Video de presentación — próximamente
          </p>
          <p style={{ fontFamily: "Inter, sans-serif", color: "rgba(248,248,242,0.45)", fontSize: "0.875rem" }}>
            Aquí irá el VSL explicando el sistema cuando esté grabado
          </p>
        </div>
        <div
          className="hidden sm:block"
          style={{
            position: "absolute", bottom: 20, left: "50%", transform: "translateX(-50%)",
            padding: "6px 16px", borderRadius: 999,
            background: "rgba(26,128,255,0.08)", border: "1px solid rgba(26,128,255,0.2)",
            whiteSpace: "nowrap",
          }}
        >
          <span style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600, fontSize: "0.625rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(26,128,255,0.7)" }}>
            Sistema Express de Atención IA · 3 min
          </span>
        </div>
      </div>
      {/* Top accent */}
      <div className="absolute top-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, rgba(26,128,255,0.7), transparent)" }} />
    </div>
  );
}

export function VSLSectionIA() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section ref={ref} className="py-16 px-4 relative overflow-hidden" style={{ background: "#040406" }}>
      <div className="absolute top-0 left-0 right-0 h-px beam-divider" />
      <div className="absolute right-0 top-0 w-96 h-64 rounded-full pointer-events-none"
        style={{ background: "rgba(26,128,255,0.04)", filter: "blur(80px)" }} />

      <div className="max-w-4xl mx-auto">
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: 24, filter: "blur(10px)" }}
          animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
          transition={{ duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }}
        >
          <span style={{ display: "inline-flex", alignItems: "center", gap: 8, fontFamily: "Poppins, sans-serif", fontWeight: 600, fontSize: "0.75rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#1A80FF", marginBottom: 12 }}>
            <span style={{ width: 20, height: 1, background: "rgba(26,128,255,0.5)", display: "inline-block" }} />
            Conoce nuestro sistema RESUELTO IA SYSTEM
            <span style={{ width: 20, height: 1, background: "rgba(26,128,255,0.5)", display: "inline-block" }} />
          </span>
          <h2 style={{ fontFamily: "Poppins, sans-serif", fontWeight: 700, fontSize: "clamp(1.5rem, 4vw, 2.5rem)", color: "#f8f8f2", lineHeight: 1.15 }}>
            ¿Cómo funciona el sistema por dentro?
          </h2>
        </motion.div>

        <motion.div
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

// ── How It Works Animated ─────────────────────────────────────

function StepCardAnimated({ step, index, inView, isLast }: { step: Step; index: number; inView: boolean; isLast: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -40, filter: "blur(8px)" }}
      animate={inView ? { opacity: 1, x: 0, filter: "blur(0px)" } : {}}
      transition={{ duration: 0.6, delay: 0.12 + index * 0.2, ease: [0.21, 0.47, 0.32, 0.98] }}
      style={{ display: "flex", gap: 24, alignItems: "flex-start" }}
    >
      {/* Left: circle + vertical line */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flexShrink: 0 }}>
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={inView ? { scale: 1, opacity: 1 } : {}}
          transition={{ duration: 0.4, delay: 0.18 + index * 0.2, ease: [0.21, 0.47, 0.32, 0.98] }}
          style={{
            width: 52, height: 52, borderRadius: "50%",
            background: "rgba(26,128,255,0.1)",
            border: "1.5px solid rgba(26,128,255,0.45)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontFamily: "Poppins, sans-serif", fontWeight: 800, fontSize: "1.15rem",
            color: "#1A80FF",
            boxShadow: "0 0 24px rgba(26,128,255,0.15)",
          }}
        >
          {step.number}
        </motion.div>
        {!isLast && (
          <motion.div
            initial={{ scaleY: 0 }}
            animate={inView ? { scaleY: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.35 + index * 0.2, ease: "easeOut" }}
            style={{
              width: 1, height: 56, marginTop: 8,
              background: "linear-gradient(180deg, rgba(26,128,255,0.45) 0%, rgba(26,128,255,0.05) 100%)",
              transformOrigin: "top",
            }}
          />
        )}
      </div>

      {/* Right: content */}
      <div style={{ paddingBottom: isLast ? 0 : 40, paddingTop: 12, flex: 1 }}>
        <h3 style={{
          fontFamily: "Poppins, sans-serif", fontWeight: 700,
          fontSize: "1.125rem", color: "#f8f8f2", marginBottom: 8, lineHeight: 1.25,
        }}>
          {step.title}
        </h3>
        <p style={{
          fontFamily: "Inter, sans-serif", fontSize: "0.875rem",
          lineHeight: 1.65, color: "rgba(248,248,242,0.55)",
        }}>
          {step.description}
        </p>
      </div>
    </motion.div>
  );
}

export function HowItWorksAnimated({ steps }: { steps: Step[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section ref={ref} className="py-20 px-4 relative overflow-hidden" style={{ background: "rgba(26,128,255,0.015)" }}>
      <div className="absolute top-0 left-0 right-0 h-px beam-divider" style={{ animationDelay: "0.8s" }} />
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse at 50% 50%, rgba(77,159,255,0.04) 0%, transparent 60%)" }} />

      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
          animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
          transition={{ duration: 0.6 }}
        >
          <span style={{ display: "inline-flex", alignItems: "center", gap: 8, fontFamily: "Poppins, sans-serif", fontWeight: 600, fontSize: "0.75rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#1A80FF", marginBottom: 12 }}>
            <span style={{ width: 20, height: 1, background: "rgba(26,128,255,0.5)", display: "inline-block" }} />
            Como funciona
            <span style={{ width: 20, height: 1, background: "rgba(26,128,255,0.5)", display: "inline-block" }} />
          </span>
          <h2 style={{ fontFamily: "Poppins, sans-serif", fontWeight: 700, fontSize: "clamp(1.75rem, 5vw, 3rem)", color: "#f8f8f2", lineHeight: 1.1 }}>
            3 pasos. Sin complicaciones.
          </h2>
          <p style={{ fontFamily: "Inter, sans-serif", color: "rgba(248,248,242,0.5)", fontSize: "0.95rem", marginTop: 12 }}>
            Te creamos y configuramos un super agente IA para tu negocio
          </p>
        </motion.div>

        {/* Two-column: steps left, image right */}
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">

          {/* Steps */}
          <div className="flex-1 w-full max-w-xl mx-auto lg:mx-0 flex flex-col">
            {steps.map((step, i) => (
              <StepCardAnimated key={step.number} step={step} index={i} inView={inView} isLast={i === steps.length - 1} />
            ))}

            <motion.div
              className="mt-10"
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.65 }}
            >
              <a
                href="https://wa.me/51907462070?text=Hola,%20quiero%20info%20sobre%20el%20Sistema%20de%20Automatizacion%20IA"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 8,
                  padding: '14px 28px', borderRadius: 14,
                  background: 'linear-gradient(135deg, #1A80FF, #4D9FFF)',
                  color: '#fff', fontFamily: 'Poppins, sans-serif',
                  fontWeight: 600, fontSize: '0.9rem',
                  boxShadow: '0 0 28px rgba(26,128,255,0.35)',
                  textDecoration: 'none',
                }}
              >
                Empezar mi diagnóstico →
              </a>
            </motion.div>
          </div>

          {/* Image */}
          <motion.div
            className="flex-1 w-full flex items-center justify-center"
            initial={{ opacity: 0, x: 40, filter: "blur(10px)" }}
            animate={inView ? { opacity: 1, x: 0, filter: "blur(0px)" } : {}}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.21, 0.47, 0.32, 0.98] }}
          >
            <div
              style={{
                position: "relative",
                width: "100%",
                maxWidth: 480,
                borderRadius: 24,
                overflow: "hidden",
                border: "1px solid rgba(26,128,255,0.2)",
                boxShadow: "0 0 80px rgba(26,128,255,0.12), 0 32px 64px rgba(0,0,0,0.4)",
              }}
            >
              {/* Glow overlay */}
              <div
                style={{
                  position: "absolute", inset: 0, zIndex: 1, pointerEvents: "none",
                  background: "linear-gradient(135deg, rgba(26,128,255,0.08) 0%, transparent 50%, rgba(77,159,255,0.06) 100%)",
                }}
              />
              {/* Top accent line */}
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, zIndex: 2, background: "linear-gradient(90deg, transparent, #1A80FF, #4D9FFF, transparent)" }} />
              <img
                src="/robot-ia.jpg"
                alt="Super Agente IA para WhatsApp — RESUELTO"
                style={{ width: "100%", height: "auto", display: "block" }}
              />
            </div>
          </motion.div>

        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px beam-divider" style={{ animationDelay: "2s" }} />
    </section>
  );
}

// ── Industries / Para quién es — Animated ────────────────────

const industryPills = [
  { emoji: '🍽️', label: 'Restaurantes' },
  { emoji: '🏥', label: 'Clínicas estéticas' },
  { emoji: '🏠', label: 'Inmobiliarias' },
  { emoji: '🏨', label: 'Hoteles & hospedajes' },
  { emoji: '🦷', label: 'Odontología' },
  { emoji: '🎓', label: 'Institutos & academias' },
  { emoji: '💪', label: 'Gimnasios & spas' },
  { emoji: '💅', label: 'Salones de belleza' },
  { emoji: '🌿', label: 'Nutricionistas' },
  { emoji: '💼', label: 'Consultoras B2B' },
  { emoji: '✈️', label: 'Agencias de viajes' },
  { emoji: '👗', label: 'Tiendas online' },
  { emoji: '⚖️', label: 'Estudios legales' },
  { emoji: '🚗', label: 'Concesionarios' },
  { emoji: '🏗️', label: 'Constructoras' },
  { emoji: '🧠', label: 'Psicólogos & terapeutas' },
  { emoji: '🏋️', label: 'Entrenadores personales' },
  { emoji: '📱', label: 'Startups tech' },
  { emoji: '📡', label: 'Telecomunicaciones' },
  { emoji: '🎉', label: 'Organizadores de eventos' },
  { emoji: '🔧', label: 'Servicios técnicos' },
  { emoji: '🚚', label: 'Logística & delivery' },
  { emoji: '🎨', label: 'Agencias creativas' },
  { emoji: '📊', label: 'Empresas con pauta Meta' },
  { emoji: '🐾', label: 'Veterinarias' },
  { emoji: '💊', label: 'Farmacias' },
  { emoji: '🏫', label: 'Colegios privados' },
  { emoji: '🎵', label: 'Academias de música' },
  { emoji: '📸', label: 'Fotógrafos & studios' },
  { emoji: '🎯', label: 'Coaches & mentores' },
  { emoji: '🧴', label: 'Skincare & cosmética' },
  { emoji: '💻', label: 'Agencias digitales' },
  { emoji: '🔒', label: 'Seguros & finanzas' },
  { emoji: '🏊', label: 'Centros deportivos' },
  { emoji: '🍕', label: 'Delivery de comida' },
  { emoji: '🏦', label: 'Microfinancieras' },
  { emoji: '🧪', label: 'Laboratorios' },
  { emoji: '🎬', label: 'Productoras de video' },
  { emoji: '🛒', label: 'Tiendas físicas' },
  { emoji: '🌍', label: 'ONGs & fundaciones' },
];

const pillRow1 = industryPills.slice(0, 12);
const pillRow2 = industryPills.slice(12);

function IndustryPill({ item, blue }: { item: typeof industryPills[0]; blue: boolean }) {
  const [hovered, setHovered] = useState(false);
  const accent = blue ? '26,128,255' : '77,159,255';
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'inline-flex', alignItems: 'center', gap: 8,
        padding: '9px 18px', borderRadius: 999, whiteSpace: 'nowrap', flexShrink: 0,
        border: `1px solid rgba(${accent},${hovered ? 0.55 : 0.18})`,
        background: hovered ? `rgba(${accent},0.1)` : 'rgba(255,255,255,0.03)',
        boxShadow: hovered ? `0 0 20px rgba(${accent},0.15)` : 'none',
        transition: 'all 0.22s ease',
        cursor: 'default',
      }}
    >
      <span style={{ fontSize: '1rem' }}>{item.emoji}</span>
      <span style={{
        fontFamily: 'Poppins, sans-serif', fontWeight: 600, fontSize: '0.8rem',
        color: hovered ? '#f8f8f2' : 'rgba(248,248,242,0.6)',
        transition: 'color 0.22s ease',
      }}>{item.label}</span>
    </div>
  );
}

export function IndustriesSectionAnimated() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <section ref={ref} className="py-20 relative overflow-hidden" style={{ background: "rgba(77,159,255,0.02)" }}>
      <div className="absolute top-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, rgba(77,159,255,0.2), transparent)" }} />
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse at 50% 60%, rgba(77,159,255,0.04) 0%, transparent 65%)" }} />

      {/* Header */}
      <div className="px-4">
        <motion.div
          className="text-center mb-14 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
          animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
          transition={{ duration: 0.6 }}
        >
          <span style={{ display: "inline-flex", alignItems: "center", gap: 8, fontFamily: "Poppins, sans-serif", fontWeight: 600, fontSize: "0.75rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#4D9FFF", marginBottom: 12 }}>
            <span style={{ width: 20, height: 1, background: "rgba(77,159,255,0.5)", display: "inline-block" }} />
            Para quien es
            <span style={{ width: 20, height: 1, background: "rgba(77,159,255,0.5)", display: "inline-block" }} />
          </span>
          <h2 style={{ fontFamily: "Poppins, sans-serif", fontWeight: 700, fontSize: "clamp(1.75rem, 5vw, 3rem)", color: "#f8f8f2", lineHeight: 1.15 }}>
            Si recibes clientes por WhatsApp<br />
            <WaveText text="el agente trabaja por ti." className="text-[#4D9FFF]" />
          </h2>
          <p style={{ fontFamily: "Inter, sans-serif", color: "rgba(248,248,242,0.5)", fontSize: "0.95rem", marginTop: 12 }}>
            No importa la industria — si recibes mensajes y necesitas responder, agendar o vender, esto es para tu negocio.
          </p>
          <p style={{ fontFamily: "Inter, sans-serif", color: "rgba(248,248,242,0.35)", fontSize: "0.78rem", marginTop: 8 }}>
            Arrastra las industrias 👆
          </p>
        </motion.div>
      </div>

      {/* Gravity physics box */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay: 0.25 }}
        style={{ padding: '0 16px' }}
      >
        <div
          style={{
            position: "relative",
            height: 420,
            borderRadius: 20,
            border: "1px solid rgba(77,159,255,0.22)",
            background: "linear-gradient(135deg, rgba(26,128,255,0.08) 0%, rgba(4,4,6,0.95) 40%, rgba(77,159,255,0.06) 100%)",
            overflow: "hidden",
            boxShadow: "0 0 80px rgba(26,128,255,0.08), inset 0 0 60px rgba(77,159,255,0.04)",
          }}
        >
          <div style={{ position:"absolute", top:10, left:10, width:16, height:16, borderTop:"1.5px solid rgba(77,159,255,0.4)", borderLeft:"1.5px solid rgba(77,159,255,0.4)", borderRadius:"4px 0 0 0", pointerEvents:"none" }} />
          <div style={{ position:"absolute", top:10, right:10, width:16, height:16, borderTop:"1.5px solid rgba(77,159,255,0.4)", borderRight:"1.5px solid rgba(77,159,255,0.4)", borderRadius:"0 4px 0 0", pointerEvents:"none" }} />
          <div style={{ position:"absolute", bottom:10, left:10, width:16, height:16, borderBottom:"1.5px solid rgba(77,159,255,0.4)", borderLeft:"1.5px solid rgba(77,159,255,0.4)", borderRadius:"0 0 0 4px", pointerEvents:"none" }} />
          <div style={{ position:"absolute", bottom:10, right:10, width:16, height:16, borderBottom:"1.5px solid rgba(77,159,255,0.4)", borderRight:"1.5px solid rgba(77,159,255,0.4)", borderRadius:"0 0 4px 0", pointerEvents:"none" }} />
          {inView && (
            <Gravity gravity={{ x: 0, y: 1 }} grabCursor addTopWall className="w-full h-full">
              {industryPills.map((pill, i) => (
                <MatterBody
                  key={pill.label}
                  x={gravityPositions[i % gravityPositions.length].x}
                  y={gravityPositions[i % gravityPositions.length].y}
                  matterBodyOptions={{ friction: 0.55, restitution: 0.25, density: 0.004 }}
                >
                  <div
                    style={{
                      padding: "10px 18px",
                      borderRadius: 999,
                      border: `1px solid rgba(77,159,255,0.6)`,
                      background: `rgba(77,159,255,0.12)`,
                      fontFamily: "Poppins, sans-serif",
                      fontWeight: 700,
                      fontSize: "0.82rem",
                      color: "#f8f8f2",
                      whiteSpace: "nowrap",
                      cursor: "grab",
                      userSelect: "none",
                      display: "flex",
                      alignItems: "center",
                      gap: 6,
                      boxShadow: `0 0 14px rgba(77,159,255,0.18)`,
                    }}
                  >
                    <span style={{ fontSize: "1rem" }}>{pill.emoji}</span>
                    <span>{pill.label}</span>
                  </div>
                </MatterBody>
              ))}
            </Gravity>
          )}
        </div>
      </motion.div>

      {/* Bottom badge */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay: 0.5 }}
        style={{ textAlign: 'center', marginTop: 40, padding: '0 16px' }}
      >
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 10,
          padding: '10px 24px', borderRadius: 999,
          background: 'rgba(26,128,255,0.07)', border: '1px solid rgba(26,128,255,0.2)',
        }}>
          <span style={{ fontSize: '1.1rem' }}>💬</span>
          <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.82rem', color: 'rgba(248,248,242,0.6)' }}>
            Si recibes mensajes y los pierdes —{' '}
            <strong style={{ color: '#f8f8f2', fontWeight: 600 }}>esto es para ti</strong>
          </span>
        </div>
        <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.75rem', color: 'rgba(248,248,242,0.25)', marginTop: 12 }}>
          No apto para negocios que reciben menos de 10 mensajes por semana
        </p>
      </motion.div>

      <div className="absolute bottom-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, rgba(77,159,255,0.15), transparent)" }} />
    </section>
  );
}

// ── Integrations Strip ────────────────────────────────────────

const integrations = [
  { name: "WhatsApp Business",  color: "37,211,102"  },
  { name: "Instagram DM",       color: "204,68,255"  },
  { name: "Google Calendar",    color: "66,133,244"  },
  { name: "n8n",                color: "235,86,21"   },
  { name: "Make.com",           color: "102,153,255" },
  { name: "Notion",             color: "248,248,242" },
  { name: "Gmail",              color: "219,68,55"   },
  { name: "Calendly",           color: "0,106,255"   },
  { name: "Google Sheets",      color: "52,168,83"   },
  { name: "HubSpot",            color: "255,122,0"   },
  { name: "Zapier",             color: "255,79,0"    },
  { name: "Stripe",             color: "99,91,255"   },
  { name: "Twilio",             color: "245,22,67"   },
  { name: "Telegram",           color: "0,136,204"   },
  { name: "Airtable",           color: "18,196,190"  },
  { name: "Slack",              color: "74,21,75"    },
  { name: "Pipedrive",          color: "38,159,122"  },
  { name: "ActiveCampaign",     color: "57,163,255"  },
  { name: "Typeform",           color: "255,255,255" },
  { name: "Shopify",            color: "149,191,71"  },
  { name: "Facebook Messenger", color: "0,132,255"   },
  { name: "Mailchimp",          color: "255,232,88"  },
  { name: "OpenAI",             color: "16,163,127"  },
  { name: "Google Ads",         color: "66,133,244"  },
];

const intRow1 = integrations.slice(0, 12);
const intRow2 = integrations.slice(12);

const gravityPositions = [
  { x: "10%", y: "1%"  }, { x: "25%", y: "3%"  }, { x: "42%", y: "1%"  }, { x: "58%", y: "4%"  },
  { x: "74%", y: "2%"  }, { x: "88%", y: "5%"  }, { x: "16%", y: "8%"  }, { x: "33%", y: "10%" },
  { x: "50%", y: "7%"  }, { x: "66%", y: "11%" }, { x: "80%", y: "9%"  }, { x: "8%",  y: "14%" },
  { x: "22%", y: "16%" }, { x: "40%", y: "13%" }, { x: "56%", y: "17%" }, { x: "72%", y: "15%" },
  { x: "86%", y: "18%" }, { x: "14%", y: "22%" }, { x: "30%", y: "20%" }, { x: "48%", y: "23%" },
  { x: "64%", y: "21%" }, { x: "78%", y: "24%" }, { x: "20%", y: "28%" }, { x: "55%", y: "26%" },
];

export function IntegrationsStrip() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section ref={ref} className="py-16 relative overflow-hidden" style={{ background: "#040406" }}>
      <div className="absolute top-0 left-0 right-0 h-px beam-divider" />

      <div className="max-w-2xl mx-auto px-4">
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: 16, filter: "blur(8px)" }}
          animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
          transition={{ duration: 0.55 }}
        >
          <span style={{ display: "inline-flex", alignItems: "center", gap: 8, fontFamily: "Poppins, sans-serif", fontWeight: 600, fontSize: "0.75rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#1A80FF", marginBottom: 10 }}>
            <span style={{ width: 16, height: 1, background: "rgba(26,128,255,0.5)", display: "inline-block" }} />
            Integraciones
            <span style={{ width: 16, height: 1, background: "rgba(26,128,255,0.5)", display: "inline-block" }} />
          </span>
          <h2 style={{ fontFamily: "Poppins, sans-serif", fontWeight: 700, fontSize: "clamp(1.25rem, 3vw, 2rem)", color: "#f8f8f2" }}>
            Se conecta con las herramientas que ya usas
          </h2>
          <p style={{ fontFamily: "Inter, sans-serif", color: "rgba(248,248,242,0.35)", fontSize: "0.78rem", marginTop: 8 }}>
            +24 integraciones disponibles
          </p>
        </motion.div>
      </div>

      {/* Dual marquee — full width */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.7, delay: 0.25 }}
        style={{ display: 'flex', flexDirection: 'column', gap: 12 }}
      >
        {/* Row 1 — scroll left */}
        <div style={{
          overflow: 'hidden',
          maskImage: 'linear-gradient(90deg, transparent 0%, black 5%, black 95%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(90deg, transparent 0%, black 5%, black 95%, transparent 100%)',
        }}>
          <motion.div
            animate={{ x: ['0%', '-50%'] }}
            transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
            style={{ display: 'flex', gap: 10, width: 'max-content', padding: '4px 0' }}
          >
            {[...intRow1, ...intRow1].map((item, i) => (
              <div
                key={`ir1-${i}`}
                style={{
                  display: 'inline-flex', alignItems: 'center',
                  padding: '9px 18px', borderRadius: 999, whiteSpace: 'nowrap', flexShrink: 0,
                  border: `1px solid rgba(${item.color},0.4)`,
                  background: `rgba(${item.color},0.08)`,
                  fontFamily: 'Poppins, sans-serif', fontWeight: 600, fontSize: '0.8rem',
                  color: 'rgba(248,248,242,0.7)',
                  cursor: 'default',
                }}
              >
                {item.name}
              </div>
            ))}
          </motion.div>
        </div>

        {/* Row 2 — scroll right */}
        <div style={{
          overflow: 'hidden',
          maskImage: 'linear-gradient(90deg, transparent 0%, black 5%, black 95%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(90deg, transparent 0%, black 5%, black 95%, transparent 100%)',
        }}>
          <motion.div
            animate={{ x: ['-50%', '0%'] }}
            transition={{ duration: 32, repeat: Infinity, ease: 'linear' }}
            style={{ display: 'flex', gap: 10, width: 'max-content', padding: '4px 0' }}
          >
            {[...intRow2, ...intRow2].map((item, i) => (
              <div
                key={`ir2-${i}`}
                style={{
                  display: 'inline-flex', alignItems: 'center',
                  padding: '9px 18px', borderRadius: 999, whiteSpace: 'nowrap', flexShrink: 0,
                  border: `1px solid rgba(${item.color},0.4)`,
                  background: `rgba(${item.color},0.08)`,
                  fontFamily: 'Poppins, sans-serif', fontWeight: 600, fontSize: '0.8rem',
                  color: 'rgba(248,248,242,0.7)',
                  cursor: 'default',
                }}
              >
                {item.name}
              </div>
            ))}
          </motion.div>
        </div>
      </motion.div>

      <div className="absolute bottom-0 left-0 right-0 h-px beam-divider" style={{ animationDelay: "1.5s" }} />
    </section>
  );
}

// ── Vs Simple Bot — Animated ──────────────────────────────────

const vsRows = [
  { feature: 'Responde preguntas',     emoji: '💬', simple: 'Respuestas fijas predefinidas',         resuelto: 'Entiende contexto y adapta la respuesta con IA' },
  { feature: 'Calificación de leads',  emoji: '🎯', simple: 'No filtra — todo parece un lead',        resuelto: 'Identifica interés, presupuesto y urgencia real' },
  { feature: 'Integración de agenda',  emoji: '📅', simple: 'Sin integración',                        resuelto: 'Agenda directo en Google Calendar o Calendly' },
  { feature: 'Seguimiento automático', emoji: '🔄', simple: 'Se detiene si no responden',             resuelto: 'Secuencias hasta el cierre sin intervención humana' },
  { feature: 'Entrenamiento',          emoji: '🧠', simple: 'Genérico, igual para todos',             resuelto: 'Entrenado con la lógica y el lenguaje de tu negocio' },
  { feature: 'Implementación',         emoji: '⚙️', simple: 'Tú lo configuras solo',                  resuelto: 'Done-For-You + soporte incluido' },
  { feature: 'Registro de leads',      emoji: '📊', simple: 'Sin historial ni memoria',               resuelto: 'Integración a Sheets, CRM o Notion en tiempo real' },
];

function VsRow({ row, index, inView }: { row: typeof vsRows[0]; index: number; inView: boolean }) {
  const [sweeping, setSweeping] = useState(false);
  const [hovered, setHovered] = useState(false);

  const handleClick = () => {
    setSweeping(false);
    requestAnimationFrame(() => {
      setSweeping(true);
      setTimeout(() => setSweeping(false), 750);
    });
  };

  return (
    <motion.div
      onClick={handleClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      initial={{ opacity: 0, x: -28, filter: "blur(6px)" }}
      animate={inView ? { opacity: 1, x: 0, filter: "blur(0px)" } : {}}
      transition={{ duration: 0.5, delay: 0.12 + index * 0.07, ease: [0.21, 0.47, 0.32, 0.98] }}
      style={{
        position: 'relative', overflow: 'hidden',
        display: 'grid', gridTemplateColumns: '1fr 1fr 1fr',
        borderBottom: index < vsRows.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none',
        background: hovered ? 'rgba(26,128,255,0.04)' : 'transparent',
        cursor: 'pointer',
        transition: 'background 0.25s ease',
      }}
    >
      {/* Light sweep on click */}
      <AnimatePresence>
        {sweeping && (
          <motion.div
            key="sweep"
            initial={{ left: '-60%', opacity: 0 }}
            animate={{ left: '150%', opacity: [0, 1, 0] }}
            exit={{}}
            transition={{ duration: 0.65, ease: [0.4, 0, 0.2, 1] }}
            style={{
              position: 'absolute', top: 0, bottom: 0, width: '60%',
              background: 'linear-gradient(90deg, transparent, rgba(26,128,255,0.28), rgba(77,159,255,0.14), transparent)',
              pointerEvents: 'none', zIndex: 2,
            }}
          />
        )}
      </AnimatePresence>

      {/* Feature */}
      <div style={{ padding: '14px 16px', display: 'flex', alignItems: 'center', gap: 10 }}>
        <span style={{ fontSize: '1rem', flexShrink: 0 }}>{row.emoji}</span>
        <span style={{
          fontFamily: 'Poppins, sans-serif', fontWeight: 600, fontSize: '0.82rem',
          color: hovered ? '#f8f8f2' : 'rgba(248,248,242,0.72)',
          transition: 'color 0.22s ease',
        }}>{row.feature}</span>
      </div>

      {/* Bot genérico */}
      <div style={{ padding: '14px 16px', display: 'flex', alignItems: 'center', gap: 8, borderLeft: '1px solid rgba(255,255,255,0.05)' }}>
        <X style={{ width: 13, height: 13, color: 'rgba(255,80,80,0.55)', flexShrink: 0 }} />
        <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.74rem', color: 'rgba(248,248,242,0.33)', lineHeight: 1.4 }}>{row.simple}</span>
      </div>

      {/* RESUELTO IA */}
      <div style={{
        padding: '14px 16px', display: 'flex', alignItems: 'center', gap: 8,
        borderLeft: `1px solid rgba(26,128,255,${hovered ? 0.4 : 0.15})`,
        background: `rgba(26,128,255,${hovered ? 0.08 : 0.03})`,
        transition: 'background 0.25s ease, border-color 0.25s ease',
      }}>
        <CheckCircle2 style={{ width: 13, height: 13, color: hovered ? '#4D9FFF' : '#1A80FF', flexShrink: 0, transition: 'color 0.22s ease' }} />
        <span style={{
          fontFamily: 'Inter, sans-serif', fontSize: '0.74rem', lineHeight: 1.4,
          color: hovered ? 'rgba(248,248,242,0.95)' : 'rgba(248,248,242,0.68)',
          transition: 'color 0.25s ease',
        }}>{row.resuelto}</span>
      </div>
    </motion.div>
  );
}

export function VsSimpleBotSectionAnimated() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section ref={ref} className="py-28 px-4 relative overflow-hidden" style={{ background: 'rgba(26,128,255,0.015)' }}>
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(26,128,255,0.2), transparent)' }} />

      <div className="max-w-4xl mx-auto">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
          animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
          transition={{ duration: 0.6 }}
        >
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontFamily: 'Poppins, sans-serif', fontWeight: 600, fontSize: '0.75rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#1A80FF', marginBottom: 12 }}>
            <span style={{ width: 20, height: 1, background: 'rgba(26,128,255,0.5)', display: 'inline-block' }} />
            El diferencial
            <span style={{ width: 20, height: 1, background: 'rgba(26,128,255,0.5)', display: 'inline-block' }} />
          </span>
          <h2 style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700, fontSize: 'clamp(1.75rem, 5vw, 3rem)', color: '#f8f8f2', lineHeight: 1.1 }}>
            No es un chatbot genérico.<br />
            <WaveText text="Es un sistema comercial." className="text-[#1A80FF]" />
          </h2>
          <p style={{ fontFamily: 'Inter, sans-serif', color: 'rgba(248,248,242,0.5)', fontSize: '0.9rem', marginTop: 14, maxWidth: 520, margin: '14px auto 0' }}>
            Un bot simple responde mensajes. Este sistema califica, agenda y hace seguimiento — sin intervención humana.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.08 }}
          style={{ borderRadius: 20, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.07)', background: 'rgba(255,255,255,0.01)' }}
        >
          {/* Header */}
          <div className="grid grid-cols-3" style={{ background: 'rgba(255,255,255,0.035)', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
            <div style={{ padding: '14px 16px', display: 'flex', alignItems: 'center' }}>
              <span style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600, fontSize: '0.65rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(248,248,242,0.28)' }}>Función</span>
            </div>
            <div style={{ padding: '14px 16px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderLeft: '1px solid rgba(255,255,255,0.06)' }}>
              <span style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700, fontSize: '0.75rem', color: 'rgba(248,248,242,0.32)' }}>Bot genérico</span>
            </div>
            {/* RESUELTO header — glowing */}
            <div style={{ padding: '14px 16px', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden', borderLeft: '1px solid rgba(26,128,255,0.25)', background: 'rgba(26,128,255,0.07)' }}>
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: 'linear-gradient(90deg, transparent, #1A80FF, #4D9FFF, transparent)' }} />
              <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 50% 0%, rgba(26,128,255,0.2) 0%, transparent 70%)', pointerEvents: 'none' }} />
              <span style={{ position: 'relative', fontFamily: 'Poppins, sans-serif', fontWeight: 700, fontSize: '0.75rem', color: '#4D9FFF' }}>RESUELTO IA</span>
            </div>
          </div>

          {vsRows.map((row, i) => (
            <VsRow key={i} row={row} index={i} inView={inView} />
          ))}
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.8 }}
          style={{ textAlign: 'center', marginTop: 16, fontFamily: 'Inter, sans-serif', fontSize: '0.72rem', color: 'rgba(248,248,242,0.22)' }}
        >
          Toca cualquier fila para ver el contraste
        </motion.p>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(26,128,255,0.15), transparent)' }} />
    </section>
  );
}

// ── Chat Demo — Animated ───────────────────────────────────────

type ChatMsg = { from: 'bot' | 'lead'; text: string; time: string };

const chatScenarios: {
  industry: string; emoji: string; botName: string; status: string;
  accent: string; accentHex: string; messages: ChatMsg[];
}[] = [
  {
    industry: 'Clínica',
    emoji: '🏥',
    botName: 'Ana · Clínica Aura',
    status: 'Asistente IA · en línea',
    accent: '0,200,150',
    accentHex: '#00C896',
    messages: [
      { from: 'bot',  text: 'Hola 👋 Soy Ana, asistente de Clínica Aura. ¿Qué tratamiento te interesa hoy?', time: '10:02' },
      { from: 'lead', text: 'Quiero info sobre botox', time: '10:03' },
      { from: 'bot',  text: '¡Perfecto! 💆‍♀️ Tenemos Botox Express desde S/350. ¿Es tu primera vez con nosotros?', time: '10:03' },
      { from: 'lead', text: 'No, ya vine hace unos meses', time: '10:04' },
      { from: 'bot',  text: '¡Qué bueno tenerte de vuelta! 🙌 Como clienta frecuente tienes 10% de descuento. ¿Agendamos esta semana?', time: '10:04' },
      { from: 'lead', text: 'Sí, el jueves si hay disponibilidad', time: '10:05' },
      { from: 'bot',  text: '✅ Jueves 5pm confirmado. Te llega recordatorio automático 24h antes.', time: '10:05' },
    ],
  },
  {
    industry: 'Restaurante',
    emoji: '🍽️',
    botName: 'Roma · Osteria Roma',
    status: 'Reservas · en línea',
    accent: '255,140,50',
    accentHex: '#FF8C32',
    messages: [
      { from: 'bot',  text: '¡Bienvenido a Osteria Roma! 🍝 ¿En qué te puedo ayudar?', time: '19:14' },
      { from: 'lead', text: 'Quiero reservar mesa para el sábado', time: '19:15' },
      { from: 'bot',  text: '¡Con gusto! ¿Para cuántas personas y a qué hora?', time: '19:15' },
      { from: 'lead', text: 'Somos 4, a las 8pm', time: '19:16' },
      { from: 'bot',  text: '¿Hay alguna ocasión especial? 🥂', time: '19:16' },
      { from: 'lead', text: 'Es aniversario de bodas', time: '19:17' },
      { from: 'bot',  text: '¡Feliz aniversario! 🎉 Mesa reservada con ambientación especial. ¿Nombre para la reserva?', time: '19:17' },
    ],
  },
  {
    industry: 'Inmobiliaria',
    emoji: '🏠',
    botName: 'Asistente · Grupo Paredes',
    status: 'Propiedades · en línea',
    accent: '77,159,255',
    accentHex: '#4D9FFF',
    messages: [
      { from: 'bot',  text: 'Hola 👋 ¿Buscas comprar, alquilar o invertir?', time: '11:30' },
      { from: 'lead', text: 'Alquilar un departamento', time: '11:31' },
      { from: 'bot',  text: '¿Qué zona y rango de precio tienes en mente?', time: '11:31' },
      { from: 'lead', text: 'Miraflores, hasta S/2,500 al mes', time: '11:32' },
      { from: 'bot',  text: 'Tenemos 3 opciones en ese rango 🏠 ¿Puedes ver propiedades este fin de semana?', time: '11:32' },
      { from: 'lead', text: 'El sábado en la mañana', time: '11:33' },
      { from: 'bot',  text: '✅ Visita agendada sábado 10am con Carlos, nuestro asesor. ¿Confirmas?', time: '11:33' },
    ],
  },
  {
    industry: 'Salón de Belleza',
    emoji: '💅',
    botName: 'Lumi · Studio Lumi',
    status: 'Reservas · en línea',
    accent: '255,100,200',
    accentHex: '#FF64C8',
    messages: [
      { from: 'bot',  text: 'Hola 💅 Soy Lumi, asistente de Studio Lumi. ¿Qué servicio te interesa?', time: '14:10' },
      { from: 'lead', text: 'Quiero hacerme el tinte y corte', time: '14:11' },
      { from: 'bot',  text: '¡Genial! 🎨 ¿Tienes un color en mente o prefieres consultar con nuestra colorista?', time: '14:11' },
      { from: 'lead', text: 'Quiero algo castaño con mechas', time: '14:12' },
      { from: 'bot',  text: 'Perfecto, ese look queda increíble ✨ El servicio completo toma aprox 2.5h. ¿Qué día te viene bien?', time: '14:12' },
      { from: 'lead', text: 'Este viernes si hay lugar', time: '14:13' },
      { from: 'bot',  text: '✅ Viernes 11am con Valeria confirmado. Te mandamos recordatorio el día anterior 💌', time: '14:13' },
    ],
  },
  {
    industry: 'Gimnasio',
    emoji: '💪',
    botName: 'Max · GymPro',
    status: 'Membresías · en línea',
    accent: '80,220,100',
    accentHex: '#50DC64',
    messages: [
      { from: 'bot',  text: '¡Hola! 💪 Soy Max de GymPro. ¿Quieres info sobre membresías o probar una clase gratis?', time: '09:05' },
      { from: 'lead', text: 'Cuánto cuesta la membresía mensual', time: '09:06' },
      { from: 'bot',  text: 'Tenemos 3 planes: Básico S/99, Full S/149 y Premium S/199 (incluye clases y nutricionista) 🏋️', time: '09:06' },
      { from: 'lead', text: 'Me interesa el Full, ¿puedo visitar primero?', time: '09:07' },
      { from: 'bot',  text: '¡Claro! Te regalo una clase de prueba sin costo. ¿Cuándo te vendría bien?', time: '09:07' },
      { from: 'lead', text: 'Mañana en la tarde', time: '09:08' },
      { from: 'bot',  text: '✅ Clase de prueba mañana 6pm agendada. Te esperamos con ropa cómoda 🔥', time: '09:08' },
    ],
  },
  {
    industry: 'Nutricionista',
    emoji: '🥗',
    botName: 'NutriBot · Dra. Valeria',
    status: 'Consultas · en línea',
    accent: '255,200,50',
    accentHex: '#FFC832',
    messages: [
      { from: 'bot',  text: 'Hola 🥗 Soy el asistente de la Dra. Valeria. ¿Cuál es tu objetivo principal?', time: '08:30' },
      { from: 'lead', text: 'Quiero bajar de peso y comer mejor', time: '08:31' },
      { from: 'bot',  text: '¡Podemos ayudarte! 💚 ¿Tienes alguna condición médica o intolerancia alimentaria que debamos considerar?', time: '08:31' },
      { from: 'lead', text: 'Soy intolerante a la lactosa', time: '08:32' },
      { from: 'bot',  text: 'Anotado 📋 La Dra. Valeria diseña planes 100% personalizados. La primera consulta incluye evaluación + plan. ¿Agendamos?', time: '08:32' },
      { from: 'lead', text: 'Sí, ¿qué días tiene disponibles?', time: '08:33' },
      { from: 'bot',  text: '✅ Martes y jueves disponibles. Te confirmamos fecha y te enviamos formulario previo por aquí.', time: '08:33' },
    ],
  },
  {
    industry: 'Consultora B2B',
    emoji: '💼',
    botName: 'Nexo · Nexo Consulting',
    status: 'Prospección · en línea',
    accent: '160,100,255',
    accentHex: '#A064FF',
    messages: [
      { from: 'bot',  text: 'Hola 👋 Soy el asistente de Nexo Consulting. ¿En qué área busca apoyo su empresa?', time: '10:45' },
      { from: 'lead', text: 'Necesitamos optimizar nuestro proceso de ventas', time: '10:46' },
      { from: 'bot',  text: '¿Cuántas personas tiene el área comercial y cuál es el principal cuello de botella hoy?', time: '10:46' },
      { from: 'lead', text: 'Somos 8 vendedores, el problema es el seguimiento de prospectos', time: '10:47' },
      { from: 'bot',  text: 'Entendido 📊 Trabajamos exactamente eso — implementamos CRM + automatización de seguimiento. ¿Le interesa una reunión de diagnóstico sin costo?', time: '10:47' },
      { from: 'lead', text: 'Sí, ¿cuándo podría ser?', time: '10:48' },
      { from: 'bot',  text: '✅ Agendamos llamada esta semana con nuestro director comercial. ¿Martes o jueves a las 10am?', time: '10:48' },
    ],
  },
];

function ChatWindow({ scenario, inView }: { scenario: typeof chatScenarios[0]; inView: boolean }) {
  const { accent, accentHex } = scenario;
  return (
    <div style={{ borderRadius: 20, overflow: 'hidden', border: `1px solid rgba(${accent},0.22)`, background: '#0d1117', boxShadow: `0 0 80px rgba(${accent},0.07), 0 24px 64px rgba(0,0,0,0.5)` }}>
      {/* Window chrome */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 16px', background: 'rgba(255,255,255,0.03)', borderBottom: `1px solid rgba(${accent},0.1)` }}>
        <div style={{ display: 'flex', gap: 7 }}>
          {['#FF5F57','#FEBC2E','#28C840'].map(c => (
            <div key={c} style={{ width: 11, height: 11, borderRadius: '50%', background: c, opacity: 0.65 }} />
          ))}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <span style={{ width: 7, height: 7, borderRadius: '50%', background: accentHex, boxShadow: `0 0 8px ${accentHex}`, display: 'inline-block' }} />
          <span style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600, fontSize: '0.62rem', color: 'rgba(248,248,242,0.4)', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
            Automatizado · En vivo
          </span>
        </div>
        <div style={{ width: 44 }} />
      </div>

      {/* Chat header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 18px', background: `rgba(${accent},0.06)`, borderBottom: `1px solid rgba(${accent},0.1)` }}>
        <div style={{ width: 40, height: 40, borderRadius: '50%', background: `rgba(${accent},0.14)`, border: `1.5px solid rgba(${accent},0.4)`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.1rem', flexShrink: 0 }}>
          🤖
        </div>
        <div>
          <p style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700, fontSize: '0.88rem', color: '#f8f8f2', marginBottom: 2 }}>{scenario.botName}</p>
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.7rem', color: accentHex }}>{scenario.status}</p>
        </div>
      </div>

      {/* Messages */}
      <div style={{ background: '#0b1017', padding: '18px 16px', display: 'flex', flexDirection: 'column', gap: 9, minHeight: 320 }}>
        {scenario.messages.map((msg, j) => (
          <motion.div
            key={j}
            initial={{ opacity: 0, y: 10, scale: 0.96 }}
            animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
            transition={{ duration: 0.32, delay: 0.3 + j * 0.09, ease: [0.21, 0.47, 0.32, 0.98] }}
            style={{ display: 'flex', justifyContent: msg.from === 'lead' ? 'flex-end' : 'flex-start' }}
          >
            <div style={{
              maxWidth: '70%',
              background: msg.from === 'bot' ? `rgba(${accent},0.09)` : 'rgba(255,255,255,0.07)',
              border: msg.from === 'bot' ? `1px solid rgba(${accent},0.22)` : '1px solid rgba(255,255,255,0.1)',
              borderRadius: msg.from === 'bot' ? '4px 16px 16px 16px' : '16px 4px 16px 16px',
              padding: '9px 13px',
              fontFamily: 'Inter, sans-serif',
              fontSize: '0.82rem',
              color: 'rgba(248,248,242,0.9)',
              lineHeight: 1.5,
            }}>
              {msg.text}
              <span style={{ display: 'block', textAlign: 'right', fontSize: '0.62rem', color: 'rgba(248,248,242,0.28)', marginTop: 3 }}>
                {msg.time}{msg.from === 'bot' ? ' ✓✓' : ''}
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Input bar */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 14px', background: 'rgba(255,255,255,0.02)', borderTop: `1px solid rgba(${accent},0.1)` }}>
        <div style={{ flex: 1, height: 36, borderRadius: 20, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', padding: '0 14px' }}>
          <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.74rem', color: 'rgba(248,248,242,0.2)' }}>Responde automáticamente...</span>
        </div>
        <div style={{ width: 36, height: 36, borderRadius: '50%', background: accentHex, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.9rem', color: '#040406', fontWeight: 700, flexShrink: 0 }}>↑</div>
      </div>
    </div>
  );
}

export function ChatDemoSectionAnimated() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [[active, dir], setPage] = useState([0, 0]);
  const total = chatScenarios.length;

  const paginate = (newDir: number) => {
    setPage(([prev]) => [(prev + newDir + total) % total, newDir]);
  };

  const s = chatScenarios[active];

  const slideVariants = {
    enter: (d: number) => ({ x: d > 0 ? '55%' : '-55%', opacity: 0, filter: 'blur(8px)' }),
    center: { x: '0%', opacity: 1, filter: 'blur(0px)' },
    exit:  (d: number) => ({ x: d > 0 ? '-55%' : '55%', opacity: 0, filter: 'blur(8px)' }),
  };

  return (
    <section ref={ref} className="py-28 px-4 relative overflow-hidden" style={{ background: '#040406' }}>
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(26,128,255,0.2), transparent)' }} />
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at 50% 50%, rgba(26,128,255,0.04) 0%, transparent 65%)' }} />

      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
          animate={inView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
          transition={{ duration: 0.6 }}
        >
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontFamily: 'Poppins, sans-serif', fontWeight: 600, fontSize: '0.75rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#1A80FF', marginBottom: 12 }}>
            <span style={{ width: 20, height: 1, background: 'rgba(26,128,255,0.5)', display: 'inline-block' }} />
            El sistema en acción
            <span style={{ width: 20, height: 1, background: 'rgba(26,128,255,0.5)', display: 'inline-block' }} />
          </span>
          <h2 style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700, fontSize: 'clamp(1.75rem, 5vw, 3rem)', color: '#f8f8f2', lineHeight: 1.1 }}>
            Así se ve el super agente en acción.<br />
            <WaveText text="100% automatizado." className="text-[#1A80FF]" />
          </h2>
          <p style={{ fontFamily: 'Inter, sans-serif', color: 'rgba(248,248,242,0.5)', fontSize: '0.9rem', marginTop: 14, maxWidth: 520, margin: '14px auto 0' }}>
            Conversaciones reales por industria — el agente responde, califica y agenda solo.
          </p>
        </motion.div>

        {/* Industry badge (current) */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="flex items-center justify-center mb-6 gap-4"
        >
          {/* Prev arrow */}
          <button
            onClick={() => paginate(-1)}
            aria-label="Anterior"
            style={{
              width: 42, height: 42, borderRadius: '50%', flexShrink: 0,
              border: `1px solid rgba(${s.accent},0.3)`,
              background: `rgba(${s.accent},0.06)`,
              color: s.accentHex,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer', fontSize: '1.1rem', transition: 'all 0.22s ease',
            }}
          >‹</button>

          {/* Industry pill */}
          <AnimatePresence mode="wait" custom={dir}>
            <motion.div
              key={active}
              custom={dir}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.2 }}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                padding: '8px 22px', borderRadius: 999,
                border: `1px solid rgba(${s.accent},0.5)`,
                background: `rgba(${s.accent},0.1)`,
                fontFamily: 'Poppins, sans-serif', fontWeight: 700, fontSize: '0.85rem',
                color: s.accentHex, whiteSpace: 'nowrap',
              }}
            >
              {s.emoji} {s.industry}
            </motion.div>
          </AnimatePresence>

          {/* Next arrow */}
          <button
            onClick={() => paginate(1)}
            aria-label="Siguiente"
            style={{
              width: 42, height: 42, borderRadius: '50%', flexShrink: 0,
              border: `1px solid rgba(${s.accent},0.3)`,
              background: `rgba(${s.accent},0.06)`,
              color: s.accentHex,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer', fontSize: '1.1rem', transition: 'all 0.22s ease',
            }}
          >›</button>
        </motion.div>

        {/* Carousel window */}
        <div style={{ position: 'relative', overflow: 'hidden' }}>
          <AnimatePresence mode="wait" custom={dir}>
            <motion.div
              key={active}
              custom={dir}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.38, ease: [0.21, 0.47, 0.32, 0.98] }}
            >
              <ChatWindow scenario={s} inView={inView} />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Dot indicators */}
        <div className="flex justify-center gap-2 mt-6">
          {chatScenarios.map((sc, i) => (
            <button
              key={i}
              onClick={() => setPage([i, i > active ? 1 : -1])}
              aria-label={`Ver ${sc.industry}`}
              style={{
                width: active === i ? 22 : 8,
                height: 8,
                borderRadius: 999,
                background: active === i ? sc.accentHex : 'rgba(248,248,242,0.15)',
                border: 'none', cursor: 'pointer', padding: 0,
                transition: 'all 0.3s ease',
              }}
            />
          ))}
        </div>

        {/* Counter */}
        <p style={{ textAlign: 'center', marginTop: 10, fontFamily: 'Inter, sans-serif', fontSize: '0.7rem', color: 'rgba(248,248,242,0.25)' }}>
          {active + 1} / {total} industrias
        </p>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(26,128,255,0.15), transparent)' }} />
    </section>
  );
}

function IntegrationBadge({
  item,
  index,
  inView,
}: {
  item: (typeof integrations)[0];
  index: number;
  inView: boolean;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.4, delay: 0.05 * index, ease: [0.21, 0.47, 0.32, 0.98] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        padding: "8px 16px",
        borderRadius: 8,
        border: `1px solid rgba(${item.color},${hovered ? 0.6 : 0.25})`,
        background: `rgba(${item.color},${hovered ? 0.1 : 0.04})`,
        transform: hovered ? "scale(1.06) translateY(-2px)" : "scale(1) translateY(0)",
        transition: "all 0.22s cubic-bezier(0.21,0.47,0.32,0.98)",
        cursor: "default",
      }}
    >
      <span style={{
        fontFamily: "Poppins, sans-serif",
        fontWeight: 600,
        fontSize: "0.8rem",
        color: hovered ? "#f8f8f2" : "rgba(248,248,242,0.65)",
        transition: "color 0.22s ease",
      }}>
        {item.name}
      </span>
    </motion.div>
  );
}
