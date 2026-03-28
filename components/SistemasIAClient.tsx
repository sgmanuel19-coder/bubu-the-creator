"use client";

import dynamic from 'next/dynamic';
import { Calendar, Clock, Users, TrendingUp, Star, MessageCircle, Shield, CheckCircle } from 'lucide-react';
import type { Testimonial } from '@/components/ui/glass-testimonial-swiper';

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
  'https://wa.me/51999999999?text=Hola,%20quiero%20info%20sobre%20el%20Sistema%20Express%20de%20IA';

const pricingPlans = [
  {
    name: 'Base',
    price: 'S/1,500',
    monthlyPrice: 'S/800',
    description: 'Para negocios que necesitan orden basico en su atencion.',
    recommended: false,
    ctaText: 'Empezar con Base',
    ctaHref: WA_LINK,
    features: [
      'Diagnostico del flujo comercial',
      'Mapa de preguntas frecuentes',
      'Respuestas automaticas configuradas',
      'Calificacion basica de leads',
      'Derivacion a humano',
      'Enlace de agenda automatica',
      'Mensajes de confirmacion',
      'Video Loom de entrega',
    ],
  },
  {
    name: 'Plus',
    price: 'S/2,800',
    monthlyPrice: 'S/1,200',
    description: 'Para equipos que quieren cerrar mas sin trabajar mas horas.',
    recommended: true,
    ctaText: 'Quiero el Plus',
    ctaHref: WA_LINK,
    features: [
      'Todo lo del plan Base',
      'Secuencia de seguimiento automatico',
      'Etiquetas leads calientes / frios',
      'Recuperacion de leads que no cerraron',
      'Integracion Google Sheets o CRM basico',
      'Dashboard simple de conversaciones',
    ],
  },
  {
    name: 'Pro',
    price: 'S/5,500',
    monthlyPrice: 'S/2,000',
    description: 'Para operaciones comerciales que necesitan IA real.',
    recommended: false,
    ctaText: 'Ver plan Pro',
    ctaHref: WA_LINK,
    features: [
      'Todo lo del plan Plus',
      'IA con contexto de tu negocio',
      'Rutas por tipo de servicio',
      'Flujos por interes y presupuesto',
      'Automatizacion post-reunion',
      'Nurturing de leads',
      'Remarketing de leads no cerrados',
      'Reporte mensual de conversion',
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
    avatarGradient: 'linear-gradient(135deg, #00ff87, #00cc6a)',
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
    avatarGradient: 'linear-gradient(135deg, #cc44ff, #a020f0)',
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
    avatarGradient: 'linear-gradient(135deg, #00d4ff, #0099cc)',
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
      footnote="Todos los planes incluyen soporte por 30 dias + fee mensual de optimizacion opcional desde S/800/mes"
    />
  );
}

export function TestimonialsClient() {
  return <TestimonialStack testimonials={testimonialData} visibleBehind={2} />;
}

export function AnimatedTextClient({ text, textClassName }: { text: string; textClassName?: string }) {
  return <AnimatedText text={text} textClassName={textClassName} />;
}
