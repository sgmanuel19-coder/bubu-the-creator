import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import {
  Bot,
  Clock,
  Users,
  TrendingUp,
  Phone,
  Calendar,
  MessageCircle,
  Zap,
  Shield,
  ArrowRight,
  Stethoscope,
  Home,
  Scale,
  GraduationCap,
  Heart,
  Building2,
  Wifi,
  Briefcase,
  CheckCircle2,
  X,
  ShieldCheck,
} from 'lucide-react';
import FAQAccordion from '@/components/ui/faq-accordion';
import {
  HeroClient,
  PricingClient,
  TestimonialsClient,
  AnimatedTextClient,
  AnimatedMetricsStrip,
} from '@/components/SistemasIAClient';
import {
  VSLSectionIA,
  HowItWorksAnimated,
  IndustriesSectionAnimated,
  IntegrationsStrip,
} from '@/components/SistemasIAAnimated';
import { SistemasIAProblems } from '@/components/SistemasIAProblems';
import { CelestialOrrery } from '@/components/ui/celestial-orrery';
import { DottedSurface } from '@/components/ui/dotted-surface';

export const metadata: Metadata = {
  title: 'Sistema Express de Atencion con IA | RESUELTO',
  description:
    'Instalo un sistema que responde, filtra y agenda automaticamente. Para empresas que reciben mensajes por WhatsApp e Instagram.',
  openGraph: {
    title: 'Sistema Express de Atencion con IA | RESUELTO',
    description:
      'Instalo un sistema que responde, filtra y agenda automaticamente. Para empresas que reciben mensajes por WhatsApp e Instagram.',
  },
};

// ─── DATA ─────────────────────────────────────────────────────────────────────

const WA_LINK =
  'https://wa.me/51907462070?text=Hola,%20quiero%20info%20sobre%20el%20Sistema%20Express%20de%20IA';

const problems = [
  {
    icon: Clock,
    title: 'Demoran en responder',
    description:
      'Pierden leads en los primeros minutos. El prospecto pregunta, nadie contesta rapido, y ya se fue con la competencia.',
  },
  {
    icon: Users,
    title: 'Leads se pierden por desorden',
    description:
      'Mensajes enterrados en el chat. Nadie hace seguimiento. Los prospectos calientes se enfrian sin que nadie lo note.',
  },
  {
    icon: MessageCircle,
    title: 'El equipo responde distinto',
    description:
      'Sin guion ni criterio. Cada vendedor improvisa y la calidad de la atencion depende del humor del dia.',
  },
  {
    icon: Shield,
    title: 'No filtran prospectos',
    description:
      'Pierden horas con curiosos que nunca van a comprar. Sin un sistema de calificacion, todo el mundo parece un lead.',
  },
  {
    icon: Calendar,
    title: 'Agendar les quita horas',
    description:
      'El vaiven de mensajes para coordinar una cita consume tiempo valioso que deberia dedicarse a cerrar ventas.',
  },
  {
    icon: Bot,
    title: 'Preguntan siempre lo mismo',
    description:
      'Las mismas 10 preguntas todos los dias. El equipo las responde manualmente, una por una, sin parar.',
  },
];

const steps = [
  {
    number: '01',
    title: 'Diagnostico',
    description:
      'Mapeamos tu flujo actual, tus preguntas frecuentes y los puntos donde se pierden mas leads. Sin supuestos.',
  },
  {
    number: '02',
    title: 'Configuracion',
    description:
      'Armamos las respuestas automaticas, el filtro de calificacion y el enlace de calendario integrado a tu proceso real.',
  },
  {
    number: '03',
    title: 'Activacion',
    description:
      'En 5 a 10 dias habiles tu sistema esta funcionando. No entrego archivos — entrego un sistema encendido.',
  },
];

const industries = [
  { icon: Building2, label: 'Empresas técnicas e industriales' },
  { icon: Wifi, label: 'Telecomunicaciones y tecnología' },
  { icon: Zap, label: 'Energía e ingeniería' },
  { icon: Briefcase, label: 'Consultoras y startups B2B' },
  { icon: Stethoscope, label: 'Clínicas estéticas y salud' },
  { icon: Home, label: 'Inmobiliarias' },
  { icon: Scale, label: 'Estudios legales' },
  { icon: GraduationCap, label: 'Institutos y educación' },
  { icon: TrendingUp, label: 'Empresas con pauta Meta' },
  { icon: Heart, label: 'Odontología y salud' },
];

const G = ({ children }: { children: React.ReactNode }) => (
  <span style={{ color: '#1A80FF', fontWeight: 600 }}>{children}</span>
);

const faqItems: { question: string; answer: React.ReactNode }[] = [
  {
    question: '¿Necesito saber programar para usar el sistema?',
    answer: <>No. El sistema lo configuro yo <G>de principio a fin</G>. Tú solo defines cómo quieres responder y yo lo armo. Al final te entrego <G>acceso y un video explicando cómo funciona</G>.</>,
  },
  {
    question: '¿En cuánto tiempo está listo?',
    answer: <>Entre <G>5 y 10 días hábiles</G> desde que iniciamos. Depende del plan y la complejidad de tu flujo. El plan Base suele estar listo <G>en 5 días</G>.</>,
  },
  {
    question: '¿Funciona con WhatsApp Business o el personal?',
    answer: <>Funciona con <G>WhatsApp Business API</G>, que es la versión para empresas con mayor capacidad. Si todavía no la tienes, te guío en el proceso de activación — que es más rápido de lo que parece.</>,
  },
  {
    question: '¿Qué pasa si el lead hace una pregunta que no está programada?',
    answer: <>El sistema tiene un <G>flujo de derivación a humano</G>. Si el prospecto hace una pregunta fuera del libreto, el sistema le avisa que un asesor lo contactará pronto y <G>te notifica de inmediato</G> para que respondas tú.</>,
  },
  {
    question: '¿Puedo cambiar los mensajes después?',
    answer: <>Sí. Tienes <G>acceso completo a la plataforma</G> y puedes editar textos cuando quieras. Además, en los <G>30 días de soporte incluido</G> te ayudo con cualquier ajuste que necesites.</>,
  },
];

// ─── SECTIONS ─────────────────────────────────────────────────────────────────

function SocialProofBar() {
  const industryNames = [
    'Empresas Técnicas B2B',
    'Telecomunicaciones',
    'Energía e Ingeniería',
    'Consultoras y Startups',
    'Clínicas Estéticas',
    'Inmobiliarias',
    'Estudios Legales',
    'Institutos Educativos',
    'Agencias con Pauta',
    'Odontología y Salud',
  ];

  return (
    <div
      className="w-full py-6 px-4"
      style={{
        background: 'rgba(26,128,255,0.04)',
        borderTop: '1px solid rgba(26,128,255,0.1)',
        borderBottom: '1px solid rgba(26,128,255,0.1)',
      }}
    >
      <p
        className="text-center text-xs font-semibold tracking-widest uppercase mb-4"
        style={{ color: 'rgba(248,248,242,0.35)', fontFamily: 'Poppins, sans-serif' }}
      >
        Sectores que ya tienen su sistema activo
      </p>
      <div className="flex flex-wrap justify-center gap-x-8 gap-y-2">
        {industryNames.map((name) => (
          <span
            key={name}
            className="text-sm"
            style={{ color: 'rgba(248,248,242,0.45)', fontFamily: 'Inter, sans-serif' }}
          >
            {name}
          </span>
        ))}
      </div>
    </div>
  );
}

function ProblemsSection() {
  return (
    <section className="py-20 px-4 relative" style={{ background: '#040406' }}>
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background:
            'linear-gradient(90deg, transparent, rgba(77,159,255,0.3), transparent)',
        }}
      />
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <span
            className="inline-block text-xs font-semibold tracking-widest uppercase mb-4"
            style={{ color: '#4D9FFF', fontFamily: 'Poppins, sans-serif' }}
          >
            El problema real
          </span>
          <h2
            className="text-3xl md:text-5xl font-bold tracking-tight"
            style={{ color: '#f8f8f2', fontFamily: 'Poppins, sans-serif' }}
          >
            Tu equipo pierde leads
            <br />
            <span style={{ color: '#4D9FFF' }}>todos los dias</span>
          </h2>
          <p
            className="mt-4 max-w-xl mx-auto text-base"
            style={{ color: 'rgba(248,248,242,0.55)', fontFamily: 'Inter, sans-serif' }}
          >
            No porque sean malos vendedores. Sino porque no tienen un sistema que trabaje cuando
            ellos no pueden.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {problems.map((problem) => {
            const Icon = problem.icon;
            return (
              <div
                key={problem.title}
                className="rounded-2xl p-6 border"
                style={{
                  background: 'rgba(255,255,255,0.025)',
                  borderColor: 'rgba(77,159,255,0.15)',
                }}
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                  style={{ background: 'rgba(77,159,255,0.12)' }}
                >
                  <Icon className="w-5 h-5" style={{ color: '#4D9FFF' }} />
                </div>
                <h3
                  className="font-semibold text-base mb-2"
                  style={{ color: '#f8f8f2', fontFamily: 'Poppins, sans-serif' }}
                >
                  {problem.title}
                </h3>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: 'rgba(248,248,242,0.55)', fontFamily: 'Inter, sans-serif' }}
                >
                  {problem.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function HowItWorksSection() {
  return (
    <section
      className="py-20 px-4 relative"
      style={{ background: 'rgba(26,128,255,0.02)' }}
    >
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background:
            'linear-gradient(90deg, transparent, rgba(26,128,255,0.2), transparent)',
        }}
      />
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-14">
          <span
            className="inline-block text-xs font-semibold tracking-widest uppercase mb-4"
            style={{ color: '#1A80FF', fontFamily: 'Poppins, sans-serif' }}
          >
            Como funciona
          </span>
          <h2
            className="text-3xl md:text-5xl font-bold tracking-tight"
            style={{ color: '#f8f8f2', fontFamily: 'Poppins, sans-serif' }}
          >
            3 pasos. Sin complicaciones.
          </h2>
        </div>

        <div className="flex flex-col md:flex-row gap-8 relative">
          {steps.map((step, i) => (
            <div key={step.number} className="flex-1 text-center relative">
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4"
                style={{
                  background: 'rgba(26,128,255,0.1)',
                  border: '1px solid rgba(26,128,255,0.25)',
                }}
              >
                <span
                  className="text-2xl font-bold"
                  style={{ color: '#1A80FF', fontFamily: 'Poppins, sans-serif' }}
                >
                  {step.number}
                </span>
              </div>
              <h3
                className="font-bold text-lg mb-2"
                style={{ color: '#f8f8f2', fontFamily: 'Poppins, sans-serif' }}
              >
                {step.title}
              </h3>
              <p
                className="text-sm leading-relaxed"
                style={{ color: 'rgba(248,248,242,0.55)', fontFamily: 'Inter, sans-serif' }}
              >
                {step.description}
              </p>
              {i < steps.length - 1 && (
                <div
                  className="md:hidden flex justify-center mt-6 mb-2"
                  style={{ color: 'rgba(26,128,255,0.4)' }}
                >
                  <ArrowRight className="w-5 h-5 rotate-90" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function PricingSection() {
  return (
    <section id="paquetes" className="py-20 px-4 relative" style={{ background: '#040406' }}>
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background:
            'linear-gradient(90deg, transparent, rgba(26,128,255,0.15), transparent)',
        }}
      />
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <span
            className="inline-block text-xs font-semibold tracking-widest uppercase mb-4"
            style={{ color: '#1A80FF', fontFamily: 'Poppins, sans-serif' }}
          >
            Planes
          </span>
          <h2
            className="text-3xl md:text-5xl font-bold tracking-tight mb-4"
            style={{ color: '#f8f8f2', fontFamily: 'Poppins, sans-serif' }}
          >
            Elige el nivel
            <br />
            que necesita tu negocio
          </h2>
          <p
            className="max-w-lg mx-auto text-base"
            style={{ color: 'rgba(248,248,242,0.5)', fontFamily: 'Inter, sans-serif' }}
          >
            Todos los planes incluyen 30 dias de soporte y un video de entrega explicando cada
            parte del sistema.
          </p>
        </div>

        <PricingClient />
      </div>
    </section>
  );
}

function IndustriesSection() {
  return (
    <section
      className="py-20 px-4 relative"
      style={{ background: 'rgba(77,159,255,0.03)' }}
    >
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background:
            'linear-gradient(90deg, transparent, rgba(77,159,255,0.2), transparent)',
        }}
      />
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-14">
          <span
            className="inline-block text-xs font-semibold tracking-widest uppercase mb-4"
            style={{ color: '#4D9FFF', fontFamily: 'Poppins, sans-serif' }}
          >
            Para quien es
          </span>
          <h2
            className="text-3xl md:text-5xl font-bold tracking-tight"
            style={{ color: '#f8f8f2', fontFamily: 'Poppins, sans-serif' }}
          >
            Si recibes mensajes
            <span style={{ color: '#4D9FFF' }}> y los pierdes</span>,
            <br />
            esto es para ti.
          </h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {industries.map(({ icon: Icon, label }) => (
            <div
              key={label}
              className="rounded-2xl p-6 border text-center"
              style={{
                background: 'rgba(255,255,255,0.025)',
                borderColor: 'rgba(255,255,255,0.08)',
                transition: 'border-color 0.2s, background 0.2s',
              }}
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3"
                style={{ background: 'rgba(26,128,255,0.08)' }}
              >
                <Icon className="w-6 h-6" style={{ color: '#1A80FF' }} />
              </div>
              <p
                className="text-sm font-semibold"
                style={{ color: '#f8f8f2', fontFamily: 'Poppins, sans-serif' }}
              >
                {label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function TestimonialsSection() {
  return (
    <section
      className="py-20 px-4 relative overflow-hidden"
      style={{
        background:
          'linear-gradient(180deg, rgba(77,159,255,0.05) 0%, rgba(6,6,8,1) 100%)',
      }}
    >
      <DottedSurface />
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-14">
          <span
            className="inline-block text-xs font-semibold tracking-widest uppercase mb-4"
            style={{ color: '#4D9FFF', fontFamily: 'Poppins, sans-serif' }}
          >
            Clientes
          </span>
          <h2
            className="text-3xl md:text-5xl font-bold tracking-tight"
            style={{ color: '#f8f8f2', fontFamily: 'Poppins, sans-serif' }}
          >
            Lo que dicen quienes
            <br />
            <span style={{ color: '#4D9FFF' }}>ya tienen su sistema</span>
          </h2>
          <p
            className="mt-3 text-sm"
            style={{ color: 'rgba(248,248,242,0.4)', fontFamily: 'Inter, sans-serif' }}
          >
            Arrastra para ver mas testimonios
          </p>
        </div>

        <TestimonialsClient />
      </div>
    </section>
  );
}

function FAQSection() {
  return (
    <section className="py-20 px-4 relative" style={{ background: '#040406' }}>
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background:
            'linear-gradient(90deg, transparent, rgba(26,128,255,0.15), transparent)',
        }}
      />
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-14">
          <span
            className="inline-block text-xs font-semibold tracking-widest uppercase mb-4"
            style={{ color: '#1A80FF', fontFamily: 'Poppins, sans-serif' }}
          >
            Preguntas frecuentes
          </span>
          <h2
            className="text-3xl md:text-4xl font-bold tracking-tight"
            style={{ color: '#f8f8f2', fontFamily: 'Poppins, sans-serif' }}
          >
            Lo que suelen preguntar
          </h2>
        </div>

        <FAQAccordion items={faqItems} />

        <div style={{ marginTop: 32, textAlign: 'center' }}>
          <a
            href={WA_LINK}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 6,
              fontFamily: 'Poppins, sans-serif', fontWeight: 600,
              fontSize: '0.875rem', color: '#1A80FF',
              borderBottom: '1px solid rgba(26,128,255,0.35)',
              paddingBottom: 2, textDecoration: 'none',
            }}
          >
            ¿Otra pregunta? Escríbeme por WhatsApp →
          </a>
        </div>
      </div>
    </section>
  );
}

// ─── Bot Screenshots ──────────────────────────────────────────────────────────

function BotScreenshotsSection() {
  const screens = [
    {
      label: 'Calificación inteligente',
      tag: 'Paso 01',
      body: 'El bot pregunta, entiende el contexto y clasifica al lead antes de que tu equipo intervenga.',
      img: '/images/bot-screenshot-calificacion.png',
      accent: '0,255,135',
    },
    {
      label: 'Agendamiento automático',
      tag: 'Paso 02',
      body: 'El prospecto elige horario, el sistema confirma y bloquea la agenda. Cero coordinación manual.',
      img: '/images/bot-screenshot-agenda.png',
      accent: '204,68,255',
    },
    {
      label: 'Seguimiento sin esfuerzo',
      tag: 'Paso 03',
      body: 'Leads silenciosos reciben follow-up en el momento justo. El sistema trabaja cuando tú no puedes.',
      img: '/images/bot-screenshot-seguimiento.png',
      accent: '0,212,255',
    },
  ];

  return (
    <section className="py-20 px-4 relative overflow-hidden" style={{ background: '#040406' }}>
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(26,128,255,0.2), transparent)' }} />
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at 50% 50%, rgba(26,128,255,0.04) 0%, transparent 65%)' }} />

      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase mb-4" style={{ color: '#1A80FF', fontFamily: 'Poppins, sans-serif' }}>
            <span style={{ width: 20, height: 1, background: 'rgba(26,128,255,0.5)', display: 'inline-block' }} />
            El sistema en acción
            <span style={{ width: 20, height: 1, background: 'rgba(26,128,255,0.5)', display: 'inline-block' }} />
          </span>
          <h2 className="font-bold tracking-tight" style={{ fontFamily: 'Poppins, sans-serif', fontSize: 'clamp(1.75rem, 5vw, 3rem)', color: '#f8f8f2', lineHeight: 1.1 }}>
            Así lo ve tu cliente.<br />
            <span style={{ color: '#1A80FF' }}>Así lo ve tu equipo.</span>
          </h2>
          <p className="mt-4 max-w-lg mx-auto text-sm" style={{ color: 'rgba(248,248,242,0.5)', fontFamily: 'Inter, sans-serif' }}>
            Capturas del sistema funcionando: calificación, agendamiento y seguimiento automático.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {screens.map((s, i) => (
            <div key={i} className="flex flex-col rounded-2xl overflow-hidden" style={{ border: `1px solid rgba(${s.accent},0.18)`, background: `rgba(${s.accent},0.025)` }}>
              {/* Phone mockup */}
              <div className="relative mx-auto mt-6" style={{ width: 190, height: 340, borderRadius: 24, background: '#111', border: `2px solid rgba(${s.accent},0.3)`, overflow: 'hidden', boxShadow: `0 0 40px rgba(${s.accent},0.12)` }}>
                {/* Status bar */}
                <div className="flex items-center justify-between px-3 pt-2 pb-1" style={{ background: '#1a1a1a', fontSize: '0.55rem', color: 'rgba(248,248,242,0.4)', fontFamily: 'Inter, sans-serif' }}>
                  <span>9:41</span>
                  <span style={{ width: 40, height: 3, background: `rgba(${s.accent},0.6)`, borderRadius: 999, display: 'inline-block' }} />
                  <span>●●●</span>
                </div>
                {/* WA header */}
                <div className="flex items-center gap-2 px-3 py-2" style={{ background: '#075E54' }}>
                  <div style={{ width: 22, height: 22, borderRadius: '50%', background: `rgba(${s.accent},0.3)`, border: `1px solid rgba(${s.accent},0.5)` }} />
                  <div>
                    <p style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: '0.6rem', color: '#f8f8f2' }}>Bot Comercial IA</p>
                    <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.5rem', color: 'rgba(248,248,242,0.6)' }}>en línea</p>
                  </div>
                </div>
                {/* Screenshot area */}
                <div style={{ position: 'relative', flex: 1, background: '#0d1117', minHeight: 260 }}>
                  {/* Placeholder — reemplazar con <Image> cuando tengas los screenshots en /public/images/ */}
                  <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 8, padding: 12 }}>
                    <div style={{ width: 32, height: 32, borderRadius: '50%', background: `rgba(${s.accent},0.15)`, border: `1px solid rgba(${s.accent},0.4)`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Bot style={{ width: 14, height: 14, color: `rgb(${s.accent})` }} />
                    </div>
                    <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.5rem', color: `rgba(${s.accent},0.7)`, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', textAlign: 'center' }}>PENDIENTE</p>
                    <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.48rem', color: 'rgba(248,248,242,0.3)', lineHeight: 1.4, textAlign: 'center' }}>Subir screenshot<br />del bot en acción</p>
                  </div>
                </div>
              </div>
              {/* Caption */}
              <div className="p-5 mt-2">
                <span style={{ display: 'inline-block', fontFamily: 'Poppins, sans-serif', fontWeight: 700, fontSize: '0.6rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: `rgba(${s.accent},0.8)`, marginBottom: 6 }}>{s.tag}</span>
                <h3 style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700, fontSize: '1rem', color: '#f8f8f2', marginBottom: 6, lineHeight: 1.25 }}>{s.label}</h3>
                <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.8rem', color: 'rgba(248,248,242,0.5)', lineHeight: 1.6 }}>{s.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(26,128,255,0.15), transparent)' }} />
    </section>
  );
}

// ─── Vs Simple Bot ────────────────────────────────────────────────────────────

const vsRows = [
  { feature: 'Responde preguntas',        simple: 'Respuestas fijas predefinidas',          resuelto: 'Entiende contexto y adapta la respuesta con IA' },
  { feature: 'Calificación de leads',     simple: 'No filtra — todo parece un lead',        resuelto: 'Identifica interés, presupuesto y urgencia real' },
  { feature: 'Integración de agenda',     simple: 'Sin integración',                        resuelto: 'Agenda directo en Google Calendar o Calendly' },
  { feature: 'Seguimiento automático',    simple: 'Se detiene si no responden',             resuelto: 'Secuencias hasta el cierre sin intervención humana' },
  { feature: 'Entrenamiento',            simple: 'Genérico, igual para todos',             resuelto: 'Entrenado con la lógica y el lenguaje de tu negocio' },
  { feature: 'Implementación',           simple: 'Tú lo configuras solo',                  resuelto: 'Done-For-You + soporte 30 días incluido' },
  { feature: 'Registro de leads',         simple: 'Sin historial ni memoria',               resuelto: 'Integración a Sheets, CRM o Notion en tiempo real' },
  { feature: 'Prospección outbound',      simple: 'No incluye',                             resuelto: 'Cold Email disponible desde el plan Plus' },
];

function VsSimpleBotSection() {
  return (
    <section className="py-20 px-4 relative overflow-hidden" style={{ background: 'rgba(26,128,255,0.015)' }}>
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(26,128,255,0.2), transparent)' }} />

      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase mb-4" style={{ color: '#1A80FF', fontFamily: 'Poppins, sans-serif' }}>
            <span style={{ width: 20, height: 1, background: 'rgba(26,128,255,0.5)', display: 'inline-block' }} />
            El diferencial
            <span style={{ width: 20, height: 1, background: 'rgba(26,128,255,0.5)', display: 'inline-block' }} />
          </span>
          <h2 className="font-bold tracking-tight" style={{ fontFamily: 'Poppins, sans-serif', fontSize: 'clamp(1.75rem, 5vw, 3rem)', color: '#f8f8f2', lineHeight: 1.1 }}>
            No es un chatbot genérico.<br />
            <span style={{ color: '#1A80FF' }}>Es un sistema comercial.</span>
          </h2>
          <p className="mt-4 max-w-lg mx-auto text-sm" style={{ color: 'rgba(248,248,242,0.5)', fontFamily: 'Inter, sans-serif' }}>
            Un bot simple responde mensajes. Este sistema califica, agenda, hace seguimiento y prospecta — sin intervención humana.
          </p>
        </div>

        <div className="rounded-2xl overflow-hidden" style={{ border: '1px solid rgba(255,255,255,0.08)' }}>
          {/* Header */}
          <div className="grid grid-cols-3" style={{ background: 'rgba(255,255,255,0.04)', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
            <div className="py-4 px-4">
              <span style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600, fontSize: '0.65rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(248,248,242,0.35)' }}>Función</span>
            </div>
            <div className="py-4 px-4 flex items-center justify-center" style={{ borderLeft: '1px solid rgba(255,255,255,0.06)' }}>
              <span style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700, fontSize: '0.75rem', color: 'rgba(248,248,242,0.4)' }}>Bot genérico</span>
            </div>
            <div className="py-4 px-4 flex items-center justify-center" style={{ borderLeft: '1px solid rgba(26,128,255,0.2)', background: 'rgba(26,128,255,0.06)' }}>
              <span style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700, fontSize: '0.75rem', color: '#1A80FF' }}>RESUELTO Sistema IA</span>
            </div>
          </div>
          {vsRows.map((row, i) => (
            <div key={i} className="grid grid-cols-3" style={{ borderBottom: i < vsRows.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none', background: i % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.01)' }}>
              <div className="py-3 px-4 flex items-center" style={{ borderRight: '1px solid rgba(255,255,255,0.06)' }}>
                <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.8rem', color: 'rgba(248,248,242,0.7)', fontWeight: 500 }}>{row.feature}</span>
              </div>
              <div className="py-3 px-4 flex items-start gap-2" style={{ borderRight: '1px solid rgba(26,128,255,0.1)' }}>
                <X style={{ width: 13, height: 13, color: 'rgba(255,80,80,0.7)', flexShrink: 0, marginTop: 2 }} />
                <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.75rem', color: 'rgba(248,248,242,0.38)' }}>{row.simple}</span>
              </div>
              <div className="py-3 px-4 flex items-start gap-2" style={{ background: 'rgba(26,128,255,0.03)' }}>
                <CheckCircle2 style={{ width: 13, height: 13, color: '#1A80FF', flexShrink: 0, marginTop: 2 }} />
                <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.75rem', color: 'rgba(248,248,242,0.75)' }}>{row.resuelto}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(26,128,255,0.15), transparent)' }} />
    </section>
  );
}

// ─── Guarantee Section ────────────────────────────────────────────────────────

function GuaranteeSection() {
  return (
    <section className="py-20 px-4 relative overflow-hidden" style={{ background: '#040406' }}>
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(26,128,255,0.2), transparent)' }} />

      <div className="max-w-3xl mx-auto">
        <div className="rounded-3xl p-8 md:p-12 text-center relative overflow-hidden" style={{ background: 'rgba(26,128,255,0.04)', border: '1px solid rgba(26,128,255,0.18)' }}>
          <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(26,128,255,0.1) 0%, transparent 60%)' }} />
          <div className="relative z-10 w-16 h-16 mx-auto mb-6 flex items-center justify-center rounded-2xl" style={{ background: 'rgba(26,128,255,0.1)', border: '1px solid rgba(26,128,255,0.3)', boxShadow: '0 0 40px rgba(26,128,255,0.15)' }}>
            <ShieldCheck style={{ width: 32, height: 32, color: '#1A80FF' }} />
          </div>
          <span className="relative z-10 inline-block text-xs font-semibold tracking-widest uppercase mb-4" style={{ color: '#1A80FF', fontFamily: 'Poppins, sans-serif' }}>
            Garantía total
          </span>
          <h2 className="relative z-10 font-bold mb-4" style={{ fontFamily: 'Poppins, sans-serif', fontSize: 'clamp(1.5rem, 4vw, 2.25rem)', color: '#f8f8f2', lineHeight: 1.2 }}>
            Si en 30 días el sistema no funciona como acordamos — te devolvemos el 100%.
          </h2>
          <p className="relative z-10 mb-8 max-w-xl mx-auto" style={{ fontFamily: 'Inter, sans-serif', fontSize: '1rem', color: 'rgba(248,248,242,0.6)', lineHeight: 1.65 }}>
            Sin preguntas. Sin letra chica. Sin excusas. El sistema se entrega funcionando o devolvemos la inversión completa. El riesgo es nuestro — no tuyo.
          </p>
          <div className="relative z-10 flex flex-col sm:flex-row gap-4 justify-center text-left max-w-xl mx-auto">
            {[
              '30 días para validar el sistema en tu negocio real',
              'Devolución completa si no cumple el alcance acordado',
              'Sin contratos de permanencia ni cláusulas ocultas',
            ].map((item) => (
              <div key={item} className="flex items-start gap-2 flex-1">
                <CheckCircle2 style={{ width: 15, height: 15, color: '#1A80FF', flexShrink: 0, marginTop: 2 }} />
                <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.8rem', color: 'rgba(248,248,242,0.65)' }}>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(26,128,255,0.15), transparent)' }} />
    </section>
  );
}

// ─── Final CTA ────────────────────────────────────────────────────────────────

function FinalCTASection() {
  return (
    <section
      className="py-24 px-4 relative overflow-hidden"
      style={{
        background:
          'linear-gradient(135deg, rgba(26,128,255,0.06) 0%, rgba(6,6,8,1) 40%, rgba(77,159,255,0.06) 100%)',
      }}
    >
      <CelestialOrrery />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 60% 50% at 20% 50%, rgba(26,128,255,0.07) 0%, transparent 70%), radial-gradient(ellipse 60% 50% at 80% 50%, rgba(77,159,255,0.07) 0%, transparent 70%)',
        }}
      />

      <div className="relative z-10 max-w-3xl mx-auto text-center">
        <h2
          className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4"
          style={{ color: '#f8f8f2', fontFamily: 'Poppins, sans-serif' }}
        >
          Sistema instalado en 5 días.
          <br />
          <span style={{ color: '#1A80FF' }}>Leads respondidos solos.</span>
        </h2>

        <p
          className="text-base md:text-lg mb-6 max-w-xl mx-auto"
          style={{ color: 'rgba(248,248,242,0.6)', fontFamily: 'Inter, sans-serif' }}
        >
          Cada hora sin sistema es un prospecto que se fue con la competencia. El costo de no hacer nada es mayor que el costo del sistema.
        </p>

        {/* Checklist */}
        <ul className="inline-flex flex-col gap-3 text-left mb-8">
          {[
            'Sistema instalado en 5-10 días hábiles',
            '30 días de soporte incluido sin costo adicional',
            'Sin contratos ni mensualidades forzadas',
          ].map((item) => (
            <li key={item} className="flex items-center gap-3">
              <span style={{ color: '#1A80FF', fontSize: '1rem', flexShrink: 0 }}>✓</span>
              <span style={{ fontFamily: 'Inter, sans-serif', color: 'rgba(248,248,242,0.8)', fontSize: '0.9rem' }}>
                {item}
              </span>
            </li>
          ))}
        </ul>

        <AnimatedTextClient
          text="Sin contratos. Sin esperas."
          textClassName="text-xl md:text-2xl font-bold"
        />

        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
          <a
            href={WA_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-10 py-4 rounded-xl font-bold text-base transition-all duration-300 hover:scale-105"
            style={{
              background: '#1A80FF',
              color: '#040406',
              fontFamily: 'Poppins, sans-serif',
              boxShadow: '0 0 30px rgba(26,128,255,0.3)',
            }}
          >
            <Phone className="w-5 h-5" />
            Quiero mi sistema ahora
          </a>
        </div>

        <p
          className="mt-6 text-xs"
          style={{ color: 'rgba(248,248,242,0.3)', fontFamily: 'Inter, sans-serif' }}
        >
          Sin compromiso. Solo una conversacion para ver si tiene sentido.
        </p>
      </div>
    </section>
  );
}

// ─── PAGE ─────────────────────────────────────────────────────────────────────

export default function SistemasIAPage() {
  return (
    <main style={{ background: '#040406', minHeight: '100vh', color: '#f8f8f2' }}>
      <Navbar />
      <HeroClient />
      <AnimatedMetricsStrip />
      <VSLSectionIA />
      <BotScreenshotsSection />
      <SistemasIAProblems />
      <HowItWorksAnimated steps={steps} />
      <IntegrationsStrip />
      <PricingSection />
      <VsSimpleBotSection />
      <IndustriesSectionAnimated />
      <TestimonialsSection />
      <GuaranteeSection />
      <FAQSection />
      <FinalCTASection />
    </main>
  );
}
