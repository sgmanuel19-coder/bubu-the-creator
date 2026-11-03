import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FormularioCotizacion from "@/components/FormularioCotizacion";
import { SITE } from "@/lib/constants";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: `Cotizar un proyecto — ${SITE.brandName}`,
  description: "Pide la cotización de tu proyecto: spot con IA, página web, eventos y más. Te respondemos en el día.",
  alternates: { canonical: "https://www.resueltoagency.com/cotizar" },
};

export default async function CotizarPage({ searchParams }: { searchParams: Promise<{ servicio?: string }> }) {
  const { servicio } = await searchParams;
  return (
    <main className="relative">
      <Navbar minimal />
      <article className="mx-auto max-w-2xl px-4 sm:px-6 pt-28 sm:pt-36 pb-24 font-body text-muted leading-relaxed">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#1A80FF]">Cotización</p>
        <h1 className="mt-3 font-display text-4xl md:text-5xl text-cream">Cuéntanos tu proyecto</h1>
        <p className="mt-4 mb-10">
          Un minuto y listo. Con esto te preparamos una propuesta cerrada y te escribimos por WhatsApp en el día.
        </p>
        <FormularioCotizacion inicial={servicio} />
      </article>
      <Footer />
    </main>
  );
}
