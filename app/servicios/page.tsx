import Navbar from "@/components/Navbar";
import Servicios from "@/components/Servicios";
import Footer from "@/components/Footer";
import { SITE } from "@/lib/constants";
import type { Metadata } from "next";
import UltimasNoticias from "@/components/noticias/UltimasNoticias";

export const metadata: Metadata = {
  title: `Servicios de marketing y publicidad con IA en Lima — ${SITE.brandName}`,
  description:
    "Google Ads, SEO, diseño de páginas web, tiendas virtuales, spots publicitarios con IA, eventos corporativos, videojuegos a medida y capacitación en IA para empresas en Lima.",
  alternates: { canonical: "https://www.resueltoagency.com/servicios" },
  openGraph: {
    title: `Servicios — ${SITE.brandName}`,
    description:
      "Ocho servicios en tres áreas: marketing digital, publicidad con IA y eventos, y capacitación en IA.",
    url: "https://www.resueltoagency.com/servicios",
  },
};

// Se regenera cada 6 h, igual que el portal: la franja de noticias de
// abajo sale de los mismos feeds y comparte su caché, así que esta
// página no paga ninguna petición extra por mostrarla.
export const revalidate = 21600;

export default function ServiciosPage() {
  return (
    <main className="relative">
      <Navbar />
      <Servicios />
      {/* Prueba de vigencia donde está el prospecto: tres titulares de
          hoy responden sin decirlo si acá se está al día de verdad. */}
      <UltimasNoticias />
      <Footer />
    </main>
  );
}
