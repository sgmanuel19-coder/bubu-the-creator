"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Stethoscope, Home, Scale, GraduationCap, Heart, TrendingUp, Building2, Wifi, Zap, Briefcase } from "lucide-react";

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
        style={{ aspectRatio: "16/9", border: "1px solid rgba(0,255,135,0.25)" }}
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
        background: "rgba(4,4,6,0.98)",
        border: `1px solid ${hovered ? "rgba(0,255,135,0.5)" : "rgba(0,255,135,0.12)"}`,
        boxShadow: hovered
          ? "0 0 0 1px rgba(0,255,135,0.2), 0 0 80px rgba(0,255,135,0.12), inset 0 0 60px rgba(0,255,135,0.03)"
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
          background: "repeating-linear-gradient(0deg, rgba(0,0,0,0.06) 0px, rgba(0,0,0,0.06) 1px, transparent 1px, transparent 5px)",
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
        <div className="relative">
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{ background: "rgba(0,255,135,0.06)" }}
            animate={{ scale: [1, 1.8, 1], opacity: [0.6, 0, 0.6] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{ background: "rgba(0,255,135,0.04)" }}
            animate={{ scale: [1, 2.5, 1], opacity: [0.4, 0, 0.4] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
          />
          <motion.div
            className="relative flex items-center justify-center"
            style={{
              width: 80, height: 80, borderRadius: "50%",
              background: "rgba(0,255,135,0.1)",
              border: "1.5px solid rgba(0,255,135,0.5)",
              boxShadow: hovered ? "0 0 40px rgba(0,255,135,0.3)" : "0 0 20px rgba(0,255,135,0.12)",
              transition: "box-shadow 0.35s ease",
            }}
            animate={{ scale: [1, 1.04, 1] }}
            transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
          >
            <svg viewBox="0 0 24 24" fill="#00ff87" style={{ width: 32, height: 32, marginLeft: 4 }}>
              <path d="M8 5v14l11-7z" />
            </svg>
          </motion.div>
        </div>
        <div style={{ textAlign: "center", padding: "0 24px" }}>
          <p style={{ fontFamily: "Space Grotesk, sans-serif", fontWeight: 700, color: "#f8f8f2", fontSize: "1rem", marginBottom: 6 }}>
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
            background: "rgba(0,255,135,0.08)", border: "1px solid rgba(0,255,135,0.2)",
            whiteSpace: "nowrap",
          }}
        >
          <span style={{ fontFamily: "Space Grotesk, sans-serif", fontWeight: 600, fontSize: "0.625rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(0,255,135,0.7)" }}>
            Sistema Express de Atención IA · 3 min
          </span>
        </div>
      </div>
      {/* Top accent */}
      <div className="absolute top-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, rgba(0,255,135,0.7), transparent)" }} />
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
        style={{ background: "rgba(0,255,135,0.04)", filter: "blur(80px)" }} />

      <div className="max-w-4xl mx-auto">
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: 24, filter: "blur(10px)" }}
          animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
          transition={{ duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }}
        >
          <span style={{ display: "inline-flex", alignItems: "center", gap: 8, fontFamily: "Space Grotesk, sans-serif", fontWeight: 600, fontSize: "0.75rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#00ff87", marginBottom: 12 }}>
            <span style={{ width: 20, height: 1, background: "rgba(0,255,135,0.5)", display: "inline-block" }} />
            Ve el sistema antes de decidir
            <span style={{ width: 20, height: 1, background: "rgba(0,255,135,0.5)", display: "inline-block" }} />
          </span>
          <h2 style={{ fontFamily: "Space Grotesk, sans-serif", fontWeight: 700, fontSize: "clamp(1.5rem, 4vw, 2.5rem)", color: "#f8f8f2", lineHeight: 1.15 }}>
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

function StepCardAnimated({ step, index, inView }: { step: Step; index: number; inView: boolean }) {
  const [hovered, setHovered] = useState(false);
  const isGreen = index !== 1;
  const rgb = isGreen ? "0,255,135" : "204,68,255";

  return (
    <motion.div
      initial={{ opacity: 0, y: 36, filter: "blur(8px)" }}
      animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
      transition={{ duration: 0.6, delay: 0.1 + index * 0.13, ease: [0.21, 0.47, 0.32, 0.98] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        borderRadius: 20,
        padding: "32px 28px",
        border: `1px solid ${hovered ? `rgba(${rgb},0.55)` : `rgba(${rgb},0.12)`}`,
        background: hovered ? `rgba(${rgb},0.07)` : `rgba(${rgb},0.025)`,
        boxShadow: hovered
          ? `0 0 0 1px rgba(${rgb},0.2), 0 0 50px rgba(${rgb},0.12), inset 0 0 40px rgba(${rgb},0.05)`
          : "none",
        transform: hovered ? "translateY(-6px)" : "translateY(0)",
        transition: "border-color 0.3s ease, background 0.3s ease, box-shadow 0.3s ease, transform 0.3s ease",
        position: "relative",
        overflow: "hidden",
        cursor: "default",
      }}
    >
      {/* Top shimmer */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: 2,
        background: `linear-gradient(90deg, transparent, rgba(${rgb},0.9), transparent)`,
        opacity: hovered ? 1 : 0.15,
        transition: "opacity 0.3s ease",
      }} />
      {/* Inner bloom */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        background: `radial-gradient(ellipse at 30% 0%, rgba(${rgb},0.1) 0%, transparent 70%)`,
        opacity: hovered ? 1 : 0,
        transition: "opacity 0.3s ease",
      }} />

      {/* Number */}
      <div style={{ marginBottom: 20 }}>
        <span style={{
          fontFamily: "Space Grotesk, sans-serif",
          fontWeight: 800,
          fontSize: "4rem",
          lineHeight: 1,
          background: `linear-gradient(135deg, rgba(${rgb},0.95) 0%, rgba(${rgb},0.2) 100%)`,
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
          display: "block",
          opacity: hovered ? 1 : 0.8,
          transition: "opacity 0.3s ease",
        }}>
          {step.number}
        </span>
      </div>

      {/* Divider */}
      <div style={{
        height: 1, marginBottom: 16,
        background: `linear-gradient(90deg, rgba(${rgb},0.6) 0%, transparent 100%)`,
        transform: hovered ? "scaleX(1)" : "scaleX(0.45)",
        transformOrigin: "left",
        transition: "transform 0.35s ease",
      }} />

      <h3 style={{
        fontFamily: "Space Grotesk, sans-serif",
        fontWeight: 700,
        fontSize: "1.125rem",
        color: "#f8f8f2",
        marginBottom: 10,
        lineHeight: 1.25,
      }}>
        {step.title}
      </h3>
      <p style={{
        fontFamily: "Inter, sans-serif",
        fontSize: "0.875rem",
        lineHeight: 1.65,
        color: `rgba(248,248,242,${hovered ? 0.7 : 0.5})`,
        transition: "color 0.3s ease",
      }}>
        {step.description}
      </p>
    </motion.div>
  );
}

export function HowItWorksAnimated({ steps }: { steps: Step[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section ref={ref} className="py-20 px-4 relative overflow-hidden" style={{ background: "rgba(0,255,135,0.015)" }}>
      <div className="absolute top-0 left-0 right-0 h-px beam-divider" style={{ animationDelay: "0.8s" }} />
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse at 50% 50%, rgba(204,68,255,0.04) 0%, transparent 60%)" }} />

      <div className="max-w-4xl mx-auto">
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
          animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
          transition={{ duration: 0.6 }}
        >
          <span style={{ display: "inline-flex", alignItems: "center", gap: 8, fontFamily: "Space Grotesk, sans-serif", fontWeight: 600, fontSize: "0.75rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#00ff87", marginBottom: 12 }}>
            <span style={{ width: 20, height: 1, background: "rgba(0,255,135,0.5)", display: "inline-block" }} />
            Como funciona
            <span style={{ width: 20, height: 1, background: "rgba(0,255,135,0.5)", display: "inline-block" }} />
          </span>
          <h2 style={{ fontFamily: "Space Grotesk, sans-serif", fontWeight: 700, fontSize: "clamp(1.75rem, 5vw, 3rem)", color: "#f8f8f2", lineHeight: 1.1 }}>
            3 pasos. Sin complicaciones.
          </h2>
          <p style={{ fontFamily: "Inter, sans-serif", color: "rgba(248,248,242,0.5)", fontSize: "0.95rem", marginTop: 12 }}>
            Sin burocracia. Sin capas. Desde el diagnóstico hasta el sistema encendido.
          </p>
        </motion.div>

        <div className="relative" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 20 }}>
          {/* Connector line */}
          <motion.div
            style={{
              display: "none",
              position: "absolute",
              top: 40,
              left: "calc(16.67% + 14px)",
              right: "calc(16.67% + 14px)",
              height: 1,
              background: "linear-gradient(90deg, rgba(0,255,135,0.35) 0%, rgba(204,68,255,0.5) 50%, rgba(0,255,135,0.35) 100%)",
              pointerEvents: "none",
            }}
            className="md:!block"
            initial={{ scaleX: 0 }}
            animate={inView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
          />
          {steps.map((step, i) => (
            <StepCardAnimated key={step.number} step={step} index={i} inView={inView} />
          ))}
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px beam-divider" style={{ animationDelay: "2s" }} />
    </section>
  );
}

// ── Industries / Para quién es — Animated ────────────────────

const industries: Industry[] = [
  { icon: Building2,    label: "Empresas técnicas e industriales", description: "Prospectos B2B que necesitan respuesta rápida y calificada antes de la primera reunión" },
  { icon: Wifi,         label: "Telecomunicaciones y tecnología",  description: "Ciclos de venta largos donde el seguimiento automático marca la diferencia" },
  { icon: Zap,          label: "Energía e ingeniería",             description: "Leads de alta calidad que se pierden por falta de atención inmediata y cualificada" },
  { icon: Briefcase,    label: "Consultoras y startups B2B",       description: "Equipos pequeños que necesitan escalar sin contratar más personal de atención" },
  { icon: Stethoscope,  label: "Clínicas estéticas y salud",       description: "Pierden citas por respuestas lentas en fines de semana y fuera de horario" },
  { icon: Home,         label: "Inmobiliarias",                    description: "Prospectos calientes que se enfrían esperando respuesta manual" },
  { icon: Scale,        label: "Estudios legales",                 description: "Consultas urgentes sin un primer filtro profesional" },
  { icon: GraduationCap, label: "Institutos y educación",         description: "200+ consultas en temporada sin equipo para atenderlas todas" },
  { icon: TrendingUp,   label: "Empresas con pauta Meta",          description: "Leads de madrugada que nadie responde hasta el día siguiente" },
  { icon: Heart,        label: "Odontología y salud",              description: "Agendas manuales que generan baches y cancelaciones innecesarias" },
];

function IndustryCardAnimated({ item, index, inView }: { item: Industry; index: number; inView: boolean }) {
  const [hovered, setHovered] = useState(false);
  const Icon = item.icon;
  const useGreen = index % 2 === 0;
  const rgb = useGreen ? "0,255,135" : "204,68,255";

  return (
    <motion.div
      initial={{ opacity: 0, y: 28, filter: "blur(6px)" }}
      animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
      transition={{ duration: 0.55, delay: 0.06 * index, ease: [0.21, 0.47, 0.32, 0.98] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        borderRadius: 16,
        padding: "24px 20px",
        textAlign: "center",
        border: `1px solid ${hovered ? `rgba(${rgb},0.5)` : `rgba(${rgb},0.1)`}`,
        background: hovered ? `rgba(${rgb},0.07)` : "rgba(255,255,255,0.025)",
        boxShadow: hovered
          ? `0 0 0 1px rgba(${rgb},0.15), 0 0 40px rgba(${rgb},0.12)`
          : "none",
        transform: hovered ? "translateY(-4px) scale(1.02)" : "translateY(0) scale(1)",
        transition: "all 0.28s cubic-bezier(0.21,0.47,0.32,0.98)",
        cursor: "default",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Top shimmer */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: 1,
        background: `linear-gradient(90deg, transparent, rgba(${rgb},0.8), transparent)`,
        opacity: hovered ? 1 : 0,
        transition: "opacity 0.28s ease",
      }} />
      {/* Icon */}
      <div
        style={{
          width: 52, height: 52, borderRadius: 14, margin: "0 auto 12px",
          background: `rgba(${rgb},0.1)`,
          border: `1px solid rgba(${rgb},0.25)`,
          display: "flex", alignItems: "center", justifyContent: "center",
          boxShadow: hovered ? `0 0 24px rgba(${rgb},0.3)` : "none",
          transition: "box-shadow 0.28s ease",
        }}
      >
        <Icon style={{ width: 24, height: 24, color: useGreen ? "#00ff87" : "#cc44ff" }} />
      </div>
      <p style={{
        fontFamily: "Space Grotesk, sans-serif",
        fontWeight: 600,
        fontSize: "0.875rem",
        color: hovered ? "#f8f8f2" : "rgba(248,248,242,0.8)",
        transition: "color 0.28s ease",
        marginBottom: 6,
      }}>
        {item.label}
      </p>
      <p style={{
        fontFamily: "Inter, sans-serif",
        fontSize: "0.7rem",
        lineHeight: 1.5,
        color: `rgba(248,248,242,${hovered ? 0.55 : 0.35})`,
        transition: "color 0.28s ease",
      }}>
        {item.description}
      </p>
    </motion.div>
  );
}

export function IndustriesSectionAnimated() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section ref={ref} className="py-20 px-4 relative overflow-hidden" style={{ background: "rgba(204,68,255,0.02)" }}>
      <div className="absolute top-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, rgba(204,68,255,0.2), transparent)" }} />
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse at 50% 60%, rgba(204,68,255,0.05) 0%, transparent 65%)" }} />

      <div className="max-w-5xl mx-auto">
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
          animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
          transition={{ duration: 0.6 }}
        >
          <span style={{ display: "inline-flex", alignItems: "center", gap: 8, fontFamily: "Space Grotesk, sans-serif", fontWeight: 600, fontSize: "0.75rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#cc44ff", marginBottom: 12 }}>
            <span style={{ width: 20, height: 1, background: "rgba(204,68,255,0.5)", display: "inline-block" }} />
            Para quien es
            <span style={{ width: 20, height: 1, background: "rgba(204,68,255,0.5)", display: "inline-block" }} />
          </span>
          <h2 style={{ fontFamily: "Space Grotesk, sans-serif", fontWeight: 700, fontSize: "clamp(1.75rem, 5vw, 3rem)", color: "#f8f8f2", lineHeight: 1.15 }}>
            Si recibes mensajes
            <span style={{ color: "#cc44ff" }}> y los pierdes</span>,<br />
            esto es para ti.
          </h2>
          <p style={{ fontFamily: "Inter, sans-serif", color: "rgba(248,248,242,0.5)", fontSize: "0.95rem", marginTop: 12 }}>
            Empresas con volumen de mensajes que no pueden atender a tiempo.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {industries.map((item, i) => (
            <IndustryCardAnimated key={item.label} item={item} index={i} inView={inView} />
          ))}
        </div>

        {/* Para quién NO es */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.5 }}
          style={{ marginTop: 40, textAlign: "center", maxWidth: 560, margin: "40px auto 0" }}
        >
          <p style={{ fontFamily: "Space Grotesk, sans-serif", fontWeight: 600, fontSize: "0.7rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(248,248,242,0.3)", marginBottom: 10 }}>
            Para quién NO es
          </p>
          <p style={{ fontFamily: "Inter, sans-serif", fontSize: "0.875rem", color: "rgba(248,248,242,0.4)", lineHeight: 1.65 }}>
            Si recibes menos de 10 mensajes por semana, ya tienes un equipo completo de atención, o buscas solo un chatbot genérico — esto no es para ti.
          </p>
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, rgba(204,68,255,0.15), transparent)" }} />
    </section>
  );
}

// ── Integrations Strip ────────────────────────────────────────

const integrations = [
  { name: "WhatsApp Business", color: "37,211,102" },
  { name: "Instagram DM",      color: "204,68,255" },
  { name: "Google Calendar",   color: "66,133,244" },
  { name: "n8n",               color: "235,86,21" },
  { name: "Make.com",          color: "102,153,255" },
  { name: "Notion",            color: "248,248,242" },
  { name: "Gmail",             color: "219,68,55" },
  { name: "Calendly",          color: "0,106,255" },
];

export function IntegrationsStrip() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  // Duplicate for seamless infinite loop
  const doubled = [...integrations, ...integrations];

  return (
    <section ref={ref} className="py-16 relative overflow-hidden" style={{ background: "#040406" }}>
      {/* Beam scan top divider */}
      <div className="absolute top-0 left-0 right-0 h-px beam-divider" />

      <div className="max-w-4xl mx-auto px-4">
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: 16, filter: "blur(8px)" }}
          animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
          transition={{ duration: 0.55 }}
        >
          <span style={{ display: "inline-flex", alignItems: "center", gap: 8, fontFamily: "Space Grotesk, sans-serif", fontWeight: 600, fontSize: "0.75rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#00ff87", marginBottom: 10 }}>
            <span style={{ width: 16, height: 1, background: "rgba(0,255,135,0.5)", display: "inline-block" }} />
            Integraciones
            <span style={{ width: 16, height: 1, background: "rgba(0,255,135,0.5)", display: "inline-block" }} />
          </span>
          <h2 style={{ fontFamily: "Space Grotesk, sans-serif", fontWeight: 700, fontSize: "clamp(1.25rem, 3vw, 2rem)", color: "#f8f8f2" }}>
            Se conecta con las herramientas que ya usas
          </h2>
        </motion.div>
      </div>

      {/* Infinite marquee */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.5, delay: 0.2 }}
        style={{
          overflow: "hidden",
          maskImage: "linear-gradient(90deg, transparent 0%, black 8%, black 92%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(90deg, transparent 0%, black 8%, black 92%, transparent 100%)",
        }}
      >
        <div className="marquee-track" style={{ display: "flex", gap: 12, width: "max-content", padding: "8px 0" }}>
          {doubled.map((int, i) => (
            <IntegrationBadge key={`${int.name}-${i}`} item={int} index={i % integrations.length} inView={true} />
          ))}
        </div>
      </motion.div>

      {/* Beam scan bottom divider */}
      <div className="absolute bottom-0 left-0 right-0 h-px beam-divider" style={{ animationDelay: "1.5s" }} />
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
        fontFamily: "Space Grotesk, sans-serif",
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
