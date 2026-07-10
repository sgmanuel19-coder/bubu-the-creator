import Navbar from "@/components/Navbar";
import PricingTiers from "@/components/PricingTiers";
import ServiceDetailAudiovisual from "@/components/ServiceDetailAudiovisual";
import GridBackground from "@/components/ui/grid-background";
import Transition from "@/components/Transition";
import ForWho from "@/components/ForWho";
import Availability from "@/components/Availability";
import FAQ from "@/components/FAQ";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";
import PuenteOfertas from "@/components/PuenteOfertas";
import { SITE } from "@/lib/constants";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: `Servicios — ${SITE.brandName}`,
  description: "Creación de contenido con IA para empresas B2B. Videos a demanda, sistema mensual de contenido IA y automatización completa. El nivel de una producción tradicional, en días.",
  alternates: { canonical: "https://resueltoagency.com/servicios" },
  openGraph: {
    title: `Servicios — ${SITE.brandName}`,
    description: "Creación de contenido con IA para empresas B2B. Videos a demanda, sistema mensual y automatización completa. El nivel de una producción tradicional, en días.",
    url: "https://resueltoagency.com/servicios",
  },
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
            Tres formas de entrar. Distintas en alcance — el mismo nivel en todas.
          </p>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-neon-green/20 to-neon-purple/20" />
      </section>

      <PricingTiers />

      {/* Detalle completo de los servicios de contenido */}
      <section className="relative section-padding overflow-hidden" style={{ background: "#050608" }}>
        <div className="absolute top-0 right-0 w-[450px] h-[350px] rounded-full bg-neon-purple/8 blur-[90px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[450px] h-[350px] rounded-full bg-neon-green/6 blur-[90px] pointer-events-none" />
        <div className="container-base relative z-10">
          <div className="mb-8">
            <span className="inline-flex items-center gap-2 text-xs font-display font-semibold tracking-[0.25em] uppercase text-neon-green mb-3">
              <span className="w-6 h-px bg-neon-green/50" />
              El detalle completo
            </span>
            <h2 className="font-display font-bold text-2xl lg:text-3xl tracking-tight">
              Qué recibes exactamente
            </h2>
          </div>
          <div className="rounded-2xl border border-neon-green/25 bg-neon-green/[0.02] overflow-hidden">
            <ServiceDetailAudiovisual />
          </div>
        </div>
      </section>
      <Transition />
      <ForWho />
      <Availability />
      <FAQ />
      {/* Puente de coherencia: los otros caminos del sistema */}
      <PuenteOfertas
        titulo="Los otros caminos para trabajar conmigo"
        subtitulo="El contenido es la mitad del sistema. La otra mitad: automatizar tu atención comercial, o aprender el método y producirlo tú."
        caminos={["sistemas", "academy"]}
      />
      <FinalCTA />
      <Footer />
    </main>
  );
}
