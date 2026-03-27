"use client";

import { SITE } from "@/lib/constants";
import AnimatedSection from "./AnimatedSection";
import TiltCard from "./TiltCard";

export default function Services() {
  const { core, premium } = SITE.services;

  return (
    <section id="servicios" className="relative section-padding overflow-hidden" style={{ background: "#07090c" }}>
      {/* Top divider */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-neon-green/40 to-transparent" />

      {/* Glow blobs */}
      <div className="absolute top-0 right-0 w-[450px] h-[350px] rounded-full bg-neon-purple/8 blur-[90px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[450px] h-[350px] rounded-full bg-neon-green/6 blur-[90px] pointer-events-none" />

      <div className="container-base relative z-10">
        {/* Header */}
        <AnimatedSection className="text-center mb-16">
          <span className="inline-flex items-center gap-2 text-xs font-display font-semibold tracking-[0.2em] uppercase text-neon-green mb-4">
            <span className="w-6 h-px bg-neon-green/50" />
            Servicios
            <span className="w-6 h-px bg-neon-green/50" />
          </span>
          <h2 className="font-display font-bold text-3xl lg:text-5xl tracking-tight mb-4">
            {SITE.services.title}
          </h2>
          <p className="font-body text-muted text-base lg:text-lg">
            {SITE.services.subtitle}
          </p>
        </AnimatedSection>

        <div className="grid lg:grid-cols-2 gap-6">

          {/* CORE — green theme */}
          <AnimatedSection delay={0.1}>
            <TiltCard intensity={6} className="h-full">
            <div className="group h-full relative rounded-2xl p-8 lg:p-10 flex flex-col overflow-hidden
                            border border-neon-green/15 hover:border-neon-green/40
                            bg-neon-green/[0.03] hover:bg-neon-green/[0.06]
                            transition-all duration-500 hover:shadow-xl hover:shadow-neon-green/10
                            card-shimmer">
              {/* Shimmer overlay */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-neon-green/8 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

              {/* Badge */}
              <span className="relative z-10 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full
                               bg-neon-green/12 border border-neon-green/25
                               text-xs font-display font-semibold text-neon-green mb-6 self-start">
                <span className="w-1.5 h-1.5 rounded-full bg-neon-green animate-pulse" />
                {core.badge}
              </span>

              <h3 className="relative z-10 font-display font-bold text-2xl lg:text-3xl text-cream mb-3 tracking-tight">
                {core.name}
              </h3>
              <p className="relative z-10 font-body text-muted text-sm mb-2 leading-relaxed">{core.target}</p>

              {/* Divider */}
              <div className="relative z-10 w-12 h-px bg-gradient-to-r from-neon-green/60 to-transparent my-6" />

              <ul className="relative z-10 space-y-3 mb-8 flex-1">
                {core.items.map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="shrink-0 w-5 h-5 rounded-full bg-neon-green/12 border border-neon-green/30 flex items-center justify-center mt-0.5">
                      <span className="text-neon-green text-[10px] font-bold">✓</span>
                    </span>
                    <span className="font-body text-sm text-cream/80 leading-snug">{item}</span>
                  </li>
                ))}
              </ul>

              <p className="relative z-10 font-body text-muted/70 text-xs italic mb-6 leading-relaxed border-l-2 border-neon-green/25 pl-3">
                {core.tagline}
              </p>

              <a href={SITE.links.calendly} className="btn-glow relative z-10 self-start text-sm py-3 px-6">
                {core.cta} →
              </a>
            </div>
            </TiltCard>
          </AnimatedSection>

          {/* PREMIUM — purple theme */}
          <AnimatedSection delay={0.2}>
            <TiltCard intensity={6} className="h-full">
            <div className="group h-full relative rounded-2xl p-8 lg:p-10 flex flex-col overflow-hidden
                            border border-neon-purple/20 hover:border-neon-purple/50
                            bg-neon-purple/[0.04] hover:bg-neon-purple/[0.08]
                            hover:shadow-2xl hover:shadow-neon-purple/15 transition-all duration-500
                            card-shimmer">
              {/* Shimmer overlay */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-neon-purple/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

              {/* Badge */}
              <span className="relative z-10 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full
                               bg-neon-purple/15 border border-neon-purple/30
                               text-xs font-display font-semibold text-neon-purple mb-6 self-start">
                <span className="w-1.5 h-1.5 rounded-full bg-neon-purple animate-pulse" />
                {premium.badge}
              </span>

              <h3 className="relative z-10 font-display font-bold text-2xl lg:text-3xl text-cream mb-3 tracking-tight">
                {premium.name}
              </h3>
              <p className="relative z-10 font-body text-muted text-sm mb-2 leading-relaxed">{premium.target}</p>

              {/* Divider */}
              <div className="relative z-10 w-12 h-px bg-gradient-to-r from-neon-purple/60 to-transparent my-6" />

              <ul className="relative z-10 space-y-3 mb-8 flex-1">
                {premium.items.map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="shrink-0 w-5 h-5 rounded-full bg-neon-purple/15 border border-neon-purple/30 flex items-center justify-center mt-0.5">
                      <span className="text-neon-purple text-[10px]">✦</span>
                    </span>
                    <span className="font-body text-sm text-cream/80 leading-snug">{item}</span>
                  </li>
                ))}
              </ul>

              <p className="relative z-10 font-body text-muted/70 text-xs italic mb-6 leading-relaxed border-l-2 border-neon-purple/30 pl-3">
                {premium.note}
              </p>

              <a href={SITE.links.calendly} className="btn-outline relative z-10 self-start text-sm py-3 px-6">
                {premium.cta} →
              </a>
            </div>
            </TiltCard>
          </AnimatedSection>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-neon-purple/40 to-transparent" />
    </section>
  );
}
