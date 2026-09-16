import type { Metadata } from "next";

import EmbudoAcademy from "@/components/EmbudoAcademy";
import LegalNotice from "@/components/LegalNotice";
import { SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Empezar — RESUELTO Academy",
  description:
    "Tres preguntas y te digo exactamente qué te falta para producir contenido publicitario que venda. El método de dirección creativa con IA de un publicista de TBWA y Fahrenheit DDB.",
  alternates: { canonical: "https://www.resueltoagency.com/empezar" },
  // noindex a propósito, igual que /masterclass: las tres landings
  // (/taller, /masterclass, /empezar) venden lo mismo y si compiten en
  // Google se canibalizan. /taller se queda con el orgánico; esta existe
  // solo para pauta. Además el contenido se revela por pasos, así que
  // indexarla no tendría sentido.
  robots: { index: false, follow: true },
  openGraph: {
    title: "Ya sabes generar. Te falta dirigir. — RESUELTO Academy",
    description:
      "Tres preguntas, tu diagnóstico, y por dónde empezar. Un minuto.",
    url: "https://www.resueltoagency.com/empezar",
    images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
  },
};

export default function EmpezarPage() {
  return (
    <main className="relative">
      {/* Sin Navbar a propósito: el embudo no debe ofrecer puertas de
          salida. El único escape es el enlace del pie a /masterclass,
          para quien prefiere ver todo de una vez. */}
      <EmbudoAcademy />

      <footer className="lp-footer">
        <div className="container-base">
          <div className="lp-footer-top">
            <span className="lp-footer-brand">{SITE.brandName}</span>
            <span className="lp-footer-legal">
              Lima, Perú · {SITE.email} · © {new Date().getFullYear()} RESUELTO SMART SOLUTIONS S.A.C.
            </span>
          </div>
          {/* Obligatorio para pauta en Meta: la ruta corre el Píxel. */}
          <div className="lp-footer-docs">
            <LegalNotice />
          </div>
        </div>
      </footer>
    </main>
  );
}
