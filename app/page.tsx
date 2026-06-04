import type { Metadata } from "next";
import { redirect } from "next/navigation";
import dynamic from "next/dynamic";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import FAQ from "@/components/FAQ";

const Problem    = dynamic(() => import("@/components/Problem"));
const IAfrentes  = dynamic(() => import("@/components/IAfrentes"));
const Authority  = dynamic(() => import("@/components/Authority"));
const FinalCTA   = dynamic(() => import("@/components/FinalCTA"));
const Footer     = dynamic(() => import("@/components/Footer"));

const webPageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": "https://resueltoagency.com/#webpage",
  "url": "https://resueltoagency.com",
  "name": "RESUELTO — Comunicación Comercial B2B · Lima",
  "description": "RESUELTO es una agencia de comunicación comercial en Lima, Perú, especializada en sistemas audiovisuales de autoridad y automatización con IA para empresas técnicas e industriales B2B. Clientes activos: WIN Internet, Livoltek.",
  "inLanguage": "es-PE",
  "dateModified": "2026-05-01",
  "isPartOf": { "@id": "https://resueltoagency.com/#website" },
  "publisher": { "@id": "https://resueltoagency.com/#organization" },
};

export const metadata: Metadata = {
  title: "RESUELTO — Comunicación Comercial B2B · Lima, Perú",
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
    <main id="main-content" className="relative overflow-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }}
      />
      <Navbar />
      <Hero />
      <Problem />
      <IAfrentes />
      <Authority />
      <FAQ />
      <FinalCTA />
      <Footer />
    </main>
  );
}
