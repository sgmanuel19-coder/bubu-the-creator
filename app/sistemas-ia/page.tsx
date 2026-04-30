import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import FacebookPixel from '@/components/FacebookPixel';
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
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react';
import FAQAccordion from '@/components/ui/faq-accordion';
import {
  HeroClient,
  PricingClient,
  TestimonialsClient,
  AnimatedTextClient,
  AnimatedMetricsStrip,
  SocialProofBarAnimated,
} from '@/components/SistemasIAClient';
import {
  VSLSectionIA,
  HowItWorksAnimated,
  IndustriesSectionAnimated,
  IntegrationsStrip,
  VsSimpleBotSectionAnimated,
  ChatDemoSectionAnimated,
} from '@/components/SistemasIAAnimated';
import { SistemasIAProblems } from '@/components/SistemasIAProblems';
import { CelestialOrrery } from '@/components/ui/celestial-orrery';
import { DottedSurface } from '@/components/ui/dotted-surface';
import { SchemaMarkup } from '@/components/SchemaMarkup';
import { FloatingCTA } from '@/components/ui/floating-cta';

export const metadata: Metadata = {
  title: 'Super Agente IA para WhatsApp | Automatización Comercial 24/7 — RESUELTO',
  description:
    'Sistema de IA que responde WhatsApp, califica leads, agenda citas y hace seguimiento automático 24/7. Listo en 5 días. Para negocios en Perú. Garantía 30 días.',
  keywords: [
    'agente ia whatsapp peru',
    'automatización whatsapp business',
    'chatbot ia para negocios',
    'sistema ventas automatico',
    'responder whatsapp automatico',
    'bot whatsapp business peru',
    'automatizar atencion al cliente',
    'agenda citas automatica whatsapp',
  ],
  alternates: {
    canonical: 'https://sistema-ia-sigma.vercel.app/sistemas-ia',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  openGraph: {
    title: 'Super Agente IA para WhatsApp | Automatización Comercial 24/7',
    description:
      'Sistema de IA que responde WhatsApp, califica leads, agenda citas y hace seguimiento automático 24/7. Listo en 5 días para tu negocio en Perú.',
    url: 'https://sistema-ia-sigma.vercel.app/sistemas-ia',
    siteName: 'RESUELTO',
    locale: 'es_PE',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Super Agente IA para WhatsApp | Automatización Comercial 24/7',
    description:
      'IA que responde WhatsApp, califica leads y agenda citas 24/7. Listo en 5 días. Garantía 30 días.',
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
  {
    question: '¿Cuánto me ahorro vs. contratar un asistente?',
    answer: <>Un asistente cuesta entre <G>S/1,500 y S/2,500 al mes</G> más beneficios, vacaciones y tiempo de capacitación. El sistema es un <G>pago único</G> — sin planilla, sin rotación, sin días libres. En menos de 2 meses ya recuperaste la inversión.</>,
  },
  {
    question: '¿Por qué un chatbot genérico no es suficiente?',
    answer: <>Un bot genérico responde con opciones fijas ("presiona 1, presiona 2") y el lead se va. El sistema de RESUELTO <G>entiende lenguaje natural</G>, califica por presupuesto e interés, agenda directo al calendario y hace seguimiento automático. La diferencia está en la tabla de comparación más arriba.</>,
  },
  {
    question: '¿Puedo cancelar el servicio en cualquier momento?',
    answer: <>Sí. <G>No hay contrato de permanencia</G>. El sistema queda instalado en tu número — no dependes de mí para que funcione. El soporte de 30 días está incluido en el precio y no genera cobros adicionales.</>,
  },
];

// ─── SECTIONS ─────────────────────────────────────────────────────────────────

function ProblemsSection() {
  return (
    <section className="py-28 px-4 relative" style={{ background: '#040406' }}>
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
      className="py-28 px-4 relative"
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
    <section id="paquetes" className="py-28 px-4 relative" style={{ background: '#040406' }}>
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
      className="py-28 px-4 relative"
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
      className="py-28 px-4 relative overflow-hidden"
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
    <section className="py-28 px-4 relative" style={{ background: '#040406' }}>
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

function GuaranteeSection() {
  return (
    <section className="py-28 px-4 relative overflow-hidden" style={{ background: '#040406' }}>
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
      <SchemaMarkup />
      <FacebookPixel />
      <FloatingCTA />
      <Navbar minimal />
      <HeroClient />
      <SocialProofBarAnimated />
      <AnimatedMetricsStrip />
      <VSLSectionIA />
      <SistemasIAProblems />
      <HowItWorksAnimated steps={steps} />
      <ChatDemoSectionAnimated />
      <VsSimpleBotSectionAnimated />
      <IntegrationsStrip />
      <PricingSection />
      <IndustriesSectionAnimated />
      <TestimonialsSection />
      <GuaranteeSection />
      <FAQSection />
      <FinalCTASection />
    </main>
  );
}
