'use client';
// Dynamic imports with ssr: false must live in a Client Component (Next.js 16 Turbopack rule)
import dynamic from 'next/dynamic';

export const FloatingCTA = dynamic(
  () => import('@/components/ui/floating-cta').then(m => ({ default: m.FloatingCTA })),
  { ssr: false }
);
export const SistemasIAProblems = dynamic(
  () => import('@/components/SistemasIAProblems').then(m => ({ default: m.SistemasIAProblems })),
  { ssr: false }
);
export const GuaranteeSection = dynamic(
  () => import('@/components/GuaranteeSection').then(m => ({ default: m.GuaranteeSection })),
  { ssr: false }
);
export const DottedSurface = dynamic(
  () => import('@/components/ui/dotted-surface').then(m => ({ default: m.DottedSurface })),
  { ssr: false }
);
export const CelestialOrrery = dynamic(
  () => import('@/components/ui/celestial-orrery').then(m => ({ default: m.CelestialOrrery })),
  { ssr: false }
);
export const PricingClient = dynamic(
  () => import('@/components/SistemasIAClient').then(m => ({ default: m.PricingClient })),
  { ssr: false }
);
export const TestimonialsClient = dynamic(
  () => import('@/components/SistemasIAClient').then(m => ({ default: m.TestimonialsClient })),
  { ssr: false }
);
export const AnimatedTextClient = dynamic(
  () => import('@/components/SistemasIAClient').then(m => ({ default: m.AnimatedTextClient })),
  { ssr: false }
);
export const FinalCTAHeading = dynamic(
  () => import('@/components/SistemasIAClient').then(m => ({ default: m.FinalCTAHeading })),
  { ssr: false }
);
export const FinalCTAWAButton = dynamic(
  () => import('@/components/SistemasIAClient').then(m => ({ default: m.FinalCTAWAButton })),
  { ssr: false }
);
export const VSLSectionIA = dynamic(
  () => import('@/components/SistemasIAAnimated').then(m => ({ default: m.VSLSectionIA })),
  { ssr: false }
);
export const HowItWorksAnimated = dynamic(
  () => import('@/components/SistemasIAAnimated').then(m => ({ default: m.HowItWorksAnimated })),
  { ssr: false }
);
export const IndustriesSectionAnimated = dynamic(
  () => import('@/components/SistemasIAAnimated').then(m => ({ default: m.IndustriesSectionAnimated })),
  { ssr: false }
);
export const IntegrationsStrip = dynamic(
  () => import('@/components/SistemasIAAnimated').then(m => ({ default: m.IntegrationsStrip })),
  { ssr: false }
);
export const VsSimpleBotSectionAnimated = dynamic(
  () => import('@/components/SistemasIAAnimated').then(m => ({ default: m.VsSimpleBotSectionAnimated })),
  { ssr: false }
);
export const ChatDemoSectionAnimated = dynamic(
  () => import('@/components/SistemasIAAnimated').then(m => ({ default: m.ChatDemoSectionAnimated })),
  { ssr: false }
);
