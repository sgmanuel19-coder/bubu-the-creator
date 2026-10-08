import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { IBM_Plex_Mono } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ServicioDetalle from "@/components/ServicioDetalle";
import { SERVICIOS } from "@/lib/servicios";
import { DETALLE } from "@/lib/servicios-detalle";
import { SITE } from "@/lib/constants";

// Mono técnica de la capa de metadatos (folio, niveles, órdenes). Se carga
// solo en estas páginas: el resto del sitio no la paga.
const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-plex-mono",
  display: "swap",
});

const BASE = "https://www.resueltoagency.com";

export function generateStaticParams() {
  return SERVICIOS.filter((s) => DETALLE[s.id]).map((s) => ({ slug: s.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const s = SERVICIOS.find((x) => x.id === slug);
  const d = DETALLE[slug];
  if (!s || !d) return {};
  const url = `${BASE}/servicios/${s.id}`;
  // El título sale del H1, escrito sobre la tabla de palabras clave (doc 07 §0).
  const titulo = `${d.h1} ${d.h1Acento}`.replace(/\s+/g, " ").trim();
  return {
    title: `${titulo} | ${SITE.brandName}`,
    description: d.bajada,
    alternates: { canonical: url },
    openGraph: { title: titulo, description: d.bajada, url },
  };
}

export default async function ServicioPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const i = SERVICIOS.findIndex((x) => x.id === slug);
  const d = DETALLE[slug];
  if (i === -1 || !d) notFound();

  const s = SERVICIOS[i];
  const siguiente = SERVICIOS[(i + 1) % SERVICIOS.length];
  const url = `${BASE}/servicios/${s.id}`;

  // Datos estructurados: el servicio, sus preguntas frecuentes y la ruta.
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: s.title,
      description: d.bajada,
      url,
      areaServed: { "@type": "City", name: "Lima" },
      provider: { "@type": "Organization", name: "RESUELTO", url: BASE },
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: d.faq.map((q) => ({
        "@type": "Question",
        name: q.p,
        acceptedAnswer: { "@type": "Answer", text: q.r },
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Inicio", item: BASE },
        { "@type": "ListItem", position: 2, name: "Servicios", item: `${BASE}/servicios` },
        { "@type": "ListItem", position: 3, name: s.title, item: url },
      ],
    },
  ];

  return (
    <main className={`relative ${mono.variable}`}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Navbar />
      {/* `revision`: borradores, casos sin autorización y pendientes solo se
          ven en local y en las previews de Vercel. En producción no salen. */}
      <ServicioDetalle
        s={s}
        d={d}
        total={SERVICIOS.length}
        siguiente={siguiente}
        revision={process.env.VERCEL_ENV !== "production"}
      />
      <Footer />
    </main>
  );
}
