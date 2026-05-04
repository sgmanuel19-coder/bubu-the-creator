import type { Metadata } from "next";
import dynamic from "next/dynamic";
import Navbar from "@/components/Navbar";

const About     = dynamic(() => import("@/components/About"));
const Authority = dynamic(() => import("@/components/Authority"));
const HowIWork  = dynamic(() => import("@/components/HowIWork"));
const Footer    = dynamic(() => import("@/components/Footer"));

export const metadata: Metadata = {
  title: "Sobre mí — RESUELTO",
  description: "Conoce a Manuel Severo y el enfoque detrás de RESUELTO. Estrategia, producción audiovisual y automatización para empresas B2B.",
};

export default function SobreMiPage() {
  return (
    <main className="relative overflow-hidden">
      <Navbar />
      <About />
      <Authority />
      <HowIWork />
      <Footer />
    </main>
  );
}
