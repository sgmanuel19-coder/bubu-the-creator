"use client";

import { SITE } from "@/lib/constants";
import AnimatedSection, { StaggerContainer, StaggerItem } from "./AnimatedSection";

// ─── Cambia a "" para usar foto en lugar de video ───────────────────────────
const ABOUT_VIDEO = "/about-bg.mp4";

const credentials = [
  {
    eyebrow: "Agencias de referencia",
    title: "TBWA + Fahrenheit DDB",
    description: "Dos de las agencias más exigentes del mercado peruano. Donde los errores se pagan caro y el estándar no negocia.",
    stat: "2",
    statLabel: "agencias top",
    color: "green" as const,
  },
  {
    eyebrow: "Marcas de primer nivel",
    title: "BCP · BBVA · Cencosud · Interbank",
    description: "Banca, retail masivo, marcas de consumo. Criterio construido trabajando para los estándares más altos del Perú.",
    stat: "+20",
    statLabel: "marcas",
    color: "purple" as const,
  },
  {
    eyebrow: "Experiencia real",
    title: "6+ años sin margen para el error",
    description: "No en cursos. En proyectos reales, con entregas reales, para clientes que no aceptan mediocridad.",
    stat: "6+",
    statLabel: "años",
    color: "green" as const,
  },
  {
    eyebrow: "Hoy en operación",
    title: "WIN Internet · Livoltek",
    description: "Clientes actuales en sectores de alto valor. La transición ya está en curso — no es un plan, es el presente.",
    stat: "2",
    statLabel: "activos",
    color: "purple" as const,
  },
];

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

        {/* Video / Photo + Bio */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start mb-20">

          {/* ── Left: Video or Photo ── */}
          <AnimatedSection direction="left">
            <div className="relative">
              {/* Glow halo */}
              <div className="absolute -inset-3 rounded-2xl pointer-events-none">
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-neon-green/12 via-transparent to-neon-purple/12 blur-2xl" />
              </div>

              {/* Border wrapper — green→purple gradient */}
              <div className="holo-border holo-border-hover">
                <div className="relative rounded-[calc(1.25rem-1px)] overflow-hidden aspect-[3/4] max-w-sm bg-[#080a0d]">

                  {ABOUT_VIDEO ? (
                    /* ── VIDEO MODE ── */
                    <>
                      <video
                        autoPlay
                        muted
                        loop
                        playsInline
                        preload="auto"
                        className="absolute inset-0 w-full h-full object-cover"
                        style={{ objectPosition: "center top" }}
                      >
                        <source src={ABOUT_VIDEO} type="video/mp4" />
                      </video>
                      {/* Subtle bottom fade */}
                      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#080a0d]/80 to-transparent pointer-events-none" />
                      {/* Subtle tint */}
                      <div className="absolute inset-0 bg-gradient-to-br from-neon-green/6 via-transparent to-neon-purple/8 pointer-events-none" />
                    </>
                  ) : SITE.photos.secondary !== "[FOTO_SECUNDARIA]" ? (
                    /* ── PHOTO MODE ── */
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={SITE.photos.secondary}
                      alt={SITE.visibleName}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    /* ── PLACEHOLDER ── */
                    <div className="w-full h-full flex flex-col items-center justify-center gap-3 p-8 text-center">
                      <div className="w-20 h-20 rounded-full bg-gradient-to-br from-neon-green/20 to-neon-purple/20
                                      border border-neon-green/30 flex items-center justify-center">
                        <span className="text-4xl">👤</span>
                      </div>
                      <p className="text-neon-green font-display font-semibold text-xs tracking-widest uppercase">
                        FOTO_SECUNDARIA
                      </p>
                      <p className="text-muted text-xs">Reemplaza en lib/constants.ts</p>
                    </div>
                  )}

                  {/* HUD corners — green top, purple bottom */}
                  <div className="absolute top-3 left-3 w-6 h-6 border-t-2 border-l-2 border-neon-green/55 rounded-tl pointer-events-none" />
                  <div className="absolute top-3 right-3 w-6 h-6 border-t-2 border-r-2 border-neon-green/40 rounded-tr pointer-events-none" />
                  <div className="absolute bottom-3 left-3 w-6 h-6 border-b-2 border-l-2 border-neon-purple/40 rounded-bl pointer-events-none" />
                  <div className="absolute bottom-3 right-3 w-6 h-6 border-b-2 border-r-2 border-neon-purple/55 rounded-br pointer-events-none" />

                  {/* Scan line sweep animation */}
                  <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-[calc(1.25rem-1px)]">
                    <div className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-neon-green/25 to-transparent"
                      style={{ animation: "scanSweep 6s linear infinite" }} />
                  </div>
                </div>
              </div>
            </div>
          </AnimatedSection>

          {/* ── Right: Bio ── */}
          <div className="space-y-6">
            {SITE.about.bio.map((para, i) => (
              <AnimatedSection key={i} delay={i * 0.12}>
                <p className="font-body text-muted text-base lg:text-lg leading-relaxed">{para}</p>
              </AnimatedSection>
            ))}
          </div>
        </div>

        {/* Credential cards */}
        <AnimatedSection className="mb-5">
          <p className="text-xs font-display font-semibold tracking-[0.3em] uppercase text-neon-green/50 text-center">
            Credenciales
          </p>
        </AnimatedSection>

        <StaggerContainer className="grid sm:grid-cols-2 gap-4">
          {credentials.map((cred, i) => (
            <StaggerItem key={i}>
              <div className="group holo-border holo-border-hover">
                <div className="relative rounded-[calc(1.25rem-1px)] p-7 h-full overflow-hidden"
                  style={{ background: "rgba(8,10,13,0.97)" }}>
                  {/* Hover tint */}
                  <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500
                    ${cred.color === "green"
                      ? "bg-gradient-to-br from-neon-green/8 to-transparent"
                      : "bg-gradient-to-br from-neon-purple/8 to-transparent"
                    }`} />

                  <div className="relative z-10 flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <p className={`text-[10px] font-display font-bold tracking-[0.25em] uppercase mb-2
                        ${cred.color === "green" ? "text-neon-green/60" : "text-neon-purple/60"}`}>
                        {cred.eyebrow}
                      </p>
                      <h3 className="font-display font-bold text-base text-cream mb-3 leading-tight">
                        {cred.title}
                      </h3>
                      <p className="font-body text-muted text-sm leading-relaxed">
                        {cred.description}
                      </p>
                    </div>
                    {/* Big stat */}
                    <div className="shrink-0 text-right">
                      <p className={`font-brand font-bold text-2xl leading-none
                        ${cred.color === "green" ? "text-gradient-green" : "text-gradient"}`}>
                        {cred.stat}
                      </p>
                      <p className="text-[9px] font-display text-muted/60 tracking-widest uppercase mt-1">{cred.statLabel}</p>
                    </div>
                  </div>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>

    </section>
  );
}
