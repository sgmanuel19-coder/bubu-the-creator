import type { Metadata } from "next";

import LandingAcademy from "@/components/LandingAcademy";
import LegalNotice from "@/components/LegalNotice";
import Navbar from "@/components/Navbar";
import { SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Masterclass de Creatividad Publicitaria IA — RESUELTO Academy",
  description:
    "Los tutoriales te enseñan a ejecutar. Ninguno te enseña a decidir. El método de dirección creativa con IA de un publicista de TBWA y Fahrenheit DDB.",
  alternates: { canonical: "https://www.resueltoagency.com/masterclass" },
  // noindex a propósito. Esta landing y /taller venden lo mismo: si las
  // dos compiten en Google se canibalizan y ninguna rankea bien.
  // /taller se queda con el tráfico orgánico; esta existe solo para la
  // pauta, donde el buscador no interviene.
  robots: { index: false, follow: true },
  openGraph: {
    title: "Ya sabes generar. Te falta dirigir. — RESUELTO Academy",
    description:
      "El trabajo que decide si una pieza funciona ocurre antes de abrir cualquier herramienta. Eso se llama dirección creativa.",
    url: "https://www.resueltoagency.com/masterclass",
  },
};

export default function MasterclassPage() {
  return (
    <main className="relative">
      {/* minimal: sin links de navegación. La landing tiene un solo
          destino (WhatsApp) y no debe ofrecer puertas de salida. */}
      <Navbar minimal />
      <LandingAcademy />

      {/* Footer mínimo. El bloque legal es obligatorio para pauta en Meta:
          la landing corre el Pixel, así que privacidad y cookies deben estar
          accesibles desde la propia página. */}
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
