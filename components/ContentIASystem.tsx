"use client";

import { motion } from "framer-motion";
import { SITE } from "@/lib/constants";

interface Phase { n: string; title: string; lead: string; points: string[] }

export default function ContentIASystem() {
  const proof = SITE.proof as unknown as {
    systemTitle: string;
    systemSubtitle: string;
    systemClosing: string;
    system: Phase[];
  };

  return (
    <section id="sistema-ia" className="relative section-padding overflow-hidden">
      {/* subtle warm surface band */}
      <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, transparent, rgba(20,18,9,0.6), transparent)" }} />

      <div className="container-base relative z-10">
        {/* Header */}
        <div className="max-w-2xl mb-14">
          <span className="font-display text-[11px] font-semibold tracking-[0.28em] uppercase text-neon-green mb-5 block">
            Cómo trabajo
          </span>
          <h2 className="font-display font-extrabold text-cream tracking-tight leading-[1.05] mb-5"
            style={{ fontSize: "clamp(2rem, 4.2vw, 3.4rem)" }}>
            {proof.systemTitle}
          </h2>
          <p className="font-body text-muted text-[15px] leading-relaxed">{proof.systemSubtitle}</p>
        </div>

        {/* Phases */}
        <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12">
          {/* connecting hairline (desktop) */}
          <div className="hidden lg:block absolute top-[18px] left-0 right-0 h-px bg-cream/10" />

          {proof.system.map((p, i) => (
            <motion.div
              key={p.n}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="relative"
            >
              {/* node */}
              <div className="flex items-center gap-3 mb-6">
                <span className="relative z-10 w-9 h-9 rounded-full bg-bg flex items-center justify-center font-display font-black text-[13px] text-neon-green tabular-nums"
                  style={{ border: "1px solid rgba(26,128,255,0.4)" }}>
                  {p.n}
                </span>
              </div>

              <h3 className="font-display font-bold text-cream text-lg mb-2.5 tracking-tight">{p.title}</h3>
              <p className="font-body text-cream/65 text-[13.5px] leading-relaxed mb-5">{p.lead}</p>

              <ul className="space-y-2.5">
                {p.points.map((pt) => (
                  <li key={pt} className="flex gap-2.5 font-body text-muted text-[12.5px] leading-snug">
                    <span className="text-neon-green/60 shrink-0 mt-0.5">—</span>
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Closing */}
        <div className="mt-14 pt-8 border-t border-cream/10">
          <p className="font-display font-semibold text-cream text-lg lg:text-xl tracking-tight">
            {proof.systemClosing}
          </p>
        </div>
      </div>
    </section>
  );
}
