import Navbar from "@/components/Navbar";
import Nosotros from "@/components/Nosotros";
import Footer from "@/components/Footer";
import { SITE } from "@/lib/constants";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: `Sobre nosotros — ${SITE.brandName}`,
  description:
    "Tres socios, un solo estándar: estrategia, producción con IA y tecnología. El criterio se forjó en Fahrenheit DDB, Quanticofilms y TBWA Perú produciendo para Wong, BCP y Cencosud.",
  alternates: { canonical: "https://resueltoagency.com/sobre-mi" },
  openGraph: {
    title: `Sobre nosotros — ${SITE.brandName}`,
    description:
      "Tres socios, un solo estándar: estrategia, producción con IA y tecnología. Criterio de agencia global, velocidad de IA.",
    url: "https://resueltoagency.com/sobre-mi",
  },
};

export default function SobreNosotrosPage() {
  return (
    <main className="relative">
      <Navbar />
      <Nosotros />
      <Footer />
    </main>
  );
}
