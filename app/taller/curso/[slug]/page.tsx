import { notFound } from "next/navigation";
import PortalNav from "@/components/taller/PortalNav";
import CursoClient from "@/components/taller/CursoClient";
import { TALLER, buscarCurso } from "@/lib/taller/content";

// Pre-renderiza una página por cada curso publicado del catálogo.
export function generateStaticParams() {
  return TALLER.cursos.filter((c) => c.disponible).map((c) => ({ slug: c.slug }));
}

export default async function CursoDetallePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const curso = buscarCurso(slug);
  if (!curso || !curso.disponible) notFound();

  return (
    <>
      <PortalNav />
      <CursoClient curso={curso} />
    </>
  );
}
