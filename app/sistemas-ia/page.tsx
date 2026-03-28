import type { Metadata } from 'next';
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
} from 'lucide-react';
import FAQAccordion from '@/components/ui/faq-accordion';
import {
  HeroClient,
  PricingClient,
  TestimonialsClient,
  AnimatedTextClient,
} from '@/components/SistemasIAClient';

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
  'https://wa.me/51999999999?text=Hola,%20quiero%20info%20sobre%20el%20Sistema%20Express%20de%20IA';

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
  { icon: Stethoscope, label: 'Clinicas esteticas' },
  { icon: Home, label: 'Inmobiliarias' },
  { icon: Scale, label: 'Estudios legales' },
  { icon: Heart, label: 'Odontologia y Salud' },
  { icon: GraduationCap, label: 'Institutos y Educacion' },
  { icon: TrendingUp, label: 'Empresas con pauta Meta' },
];

const faqItems = [
  {
    question: 'Necesito saber programar para usar el sistema?',
    answer:
      'No. El sistema lo configuro yo de principio a fin. Tu solo defines como quieres responder y yo lo armo. Al final te entrego acceso y un video explicando como funciona.',
  },
  {
    question: 'En cuanto tiempo esta listo?',
    answer:
      'Entre 5 y 10 dias habiles desde que iniciamos. Depende del plan y la complejidad de tu flujo. El plan Base suele estar listo en 5 dias.',
  },
  {
    question: 'Funciona con WhatsApp Business o el personal?',
    answer:
      'Funciona con WhatsApp Business API, que es la version para empresas con mayor capacidad. Si todavia no la tienes, te guio en el proceso de activacion — que es mas rapido de lo que parece.',
  },
  {
    question: 'Que pasa si el lead hace una pregunta que no esta programada?',
    answer:
      'El sistema tiene un flujo de derivacion a humano. Si el prospecto hace una pregunta fuera del libreto, el sistema le avisa que un asesor lo contactara pronto y te notifica de inmediato para que respondas tu.',
  },
  {
    question: 'Puedo cambiar los mensajes despues?',
    answer:
      'Si. Tienes acceso completo a la plataforma y puedes editar textos cuando quieras. Ademas, en los 30 dias de soporte incluido te ayudo con cualquier ajuste que necesites.',
  },
];

// ─── SECTIONS ─────────────────────────────────────────────────────────────────

function SocialProofBar() {
  const industryNames = [
    'Clinicas Esteticas',
    'Inmobiliarias',
    'Estudios Legales',
    'Institutos Educativos',
    'Consultorios Dentales',
    'Agencias con Pauta',
    'Coaches y Consultores',
    'Centros de Salud',
  ];

  return (
    <div
      className="w-full py-6 px-4"
      style={{
        background: 'rgba(0,255,135,0.04)',
        borderTop: '1px solid rgba(0,255,135,0.1)',
        borderBottom: '1px solid rgba(0,255,135,0.1)',
      }}
    >
      <p
        className="text-center text-xs font-semibold tracking-widest uppercase mb-4"
        style={{ color: 'rgba(248,248,242,0.35)', fontFamily: 'Space Grotesk, sans-serif' }}
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
    <section className="py-20 px-4 relative" style={{ background: '#060608' }}>
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background:
            'linear-gradient(90deg, transparent, rgba(204,68,255,0.3), transparent)',
        }}
      />
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <span
            className="inline-block text-xs font-semibold tracking-widest uppercase mb-4"
            style={{ color: '#cc44ff', fontFamily: 'Space Grotesk, sans-serif' }}
          >
            El problema real
          </span>
          <h2
            className="text-3xl md:text-5xl font-bold tracking-tight"
            style={{ color: '#f8f8f2', fontFamily: 'Space Grotesk, sans-serif' }}
          >
            Tu equipo pierde leads
            <br />
            <span style={{ color: '#cc44ff' }}>todos los dias</span>
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
                  borderColor: 'rgba(204,68,255,0.15)',
                }}
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                  style={{ background: 'rgba(204,68,255,0.12)' }}
                >
                  <Icon className="w-5 h-5" style={{ color: '#cc44ff' }} />
                </div>
                <h3
                  className="font-semibold text-base mb-2"
                  style={{ color: '#f8f8f2', fontFamily: 'Space Grotesk, sans-serif' }}
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
      style={{ background: 'rgba(0,255,135,0.02)' }}
    >
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background:
            'linear-gradient(90deg, transparent, rgba(0,255,135,0.2), transparent)',
        }}
      />
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-14">
          <span
            className="inline-block text-xs font-semibold tracking-widest uppercase mb-4"
            style={{ color: '#00ff87', fontFamily: 'Space Grotesk, sans-serif' }}
          >
            Como funciona
          </span>
          <h2
            className="text-3xl md:text-5xl font-bold tracking-tight"
            style={{ color: '#f8f8f2', fontFamily: 'Space Grotesk, sans-serif' }}
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
                  background: 'rgba(0,255,135,0.1)',
                  border: '1px solid rgba(0,255,135,0.25)',
                }}
              >
                <span
                  className="text-2xl font-bold"
                  style={{ color: '#00ff87', fontFamily: 'Space Grotesk, sans-serif' }}
                >
                  {step.number}
                </span>
              </div>
              <h3
                className="font-bold text-lg mb-2"
                style={{ color: '#f8f8f2', fontFamily: 'Space Grotesk, sans-serif' }}
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
                  style={{ color: 'rgba(0,255,135,0.4)' }}
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
    <section id="paquetes" className="py-20 px-4 relative" style={{ background: '#060608' }}>
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background:
            'linear-gradient(90deg, transparent, rgba(0,255,135,0.15), transparent)',
        }}
      />
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <span
            className="inline-block text-xs font-semibold tracking-widest uppercase mb-4"
            style={{ color: '#00ff87', fontFamily: 'Space Grotesk, sans-serif' }}
          >
            Planes
          </span>
          <h2
            className="text-3xl md:text-5xl font-bold tracking-tight mb-4"
            style={{ color: '#f8f8f2', fontFamily: 'Space Grotesk, sans-serif' }}
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
      style={{ background: 'rgba(204,68,255,0.03)' }}
    >
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background:
            'linear-gradient(90deg, transparent, rgba(204,68,255,0.2), transparent)',
        }}
      />
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-14">
          <span
            className="inline-block text-xs font-semibold tracking-widest uppercase mb-4"
            style={{ color: '#cc44ff', fontFamily: 'Space Grotesk, sans-serif' }}
          >
            Para quien es
          </span>
          <h2
            className="text-3xl md:text-5xl font-bold tracking-tight"
            style={{ color: '#f8f8f2', fontFamily: 'Space Grotesk, sans-serif' }}
          >
            Si recibes mensajes
            <span style={{ color: '#cc44ff' }}> y los pierdes</span>,
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
                style={{ background: 'rgba(0,255,135,0.08)' }}
              >
                <Icon className="w-6 h-6" style={{ color: '#00ff87' }} />
              </div>
              <p
                className="text-sm font-semibold"
                style={{ color: '#f8f8f2', fontFamily: 'Space Grotesk, sans-serif' }}
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
      className="py-20 px-4 relative"
      style={{
        background:
          'linear-gradient(180deg, rgba(204,68,255,0.05) 0%, rgba(6,6,8,1) 100%)',
      }}
    >
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-14">
          <span
            className="inline-block text-xs font-semibold tracking-widest uppercase mb-4"
            style={{ color: '#cc44ff', fontFamily: 'Space Grotesk, sans-serif' }}
          >
            Clientes
          </span>
          <h2
            className="text-3xl md:text-5xl font-bold tracking-tight"
            style={{ color: '#f8f8f2', fontFamily: 'Space Grotesk, sans-serif' }}
          >
            Lo que dicen quienes
            <br />
            <span style={{ color: '#cc44ff' }}>ya tienen su sistema</span>
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
    <section className="py-20 px-4 relative" style={{ background: '#060608' }}>
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background:
            'linear-gradient(90deg, transparent, rgba(0,255,135,0.15), transparent)',
        }}
      />
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-14">
          <span
            className="inline-block text-xs font-semibold tracking-widest uppercase mb-4"
            style={{ color: '#00ff87', fontFamily: 'Space Grotesk, sans-serif' }}
          >
            Preguntas frecuentes
          </span>
          <h2
            className="text-3xl md:text-4xl font-bold tracking-tight"
            style={{ color: '#f8f8f2', fontFamily: 'Space Grotesk, sans-serif' }}
          >
            Lo que suelen preguntar
          </h2>
        </div>

        <FAQAccordion items={faqItems} />
      </div>
    </section>
  );
}

function FinalCTASection() {
  return (
    <section
      className="py-24 px-4 relative overflow-hidden"
      style={{
        background:
          'linear-gradient(135deg, rgba(0,255,135,0.06) 0%, rgba(6,6,8,1) 40%, rgba(204,68,255,0.06) 100%)',
      }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 60% 50% at 20% 50%, rgba(0,255,135,0.07) 0%, transparent 70%), radial-gradient(ellipse 60% 50% at 80% 50%, rgba(204,68,255,0.07) 0%, transparent 70%)',
        }}
      />

      <div className="relative z-10 max-w-3xl mx-auto text-center">
        <h2
          className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4"
          style={{ color: '#f8f8f2', fontFamily: 'Space Grotesk, sans-serif' }}
        >
          Tu negocio pierde leads
          <br />
          <span style={{ color: '#00ff87' }}>mientras lees esto.</span>
        </h2>

        <p
          className="text-base md:text-lg mb-6 max-w-xl mx-auto"
          style={{ color: 'rgba(248,248,242,0.6)', fontFamily: 'Inter, sans-serif' }}
        >
          Cada hora sin sistema es un prospecto que se fue con tu competencia. El costo de no hacer
          nada es mayor que el costo del sistema.
        </p>

        <AnimatedTextClient
          text="Ponlo en orden hoy."
          textClassName="text-2xl md:text-3xl font-bold"
        />

        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10">
          <a
            href={WA_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-10 py-4 rounded-xl font-bold text-base transition-all duration-300 hover:scale-105"
            style={{
              background: '#00ff87',
              color: '#060608',
              fontFamily: 'Space Grotesk, sans-serif',
              boxShadow: '0 0 30px rgba(0,255,135,0.3)',
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
    <main style={{ background: '#060608', minHeight: '100vh', color: '#f8f8f2' }}>
      <HeroClient />
      <SocialProofBar />
      <ProblemsSection />
      <HowItWorksSection />
      <PricingSection />
      <IndustriesSection />
      <TestimonialsSection />
      <FAQSection />
      <FinalCTASection />
    </main>
  );
}
