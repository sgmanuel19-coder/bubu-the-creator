import Navbar from "@/components/Navbar";
import LandingEnergia from "@/components/LandingEnergia";
import LegalNotice from "@/components/LegalNotice";
import { SITE } from "@/lib/constants";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "IA Visual System — Sistema audiovisual para el sector energía | RESUELTO",
  description:
    "Videocaso, cobertura de ferias e imágenes con IA para distribuidores, EPC e instaladores de energía en Perú, Colombia y Chile. USD 4,200 + IGV al mes.",
  alternates: { canonical: "https://www.resueltoagency.com/energia" },
  openGraph: {
    title: "Todos venden el mismo inversor. Gana el que mejor lo explica.",
    description:
      "IA Visual System: el sistema audiovisual mensual para el canal de energía. Videocaso, coberturas de feria, entrevistas e imágenes con IA.",
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
