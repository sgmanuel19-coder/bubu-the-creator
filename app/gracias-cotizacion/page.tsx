import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SeguirPorWhatsApp from "@/components/SeguirPorWhatsApp";
import { SITE } from "@/lib/constants";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: `Pedido recibido — ${SITE.brandName}`,
  robots: { index: false, follow: false },
};

// Agenda de Resuelto (sin ?month=, para que no quede en un mes pasado).
const CALENDLY = "https://calendly.com/resueltoagency/30min";

type Params ={ servicio?: string; rango?: string; plazo?: string; pedido?: string };

export default async function GraciasCotizacionPage({ searchParams }: { searchParams: Promise<Params> }) {
  const q = await searchParams;
  return (
    <main className="relative">
      <Navbar minimal />
      <article className="mx-auto max-w-2xl px-4 sm:px-6 pt-28 sm:pt-36 pb-24 font-body text-muted leading-relaxed">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#1A80FF]">Pedido recibido</p>
        <h1 className="mt-3 font-display text-4xl md:text-5xl text-cream">Recibimos su pedido</h1>
        <p className="mt-4 mb-10">
          Gracias, nos pondremos en contacto con ustedes lo más pronto posible. Si quieren adelantar, sigan la
          conversación por WhatsApp: el mensaje ya va con el resumen del pedido.
        </p>
        <SeguirPorWhatsApp {...q} />
        <div className="mt-8 rounded-2xl border border-white/10 p-6 sm:p-8">
          <p className="text-cream">¿Necesitan reunirse con urgencia?</p>
          <p className="mt-2 text-sm">Agenden una reunión de 30 minutos en el horario que les acomode.</p>
          <a
            href={CALENDLY}
            data-loc="gracias_cotizacion"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline mt-5 w-full justify-center py-4 text-base sm:w-auto sm:px-10"
          >
            Agendar una reunión →
          </a>
        </div>
      </article>
      <Footer />
    </main>
  );
}
