import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { PrivacidadContenido } from "@/components/LegalNotice";
import { SITE } from "@/lib/constants";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: `Política de Privacidad — ${SITE.brandName}`,
  description:
    "Cómo RESUELTO SMART SOLUTIONS S.A.C. trata los datos personales recogidos en resueltoagency.com, conforme a la Ley N.º 29733.",
  alternates: { canonical: "https://www.resueltoagency.com/privacidad" },
};

export default function PrivacidadPage() {
  return (
    <main className="relative">
      <Navbar />
      <article
        className="mx-auto max-w-3xl px-6 pt-36 pb-24 font-body text-muted space-y-5
                   leading-relaxed [&_strong]:text-cream [&_strong]:font-semibold
                   [&_a]:underline [&_a]:decoration-white/30 hover:[&_a]:text-cream"
      >
        <h1 className="font-display text-4xl md:text-5xl text-cream mb-2">
          Política de Privacidad
        </h1>
        <p className="text-sm text-muted/60">Última actualización: 18 de octubre de 2026</p>
        <PrivacidadContenido />
      </article>
      <Footer />
    </main>
  );
}
