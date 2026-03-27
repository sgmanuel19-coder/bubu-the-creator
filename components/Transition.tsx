"use client";

import { SITE } from "@/lib/constants";
import AnimatedSection, { StaggerContainer, StaggerItem } from "./AnimatedSection";

export default function Transition() {
  return (
    <section className="relative section-padding overflow-hidden">
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full bg-violet/5 blur-[100px] pointer-events-none" />

      <div className="container-base relative z-10">
        {/* Header */}
        <AnimatedSection className="max-w-2xl mb-16">
          <span className="inline-flex items-center gap-2 text-xs font-display font-semibold tracking-[0.2em] uppercase text-violet-light mb-4">
            <span className="w-6 h-px bg-violet-light/50" />
            Mi enfoque
          </span>
          <h2 className="font-display font-bold text-3xl lg:text-5xl tracking-tight">
            {SITE.transition.title}
          </h2>
        </AnimatedSection>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Paragraphs */}
          <div className="space-y-6">
            {SITE.transition.paragraphs.map((para, i) => (
              <AnimatedSection key={i} delay={i * 0.1}>
                <p className="font-body text-muted text-base lg:text-lg leading-relaxed">
                  {para}
                </p>
              </AnimatedSection>
            ))}
          </div>

          {/* Before / After comparison */}
          <AnimatedSection delay={0.2}>
            <div className="grid grid-cols-2 gap-3">
              {/* Before column */}
              <div>
                <div className="mb-3 pb-2 border-b border-white/10">
                  <p className="text-xs font-display font-bold tracking-widest uppercase text-muted/60">
                    Antes
                  </p>
                </div>
                <StaggerContainer className="space-y-2">
                  {SITE.transition.before.map((item, i) => (
                    <StaggerItem key={i}>
                      <div className="flex items-start gap-2 p-3 rounded-lg bg-white/[0.02] border border-white/5">
                        <span className="shrink-0 w-1 h-1 rounded-full bg-muted/40 mt-2" />
                        <p className="text-sm font-body text-muted/70 leading-snug">{item}</p>
                      </div>
                    </StaggerItem>
                  ))}
                </StaggerContainer>
              </div>

              {/* After column */}
              <div>
                <div className="mb-3 pb-2 border-b border-violet/30">
                  <p className="text-xs font-display font-bold tracking-widest uppercase text-violet-light/80">
                    Ahora
                  </p>
                </div>
                <StaggerContainer className="space-y-2" staggerDelay={0.12}>
                  {SITE.transition.after.map((item, i) => (
                    <StaggerItem key={i}>
                      <div className="flex items-start gap-2 p-3 rounded-lg bg-violet/8 border border-violet-500/15
                                      hover:bg-violet/12 hover:border-violet-500/25 transition-all duration-200">
                        <span className="shrink-0 w-1 h-1 rounded-full bg-violet-light mt-2" />
                        <p className="text-sm font-body text-cream/80 leading-snug">{item}</p>
                      </div>
                    </StaggerItem>
                  ))}
                </StaggerContainer>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
