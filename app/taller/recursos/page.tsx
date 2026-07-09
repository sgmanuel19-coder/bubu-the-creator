import PortalNav from "@/components/taller/PortalNav";
import RecursosClient from "@/components/taller/RecursosClient";
import { bovedaParaTarjetas } from "@/lib/taller/boveda-server";
import { estaDesbloqueado, nivelesActivos } from "@/lib/taller/session";

// Página interna del portal: no se indexa (la landing /taller sí).
export const metadata = { robots: { index: false, follow: false } };

export default async function RecursosPage() {
  const algunNivel = await estaDesbloqueado();
  // Los recursos normales de la bóveda pertenecen al acceso de cursos.
  const desbloqueado = await estaDesbloqueado("grabado");
  const niveles = await nivelesActivos();
  return (
    <>
      <PortalNav desbloqueado={algunNivel} />
      {/* Solo la versión "tarjeta" (sin contenido real) viaja al cliente */}
      <RecursosClient recursos={bovedaParaTarjetas()} desbloqueado={desbloqueado} niveles={niveles} />
    </>
  );
}
