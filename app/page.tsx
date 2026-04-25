import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Problem from "@/components/Problem";
import Authority from "@/components/Authority";
import FAQ from "@/components/FAQ";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "RESUELTO — Comunicación Comercial para Empresas B2B",
  description: "Sistemas audiovisuales de autoridad y automatización inteligente para empresas técnicas e industriales en Lima, Perú. Estrategia + Producción + IA.",
  openGraph: {
    title: "RESUELTO — Comunicación Comercial para Empresas B2B",
    description: "Sistemas audiovisuales de autoridad y automatización inteligente para empresas técnicas e industriales.",
    url: "/",
  },
};

export default function Home() {
  return (
    <>
    <main className="relative overflow-hidden">
      <Navbar />
      <Hero />
    </main>
    <Problem />
    <main className="relative overflow-hidden">
      <Authority />
      <FAQ />
      <FinalCTA />
      <Footer />
    </main>
    </>
  );
}
