"use client";

import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { SITE } from "@/lib/constants";
import GridBackground from "@/components/ui/grid-background";

const HeroScene = dynamic(() => import("./HeroScene").catch(() => ({ default: () => null })), {
  ssr: false,
  loading: () => null,
});

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.85, delay, ease: [0.21, 0.47, 0.32, 0.98] },
});

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">

      {/* ── GRID BACKGROUND (mismo que subpáginas) ── */}
      <div className="absolute inset-0 z-0">
        <GridBackground />
        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-bg to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-br from-neon-green/4 via-transparent to-neon-purple/6" />
      </div>

      {/* ── 3D SCENE — floating wireframe geometry ── */}
      <div className="absolute inset-0 z-[1] pointer-events-none">
        <HeroScene />
      </div>

      {/* Scanlines + grid */}
      <div className="absolute inset-0 z-[2] pointer-events-none scanlines" />
      <div className="absolute inset-0 z-[2] grid-pattern opacity-20 pointer-events-none" />

      {/* Glow blobs */}
      <div className="absolute inset-0 z-[2] pointer-events-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[300px] rounded-full bg-neon-purple/8 blur-[100px]" />
        <div className="absolute bottom-1/3 left-1/4 w-[400px] h-[200px] rounded-full bg-neon-green/6 blur-[80px]" />
      </div>

      {/* Giant watermark */}
      <div className="absolute inset-0 z-[3] flex items-center justify-center pointer-events-none select-none overflow-hidden">
        <motion.span
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ duration: 2, delay: 0.5 }}
          className="font-brand font-black tracking-[0.3em] text-white/[0.025]"
          style={{ fontSize: "clamp(6rem, 18vw, 18rem)" }}
        >
          RESUELTO
        </motion.span>
      </div>

      {/* ── CONTENT — stacked centered layout ── */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 lg:px-8 pt-28 pb-16" style={{ isolation: "isolate" }}>

        {/* ── TOP: Eyebrow + Headline + Sub + CTAs ── */}
        <div className="text-center mb-14">

          {/* Eyebrow */}
          <motion.div {...fadeUp(0.1)} className="flex items-center justify-center gap-3 mb-8">
            <span className="w-8 h-px bg-gradient-to-r from-transparent to-neon-green/60" />
            <span className="w-1.5 h-1.5 rounded-full bg-neon-green animate-pulse" />
            <span className="text-xs font-display font-semibold tracking-[0.35em] uppercase text-neon-green/80">
              {SITE.hero.eyebrow}
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-neon-purple/70 animate-pulse" style={{ animationDelay: "0.5s" }} />
            <span className="w-8 h-px bg-gradient-to-l from-transparent to-neon-purple/60" />
          </motion.div>

          {/* Headline — full width, big */}
          <motion.h1
            {...fadeUp(0.2)}
            className="font-display font-extrabold tracking-tight leading-[0.95] mb-6
                       drop-shadow-[0_2px_30px_rgba(0,0,0,0.95)]"
            style={{ fontSize: "clamp(3.2rem, 7vw, 7.5rem)" }}
          >
            <span className="block text-cream">{SITE.hero.headline[0]}</span>
            <span className="block text-holo mt-1">{SITE.hero.headline[1]}</span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            {...fadeUp(0.35)}
            className="font-body text-muted text-lg lg:text-xl leading-relaxed max-w-2xl mx-auto"
          >
            {SITE.hero.subheadline}
          </motion.p>
        </div>

        {/* ── BOTTOM: VSL Video — grande y centrado ── */}
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1.1, delay: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="relative max-w-4xl mx-auto"
        >
          {/* Glow under video */}
          <div className="absolute -inset-6 rounded-3xl pointer-events-none">
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-neon-green/10 via-transparent to-neon-purple/10 blur-3xl" />
          </div>

          {/* Video border */}
          <div className="holo-border holo-border-hover">
            <div className="relative rounded-[calc(1.25rem-1px)] overflow-hidden bg-[#060810] aspect-video">

              {/* ── VSL PLACEHOLDER ──
                  Para activar reemplaza este bloque por:
                  <video autoPlay muted loop playsInline src="/vsl.mp4"
                         className="absolute inset-0 w-full h-full object-cover" />
              ── */}
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-6">
                {/* Play button */}
                <div className="relative">
                  <div className="absolute -inset-4 rounded-full bg-neon-green/15 blur-xl animate-pulse" />
                  <motion.div
                    animate={{ scale: [1, 1.08, 1] }}
                    transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                    className="relative w-24 h-24 rounded-full border-2 border-neon-green/60
                                bg-neon-green/10 backdrop-blur-sm flex items-center justify-center
                                hover:bg-neon-green/20 transition-all duration-300"
                  >
                    <div className="w-0 h-0 ml-2
                                    border-t-[12px] border-t-transparent
                                    border-l-[22px] border-l-neon-green
                                    border-b-[12px] border-b-transparent
                                    drop-shadow-[0_0_10px_rgba(0,255,135,0.9)]" />
                  </motion.div>
                </div>
                <div className="text-center">
                  <p className="text-neon-green font-display font-bold text-base tracking-[0.2em] uppercase mb-1">
                    VIDEO VSL
                  </p>
                  <p className="text-muted text-sm">
                    Placeholder — sube tu video como{" "}
                    <code className="text-neon-green/70 text-xs">/public/vsl.mp4</code>
                  </p>
                </div>
              </div>

              {/* Scan line */}
              <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-neon-green/20 to-transparent"
                  style={{ animation: "scanSweep 6s linear infinite" }} />
              </div>

              {/* Grid overlay */}
              <div className="absolute inset-0 grid-pattern opacity-15 pointer-events-none" />

              {/* HUD corners */}
              <div className="absolute top-4 left-4 w-6 h-6 border-t-2 border-l-2 border-neon-green/60 rounded-tl" />
              <div className="absolute top-4 right-4 w-6 h-6 border-t-2 border-r-2 border-neon-green/40 rounded-tr" />
              <div className="absolute bottom-4 left-4 w-6 h-6 border-b-2 border-l-2 border-neon-purple/40 rounded-bl" />
              <div className="absolute bottom-4 right-4 w-6 h-6 border-b-2 border-r-2 border-neon-purple/60 rounded-br" />

              {/* Duration badge */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
                <span className="px-4 py-1.5 rounded-full bg-bg/85 backdrop-blur-sm border border-neon-green/20
                                 text-[11px] font-display text-neon-green/70 tracking-widest uppercase">
                  VSL · DURACIÓN
                </span>
              </div>
            </div>
          </div>

          {/* Floating badge — clients */}
          <motion.div
            animate={{ y: [0, -7, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -bottom-5 -right-4 hidden lg:block"
          >
            <div className="rounded-xl bg-bg/95 px-5 py-3 backdrop-blur-xl
                            border border-neon-green/20 shadow-lg shadow-neon-green/10">
              <p className="text-[10px] text-muted font-body mb-0.5 tracking-wider uppercase">Actualmente con</p>
              <p className="text-sm font-display font-bold text-neon-green tracking-wide">WIN · LIVOLTEK</p>
            </div>
          </motion.div>
        </motion.div>

        {/* ── CTAs + Availability — debajo del video ── */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="flex flex-col items-center gap-6 mt-12"
        >
          {/* Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href={SITE.links.calendly.startsWith("[") ? "/contacto" : SITE.links.calendly}
              className="btn-glow text-base px-10 py-4"
            >
              {SITE.hero.ctaPrimary} →
            </a>
            <a
              href={SITE.links.whatsapp.startsWith("[") ? "/contacto" : SITE.links.whatsapp}
              className="btn-outline text-sm py-4 px-8"
            >
              WhatsApp →
            </a>
          </div>

          {/* Availability */}
          <div className="flex flex-col items-center gap-3">
            {/* Urgency badge */}
            <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-neon-green/8 border border-neon-green/25 backdrop-blur-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-neon-green slot-available" />
              <span className="text-[11px] font-display font-bold tracking-[0.2em] uppercase text-neon-green/90">
                ⚡ Solo 2 cupos disponibles este mes
              </span>
            </div>
            {/* Slots */}
            <div className="flex items-center gap-2">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="flex flex-col items-center gap-1.5">
                  <div className={`w-10 h-10 rounded-full border flex items-center justify-center transition-all duration-300
                    ${i < 3
                      ? "bg-white/[0.04] border-white/10"
                      : "slot-available bg-neon-green/10 border-neon-green/50"
                    }`}>
                    <div className={`w-2.5 h-2.5 rounded-full ${i < 3 ? "bg-white/20" : "bg-neon-green shadow-[0_0_8px_rgba(0,255,135,1)]"}`} />
                  </div>
                  <span className={`text-[9px] font-display tracking-widest uppercase
                    ${i < 3 ? "text-white/25" : "text-neon-green/70"}`}>
                    {i < 3 ? "Tomado" : "Libre"}
                  </span>
                </div>
              ))}
            </div>
            {/* Text */}
            <p className="text-xs font-body text-muted/60 tracking-wide">
              Marzo 2026 — Cierra en{" "}
              <span className="text-neon-green/80 font-semibold">días</span>
            </p>
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.8 }}
          className="flex justify-center mt-14"
        >
          <motion.div animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            className="flex flex-col items-center gap-2">
            <span className="text-[10px] font-display tracking-[0.3em] uppercase text-muted/40">scroll</span>
            <div className="w-px h-10 bg-gradient-to-b from-neon-green/50 via-neon-purple/30 to-transparent" />
          </motion.div>
        </motion.div>
      </div>

    </section>
  );
}
