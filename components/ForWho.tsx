"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SITE } from "@/lib/constants";
import AnimatedSection from "./AnimatedSection";

const icons = ["⚙️", "📡", "⚡", "🌾", "🏗️", "💡"];
const colors = ["green", "purple", "green", "purple", "green", "purple"] as const;

// Orbital positions for 6 planets: 3 rings × 2 planets
// Each: { angle (deg), ring (1-3 → radius multiplier) }
const orbits = [
  { angle: -30, ring: 1 },
  { angle: 150, ring: 1 },
  { angle: 60,  ring: 2 },
  { angle: 240, ring: 2 },
  { angle: -90, ring: 3 },
  { angle: 90,  ring: 3 },
];

const RING_PX = [110, 165, 215]; // radius per ring on desktop (px)

function OrbitalMap({ onSelect, selected }: {
  onSelect: (i: number | null) => void;
  selected: number | null;
}) {
  const size = 460; // SVG / container px
  const cx = size / 2;
  const cy = size / 2;

  return (
    <div className="relative mx-auto" style={{ width: size, height: size }}>
      {/* Ring circles */}
      {RING_PX.map((r, i) => (
        <div key={i} className="absolute rounded-full border border-white/[0.05] pointer-events-none"
          style={{ left: cx - r, top: cy - r, width: r * 2, height: r * 2 }} />
      ))}

      {/* Center node */}
      <motion.div
        className="absolute flex flex-col items-center justify-center rounded-full border-2 border-neon-green/50 bg-neon-green/[0.06] select-none"
        style={{ width: 80, height: 80, left: cx - 40, top: cy - 40, boxShadow: "0 0 24px rgba(0,255,135,0.18)" }}
        animate={{ boxShadow: ["0 0 16px rgba(0,255,135,0.15)", "0 0 32px rgba(0,255,135,0.25)", "0 0 16px rgba(0,255,135,0.15)"] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      >
        <span className="font-display font-extrabold text-[10px] tracking-[0.2em] text-neon-green text-center leading-tight">
          RESUELTO
        </span>
      </motion.div>

      {/* Planets */}
      {SITE.forWho.profiles.map((profile, i) => {
        const orbit = orbits[i];
        const r = RING_PX[orbit.ring - 1];
        const rad = (orbit.angle * Math.PI) / 180;
        const px = cx + r * Math.cos(rad);
        const py = cy + r * Math.sin(rad);
        const isGreen = colors[i] === "green";
        const isSelected = selected === i;
        const planetSize = 52;

        return (
          <motion.button
            key={i}
            className="absolute flex flex-col items-center justify-center rounded-full border transition-all duration-200 outline-none focus-visible:ring-2 focus-visible:ring-neon-green/50"
            style={{
              width: planetSize,
              height: planetSize,
              left: px - planetSize / 2,
              top: py - planetSize / 2,
              border: isSelected
                ? isGreen ? "1.5px solid rgba(0,255,135,0.7)" : "1.5px solid rgba(204,68,255,0.7)"
                : "1.5px solid rgba(255,255,255,0.08)",
              background: isSelected
                ? isGreen ? "rgba(0,255,135,0.12)" : "rgba(204,68,255,0.12)"
                : "rgba(255,255,255,0.03)",
              boxShadow: isSelected
                ? isGreen ? "0 0 16px rgba(0,255,135,0.25)" : "0 0 16px rgba(204,68,255,0.25)"
                : "none",
            }}
            animate={{ scale: isSelected ? 1.18 : 1 }}
            transition={{ type: "spring", stiffness: 280, damping: 20 }}
            onClick={() => onSelect(selected === i ? null : i)}
            onMouseEnter={() => onSelect(i)}
            onMouseLeave={() => onSelect(null)}
          >
            <span className="text-lg">{icons[i]}</span>
          </motion.button>
        );
      })}
    </div>
  );
}

export default function ForWho() {
  const [selected, setSelected] = useState<number | null>(null);
  const profile = selected !== null ? SITE.forWho.profiles[selected] : null;
  const isGreen = selected !== null ? colors[selected] === "green" : true;

  return (
    <section className="relative section-padding overflow-hidden">
      <div className="absolute top-1/3 left-0 w-[400px] h-[400px] rounded-full bg-neon-green/5 blur-[90px] pointer-events-none" />
      <div className="absolute bottom-1/3 right-0 w-[400px] h-[400px] rounded-full bg-neon-purple/5 blur-[90px] pointer-events-none" />

      <div className="container-base relative z-10">

        {/* Header */}
        <AnimatedSection className="mb-12">
          <span className="inline-flex items-center gap-2 text-xs font-display font-semibold tracking-[0.2em] uppercase text-neon-green mb-4">
            <span className="w-6 h-px bg-neon-green/50" />
            Para quién es
          </span>
          <h2 className="font-display font-bold text-3xl lg:text-5xl tracking-tight mb-5 max-w-2xl">
            {SITE.forWho.title}
          </h2>
          <p className="font-body text-muted text-base lg:text-lg leading-relaxed max-w-2xl">
            {SITE.forWho.intro}
          </p>
        </AnimatedSection>

        {/* ── Desktop: orbital layout ── */}
        <div className="hidden lg:grid lg:grid-cols-2 gap-12 items-center">
          <AnimatedSection>
            <OrbitalMap onSelect={setSelected} selected={selected} />
          </AnimatedSection>

          {/* Detail panel */}
          <AnimatedSection delay={0.15}>
            <div className="min-h-[200px] flex flex-col justify-center">
              <AnimatePresence mode="wait">
                {profile ? (
                  <motion.div
                    key={selected}
                    initial={{ opacity: 0, x: 16 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -8 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                  >
                    <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border mb-5 text-xs font-display font-bold tracking-widest uppercase
                      ${isGreen ? "border-neon-green/30 bg-neon-green/8 text-neon-green" : "border-neon-purple/30 bg-neon-purple/8 text-neon-purple"}`}>
                      <span>{icons[selected!]}</span>
                      <span>{String(selected! + 1).padStart(2, "0")}</span>
                    </div>
                    <h3 className="font-display font-bold text-xl lg:text-2xl text-cream mb-3 leading-tight">
                      {profile.title}
                    </h3>
                    <p className="font-body text-muted text-base leading-relaxed">
                      {profile.description}
                    </p>
                  </motion.div>
                ) : (
                  <motion.div
                    key="idle"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="text-center lg:text-left"
                  >
                    <p className="font-body text-muted/40 text-sm">
                      Pasa el cursor sobre un sector para ver el perfil
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </AnimatedSection>
        </div>

        {/* ── Mobile: 2×3 grid ── */}
        <div className="grid grid-cols-2 gap-3 lg:hidden">
          {SITE.forWho.profiles.map((profile, i) => {
            const isGreen = colors[i] === "green";
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-20px" }}
                transition={{ type: "spring", stiffness: 200, damping: 22, delay: i * 0.07 }}
                className={`rounded-xl border p-4
                  ${isGreen ? "border-neon-green/15 bg-neon-green/[0.03]" : "border-neon-purple/15 bg-neon-purple/[0.03]"}`}
              >
                <div className="text-xl mb-2">{icons[i]}</div>
                <h3 className={`font-display font-bold text-xs leading-snug mb-1.5
                  ${isGreen ? "text-neon-green" : "text-neon-purple"}`}>
                  {profile.title}
                </h3>
                <p className="font-body text-muted/60 text-[11px] leading-relaxed">
                  {profile.description}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Closing note */}
        <AnimatedSection delay={0.3} className="mt-10">
          <p className="font-body text-muted/55 text-sm leading-relaxed max-w-2xl border-l-2 border-neon-green/25 pl-4 italic">
            {SITE.forWho.closing}
          </p>
        </AnimatedSection>

      </div>
    </section>
  );
}
