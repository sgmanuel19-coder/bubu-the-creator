"use client";

import { motion } from "framer-motion";
import { SITE } from "@/lib/constants";
import AnimatedSection from "./AnimatedSection";

const profiles = [
  {
    icon: "⚙️",
    title: "Empresas técnicas o industriales",
    description: "Necesitan que un cliente no técnico entienda y confíe en lo que hacen.",
    tag: "B2B · Industrial",
    color: "green",
  },
  {
    icon: "🏢",
    title: "Inmobiliarias y desarrolladores",
    description: "La venta requiere proceso, confianza y presencia seria antes del cierre.",
    tag: "Real Estate",
    color: "purple",
  },
  {
    icon: "⚡",
    title: "Energía e ingeniería",
    description: "Sectores que no saben cómo comunicar autoridad técnica sin perder al cliente.",
    tag: "Energía · Ingeniería",
    color: "green",
  },
  {
    icon: "🎯",
    title: "Expertos y consultores",
    description: "Tienen una metodología valiosa que no se ve a la altura en digital.",
    tag: "Consultoría · Coaching",
    color: "purple",
  },
  {
    icon: "💎",
    title: "Negocios de alto ticket",
    description: "El cierre depende de cómo te perciben antes de la llamada.",
    tag: "High Ticket · Premium",
    color: "green",
  },
  {
    icon: "🚀",
    title: "Marcas personales serias",
    description: "Quieren posicionarse con criterio, no con ruido ni contenido genérico.",
    tag: "Personal Brand",
    color: "purple",
  },
];

export default function ForWho() {
  return (
    <section className="relative section-padding overflow-hidden">
      {/* Background glows */}
      <div className="absolute top-1/3 left-0 w-[400px] h-[400px] rounded-full bg-neon-green/5 blur-[90px] pointer-events-none" />
      <div className="absolute bottom-1/3 right-0 w-[400px] h-[400px] rounded-full bg-neon-purple/5 blur-[90px] pointer-events-none" />

      <div className="container-base relative z-10">

        {/* ── Header ── */}
        <AnimatedSection className="text-center mb-16">
          <span className="inline-flex items-center gap-2 text-xs font-display font-semibold tracking-[0.2em] uppercase text-neon-green mb-4">
            <span className="w-6 h-px bg-neon-green/50" />
            Para quién es
            <span className="w-6 h-px bg-neon-green/50" />
          </span>
          <h2 className="font-display font-bold text-3xl lg:text-5xl tracking-tight mb-5">
            {SITE.forWho.title}
          </h2>
          <p className="font-body text-muted text-base lg:text-lg leading-relaxed max-w-2xl mx-auto">
            {SITE.forWho.intro}
          </p>
        </AnimatedSection>

        {/* ── Profile grid — visually rich ── */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-16">
          {profiles.map((profile, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.55, delay: i * 0.09, ease: [0.21, 0.47, 0.32, 0.98] }}
            >
              <div className={`group relative rounded-2xl p-7 h-full overflow-hidden cursor-default
                              border transition-all duration-400
                              card-shimmer hud-corners
                              ${profile.color === "green"
                                ? "border-neon-green/12 hover:border-neon-green/40 hover:bg-neon-green/[0.04] hover:shadow-lg hover:shadow-neon-green/10"
                                : "border-neon-purple/12 hover:border-neon-purple/40 hover:bg-neon-purple/[0.04] hover:shadow-lg hover:shadow-neon-purple/10"
                              }`}
                style={{ background: "rgba(8,10,13,0.7)" }}>

                {/* Gradient sweep on hover */}
                <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl
                  ${profile.color === "green"
                    ? "bg-gradient-to-br from-neon-green/6 via-transparent to-transparent"
                    : "bg-gradient-to-br from-neon-purple/6 via-transparent to-transparent"
                  }`} />

                {/* Top row: icon + tag */}
                <div className="relative z-10 flex items-start justify-between mb-5">
                  {/* Icon box */}
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl
                                   border transition-all duration-300
                                   ${profile.color === "green"
                                     ? "bg-neon-green/10 border-neon-green/25 group-hover:border-neon-green/50 group-hover:bg-neon-green/15"
                                     : "bg-neon-purple/10 border-neon-purple/25 group-hover:border-neon-purple/50 group-hover:bg-neon-purple/15"
                                   }`}>
                    {profile.icon}
                  </div>

                  {/* Tag pill */}
                  <span className={`px-2.5 py-1 rounded-full text-[10px] font-display font-bold tracking-wider uppercase border
                    ${profile.color === "green"
                      ? "bg-neon-green/8 border-neon-green/20 text-neon-green/70"
                      : "bg-neon-purple/8 border-neon-purple/20 text-neon-purple/70"
                    }`}>
                    {profile.tag}
                  </span>
                </div>

                {/* Number */}
                <div className={`relative z-10 text-[10px] font-display font-bold tracking-[0.3em] uppercase mb-3
                  ${profile.color === "green" ? "text-neon-green/40" : "text-neon-purple/40"}`}>
                  0{i + 1}
                </div>

                {/* Title */}
                <h3 className="relative z-10 font-display font-bold text-base text-cream mb-3 leading-snug group-hover:text-white transition-colors">
                  {profile.title}
                </h3>

                {/* Description */}
                <p className="relative z-10 font-body text-muted text-sm leading-relaxed group-hover:text-cream/75 transition-colors">
                  {profile.description}
                </p>

                {/* Bottom accent line */}
                <div className={`absolute bottom-0 left-0 h-px w-0 group-hover:w-full transition-all duration-500
                  ${profile.color === "green"
                    ? "bg-gradient-to-r from-neon-green/60 to-transparent"
                    : "bg-gradient-to-r from-neon-purple/60 to-transparent"
                  }`} />
              </div>
            </motion.div>
          ))}
        </div>

        {/* ── Closing statement ── */}
        <AnimatedSection delay={0.3}>
          <div className="relative rounded-2xl overflow-hidden max-w-3xl mx-auto">
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-r from-neon-green/8 via-bg to-neon-purple/8" />
            <div className="absolute inset-0 grid-pattern opacity-30" />
            {/* Borders */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-neon-green/40 via-transparent to-neon-purple/40" />
            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-neon-purple/40 via-transparent to-neon-green/40" />

            <div className="relative z-10 p-8 lg:p-10 text-center">
              {/* Pill */}
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6
                              bg-bg/80 border border-neon-green/20 backdrop-blur-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-neon-green animate-pulse" />
                <span className="text-xs font-display font-semibold text-neon-green tracking-[0.2em] uppercase">
                  El criterio unificador
                </span>
              </div>

              <p className="font-body text-cream/90 text-base lg:text-xl leading-relaxed font-medium">
                {SITE.forWho.closing}
              </p>
            </div>
          </div>
        </AnimatedSection>

      </div>
    </section>
  );
}
