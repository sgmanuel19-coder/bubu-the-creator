import Radar from "@/components/noticias/Radar";
import { jsonLd } from "@/lib/jsonld";
import { obtenerPortada } from "@/lib/noticias/feed";
import { SITE } from "@/lib/constants";
import type { Metadata } from "next";

// El portal se regenera solo cada 6 horas (ISR): nunca queda más
// de eso desactualizado y no depende de que nadie prenda nada.
// Debe ser un literal — Next lo analiza en tiempo de compilación.
// Fuente de verdad del número: REVALIDAR_SEGUNDOS en lib/noticias/feed.ts
export const revalidate = 21600;

// Título: la palabra clave PRIMERO y la marca al final.
//
// El anterior media 70 caracteres ("La noticIA — noticias de inteligencia
// artificial aplicada | RESUELTO") y Google corta cerca de los 60: se
// perdía el "| RESUELTO" y, peor, gastaba el arranque —la posición que
// más pesa— en un nombre de marca que todavía no busca nadie. Google ya
// muestra el dominio encima del título, así que repetir la marca ahí es
// tirar caracteres.
//
// La descripción tenía 183 caracteres y se cortaba a los ~160, dejando
// "medicina y ciencia" fuera de la vista.
export const metadata: Metadata = {
  title: "Noticias de inteligencia artificial aplicada | La noticIA",
  description:
    "Noticias de IA que puedes usar: producción de imagen y video, agentes y herramientas, proyectos reales y negocio. Se actualiza todos los días.",
  keywords: [
    "noticias inteligencia artificial",
    "noticias IA español",
    "IA aplicada",
    "agentes de IA",
    "generación de video con IA",
    "IA marketing",
    "proyectos hechos con IA",
  ],
  alternates: {
    canonical: "https://www.resueltoagency.com/noticias",
    // Declara el feed propio en el <head>: es como los lectores de RSS
    // y otros agregadores lo descubren solos.
    types: {
      "application/rss+xml": [
        { url: "https://www.resueltoagency.com/noticias/feed.xml", title: "La noticIA" },
      ],
    },
  },
  openGraph: {
    type: "website",
    title: `La noticIA — ${SITE.brandName}`,
    description:
      "No todo lo que pasa en IA: solo lo que se puede usar, construir o vender. Se actualiza todos los días.",
    url: "https://www.resueltoagency.com/noticias",
  },
};

export default async function NoticiasPage() {
  const portada = await obtenerPortada();

  // Datos estructurados. Hasta ahora la página solo heredaba el marcado
  // de la agencia (Organization, WebSite): para Google esto era una
  // página cualquiera, no un listado de noticias. El ItemList le dice
  // qué es y en qué orden va, que es lo que leen los buscadores y los
  // asistentes cuando arman una respuesta.
  const datos = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "La noticIA",
    description:
      "Inteligencia artificial aplicada: lo que se puede usar, construir o vender.",
    url: "https://www.resueltoagency.com/noticias",
    inLanguage: "es",
    isPartOf: {
      "@type": "WebSite",
      name: SITE.brandName,
      url: "https://www.resueltoagency.com",
    },
    dateModified: portada.actualizado.toISOString(),
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: portada.todas.length,
      itemListElement: portada.todas.slice(0, 40).map((n, i) => ({
        "@type": "ListItem",
        position: i + 1,
        url: n.url,
        name: n.titulo,
      })),
    },
  };

  // El Radar es su propia vertical: lleva cabecera y pie propios, sin el
  // menú de ventas de la agencia. Vive en este dominio por SEO (hereda la
  // autoridad ya construida), pero se lee como un portal aparte.
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(datos) }}
      />
      <Radar portada={portada} />
    </>
  );
}
