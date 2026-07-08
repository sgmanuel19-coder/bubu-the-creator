import type { Metadata } from "next";
import PortalNav from "@/components/taller/PortalNav";
import TallerGate from "@/components/taller/TallerGate";
import { estaDesbloqueado } from "@/lib/taller/session";

// La landing de venta SÍ se indexa y define su vista previa para compartir
// (WhatsApp/Meta usan OpenGraph; la imagen la genera opengraph-image.tsx).
export const metadata: Metadata = {
  title: "Masterclass de Creatividad Publicitaria IA | RESUELTO Academy",
  description:
    "No te enseño a usar la IA: te enseño a que la IA piense como un director creativo con 20 años de experiencia en tu negocio. Estrategia, producción con calidad de cine y cómo cobrarlo.",
  alternates: { canonical: "https://www.resueltoagency.com/taller" },
  openGraph: {
    title: "Masterclass de Creatividad Publicitaria IA",
    description:
      "El Cerebro Creativo IA: estrategia publicitaria con criterio de agencia + producción con calidad de cine. Sin cámara, sin productora.",
    url: "https://www.resueltoagency.com/taller",
    siteName: "RESUELTO Academy",
    locale: "es_PE",
    type: "website",
  },
};

// INICIO del portal — página de venta pública. Es una pestaña más del
// portal (junto a Cursos, En vivo, etc.), con la misma barra de navegación.
export default async function TallerPage() {
  const desbloqueado = await estaDesbloqueado();
  return (
    <>
      <PortalNav desbloqueado={desbloqueado} />
      <TallerGate />
    </>
  );
}
