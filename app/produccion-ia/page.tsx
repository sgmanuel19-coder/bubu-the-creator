import Navbar from "@/components/Navbar";
import LandingProduccionIA from "@/components/LandingProduccionIA";
import LegalNotice from "@/components/LegalNotice";
import { SITE } from "@/lib/constants";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Producción audiovisual con IA para empresas — RESUELTO",
  description:
    "Sistema audiovisual con dirección de agencia global y motores de IA. Nivel televisión, entregado en semanas, con precio cerrado. Criterio forjado en TBWA y Fahrenheit DDB.",
  alternates: { canonical: "https://resueltoagency.com/produccion-ia" },
  openGraph: {
    title: "Tu empresa vale más de lo que comunica — RESUELTO",
    description:
      "Producción audiovisual con IA para empresas técnicas e industriales. Semanas, no meses. Precio cerrado.",
    url: "https://resueltoagency.com/produccion-ia",
  },
};

export default function ProduccionIAPage() {
  return (
    <main className="relative">
      {/* minimal: sin links de navegación ni CTA duplicado — la landing
          tiene un solo destino y no debe ofrecer puertas de salida. */}
      <Navbar minimal />
      <LandingProduccionIA />

      {/* Footer mínimo. El bloque legal es obligatorio para pauta en Meta:
          la landing corre el Pixel, así que privacidad y cookies deben estar
          accesibles desde la propia página. Va colapsado para no competir
          con el CTA. */}
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
