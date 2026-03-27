"use client";

import { SITE } from "@/lib/constants";
import AnimatedSection, { StaggerContainer, StaggerItem } from "./AnimatedSection";

export default function Problem() {
  return (
    <section className="relative section-padding bg-purple-dark overflow-hidden">
      {/* Top border gradient */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-violet/40 to-transparent" />

      {/* Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-violet/5 blur-[80px] pointer-events-none" />

      <div className="container-base relative z-10">
        <AnimatedSection className="mb-16 text-center">
          <h2 className="font-display font-bold text-3xl lg:text-5xl tracking-tight mb-4">
            {SITE.problem.title}
          </h2>
          <div className="w-16 h-0.5 bg-gradient-to-r from-violet to-indigo mx-auto" />
        </AnimatedSection>

        <StaggerContainer className="grid md:grid-cols-2 gap-5 max-w-4xl mx-auto mb-16">
          {SITE.problem.items.map((item, i) => (
            <StaggerItem key={i}>
              <div
                className="group card-base hud-corners relative p-7 cursor-default"
              >
                {/* Number */}
                <div className="flex items-start gap-4">
                  <span className="shrink-0 w-8 h-8 rounded-full bg-violet/15 border border-violet/20
                                   flex items-center justify-center text-xs font-display font-bold text-violet-light">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <p className="font-display font-semibold text-sm text-violet-light mb-2 tracking-wide">
                      {item.label}
                    </p>
                    <p className="font-body text-muted text-base leading-relaxed group-hover:text-cream/80 transition-colors">
                      {item.text}
                    </p>
                  </div>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        <AnimatedSection delay={0.4} className="text-center">
          <p className="font-display font-semibold text-xl lg:text-2xl text-gradient">
            {SITE.problem.closing}
          </p>
        </AnimatedSection>
      </div>

      {/* Bottom border gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-violet/40 to-transparent" />
    </section>
  );
}
