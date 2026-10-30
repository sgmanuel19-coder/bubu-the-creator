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
  "name": "RESUELTO — Agencia de marketing y publicidad con IA en Lima",
  "description": "RESUELTO es una agencia y consultora de publicidad impulsada con IA en Lima, Perú: spots y contenido de marca, eventos y ferias, páginas web, tiendas virtuales, Google Ads, SEO, videojuegos a medida y capacitación en IA — dirigidos con 7+ años de criterio en agencias globales. Clientes activos: WIN Internet, Livoltek, Wellmax.",
  "inLanguage": "es-PE",
  "dateModified": "2026-10-29",
  "isPartOf": { "@id": "https://www.resueltoagency.com/#website" },
  "publisher": { "@id": "https://www.resueltoagency.com/#organization" },
};

export const metadata: Metadata = {
  // Doc 12 de SEO: título ≤ 60 sin la marca y descripción ≤ 155.
  title: { absolute: "Agencia de marketing y publicidad con IA en Lima" },
  description: "Spots y contenido con IA, eventos y ferias, páginas web, tiendas virtuales, Google Ads y SEO para empresas en Lima. Precio cerrado y entrega en semanas.",
  keywords: [
    "agencia de marketing y publicidad con IA",
    "agencia de publicidad Lima",
    "spot publicitario con IA",
    "eventos corporativos y ferias",
    "diseño de páginas web Lima",
    "tienda virtual para empresas",
    "agencia de Google Ads Lima",
    "agencia SEO Lima",
    "videojuegos a medida para eventos",
    "capacitación en IA para empresas",
  ],
  alternates: {
    canonical: "https://www.resueltoagency.com",
  },
  openGraph: {
    title: "RESUELTO — Agencia de marketing y publicidad con IA en Lima",
    description: "Spots y contenido con IA, eventos y ferias, páginas web, tiendas virtuales, Google Ads y SEO para empresas en Lima. Precio cerrado y entrega en semanas.",
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
