import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  AcademyHero,
  AcademyAuthorityBar,
  AcademyShift,
  AcademyMechanism,
  AcademyTransformation,
  AcademyCurriculum,
  AcademyProof,
  AcademyValueStack,
  AcademyPricing,
  AcademyForWho,
  AcademyFAQ,
  AcademyFinalCTA,
} from "@/components/AcademyClient";

export const metadata: Metadata = {
  title: "CONTENT IA SYSTEM — Dirige la IA como un Director Creativo | RESUELTO Academy",
  description:
    "El sistema premium que usan las agencias para crear contenido publicitario cinematográfico con IA — estrategia, guión y producción. Programa de 12 semanas con Manuel Severo (ex TBWA, Fahrenheit DDB).",
  keywords: [
    "curso contenido con IA",
    "curso publicidad con inteligencia artificial",
    "creativo IA publicitario",
    "content ia system",
    "curso director creativo IA peru",
    "produccion audiovisual con IA",
  ],
  alternates: { canonical: "https://resueltoagency.com/academy" },
  openGraph: {
    title: "CONTENT IA SYSTEM — RESUELTO Academy",
    description:
      "Aprende el sistema de dirección creativa con IA que uso con marcas grandes. Estrategia + guión + producción cinematográfica. 12 semanas.",
    url: "https://resueltoagency.com/academy",
    siteName: "RESUELTO",
    locale: "es_PE",
    type: "website",
  },
};

export default function AcademyPage() {
  return (
    <main className="relative overflow-hidden" style={{ background: "var(--bg)", minHeight: "100vh" }}>
      <Navbar minimal />
      <AcademyHero />
      <AcademyAuthorityBar />
      <AcademyShift />
      <AcademyMechanism />
      <AcademyTransformation />
      <AcademyCurriculum />
      <AcademyProof />
      <AcademyValueStack />
      <AcademyPricing />
      <AcademyForWho />
      <AcademyFAQ />
      <AcademyFinalCTA />
      <Footer />
    </main>
  );
}
