import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PortalNav from "@/components/taller/PortalNav";
import RecursoDetalle from "@/components/taller/RecursoDetalle";
import { bovedaGlobal, recursoBovedaPorSlug } from "@/lib/taller/boveda-server";
import { estaDesbloqueado } from "@/lib/taller/session";

export function generateStaticParams() {
  return bovedaGlobal().map((recurso) => ({ slug: recurso.slug }));
}

// Las guías GRATIS son imanes públicos: se indexan con su propia metadata
// (entrada SEO al embudo). Todo lo demás del portal sigue noindex.
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const recurso = recursoBovedaPorSlug(slug);
  if (!recurso || !recurso.gratis) {
    return { robots: { index: false, follow: false } };
  }
  const url = `https://www.resueltoagency.com/taller/recursos/${recurso.slug}`;
  return {
    title: `${recurso.titulo} — RESUELTO Academy`,
    description: recurso.descripcion,
    alternates: { canonical: url },
    openGraph: {
      title: recurso.titulo,
      description: recurso.descripcion,
      url,
      type: "article",
    },
  };
}

export default async function RecursoPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const recurso = recursoBovedaPorSlug(slug);
  if (!recurso) notFound();
  const algunNivel = await estaDesbloqueado();
  // Gratis → abierta para todos (imán público). Premium pide su propio
  // nivel (o "todo"); los normales, el acceso de cursos.
  const desbloqueado = recurso.gratis
    ? true
    : recurso.premium
      ? await estaDesbloqueado(recurso.slug)
      : await estaDesbloqueado("grabado");

  // REGLA DE ORO: las props de un client component se serializan al
  // navegador aunque no se rendericen. Sin el nivel correcto, el recurso
  // viaja SIN secciones ni descargas — solo el índice de títulos.
  const recursoSeguro = desbloqueado
    ? recurso
    : { ...recurso, secciones: undefined, descargas: undefined };
  const indiceTitulos = !desbloqueado
    ? (recurso.secciones ?? []).map((s) => s.titulo)
    : undefined;

  return (
    <>
      <PortalNav desbloqueado={algunNivel} />
      <RecursoDetalle
        recurso={recursoSeguro}
        desbloqueado={desbloqueado}
        indiceTitulos={indiceTitulos}
      />
    </>
  );
}
