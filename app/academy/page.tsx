import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnimatedSection, { StaggerContainer, StaggerItem } from "@/components/AnimatedSection";
import GridBackground from "@/components/ui/grid-background";
import FAQAccordion from "@/components/ui/faq-accordion";

export const metadata: Metadata = {
  title: "CONTENT IA SYSTEM — Aprende a crear contenido publicitario cinematográfico con IA | RESUELTO Academy",
  description:
    "El sistema que usan las agencias para crear contenido comercial cinematográfico con IA — estrategia, guión y producción. Programa de 12 semanas con Manuel Severo (ex TBWA, Fahrenheit DDB). Para freelancers, marcas y emprendedores.",
  keywords: [
    "curso contenido con IA",
    "aprender producción audiovisual IA",
    "curso publicidad con inteligencia artificial",
    "creativo IA publicitario",
    "content ia system",
    "curso director creativo IA peru",
  ],
  alternates: { canonical: "https://resueltoagency.com/academy" },
  openGraph: {
    title: "CONTENT IA SYSTEM — RESUELTO Academy",
    description:
      "Aprende el sistema de dirección creativa con IA que uso con marcas grandes. Estrategia + guión + producción cinematográfica. Programa de 12 semanas.",
    url: "https://resueltoagency.com/academy",
    siteName: "RESUELTO",
    locale: "es_PE",
    type: "website",
  },
};

// ─── DATA ────────────────────────────────────────────────────────────────────

const WA =
  "https://wa.me/51907462070?text=Hola%2C%20quiero%20info%20sobre%20el%20CONTENT%20IA%20SYSTEM";

const brands = ["TBWA", "Fahrenheit DDB", "Wong", "BCP", "Interbank", "Redondos", "San Fernando", "Quantico Films"];

const problems = [
  {
    t: "Usas la IA como calculadora",
    d: "Le pides cosas sueltas y recibes resultados genéricos, sin alma, que podrían ser de cualquier marca.",
  },
  {
    t: "Ves contenido cinematográfico y no sabes cómo se hace",
    d: "Crees que necesitas un estudio, cámaras caras y un equipo de diez personas para producir a ese nivel.",
  },
  {
    t: "Tomaste cursos de IA y ninguno funcionó",
    d: "Todos enseñan a apretar botones. Nadie te enseñó a pensar estratégicamente como un director creativo.",
  },
  {
    t: "Produces, pero no vende",
    d: "Tu contenido se ve bien pero no tiene estrategia, coherencia ni un sistema replicable detrás.",
  },
];

const forWho = [
  "Freelancers y creativos que quieren cobrar por lo que de verdad vale su trabajo.",
  "Dueños de negocio cansados de pagar fortunas por contenido que no trae clientes.",
  "Emprendedores que saben que el contenido con IA es el futuro pero no saben por dónde empezar.",
  "Quienes quieren construir su marca personal y que los clientes los busquen a ellos.",
];

const modules = [
  { n: "00", t: "Onboarding: Mi Historia y el Criterio", d: "El camino del criterio: por qué la creatividad no es un don, y por qué vender también se aprende." },
  { n: "01", t: "La Mentalidad del Director Creativo", d: "Cómo pensar antes de tocar cualquier herramienta. El paso que nadie enseña." },
  { n: "02", t: "Construir el Cerebro Creativo con IA", d: "El sistema que convierte la IA en tu socio estratégico. El módulo más diferenciador." },
  { n: "03", t: "Framework Estratégico + Ideación", d: "Insight, Big Idea, concepto y cientos de ideas sin quedarte en blanco." },
  { n: "04", t: "Del Concepto al Guión y Storyboard", d: "Guiones que venden y storyboards que dirigen toda la producción." },
  { n: "05", t: "Producción Cinematográfica con IA", d: "Imágenes y video de nivel cine con Higgsfield, Kling, Veo, Seedance y más." },
  { n: "06", t: "Ensamblaje: Edición, Ritmo y Montaje", d: "Tu primera pieza cinematográfica publicitaria completa, lista para publicar." },
  { n: "07", t: "El Sistema Comercial", d: "Cómo posicionarte, cobrar, pautear, crear tu landing y cerrar clientes." },
];

const includes = [
  "7 módulos grabados con acceso de por vida",
  "Sesiones grupales en vivo 2× por semana · 12 semanas",
  "Feedback de tu contenido en comunidad privada",
  "El proceso exacto que Manuel usa con marcas grandes",
  "Banco de prompts y GPTs cinematográficos",
  "Plantillas completas: brief, storyboard, guión de venta",
  "Propuesta comercial lista para vender tu servicio",
];

const metrics = [
  { v: "+2.5M", l: "vistas orgánicas/año generadas para marcas" },
  { v: "+20", l: "marcas trabajadas en las mejores agencias" },
  { v: "10", l: "años de carrera publicitaria destilados" },
  { v: "+2", l: "años aplicando IA en producción real" },
];

const tiers = [
  {
    name: "Mini Curso",
    price: "$97",
    tagline: "Prueba el sistema",
    features: [
      "Un módulo completo del sistema",
      "Acceso de por vida a las grabaciones",
      "Punto de entrada sin riesgo",
    ],
    featured: false,
  },
  {
    name: "Programa Completo",
    price: "$1,500",
    tagline: "Grabaciones + clases en vivo · 3 meses",
    features: [
      "7 módulos grabados + acceso de por vida",
      "Sesiones en vivo 2× por semana · 12 semanas",
      "Feedback en comunidad privada",
      "Los 3 bonos completos",
      "Garantía hasta que logres tu objetivo",
    ],
    featured: true,
  },
  {
    name: "Solo Grabaciones",
    price: "$850",
    tagline: "Acceso 3 meses al programa grabado",
    features: [
      "7 módulos grabados",
      "Plantillas y banco de prompts",
      "A tu propio ritmo, sin sesiones en vivo",
    ],
    featured: false,
  },
];

const faqItems: { question: string; answer: React.ReactNode }[] = [
  { question: "¿Necesito experiencia previa en diseño o video?", answer: <>No. El sistema está hecho para que alguien que nunca ha producido contenido profesional pueda crear piezas de nivel cinematográfico. Si ya tienes experiencia, llegas más lejos más rápido.</> },
  { question: "¿Necesito saber programar?", answer: <>Para nada. Te enseño a usar las herramientas de IA y a crear hasta tu landing page sin escribir una línea de código.</> },
  { question: "¿Qué herramientas voy a usar?", answer: <>El stack del sistema: ChatGPT, Nano/Banana Pro, Higgsfield, Kling 3.0, Veo 3 y Seedance 2.0. Te enseño las bases de cada una y, sobre todo, el criterio para dirigirlas.</> },
  { question: "¿Cuánto tiempo necesito por semana?", answer: <>Con 5-8 horas semanales sigues el ritmo del programa. Las clases grabadas las ves a tu ritmo y las sesiones en vivo son de 2 horas.</> },
  { question: "¿En qué se diferencia de otros cursos de IA?", answer: <>Otros te enseñan la herramienta. Yo te enseño el criterio de un director creativo que trabajó en las mejores agencias del mundo, y cómo se potencia con IA. Esa combinación casi nadie la tiene.</> },
  { question: "¿Puedo cambiar de nivel después?", answer: <>Sí. Si entras al Mini Curso o a Solo Grabaciones y quieres subir, pagas solo la diferencia.</> },
];

// ─── SECTIONS ────────────────────────────────────────────────────────────────

function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <GridBackground />
        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-bg to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-br from-neon-green/4 via-transparent to-neon-purple/6" />
      </div>
      <div className="absolute inset-0 z-[2] pointer-events-none scanlines" />
      <div className="absolute inset-0 z-[2] grid-pattern opacity-20 pointer-events-none" />
      <div className="absolute inset-0 z-[2] pointer-events-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[300px] rounded-full bg-neon-purple/8 blur-[100px]" />
        <div className="absolute bottom-1/3 left-1/4 w-[400px] h-[200px] rounded-full bg-neon-green/6 blur-[80px]" />
      </div>
      <div className="absolute inset-0 z-[3] flex items-center justify-center pointer-events-none select-none overflow-hidden">
        <span className="font-brand font-black tracking-[0.3em] text-white/[0.025]" style={{ fontSize: "clamp(5rem, 16vw, 16rem)" }}>
          CONTENT IA
        </span>
      </div>

      <div className="relative z-10 w-full max-w-5xl mx-auto px-6 lg:px-8 pt-28 pb-16 text-center">
        <AnimatedSection>
          <div className="flex items-center justify-center gap-3 mb-8">
            <span className="w-8 h-px bg-gradient-to-r from-transparent to-neon-green/60" />
            <span className="w-1.5 h-1.5 rounded-full bg-neon-green animate-pulse" />
            <span className="text-xs font-display font-semibold tracking-[0.35em] uppercase text-neon-green/80">
              RESUELTO Academy · CONTENT IA SYSTEM
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-neon-purple/70 animate-pulse" />
            <span className="w-8 h-px bg-gradient-to-l from-transparent to-neon-purple/60" />
          </div>

          <h1 className="font-display font-extrabold tracking-tight leading-[0.95] mb-6 drop-shadow-[0_2px_30px_rgba(0,0,0,0.95)]" style={{ fontSize: "clamp(2.6rem, 6.5vw, 6.5rem)" }}>
            <span className="block text-cream">Crea contenido publicitario</span>
            <span className="block text-holo mt-1">cinematográfico con IA</span>
          </h1>

          <p className="font-body text-muted text-base md:text-xl max-w-2xl mx-auto mb-4 leading-relaxed">
            El sistema exacto que uso con marcas grandes para producir contenido que vende —
            estrategia, guión y producción cinematográfica. Sin estudio, sin equipo, sin agencia.
          </p>
          <p className="font-body text-cream/50 text-sm md:text-base max-w-xl mx-auto mb-10">
            No te enseño a apretar botones. Te enseño a dirigir la IA con el criterio de un director creativo.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a href={WA} target="_blank" rel="noopener noreferrer" className="btn-glow">
              Quiero entrar al programa
            </a>
            <a href="#programa" className="font-display font-semibold text-sm tracking-wide text-cream/70 hover:text-cream transition-colors border-b border-neon-green/30 pb-1">
              Ver el programa ↓
            </a>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}

function SocialProof() {
  return (
    <section className="relative py-12 px-4 border-y border-white/5" style={{ background: "var(--surface)" }}>
      <div className="max-w-5xl mx-auto text-center">
        <p className="text-xs font-display tracking-[0.2em] uppercase text-cream/35 mb-6">
          Sistema forjado trabajando con
        </p>
        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
          {brands.map((b) => (
            <span key={b} className="font-display font-semibold text-sm md:text-base text-cream/40">
              {b}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

function Problem() {
  return (
    <section className="relative section-padding overflow-hidden">
      <div className="container-base relative z-10">
        <AnimatedSection className="text-center mb-14">
          <span className="inline-flex items-center gap-2 text-xs font-display font-semibold tracking-[0.2em] uppercase text-neon-green mb-4">
            <span className="w-6 h-px bg-neon-green/50" /> El problema <span className="w-6 h-px bg-neon-green/50" />
          </span>
          <h2 className="font-display font-bold text-3xl lg:text-5xl tracking-tight">
            La IA no es el problema.<br /><span className="text-gradient-green">Es cómo la estás usando.</span>
          </h2>
        </AnimatedSection>
        <StaggerContainer className="grid md:grid-cols-2 gap-5 max-w-4xl mx-auto">
          {problems.map((p) => (
            <StaggerItem key={p.t}>
              <div className="card-base hud-corners p-7 h-full">
                <h3 className="font-display font-bold text-lg text-cream mb-2">{p.t}</h3>
                <p className="font-body text-muted text-sm leading-relaxed">{p.d}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}

function Solution() {
  return (
    <section className="relative section-padding overflow-hidden" style={{ background: "var(--surface)" }}>
      <div className="container-base relative z-10 max-w-4xl text-center">
        <AnimatedSection>
          <span className="inline-flex items-center gap-2 text-xs font-display font-semibold tracking-[0.2em] uppercase text-neon-purple mb-4">
            El mecanismo único
          </span>
          <h2 className="font-display font-bold text-3xl lg:text-5xl tracking-tight mb-6">
            El Cerebro Estratégico<br /><span className="text-holo">Creativo con IA</span>
          </h2>
          <p className="font-body text-muted text-base md:text-lg leading-relaxed mb-4">
            Nadie enseña a conceptualizar como director creativo <em>y</em> usar la IA en ese proceso.
            Los demás enseñan herramientas. Aquí aprendes el sistema completo de
            <span className="text-cream font-semibold"> pensamiento + producción</span>.
          </p>
          <p className="font-body text-cream/50 text-base">
            Un camino por el que metes cualquier marca y la sacas con contenido que vende.
          </p>
        </AnimatedSection>
      </div>
    </section>
  );
}

function ForWho() {
  return (
    <section className="relative section-padding overflow-hidden">
      <div className="container-base relative z-10 max-w-4xl">
        <AnimatedSection className="text-center mb-12">
          <h2 className="font-display font-bold text-3xl lg:text-5xl tracking-tight">
            ¿Esto es <span className="text-gradient-green">para ti?</span>
          </h2>
        </AnimatedSection>
        <StaggerContainer className="grid gap-4">
          {forWho.map((f) => (
            <StaggerItem key={f}>
              <div className="flex items-start gap-4 card-base p-5">
                <span className="text-neon-green text-lg flex-shrink-0 mt-0.5">✓</span>
                <p className="font-body text-cream/80 text-base">{f}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}

function Curriculum() {
  return (
    <section id="programa" className="relative section-padding overflow-hidden" style={{ background: "var(--surface)" }}>
      <div className="container-base relative z-10">
        <AnimatedSection className="text-center mb-14">
          <span className="inline-flex items-center gap-2 text-xs font-display font-semibold tracking-[0.2em] uppercase text-neon-green mb-4">
            <span className="w-6 h-px bg-neon-green/50" /> El programa <span className="w-6 h-px bg-neon-green/50" />
          </span>
          <h2 className="font-display font-bold text-3xl lg:text-5xl tracking-tight mb-4">
            8 módulos. Un sistema completo.
          </h2>
          <p className="font-body text-muted max-w-xl mx-auto">
            Del primer pensamiento estratégico hasta cerrar tu primer cliente. 12 semanas.
          </p>
        </AnimatedSection>
        <StaggerContainer className="grid md:grid-cols-2 gap-4 max-w-5xl mx-auto">
          {modules.map((m) => (
            <StaggerItem key={m.n}>
              <div className="card-base hud-corners p-6 flex gap-5 h-full">
                <span className="font-display font-black text-3xl text-gradient-green flex-shrink-0">{m.n}</span>
                <div>
                  <h3 className="font-display font-bold text-base text-cream mb-1">{m.t}</h3>
                  <p className="font-body text-muted text-sm leading-relaxed">{m.d}</p>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}

function Includes() {
  return (
    <section className="relative section-padding overflow-hidden">
      <div className="container-base relative z-10 max-w-3xl">
        <AnimatedSection className="text-center mb-12">
          <h2 className="font-display font-bold text-3xl lg:text-5xl tracking-tight">
            Lo que <span className="text-holo">incluye</span>
          </h2>
        </AnimatedSection>
        <StaggerContainer className="grid gap-3">
          {includes.map((i) => (
            <StaggerItem key={i}>
              <div className="flex items-center gap-4 card-base p-4">
                <span className="text-neon-green flex-shrink-0">✓</span>
                <p className="font-body text-cream/85 text-base">{i}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}

function Authority() {
  return (
    <section className="relative section-padding overflow-hidden" style={{ background: "var(--surface)" }}>
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[400px] h-[300px] rounded-full bg-neon-green/8 blur-[100px] pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[400px] h-[300px] rounded-full bg-neon-purple/10 blur-[100px] pointer-events-none" />
      <div className="container-base relative z-10">
        <AnimatedSection className="text-center mb-12 max-w-3xl mx-auto">
          <span className="inline-flex items-center gap-2 text-xs font-display font-semibold tracking-[0.2em] uppercase text-neon-green mb-4">
            <span className="w-6 h-px bg-neon-green/50" /> Quién te enseña <span className="w-6 h-px bg-neon-green/50" />
          </span>
          <h2 className="font-display font-bold text-3xl lg:text-5xl tracking-tight mb-5">
            Manuel Severo <span className="text-cream/40 font-normal text-2xl lg:text-3xl">· "Bubu"</span>
          </h2>
          <p className="font-body text-muted text-base lg:text-lg leading-relaxed">
            Director Creativo y fundador de Resuelto. Empecé editando a los 12 años. Pasé por
            Fahrenheit DDB, Quantico Films y TBWA Perú — donde fui premiado por marcas como Wong,
            BCP y Redondos. La IA no es mi punto de partida: es la herramienta que sumé a más de
            10 años de criterio en las grandes ligas.
          </p>
        </AnimatedSection>
        <StaggerContainer className="grid grid-cols-2 lg:grid-cols-4 gap-5 max-w-4xl mx-auto">
          {metrics.map((m, i) => (
            <StaggerItem key={m.l}>
              <div className="card-base hud-corners p-7 text-center h-full">
                <p className={`font-display font-bold mb-2 ${i % 2 === 0 ? "text-gradient-green" : "text-gradient"}`} style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)" }}>
                  {m.v}
                </p>
                <p className="text-sm font-body text-muted leading-snug">{m.l}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}

function Pricing() {
  return (
    <section id="precio" className="relative section-padding overflow-hidden">
      <div className="container-base relative z-10">
        <AnimatedSection className="text-center mb-14">
          <span className="inline-flex items-center gap-2 text-xs font-display font-semibold tracking-[0.2em] uppercase text-neon-green mb-4">
            <span className="w-6 h-px bg-neon-green/50" /> Inversión <span className="w-6 h-px bg-neon-green/50" />
          </span>
          <h2 className="font-display font-bold text-3xl lg:text-5xl tracking-tight">
            Elige tu nivel de acceso
          </h2>
        </AnimatedSection>
        <div className="grid md:grid-cols-3 gap-5 max-w-5xl mx-auto items-stretch">
          {tiers.map((t) => (
            <div
              key={t.name}
              className={`card-base p-8 flex flex-col relative ${t.featured ? "hud-corners" : ""}`}
              style={t.featured ? { borderColor: "rgba(26,128,255,0.4)", boxShadow: "0 0 50px rgba(26,128,255,0.12)" } : {}}
            >
              {t.featured && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-[0.65rem] font-display font-bold tracking-widest uppercase px-3 py-1 rounded-full text-bg" style={{ background: "linear-gradient(135deg,#1A80FF,#4D9FFF)" }}>
                  Más popular
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
              <a href={WA} target="_blank" rel="noopener noreferrer" className={t.featured ? "btn-glow w-full" : "font-display font-semibold text-sm tracking-wide text-center py-3 rounded-full border border-neon-green/30 text-cream/80 hover:border-neon-green/60 transition-colors"}>
                {t.featured ? "Quiero entrar" : "Más info"}
              </a>
            </div>
          ))}
        </div>
        <AnimatedSection className="text-center mt-8">
          <p className="font-body text-cream/40 text-sm">
            Garantía: si no logras aplicar el sistema, te quedas en el programa hasta que completes tu objetivo.
          </p>
        </AnimatedSection>
      </div>
    </section>
  );
}

function FAQSection() {
  return (
    <section className="relative section-padding overflow-hidden" style={{ background: "var(--surface)" }}>
      <div className="container-base relative z-10 max-w-3xl">
        <AnimatedSection className="text-center mb-14">
          <span className="inline-flex items-center gap-2 text-xs font-display font-semibold tracking-[0.2em] uppercase text-neon-green mb-4">
            Preguntas frecuentes
          </span>
          <h2 className="font-display font-bold text-3xl lg:text-4xl tracking-tight">
            Lo que suelen preguntar
          </h2>
        </AnimatedSection>
        <FAQAccordion items={faqItems} />
        <div className="text-center mt-8">
          <a href={WA} target="_blank" rel="noopener noreferrer" className="font-display font-semibold text-sm text-neon-green border-b border-neon-green/35 pb-0.5">
            ¿Otra pregunta? Escríbeme por WhatsApp →
          </a>
        </div>
      </div>
    </section>
  );
}

function FinalCTA() {
  return (
    <section className="relative section-padding overflow-hidden">
      <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(26,128,255,0.08) 0%, transparent 70%)" }} />
      <div className="container-base relative z-10 max-w-3xl text-center">
        <AnimatedSection>
          <h2 className="font-display font-extrabold text-3xl lg:text-6xl tracking-tight mb-6">
            El contenido con IA<br /><span className="text-holo">ya es el presente</span>
          </h2>
          <p className="font-body text-muted text-base md:text-lg mb-10 max-w-xl mx-auto">
            La pregunta es de qué lado vas a estar: de los que aprietan botones sin criterio,
            o de los que dirigen la IA como profesionales. Te espero adentro.
          </p>
          <a href={WA} target="_blank" rel="noopener noreferrer" className="btn-glow">
            Quiero entrar al CONTENT IA SYSTEM
          </a>
          <p className="font-body text-cream/30 text-xs mt-6">
            Cupos limitados por cohorte · Sin compromiso, solo una conversación.
          </p>
        </AnimatedSection>
      </div>
    </section>
  );
}

// ─── PAGE ────────────────────────────────────────────────────────────────────

export default function AcademyPage() {
  return (
    <main className="relative overflow-hidden" style={{ background: "var(--bg)", minHeight: "100vh" }}>
      <Navbar minimal />
      <Hero />
      <SocialProof />
      <Problem />
      <Solution />
      <ForWho />
      <Curriculum />
      <Includes />
      <Authority />
      <Pricing />
      <FAQSection />
      <FinalCTA />
      <Footer />
    </main>
  );
}
