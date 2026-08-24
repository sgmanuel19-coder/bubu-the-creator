import type { Metadata } from "next";
import { redirect } from "next/navigation";
import dynamic from "next/dynamic";
import Navbar from "@/components/Navbar";
import HomeContent from "@/components/Home";

const Footer = dynamic(() => import("@/components/Footer"));

const webPageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": "https://www.resueltoagency.com/#webpage",
  "url": "https://www.resueltoagency.com",
  "name": "RESUELTO — Producción con IA, Diseño, Web y Automatización",
  "description": "RESUELTO es una agencia de producción con IA en Lima, Perú: comerciales de nivel televisión, contenido de marca, páginas web, packaging, diseño y automatización comercial — dirigidos con 5+ años de criterio en agencias globales. Clientes activos: WIN Internet, Livoltek, Wellmax.",
  "inLanguage": "es-PE",
  "dateModified": "2026-07-17",
  "isPartOf": { "@id": "https://www.resueltoagency.com/#website" },
  "publisher": { "@id": "https://www.resueltoagency.com/#organization" },
};

export const metadata: Metadata = {
  title: "RESUELTO — Producción con IA, Diseño, Web y Automatización · Perú",
  description: "Comerciales de nivel televisión, contenido de marca, páginas web y automatización comercial — generados con IA, dirigidos con 5+ años de criterio real. Portafolio real, cotización cerrada, entrega en semanas.",
  keywords: [
    "producción con IA",
    "comerciales con IA",
    "agencia contenido IA Lima",
    "video IA publicitario",
    "diseño con IA",
    "páginas web Perú",
    "automatización comercial con IA",
    "chatbot IA whatsapp",
    "videos cinematográficos IA",
    "agencia creativa Lima",
  ],
  alternates: {
    canonical: "https://www.resueltoagency.com",
  },
  openGraph: {
    title: "RESUELTO — Producción con IA, Diseño, Web y Automatización",
    description: "Comerciales de nivel televisión, contenido de marca, páginas web y automatización comercial — generados con IA, dirigidos con 5+ años de criterio real.",
    url: "https://www.resueltoagency.com",
  },
};

export default function Home() {
  // Si el proyecto Vercel tiene SITE_MODE=sistemas-ia (dominios antiguos del
  // Sistema IA), redirige a /servicios — la landing dedicada fue absorbida ahí.
  if (process.env.SITE_MODE === "sistemas-ia") {
    redirect("/servicios");
  }

  return (
    <main id="main-content" className="relative overflow-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }}
      />
      <Navbar />
      <HomeContent />
      <Footer />
    </main>
  );
}
