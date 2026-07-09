import Navbar from "@/components/Navbar";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";
import StatsBar from "@/components/StatsBar";
import ClientesActivos from "@/components/ClientesActivos";
import ContentIASystem from "@/components/ContentIASystem";
import CaseSummaryCards from "@/components/CaseSummaryCards";
import VideoReel from "@/components/VideoReel";
import IndustryGrid from "@/components/IndustryGrid";
import TrajectoryTimeline from "@/components/TrajectoryTimeline";
import TestimonialsCasos from "@/components/TestimonialsCasos";
import CollapsibleCarousel from "@/components/CollapsibleCarousel";
import { SITE } from "@/lib/constants";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: `Casos & Sistema IA — ${SITE.brandName}`,
  description:
    "Producción con IA para Wellmax, WIN, Livoltek y marca propia + track record en retail, FMCG y entretenimiento (Wong, Redondos, Mañana Me Caso). 20+ marcas, 5M+ vistas.",
  alternates: { canonical: "https://resueltoagency.com/casos" },
  openGraph: {
    title: `Casos & Sistema IA — ${SITE.brandName}`,
    description:
      "Producción con IA para Wellmax, WIN, Livoltek y marca propia + track record en retail, FMCG y entretenimiento. 20+ marcas, 5M+ vistas.",
    url: "https://resueltoagency.com/casos",
  },
};

export default function CasosPage() {
  const logos = SITE.authority.logos;

  return (
    <main className="relative">
      <Navbar />

      {/* ── HERO ── */}
      <section className="relative pt-40 pb-16">
        {/* warm ambient glow */}
        <div className="absolute top-24 right-[-120px] w-[520px] h-[420px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(ellipse, rgba(26,128,255,0.10) 0%, transparent 70%)", filter: "blur(80px)" }} />

        <div className="container-base relative z-10">
          <span className="font-display text-[11px] font-semibold tracking-[0.3em] uppercase text-neon-green mb-6 block">
            Casos & Sistema IA
          </span>
          <h1 className="font-display font-extrabold tracking-tight leading-[0.98] text-cream max-w-4xl"
            style={{ fontSize: "clamp(2.8rem, 7vw, 6rem)" }}>
            Producción real.<br />
            <span className="text-holo">IA integrada.</span>
          </h1>
          <div className="mt-8 flex items-start gap-5 max-w-2xl">
            <span className="hidden sm:block w-12 h-px bg-neon-green mt-3 shrink-0" />
            <p className="font-body text-muted text-lg leading-relaxed">
              Lo que produzco hoy con IA — y los años de ejecución para marcas líderes que están
              detrás del criterio. Cuatro clientes activos, un sistema, un track record real.
            </p>
          </div>
        </div>
      </section>

      {/* ── STATS ── */}
      <StatsBar />

      {/* ── Clientes activos con IA ── */}
      <ClientesActivos />

      {/* ── El sistema Content IA ── */}
      <ContentIASystem />

      {/* ── Casos destacados ── */}
      <CaseSummaryCards />

      {/* ── Videos reales ── */}
      <VideoReel />

      {/* ── Experiencia por industria ── */}
      <IndustryGrid />

      {/* ── Trayectoria ── */}
      <TrajectoryTimeline />

      {/* ── Testimonios ── */}
      <TestimonialsCasos />

      {/* ── Marcas ── */}
      <section className="relative section-padding border-t border-cream/8">
        <div className="container-base">
          <div className="mb-10 max-w-2xl">
            <span className="font-display text-[11px] font-semibold tracking-[0.28em] uppercase text-neon-green mb-4 block">
              Ya confiaron
            </span>
            <p className="font-body text-muted text-sm">{SITE.authority.logosLabel}</p>
          </div>
          <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
            {logos.map((logo) => (
              <span key={logo.name}
                className="font-display font-bold text-lg lg:text-xl text-cream/35 hover:text-cream/80 transition-colors tracking-tight">
                {logo.name}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Portafolio visual colapsable */}
      <CollapsibleCarousel />

      <FinalCTA />
      <Footer />
    </main>
  );
}
