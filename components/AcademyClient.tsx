"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { TextScramble } from "@/components/ui/text-scramble";
import { ShiningText } from "@/components/ui/shining-text";
import { GlowCard } from "@/components/ui/spotlight-card";
import CountUp from "@/components/CountUp";
import TiltCard from "@/components/TiltCard";
import GridBackground from "@/components/ui/grid-background";
import FAQAccordion from "@/components/ui/faq-accordion";

// ─── CONFIG ──────────────────────────────────────────────────────────────────
const WA =
  "https://wa.me/51907462070?text=Hola%2C%20quiero%20info%20sobre%20el%20CONTENT%20IA%20SYSTEM";

// ─── PRIMITIVES ──────────────────────────────────────────────────────────────

function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 40, clipPath: "inset(0 0 100% 0)" }}
      whileInView={{ opacity: 1, y: 0, clipPath: "inset(0 0 0% 0)" }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.85, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
    >
      {children}
    </motion.div>
  );
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-center gap-3 mb-5">
      <span className="w-8 h-px bg-gradient-to-r from-transparent to-neon-green/60" />
      <span className="w-1.5 h-1.5 rounded-full bg-neon-green animate-pulse" />
      <span className="text-[0.7rem] font-display font-semibold tracking-[0.35em] uppercase text-neon-green/80">
        {children}
      </span>
      <span className="w-1.5 h-1.5 rounded-full bg-neon-purple/70 animate-pulse" style={{ animationDelay: "0.5s" }} />
      <span className="w-8 h-px bg-gradient-to-l from-transparent to-neon-purple/60" />
    </div>
  );
}

const brands = ["TBWA", "FAHRENHEIT DDB", "WONG", "BCP", "INTERBANK", "REDONDOS", "SAN FERNANDO", "QUANTICO FILMS", "METRO", "CENCOSUD"];

function Marquee() {
  return (
    <div className="relative overflow-hidden py-6" style={{ maskImage: "linear-gradient(90deg,transparent,#000 12%,#000 88%,transparent)" }}>
      <motion.div
        className="flex gap-12 whitespace-nowrap"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ repeat: Infinity, duration: 28, ease: "linear" }}
      >
        {[...brands, ...brands].map((b, i) => (
          <span key={i} className="font-display font-bold text-base md:text-lg tracking-wider text-cream/30 flex-shrink-0">
            {b}
          </span>
        ))}
      </motion.div>
    </div>
  );
}

// ─── HERO ────────────────────────────────────────────────────────────────────

export function AcademyHero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const yWatermark = useTransform(scrollYProgress, [0, 1], [0, 160]);
  const opacityContent = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section ref={ref} className="relative min-h-[100svh] flex items-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <GridBackground />
        <div className="absolute bottom-0 left-0 right-0 h-56 bg-gradient-to-t from-bg to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-br from-neon-green/5 via-transparent to-neon-purple/8" />
      </div>
      <div className="absolute inset-0 z-[2] pointer-events-none scanlines" />
      <div className="absolute inset-0 z-[2] pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[760px] h-[340px] rounded-full bg-neon-purple/10 blur-[120px]" />
        <div className="absolute bottom-1/4 left-1/4 w-[460px] h-[240px] rounded-full bg-neon-green/8 blur-[90px]" />
      </div>

      <motion.div style={{ y: yWatermark }} className="absolute inset-0 z-[3] flex items-center justify-center pointer-events-none select-none overflow-hidden">
        <span className="font-brand font-black tracking-[0.25em] text-white/[0.022]" style={{ fontSize: "clamp(5rem, 17vw, 17rem)" }}>
          CONTENT IA
        </span>
      </motion.div>

      <motion.div style={{ opacity: opacityContent }} className="relative z-10 w-full max-w-5xl mx-auto px-6 pt-28 pb-16 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
          <Eyebrow>RESUELTO ACADEMY · Programa Premium</Eyebrow>
        </motion.div>

        <h1 className="font-display font-extrabold tracking-tight leading-[0.92] mb-6 drop-shadow-[0_2px_40px_rgba(0,0,0,0.95)]" style={{ fontSize: "clamp(2.5rem, 6.2vw, 6rem)" }}>
          <motion.span className="block text-cream" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.15 }}>
            Dirige la IA como un
          </motion.span>
          <span className="block text-holo mt-1">
            <TextScramble text="Director Creativo" speed={3} delay={400} />
          </span>
        </h1>

        <motion.p className="font-body text-muted text-base md:text-xl max-w-2xl mx-auto mb-3 leading-relaxed" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.5 }}>
          El sistema exacto que uso con marcas grandes para crear contenido publicitario
          cinematográfico con IA — estrategia, guión y producción.
        </motion.p>
        <motion.p className="font-body text-cream/45 text-sm md:text-base max-w-xl mx-auto mb-9" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.65 }}>
          Sin estudio. Sin equipo. Sin agencia. Solo criterio + IA.
        </motion.p>

        <motion.div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-10" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.8 }}>
          <a href={WA} target="_blank" rel="noopener noreferrer" className="btn-glow">
            Postular al programa
          </a>
          <a href="#programa" className="font-display font-semibold text-sm tracking-wide text-cream/65 hover:text-cream transition-colors border-b border-neon-green/30 pb-1">
            Ver el sistema completo ↓
          </a>
        </motion.div>

        <motion.p className="font-body text-[0.7rem] tracking-[0.15em] uppercase text-cream/30" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 1 }}>
          Forjado en TBWA · Fahrenheit DDB · +20 marcas trabajadas
        </motion.p>
      </motion.div>
    </section>
  );
}

// ─── AUTHORITY BAR ───────────────────────────────────────────────────────────

export function AcademyAuthorityBar() {
  return (
    <section className="relative border-y border-white/5" style={{ background: "var(--surface)" }}>
      <div className="max-w-6xl mx-auto px-4 py-4">
        <p className="text-center text-[0.65rem] font-display tracking-[0.25em] uppercase text-cream/30 mb-1">
          El criterio detrás del sistema se forjó trabajando con
        </p>
        <Marquee />
      </div>
    </section>
  );
}

// ─── THE SHIFT (PAS) ─────────────────────────────────────────────────────────

const shifts = [
  { from: "Le pides cosas a la IA y aceptas lo primero", to: "Diriges la IA con criterio estratégico" },
  { from: "Tu contenido se ve bien pero no vende", to: "Cada pieza tiene estrategia, hook y propósito comercial" },
  { from: "Crees que necesitas estudio y equipo", to: "Produces nivel cine tú solo, desde tu compu" },
  { from: "Compites por precio como freelancer", to: "Cobras lo que vale tu trabajo y eliges clientes" },
];

export function AcademyShift() {
  return (
    <section className="relative section-padding overflow-hidden">
      <div className="container-base relative z-10">
        <Reveal className="text-center mb-14">
          <Eyebrow>El cambio</Eyebrow>
          <h2 className="font-display font-bold text-3xl lg:text-5xl tracking-tight">
            La IA no es el problema.
            <br />
            <span className="text-gradient-green">Es cómo la estás usando.</span>
          </h2>
        </Reveal>
        <div className="grid md:grid-cols-2 gap-5 max-w-4xl mx-auto">
          {shifts.map((s, i) => (
            <Reveal key={i} delay={i * 0.08}>
              <GlowCard glowColor="blue" className="p-6 h-full">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-[0.65rem] font-display font-bold tracking-widest uppercase text-cream/30 line-through">Antes</span>
                </div>
                <p className="font-body text-cream/40 text-sm mb-4 line-through">{s.from}</p>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-neon-green text-lg">→</span>
                  <span className="text-[0.65rem] font-display font-bold tracking-widest uppercase text-neon-green">Con el sistema</span>
                </div>
                <p className="font-display font-semibold text-cream text-base leading-snug">{s.to}</p>
              </GlowCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── MECHANISM ───────────────────────────────────────────────────────────────

export function AcademyMechanism() {
  return (
    <section className="relative section-padding overflow-hidden" style={{ background: "var(--surface)" }}>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-neon-green/5 blur-[140px] pointer-events-none" />
      <div className="container-base relative z-10 max-w-4xl text-center">
        <Reveal>
          <Eyebrow>El mecanismo único</Eyebrow>
          <h2 className="font-display font-bold text-3xl lg:text-6xl tracking-tight mb-6 leading-[1.05]">
            El Cerebro Estratégico
            <br />
            <ShiningText text="Creativo con IA" className="font-display font-bold" />
          </h2>
          <p className="font-body text-muted text-base md:text-lg leading-relaxed mb-4">
            Nadie enseña a conceptualizar como director creativo <em>y</em> usar la IA en ese proceso.
            Los demás enseñan herramientas. Aquí construyes el sistema completo de
            <span className="text-cream font-semibold"> pensamiento + producción</span>.
          </p>
          <p className="font-body text-cream/45 text-base">
            Un camino por el que metes cualquier marca y la sacas con contenido que vende.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

// ─── TRANSFORMATION ──────────────────────────────────────────────────────────

const outcomes = [
  { t: "Piensas como director creativo", d: "Miras cualquier marca y sabes qué contenido necesita y por qué." },
  { t: "Tu propio Cerebro Creativo con IA", d: "Una máquina de ideas y producción afinada a tu medida." },
  { t: "Produces nivel cinematográfico", d: "Video e imagen de cine, tú solo, sin estudio ni equipo." },
  { t: "Una pieza real terminada", d: "No un ejercicio: una pieza lista para tu primer cliente." },
  { t: "El sistema para venderlo", d: "Empaquetar, cobrar, pautear, cerrar. De crear a facturar." },
  { t: "Una nueva identidad", d: "Sales siendo un Creativo IA Publicitario, no un usuario de IA." },
];

export function AcademyTransformation() {
  return (
    <section className="relative section-padding overflow-hidden">
      <div className="container-base relative z-10">
        <Reveal className="text-center mb-14">
          <Eyebrow>La transformación</Eyebrow>
          <h2 className="font-display font-bold text-3xl lg:text-5xl tracking-tight">
            Quién entras vs.
            <br />
            <span className="text-holo">quién sales</span>
          </h2>
        </Reveal>
        <div className="grid md:grid-cols-3 gap-5 max-w-5xl mx-auto">
          {outcomes.map((o, i) => (
            <Reveal key={i} delay={(i % 3) * 0.1}>
              <TiltCard intensity={6} className="group h-full">
                <div className="card-base hud-corners p-7 h-full">
                  <span className="font-display font-black text-2xl text-gradient-green block mb-3">0{i + 1}</span>
                  <h3 className="font-display font-bold text-base text-cream mb-2">{o.t}</h3>
                  <p className="font-body text-muted text-sm leading-relaxed">{o.d}</p>
                </div>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── CURRICULUM ──────────────────────────────────────────────────────────────

const modules = [
  { n: "00", t: "Onboarding: Mi Historia y el Criterio", d: "Por qué la creatividad no es un don — y por qué vender también se aprende." },
  { n: "01", t: "La Mentalidad del Director Creativo", d: "Cómo pensar antes de tocar cualquier herramienta." },
  { n: "02", t: "Construir el Cerebro Creativo con IA", d: "El sistema que convierte la IA en tu socio estratégico." },
  { n: "03", t: "Framework Estratégico + Ideación", d: "Insight, Big Idea, concepto y cientos de ideas sin bloquearte." },
  { n: "04", t: "Del Concepto al Guión y Storyboard", d: "Guiones que venden y storyboards que dirigen la producción." },
  { n: "05", t: "Producción Cinematográfica con IA", d: "Higgsfield, Kling, Veo, Seedance, Nano + Hoja de Personaje." },
  { n: "06", t: "Ensamblaje: Edición, Ritmo y Montaje", d: "Tu primera pieza cinematográfica completa, lista para publicar." },
  { n: "07", t: "El Sistema Comercial", d: "Posicionar, cobrar, pautear, landing y cerrar clientes." },
];

export function AcademyCurriculum() {
  return (
    <section id="programa" className="relative section-padding overflow-hidden" style={{ background: "var(--surface)" }}>
      <div className="container-base relative z-10">
        <Reveal className="text-center mb-14">
          <Eyebrow>El programa · 12 semanas</Eyebrow>
          <h2 className="font-display font-bold text-3xl lg:text-5xl tracking-tight mb-4">
            8 módulos. Un sistema completo.
          </h2>
          <p className="font-body text-muted max-w-xl mx-auto">
            Del primer pensamiento estratégico hasta cerrar tu primer cliente.
          </p>
        </Reveal>
        <div className="grid md:grid-cols-2 gap-4 max-w-5xl mx-auto">
          {modules.map((m, i) => (
            <Reveal key={m.n} delay={(i % 2) * 0.08}>
              <GlowCard glowColor={i % 2 === 0 ? "blue" : "purple"} className="p-6 flex gap-5 h-full group">
                <span className="font-display font-black text-3xl text-gradient-green flex-shrink-0 transition-transform group-hover:scale-110">{m.n}</span>
                <div>
                  <h3 className="font-display font-bold text-base text-cream mb-1">{m.t}</h3>
                  <p className="font-body text-muted text-sm leading-relaxed">{m.d}</p>
                </div>
              </GlowCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── PROOF ───────────────────────────────────────────────────────────────────

const metrics = [
  { end: 2500000, suffix: "+", label: "vistas orgánicas/año generadas", fmt: true },
  { end: 20, suffix: "+", label: "marcas en las mejores agencias" },
  { end: 10, suffix: "", label: "años de carrera destilados" },
  { end: 300, suffix: "+", label: "piezas producidas para Wong" },
];

function MetricValue({ end, suffix, fmt }: { end: number; suffix: string; fmt?: boolean }) {
  if (fmt) {
    return <span className="text-gradient-green"><CountUp end={2.5} duration={2} suffix={"M" + suffix} /></span>;
  }
  return <span className="text-gradient"><CountUp end={end} suffix={suffix} /></span>;
}

export function AcademyProof() {
  return (
    <section className="relative section-padding overflow-hidden">
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[420px] h-[320px] rounded-full bg-neon-green/8 blur-[110px] pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[420px] h-[320px] rounded-full bg-neon-purple/10 blur-[110px] pointer-events-none" />
      <div className="container-base relative z-10">
        <Reveal className="text-center mb-12 max-w-3xl mx-auto">
          <Eyebrow>Quién te enseña</Eyebrow>
          <h2 className="font-display font-bold text-3xl lg:text-5xl tracking-tight mb-5">
            Manuel Severo <span className="text-cream/35 font-normal text-2xl lg:text-3xl">· "Bubu"</span>
          </h2>
          <p className="font-body text-muted text-base lg:text-lg leading-relaxed">
            Director Creativo y fundador de Resuelto. Empecé editando a los 12 años. Pasé por
            Fahrenheit DDB, Quantico Films y TBWA Perú — premiado por marcas como Wong, BCP y
            Redondos. La IA no es mi punto de partida: es la herramienta que sumé a más de 10 años
            de criterio en las grandes ligas.
          </p>
        </Reveal>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 max-w-4xl mx-auto">
          {metrics.map((m, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <div className="card-base hud-corners p-7 text-center h-full">
                <p className="font-display font-bold mb-2" style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)" }}>
                  <MetricValue end={m.end} suffix={m.suffix} fmt={m.fmt} />
                </p>
                <p className="text-sm font-body text-muted leading-snug">{m.label}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── VALUE STACK ─────────────────────────────────────────────────────────────

const stack = [
  { t: "7 módulos grabados + acceso de por vida", v: "$1,200" },
  { t: "Sesiones en vivo 2×/semana · 12 semanas", v: "$1,500" },
  { t: "Banco de prompts y GPTs cinematográficos", v: "$297" },
  { t: "Plantillas: brief, storyboard, guión de venta", v: "$197" },
  { t: "Propuesta comercial lista para vender", v: "$197" },
  { t: "Comunidad privada + feedback de tu contenido", v: "$300" },
];

export function AcademyValueStack() {
  return (
    <section className="relative section-padding overflow-hidden" style={{ background: "var(--surface)" }}>
      <div className="container-base relative z-10 max-w-3xl">
        <Reveal className="text-center mb-12">
          <Eyebrow>Todo lo que recibes</Eyebrow>
          <h2 className="font-display font-bold text-3xl lg:text-5xl tracking-tight">
            Más de <span className="text-gradient-green">$3,600</span> en valor
          </h2>
        </Reveal>
        <div className="flex flex-col gap-3 mb-8">
          {stack.map((s, i) => (
            <Reveal key={i} delay={i * 0.06}>
              <div className="flex items-center justify-between gap-4 card-base p-4">
                <div className="flex items-center gap-3">
                  <span className="text-neon-green flex-shrink-0">✓</span>
                  <p className="font-body text-cream/85 text-sm md:text-base">{s.t}</p>
                </div>
                <span className="font-display font-bold text-cream/40 text-sm line-through flex-shrink-0">{s.v}</span>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal>
          <div className="text-center card-base hud-corners p-6">
            <p className="font-body text-cream/50 text-sm mb-1">Tu inversión hoy</p>
            <p className="font-display font-black text-5xl text-holo">$1,500</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ─── PRICING ─────────────────────────────────────────────────────────────────

const tiers = [
  { name: "Mini Curso", price: "$97", tagline: "Prueba el sistema", features: ["Un módulo completo del sistema", "Acceso de por vida", "Punto de entrada sin riesgo"], featured: false },
  { name: "Programa Completo", price: "$1,500", tagline: "Grabaciones + clases en vivo · 3 meses", features: ["7 módulos + acceso de por vida", "Sesiones en vivo 2×/semana · 12 sem", "Feedback en comunidad privada", "Los 3 bonos completos", "Garantía hasta lograr tu objetivo"], featured: true },
  { name: "Solo Grabaciones", price: "$850", tagline: "Acceso 3 meses al programa grabado", features: ["7 módulos grabados", "Plantillas y banco de prompts", "A tu propio ritmo"], featured: false },
];

export function AcademyPricing() {
  return (
    <section id="precio" className="relative section-padding overflow-hidden">
      <div className="container-base relative z-10">
        <Reveal className="text-center mb-14">
          <Eyebrow>Inversión</Eyebrow>
          <h2 className="font-display font-bold text-3xl lg:text-5xl tracking-tight">Elige tu nivel de acceso</h2>
        </Reveal>
        <div className="grid md:grid-cols-3 gap-5 max-w-5xl mx-auto items-stretch">
          {tiers.map((t, i) => (
            <Reveal key={t.name} delay={i * 0.1}>
              <motion.div
                whileHover={{ y: -6 }}
                transition={{ type: "spring", stiffness: 300, damping: 22 }}
                className={`card-base p-8 flex flex-col relative h-full ${t.featured ? "hud-corners" : ""}`}
                style={t.featured ? { borderColor: "rgba(26,128,255,0.45)", boxShadow: "0 0 60px rgba(26,128,255,0.15)" } : {}}
              >
                {t.featured && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-[0.6rem] font-display font-bold tracking-widest uppercase px-3 py-1 rounded-full text-bg" style={{ background: "linear-gradient(135deg,#1A80FF,#4D9FFF)" }}>
                    Más elegido
                  </span>
                )}
                <h3 className="font-display font-bold text-lg text-cream mb-1">{t.name}</h3>
                <p className="font-body text-muted text-xs mb-5">{t.tagline}</p>
                <p className="font-display font-black text-5xl mb-6 text-gradient-green">{t.price}</p>
                <ul className="flex flex-col gap-3 mb-8 flex-1">
                  {t.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 font-body text-sm text-cream/80">
                      <span className="text-neon-green flex-shrink-0 mt-0.5">✓</span> {f}
                    </li>
                  ))}
                </ul>
                <a
                  href={WA}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={t.featured ? "btn-glow w-full" : "font-display font-semibold text-sm tracking-wide text-center py-3 rounded-full border border-neon-green/30 text-cream/80 hover:border-neon-green/60 hover:text-cream transition-colors"}
                >
                  {t.featured ? "Postular ahora" : "Más info"}
                </a>
              </motion.div>
            </Reveal>
          ))}
        </div>
        <Reveal className="text-center mt-8">
          <p className="font-body text-cream/40 text-sm">
            🛡️ Garantía: si no logras aplicar el sistema, te quedas en el programa hasta completar tu objetivo.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

// ─── FOR WHO ─────────────────────────────────────────────────────────────────

const forYes = [
  "Freelancers y creativos que quieren cobrar lo que valen",
  "Dueños de negocio cansados de pagar por contenido que no vende",
  "Emprendedores que saben que la IA es el futuro",
  "Quienes quieren construir su marca personal con autoridad",
];
const forNo = [
  "Quien busca un botón mágico sin esfuerzo",
  "Quien quiere resultados sin aplicar nada",
  "Quien solo ve y no hace los entregables",
];

export function AcademyForWho() {
  return (
    <section className="relative section-padding overflow-hidden" style={{ background: "var(--surface)" }}>
      <div className="container-base relative z-10 max-w-4xl">
        <Reveal className="text-center mb-12">
          <Eyebrow>Filtro de admisión</Eyebrow>
          <h2 className="font-display font-bold text-3xl lg:text-5xl tracking-tight">¿Esto es para ti?</h2>
        </Reveal>
        <div className="grid md:grid-cols-2 gap-5">
          <Reveal>
            <div className="card-base p-7 h-full">
              <p className="font-display font-bold text-neon-green text-sm tracking-widest uppercase mb-5">Sí, si eres…</p>
              <ul className="flex flex-col gap-3">
                {forYes.map((f) => (
                  <li key={f} className="flex items-start gap-3 font-body text-cream/80 text-sm">
                    <span className="text-neon-green flex-shrink-0 mt-0.5">✓</span> {f}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="card-base p-7 h-full" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
              <p className="font-display font-bold text-cream/40 text-sm tracking-widest uppercase mb-5">No, si buscas…</p>
              <ul className="flex flex-col gap-3">
                {forNo.map((f) => (
                  <li key={f} className="flex items-start gap-3 font-body text-cream/45 text-sm">
                    <span className="text-cream/30 flex-shrink-0 mt-0.5">✕</span> {f}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

// ─── FAQ ─────────────────────────────────────────────────────────────────────

const faqItems: { question: string; answer: React.ReactNode }[] = [
  { question: "¿Necesito experiencia previa en diseño o video?", answer: <>No. El sistema está hecho para que alguien que nunca ha producido contenido profesional cree piezas de nivel cinematográfico. Si ya tienes experiencia, llegas más lejos más rápido.</> },
  { question: "¿Necesito saber programar?", answer: <>Para nada. Te enseño a usar las herramientas de IA y a crear hasta tu landing page sin escribir una línea de código.</> },
  { question: "¿Qué herramientas voy a usar?", answer: <>El stack del sistema: ChatGPT, Nano/Banana Pro, Higgsfield, Kling 3.0, Veo 3 y Seedance 2.0. Te enseño las bases de cada una y, sobre todo, el criterio para dirigirlas.</> },
  { question: "¿Cuánto tiempo necesito por semana?", answer: <>Con 5-8 horas semanales sigues el ritmo. Las clases grabadas las ves a tu ritmo y las sesiones en vivo son de 2 horas.</> },
  { question: "¿En qué se diferencia de otros cursos de IA?", answer: <>Otros te enseñan la herramienta. Yo te enseño el criterio de un director creativo que trabajó en las mejores agencias del mundo, y cómo se potencia con IA. Esa combinación casi nadie la tiene.</> },
  { question: "¿Puedo recuperar la inversión?", answer: <>Un solo cliente de servicio con este sistema cubre varias veces la inversión del programa. Te enseño exactamente cómo conseguir ese primer cliente.</> },
];

export function AcademyFAQ() {
  return (
    <section className="relative section-padding overflow-hidden">
      <div className="container-base relative z-10 max-w-3xl">
        <Reveal className="text-center mb-14">
          <Eyebrow>Preguntas frecuentes</Eyebrow>
          <h2 className="font-display font-bold text-3xl lg:text-4xl tracking-tight">Lo que suelen preguntar</h2>
        </Reveal>
        <Reveal>
          <FAQAccordion items={faqItems} />
        </Reveal>
        <div className="text-center mt-8">
          <a href={WA} target="_blank" rel="noopener noreferrer" className="font-display font-semibold text-sm text-neon-green border-b border-neon-green/35 pb-0.5">
            ¿Otra pregunta? Escríbeme por WhatsApp →
          </a>
        </div>
      </div>
    </section>
  );
}

// ─── FINAL CTA ───────────────────────────────────────────────────────────────

export function AcademyFinalCTA() {
  return (
    <section className="relative section-padding overflow-hidden">
      <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(26,128,255,0.1) 0%, transparent 70%)" }} />
      <div className="absolute inset-0 z-0 opacity-40"><GridBackground /></div>
      <div className="container-base relative z-10 max-w-3xl text-center">
        <Reveal>
          <h2 className="font-display font-extrabold text-3xl lg:text-6xl tracking-tight mb-6 leading-[1.05]">
            El contenido con IA
            <br />
            <span className="text-holo">ya es el presente</span>
          </h2>
          <p className="font-body text-muted text-base md:text-lg mb-4 max-w-xl mx-auto">
            La pregunta es de qué lado vas a estar: de los que aprietan botones sin criterio,
            o de los que dirigen la IA como profesionales.
          </p>
          <p className="font-display font-semibold text-cream text-base mb-9">Cupos limitados por cohorte.</p>
          <a href={WA} target="_blank" rel="noopener noreferrer" className="btn-glow">
            Postular al CONTENT IA SYSTEM
          </a>
          <p className="font-body text-cream/30 text-xs mt-6">Sin compromiso · Solo una conversación para ver si calificas.</p>
        </Reveal>
      </div>
    </section>
  );
}
