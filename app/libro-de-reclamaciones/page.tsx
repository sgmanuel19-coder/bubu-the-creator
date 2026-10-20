import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LibroReclamaciones from "@/components/LibroReclamaciones";
import { SITE } from "@/lib/constants";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: `Libro de Reclamaciones — ${SITE.brandName}`,
  description:
    "Libro de Reclamaciones virtual de RESUELTO SMART SOLUTIONS S.A.C., conforme al Código de Protección y Defensa del Consumidor.",
  alternates: { canonical: "https://www.resueltoagency.com/libro-de-reclamaciones" },
};

export default function LibroReclamacionesPage() {
  return (
    <main className="relative">
      <Navbar />
      <article
        className="mx-auto max-w-3xl px-6 pt-36 pb-24 font-body text-muted leading-relaxed
                   [&_a]:underline [&_a]:decoration-white/30 hover:[&_a]:text-cream"
      >
        <h1 className="font-display text-4xl md:text-5xl text-cream mb-3">Libro de Reclamaciones</h1>
        <p className="mb-10">
          Conforme al Código de Protección y Defensa del Consumidor, este establecimiento cuenta con un
          Libro de Reclamaciones a tu disposición.
        </p>
        <LibroReclamaciones />
      </article>
      <Footer />
    </main>
  );
}
