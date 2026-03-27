"use client";

import { SITE } from "@/lib/constants";
import AnimatedSection, { StaggerContainer, StaggerItem } from "./AnimatedSection";
import { ShuffleCards } from "./ui/testimonial-cards";

export default function Proof() {
  return (
    <section id="casos" className="relative section-padding overflow-hidden">
      {/* Background glows */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-neon-green/25 to-neon-purple/25" />
      <div className="absolute top-1/4 right-0 w-[400px] h-[400px] rounded-full bg-neon-purple/5 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-[350px] h-[350px] rounded-full bg-neon-green/4 blur-[100px] pointer-events-none" />

      <div className="container-base relative z-10">
        {/* Header */}
        <AnimatedSection className="text-center mb-16">
          <span className="inline-flex items-center gap-2 text-xs font-display font-semibold tracking-[0.2em] uppercase text-neon-green mb-4">
            <span className="w-6 h-px bg-neon-green/50" />
            Prueba social
            <span className="w-6 h-px bg-neon-green/50" />
          </span>
          <h2 className="font-display font-bold text-3xl lg:text-5xl tracking-tight mb-4">
            {SITE.proof.title}
          </h2>
          <p className="font-body text-muted text-base lg:text-lg">
            {SITE.proof.subtitle}
          </p>
        </AnimatedSection>

        {/* Case studies — only if not placeholders */}
        {SITE.proof.cases.some((c) => !c.client.startsWith("[")) && (
          <StaggerContainer className="grid md:grid-cols-2 gap-6 mb-16">
            {SITE.proof.cases.map((caso, i) => (
              <StaggerItem key={i} className={SITE.proof.cases.length % 2 !== 0 && i === SITE.proof.cases.length - 1 ? "md:col-span-2" : ""}>
                <div className="group holo-border holo-border-hover card-shimmer hud-corners relative overflow-hidden">
                  <div
                    className="rounded-[calc(1.25rem-1px)] overflow-hidden"
                    style={{ background: "rgba(8,10,13,0.98)" }}
                  >
                    {/* Image */}
                    <div className="aspect-video overflow-hidden border-b border-white/5">
                      {caso.image.startsWith("[") ? (
                        <div className="w-full h-full flex flex-col items-center justify-center gap-2 p-6 text-center bg-white/[0.02]">
                          <div className="w-12 h-12 rounded-xl bg-neon-green/10 border border-neon-green/20 flex items-center justify-center">
                            <span className="text-2xl">🖼️</span>
                          </div>
                          <p className="text-neon-green text-xs font-display font-semibold">{caso.image}</p>
                          <p className="text-muted text-xs">Reemplaza en lib/constants.ts</p>
                        </div>
                      ) : (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={caso.image}
                          alt={caso.client}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      )}
                    </div>

                    {/* Content */}
                    <div className="p-7">
                      <div className="flex items-center gap-2 mb-4">
                        <span className="text-xs font-display font-bold text-neon-green tracking-wider">
                          {caso.client}
                        </span>
                        <span className="text-muted/40">·</span>
                        <span className="text-xs font-body text-muted">{caso.sector}</span>
                      </div>
                      <div className="space-y-3">
                        <div>
                          <p className="text-[10px] font-display font-bold tracking-widest text-muted/50 uppercase mb-1">Problema</p>
                          <p className="text-sm font-body text-cream/70 leading-relaxed">{caso.problem}</p>
                        </div>
                        <div>
                          <p className="text-[10px] font-display font-bold tracking-widest text-neon-green/50 uppercase mb-1">Solución</p>
                          <p className="text-sm font-body text-cream/70 leading-relaxed">{caso.solution}</p>
                        </div>
                        <div className="pt-2 border-t border-white/5">
                          <p className="text-[10px] font-display font-bold tracking-widest text-neon-purple/60 uppercase mb-1">Resultado</p>
                          <p className="text-sm font-body text-cream/80 font-medium leading-relaxed">{caso.result}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        )}

        {/* Testimonials — draggable shuffle cards */}
        <AnimatedSection className="flex flex-col items-center gap-8">
          <p className="text-xs font-display font-semibold tracking-[0.3em] uppercase text-neon-green/50 text-center">
            Lo que dicen quienes trabajan conmigo
          </p>
          <div className="flex justify-center">
            <ShuffleCards
              testimonials={SITE.proof.testimonials.map((t, i) => ({
                id: i + 1,
                testimonial: t.text,
                author: t.name,
                role: t.role,
                company: t.company,
              }))}
            />
          </div>
          <p className="text-xs font-body text-muted/40 text-center mt-28">
            ← Arrastra la tarjeta para ver los demás testimonios
          </p>
        </AnimatedSection>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-neon-purple/25 to-transparent" />
    </section>
  );
}
