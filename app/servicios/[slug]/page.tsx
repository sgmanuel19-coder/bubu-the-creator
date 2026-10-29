import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { IBM_Plex_Mono } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ServicioDetalle from "@/components/ServicioDetalle";
import { SERVICIOS } from "@/lib/servicios";
import { DETALLE, type DetalleServicio } from "@/lib/servicios-detalle";
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

// En producción el componente esconde lo de revisión, pero todo lo que recibe
// viaja igual en el payload de Next y se lee en el código fuente. Por eso se
// filtra aquí, en el servidor: notas internas, casos y pasos sin autorización
// y piezas pendientes no salen de producción.
function paraPublico(d: DetalleServicio): DetalleServicio {
  const destacado =
    d.destacado?.tipo === "pasos" && d.destacado.requiereAutorizacion ? undefined : d.destacado;
  return {
    ...d,
    pendientes: [],
    casos: d.casos.filter((c) => !c.requiereAutorizacion),
    portafolio: d.portafolio.filter((p) => p.tipo !== "pendiente"),
    destacado,
  };
}

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
  const revision = process.env.VERCEL_ENV !== "production";
  const base = DETALLE[slug];
  if (i === -1 || !base) notFound();
  const d = revision ? base : paraPublico(base);

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
        revision={revision}
      />
      <Footer />
    </main>
  );
}
