"use client";

import { SITE } from "@/lib/constants";
import AnimatedSection, { StaggerContainer, StaggerItem } from "./AnimatedSection";
import CountUp from "./CountUp";
import TiltCard from "./TiltCard";

export default function Authority() {
  return (
    <section className="relative section-padding overflow-hidden">
      {/* ── VIDEO BACKGROUND ── */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
        style={{ zIndex: 0 }}
      >
        <source src="/trayectoria-bg.mp4" type="video/mp4" />
      </video>

      {/* Dark overlay — preserves legibility */}
      <div className="absolute inset-0 bg-bg/80" style={{ zIndex: 1 }} />

      {/* Gradient overlay — top & bottom blend with page */}
      <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 1 }}>
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-bg to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-bg to-transparent" />
      </div>

      {/* Neon color tint */}
      <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 1 }}>
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[400px] h-[300px] rounded-full bg-neon-green/8 blur-[100px]" />
        <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[400px] h-[300px] rounded-full bg-neon-purple/10 blur-[100px]" />
      </div>

      {/* Top divider — green→purple */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-neon-green/40 to-neon-purple/40" style={{ zIndex: 2 }} />

      <div className="container-base relative z-10" style={{ zIndex: 10 }}>
        {/* Header */}
        <AnimatedSection className="text-center mb-16">
          <span className="inline-flex items-center gap-2 text-xs font-display font-semibold tracking-[0.2em] uppercase text-neon-green mb-4">
            <span className="w-6 h-px bg-neon-green/50" />
            Trayectoria
            <span className="w-6 h-px bg-neon-green/50" />
          </span>
          <h2 className="font-display font-bold text-3xl lg:text-5xl tracking-tight mb-5">
            {SITE.authority.title}
          </h2>
          <p className="font-body text-muted text-base lg:text-lg max-w-xl mx-auto leading-relaxed">
            {SITE.authority.subtitle}
          </p>
        </AnimatedSection>

        {/* Metrics grid */}
        <StaggerContainer className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-20">
          {SITE.authority.metrics.map((metric, i) => (
            <StaggerItem key={i}>
              <TiltCard intensity={8}>
              <div className="card-base hud-corners relative p-7 text-center">
                <p className="font-display font-bold text-cream mb-2"
                  style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}>
                  <CountUp
                    end={metric.value as number}
                    suffix={metric.suffix}
                    className={i % 2 === 0 ? "text-gradient-green" : "text-gradient"}
                  />
                </p>
                <p className="text-sm font-body text-muted leading-snug">{metric.label}</p>
              </div>
              </TiltCard>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* Logos */}
        <AnimatedSection className="text-center">
          <p className="text-xs font-body text-muted/85 tracking-widest uppercase mb-8">
            {SITE.authority.logosLabel}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 lg:gap-6">
            {SITE.authority.logos.map((logo, i) => (
              <div
                key={i}
                className={`group h-12 px-6 rounded-xl border bg-white/[0.02]
                           transition-all duration-300 flex items-center justify-center cursor-default
                           ${i % 2 === 0
                             ? "border-white/5 hover:border-neon-green/25 hover:bg-neon-green/[0.04] hover:shadow-lg hover:shadow-neon-green/10"
                             : "border-white/5 hover:border-neon-purple/25 hover:bg-neon-purple/[0.04] hover:shadow-lg hover:shadow-neon-purple/10"
                           }`}
              >
                {logo.src ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={logo.src}
                    alt={logo.name}
                    className="h-6 object-contain opacity-35 group-hover:opacity-90 transition-opacity duration-300 grayscale group-hover:grayscale-0"
                  />
                ) : (
                  <span className={`font-display font-semibold text-sm tracking-wide transition-colors duration-300
                    ${i % 2 === 0
                      ? "text-white/60 group-hover:text-neon-green"
                      : "text-white/60 group-hover:text-neon-purple"
                    }`}>
                    {logo.name}
                  </span>
                )}
              </div>
            ))}
          </div>
        </AnimatedSection>
      </div>

      {/* Bottom divider */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-neon-purple/40 to-neon-green/40" style={{ zIndex: 2 }} />
    </section>
  );
}
