import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import FacebookPixel from '@/components/FacebookPixel';
import { ShieldCheck, CheckCircle2 } from 'lucide-react';
import FAQAccordion from '@/components/ui/faq-accordion';
import {
  HeroClient,
  PricingClient,
  TestimonialsClient,
  AnimatedTextClient,
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


const steps = [
  {
    number: '01',
    title: 'Diagnóstico',
    description:
      'Mapeamos tu flujo actual, tus preguntas frecuentes y los puntos donde se pierden más leads. Sin supuestos.',
  },
  {
    number: '02',
    title: 'Configuración',
    description:
      'Armamos las respuestas automáticas, el filtro de calificación y el enlace de calendario integrado a tu proceso real.',
  },
  {
    number: '03',
    title: 'Activación',
    description:
      'En 5 a 10 días hábiles tu sistema está funcionando. No entrego archivos — entrego un sistema encendido.',
  },
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
  {
    question: '¿Por qué no contratar un freelancer que me arme esto más barato?',
    answer: <>Un freelancer arma el bot y se va. Si algo falla, pagas más o quedas solo. Con RESUELTO recibes <G>30 días de soporte incluido</G>, optimización continua y un sistema entrenado con tu negocio desde el primer día. La diferencia no es el precio inicial — es quién responde cuando algo no funciona.</>,
  },
];

// ─── SECTIONS ─────────────────────────────────────────────────────────────────



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
          <div className="relative z-10 mt-8">
            <a
              href={WA_LINK}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                padding: '14px 28px', borderRadius: 14,
                background: 'linear-gradient(135deg, #1A80FF, #4D9FFF)',
                color: '#fff', fontFamily: 'Poppins, sans-serif',
                fontWeight: 600, fontSize: '0.9rem',
                boxShadow: '0 0 28px rgba(26,128,255,0.35)',
                textDecoration: 'none',
              }}
            >
              Quiero el sistema con garantía →
            </a>
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
            Quiero mi sistema ahora →
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

// ─── PRIVACY POLICY ───────────────────────────────────────────────────────────

function PrivacyPolicySection() {
  const h = (text: string) => (
    <p style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700, fontSize: '0.85rem', color: '#4D9FFF', marginTop: 24, marginBottom: 6 }}>
      {text}
    </p>
  );
  const p = (text: string) => (
    <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.82rem', color: 'rgba(248,248,242,0.6)', lineHeight: 1.7, marginBottom: 8 }}>
      {text}
    </p>
  );

  return (
    <section style={{ background: '#040406', borderTop: '1px solid rgba(255,255,255,0.06)', padding: '24px 16px' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <details style={{ cursor: 'pointer' }}>
          <summary style={{
            listStyle: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 12,
            padding: '10px 0',
            fontFamily: 'Poppins, sans-serif',
            fontWeight: 600,
            fontSize: '0.8rem',
            color: 'rgba(248,248,242,0.35)',
            letterSpacing: '0.08em',
            userSelect: 'none',
          }}>
            <span>Política de Privacidad · RESUELTO</span>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0, color: 'rgba(248,248,242,0.25)' }}>
              <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </summary>

          <div style={{ paddingTop: 20, paddingBottom: 12 }}>
            {h('1. Responsable del tratamiento')}
            {p('RESUELTO, representado por Manuel Severo Gordillo, con domicilio en Lima, Perú. Correo de contacto y canal principal: WhatsApp +51 907 462 070.')}

            {h('2. Datos personales que recopilamos')}
            {p('Al interactuar con esta página o contactarnos por WhatsApp, podemos recopilar: nombre y apellido, número de teléfono (WhatsApp), nombre del negocio o empresa, tipo de industria, correo electrónico (cuando sea proporcionado voluntariamente) y datos de navegación recogidos por herramientas de analítica (dirección IP, tipo de dispositivo, páginas visitadas, tiempo de sesión).')}

            {h('3. Finalidad del tratamiento')}
            {p('Los datos personales recogidos se utilizan exclusivamente para: (a) responder consultas y brindar información sobre nuestros servicios de automatización con IA, (b) diseñar, configurar e implementar el sistema de atención automatizada contratado, (c) enviar comunicaciones relacionadas con el servicio contratado, incluyendo actualizaciones y soporte técnico, (d) medir el rendimiento de la página web y mejorar la experiencia del usuario mediante herramientas de analítica, (e) mostrar publicidad relevante a través de Meta Ads (Facebook e Instagram) a personas que visitaron esta página, en cumplimiento con las políticas de la plataforma.')}

            {h('4. Base legal del tratamiento')}
            {p('El tratamiento de sus datos se sustenta en: el consentimiento otorgado al contactarnos voluntariamente, la ejecución de un contrato de servicios cuando se formaliza la contratación, y el interés legítimo de RESUELTO para mejorar sus servicios y comunicar ofertas relevantes a personas que han mostrado interés previo.')}

            {h('5. Cookies y tecnologías de rastreo')}
            {p('Esta página utiliza el Píxel de Meta (Facebook Pixel) con ID 1298724572307272 para medir conversiones y mostrar anuncios personalizados en plataformas de Meta. Asimismo, utiliza Vercel Analytics para análisis de rendimiento web de forma anónima. El Píxel de Meta puede registrar eventos como visitas a la página (PageView) y acciones de conversión. Puede gestionar sus preferencias de publicidad personalizada en https://www.facebook.com/settings?tab=ads o en la Configuración de privacidad de su cuenta de Meta.')}

            {h('6. Compartición de datos con terceros')}
            {p('RESUELTO no vende ni cede datos personales a terceros con fines comerciales propios. Los datos podrán ser compartidos únicamente con: (a) Meta Platforms, Inc., como proveedor de la infraestructura de publicidad (Píxel), sujeto a su propia política de privacidad, (b) Vercel Inc., proveedor de hosting y analítica anónima, (c) proveedores tecnológicos necesarios para operar el sistema de automatización contratado (plataformas de mensajería, CRM, calendarios), siempre bajo acuerdos de confidencialidad.')}

            {h('7. Transferencias internacionales')}
            {p('Algunos proveedores tecnológicos utilizados (Meta, Vercel, Google) operan en los Estados Unidos y otros países fuera del Perú. Al usar esta página, usted consiente que sus datos puedan ser procesados en dichos países, los cuales pueden tener regulaciones de protección de datos distintas a las peruanas.')}

            {h('8. Plazo de conservación')}
            {p('Los datos de contacto se conservan mientras exista una relación comercial activa o potencial. Los datos de navegación (analítica) se almacenan por el período estándar de cada proveedor (Vercel: hasta 90 días). Una vez concluida la relación, los datos serán eliminados o anonimizados salvo que la ley exija su conservación por un período mayor.')}

            {h('9. Derechos del titular (ARCO)')}
            {p('En virtud de la Ley N.° 29733 — Ley de Protección de Datos Personales del Perú y su Reglamento (D.S. 003-2013-JUS), usted tiene derecho a: (A) Acceder a sus datos personales que obren en nuestros registros; (R) Rectificar datos inexactos o incompletos; (C) Cancelar o suprimir sus datos cuando ya no sean necesarios para la finalidad para la que fueron recogidos; (O) Oponerse al tratamiento de sus datos para fines de marketing directo. Para ejercer cualquiera de estos derechos, contáctenos a través de WhatsApp +51 907 462 070 indicando su solicitud. Responderemos en un plazo máximo de 10 días hábiles.')}

            {h('10. Seguridad de los datos')}
            {p('RESUELTO adopta medidas técnicas y organizativas razonables para proteger los datos personales contra accesos no autorizados, alteración, divulgación o destrucción. Sin embargo, ninguna transmisión por Internet es completamente segura, por lo que no podemos garantizar seguridad absoluta.')}

            {h('11. Cambios en esta política')}
            {p('RESUELTO se reserva el derecho de actualizar esta Política de Privacidad para reflejar cambios en sus prácticas o en la legislación aplicable. La versión vigente estará siempre disponible en esta página. Se recomienda revisarla periódicamente.')}

            {h('12. Ley aplicable y jurisdicción')}
            {p('Esta Política se rige por la Ley N.° 29733 y demás normativa peruana aplicable. Cualquier controversia será sometida a los tribunales competentes de Lima, Perú.')}

            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.75rem', color: 'rgba(248,248,242,0.25)', marginTop: 20 }}>
              Última actualización: abril 2026 · Lima, Perú
            </p>
          </div>
        </details>
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
      <PrivacyPolicySection />
    </main>
  );
}
