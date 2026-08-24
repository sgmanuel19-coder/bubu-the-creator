import Navbar from "@/components/Navbar";
import Servicios from "@/components/Servicios";
import Footer from "@/components/Footer";
import { SITE } from "@/lib/constants";
import type { Metadata } from "next";

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

export default function ServiciosPage() {
  return (
    <main className="relative">
      <Navbar />
      <Servicios />
      <Footer />
    </main>
  );
}
