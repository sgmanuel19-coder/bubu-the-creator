"use client";

import dynamic from 'next/dynamic';
import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Calendar, Clock, Users, TrendingUp, Star, MessageCircle, Shield, CheckCircle } from 'lucide-react';
import type { Testimonial } from '@/components/ui/glass-testimonial-swiper';
import CountUp from '@/components/CountUp';

const AetherFlowHero = dynamic(
  () => import('@/components/ui/aether-flow-hero'),
  { ssr: false }
);

const TestimonialStack = dynamic(
  () =>
    import('@/components/ui/glass-testimonial-swiper').then((m) => ({
      default: m.TestimonialStack,
    })),
  { ssr: false }
);

const PricingModule = dynamic(
  () =>
    import('@/components/ui/pricing-module').then((m) => ({
      default: m.PricingModule,
    })),
  { ssr: false }
);

const AnimatedText = dynamic(
  () =>
    import('@/components/ui/animated-shiny-text').then((m) => ({
      default: m.AnimatedText,
    })),
  { ssr: false }
);

const WA_LINK =
  'https://wa.me/51907462070?text=Hola,%20quiero%20info%20sobre%20el%20Sistema%20de%20Automatizacion%20IA';

const pricingPlans = [
  {
    name: 'Base',
    price: 'S/1,500',
    monthlyPrice: 'S/600',
    description: 'Para negocios que necesitan atender leads 24/7 y dejar de perderlos por demora.',
    recommended: false,
    ctaText: 'Empezar con Base',
    ctaHref: WA_LINK,
    features: [
      'Chatbot WhatsApp IA entrenado con tu negocio',
      'Respuestas automáticas 24/7',
      'Calificación básica de leads',
      'Agendamiento directo en Google Calendar / Calendly',
      'Derivación inteligente a humano',
      'Mensajes de confirmación y recordatorio',
      'Video de entrega explicando el sistema',
      '30 días de soporte incluido',
    ],
  },
  {
    name: 'Plus',
    price: 'S/3,200',
    monthlyPrice: 'S/1,000',
    description: 'Para equipos que quieren cerrar más y llegar a nuevos prospectos de forma automática.',
    recommended: true,
    ctaText: 'Quiero el Plus',
    ctaHref: WA_LINK,
    features: [
      'Todo lo del plan Base',
      'Secuencias de seguimiento automatizado (nurturing)',
      'Recuperación de leads fríos que no respondieron',
      'Integración Google Sheets o CRM básico',
      'Sistema de Cold Email (hasta 1,000 prospectos/mes)',
      'Scraping básico de base de datos de prospectos',
      'Dashboard de leads y tasa de conversión',
    ],
  },
  {
    name: 'Pro',
    price: 'S/5,800',
    monthlyPrice: 'S/1,800',
    description: 'Sistema comercial completo para operaciones que necesitan escalar sin contratar.',
    recommended: false,
    ctaText: 'Ver plan Pro',
    ctaHref: WA_LINK,
    features: [
      'Todo lo del plan Plus',
      'IA conversacional avanzada (Claude + GPT-4)',
      'Cold Email a escala (hasta 5,000 prospectos/mes)',
      'Landing page de alta conversión incluida',
      'Flujos multi-canal (WhatsApp + Email + Instagram DM)',
      'Rutas por tipo de servicio, interés y presupuesto',
      'Reportes mensuales de KPIs y optimización',
    ],
  },
];

const testimonialData: Testimonial[] = [
  {
    id: 1,
    initials: 'CL',
    name: 'Carla Llanos',
    role: 'Directora — Centro Estetico Aura, Lima',
    quote:
      'Antes perdiamos leads todos los fines de semana porque nadie respondia a tiempo. Ahora el sistema califica, agenda y confirma solo. Duplicamos las citas sin contratar a nadie.',
    avatarGradient: 'linear-gradient(135deg, #1A80FF, #0A4DAA)',
    tags: [
      { text: 'Clinica estetica', type: 'featured' },
      { text: 'Plan Plus', type: 'default' },
    ],
    stats: [
      { icon: Calendar, text: '2x citas agendadas' },
      { icon: Clock, text: '48h de activacion' },
    ],
  },
  {
    id: 2,
    initials: 'RP',
    name: 'Rodrigo Paredes',
    role: 'Gerente Comercial — Grupo Paredes Inmobiliaria',
    quote:
      'Teniamos a tres personas respondiendo WhatsApp todo el dia y aun asi se nos escapaban prospectos. Hoy el sistema filtra los interesados reales y los pasa a mi equipo listos para cerrar.',
    avatarGradient: 'linear-gradient(135deg, #4D9FFF, #0A4DAA)',
    tags: [
      { text: 'Inmobiliaria', type: 'featured' },
      { text: 'Plan Pro', type: 'default' },
    ],
    stats: [
      { icon: Users, text: '60% menos tiempo en atencion' },
      { icon: TrendingUp, text: '+35% tasa de cierre' },
    ],
  },
  {
    id: 3,
    initials: 'MS',
    name: 'Maria Suarez',
    role: 'Directora Academica — Instituto Superior Nexo',
    quote:
      'En temporada de admision nos llegaban 200 mensajes diarios. El equipo no daba abasto. Con el sistema de Manuel respondemos al instante, calificamos por carrera y agendamos la orientacion sin esfuerzo humano.',
    avatarGradient: 'linear-gradient(135deg, #1A80FF, #0A4DAA)',
    tags: [
      { text: 'Instituto educativo', type: 'featured' },
      { text: 'Plan Plus', type: 'default' },
    ],
    stats: [
      { icon: MessageCircle, text: '200+ consultas/dia automatizadas' },
      { icon: Star, text: 'Activado en 7 dias' },
    ],
  },
  {
    id: 4,
    initials: 'JV',
    name: 'Jorge Villanueva',
    role: 'Abogado principal — Estudio Villanueva & Asociados',
    quote:
      'Mis clientes son exigentes. Necesitaba que la primera respuesta fuera rapida, profesional y que filtrara correctamente. El sistema lo hace mejor que cualquier asistente que haya tenido.',
    avatarGradient: 'linear-gradient(135deg, #ff8c00, #cc5500)',
    tags: [
      { text: 'Estudio legal', type: 'featured' },
      { text: 'Plan Base', type: 'default' },
    ],
    stats: [
      { icon: Shield, text: 'Respuesta en 30 segundos' },
      { icon: CheckCircle, text: 'Calificacion automatica' },
    ],
  },
];

export function HeroClient() {
  return <AetherFlowHero />;
}

export function PricingClient() {
  return (
    <PricingModule
      plans={pricingPlans}
      footnote="Precio de implementación (one-time) + fee mensual de mantenimiento, monitoreo y optimización. Garantía de devolución 30 días."
    />
  );
}

export function TestimonialsClient() {
  return <TestimonialStack testimonials={testimonialData} visibleBehind={2} />;
}

export function AnimatedTextClient({ text, textClassName }: { text: string; textClassName?: string }) {
  return <AnimatedText text={text} textClassName={textClassName} />;
}

// ── Social Proof Bar ────────────────────────────
const proofStats = [
  { end: 2,     suffix: ' min',   label: 'respuesta promedio', prefix: '<' },
  { end: 10,    suffix: ' días',  label: 'instalación completa', prefix: '≤' },
  { end: 30,    suffix: ' días',  label: 'garantía total', prefix: '' },
  { value: '24/7', label: 'operación continua', prefix: '' },
];

export function SocialProofBarAnimated() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <div
      ref={ref}
      className="w-full py-7 px-4"
      style={{
        background: 'rgba(26,128,255,0.04)',
        borderTop: '1px solid rgba(26,128,255,0.1)',
        borderBottom: '1px solid rgba(26,128,255,0.1)',
      }}
    >
      <div className="max-w-3xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-6">
        {proofStats.map((s, i) => (
          <motion.div
            key={i}
            className="text-center"
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: i * 0.08 }}
          >
            <p
              className="font-bold mb-1"
              style={{ fontFamily: 'Poppins, sans-serif', fontSize: 'clamp(1rem, 3vw, 1.5rem)', color: '#1A80FF' }}
            >
              {s.prefix}{'value' in s ? s.value : (
                inView ? <CountUp end={s.end} suffix={s.suffix} duration={1.4} /> : `${s.end}${s.suffix}`
              )}
            </p>
            <p
              className="text-xs"
              style={{ color: 'rgba(248,248,242,0.4)', fontFamily: 'Inter, sans-serif', lineHeight: 1.4 }}
            >
              {s.label}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// ── Animated Metrics Strip ────────────────────────────────────
const metrics = [
  { end: 3,       suffix: '',    label: 'servicios de automatización',     isStatic: false },
  { end: 30,      suffix: '+',   label: 'días de soporte incluido en cada plan', isStatic: false },
  { value: '5–10 días', label: 'promedio de activación del sistema', isStatic: true  },
];

export function AnimatedMetricsStrip() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });

  return (
    <div
      ref={ref}
      className="w-full py-8 px-4"
      style={{
        background: 'rgba(26,128,255,0.04)',
        borderTop: '1px solid rgba(26,128,255,0.1)',
        borderBottom: '1px solid rgba(26,128,255,0.1)',
      }}
    >
      <div className="max-w-3xl mx-auto grid grid-cols-3 items-center justify-center">
        {metrics.map((m, i) => (
          <div key={i} className="flex items-center">
            {/* Divider */}
            {i > 0 && (
              <div
                className="w-px h-8 sm:h-10 mx-3 sm:mx-8 shrink-0"
                style={{ background: 'rgba(26,128,255,0.2)' }}
              />
            )}
            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 12, filter: "blur(6px)" }}
              animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
              transition={{ duration: 0.55, delay: 0.1 * i }}
            >
              <div
                className="text-xl sm:text-3xl font-bold mb-1"
                style={{
                  fontFamily: 'Poppins, sans-serif',
                  background: 'linear-gradient(135deg, #1A80FF, #1A80FF)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                {m.isStatic ? (
                  m.value
                ) : (
                  <CountUp end={m.end!} suffix={m.suffix} duration={2} />
                )}
              </div>
              <p
                className="text-xs font-medium tracking-wide"
                style={{ color: 'rgba(248,248,242,0.5)', fontFamily: 'Inter, sans-serif' }}
              >
                {m.label}
              </p>
            </motion.div>
          </div>
        ))}
      </div>
    </div>
  );
}
