"use client";

import { motion } from "framer-motion";
import { SITE } from "@/lib/constants";

export default function TestimonialsCasos() {
  const testimonials = SITE.proof.testimonials;

  return (
    <section id="testimonios" className="relative section-padding">
      <div className="container-base">
        <div className="max-w-2xl mb-12">
          <span className="font-display text-[11px] font-semibold tracking-[0.28em] uppercase text-neon-green mb-5 block">
            Lo que dicen
          </span>
          <h2 className="font-display font-extrabold text-cream tracking-tight leading-[1.05]"
            style={{ fontSize: "clamp(2rem, 4.2vw, 3.4rem)" }}>
            Voces de quienes ya trabajaron conmigo
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-px rounded-2xl overflow-hidden"
          style={{ background: "rgba(244,240,222,0.08)" }}>
          {testimonials.map((t, i) => (
            <motion.figure
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.55, delay: i * 0.08 }}
              className="bg-bg p-8 flex flex-col"
            >
              <span className="font-display text-5xl leading-none text-neon-green/40 mb-4">"</span>
              <blockquote className="font-body text-cream/85 text-[14px] leading-relaxed mb-7 flex-1">
                {t.text}
              </blockquote>
              <figcaption className="pt-5 border-t border-cream/10">
                <p className="font-display font-bold text-cream text-[13px] leading-tight">{t.role}</p>
                <p className="font-body text-muted text-[12px] mt-0.5">{t.company}</p>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
