import Navbar from "@/components/Navbar";
import GridBackground from "@/components/ui/grid-background";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";
import StatsBar from "@/components/StatsBar";
import IAShowcase from "@/components/IAShowcase";
import CaseSummaryCards from "@/components/CaseSummaryCards";
import VideoReel from "@/components/VideoReel";
import IndustryGrid from "@/components/IndustryGrid";
import TrajectoryTimeline from "@/components/TrajectoryTimeline";
import TestimonialsCasos from "@/components/TestimonialsCasos";
import CollapsibleCarousel from "@/components/CollapsibleCarousel";
import { SITE } from "@/lib/constants";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: `Casos de Éxito — ${SITE.brandName}`,
  description:
    "Producción con IA para Wellmax, WIN y Livoltek + track record en retail, FMCG y entretenimiento (Wong, Redondos, Mañana Me Caso). 20+ marcas, 5M+ vistas.",
  alternates: { canonical: "https://resueltoagency.com/casos" },
};

export default function CasosPage() {
  const logos = SITE.authority.logos;

  return (
    <main className="relative overflow-hidden">
      <GridBackground />
      <Navbar />

      {/* ── HERO ── */}
      <section className="relative pt-36 pb-12 overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-20 pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full bg-neon-purple/6 blur-[100px] pointer-events-none" />

        <div className="container-base relative z-10">
          <span className="inline-flex items-center gap-2 text-xs font-display font-semibold tracking-[0.25em] uppercase text-neon-green mb-4">
            <span className="w-6 h-px bg-neon-green/50" />
            Casos & Portafolio
          </span>
          <h1 className="font-display font-extrabold tracking-tighter leading-[1.05]"
            style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)" }}>
            Producción real.<br />
            <span className="text-holo">IA integrada.</span>
          </h1>
          <p className="font-body text-muted text-lg mt-4 max-w-2xl">
            Lo que produzco hoy con IA — y los años de ejecución para marcas líderes que están detrás del criterio.
          </p>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-neon-purple/20 to-neon-green/20" />
      </section>

      {/* ── STATS ── */}
      <StatsBar />

      {/* ── ACTO 1 — Producción con IA ── */}
      <IAShowcase />

      {/* ── ACTO 2 — Casos destacados (tradicional) + videos reales ── */}
      <CaseSummaryCards />
      <VideoReel />

      {/* ── ACTO 3 — Experiencia por industria ── */}
      <IndustryGrid />

      {/* ── ACTO 4 — Trayectoria ── */}
      <TrajectoryTimeline />

      {/* ── ACTO 5 — Testimonios ── */}
      <TestimonialsCasos />

      {/* ── ACTO 6 — Mural de marcas ── */}
      <section className="relative section-padding overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-neon-green/15 to-neon-purple/15" />
        <div className="container-base relative z-10">
          <div className="mb-8 text-center">
            <span className="inline-flex items-center gap-2 text-xs font-display font-semibold tracking-[0.2em] uppercase text-neon-purple mb-3">
              <span className="w-6 h-px bg-neon-purple/50" />
              Ya confiaron
              <span className="w-6 h-px bg-neon-purple/50" />
            </span>
            <p className="font-body text-muted text-sm">{SITE.authority.logosLabel}</p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-2.5">
            {logos.map((logo) => (
              <span key={logo.name}
                className="font-display font-semibold text-[12px] tracking-wide px-3.5 py-2 rounded-lg"
                style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.08)", color: "rgba(220,230,245,0.8)" }}>
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
