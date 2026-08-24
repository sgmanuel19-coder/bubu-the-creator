import Navbar from "@/components/Navbar";
import Servicios from "@/components/Servicios";
import Footer from "@/components/Footer";
import { SITE } from "@/lib/constants";
import type { Metadata } from "next";
import UltimasNoticias from "@/components/noticias/UltimasNoticias";

export const metadata: Metadata = {
  title: `Servicios — ${SITE.brandName}`,
  description:
    "Producción con IA, diseño, web y automatización comercial: Contenido IA, Comerciales IA, páginas web, packaging, diseño BTL, chatbot IA, base de datos y email marketing.",
  alternates: { canonical: "https://www.resueltoagency.com/servicios" },
  openGraph: {
    title: `Servicios — ${SITE.brandName}`,
    description:
      "Producción con IA, diseño, web y automatización comercial. Ocho servicios, un mismo estándar: nivel de agencia global, velocidad de IA.",
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
