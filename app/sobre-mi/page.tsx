import Navbar from "@/components/Navbar";
import About from "@/components/About";
import FutureVision from "@/components/FutureVision";
import GridBackground from "@/components/ui/grid-background";
import BehindTheScenes from "@/components/BehindTheScenes";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";
import PuenteOfertas from "@/components/PuenteOfertas";
import { SITE } from "@/lib/constants";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: `Sobre mí — ${SITE.brandName}`,
  description: "Estratega de contenido con +5 años trabajando con las marcas más exigentes del Perú. De agencias top-tier a sistemas propios de conversión.",
  alternates: { canonical: "https://resueltoagency.com/sobre-mi" },
  openGraph: {
    title: `Manuel Severo — ${SITE.brandName}`,
    description: "Estratega de contenido con +5 años trabajando con las marcas más exigentes del Perú. De agencias top-tier a sistemas propios de conversión.",
    url: "https://resueltoagency.com/sobre-mi",
  },
};

export default function SobreMiPage() {
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
            Quién está detrás de RESUELTO
          </span>
          <h1 className="font-display font-extrabold tracking-tighter leading-[1.05] max-w-3xl"
            style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)" }}>
            Manuel Severo
          </h1>
          <p className="font-body text-muted text-lg mt-4 max-w-xl">
            {SITE.professionalTitle} · {SITE.city}
          </p>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-neon-green/20 to-neon-purple/20" />
      </section>

      <About />
      <FutureVision />
      <BehindTheScenes />
      {/* Puente de coherencia: todo lo que hago, en tres caminos */}
      <PuenteOfertas
        titulo="Tres formas de trabajar conmigo"
        subtitulo="Produzco campañas con IA para marcas, enseño el sistema exacto con el que lo hago, y una parte del método la regalo — para que decidas con evidencia."
        caminos={["agencia", "academy", "boveda"]}
      />
      <FinalCTA />
      <Footer />
    </main>
  );
}
