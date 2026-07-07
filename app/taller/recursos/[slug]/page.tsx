import { notFound } from "next/navigation";
import PortalNav from "@/components/taller/PortalNav";
import RecursoDetalle from "@/components/taller/RecursoDetalle";
import { buscarRecurso, recursosGlobales } from "@/lib/taller/content";
import { estaDesbloqueado } from "@/lib/taller/session";

export function generateStaticParams() {
  return recursosGlobales().map(({ recurso }) => ({ slug: recurso.slug }));
}

export default async function RecursoPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const encontrado = buscarRecurso(slug);
  if (!encontrado) notFound();
  const desbloqueado = await estaDesbloqueado();

  return (
    <>
      <PortalNav desbloqueado={desbloqueado} />
      <RecursoDetalle
        recurso={encontrado.recurso}
        cursoTitulo={encontrado.curso.titulo}
        desbloqueado={desbloqueado}
      />
    </>
  );
}
