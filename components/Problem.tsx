"use client";

import { SITE } from "@/lib/constants";
import { motion } from "framer-motion";

const PROBLEM_VIDEO = "/videos/problem-section-bg.mp4";

const ICONS = [
  // Eye — percepción
  <svg key="eye" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}
    strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
    <path d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
    <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>,
  // Code — técnico difícil de explicar
  <svg key="code" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}
    strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
    <path d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
  </svg>,
  // Arrows repeat — sin continuidad
  <svg key="repeat" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}
    strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
    <path d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
  </svg>,
  // CPU/AI — IA sin criterio produce genérico
  <svg key="cpu" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}
    strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
    <path d="M8.25 3v1.5M4.5 8.25H3m18 0h-1.5M4.5 12H3m18 0h-1.5m-15 3.75H3m18 0h-1.5M8.25 19.5V21M12 3v1.5m0 15V21m3.75-18v1.5m0 15V21m-9-1.5h10.5a2.25 2.25 0 002.25-2.25V6.75a2.25 2.25 0 00-2.25-2.25H6.75A2.25 2.25 0 004.5 6.75v10.5a2.25 2.25 0 002.25 2.25zm.75-12h9v9h-9v-9z" />
  </svg>,
];

// Rampa monocromática de marca: azul #1A80FF en intensidades — coherente con toda la línea visual
const ACCENT_COLORS = [
  { border: "border-neon-green/25", bg: "bg-neon-green/10", text: "text-violet-light", bar: "from-neon-green to-violet-light" },
  { border: "border-violet-light/25", bg: "bg-violet-light/10", text: "text-violet-light", bar: "from-violet-light to-neon-green" },
  { border: "border-neon-green/25", bg: "bg-neon-green/10", text: "text-violet-light", bar: "from-violet-dark to-neon-green" },
  { border: "border-violet-light/25", bg: "bg-violet-light/10", text: "text-violet-light", bar: "from-neon-green to-violet-dark" },
];

export default function Problem() {
  const items = SITE.problem.items;

  return (
    <section className="relative py-28 overflow-hidden">
      {/* Video background */}
      <video
        autoPlay muted loop playsInline preload="none"
        className="absolute inset-0 w-full h-full object-cover object-center hidden sm:block"
      >
        <source src={PROBLEM_VIDEO} type="video/mp4" />
      </video>

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/70 to-black/70" />

      {/* Border lines */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-neon-green/40 to-transparent" />
      <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-neon-green/40 to-transparent" />

      {/* Content */}
      <div className="relative z-10 max-w-2xl mx-auto px-6">

        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="text-center mb-14"
        >
          <span className="inline-flex items-center gap-2 text-xs font-display font-semibold tracking-[0.25em] uppercase text-violet-light mb-5">
            <span className="w-6 h-px bg-neon-green/50" />
            El problema real
            <span className="w-6 h-px bg-neon-green/50" />
          </span>
          <h2 className="font-display font-extrabold tracking-tighter text-white mb-5"
            style={{ fontSize: "clamp(2rem, 4.5vw, 3.4rem)" }}>
            {SITE.problem.title}
          </h2>
          <div className="w-16 h-0.5 bg-gradient-to-r from-neon-green to-violet-light mx-auto" />
        </motion.div>

        {/* Problem cards */}
        <div className="flex flex-col gap-4 mb-12">
          {items.map((item, i) => {
            const accent = ACCENT_COLORS[i];
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 36 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.75, delay: i * 0.18, ease: [0.21, 0.47, 0.32, 0.98] }}
                className={`group relative rounded-xl border ${accent.border} bg-white/[0.05] backdrop-blur-sm overflow-hidden
                  transition-all duration-300 hover:-translate-y-0.5 hover:border-neon-green/45 hover:shadow-[0_0_32px_rgba(26,128,255,0.15)]`}
              >
                {/* Top accent bar — crece al hover */}
                <div className={`absolute top-0 left-0 h-0.5 bg-gradient-to-r ${accent.bar} opacity-60 w-1/3 transition-all duration-500 group-hover:w-full group-hover:opacity-100`} />

                <div className="flex items-start gap-5 p-6">
                  {/* Icon box */}
                  <div className={`shrink-0 w-12 h-12 rounded-xl ${accent.bg} border ${accent.border}
                                   flex items-center justify-center ${accent.text}
                                   transition-all duration-300 group-hover:scale-110 group-hover:shadow-[0_0_20px_rgba(26,128,255,0.35)]`}>
                    {ICONS[i]}
                  </div>

                  {/* Text */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-2">
                      <span className={`text-[10px] font-display font-bold tracking-[0.2em] uppercase ${accent.text}`}>
                        0{i + 1}
                      </span>
                      <p className={`font-display font-bold text-sm tracking-wide uppercase ${accent.text}`}>
                        {item.label}
                      </p>
                    </div>
                    <p className="font-body text-white/60 text-sm leading-relaxed">
                      {item.text}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Closing */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.7, delay: 0.4, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="text-center"
        >
          <p className="font-display font-semibold text-lg lg:text-xl bg-gradient-to-r from-violet-light via-cream to-violet-light bg-clip-text text-transparent">
            {SITE.problem.closing}
          </p>
        </motion.div>

      </div>
    </section>
  );
}
