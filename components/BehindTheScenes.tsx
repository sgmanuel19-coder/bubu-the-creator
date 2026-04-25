"use client";

import AnimatedSection from "./AnimatedSection";

const clips = [
  { label: "En campo", note: "Grabación en locación" },
  { label: "Setup de cámara", note: "Detrás del encuadre" },
  { label: "Dirección en set", note: "Guiando al vocero" },
  { label: "Edición y entrega", note: "El sistema terminado" },
];

export default function BehindTheScenes() {
  return (
    <section className="relative section-padding overflow-hidden">
      <div className="absolute inset-0 grid-pattern opacity-10 pointer-events-none" />

      <div className="container-base relative z-10">
        <AnimatedSection className="mb-12">
          <span className="inline-flex items-center gap-2 text-xs font-display font-semibold tracking-[0.25em] uppercase text-neon-green mb-4">
            <span className="w-6 h-px bg-neon-green/50" />
            Detrás del lente
          </span>
          <h2
            className="font-display font-bold tracking-tighter leading-tight"
            style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)" }}
          >
            Así es como trabajo
          </h2>
          <p className="font-body text-muted text-base mt-3 max-w-md">
            Grabaciones reales, en campo, sin poses. Esto es lo que pasa cuando el sistema está en marcha.
          </p>
        </AnimatedSection>

        {/* Grid — 2 cols mobile, 4 cols desktop con stagger */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5 items-start">
          {clips.map((clip, i) => (
            <AnimatedSection key={i} delay={i * 0.07}>
              <div>
                {/* Placeholder vertical 9:16 */}
                <div
                  className="relative w-full rounded-2xl overflow-hidden border border-white/8 bg-white/[0.02] group"
                  style={{ aspectRatio: "9/16" }}
                >
                  {/* Fondo con gradiente sutil */}
                  <div className="absolute inset-0 bg-gradient-to-b from-neon-green/[0.04] to-neon-purple/[0.04]" />

                  {/* Esquinas decorativas */}
                  <div className="absolute top-3 left-3 w-4 h-4 border-t border-l border-neon-green/40 rounded-tl" />
                  <div className="absolute top-3 right-3 w-4 h-4 border-t border-r border-neon-green/40 rounded-tr" />
                  <div className="absolute bottom-3 left-3 w-4 h-4 border-b border-l border-neon-green/40 rounded-bl" />
                  <div className="absolute bottom-3 right-3 w-4 h-4 border-b border-r border-neon-green/40 rounded-br" />

                  {/* Icono de play */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-neon-green/10 border border-neon-green/30 flex items-center justify-center
                      group-hover:bg-neon-green/20 group-hover:border-neon-green/60 transition-all duration-300
                      group-hover:shadow-[0_0_24px_rgba(0,255,135,0.2)]">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="ml-0.5">
                        <path d="M8 5.14v14l11-7-11-7z" fill="rgba(0,255,135,0.8)" />
                      </svg>
                    </div>
                    <span className="font-display font-semibold text-[11px] tracking-widest uppercase text-neon-green/50">
                      Próximamente
                    </span>
                  </div>

                  {/* Número */}
                  <div className="absolute top-4 left-0 right-0 flex justify-center">
                    <span className="font-display font-bold text-[10px] tracking-[0.3em] uppercase text-white/15">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                </div>

                {/* Label debajo */}
                <div className="mt-3 px-1">
                  <p className="font-display font-semibold text-sm text-cream leading-snug">{clip.label}</p>
                  <p className="font-body text-xs text-muted/50 mt-0.5">{clip.note}</p>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
