import type { Metadata } from "next";
import { redirect } from "next/navigation";
import dynamic from "next/dynamic";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";

const Problem   = dynamic(() => import("@/components/Problem"));
const Authority = dynamic(() => import("@/components/Authority"));
const FAQ       = dynamic(() => import("@/components/FAQ"));
const FinalCTA  = dynamic(() => import("@/components/FinalCTA"));
const Footer    = dynamic(() => import("@/components/Footer"));

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
  // Si el proyecto Vercel tiene SITE_MODE=sistemas-ia, redirige a esa landing.
  // Configurar solo en el proyecto sistema-ia-sigma en el dashboard de Vercel.
  if (process.env.SITE_MODE === "sistemas-ia") {
    redirect("/sistemas-ia");
  }

  return (
    <main className="relative overflow-hidden">
      <Navbar />
      <Hero />
      <Problem />
      <Authority />
      <FAQ />
      <FinalCTA />
      <Footer />
    </main>
  );
}
