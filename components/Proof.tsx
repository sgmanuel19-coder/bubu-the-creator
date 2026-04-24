"use client";

import { SITE } from "@/lib/constants";
import AnimatedSection from "./AnimatedSection";
import { motion } from "framer-motion";
import Link from "next/link";

export default function Proof() {
  return (
    <section id="casos" className="relative section-padding overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-neon-green/25 to-neon-purple/25" />
      <div className="absolute top-1/4 right-0 w-[400px] h-[400px] rounded-full bg-neon-purple/5 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-[350px] h-[350px] rounded-full bg-neon-green/4 blur-[100px] pointer-events-none" />

      <div className="container-base relative z-10">

        {/* Header */}
        <AnimatedSection className="mb-16">
          <span className="inline-flex items-center gap-2 text-xs font-display font-semibold tracking-[0.2em] uppercase text-neon-green mb-4">
            <span className="w-6 h-px bg-neon-green/50" />
            Casos reales
          </span>
          <h2 className="font-display font-bold text-3xl lg:text-5xl tracking-tight mb-4">
            {SITE.proof.title}
          </h2>
          <p className="font-body text-muted text-base lg:text-lg">
            {SITE.proof.subtitle}
          </p>
        </AnimatedSection>

        {/* Cases — horizontal editorial list */}
        <div className="space-y-4 mb-20">
          {SITE.proof.cases.map((caso, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.55, delay: i * 0.07, ease: [0.21, 0.47, 0.32, 0.98] }}
            >
              <Link href={`/casos/${caso.slug}`}
                className="group flex items-start gap-6 lg:gap-10 p-6 lg:p-8 rounded-2xl border border-white/6
                           hover:border-white/15 transition-all duration-300 block"
                style={{ background: "rgba(5,7,9,0.7)" }}
              >
                {/* Number */}
                <div className="shrink-0 font-display font-bold text-4xl lg:text-5xl leading-none
                                text-white/8 group-hover:text-neon-green/25 transition-colors duration-300 select-none">
                  {String(i + 1).padStart(2, "0")}
                </div>

                {/* Divider */}
                <div className="shrink-0 w-px self-stretch bg-white/8 group-hover:bg-neon-green/20 transition-colors duration-300" />

                {/* Main info */}
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-3 mb-3">
                    <h3 className="font-display font-bold text-lg text-cream group-hover:text-white transition-colors">
                      {caso.client}
                    </h3>
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-display font-bold tracking-widest uppercase border
                      ${i % 2 === 0
                        ? "text-neon-green/70 border-neon-green/20 bg-neon-green/5"
                        : "text-neon-purple/70 border-neon-purple/20 bg-neon-purple/5"
                      }`}>
                      {caso.sector}
                    </span>
                  </div>
                  <p className="font-body text-muted/70 text-sm leading-relaxed line-clamp-2">
                    {caso.solution}
                  </p>
                </div>

                {/* Result highlight */}
                <div className="shrink-0 hidden lg:block max-w-[240px] text-right">
                  <p className={`font-body text-xs leading-relaxed
                    ${i % 2 === 0 ? "text-neon-green/70" : "text-neon-purple/70"}`}>
                    {caso.result.split("·")[0].trim()}
                  </p>
                  <div className={`inline-flex items-center gap-1.5 mt-3 text-xs font-display font-semibold tracking-wider uppercase
                    ${i % 2 === 0 ? "text-neon-green/50 group-hover:text-neon-green" : "text-neon-purple/50 group-hover:text-neon-purple"}
                    transition-colors duration-300`}>
                    Ver caso
                    <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Testimonials — 3-column grid, side by side */}
        <AnimatedSection>
          <p className="text-xs font-display font-semibold tracking-[0.3em] uppercase text-neon-green/50 text-center mb-10">
            Lo que dicen quienes trabajan conmigo
          </p>

          <div className="grid md:grid-cols-3 gap-5">
            {SITE.proof.testimonials.map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-20px" }}
                transition={{ duration: 0.55, delay: i * 0.12, ease: [0.21, 0.47, 0.32, 0.98] }}
                className="relative rounded-2xl border border-white/8 p-7 flex flex-col gap-5"
                style={{ background: "rgba(5,7,9,0.8)" }}
              >
                {/* Quote mark */}
                <div className="text-4xl font-display leading-none text-neon-green/20 select-none">"</div>

                {/* Text */}
                <p className="font-body text-muted text-sm leading-relaxed flex-1 -mt-3">
                  {t.text}
                </p>

                {/* Author */}
                <div className="pt-4 border-t border-white/6">
                  <p className="font-display font-semibold text-sm text-cream">{t.name}</p>
                  <p className="font-body text-muted/60 text-xs mt-0.5">{t.role} · {t.company}</p>
                </div>

                {/* Corner accent */}
                <div className="absolute bottom-0 left-0 right-0 h-px rounded-b-2xl bg-gradient-to-r from-neon-green/30 via-neon-purple/20 to-transparent" />
              </motion.div>
            ))}
          </div>
        </AnimatedSection>

      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-neon-purple/25 to-transparent" />
    </section>
  );
}
