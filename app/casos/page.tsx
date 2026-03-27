import Navbar from "@/components/Navbar";
import Proof from "@/components/Proof";
import GridBackground from "@/components/ui/grid-background";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";
import { SITE } from "@/lib/constants";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: `Casos de Éxito — ${SITE.brandName}`,
  description: "Proyectos reales para marcas reales: WIN Internet, Wong Cencosud, Redondos, Livoltek y más. Resultados medibles, no promesas.",
};

export default function CasosPage() {
  return (
    <main className="relative overflow-hidden">
      <GridBackground />
      <Navbar />

      {/* Page hero */}
      <section className="relative pt-36 pb-16 overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-20 pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full bg-neon-purple/6 blur-[100px] pointer-events-none" />

        <div className="container-base relative z-10">
          <span className="inline-flex items-center gap-2 text-xs font-display font-semibold tracking-[0.25em] uppercase text-neon-green mb-4">
            <span className="w-6 h-px bg-neon-green/50" />
            Portafolio
          </span>
          <h1 className="font-display font-extrabold tracking-tighter leading-[1.05]"
            style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)" }}>
            Casos de éxito
          </h1>
          <p className="font-body text-muted text-lg mt-4 max-w-2xl">
            Proyectos reales. Marcas reales. Resultados que se pueden medir — no promesas.
          </p>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-neon-purple/20 to-neon-green/20" />
      </section>

      <Proof />
      <FinalCTA />
      <Footer />
    </main>
  );
}
