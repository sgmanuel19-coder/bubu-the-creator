import { notFound } from "next/navigation";
import PortalNav from "@/components/taller/PortalNav";
import RecursoDetalle from "@/components/taller/RecursoDetalle";
import { bovedaGlobal, recursoBovedaPorSlug } from "@/lib/taller/content";
import { estaDesbloqueado } from "@/lib/taller/session";

// Página interna del portal: no se indexa (la landing /taller sí).
export const metadata = { robots: { index: false, follow: false } };

export function generateStaticParams() {
  return bovedaGlobal().map((recurso) => ({ slug: recurso.slug }));
}

export default async function RecursoPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const recurso = recursoBovedaPorSlug(slug);
  if (!recurso) notFound();
  const desbloqueado = await estaDesbloqueado();

  return (
    <>
      <PortalNav desbloqueado={desbloqueado} />
      <RecursoDetalle recurso={recurso} desbloqueado={desbloqueado} />
    </>
  );
}
