"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { TextScramble } from "@/components/ui/text-scramble";
import { ShiningText } from "@/components/ui/shining-text";
import { GlowCard } from "@/components/ui/spotlight-card";
import GridBackground from "@/components/ui/grid-background";
import FAQAccordion from "@/components/ui/faq-accordion";

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
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.8, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
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
      <span
        className="w-1.5 h-1.5 rounded-full bg-neon-purple/70 animate-pulse"
        style={{ animationDelay: "0.5s" }}
      />
      <span className="w-8 h-px bg-gradient-to-l from-transparent to-neon-purple/60" />
    </div>
  );
}

function SectionNum({ n }: { n: string }) {
  return (
    <span className="font-display font-bold text-[0.65rem] tracking-[0.3em] text-cream/18 hidden md:block">
      {n}
    </span>
  );
}

const brands = [
  "WIN INTERNET",
  "WELLMAX",
  "LIVOLTEK",
  "TBWA",
  "FAHRENHEIT DDB",
  "WONG",
  "BCP",
  "INTERBANK",
  "REDONDOS",
  "SAN FERNANDO",
  "QUANTICO FILMS",
  "METRO",
];

function Marquee() {
  return (
    <div
      className="relative overflow-hidden py-6"
      style={{
        maskImage:
          "linear-gradient(90deg,transparent,#000 12%,#000 88%,transparent)",
      }}
    >
      <motion.div
        className="flex gap-12 whitespace-nowrap"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ repeat: Infinity, duration: 28, ease: "linear" }}
      >
        {[...brands, ...brands].map((b, i) => (
          <span
            key={i}
            className="font-display font-bold text-base md:text-lg tracking-wider text-cream/30 flex-shrink-0"
          >
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
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const yWatermark = useTransform(scrollYProgress, [0, 1], [0, 160]);
  const opacityContent = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative min-h-[100svh] flex items-center overflow-hidden"
    >
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 opacity-60">
          <GridBackground />
        </div>
        <motion.div
          className="absolute top-[10%] left-1/2 -translate-x-1/2 w-[820px] h-[420px] rounded-full pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, rgba(26,128,255,0.20) 0%, transparent 70%)",
            filter: "blur(90px)",
          }}
          animate={{ x: [-40, 40, -40], y: [0, 30, 0], scale: [1, 1.08, 1] }}
          transition={{ repeat: Infinity, duration: 16, ease: "easeInOut" }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 75% 65% at 50% 45%, transparent 0%, rgba(6,6,8,0.55) 100%)",
          }}
        />
        <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-bg via-bg/70 to-transparent" />
      </div>
      <div className="absolute inset-0 z-[2] pointer-events-none scanlines opacity-30" />

      <motion.div
        style={{ y: yWatermark }}
        className="absolute inset-0 z-[3] flex items-center justify-center pointer-events-none select-none overflow-hidden"
      >
        <span
          className="font-brand font-black tracking-[0.25em] text-white/[0.022]"
          style={{ fontSize: "clamp(5rem, 17vw, 17rem)" }}
        >
          CONTENT IA
        </span>
      </motion.div>

      <motion.div
        style={{ opacity: opacityContent }}
        className="relative z-10 w-full max-w-5xl mx-auto px-6 pt-28 pb-16 text-center"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <Eyebrow>Resuelto Academy · Programa Insignia</Eyebrow>
        </motion.div>

        <h1
          className="font-display font-extrabold tracking-tight leading-[0.92] mb-6 drop-shadow-[0_2px_40px_rgba(0,0,0,0.95)]"
          style={{ fontSize: "clamp(2.5rem, 6.2vw, 6rem)" }}
        >
          <motion.span
            className="block text-cream"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15 }}
          >
            CONTENT IA
          </motion.span>
          <span className="block text-holo">
            <TextScramble text="SYSTEM" speed={3} delay={400} />
          </span>
          <motion.span
            className="block font-medium text-cream/55 mt-4"
            style={{
              fontSize: "clamp(0.9rem, 1.7vw, 1.2rem)",
              letterSpacing: "0.02em",
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            El sistema completo de dirección creativa con IA
          </motion.span>
        </h1>

        <motion.p
          className="font-body text-muted text-base md:text-xl max-w-2xl mx-auto mb-9 leading-relaxed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          En <strong className="text-cream">12 semanas</strong> tendrás el
          sistema completo que usan las agencias para crear contenido comercial
          con IA —con estrategia, guión y producción— listo para aplicarlo en tu
          negocio o <strong className="text-cream">cobrárselo a clientes</strong>.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.8 }}
        >
          <a
            href={WA}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-glow"
          >
            Reservar mi lugar →
          </a>
          <a
            href="#programa"
            className="font-display font-semibold text-sm tracking-wide text-cream/65 hover:text-cream transition-colors border-b border-neon-green/30 pb-1"
          >
            Ver el programa completo ↓
          </a>
        </motion.div>

        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 max-w-2xl mx-auto rounded-lg overflow-hidden border border-white/8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.95 }}
        >
          {[
            { n: "7", l: "Módulos\ncompletos" },
            { n: "12", l: "Semanas\nen vivo" },
            { n: "2×", l: "Sesiones en vivo\npor semana" },
            { n: "∞", l: "Acceso\nde por vida" },
          ].map((s, i) => (
            <div
              key={i}
              className="text-center py-7 px-3 border-r border-white/8 last:border-r-0"
            >
              <div
                className="font-display font-bold text-cream mb-2"
                style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.4rem)" }}
              >
                {s.n}
              </div>
              <div className="text-[0.6rem] font-display font-medium tracking-widest uppercase text-cream/40 leading-tight whitespace-pre-line">
                {s.l}
              </div>
            </div>
          ))}
        </motion.div>

        <motion.p
          className="font-body text-[0.7rem] tracking-[0.15em] uppercase text-cream/30 mt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          Con Manuel Severo (Bubu) · Creativo Estratega · IA Content Director ·
          Founder, Resuelto Agency
        </motion.p>
      </motion.div>
    </section>
  );
}

// ─── AUTHORITY BAR ───────────────────────────────────────────────────────────

export function AcademyAuthorityBar() {
  return (
    <section
      className="relative border-y border-white/5"
      style={{ background: "var(--surface)" }}
    >
      <div className="max-w-6xl mx-auto px-4 py-4">
        <p className="text-center text-[0.65rem] font-display tracking-[0.25em] uppercase text-cream/30 mb-1">
          El criterio detrás del sistema se forjó trabajando con
        </p>
        <Marquee />
      </div>
    </section>
  );
}

// ─── BIO + TRAYECTORIA ───────────────────────────────────────────────────────

const trayectoria = [
  {
    co: "Fahrenheit DDB",
    yr: "2020–2021",
    role: "Creativo Trainee",
    res: "Plaza Vea, Promart, Real Plaza, BBVA, Pilsen, San Fernando. Primer guion profesional. Primera campaña en TV.",
  },
  {
    co: "Quantico Films",
    yr: "2021–2022",
    role: "Content Creator Jr",
    res: "Interbank, BCP, Guaraná, María Pía Copello, Joanna Boloña. Estándar real de la industria audiovisual desde adentro.",
  },
  {
    co: "Darma Marketing",
    yr: "2022–2023",
    role: "Content Creator Sr",
    res: "+15 marcas inmobiliarias. Primer equipo creativo propio. Cuadruplicó la adquisición de clientes de la agencia.",
  },
  {
    co: "TBWA Perú",
    yr: "2023–2025",
    role: "Creative Content Sr",
    res: "Wong Cencosud, Redondos, Tarjeta iO BCP, Costa, Cafetal, Metro. Premiado múltiples veces por campañas que funcionaron.",
  },
  {
    co: "Win Internet",
    yr: "2023–actualidad",
    role: "Content Leader",
    res: "+2.5 millones de vistas orgánicas al año. +99 piezas con consistencia editorial. Win convertida en autoridad digital.",
  },
  {
    co: "Resuelto Agency",
    yr: "2025–actualidad",
    role: "Creative Founder · IA Content Strategist",
    res: "Clientes: Wellmax, Livoltek, Win Internet. Automatización audiovisual con IA. Metodología StorySelling Pro.",
  },
];

export function AcademyBio() {
  return (
    <section
      className="relative section-padding overflow-hidden"
      style={{ background: "var(--surface)" }}
    >
      <div className="container-base relative z-10">
        <Reveal className="mb-14">
          <div className="flex items-end justify-between gap-4 flex-wrap">
            <div className="flex-1 text-center">
              <Eyebrow>Quién está detrás</Eyebrow>
              <h2 className="font-display font-bold text-3xl lg:text-5xl tracking-tight">
                Quién es
                <br />
                Manuel Severo
              </h2>
            </div>
            <SectionNum n="01 / 09" />
          </div>
        </Reveal>

        <div className="grid md:grid-cols-[1fr_1.4fr] gap-10 md:gap-16 mb-16 items-start">
          <Reveal>
            <div
              className="card-base aspect-[4/5] flex items-center justify-center relative overflow-hidden"
              style={{ minHeight: 280 }}
            >
              <div
                className="absolute inset-0 opacity-20"
                style={{
                  backgroundImage:
                    "repeating-linear-gradient(135deg, rgba(255,255,255,0.04) 0 11px, rgba(255,255,255,0.01) 11px 22px)",
                }}
              />
              <div className="text-center z-10 px-4">
                <span className="font-display text-[0.6rem] tracking-[0.2em] uppercase text-cream/25 border border-white/10 px-3 py-1 rounded inline-block mb-5">
                  Foto
                </span>
                <p className="font-body text-cream/25 text-sm">
                  retrato de Manuel
                  <br />
                  —— Bubu ——
                </p>
              </div>
            </div>
            <div className="mt-4">
              <p className="font-display font-semibold text-neon-green/75 text-sm tracking-wider">
                Manuel Severo · «Bubu»
              </p>
              <p className="font-body text-cream/35 text-xs tracking-widest uppercase mt-1">
                27 años · Lima, Perú
              </p>
            </div>
          </Reveal>

          <div>
            <Reveal>
              <p className="font-body text-muted text-base leading-relaxed mb-4">
                Soy Manuel Severo —aunque mis clientes, que con el tiempo se
                vuelven amigos, me dicen <strong className="text-cream">Bubu</strong>.
                Tengo 27 años, soy de Lima, Perú, y llevo haciendo contenido desde
                los 12 años. Lo que para casi todo el mundo hoy es «una
                herramienta nueva», para mí es algo que vengo construyendo
                prácticamente toda mi vida.
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="font-body text-muted text-base leading-relaxed mb-8">
                Pasé por las mejores agencias y productoras del país, fui
                premiado, lideré equipos creativos y construí mi propia agencia
                con clientes reales.{" "}
                <strong className="text-cream">
                  La IA no es mi punto de partida —es la herramienta que sumé a
                  más de quince años de criterio.
                </strong>
              </p>
            </Reveal>
            <Reveal delay={0.15}>
              <blockquote className="border-l-2 border-neon-green/35 pl-6">
                <p className="font-display font-medium text-cream text-base md:text-lg leading-snug">
                  «La mayoría aprendió IA la semana pasada y ya está dando cursos.
                  Yo llevo haciendo contenido desde los doce años, pasé por las
                  mejores agencias del país, fui premiado y construí mi propia
                  agencia. La IA no es mi punto de partida —es la herramienta que
                  sumé a quince años de criterio.»
                </p>
                <cite className="block mt-4 font-display font-bold text-[0.7rem] tracking-widest uppercase text-cream/35 not-italic">
                  — Manuel Severo
                </cite>
              </blockquote>
            </Reveal>
          </div>
        </div>

        <Reveal>
          <h3 className="font-display font-bold text-xl md:text-2xl text-cream mb-6 tracking-tight">
            Trayectoria profesional
          </h3>
        </Reveal>
        <div className="border-t border-white/8">
          {trayectoria.map((t, i) => (
            <Reveal key={i} delay={(i % 3) * 0.05}>
              <div className="grid grid-cols-1 md:grid-cols-[1.1fr_1fr_1.8fr] gap-2 md:gap-6 py-5 border-b border-white/6 hover:bg-white/[0.015] transition-colors px-1 rounded">
                <div>
                  <span className="font-display font-bold text-cream text-sm md:text-base">
                    {t.co}
                  </span>
                  <span className="block text-[0.68rem] font-body text-cream/35 tracking-wide mt-1">
                    {t.yr}
                  </span>
                </div>
                <div className="font-display font-semibold text-xs md:text-sm text-neon-green/65 self-center">
                  {t.role}
                </div>
                <div className="font-body text-sm text-cream/50 leading-relaxed self-center">
                  {t.res}
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-12 max-w-3xl">
          <div className="font-body text-muted text-base leading-relaxed">
            Otros te enseñan herramientas.{" "}
            <strong className="text-cream">
              Yo te enseño el criterio de un director creativo que sí trabajó en
              las grandes ligas
            </strong>
            , y cómo ese criterio se potencia con IA. Esa combinación
            —experiencia real de agencia más dominio de IA— casi nadie la tiene.
            Y es exactamente lo que vuelve este sistema diferente.
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ─── STATEMENT ───────────────────────────────────────────────────────────────

export function AcademyStatement() {
  return (
    <section className="relative section-padding overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 55% 45% at 50% 50%, rgba(26,128,255,0.05) 0%, transparent 70%)",
        }}
      />
      <div className="container-base relative z-10 text-center max-w-4xl">
        <Reveal>
          <p
            className="font-display font-bold text-cream leading-[1.2]"
            style={{ fontSize: "clamp(1.6rem, 4vw, 3rem)" }}
          >
            No te voy a enseñar teoría que leí.
            <br />
            Te voy a enseñar{" "}
            <span className="text-gradient-green">
              lo que hago todos los días
            </span>{" "}
            con marcas que pagan por resultados.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

// ─── CASES ───────────────────────────────────────────────────────────────────

const cases = [
  {
    brand: "WIN Internet",
    tag: "Reel",
    nums: [
      "+2.5 millones de vistas orgánicas al año",
      "+99 piezas con consistencia editorial",
    ],
    ctx: "En un mercado saturado y técnico, donde la gente desconfía, construimos autoridad digital con un sistema editorial coherente.",
  },
  {
    brand: "WONG Cencosud",
    tag: "Campaña",
    nums: [
      "+300 piezas producidas",
      "Millones de vistas impulsadas por pauta",
    ],
    ctx: "Uno de los supermercados más importantes del país, con estándar de calidad premium en cada entrega.",
  },
  {
    brand: "REDONDOS",
    tag: "Campaña",
    nums: [
      "+150,000 vistas y +5,000 comentarios en 24 h",
      "+2.5M vistas acumuladas en la campaña",
    ],
    ctx: "Para su campaña de Navidad integramos al medallista olímpico Stefano y disparamos la conversación social.",
  },
  {
    brand: "LIVOLTEK",
    tag: "B2B",
    nums: [
      "Autoridad técnica B2B internacional",
      "Activo corporativo frente a partners globales",
    ],
    ctx: "Una marca técnica de energía. Elevamos su comunicación al nivel de las grandes marcas globales del sector.",
  },
];

export function AcademyCases() {
  return (
    <section className="relative section-padding overflow-hidden">
      <div className="container-base relative z-10">
        <Reveal className="mb-14">
          <div className="flex items-end justify-between gap-4 flex-wrap">
            <div className="flex-1 text-center">
              <Eyebrow>Resultados reales — no teoría</Eyebrow>
              <h2 className="font-display font-bold text-3xl lg:text-5xl tracking-tight">
                Casos donde apliqué
                <br />
                exactamente este sistema
              </h2>
            </div>
            <SectionNum n="02 / 09" />
          </div>
        </Reveal>
        <div className="grid md:grid-cols-2 gap-5 max-w-5xl mx-auto">
          {cases.map((c, i) => (
            <Reveal key={i} delay={(i % 2) * 0.1}>
              <GlowCard
                glowColor={i % 2 === 0 ? "blue" : "purple"}
                className="overflow-hidden h-full flex flex-col"
              >
                <div className="aspect-video flex items-center justify-center relative border-b border-white/8 bg-gradient-to-br from-white/[0.03] to-transparent">
                  <span className="absolute top-3 left-3 font-display font-bold text-[0.6rem] tracking-widest uppercase text-cream/30 border border-white/10 px-2 py-1 rounded">
                    {c.tag}
                  </span>
                  <span className="font-body text-cream/18 text-sm">
                    {c.brand.toLowerCase()} · placeholder
                  </span>
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <span className="font-display font-bold text-[0.68rem] tracking-widest uppercase text-neon-green/70 mb-4">
                    {c.brand}
                  </span>
                  <ul className="mb-4 flex flex-col gap-2.5">
                    {c.nums.map((n, j) => (
                      <li
                        key={j}
                        className="flex items-start gap-3 font-display font-bold text-cream text-sm leading-snug"
                      >
                        <span className="w-2 h-2 bg-neon-green/60 rotate-45 flex-shrink-0 mt-1.5" />
                        {n}
                      </li>
                    ))}
                  </ul>
                  <p className="font-body text-sm text-cream/50 leading-relaxed mt-auto">
                    {c.ctx}
                  </p>
                </div>
              </GlowCard>
            </Reveal>
          ))}
        </div>
        <Reveal className="mt-10 max-w-3xl mx-auto">
          <p className="font-body text-muted text-base text-center leading-relaxed">
            ¿Qué tienen en común todos estos casos? No son contenido bonito sin
            propósito. Son{" "}
            <strong className="text-cream">
              sistemas de contenido con estrategia, criterio y producción de nivel
            </strong>
            . Todos siguen la misma metodología que vas a aprender.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

// ─── THE SHIFT (PAS) ─────────────────────────────────────────────────────────

const shifts = [
  {
    from: "Le pides cosas a la IA y aceptas lo primero",
    to: "Diriges la IA con criterio estratégico",
  },
  {
    from: "Tu contenido se ve bien pero no vende",
    to: "Cada pieza tiene estrategia, hook y propósito comercial",
  },
  {
    from: "Crees que necesitas estudio y equipo",
    to: "Produces nivel cine tú solo, desde tu compu",
  },
  {
    from: "Compites por precio como freelancer",
    to: "Cobras lo que vale tu trabajo y eliges clientes",
  },
];

export function AcademyShift() {
  return (
    <section
      className="relative section-padding overflow-hidden"
      style={{ background: "var(--surface)" }}
    >
      <div className="container-base relative z-10">
        <Reveal className="text-center mb-14">
          <Eyebrow>El cambio</Eyebrow>
          <h2 className="font-display font-bold text-3xl lg:text-5xl tracking-tight">
            La IA no es el problema.
            <br />
            <span className="text-gradient-green">
              Es cómo la estás usando.
            </span>
          </h2>
        </Reveal>
        <div className="grid md:grid-cols-2 gap-5 max-w-4xl mx-auto">
          {shifts.map((s, i) => (
            <Reveal key={i} delay={i * 0.08}>
              <GlowCard glowColor="blue" className="p-6 h-full">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-[0.65rem] font-display font-bold tracking-widest uppercase text-cream/25 line-through">
                    Antes
                  </span>
                </div>
                <p className="font-body text-cream/35 text-sm mb-4 line-through">
                  {s.from}
                </p>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-neon-green text-lg">→</span>
                  <span className="text-[0.65rem] font-display font-bold tracking-widest uppercase text-neon-green">
                    Con el sistema
                  </span>
                </div>
                <p className="font-display font-semibold text-cream text-base leading-snug">
                  {s.to}
                </p>
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
    <section className="relative section-padding overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-neon-green/5 blur-[140px] pointer-events-none" />
      <div className="container-base relative z-10">
        <Reveal className="mb-12">
          <div className="flex items-end justify-between gap-4 flex-wrap">
            <div className="flex-1 text-center">
              <Eyebrow>El mecanismo único</Eyebrow>
              <h2 className="font-display font-bold text-3xl lg:text-6xl tracking-tight leading-[1.05]">
                El Cerebro Estratégico
                <br />
                <ShiningText
                  text="Creativo con IA"
                  className="font-display font-bold"
                />
              </h2>
            </div>
            <SectionNum n="03 / 09" />
          </div>
        </Reveal>

        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto mb-12">
          <Reveal>
            <p className="font-body text-muted text-base md:text-lg leading-relaxed">
              Nadie enseña a conceptualizar como director creativo{" "}
              <em>y</em> usar la IA en ese proceso. Los demás enseñan
              herramientas. Aquí construyes el sistema completo de{" "}
              <span className="text-cream font-semibold">
                pensamiento + producción
              </span>
              .
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="font-body text-cream/45 text-base leading-relaxed">
              El criterio creativo es conocer todos los aspectos de una
              situación antes de decidir. Tener en la cabeza las técnicas, los
              estilos, las estructuras —todo el árbol— para mirar una misma idea
              desde todos los ángulos.{" "}
              <strong className="text-cream">
                Cuando decides mejor, creas mejor.
              </strong>
            </p>
          </Reveal>
        </div>

        <div className="grid md:grid-cols-3 gap-4 max-w-5xl mx-auto">
          {[
            {
              t: "IA sin criterio",
              d: "Produce ruido y contenido genérico.",
              featured: false,
            },
            {
              t: "Criterio sin IA",
              d: "Produce lento y con alto costo.",
              featured: false,
            },
            {
              t: "Criterio + IA · CONTENT IA SYSTEM",
              d: "Produce lo que antes necesitaba un equipo completo —con calidad real.",
              featured: true,
            },
          ].map((c, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <div
                className={`card-base p-7 h-full ${c.featured ? "hud-corners" : ""}`}
                style={
                  c.featured
                    ? {
                        borderColor: "rgba(26,128,255,0.45)",
                        background:
                          "linear-gradient(180deg, rgba(26,128,255,0.1) 0%, transparent 100%)",
                      }
                    : {}
                }
              >
                <p
                  className={`font-display font-bold text-[0.68rem] tracking-widest uppercase mb-3 ${
                    c.featured ? "text-neon-green/80" : "text-cream/30"
                  }`}
                >
                  {c.t}
                </p>
                <p
                  className={`font-display font-medium text-base leading-snug ${
                    c.featured ? "text-cream" : "text-cream/50"
                  }`}
                >
                  {c.d}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── TRANSFORMATION ──────────────────────────────────────────────────────────

const transformations = [
  {
    t: "Pensar como director creativo",
    d: "Vas a poder mirar cualquier marca, producto o situación y saber exactamente qué contenido necesita y por qué. No vas a improvisar nunca más —vas a decidir con criterio.",
  },
  {
    t: "Tu Cerebro Creativo con IA personalizado",
    d: "Un sistema que convierte a la IA en tu socio estratégico. Mientras otros reciben respuestas genéricas, tú tendrás una máquina de ideas afinada a tu medida.",
  },
  {
    t: "Encontrar el insight de cualquier marca",
    d: "Esa verdad que conecta. Sabrás convertirla en ideas que la gente quiere ver. Nunca más frente a una pantalla en blanco sin saber qué publicar.",
  },
  {
    t: "Producir contenido cinematográfico",
    d: "Videos e imágenes de nivel que hoy quizá crees imposible sin estudio ni equipo. Y lo harás tú solo, desde tu computadora.",
  },
  {
    t: "Una pieza real terminada",
    d: "No un ejercicio de práctica —una pieza que puedes mostrar, publicar o usar para conseguir tu primer cliente.",
  },
  {
    t: "El sistema para venderlo",
    d: "Sabrás cómo empaquetar tu servicio, cuánto cobrar y cómo cerrar clientes. Porque de nada sirve crear maravillas si no sabes convertirlas en ingresos.",
  },
];

export function AcademyTransformation() {
  return (
    <section className="relative section-padding overflow-hidden">
      <div className="container-base relative z-10">
        <Reveal className="mb-14">
          <div className="flex items-end justify-between gap-4 flex-wrap">
            <div className="flex-1 text-center">
              <Eyebrow>La transformación</Eyebrow>
              <h2 className="font-display font-bold text-3xl lg:text-5xl tracking-tight">
                Lo que vas a tener
                <br />
                <span className="text-holo">al terminar</span>
              </h2>
            </div>
            <SectionNum n="04 / 09" />
          </div>
        </Reveal>
        <div className="grid md:grid-cols-2 border-t border-white/8 max-w-5xl mx-auto">
          {transformations.map((o, i) => (
            <Reveal key={i} delay={(i % 2) * 0.08}>
              <div
                className={`flex gap-5 p-6 md:p-8 border-b border-white/6 hover:bg-white/[0.015] transition-colors ${
                  i % 2 === 0 ? "md:border-r md:border-r-white/6" : ""
                }`}
              >
                <span className="font-display font-black text-2xl text-neon-green/55 leading-none min-w-[2.5rem] pt-0.5">
                  0{i + 1}
                </span>
                <div>
                  <h3 className="font-display font-bold text-cream text-base mb-2 leading-tight">
                    {o.t}
                  </h3>
                  <p className="font-body text-sm text-cream/52 leading-relaxed">
                    {o.d}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── FOR WHO ─────────────────────────────────────────────────────────────────

const forYes = [
  "Eres freelancer o creativo que quiere dejar de competir por las migajas",
  "Tienes un negocio y el contenido no te trae clientes",
  "Sabes que la IA es el futuro pero no tienes un sistema real",
  "Quieres que los clientes te busquen a ti, no perseguirlos",
  "Quieres construir o fortalecer tu marca personal con autoridad",
  "Quieres poder cobrar por este servicio a otros negocios",
];
const forNo = [
  "Buscas un botón mágico que haga todo el trabajo",
  "Quieres resultados sin aplicar nada",
  "No puedes comprometerte 12 semanas",
  "Esperas hacerte millonario sin esfuerzo ni proceso",
];

export function AcademyForWho() {
  return (
    <section
      className="relative section-padding overflow-hidden"
      style={{ background: "var(--surface)" }}
    >
      <div className="container-base relative z-10">
        <Reveal className="mb-14">
          <div className="flex items-end justify-between gap-4 flex-wrap">
            <div className="flex-1 text-center">
              <Eyebrow>Para quién es este programa</Eyebrow>
              <h2 className="font-display font-bold text-3xl lg:text-5xl tracking-tight">
                ¿Es este sistema
                <br />
                para ti?
              </h2>
            </div>
            <SectionNum n="05 / 09" />
          </div>
        </Reveal>

        <div className="grid md:grid-cols-3 gap-4 mb-10 max-w-5xl mx-auto">
          {[
            {
              t: "Tu perfil hoy",
              body: (
                <p className="font-body text-sm text-cream/60 leading-relaxed">
                  Freelancer creativo, emprendedor o dueño de negocio que sabe
                  que el contenido con IA es el futuro pero no tiene un sistema
                  —o lo que produce no tiene coherencia ni estrategia.
                </p>
              ),
            },
            {
              t: "Lo que sientes hoy",
              body: (
                <ul className="flex flex-col gap-2.5">
                  {[
                    "Ves contenido cinematográfico de marcas grandes y no sabes cómo se produce",
                    "Has tomado cursos de IA y ninguno te enseñó a pensar estratégicamente",
                    "Usas la IA como calculadora, no como director creativo",
                    "Quieres ofrecer este servicio a clientes pero no tienes un proceso replicable",
                  ].map((l, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2 font-body text-sm text-cream/55"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-cream/25 flex-shrink-0 mt-1.5" />
                      {l}
                    </li>
                  ))}
                </ul>
              ),
            },
            {
              t: "Lo que intentaste sin éxito",
              body: (
                <ul className="flex flex-col gap-2.5">
                  {[
                    "Cursos genéricos de IA (solo herramientas, sin estrategia)",
                    "Coaches de ventas o filmmaking (no integran IA + pensamiento comercial)",
                    "Tutoriales sueltos de YouTube (sin sistema ni orden)",
                  ].map((l, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2 font-body text-sm text-cream/55"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-cream/25 flex-shrink-0 mt-1.5" />
                      {l}
                    </li>
                  ))}
                </ul>
              ),
            },
          ].map((p, i) => (
            <Reveal key={i} delay={i * 0.08}>
              <div className="card-base p-6 h-full">
                <h4 className="font-display font-bold text-[0.68rem] tracking-widest uppercase text-neon-green/65 mb-4">
                  {p.t}
                </h4>
                {p.body}
              </div>
            </Reveal>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-4 max-w-4xl mx-auto">
          <Reveal>
            <div
              className="card-base p-7 h-full"
              style={{ borderColor: "rgba(26,128,255,0.35)" }}
            >
              <h4 className="flex items-center gap-3 font-display font-bold text-base text-cream mb-5">
                <span className="w-7 h-7 rounded-full bg-neon-green/80 flex items-center justify-center text-bg text-xs font-black flex-shrink-0">
                  ✓
                </span>
                Es para ti si…
              </h4>
              <ul className="flex flex-col gap-3">
                {forYes.map((f, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2.5 font-body text-sm text-cream/75"
                  >
                    <span className="text-neon-green flex-shrink-0 mt-0.5 font-bold text-xs">
                      ✓
                    </span>
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="card-base p-7 h-full">
              <h4 className="flex items-center gap-3 font-display font-bold text-base text-cream mb-5">
                <span className="w-7 h-7 rounded-full bg-white/8 flex items-center justify-center text-cream/35 text-xs font-black flex-shrink-0">
                  ✕
                </span>
                No es para ti si…
              </h4>
              <ul className="flex flex-col gap-3">
                {forNo.map((f, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2.5 font-body text-sm text-cream/40"
                  >
                    <span className="text-cream/25 flex-shrink-0 mt-0.5 text-xs">
                      ✕
                    </span>
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>

        <Reveal className="mt-10 max-w-4xl mx-auto">
          <blockquote className="border-l-2 border-neon-green/35 pl-6">
            <p className="font-display font-medium text-cream text-base md:text-lg leading-snug">
              «Pero si estás dispuesto a construir —aunque empieces de cero,
              aunque hoy sientas que no tienes el talento ni la experiencia—
              entonces estás exactamente donde tienes que estar. Porque lo que yo
              tardé diez años en entender, te lo entrego ordenado, paso a paso.»
            </p>
          </blockquote>
        </Reveal>
      </div>
    </section>
  );
}

// ─── CURRICULUM ──────────────────────────────────────────────────────────────

const modules = [
  {
    n: "00",
    t: "Bienvenida y Onboarding",
    wk: "Día 1",
    tag: "Módulo 0",
    obj: "Antes de empezar: bienvenida oficial, mi historia completa, para quién es el programa, la transformación que vas a vivir, y cómo funciona todo el sistema. Establece el marco mental correcto para aprovechar cada semana al máximo.",
    classes: [],
    deliver: "Marco mental y acceso completo.",
    zero: true,
  },
  {
    n: "01",
    t: "La Mentalidad del Director Creativo con IA",
    wk: "Semana 1",
    tag: "Módulo 1",
    obj: "Instalar la forma de pensar correcta antes de tocar cualquier herramienta.",
    classes: [
      "Por qué el 95% usa la IA mal —y cómo diferenciarte desde el primer día",
      "Qué hace un director creativo que un usuario de IA no hace",
      "El flujo completo del sistema: de la estrategia a la pieza final",
      "Cómo analizar una pieza de contenido como profesional de agencia",
      "Los criterios de calidad que usan las agencias grandes con sus clientes",
    ],
    deliver: "Análisis de 3 piezas de contenido reales con criterios de agencia.",
    zero: false,
  },
  {
    n: "02",
    t: "Estrategia de Contenido Impulsada con IA",
    wk: "Semanas 2–3",
    tag: "Módulo 2",
    obj: "Construir la base estratégica completa de una marca usando IA antes de producir una sola pieza.",
    classes: [
      "Brief estratégico — cómo extraer lo que el cliente realmente necesita",
      "Definición de audiencia con IA — miedos, deseos, lenguaje real del cliente",
      "Los pilares de contenido — cómo definirlos según el objetivo de negocio",
      "Construcción de la grilla mensual — 30 ideas en 30 minutos con IA",
      "Errores estratégicos que hacen que el contenido no venda",
    ],
    deliver: "Brief estratégico completo + grilla de 30 días para una marca real.",
    note: "Disponible como Mini Curso standalone a $97 — si quieres probarlo antes de comprometerte con el programa completo.",
    zero: false,
  },
  {
    n: "03",
    t: "Preproducción con IA",
    wk: "Semana 4",
    tag: "Módulo 3",
    obj: "Conceptualizar y planificar visualmente con IA. El paso que nadie enseña y que separa el contenido amateur del cinematográfico.",
    classes: [
      "Qué es la preproducción y por qué todos la omiten (y pagan el precio)",
      "Ideación con IA — 10 conceptos creativos en minutos",
      "Storyboard con IA — planificar cada escena visualmente antes de producir",
      "Referencias visuales y mood boards con IA",
      "Del concepto a la ficha de producción completa",
    ],
    deliver: "Storyboard completo + ficha de producción lista para ejecutar.",
    zero: false,
  },
  {
    n: "04",
    t: "Guión Cinematográfico de Venta con IA",
    wk: "Semanas 5–6",
    tag: "Módulo 4",
    obj: "Escribir guiones que venden con estructura narrativa, persuasión y estética cinematográfica integradas.",
    classes: [
      "La diferencia entre un guión de venta y uno meramente informativo",
      "Estructuras narrativas que funcionan en contenido comercial",
      "El hook cinematográfico — cómo abrir para que no se salteen tu contenido",
      "Escribir el guión completo con IA paso a paso (sin página en blanco)",
      "Adaptar el guión para Reels, TikTok, ads y contenido largo",
    ],
    deliver: "3 guiones completos listos para producir en 3 formatos distintos.",
    zero: false,
  },
  {
    n: "05",
    t: "Producción Visual Cinematográfica con IA",
    wk: "Semanas 7–8",
    tag: "Módulo 5",
    obj: "Generar imágenes y video de nivel cinematográfico con IA siguiendo el storyboard y guión producidos.",
    classes: [
      "El stack de herramientas — qué usar para imagen, video y audio (y cuáles no)",
      "Prompts cinematográficos que generan exactamente lo que necesitas",
      "Generación de imágenes para contenido comercial — composición y marca",
      "Generación de video con IA — flujo completo desde el storyboard",
      "Banco de prompts del sistema (los que yo uso con mis clientes reales)",
    ],
    deliver: "Set completo de piezas visuales para la campaña del programa.",
    zero: false,
  },
  {
    n: "06",
    t: "Edición y Post-Producción con IA",
    wk: "Semanas 9–10",
    tag: "Módulo 6",
    obj: "Ensamblar todas las piezas con coherencia visual, narrativa y comercial. Calidad de agencia antes de publicar.",
    classes: [
      "El flujo de edición del sistema — cómo Manuel ensambla una pieza para cliente",
      "Música, ritmo y timing — cómo el audio define si el contenido engancha",
      "Texto, subtítulos y gráficos con IA sin perder la estética cinematográfica",
      "Color y corrección visual con IA",
      "El checklist de calidad de agencia — los 8 puntos antes de entregar",
    ],
    deliver:
      "Pieza completa terminada —del brief a la entrega final. El primer trabajo profesional del alumno.",
    zero: false,
  },
  {
    n: "07",
    t: "El Sistema para Clientes y tu Negocio",
    wk: "Semanas 11–12",
    tag: "Módulo 7",
    obj: "Convertir todo lo aprendido en un servicio cobrable o sistema replicable. El mismo que Manuel usa con marcas grandes.",
    classes: [
      "Cómo empaquetar el sistema como servicio — qué incluye, qué no",
      "Pricing — cuánto cobrar según el tipo de cliente y el alcance",
      "La propuesta comercial — cómo presentarla para que el precio no sea el obstáculo",
      "El flujo de trabajo con clientes — de onboarding a entrega final",
      "Cómo conseguir los primeros clientes con este sistema",
      "Escalamiento — atender más clientes sin trabajar más horas",
    ],
    deliver: "Propuesta comercial lista + estructura de servicio definida.",
    zero: false,
  },
];

export function AcademyCurriculum() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section
      id="programa"
      className="relative section-padding overflow-hidden"
      style={{ background: "var(--surface)" }}
    >
      <div className="container-base relative z-10">
        <Reveal className="mb-14">
          <div className="flex items-end justify-between gap-4 flex-wrap">
            <div className="flex-1 text-center">
              <Eyebrow>Currículum completo</Eyebrow>
              <h2 className="font-display font-bold text-3xl lg:text-5xl tracking-tight">
                12 semanas · 7 módulos
              </h2>
            </div>
            <SectionNum n="06 / 09" />
          </div>
          <p className="font-body text-muted max-w-3xl text-center mx-auto mt-5">
            Cada módulo construye sobre el anterior. Cada semana tienes clases
            grabadas que ves a tu ritmo, y{" "}
            <strong className="text-cream">dos sesiones en vivo</strong>: una
            teórica y una práctica donde resolvemos dudas mientras aplicas.
          </p>
        </Reveal>

        <div className="flex flex-col gap-3 max-w-5xl mx-auto">
          {modules.map((m, i) => (
            <Reveal key={m.n} delay={(i % 3) * 0.05}>
              <div
                className={`card-base overflow-hidden ${m.zero ? "hud-corners" : ""}`}
                style={
                  m.zero
                    ? { borderColor: "rgba(26,128,255,0.45)" }
                    : {}
                }
              >
                <button
                  onClick={() => setOpen(open === i ? null : i)}
                  className="w-full text-left flex items-start gap-5 p-6 md:p-7 hover:bg-white/[0.02] transition-colors"
                >
                  <span
                    className={`font-display font-bold text-[0.62rem] tracking-widest uppercase px-3 py-1.5 rounded flex-shrink-0 whitespace-nowrap self-start mt-0.5 ${
                      m.zero
                        ? "bg-neon-green/80 text-bg"
                        : "bg-cream/8 text-cream/60"
                    }`}
                  >
                    {m.tag}
                  </span>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-display font-bold text-sm md:text-base text-cream leading-tight mb-1">
                      {m.t}
                    </h3>
                    <span className="font-display font-semibold text-[0.65rem] tracking-widest uppercase text-neon-green/55">
                      {m.wk}
                    </span>
                  </div>
                  <span
                    className={`font-display text-cream/30 text-xl flex-shrink-0 mt-0.5 transition-transform duration-300 ${
                      open === i ? "rotate-45" : ""
                    }`}
                  >
                    +
                  </span>
                </button>

                <AnimatePresence>
                  {open === i && (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.21, 0.47, 0.32, 0.98] }}
                      className="overflow-hidden"
                    >
                      <div
                        className={`px-6 md:px-7 pb-6 ${
                          m.classes.length > 0
                            ? "grid md:grid-cols-[1fr_1.2fr] gap-6"
                            : ""
                        }`}
                      >
                        <p className="font-body text-cream/60 text-sm leading-relaxed border-l-2 border-neon-green/25 pl-4">
                          {m.obj}
                        </p>
                        {m.classes.length > 0 && (
                          <ul className="flex flex-col gap-2">
                            {m.classes.map((c, j) => (
                              <li
                                key={j}
                                className="flex items-start gap-2.5 font-body text-sm text-cream/52"
                              >
                                <span className="w-1.5 h-1.5 bg-neon-green/45 rotate-45 flex-shrink-0 mt-1.5" />
                                {c}
                              </li>
                            ))}
                          </ul>
                        )}
                        <div
                          className={`flex gap-3 items-baseline pt-4 border-t border-white/8 ${
                            m.classes.length > 0 ? "md:col-span-2" : ""
                          }`}
                        >
                          <span className="font-display font-bold text-[0.62rem] tracking-widest uppercase text-neon-green/65 flex-shrink-0">
                            Entregable
                          </span>
                          <span className="font-body text-sm text-cream/65">
                            {m.deliver}
                          </span>
                        </div>
                        {"note" in m && m.note && (
                          <p
                            className={`text-[0.78rem] font-body text-cream/45 bg-neon-green/5 border border-neon-green/12 rounded px-4 py-3 mt-1 ${
                              m.classes.length > 0 ? "md:col-span-2" : ""
                            }`}
                          >
                            {m.note}
                          </p>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-14 max-w-5xl mx-auto">
          <h3 className="font-display font-bold text-xl text-cream mb-5 tracking-tight">
            Al terminar el programa, tendrás:
          </h3>
          <ul className="grid md:grid-cols-2 gap-3">
            {[
              "El sistema completo de dirección creativa con IA instalado",
              "Una pieza cinematográfica real terminada con tus propias manos",
              "Una propuesta comercial lista para vender el servicio",
              "El proceso exacto que usa una agencia con marcas grandes",
              "El criterio para crear contenido que vende —no solo que «se ve bien»",
            ].map((o, i) => (
              <li
                key={i}
                className="flex items-start gap-2.5 font-body text-sm text-cream/72"
              >
                <span className="text-neon-green flex-shrink-0 font-bold text-xs mt-0.5">
                  ✓
                </span>
                {o}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}

// ─── VALUE STACK (INCLUDES + BONOS + GUARANTEE) ───────────────────────────

export function AcademyValueStack() {
  return (
    <section className="relative section-padding overflow-hidden">
      <div className="container-base relative z-10">
        <Reveal className="mb-14">
          <div className="flex items-end justify-between gap-4 flex-wrap">
            <div className="flex-1 text-center">
              <Eyebrow>Lo que incluye</Eyebrow>
              <h2 className="font-display font-bold text-3xl lg:text-5xl tracking-tight">
                El programa completo
              </h2>
            </div>
            <SectionNum n="07 / 09" />
          </div>
        </Reveal>

        <div className="grid md:grid-cols-[1.3fr_1fr] gap-5 mb-5 max-w-5xl mx-auto">
          <Reveal>
            <div className="card-base p-8 h-full">
              <h3 className="font-display font-bold text-xl text-cream mb-6 tracking-tight">
                El Programa
              </h3>
              <ul className="flex flex-col gap-4">
                {[
                  { bold: "7 módulos grabados", rest: " — acceso de por vida" },
                  {
                    bold: "Sesiones grupales en vivo",
                    rest: " 2× por semana · 12 semanas",
                  },
                  {
                    bold: null,
                    rest: "Feedback de contenido en comunidad privada",
                  },
                  {
                    bold: null,
                    rest: "El proceso exacto que Manuel usa con marcas grandes",
                  },
                  {
                    bold: null,
                    rest: "Acceso a las grabaciones de todas las sesiones en vivo",
                  },
                ].map((item, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-3 font-body text-sm text-cream/72"
                  >
                    <span className="text-neon-green flex-shrink-0 font-bold text-xs mt-0.5">
                      ✓
                    </span>
                    {item.bold ? (
                      <>
                        <strong className="text-cream">{item.bold}</strong>
                        {item.rest}
                      </>
                    ) : (
                      item.rest
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div
              className="card-base p-8 h-full hud-corners"
              style={{
                borderColor: "rgba(26,128,255,0.35)",
                background:
                  "linear-gradient(180deg, rgba(26,128,255,0.08) 0%, transparent 100%)",
              }}
            >
              <h3 className="font-display font-bold text-xl text-cream mb-6 tracking-tight">
                Los Bonos
              </h3>
              <ul className="flex flex-col gap-4">
                {[
                  {
                    b: "Bono 1",
                    d: "Banco de prompts y GPTs cinematográficos",
                  },
                  {
                    b: "Bono 2",
                    d: "Biblia publicitaria completa (brief, storyboard, guión de venta)",
                  },
                  {
                    b: "Bono 3",
                    d: "Propuesta comercial lista para ofrecer el servicio",
                  },
                ].map((item, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-3 font-body text-sm text-cream/72"
                  >
                    <span className="text-neon-green flex-shrink-0 font-bold text-xs mt-0.5">
                      ✓
                    </span>
                    <span>
                      <strong className="text-cream">{item.b}</strong> —{" "}
                      {item.d}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>

        <Reveal className="max-w-5xl mx-auto">
          <div
            className="card-base p-8 md:p-12 text-center"
            style={{
              borderColor: "rgba(26,128,255,0.25)",
              background: "rgba(26,128,255,0.04)",
            }}
          >
            <Eyebrow>La garantía</Eyebrow>
            <p className="font-display font-medium text-cream text-base md:text-xl leading-relaxed max-w-3xl mx-auto">
              «Si en 12 semanas no logras aplicar el sistema, puedes continuar
              en el programa sin costo adicional hasta que lo tengas. El
              objetivo es que salgas con el sistema funcionando —no que pagues y
              te quedes solo.»
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ─── PRICING ─────────────────────────────────────────────────────────────────

const tiers = [
  {
    name: "Mini Curso",
    price: "$97",
    tagline: "Módulo 2 standalone",
    features: [
      "Módulo 2 completo",
      "Estrategia publicitaria con IA",
      "Acceso de por vida",
      "Ideal para comenzar y probar",
    ],
    featured: false,
  },
  {
    name: "Solo Grabaciones",
    price: "$850",
    tagline: "Autoestudio · 3 meses de acceso",
    features: [
      "Los 7 módulos grabados completos",
      "Acceso 3 meses",
      "Sin sesiones en vivo",
      "Plantillas y banco de prompts",
    ],
    featured: false,
  },
  {
    name: "Programa Completo",
    price: "$1,500",
    tagline: "La experiencia completa",
    features: [
      "7 módulos grabados (de por vida)",
      "Sesiones en vivo 2×/semana · 12 sem.",
      "Comunidad privada + feedback",
      "Los 3 bonos incluidos",
      "Garantía extendida",
    ],
    featured: true,
  },
];

export function AcademyPricing() {
  return (
    <section id="precio" className="relative section-padding overflow-hidden">
      <div className="container-base relative z-10">
        <Reveal className="mb-14">
          <div className="flex items-end justify-between gap-4 flex-wrap">
            <div className="flex-1 text-center">
              <Eyebrow>Opciones de inversión</Eyebrow>
              <h2 className="font-display font-bold text-3xl lg:text-5xl tracking-tight">
                Elige cómo empezar
              </h2>
            </div>
            <SectionNum n="08 / 09" />
          </div>
        </Reveal>
        <div className="grid md:grid-cols-3 gap-5 max-w-5xl mx-auto items-stretch mb-6">
          {tiers.map((t, i) => (
            <Reveal key={t.name} delay={i * 0.1}>
              <motion.div
                whileHover={{ y: -6 }}
                transition={{ type: "spring", stiffness: 300, damping: 22 }}
                className={`card-base p-8 flex flex-col relative h-full ${
                  t.featured ? "hud-corners" : ""
                }`}
                style={
                  t.featured
                    ? {
                        borderColor: "rgba(26,128,255,0.45)",
                        boxShadow: "0 0 60px rgba(26,128,255,0.12)",
                      }
                    : {}
                }
              >
                {t.featured && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-[0.58rem] font-display font-bold tracking-widest uppercase px-3 py-1 rounded text-bg whitespace-nowrap" style={{ background: "linear-gradient(135deg,#1A80FF,#4D9FFF)" }}>
                    ★ Opción recomendada
                  </span>
                )}
                <h3 className="font-display font-bold text-[0.72rem] tracking-widest uppercase text-cream/40 mb-4">
                  {t.name}
                </h3>
                <p
                  className="font-display font-black mb-2 text-gradient-green"
                  style={{ fontSize: "clamp(2.2rem, 4vw, 3rem)" }}
                >
                  {t.price}
                </p>
                <p className="font-body text-cream/38 text-xs mb-6">
                  {t.tagline}
                </p>
                <ul className="flex flex-col gap-3 mb-8 flex-1">
                  {t.features.map((f) => (
                    <li
                      key={f}
                      className="flex items-start gap-2.5 font-body text-sm text-cream/72"
                    >
                      <span className="text-neon-green flex-shrink-0 mt-0.5 text-xs">
                        ✓
                      </span>
                      {f}
                    </li>
                  ))}
                </ul>
                <a
                  href={WA}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={
                    t.featured
                      ? "btn-glow w-full text-center"
                      : "font-display font-semibold text-sm tracking-wide text-center py-3 rounded border border-white/10 text-cream/65 hover:border-white/22 hover:text-cream transition-colors"
                  }
                >
                  {t.featured ? "Reservar mi lugar →" : "Elegir plan"}
                </a>
              </motion.div>
            </Reveal>
          ))}
        </div>

        <Reveal className="max-w-5xl mx-auto">
          <div
            className="card-base p-6 flex flex-wrap gap-x-10 gap-y-3 items-center justify-center text-center"
            style={{
              borderStyle: "dashed",
              borderColor: "rgba(255,255,255,0.1)",
            }}
          >
            <span className="font-display font-bold text-[0.62rem] tracking-widest uppercase text-neon-green/65 w-full md:w-auto">
              Pago en cuotas · Programa Completo
            </span>
            <span className="font-body text-cream/65 text-sm">
              <strong className="text-cream">$300</strong> para reservar tu spot
            </span>
            <span className="font-body text-cream/65 text-sm">
              <strong className="text-cream">$350</strong> primera cuota (semana
              1)
            </span>
            <span className="font-body text-cream/65 text-sm">
              <strong className="text-cream">$350</strong> segunda cuota (semana
              4–5)
            </span>
            <span className="font-display font-bold text-base text-cream">
              Total $1,000{" "}
              <span className="font-normal text-cream/35 text-xs">
                · precio de lanzamiento
              </span>
            </span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ─── VERSUS TABLE ─────────────────────────────────────────────────────────────

const versusRows = [
  {
    other: "Solo enseñan herramientas de moda",
    us: "Sistema completo de pensamiento + producción",
  },
  {
    other: "El instructor aprendió IA la semana pasada",
    us: "+15 años en agencias creativas reales",
  },
  {
    other: "Sin estrategia comercial — solo «hacer videos»",
    us: "Del brief estratégico al cliente cerrado",
  },
  {
    other: "Contenido genérico sin criterio de agencia",
    us: "Estándar de calidad de agencia con marcas grandes",
  },
  {
    other: "No sabes cómo vender lo que haces",
    us: "Módulo completo de sistema de ventas y servicio",
  },
  {
    other: "Pagas y quedas solo",
    us: "Comunidad, sesiones en vivo y garantía extendida",
  },
];

export function AcademyVersus() {
  return (
    <section
      className="relative section-padding overflow-hidden"
      style={{ background: "var(--surface)" }}
    >
      <div className="container-base relative z-10 max-w-4xl">
        <Reveal className="text-center mb-12">
          <Eyebrow>Por qué este sistema y no otro</Eyebrow>
          <h2 className="font-display font-bold text-3xl lg:text-5xl tracking-tight">
            La diferencia es
            <br />
            el criterio
          </h2>
        </Reveal>
        <Reveal>
          <div className="rounded-lg overflow-hidden border border-white/8">
            <div className="grid grid-cols-2">
              <div className="px-6 py-4 font-display font-bold text-[0.65rem] tracking-widest uppercase text-cream/28 bg-white/[0.02]">
                Otros cursos de IA
              </div>
              <div className="px-6 py-4 font-display font-bold text-[0.65rem] tracking-widest uppercase text-bg bg-cream flex items-center gap-2">
                CONTENT IA SYSTEM
              </div>
            </div>
            {versusRows.map((r, i) => (
              <div
                key={i}
                className="grid grid-cols-1 md:grid-cols-2 border-t border-white/6"
              >
                <div className="px-6 py-5 font-body text-sm text-cream/38 md:border-r border-white/6">
                  {r.other}
                </div>
                <div className="px-6 py-5 font-body text-sm text-cream font-medium bg-neon-green/[0.025]">
                  {r.us}
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ─── FAQ ─────────────────────────────────────────────────────────────────────

const faqItems: { question: string; answer: React.ReactNode }[] = [
  {
    question: "¿Necesito experiencia previa en IA o diseño?",
    answer:
      "No. No necesitas experiencia previa, ni saber diseñar, ni programar. Lo único que necesitas es seguir el sistema con compromiso. El criterio se construye en el camino.",
  },
  {
    question: "¿Cuánto tiempo debo dedicar por semana?",
    answer:
      "El programa está diseñado para unas 10–14 horas semanales: clases grabadas que ves a tu ritmo más dos sesiones en vivo de 90 minutos cada una. Es compatible con trabajar en paralelo.",
  },
  {
    question:
      "¿Qué pasa si me quedo atrás o no puedo asistir a una sesión en vivo?",
    answer:
      "Todas las sesiones en vivo se graban. Tienes acceso a las grabaciones y puedes ver cualquier sesión cuando puedas. La comunidad también sirve para resolver dudas entre semanas.",
  },
  {
    question: "¿En qué idioma es el programa?",
    answer:
      "Totalmente en español. Todo el material, sesiones en vivo y comunidad son en español.",
  },
  {
    question: "¿Qué herramientas de IA necesito pagar?",
    answer:
      "El programa usa herramientas con planes gratuitos o de bajo costo. Te enseño exactamente cuáles usar y cuándo vale la pena pagar. No necesitas invertir más de $30–50/mes en herramientas como máximo.",
  },
  {
    question:
      "¿Puedo aplicar esto si no tengo experiencia con clientes?",
    answer:
      "Sí. El Módulo 7 está diseñado exactamente para eso: cómo empaquetar el sistema, pricing, propuesta comercial y cómo conseguir los primeros clientes desde cero.",
  },
  {
    question: "¿El precio sube después del lanzamiento?",
    answer:
      "Sí. El precio de lanzamiento es $1,000 (con cuotas) o $1,500 (precio de catálogo). Con 3 casos de éxito documentados el precio sube a $1,500 y con 10+ resultados a $2,000+.",
  },
];

export function AcademyFAQ() {
  return (
    <section className="relative section-padding overflow-hidden">
      <div className="container-base relative z-10 max-w-3xl">
        <Reveal className="mb-14">
          <div className="flex items-end justify-between gap-4 flex-wrap">
            <div className="flex-1 text-center">
              <Eyebrow>Preguntas frecuentes</Eyebrow>
              <h2 className="font-display font-bold text-3xl lg:text-4xl tracking-tight">
                Lo que suelen preguntar
              </h2>
            </div>
            <SectionNum n="09 / 09" />
          </div>
        </Reveal>
        <Reveal>
          <FAQAccordion items={faqItems} />
        </Reveal>
        <div className="text-center mt-8">
          <a
            href={WA}
            target="_blank"
            rel="noopener noreferrer"
            className="font-display font-semibold text-sm text-neon-green border-b border-neon-green/35 pb-0.5"
          >
            ¿Otra pregunta? Escríbeme por WhatsApp →
          </a>
        </div>
      </div>
    </section>
  );
}

// ─── FINAL CTA ───────────────────────────────────────────────────────────────

const steps = [
  {
    n: "01",
    d: (
      <>
        Escríbeme por <strong className="text-cream">DM o WhatsApp</strong>{" "}
        diciéndome que quieres más info o que estás listo para reservar tu
        lugar.
      </>
    ),
  },
  {
    n: "02",
    d: (
      <>
        Coordinamos una{" "}
        <strong className="text-cream">llamada breve de 20 minutos</strong> para
        confirmar que el programa es la opción correcta para ti.
      </>
    ),
  },
  {
    n: "03",
    d: (
      <>
        Si decides avanzar, haces el pago del{" "}
        <strong className="text-cream">30% ($300)</strong> para reservar tu spot
        en la próxima cohorte.
      </>
    ),
  },
  {
    n: "04",
    d: (
      <>
        Recibes{" "}
        <strong className="text-cream">acceso inmediato al Módulo 0</strong> y
        la fecha de inicio confirmada.
      </>
    ),
  },
];

export function AcademyFinalCTA() {
  return (
    <section
      id="reserva"
      className="relative section-padding overflow-hidden"
      style={{ background: "var(--surface)" }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(26,128,255,0.08) 0%, transparent 70%)",
        }}
      />
      <div className="absolute inset-0 z-0 opacity-30">
        <GridBackground />
      </div>
      <div className="container-base relative z-10 max-w-3xl text-center">
        <Reveal>
          <div className="inline-flex items-center gap-3 border border-neon-green/22 rounded-full px-5 py-2.5 text-xs font-body text-cream/50 mb-8 bg-neon-green/[0.04]">
            <span className="w-2 h-2 rounded-full bg-neon-green animate-pulse" />
            Cupos llenos — únete a la lista de espera
          </div>
          <Eyebrow>Próximos pasos</Eyebrow>
          <h2
            className="font-display font-extrabold tracking-tight mb-6 leading-[1.05]"
            style={{ fontSize: "clamp(2.4rem, 6vw, 5rem)" }}
          >
            Reserva tu lugar
          </h2>
          <p className="font-body text-muted text-base md:text-lg max-w-xl mx-auto mb-12">
            Operamos con un máximo de{" "}
            <strong className="text-cream">15 alumnos por cohorte</strong> para
            garantizar atención real y feedback de calidad en cada sesión en
            vivo.
          </p>
        </Reveal>

        <div className="grid md:grid-cols-2 gap-4 mb-12 text-left">
          {steps.map((s, i) => (
            <Reveal key={i} delay={i * 0.08}>
              <div className="card-base p-6">
                <span className="font-display font-extrabold text-[0.62rem] tracking-widest uppercase text-neon-green/65 block mb-3">
                  Paso {s.n}
                </span>
                <p className="font-body text-sm text-cream/65 leading-relaxed">
                  {s.d}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-5">
            <a
              href={WA}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-glow"
            >
              Quiero reservar mi lugar →
            </a>
            <a
              href={WA}
              target="_blank"
              rel="noopener noreferrer"
              className="font-display font-semibold text-sm tracking-wide text-cream/60 hover:text-cream transition-colors border-b border-white/12 pb-1"
            >
              Escríbeme por DM
            </a>
          </div>
          <p className="font-body text-[0.78rem] text-cream/28 mt-4">
            ¿Tienes preguntas antes de decidir? Escríbeme por WhatsApp. Estoy
            para orientarte.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

// kept for backward compatibility — replaced by AcademyBio
export function AcademyProof() {
  return null;
}
