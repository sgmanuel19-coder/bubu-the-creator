import Navbar from "@/components/Navbar";
import LandingEnergia from "@/components/LandingEnergia";
import LegalNotice from "@/components/LegalNotice";
import { SITE } from "@/lib/constants";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "IA Visual System — Sistema audiovisual para el sector energía | RESUELTO",
  description:
    "Convertimos tus proyectos en casos de éxito: videocasos, coberturas de feria e imágenes potenciadas con IA para distribuidores, EPC e integradores de energía en Perú, Colombia y Chile.",
  alternates: { canonical: "https://www.resueltoagency.com/energia" },
  openGraph: {
    title: "Convertimos proyectos en casos de éxito que venden por ti.",
    description:
      "IA Visual System: videocasos y piezas comerciales potenciadas con IA para el canal de energía. Tus capacidades, tus resultados y tu impacto, contados como se merecen.",
    url: "https://www.resueltoagency.com/energia",
  },
};

export default function EnergiaPage() {
  return (
    <main className="relative">
      {/* minimal: la landing llega por cold email y tiene un solo destino —
          no debe ofrecer puertas de salida hacia el resto del sitio. */}
      <Navbar minimal />
      <LandingEnergia />

      <footer className="lp-footer">
        <div className="container-base">
          <div className="lp-footer-top">
            <span className="lp-footer-brand">{SITE.brandName}</span>
            <span className="lp-footer-legal">
              Lima, Perú · {SITE.email} · © {new Date().getFullYear()} RESUELTO SMART SOLUTIONS S.A.C.
            </span>
          </div>
          <div className="lp-footer-docs">
            <LegalNotice />
          </div>
        </div>
      </footer>
    </main>
  );
}
