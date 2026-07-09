import { notFound } from "next/navigation";
import PortalNav from "@/components/taller/PortalNav";
import RecursoDetalle from "@/components/taller/RecursoDetalle";
import { bovedaGlobal, recursoBovedaPorSlug } from "@/lib/taller/boveda-server";
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
  const algunNivel = await estaDesbloqueado();
  // Premium pide su propio nivel (o "todo"); los normales, el de cursos.
  const desbloqueado = recurso.premium
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
