"use client";

import { motion } from "framer-motion";
import { SITE } from "@/lib/constants";

export default function TestimonialsCasos() {
  const testimonials = SITE.proof.testimonials;

  return (
    <section id="testimonios" className="relative section-padding overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-neon-green/15 to-transparent" />

      <div className="container-base relative z-10">
        <div className="mb-10">
          <span className="inline-flex items-center gap-2 text-xs font-display font-semibold tracking-[0.2em] uppercase text-neon-green mb-4">
            <span className="w-6 h-px bg-neon-green/50" />
            Lo que dicen
          </span>
          <h2 className="font-display font-bold text-2xl lg:text-4xl tracking-tight">
            Voces de quienes ya trabajaron conmigo
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {testimonials.map((t, i) => {
            const isG = i % 2 === 0;
            const rgb = isG ? "26,128,255" : "77,159,255";
            return (
              <motion.figure
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.55, delay: i * 0.08 }}
                className="relative rounded-2xl p-6 flex flex-col"
                style={{ background: "rgba(5,7,10,0.8)", border: `1px solid rgba(${rgb},0.14)` }}
              >
                <span className="font-display text-4xl leading-none mb-3" style={{ color: `rgba(${rgb},0.5)` }}>"</span>
                <blockquote className="font-body text-[13px] text-cream/90 leading-relaxed mb-5 flex-1">
                  {t.text}
                </blockquote>
                <figcaption className="flex items-center gap-3 pt-4 border-t" style={{ borderColor: `rgba(${rgb},0.12)` }}>
                  <span className="w-9 h-9 rounded-full flex items-center justify-center font-display font-bold text-sm"
                    style={{ background: `rgba(${rgb},0.1)`, color: `rgba(${rgb},0.95)`, border: `1px solid rgba(${rgb},0.25)` }}>
                    {t.company.charAt(0)}
                  </span>
                  <div>
                    <p className="font-display font-bold text-cream text-[13px] leading-tight">{t.role}</p>
                    <p className="font-body text-muted text-[11px]">{t.company}</p>
                  </div>
                </figcaption>
              </motion.figure>
            );
          })}
        </div>
      </div>
    </section>
  );
}
