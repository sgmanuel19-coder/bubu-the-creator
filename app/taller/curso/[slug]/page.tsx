import { notFound } from "next/navigation";
import PortalNav from "@/components/taller/PortalNav";
import CursoClient from "@/components/taller/CursoClient";
import { TALLER, buscarCurso, slugDeParte } from "@/lib/taller/content";
import { estaDesbloqueado } from "@/lib/taller/session";
import { bovedaGlobal } from "@/lib/taller/boveda-server";

// Página interna del portal: no se indexa (la landing /taller sí), pero sus
// enlaces sí se siguen: desde aquí se llega a las guías gratis indexables.
export const metadata = { robots: { index: false, follow: true } };

// Marca "hay video aquí" sin decir cuál. Nunca es un ID válido de YouTube.
const VIDEO_BLOQUEADO = "bloqueado";

// Pre-renderiza una página por cada curso publicado del catálogo.
// Una página por curso publicado y, en los cursos partidos por partes
// (ver cursosDelCatalogo), una por parte además de la del curso completo.
export function generateStaticParams() {
  const cursos = TALLER.cursos.filter((c) => c.disponible);
  return [
    ...cursos.map((c) => ({ slug: c.slug })),
    ...cursos
      .filter((c) => c.expandirModulos)
      .flatMap((c) => c.modulos.map((_, i) => ({ slug: slugDeParte(c.slug, i) }))),
  ];
}

export default async function CursoDetallePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const curso = buscarCurso(slug);
  if (!curso || !curso.disponible) notFound();
  const algunNivel = await estaDesbloqueado();
  // Los cursos grabados piden el nivel "grabado" o el acceso maestro.
  const desbloqueado = await estaDesbloqueado("grabado");

  // REGLA DE ORO: las props de un client component se serializan al HTML
  // aunque no se rendericen. Sin sesión, el ID real de YouTube no viaja —
  // solo el sentinel, que conserva el "esta lección tiene video" del que
  // depende la vista previa sin entregar el video pagado.
  const cursoSeguro = desbloqueado
    ? curso
    : {
        ...curso,
        modulos: curso.modulos.map((m) => ({
          ...m,
          lecciones: m.lecciones.map((l) => ({
            ...l,
            youtubeId: l.youtubeId ? VIDEO_BLOQUEADO : "",
          })),
        })),
      };

  return (
    <>
      <PortalNav desbloqueado={algunNivel} />
      <CursoClient
        curso={cursoSeguro}
        desbloqueado={desbloqueado}
        slugsGratis={bovedaGlobal().filter((r) => r.gratis).map((r) => r.slug)}
      />
    </>
  );
}
