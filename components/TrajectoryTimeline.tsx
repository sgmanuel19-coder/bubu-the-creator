"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring, useReducedMotion } from "framer-motion";
import { SITE } from "@/lib/constants";

export default function TrajectoryTimeline() {
  const { timeline, timelineLabel } = SITE.about;
  const trackRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  // Beam de progreso ligado al scroll
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start 0.75", "end 0.45"],
  });
  const beamScale = useSpring(scrollYProgress, { stiffness: 90, damping: 24 });

  return (
    <section id="trayectoria" className="relative section-padding overflow-hidden">
      {/* Atmósfera */}
      <div className="absolute inset-0 grid-pattern opacity-[0.07] pointer-events-none" />
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] rounded-full bg-neon-green/4 blur-[140px] pointer-events-none" />

      <div className="container-base relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="max-w-2xl mb-20"
        >
          <span className="inline-flex items-center gap-2 font-display text-[11px] font-semibold tracking-[0.28em] uppercase text-neon-green mb-5">
            <span className="w-6 h-px bg-neon-green/50" />
            Trayectoria
          </span>
          <h2
            className="font-display font-extrabold text-cream tracking-tighter leading-[1.02] mb-5"
            style={{ fontSize: "clamp(2.2rem, 5vw, 4rem)" }}
          >
            De ejecutar piezas a<br />
            <span className="text-neon-green">diseñar sistemas con IA.</span>
          </h2>
          <p className="font-body text-muted text-[15px] leading-relaxed">{timelineLabel}</p>
        </motion.div>

        {/* Track */}
        <div ref={trackRef} className="relative">
          {/* Línea base + beam de progreso */}
          <div className="absolute left-[11px] sm:left-[155px] top-0 bottom-0 w-px bg-cream/8" />
          <motion.div
            className="absolute left-[11px] sm:left-[155px] top-0 bottom-0 w-px origin-top"
            style={{
              scaleY: reduceMotion ? 1 : beamScale,
              background: "linear-gradient(180deg, #1A80FF 0%, rgba(26,128,255,0.55) 70%, rgba(26,128,255,0.15) 100%)",
              boxShadow: "0 0 18px rgba(26,128,255,0.55)",
            }}
          />

          <div className="space-y-2">
            {timeline.map((item, i) => {
              const isLast = i === timeline.length - 1;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -24 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.6, delay: 0.05, ease: [0.21, 0.47, 0.32, 0.98] }}
                  className="group relative grid grid-cols-[40px_1fr] sm:grid-cols-[120px_70px_1fr] items-start"
                >
                  {/* Año — columna izquierda (desktop) */}
                  <div className="hidden sm:flex items-start justify-end pr-6 pt-7">
                    <span
                      className={`font-display font-black tracking-tight transition-colors duration-500 ${
                        isLast ? "text-neon-green text-xl" : "text-cream/30 text-base group-hover:text-cream/60"
                      }`}
                    >
                      {item.year}
                    </span>
                  </div>

                  {/* Nodo */}
                  <div className="relative flex justify-start sm:justify-center pt-8">
                    <motion.span
                      initial={{ scale: 0.4, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      viewport={{ once: true, margin: "-80px" }}
                      transition={{ duration: 0.45, delay: 0.15, type: "spring", stiffness: 260 }}
                      className="relative z-10 w-[23px] h-[23px] rounded-full border flex items-center justify-center"
                      style={{
                        borderColor: isLast ? "rgba(26,128,255,0.7)" : "rgba(244,240,222,0.18)",
                        background: "#0D0C08",
                        boxShadow: isLast ? "0 0 24px rgba(26,128,255,0.45)" : "none",
                      }}
                    >
                      <span
                        className={`w-[9px] h-[9px] rounded-full transition-all duration-500 ${
                          isLast
                            ? "bg-neon-green animate-pulse"
                            : "bg-cream/25 group-hover:bg-neon-green/70 group-hover:shadow-[0_0_10px_rgba(26,128,255,0.6)]"
                        }`}
                      />
                    </motion.span>
                  </div>

                  {/* Card */}
                  <div className="relative pb-10 pl-2 sm:pl-4">
                    {/* Año fantasma de fondo */}
                    <span
                      aria-hidden
                      className="absolute -top-2 right-0 font-display font-black select-none pointer-events-none leading-none tracking-tighter"
                      style={{
                        fontSize: "clamp(3.5rem, 8vw, 6.5rem)",
                        color: isLast ? "rgba(26,128,255,0.07)" : "rgba(244,240,222,0.035)",
                      }}
                    >
                      {item.year.replace("–hoy", "").replace("–23", "")}
                    </span>

                    <div
                      className={`relative rounded-2xl border p-6 lg:p-7 transition-all duration-300 group-hover:-translate-y-0.5 ${
                        isLast
                          ? "border-neon-green/35 bg-neon-green/[0.04]"
                          : "border-white/8 bg-white/[0.015] group-hover:border-neon-green/25 group-hover:bg-white/[0.03]"
                      }`}
                      style={isLast ? { boxShadow: "0 0 50px rgba(26,128,255,0.12), inset 0 1px 0 rgba(26,128,255,0.15)" } : {}}
                    >
                      {/* Accent superior */}
                      <div
                        className={`absolute top-0 left-0 h-[2px] rounded-t-2xl transition-all duration-500 ${
                          isLast ? "right-0" : "right-full group-hover:right-1/3"
                        }`}
                        style={{
                          background: "linear-gradient(90deg, #1A80FF 0%, rgba(26,128,255,0.3) 70%, transparent 100%)",
                        }}
                      />
                      {/* HUD corners */}
                      <span className={`absolute top-2.5 right-2.5 w-3 h-3 border-t border-r rounded-tr transition-colors duration-300 ${isLast ? "border-neon-green/50" : "border-white/10 group-hover:border-neon-green/40"}`} />
                      <span className={`absolute bottom-2.5 left-2.5 w-3 h-3 border-b border-l rounded-bl transition-colors duration-300 ${isLast ? "border-neon-green/50" : "border-white/10 group-hover:border-neon-green/40"}`} />

                      {/* Año (mobile) */}
                      <span className={`sm:hidden inline-block font-display font-black text-xs tracking-widest mb-2 ${isLast ? "text-neon-green" : "text-cream/40"}`}>
                        {item.year}
                      </span>

                      <div className="flex items-center gap-3 flex-wrap mb-2">
                        <h3 className="font-display font-bold text-cream text-xl lg:text-2xl tracking-tight">
                          {item.company}
                        </h3>
                        <span
                          className={`text-[10px] font-display font-bold tracking-widest uppercase px-2.5 py-1 rounded-full border ${
                            isLast
                              ? "text-neon-green border-neon-green/30 bg-neon-green/10"
                              : "text-muted/70 border-white/10 bg-white/[0.03]"
                          }`}
                        >
                          {item.title}
                        </span>
                      </div>
                      <p className="font-body text-muted text-sm leading-relaxed max-w-2xl">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
