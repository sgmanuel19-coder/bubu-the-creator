"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { SITE } from "@/lib/constants";

const TOTAL_SLOTS = 3;
const TAKEN = 2;
const AVAILABLE = TOTAL_SLOTS - TAKEN;

// ─── Set to "" or remove to use gradient background instead of video ───
const BG_VIDEO = "/availability-bg.mp4";

export default function Availability() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section ref={ref} className="relative py-24 lg:py-32 overflow-hidden">

      {/* ── VIDEO / GRADIENT BACKGROUND ── */}
      {BG_VIDEO ? (
        <>
          <video
            autoPlay muted loop playsInline preload="auto"
            className="absolute inset-0 w-full h-full object-cover z-0"
            style={{ objectPosition: "center center" }}
          >
            <source src={BG_VIDEO} type="video/mp4" />
          </video>
          {/* Dark overlay */}
          <div className="absolute inset-0 z-[1] bg-bg/80" />
          {/* Green tint layer */}
          <div className="absolute inset-0 z-[1] bg-gradient-to-br from-neon-green/6 via-transparent to-neon-purple/8" />
          {/* Top/bottom fade to bg */}
          <div className="absolute top-0 left-0 right-0 h-28 z-[2] bg-gradient-to-b from-bg to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 h-28 z-[2] bg-gradient-to-t from-bg to-transparent" />
        </>
      ) : (
        /* Fallback gradient glow */
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                          w-[700px] h-[200px] rounded-full
                          bg-gradient-to-r from-neon-green/10 via-neon-purple/8 to-neon-green/10 blur-[60px]" />
        </div>
      )}

      {/* Scanlines */}
      <div className="absolute inset-0 z-[2] pointer-events-none scanlines" />

      {/* Top / bottom dividers */}
      <div className="absolute top-0 left-0 right-0 h-px z-[3] bg-gradient-to-r from-transparent via-neon-green/40 to-neon-purple/40" />
      <div className="absolute bottom-0 left-0 right-0 h-px z-[3] bg-gradient-to-r from-transparent via-neon-purple/40 to-neon-green/40" />

      {/* ── CONTENT ── */}
      <div className="container-base relative z-10">
        <div className="max-w-3xl mx-auto text-center">

          {/* Status badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8
                       bg-neon-green/10 border border-neon-green/30
                       backdrop-blur-sm"
          >
            <span className="w-2 h-2 rounded-full bg-neon-green slot-available" />
            <span className="text-xs font-display font-semibold tracking-[0.2em] uppercase text-neon-green">
              Disponibilidad Actual
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-display font-extrabold mb-4 tracking-tight drop-shadow-[0_2px_20px_rgba(0,0,0,0.9)]"
            style={{ fontSize: "clamp(2rem, 4.5vw, 3.5rem)" }}
          >
            Solo tomo{" "}
            <span className="text-holo">{AVAILABLE} proyectos nuevos</span>{" "}
            por mes.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-body text-muted text-base lg:text-lg mb-12 max-w-xl mx-auto
                       drop-shadow-[0_1px_8px_rgba(0,0,0,0.9)]"
          >
            Para mantener el criterio y la calidad en cada proyecto, limito mi carga mensual.
            Si estás listo, tiene sentido moverse ahora.
          </motion.p>

          {/* Slot visualizer */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="flex items-center justify-center gap-3 mb-10"
          >
            {[...Array(TOTAL_SLOTS)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ scale: 0, opacity: 0 }}
                animate={isInView ? { scale: 1, opacity: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.4 + i * 0.1, type: "spring", stiffness: 300 }}
              >
                {i < TAKEN ? (
                  // Taken slot
                  <div className="relative w-14 h-20 lg:w-16 lg:h-24 rounded-xl flex flex-col items-center justify-center gap-1
                                  bg-white/[0.04] border border-white/[0.08] backdrop-blur-sm">
                    <div className="w-3 h-3 rounded-full bg-white/15" />
                    <span className="text-[9px] font-display text-muted/50 tracking-widest uppercase">Tomado</span>
                  </div>
                ) : (
                  // Available slot — green neon
                  <div className="relative w-14 h-20 lg:w-16 lg:h-24 rounded-xl flex flex-col items-center justify-center gap-1
                                  bg-neon-green/10 border border-neon-green/40
                                  backdrop-blur-sm slot-available">
                    {/* HUD corners — green */}
                    <div className="absolute top-1.5 left-1.5 w-3 h-3 border-t border-l border-neon-green/70 rounded-tl" />
                    <div className="absolute top-1.5 right-1.5 w-3 h-3 border-t border-r border-neon-green/70 rounded-tr" />
                    <div className="absolute bottom-1.5 left-1.5 w-3 h-3 border-b border-l border-neon-green/70 rounded-bl" />
                    <div className="absolute bottom-1.5 right-1.5 w-3 h-3 border-b border-r border-neon-green/70 rounded-br" />
                    <div className="w-3 h-3 rounded-full bg-neon-green shadow-[0_0_8px_rgba(0,212,255,1)]" />
                    <span className="text-[9px] font-display text-neon-green font-bold tracking-widest uppercase">Libre</span>
                  </div>
                )}
              </motion.div>
            ))}
          </motion.div>

          {/* Progress bar */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.9 }}
            className="max-w-xs mx-auto mb-10"
          >
            <div className="flex justify-between text-xs font-display mb-2">
              <span className="text-muted/70 tracking-widest uppercase">ocupado</span>
              <span className="text-neon-green tracking-widest uppercase">
                {AVAILABLE} libre{AVAILABLE !== 1 ? "s" : ""}
              </span>
            </div>
            <div className="h-1.5 bg-white/[0.07] rounded-full overflow-hidden">
              <motion.div
                className="h-full rounded-full"
                style={{ background: "linear-gradient(90deg, #00d4ff, #cc44ff)" }}
                initial={{ width: "0%" }}
                animate={isInView ? { width: `${(TAKEN / TOTAL_SLOTS) * 100}%` } : {}}
                transition={{ duration: 1.2, delay: 1, ease: "easeOut" }}
              />
            </div>
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 1.1 }}
          >
            <a href={SITE.links.calendly} className="btn-glow">
              Reservar mi cupo →
            </a>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
