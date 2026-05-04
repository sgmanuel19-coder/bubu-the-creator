import type { Metadata } from "next";
import dynamic from "next/dynamic";
import Navbar from "@/components/Navbar";

const Proof            = dynamic(() => import("@/components/Proof"));
const CaseSummaryCards = dynamic(() => import("@/components/CaseSummaryCards"));
const FinalCTA         = dynamic(() => import("@/components/FinalCTA"));
const Footer           = dynamic(() => import("@/components/Footer"));

export const metadata: Metadata = {
  title: "Casos — RESUELTO",
  description: "Resultados reales de empresas B2B que implementaron sistemas de comunicación y automatización con RESUELTO.",
};

export default function CasosPage() {
  return (
    <main className="relative overflow-hidden">
      <Navbar />
      <Proof />
      <CaseSummaryCards />
      <FinalCTA />
      <Footer />
    </main>
  );
}
