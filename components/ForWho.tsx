"use client";

import { motion } from "framer-motion";
import { SITE } from "@/lib/constants";
import AnimatedSection from "./AnimatedSection";

const icons = ["⚙️", "📡", "⚡", "🌾", "🏗️", "💡"];

// Bento layout: 3-col grid, alternating wide (2-col) and regular (1-col)
// Pattern: [wide][reg] / [reg][wide] / [reg][reg][?]
const bento = [
  { cols: "md:col-span-2" },   // 01 — wide
  { cols: "md:col-span-1" },   // 02
  { cols: "md:col-span-1" },   // 03
  { cols: "md:col-span-2" },   // 04 — wide
  { cols: "md:col-span-1" },   // 05
  { cols: "md:col-span-2" },   // 06 — wide (last row)
];

export default function ForWho() {
  return (
    <section className="relative section-padding overflow-hidden">
      {/* Ambient glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-0 w-[500px] h-[400px] -translate-y-1/2
                        rounded-full blur-[120px] opacity-30"
          style={{ background: "radial-gradient(ellipse, rgba(26,128,255,0.18) 0%, transparent 70%)" }} />
        <div className="absolute top-1/3 right-0 w-[400px] h-[300px]
                        rounded-full blur-[100px] opacity-20"
          style={{ background: "radial-gradient(ellipse, rgba(244,240,222,0.08) 0%, transparent 70%)" }} />
      </div>

      <div className="container-base relative z-10">

        {/* Header */}
        <AnimatedSection className="mb-12 lg:mb-16">
          <span className="inline-flex items-center gap-2 text-xs font-display font-semibold
                           tracking-[0.2em] uppercase text-neon-green mb-4">
            <span className="w-6 h-px bg-neon-green/50" />
            Para quién es
          </span>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
            <h2 className="font-display font-bold text-3xl lg:text-5xl tracking-tight max-w-2xl">
              {SITE.forWho.title}
            </h2>
            <p className="font-body text-muted text-sm leading-relaxed max-w-sm lg:text-right">
              {SITE.forWho.intro}
            </p>
          </div>
        </AnimatedSection>

        {/* Bento grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 lg:gap-4">
          {SITE.forWho.profiles.map((profile, i) => (
            <motion.div
              key={i}
              className={`relative rounded-2xl overflow-hidden group cursor-default
                          ${bento[i].cols}`}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6, delay: i * 0.07, ease: [0.21, 0.47, 0.32, 0.98] }}
              whileHover={{ y: -4 }}
            >
              {/* Card background */}
              <div className="absolute inset-0 rounded-2xl border border-white/[0.07]
                              bg-white/[0.025] transition-all duration-400
                              group-hover:border-brand-blue/40
                              group-hover:bg-brand-blue/[0.04]" />

              {/* Blue glow on hover */}
              <motion.div
                className="absolute inset-0 rounded-2xl pointer-events-none opacity-0
                            group-hover:opacity-100 transition-opacity duration-400"
                style={{
                  boxShadow: "0 0 0 1px rgba(26,128,255,0.35), 0 8px 40px rgba(26,128,255,0.12)",
                }}
              />

              {/* Top accent line */}
              <div className="absolute top-0 left-0 right-0 h-px
                              bg-gradient-to-r from-brand-blue/0 via-brand-blue/60 to-brand-blue/0
                              opacity-0 group-hover:opacity-100 transition-opacity duration-400" />

              {/* Large background number */}
              <div className="absolute top-2 right-4 select-none pointer-events-none
                              font-display font-black text-cream leading-none"
                style={{ fontSize: "clamp(4rem, 8vw, 7rem)", opacity: 0.04 }}>
                {String(i + 1).padStart(2, "0")}
              </div>

              {/* Content */}
              <div className="relative z-10 p-6 lg:p-8 flex flex-col h-full min-h-[180px]">
                {/* Icon + number row */}
                <div className="flex items-center justify-between mb-auto pb-6">
                  <span className="text-3xl lg:text-4xl">{icons[i]}</span>
                  <span className="font-display font-bold text-[0.6rem] tracking-widest uppercase
                                   text-cream/25 group-hover:text-brand-blue/70 transition-colors duration-300">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>

                {/* Text */}
                <div>
                  <h3 className="font-display font-bold text-base lg:text-lg text-cream
                                 leading-snug mb-2 group-hover:text-white transition-colors duration-300">
                    {profile.title}
                  </h3>
                  <p className="font-body text-muted/70 text-[13px] leading-relaxed
                                group-hover:text-muted transition-colors duration-300">
                    {profile.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Closing strip */}
        <AnimatedSection delay={0.3} className="mt-8">
          <div className="rounded-xl border border-white/6 bg-white/[0.015] px-6 py-5
                          flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <span className="font-display font-bold text-[0.6rem] tracking-widest uppercase
                             text-brand-blue/60 flex-shrink-0">
              Importante
            </span>
            <p className="font-body text-muted/60 text-sm leading-relaxed">
              {SITE.forWho.closing}
            </p>
          </div>
        </AnimatedSection>

      </div>
    </section>
  );
}
