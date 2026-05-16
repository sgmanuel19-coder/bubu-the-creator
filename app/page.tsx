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
  title: "RESUELTO — Comunicación Comercial para Empresas B2B en Lima, Perú",
  description: "Agencia de comunicación comercial en Lima. Sistemas audiovisuales de autoridad, landing pages premium y automatización con IA para empresas técnicas e industriales en Perú.",
  keywords: [
    "agencia comunicación comercial Lima",
    "comunicación B2B Peru",
    "estrategia digital empresas Peru",
    "producción audiovisual Lima",
    "landing pages premium Peru",
    "autoridad digital negocios",
    "marketing empresas industriales Peru",
    "sistema audiovisual empresas",
    "agencia marketing B2B Lima",
    "contenido estratégico B2B",
  ],
  alternates: {
    canonical: "https://resueltoagency.com",
  },
  openGraph: {
    title: "RESUELTO — Comunicación Comercial para Empresas B2B en Lima, Perú",
    description: "Sistemas audiovisuales de autoridad y automatización inteligente para empresas técnicas e industriales en Lima, Perú.",
    url: "https://resueltoagency.com",
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
