import Radar from "@/components/noticias/Radar";
import { obtenerPortada } from "@/lib/noticias/feed";
import { SITE } from "@/lib/constants";
import type { Metadata } from "next";

// El portal se regenera solo cada 6 horas (ISR): nunca queda más
// de eso desactualizado y no depende de que nadie prenda nada.
// Debe ser un literal — Next lo analiza en tiempo de compilación.
// Fuente de verdad del número: REVALIDAR_SEGUNDOS en lib/noticias/feed.ts
export const revalidate = 21600;

// La marca visible es "La noticIA"; el título de búsqueda además explica
// de qué va, para no perder tráfico de quien busca el tema y no el nombre.
export const metadata: Metadata = {
  title: `La noticIA — noticias de inteligencia artificial aplicada | ${SITE.brandName}`,
  description:
    "Inteligencia artificial aplicada, actualizada todos los días: producción de imagen y video, agentes y herramientas, proyectos hechos con IA, negocio y marketing, medicina y ciencia.",
  keywords: [
    "noticias inteligencia artificial",
    "noticias IA español",
    "IA aplicada",
    "agentes de IA",
    "generación de video con IA",
    "IA marketing",
    "proyectos hechos con IA",
  ],
  alternates: { canonical: "https://resueltoagency.com/noticias" },
  openGraph: {
    type: "website",
    title: `La noticIA — ${SITE.brandName}`,
    description:
      "No todo lo que pasa en IA: solo lo que se puede usar, construir o vender. Se actualiza todos los días.",
    url: "https://resueltoagency.com/noticias",
  },
};

export default async function NoticiasPage() {
  const portada = await obtenerPortada();

  // El Radar es su propia vertical: lleva cabecera y pie propios, sin el
  // menú de ventas de la agencia. Vive en este dominio por SEO (hereda la
  // autoridad ya construida), pero se lee como un portal aparte.
  return <Radar portada={portada} />;
}
