import type { Metadata } from "next";
import dynamic from "next/dynamic";
import Navbar from "@/components/Navbar";

const Services               = dynamic(() => import("@/components/Services"));
const ServiciosFeatures      = dynamic(() => import("@/components/ServiciosFeatures"));
const Deliverables           = dynamic(() => import("@/components/Deliverables"));
const FinalCTA               = dynamic(() => import("@/components/FinalCTA"));
const Footer                 = dynamic(() => import("@/components/Footer"));

export const metadata: Metadata = {
  title: "Servicios — RESUELTO",
  description: "Sistemas audiovisuales, estrategia de contenido y automatización inteligente para empresas técnicas e industriales.",
};

export default function ServiciosPage() {
  return (
    <main className="relative overflow-hidden">
      <Navbar />
      <Services />
      <ServiciosFeatures />
      <Deliverables />
      <FinalCTA />
      <Footer />
    </main>
  );
}
