"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { SITE } from "@/lib/constants";
import AnimatedSection from "./AnimatedSection";

// ─── Reemplaza con tu foto real ─────────────────────────────────────────────
const CTA_PHOTO: string = "/foto-cta.jpg";

export default function FinalCTA() {
  return (
    <section className="relative section-padding overflow-hidden">
      {/* Dual glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2
                        w-[600px] h-[350px] rounded-full
                        bg-neon-green/10 blur-[90px]" />
        <div className="absolute top-1/2 right-1/3 translate-x-1/2 -translate-y-1/2
                        w-[500px] h-[300px] rounded-full
                        bg-neon-purple/10 blur-[90px]" />
      </div>

      {/* Grid */}
      <div className="absolute inset-0 grid-pattern opacity-35" />

      {/* Top divider */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-neon-green/35 to-neon-purple/35" />

      <div className="container-base relative z-10 max-w-4xl mx-auto">

        {/* ── Circular photo + text layout ── */}
        <div className="flex flex-col items-center text-center">

          {/* ── CIRCULAR PHOTO PLACEHOLDER ── */}
          <AnimatedSection className="mb-8">
            <div className="relative inline-block">
              {/* Glow rings */}
              <div className="absolute -inset-4 rounded-full pointer-events-none">
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-neon-green/20 to-neon-purple/20 blur-xl animate-pulse" />
              </div>

              {/* Outer ring — green→purple gradient */}
              <div className="relative w-44 h-44 rounded-full p-[2.5px]"
                style={{ background: "linear-gradient(135deg, #00ff87 0%, #cc44ff 100%)" }}>
                <div className="w-full h-full rounded-full overflow-hidden bg-[#080a0d] flex items-center justify-center relative">

                  {CTA_PHOTO !== "[FOTO_CTA_CIRCULAR]" ? (
                    <Image src={CTA_PHOTO} alt={SITE.visibleName}
                      fill className="object-cover object-top" />
                  ) : (
                    /* Placeholder */
                    <div className="w-full h-full flex flex-col items-center justify-center gap-1">
                      <span className="text-3xl">👤</span>
                      <p className="text-[8px] font-display text-neon-green/60 tracking-wider text-center px-1">
                        FOTO
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Online indicator */}
              <div className="absolute bottom-2 right-2 w-6 h-6 rounded-full bg-bg border-2 border-bg flex items-center justify-center">
                <span className="w-3 h-3 rounded-full bg-neon-green slot-available" />
              </div>
            </div>
          </AnimatedSection>

          {/* Name + title under photo */}
          <AnimatedSection delay={0.05} className="mb-10">
            <p className="font-display font-bold text-cream text-lg tracking-wide">
              {SITE.visibleName}
            </p>
            <p className="font-body text-muted text-sm mt-1">
              {SITE.professionalTitle}
            </p>
          </AnimatedSection>

          {/* ── Headline ── */}
          <AnimatedSection className="mb-6">
            <h2
              className="font-display font-bold tracking-tighter leading-[1.05]"
              style={{ fontSize: "clamp(2.2rem, 5.5vw, 5rem)" }}
            >
              {SITE.cta.title.map((line, i) => (
                <span key={i} className="block">
                  {i === 1 ? (
                    <span className="text-holo">{line}</span>
                  ) : (
                    line
                  )}
                </span>
              ))}
            </h2>
          </AnimatedSection>

          {/* Body */}
          <AnimatedSection delay={0.15} className="mb-10">
            <p className="font-body text-muted text-lg lg:text-xl leading-relaxed max-w-2xl mx-auto">
              {SITE.cta.body}
            </p>
          </AnimatedSection>

          {/* ── CTAs ── */}
          <AnimatedSection delay={0.25} className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
            <a href={SITE.links.calendly}
              className="btn-glow w-full sm:w-auto justify-center text-base lg:text-lg px-10 py-5">
              {SITE.cta.ctaPrimary} →
            </a>
            <a href={SITE.links.whatsapp}
              className="btn-outline w-full sm:w-auto justify-center text-base lg:text-lg px-10 py-5">
              {SITE.cta.ctaSecondary} →
            </a>
          </AnimatedSection>

          <AnimatedSection delay={0.35} className="space-y-2">
            <p className="text-xs font-body text-muted/50 tracking-wide">
              {SITE.cta.disclaimer}
            </p>
            <p className="text-xs font-body text-neon-green/60 tracking-wide">
              ✓ {SITE.cta.riskReversal}
            </p>
          </AnimatedSection>
        </div>

        {/* Decorative brand name */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          viewport={{ once: true }}
          className="mt-20 select-none pointer-events-none text-center"
        >
          <p
            className="font-display font-bold text-gradient-cyber opacity-[0.06] tracking-[0.3em]"
            style={{ fontSize: "clamp(3rem, 10vw, 9rem)" }}
          >
            {SITE.brandName}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
