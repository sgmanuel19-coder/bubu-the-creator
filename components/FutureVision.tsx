"use client";

import { SITE } from "@/lib/constants";
import AnimatedSection, { StaggerContainer, StaggerItem } from "./AnimatedSection";

const phaseIcons = ["◈", "◉", "✦"];
const phaseColors = [
  { border: "rgba(167,139,250,0.4)", glow: "rgba(124,58,237,0.25)", text: "#a78bfa" },
  { border: "rgba(99,102,241,0.4)", glow: "rgba(79,70,229,0.25)", text: "#818cf8" },
  { border: "rgba(196,181,253,0.4)", glow: "rgba(167,139,250,0.25)", text: "#c4b5fd" },
];

export default function FutureVision() {
  return (
    <section className="relative section-padding overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                        w-[600px] h-[300px] rounded-full
                        bg-gradient-to-r from-violet/6 to-indigo/6 blur-[80px]" />
      </div>

      <div className="container-base relative z-10">
        {/* Header */}
        <AnimatedSection className="text-center mb-16">
          <span className="inline-flex items-center gap-2 text-xs font-display font-semibold tracking-[0.25em] uppercase text-violet-light mb-4">
            <span className="w-6 h-px bg-violet-light/50" />
            Visión
            <span className="w-6 h-px bg-violet-light/50" />
          </span>
          <h2 className="font-display font-extrabold text-3xl lg:text-5xl tracking-tight mb-5">
            {SITE.futureVision.title}
          </h2>
          <p className="font-body text-muted text-base lg:text-lg max-w-xl mx-auto">
            {SITE.futureVision.intro}
          </p>
        </AnimatedSection>

        {/* Phase cards — replacing the timeline */}
        <StaggerContainer className="grid lg:grid-cols-3 gap-5 mb-16">
          {SITE.futureVision.milestones.map((milestone, i) => {
            const color = phaseColors[i];
            return (
              <StaggerItem key={i}>
                <div className="group relative h-full" style={{
                  padding: "1px",
                  borderRadius: "1.25rem",
                  background: `linear-gradient(135deg, ${color.border}, transparent 50%, ${color.border})`,
                  filter: "drop-shadow(0 0 0px transparent)",
                  transition: "filter 0.4s ease",
                }}>
                  <div
                    className="relative h-full rounded-[calc(1.25rem-1px)] p-8 overflow-hidden flex flex-col gap-5 cursor-default
                                transition-all duration-500 group-hover:bg-white/[0.03]"
                    style={{ background: "#0d0d14" }}
                  >
                    {/* Orbital decoration */}
                    <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full pointer-events-none opacity-20 group-hover:opacity-40 transition-opacity"
                      style={{ border: `1px solid ${color.text}`, boxShadow: `0 0 20px ${color.glow}` }} />
                    <div className="absolute -top-4 -right-4 w-16 h-16 rounded-full pointer-events-none opacity-15 group-hover:opacity-35 transition-opacity"
                      style={{ border: `1px solid ${color.text}` }} />

                    {/* Phase number */}
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                        style={{ background: `${color.glow}`, border: `1px solid ${color.border}` }}>
                        <span className="text-lg" style={{ color: color.text }}>{phaseIcons[i]}</span>
                      </div>
                      <span className="font-brand font-bold text-xs tracking-[0.3em] uppercase"
                        style={{ color: color.text }}>
                        {milestone.label}
                      </span>
                    </div>

                    {/* Content */}
                    <div>
                      <h3 className="font-display font-bold text-xl text-cream mb-3 leading-tight">
                        {milestone.title}
                      </h3>
                      <p className="font-body text-muted text-sm leading-relaxed">
                        {milestone.description}
                      </p>
                    </div>

                    {/* Bottom line */}
                    <div className="mt-auto pt-4 border-t border-white/5">
                      <div className="h-0.5 w-0 group-hover:w-full rounded-full transition-all duration-700"
                        style={{ background: `linear-gradient(90deg, ${color.text}, transparent)` }} />
                    </div>
                  </div>
                </div>
              </StaggerItem>
            );
          })}
        </StaggerContainer>

        {/* Closing */}
        <AnimatedSection delay={0.4} className="text-center">
          <p className="font-display font-medium text-base lg:text-lg text-muted/70 italic max-w-xl mx-auto">
            &ldquo;{SITE.futureVision.closing}&rdquo;
          </p>
        </AnimatedSection>
      </div>
    </section>
  );
}
