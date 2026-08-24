import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Portafolio from "@/components/Portafolio";
import { SITE } from "@/lib/constants";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: `Portafolio — ${SITE.brandName}`,
  description:
    "Producción con IA para Wellmax, WIN, Livoltek y marca propia + track record en retail, FMCG y entretenimiento (Wong, Redondos, Mañana Me Caso). 20+ marcas, 5M+ vistas.",
  alternates: { canonical: "https://www.resueltoagency.com/casos" },
  openGraph: {
    title: `Portafolio — ${SITE.brandName}`,
    description:
      "Producción con IA para Wellmax, WIN, Livoltek y marca propia + track record en retail, FMCG y entretenimiento. 20+ marcas, 5M+ vistas.",
    url: "https://www.resueltoagency.com/casos",
  },
};

export default function CasosPage() {
  return (
    <main className="relative">
      <Navbar />
      <Portafolio />
      <Footer />
    </main>
  );
}
