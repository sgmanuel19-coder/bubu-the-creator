"use client";

import { motion } from "framer-motion";
import { SITE } from "@/lib/constants";
import GridBackground from "@/components/ui/grid-background";

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


      {/* Glow blobs */}
      <div className="absolute inset-0 z-[2] pointer-events-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[300px] rounded-full bg-neon-purple/8 blur-[100px]" />
        <div className="absolute bottom-1/3 left-1/4 w-[400px] h-[200px] rounded-full bg-neon-green/6 blur-[80px]" />
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

              <iframe
                src="https://www.youtube.com/embed/WLtnDdsYFqc"
                title="Video Sales Letter - Resuelto Agency"
                className="absolute inset-0 w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />

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

          {/* Availability — 2 service cards */}
          <div className="flex flex-col sm:flex-row items-stretch justify-center gap-4 w-full max-w-lg mx-auto">

            {/* Sistema Audiovisual */}
            <div className="flex-1 relative rounded-2xl border border-neon-green/35 px-5 py-5 flex flex-col gap-3 overflow-hidden"
              style={{
                background: "rgba(10, 18, 14, 0.72)",
                backdropFilter: "blur(18px) saturate(160%)",
                WebkitBackdropFilter: "blur(18px) saturate(160%)",
                boxShadow: "0 4px 32px rgba(0,0,0,0.5), 0 0 24px rgba(0,255,135,0.08), inset 0 1px 0 rgba(0,255,135,0.12)",
              }}>
              {/* Top accent line */}
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-neon-green/80 via-neon-green/40 to-transparent" />
              {/* HUD corner */}
              <div className="absolute top-2.5 left-2.5 w-3 h-3 border-t border-l border-neon-green/50 rounded-tl" />
              <div className="absolute top-2.5 right-2.5 w-3 h-3 border-t border-r border-neon-green/50 rounded-tr" />

              <div className="flex items-center justify-between">
                <span className="text-[11px] font-display font-bold tracking-[0.2em] uppercase text-neon-green/80">
                  Sistema Audiovisual
                </span>
                <span className="w-2 h-2 rounded-full bg-neon-green slot-available"
                  style={{ boxShadow: "0 0 8px rgba(0,255,135,0.9)" }} />
              </div>

              {/* Slot dots */}
              <div className="flex items-center gap-2">
                {[0, 1, 2].map((i) => (
                  <div key={i} className={`w-3 h-3 rounded-full transition-all ${
                    i < 2
                      ? "bg-white/12 border border-white/10"
                      : "bg-neon-green border border-neon-green/60"
                  }`}
                    style={i >= 2 ? { boxShadow: "0 0 10px rgba(0,255,135,0.8)" } : {}} />
                ))}
                <span className="text-[10px] font-body text-white/55 ml-1">cupos</span>
              </div>

              <div>
                <p className="text-base font-display font-bold text-neon-green leading-none">
                  1 cupo disponible
                </p>
                <p className="text-[11px] font-body text-white/65 mt-1">este mes · Lima</p>
              </div>
            </div>

            {/* Bot IA Comercial */}
            <div className="flex-1 relative rounded-2xl border border-neon-purple/35 px-5 py-5 flex flex-col gap-3 overflow-hidden"
              style={{
                background: "rgba(16, 10, 20, 0.72)",
                backdropFilter: "blur(18px) saturate(160%)",
                WebkitBackdropFilter: "blur(18px) saturate(160%)",
                boxShadow: "0 4px 32px rgba(0,0,0,0.5), 0 0 24px rgba(204,68,255,0.08), inset 0 1px 0 rgba(204,68,255,0.12)",
              }}>
              {/* Top accent line */}
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-neon-purple/80 via-neon-purple/40 to-transparent" />
              {/* HUD corner */}
              <div className="absolute top-2.5 left-2.5 w-3 h-3 border-t border-l border-neon-purple/50 rounded-tl" />
              <div className="absolute top-2.5 right-2.5 w-3 h-3 border-t border-r border-neon-purple/50 rounded-tr" />

              <div className="flex items-center justify-between">
                <span className="text-[11px] font-display font-bold tracking-[0.2em] uppercase text-neon-purple/80">
                  Bot IA Comercial
                </span>
                <span className="w-2 h-2 rounded-full bg-neon-purple animate-pulse"
                  style={{ boxShadow: "0 0 8px rgba(204,68,255,0.9)" }} />
              </div>

              {/* Slot dots */}
              <div className="flex items-center gap-2">
                {[0, 1, 2].map((i) => (
                  <div key={i} className="w-3 h-3 rounded-full bg-neon-purple/35 border border-neon-purple/30" />
                ))}
                <span className="text-[10px] font-body text-white/55 ml-1">plazas</span>
              </div>

              <div>
                <p className="text-base font-display font-bold text-neon-purple leading-none">
                  Plazas abiertas
                </p>
                <p className="text-[11px] font-body text-white/65 mt-1">sin límite · próximamente</p>
              </div>
            </div>

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
            <span className="text-[10px] font-display tracking-[0.3em] uppercase text-muted/70">scroll</span>
            <div className="w-px h-10 bg-gradient-to-b from-neon-green/50 via-neon-purple/30 to-transparent" />
          </motion.div>
        </motion.div>
      </div>

    </section>
  );
}
