import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SeguirPorWhatsApp from "@/components/SeguirPorWhatsApp";
import { SITE } from "@/lib/constants";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: `Pedido recibido — ${SITE.brandName}`,
  robots: { index: false, follow: false },
};

type Params = { servicio?: string; rango?: string; plazo?: string; pedido?: string };

export default async function GraciasCotizacionPage({ searchParams }: { searchParams: Promise<Params> }) {
  const q = await searchParams;
  return (
    <main className="relative">
      <Navbar minimal />
      <article className="mx-auto max-w-2xl px-4 sm:px-6 pt-28 sm:pt-36 pb-24 font-body text-muted leading-relaxed">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#1A80FF]">Pedido recibido</p>
        <h1 className="mt-3 font-display text-4xl md:text-5xl text-cream">Gracias, ya tenemos tu pedido</h1>
        <p className="mt-4 mb-10">
          Te escribimos por WhatsApp en el día con los siguientes pasos. Si quieres adelantar, sigue la conversación
          ahora: el mensaje ya va con el resumen de tu pedido.
        </p>
        <SeguirPorWhatsApp {...q} />
      </article>
      <Footer />
    </main>
  );
}
