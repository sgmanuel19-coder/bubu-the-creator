import type { Metadata } from "next";
import { redirect } from "next/navigation";
import dynamic from "next/dynamic";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import FAQ from "@/components/FAQ";

const Problem      = dynamic(() => import("@/components/Problem"));
const Comparison   = dynamic(() => import("@/components/Comparison"));
const IAfrentes    = dynamic(() => import("@/components/IAfrentes"));
const Authority    = dynamic(() => import("@/components/Authority"));
const PricingTiers = dynamic(() => import("@/components/PricingTiers"));
const FinalCTA     = dynamic(() => import("@/components/FinalCTA"));
const Footer       = dynamic(() => import("@/components/Footer"));

const webPageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": "https://resueltoagency.com/#webpage",
  "url": "https://resueltoagency.com",
  "name": "RESUELTO — Creación de Contenido con IA para Empresas B2B",
  "description": "RESUELTO es una agencia de creación de contenido con IA en Lima, Perú. Videos con nivel cinematográfico generados con IA y automatización inteligente para empresas técnicas e industriales B2B — el nivel de una producción tradicional, en días y a una fracción del costo. Clientes activos: WIN Internet, Livoltek, Wellmax.",
  "inLanguage": "es-PE",
  "dateModified": "2026-06-11",
  "isPartOf": { "@id": "https://resueltoagency.com/#website" },
  "publisher": { "@id": "https://resueltoagency.com/#organization" },
};

export const metadata: Metadata = {
  title: "RESUELTO — Creación de Contenido con IA para Empresas B2B · Perú",
  description: "Agencia de creación de contenido con IA. Videos con nivel cinematográfico generados con IA para empresas B2B — el nivel de una producción tradicional de $5,000–$50,000, entregado en días a una fracción del costo.",
  keywords: [
    "creación de contenido con IA",
    "videos con IA para empresas",
    "producción de video con IA Peru",
    "agencia contenido IA Lima",
    "video IA publicitario",
    "contenido B2B con IA",
    "automatización con IA empresas",
    "videos cinematográficos IA",
    "agencia marketing B2B Lima",
    "alternativa producción audiovisual",
  ],
  alternates: {
    canonical: "https://resueltoagency.com",
  },
  openGraph: {
    title: "RESUELTO — Creación de Contenido con IA para Empresas B2B",
    description: "Videos con nivel cinematográfico generados con IA y automatización inteligente para empresas técnicas e industriales. En días, a una fracción del costo de una producción tradicional.",
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
      <Comparison />
      <IAfrentes />
      <Authority />
      <PricingTiers />
      <FAQ />
      <FinalCTA />
      <Footer />
    </main>
  );
}
