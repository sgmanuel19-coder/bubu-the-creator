import Navbar from "@/components/Navbar";
import ServiceSelector from "@/components/ServiceSelector";
import GridBackground from "@/components/ui/grid-background";
import Transition from "@/components/Transition";
import ForWho from "@/components/ForWho";
import Availability from "@/components/Availability";
import FAQ from "@/components/FAQ";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";
import { SITE } from "@/lib/constants";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: `Servicios — ${SITE.brandName}`,
  description: "Sistema Comercial Digital y Sistema de Autoridad y Comunicación Estratégica. Dos niveles de trabajo, mismo criterio.",
};

export default function ServiciosPage() {
  return (
    <main className="relative overflow-hidden">
      <GridBackground />
      <Navbar />

      {/* Page hero */}
      <section className="relative pt-36 pb-16 overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-20 pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full bg-neon-green/6 blur-[100px] pointer-events-none" />

        <div className="container-base relative z-10">
          <span className="inline-flex items-center gap-2 text-xs font-display font-semibold tracking-[0.25em] uppercase text-neon-green mb-4">
            <span className="w-6 h-px bg-neon-green/50" />
            Lo que construyo
          </span>
          <h1 className="font-display font-extrabold tracking-tighter leading-[1.05]"
            style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)" }}>
            Servicios
          </h1>
          <p className="font-body text-muted text-lg mt-4 max-w-xl">
            Dos niveles de trabajo. Distintos en alcance — el mismo criterio en ambos.
          </p>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-neon-green/20 to-neon-purple/20" />
      </section>

      <section className="relative section-padding overflow-hidden" style={{ background: "#050608" }}>
        <div className="absolute top-0 right-0 w-[450px] h-[350px] rounded-full bg-neon-purple/8 blur-[90px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[450px] h-[350px] rounded-full bg-neon-green/6 blur-[90px] pointer-events-none" />
        <div className="container-base relative z-10">
          <ServiceSelector />
        </div>
      </section>
      <Transition />
      <ForWho />
      <Availability />
      <FAQ />
      <FinalCTA />
      <Footer />
    </main>
  );
}
