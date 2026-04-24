"use client";

import { SITE } from "@/lib/constants";
import AnimatedSection from "./AnimatedSection";
import { motion } from "framer-motion";

const ABOUT_VIDEO = "/about-bg.mp4";

export default function About() {
  return (
    <section className="relative section-padding overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-neon-purple/5 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-neon-green/4 blur-[100px] pointer-events-none" />

      <div className="container-base relative z-10">

        {/* Header */}
        <AnimatedSection className="mb-16">
          <span className="inline-flex items-center gap-2 text-xs font-display font-semibold tracking-[0.25em] uppercase text-neon-green mb-4">
            <span className="w-6 h-px bg-neon-green/50" />
            Quién soy
          </span>
          <h2 className="font-display font-extrabold text-3xl lg:text-5xl tracking-tight leading-[1.05] max-w-2xl">
            {SITE.about.title}
          </h2>
        </AnimatedSection>

        {/* Main grid: video (left) + bio + timeline (right) */}
        <div className="grid lg:grid-cols-5 gap-12 lg:gap-16 items-start">

          {/* ── Left: Video ── 2/5 */}
          <AnimatedSection direction="left" className="lg:col-span-2">
            <div className="relative">
              <div className="absolute -inset-3 rounded-2xl pointer-events-none">
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-neon-green/12 via-transparent to-neon-purple/12 blur-2xl" />
              </div>
              <div className="holo-border holo-border-hover">
                <div className="relative rounded-[calc(1.25rem-1px)] overflow-hidden aspect-[3/4] bg-[#060709]">
                  {ABOUT_VIDEO ? (
                    <>
                      <video autoPlay muted loop playsInline preload="auto"
                        className="absolute inset-0 w-full h-full object-cover"
                        style={{ objectPosition: "center top" }}>
                        <source src={ABOUT_VIDEO} type="video/mp4" />
                      </video>
                      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#060709]/80 to-transparent pointer-events-none" />
                      <div className="absolute inset-0 bg-gradient-to-br from-neon-green/6 via-transparent to-neon-purple/8 pointer-events-none" />
                    </>
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <span className="text-6xl">👤</span>
                    </div>
                  )}
                  {/* HUD corners */}
                  <div className="absolute top-3 left-3 w-6 h-6 border-t-2 border-l-2 border-neon-green/55 rounded-tl pointer-events-none" />
                  <div className="absolute top-3 right-3 w-6 h-6 border-t-2 border-r-2 border-neon-green/40 rounded-tr pointer-events-none" />
                  <div className="absolute bottom-3 left-3 w-6 h-6 border-b-2 border-l-2 border-neon-purple/40 rounded-bl pointer-events-none" />
                  <div className="absolute bottom-3 right-3 w-6 h-6 border-b-2 border-r-2 border-neon-purple/55 rounded-br pointer-events-none" />
                  <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-[calc(1.25rem-1px)]">
                    <div className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-neon-green/25 to-transparent"
                      style={{ animation: "scanSweep 6s linear infinite" }} />
                  </div>
                </div>
              </div>
            </div>
          </AnimatedSection>

          {/* ── Right: Bio + Timeline ── 3/5 */}
          <div className="lg:col-span-3 flex flex-col gap-10">

            {/* Bio */}
            <div className="space-y-5">
              {SITE.about.bio.map((para, i) => (
                <AnimatedSection key={i} delay={i * 0.1}>
                  <p className="font-body text-muted text-base lg:text-lg leading-relaxed">{para}</p>
                </AnimatedSection>
              ))}
            </div>

            {/* Timeline — vertical, connected */}
            <AnimatedSection delay={0.3}>
              <p className="text-xs font-display font-semibold tracking-[0.3em] uppercase text-neon-green/50 mb-8">
                {SITE.about.timelineLabel}
              </p>
              <div className="relative">
                {/* Animated growing vertical line */}
                <motion.div
                  className="absolute left-[11px] top-0 w-px origin-top"
                  style={{ background: "linear-gradient(to bottom, rgba(0,255,135,0.5), rgba(160,32,240,0.25), transparent)" }}
                  initial={{ scaleY: 0 }}
                  whileInView={{ scaleY: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.2, ease: [0.21, 0.47, 0.32, 0.98], delay: 0.2 }}
                >
                  <div className="h-full w-full" style={{ minHeight: `${SITE.about.timeline.length * 88}px` }} />
                </motion.div>

                <div className="space-y-0">
                  {SITE.about.timeline.map((entry, i) => {
                    const isActive = entry.year === "HOY";
                    return (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -16 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-20px" }}
                        transition={{ type: "spring", stiffness: 200, damping: 22, delay: i * 0.09 }}
                        className="relative flex gap-5 pb-7 last:pb-0"
                      >
                        {/* Big year ghost number */}
                        <div className="absolute -left-2 top-0 font-display font-extrabold select-none pointer-events-none"
                          style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", color: isActive ? "rgba(0,255,135,0.06)" : "rgba(255,255,255,0.03)", lineHeight: 1 }}>
                          {entry.year}
                        </div>

                        {/* Dot */}
                        <div className={`relative z-10 shrink-0 mt-1 w-[22px] h-[22px] rounded-full border-2 flex items-center justify-center
                          ${isActive
                            ? "bg-neon-green border-neon-green"
                            : "bg-bg border-neon-green/30"
                          }`}
                          style={isActive ? { boxShadow: "0 0 0 4px rgba(0,255,135,0.15), 0 0 12px rgba(0,255,135,0.5)" } : {}}>
                          {isActive ? (
                            <motion.span
                              className="w-2 h-2 rounded-full bg-black"
                              animate={{ scale: [1, 1.3, 1] }}
                              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                            />
                          ) : null}
                        </div>

                        {/* Content */}
                        <div className="flex-1 pt-0.5">
                          <div className="flex items-center gap-3 mb-1">
                            <span className={`font-display font-bold text-xs tracking-widest
                              ${isActive ? "text-neon-green" : "text-neon-green/50"}`}>
                              {entry.year}
                            </span>
                            <span className="text-muted/30 text-xs">·</span>
                            <span className="font-display font-semibold text-xs text-cream/60">
                              {entry.company}
                            </span>
                          </div>
                          <h4 className={`font-display font-bold text-sm mb-1
                            ${isActive ? "text-neon-green" : "text-cream"}`}>
                            {entry.title}
                          </h4>
                          <p className="font-body text-muted/70 text-xs leading-relaxed">
                            {entry.description}
                          </p>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </AnimatedSection>

          </div>
        </div>

      </div>
    </section>
  );
}
