"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";

// ── Shared case type (loose — fields optional so any case object fits) ────────
export interface Caso {
  slug: string;
  image: string;
  client: string;
  sector: string;
  problem: string;
  solution: string;
  result: string;
  era?: "ia" | "tradicional";
  industry?: string;
  iaCategories?: string[];
  status?: string;
  iaRole?: string;
}

// ── Per-case visual data (curated metrics for display) ────────────────────────
export const CASE_VISUAL: Record<string, {
  mainValue: number;
  mainSuffix: string;
  mainLabel: string;
  bars: { label: string; value: number }[];
  badges: string[];
  icon: string;
}> = {
  "wellmax": {
    mainValue: 100,
    mainSuffix: "%",
    mainLabel: "producción con IA — sin rodajes",
    bars: [
      { label: "Velocidad de entrega", value: 95 },
      { label: "Ahorro vs equipo tradicional", value: 90 },
      { label: "Nivel de pieza", value: 88 },
    ],
    badges: ["Cliente activo", "Sistema IA completo", "Video + UGC + Estrategia"],
    icon: "💡",
  },
  "resuelto-ia": {
    mainValue: 24,
    mainSuffix: "/7",
    mainLabel: "automatización en operación",
    bars: [
      { label: "Procesos automatizados", value: 92 },
      { label: "Contenido IA propio", value: 85 },
      { label: "Reutilizable en clientes", value: 96 },
    ],
    badges: ["N8N", "Bot WhatsApp IA", "Prospección auto"],
    icon: "🤖",
  },
  "win-internet": {
    mainValue: 2.5,
    mainSuffix: "M",
    mainLabel: "vistas orgánicas / año",
    bars: [
      { label: "Consistencia editorial", value: 92 },
      { label: "Crecimiento de alcance", value: 86 },
      { label: "Autoridad de marca", value: 78 },
    ],
    badges: ["+99 piezas", "3+ años", "TikTok"],
    icon: "📡",
  },
  "wong-cencosud": {
    mainValue: 300,
    mainSuffix: "+",
    mainLabel: "piezas producidas",
    bars: [
      { label: "Velocidad de producción", value: 88 },
      { label: "Estándar premium", value: 96 },
      { label: "ROI en pauta", value: 74 },
    ],
    badges: ["Agotados en días", "Millones de views", "1.5 años"],
    icon: "🛍️",
  },
  "redondos": {
    mainValue: 2.5,
    mainSuffix: "M",
    mainLabel: "vistas acumuladas",
    bars: [
      { label: "Engagement primeras 24h", value: 98 },
      { label: "Conversación orgánica", value: 90 },
      { label: "Viralidad de campaña", value: 85 },
    ],
    badges: ["+150K primer video", "+5K comentarios", "Viral en 24h"],
    icon: "🎄",
  },
  "livoltek": {
    mainValue: 100,
    mainSuffix: "%",
    mainLabel: "material reutilizable en ventas",
    bars: [
      { label: "Percepción de marca B2B", value: 91 },
      { label: "Apertura de mercados", value: 80 },
      { label: "Autoridad técnica", value: 95 },
    ],
    badges: ["ExpoSolar 2025", "B2B Premium", "IA Generativa"],
    icon: "⚡",
  },
  "manana-me-caso": {
    mainValue: 100,
    mainSuffix: "K+",
    mainLabel: "vistas orgánicas sin pauta",
    bars: [
      { label: "Conversación en redes", value: 88 },
      { label: "Narrativa de marca", value: 82 },
      { label: "Alcance multi-cuenta", value: 76 },
    ],
    badges: ["Rodaje completo", "Multi-influencer", "Sin pauta"],
    icon: "🎬",
  },
};

// ── Animated bar ─────────────────────────────────────────────────────────────
function StatBar({ label, value, isGreen, delay, trigger }: {
  label: string; value: number; isGreen: boolean; delay: number; trigger: boolean;
}) {
  return (
    <div className="space-y-1">
      <div className="flex justify-between items-center">
        <span className="font-body text-[11px] text-muted tracking-wide">{label}</span>
        <span className={`font-display font-bold text-[11px] ${isGreen ? "text-neon-green" : "text-neon-purple"}`}>
          {value}%
        </span>
      </div>
      <div className="h-[3px] rounded-full bg-white/[0.05] overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{
            background: isGreen
              ? "linear-gradient(90deg, #1A80FF 0%, #4D9FFF 100%)"
              : "linear-gradient(90deg, #0A4DAA 0%, #4D9FFF 100%)",
          }}
          initial={{ width: "0%" }}
          animate={{ width: trigger ? `${value}%` : "0%" }}
          transition={{ duration: 1.1, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
        />
      </div>
    </div>
  );
}

// ── Animated counter ─────────────────────────────────────────────────────────
function AnimCounter({ end, suffix, isGreen, trigger }: {
  end: number; suffix: string; isGreen: boolean; trigger: boolean;
}) {
  const [count, setCount] = useState(0);
  const started = useRef(false);

  if (trigger && !started.current) {
    started.current = true;
    const duration = 1400;
    const startTime = Date.now();
    const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);
    const tick = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const val = end < 10
        ? parseFloat((easeOut(progress) * end).toFixed(1))
        : Math.floor(easeOut(progress) * end);
      setCount(val);
      if (progress < 1) requestAnimationFrame(tick);
      else setCount(end);
    };
    requestAnimationFrame(tick);
  }

  const display = end < 10 ? count.toFixed(1) : count;

  return (
    <span
      className="font-display font-black leading-none tabular-nums"
      style={{
        fontSize: "clamp(3rem, 5vw, 4.5rem)",
        background: isGreen
          ? "linear-gradient(135deg, #1A80FF 0%, #4D9FFF 60%)"
          : "linear-gradient(135deg, #4D9FFF 0%, #0A4DAA 60%)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        backgroundClip: "text",
      }}
    >
      {display}{suffix}
    </span>
  );
}

// ── Radial ring ──────────────────────────────────────────────────────────────
function RadialRing({ value, isGreen, trigger }: { value: number; isGreen: boolean; trigger: boolean }) {
  const r = 28;
  const circ = 2 * Math.PI * r;
  const dash = (value / 100) * circ;

  return (
    <div className="relative w-16 h-16 flex-shrink-0">
      <svg viewBox="0 0 72 72" className="w-full h-full -rotate-90">
        <circle cx="36" cy="36" r={r} fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="4" />
        <motion.circle
          cx="36" cy="36" r={r}
          fill="none"
          stroke={isGreen ? "#1A80FF" : "#4D9FFF"}
          strokeWidth="4"
          strokeLinecap="round"
          strokeDasharray={circ}
          initial={{ strokeDashoffset: circ }}
          animate={{ strokeDashoffset: trigger ? circ - dash : circ }}
          transition={{ duration: 1.3, ease: [0.21, 0.47, 0.32, 0.98], delay: 0.2 }}
          style={{ filter: `drop-shadow(0 0 4px ${isGreen ? "#1A80FF88" : "#4D9FFF88"})` }}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className={`font-display font-bold text-xs ${isGreen ? "text-neon-green" : "text-neon-purple"}`}>
          {value}%
        </span>
      </div>
    </div>
  );
}

// ── Main card ─────────────────────────────────────────────────────────────────
export function CaseCard({ caso, index, forceColor }: {
  caso: Caso; index: number; forceColor?: "green" | "purple";
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const [hovered, setHovered] = useState(false);
  const isGreen = forceColor ? forceColor === "green" : index % 2 === 0;
  const vis = CASE_VISUAL[caso.slug];
  const trigger = isInView || hovered;

  if (!vis) return null;

  const accentRgb = isGreen ? "26,128,255" : "77,159,255";
  const accentClass = isGreen ? "text-neon-green" : "text-neon-purple";
  const borderIdle = `rgba(${accentRgb},0.12)`;
  const borderHover = `rgba(${accentRgb},0.55)`;
  const glowHover = `rgba(${accentRgb},0.18)`;
  const avgBar = Math.round(vis.bars.reduce((a, b) => a + b.value, 0) / vis.bars.length);
  const isActive = caso.status === "activo";

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative rounded-2xl overflow-hidden"
      style={{
        background: "rgba(5,7,10,0.9)",
        border: `1px solid ${hovered ? borderHover : borderIdle}`,
        boxShadow: hovered
          ? `0 0 0 1px ${borderHover}, 0 16px 48px rgba(0,0,0,0.5), 0 0 60px ${glowHover}`
          : "none",
        transform: hovered ? "translateY(-6px)" : "translateY(0px)",
        transition: "border-color 0.28s ease, box-shadow 0.28s ease, transform 0.28s ease, opacity 0.6s ease",
      }}
    >
      <motion.div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background: isGreen
            ? "linear-gradient(90deg, rgba(26,128,255,0.9) 0%, rgba(77,159,255,0.5) 50%, transparent 100%)"
            : "linear-gradient(90deg, rgba(77,159,255,0.9) 0%, rgba(10,77,170,0.5) 50%, transparent 100%)",
        }}
        animate={{ opacity: hovered ? 1 : 0.35 }}
        transition={{ duration: 0.25 }}
      />

      {[
        "top-3 left-3 border-t border-l rounded-tl",
        "top-3 right-3 border-t border-r rounded-tr",
        "bottom-3 left-3 border-b border-l rounded-bl",
        "bottom-3 right-3 border-b border-r rounded-br",
      ].map((cls, i) => (
        <motion.div
          key={i}
          className={`absolute w-3.5 h-3.5 pointer-events-none ${cls}`}
          style={{ borderColor: `rgba(${accentRgb},${hovered ? 0.7 : 0.25})` }}
          animate={{ opacity: hovered ? 1 : 0.4 }}
          transition={{ duration: 0.2 }}
        />
      ))}

      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.35 }}
        style={{ background: `radial-gradient(ellipse at 50% 0%, rgba(${accentRgb},0.08) 0%, transparent 70%)` }}
      />

      <div className="absolute inset-0 pointer-events-none opacity-20"
        style={{ background: "repeating-linear-gradient(0deg,rgba(0,0,0,0.06) 0px,rgba(0,0,0,0.06) 1px,transparent 1px,transparent 5px)" }} />

      <div className="relative z-10 p-6">
        <div className="flex items-start justify-between gap-2 mb-4">
          <div className="flex items-center gap-2">
            <span className={`font-display font-black text-4xl leading-none select-none pointer-events-none ${accentClass}`}
              style={{ opacity: hovered ? 0.22 : 0.1, transition: "opacity 0.3s" }}>
              {String(index + 1).padStart(2, "0")}
            </span>
            <span className="text-xl">{vis.icon}</span>
          </div>
          <div className="flex flex-col items-end gap-1.5">
            {isActive && (
              <span className="inline-flex items-center gap-1 text-[9px] font-display font-bold tracking-widest uppercase px-2 py-0.5 rounded-full"
                style={{ color: "#1A80FF", background: "rgba(26,128,255,0.12)", border: "1px solid rgba(26,128,255,0.4)" }}>
                <span className="w-1.5 h-1.5 rounded-full bg-neon-green animate-pulse" /> Activo
              </span>
            )}
            <span className={`text-[10px] font-display font-bold tracking-widest uppercase px-2.5 py-1 rounded-full border ${accentClass}`}
              style={{ borderColor: `rgba(${accentRgb},0.25)`, background: `rgba(${accentRgb},0.06)` }}>
              {caso.sector}
            </span>
          </div>
        </div>

        <h3 className="font-display font-bold text-lg text-cream leading-tight mb-4">
          {caso.client}
        </h3>

        <div className="flex items-end justify-between gap-3 mb-5">
          <div>
            <AnimCounter end={vis.mainValue} suffix={vis.mainSuffix} isGreen={isGreen} trigger={trigger} />
            <p className="font-body text-muted text-[12px] mt-1 leading-snug">{vis.mainLabel}</p>
          </div>
          <RadialRing value={avgBar} isGreen={isGreen} trigger={trigger} />
        </div>

        <div className="space-y-2.5 mb-5">
          {vis.bars.map((bar, i) => (
            <StatBar key={i} label={bar.label} value={bar.value} isGreen={isGreen} delay={0.15 + i * 0.12} trigger={trigger} />
          ))}
        </div>

        <div className="flex flex-wrap gap-1.5 mb-5">
          {vis.badges.map((badge, i) => (
            <span key={i}
              className="text-[10px] font-display font-semibold px-2.5 py-1 rounded-full"
              style={{
                background: `rgba(${accentRgb},0.07)`,
                border: `1px solid rgba(${accentRgb},0.18)`,
                color: `rgba(${accentRgb},0.85)`,
              }}>
              {badge}
            </span>
          ))}
        </div>

        {caso.iaRole && (
          <div className="flex items-start gap-2 mb-4 p-2.5 rounded-lg"
            style={{ background: `rgba(${accentRgb},0.05)`, border: `1px solid rgba(${accentRgb},0.12)` }}>
            <span className="text-sm shrink-0">🤖</span>
            <div>
              <span className={`text-[9px] font-display font-bold tracking-widest uppercase ${accentClass} block mb-0.5`}>
                IA en este caso
              </span>
              <p className="font-body text-muted text-[11px] leading-snug">{caso.iaRole}</p>
            </div>
          </div>
        )}

        <div className="h-px mb-4" style={{ background: `rgba(${accentRgb},0.1)` }} />

        <Link href={`/casos/${caso.slug}`} className="flex items-center justify-between group/link">
          <span className={`text-[11px] font-display font-semibold tracking-wider uppercase ${accentClass} opacity-80 group-hover/link:opacity-100 transition-opacity`}>
            Ver caso completo
          </span>
          <motion.span className={`text-sm ${accentClass}`} animate={{ x: hovered ? 4 : 0 }} transition={{ duration: 0.2 }}>
            →
          </motion.span>
        </Link>
      </div>
    </motion.div>
  );
}
