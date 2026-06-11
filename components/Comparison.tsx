"use client";

import { useRef, useEffect, useState } from "react";
import {
  motion,
  useInView,
  useScroll,
  useTransform,
  useReducedMotion,
} from "framer-motion";

// ── Animated counter ─────────────────────────────────────────
function CountUp({
  to,
  prefix = "",
  suffix = "",
  duration = 1.4,
}: {
  to: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const reduceMotion = useReducedMotion();
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (reduceMotion) {
      setValue(to);
      return;
    }
    let raf: number;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - start) / (duration * 1000), 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setValue(Math.round(to * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to, duration, reduceMotion]);

  return (
    <span ref={ref}>
      {prefix}
      {value.toLocaleString("en-US")}
      {suffix}
    </span>
  );
}

const TRADICIONAL = [
  { icon: "🎥", text: "Productora, equipo técnico, locaciones, actores" },
  { icon: "📅", text: "4 a 6 semanas de preproducción y rodaje" },
  { icon: "💸", text: "$5,000 a $50,000 por proyecto" },
  { icon: "🔒", text: "Cambios = volver a grabar = volver a pagar" },
];

const CON_IA = [
  { icon: "🧠", text: "Dirección creativa humana + IA generativa de última generación" },
  { icon: "⚡", text: "5 días hábiles desde la aprobación del concepto" },
  { icon: "✦", text: "Desde S/ 600 por video — una fracción del costo" },
  { icon: "♾️", text: "Lo que la cámara no puede: productos que no existen, escenas imposibles" },
];

export default function Comparison() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const glowY = useTransform(scrollYProgress, [0, 1], [60, -60]);

  return (
    <section ref={sectionRef} className="relative section-padding overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      {/* Parallax glow */}
      <motion.div
        style={reduceMotion ? {} : { y: glowY }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full bg-neon-green/5 blur-[160px] pointer-events-none"
      />

      <div className="container-base relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="inline-flex items-center gap-2 text-xs font-display font-semibold tracking-[0.25em] uppercase text-neon-green mb-4">
            <span className="w-6 h-px bg-neon-green/50" />
            El nuevo estándar
            <span className="w-6 h-px bg-neon-green/50" />
          </span>
          <h2
            className="font-display font-extrabold tracking-tighter leading-[1.05]"
            style={{ fontSize: "clamp(2rem, 5.5vw, 4rem)" }}
          >
            La misma calidad.
            <br />
            <span className="text-neon-green">Sin la factura de producción.</span>
          </h2>
        </motion.div>

        {/* Split */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] gap-6 lg:gap-8 items-stretch max-w-5xl mx-auto">
          {/* ── Tradicional (apagado) ── */}
          <motion.div
            initial={{ opacity: 0, x: -32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="relative rounded-2xl border border-white/8 bg-white/[0.015] p-7 lg:p-8"
            style={{ filter: "saturate(0.4)" }}
          >
            <p className="text-[10px] font-display font-bold tracking-[0.3em] uppercase text-muted/50 mb-1">
              Producción tradicional
            </p>
            <div className="flex items-baseline gap-2 mb-6">
              <span className="font-display font-extrabold text-4xl lg:text-5xl text-muted/70 tracking-tight">
                $<CountUp to={50000} />
              </span>
              <span className="font-body text-muted/50 text-sm">hasta · por proyecto</span>
            </div>
            <ul className="space-y-4">
              {TRADICIONAL.map((item, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.2 + i * 0.08 }}
                  className="flex items-start gap-3"
                >
                  <span className="text-lg opacity-50 shrink-0">{item.icon}</span>
                  <span className="font-body text-muted/70 text-sm leading-relaxed">
                    {item.text}
                  </span>
                </motion.li>
              ))}
            </ul>
            <p className="mt-6 pt-5 border-t border-white/5 font-body text-muted/40 text-xs">
              4–6 semanas de espera
            </p>
          </motion.div>

          {/* ── VS divider ── */}
          <div className="flex lg:flex-col items-center justify-center gap-3">
            <span className="hidden lg:block w-px flex-1 bg-gradient-to-b from-transparent via-white/15 to-transparent" />
            <motion.span
              initial={{ opacity: 0, scale: 0.6 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3, type: "spring", stiffness: 200 }}
              className="font-display font-extrabold text-sm tracking-widest uppercase text-cream/60 border border-white/15 rounded-full w-12 h-12 flex items-center justify-center bg-bg shrink-0"
            >
              VS
            </motion.span>
            <span className="hidden lg:block w-px flex-1 bg-gradient-to-b from-transparent via-white/15 to-transparent" />
          </div>

          {/* ── Con IA (vivo) ── */}
          <motion.div
            initial={{ opacity: 0, x: 32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="relative rounded-2xl border border-neon-green/35 p-7 lg:p-8 overflow-hidden"
            style={{
              background: "rgba(26,128,255,0.04)",
              boxShadow: "0 0 60px rgba(26,128,255,0.12), inset 0 1px 0 rgba(26,128,255,0.15)",
            }}
          >
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-neon-green via-neon-green/50 to-transparent" />
            <p className="text-[10px] font-display font-bold tracking-[0.3em] uppercase text-neon-green/70 mb-1">
              RESUELTO con IA
            </p>
            <div className="flex items-baseline gap-2 mb-6">
              <span className="font-display font-extrabold text-4xl lg:text-5xl text-neon-green tracking-tight">
                S/ <CountUp to={600} />
              </span>
              <span className="font-body text-muted/70 text-sm">desde · por video</span>
            </div>
            <ul className="space-y-4">
              {CON_IA.map((item, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: 12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.3 + i * 0.08 }}
                  className="flex items-start gap-3"
                >
                  <span className="text-lg shrink-0">{item.icon}</span>
                  <span className="font-body text-cream/85 text-sm leading-relaxed">
                    {item.text}
                  </span>
                </motion.li>
              ))}
            </ul>
            <p className="mt-6 pt-5 border-t border-neon-green/15 font-display font-bold text-neon-green text-sm">
              Entrega en 5 días hábiles ⚡
            </p>
          </motion.div>
        </div>

        {/* Closing line */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center font-body text-muted max-w-2xl mx-auto mt-12"
        >
          La diferencia no está en la herramienta — está en quién la dirige.
          IA generativa con criterio publicitario de agencia global.
        </motion.p>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-neon-green/20 to-transparent" />
    </section>
  );
}
