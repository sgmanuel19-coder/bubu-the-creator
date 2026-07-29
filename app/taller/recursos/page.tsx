import PortalNav from "@/components/taller/PortalNav";
import RecursosClient from "@/components/taller/RecursosClient";
import { bovedaParaTarjetas } from "@/lib/taller/boveda-server";
import { estaDesbloqueado, nivelesEfectivos } from "@/lib/taller/session";

// Página interna del portal: no se indexa (la landing /taller sí).
export const metadata = { robots: { index: false, follow: false } };

export default async function RecursosPage() {
  const algunNivel = await estaDesbloqueado();
  // La bóveda en general pide el nivel "boveda" (el más barato); los 4
  // recursos propios de la masterclass (cursoRelacionado === "Masterclass")
  // siguen pidiendo "grabado" — cada tarjeta decide el suyo en el cliente
  // con la lista de niveles ya expandida por la escalera de acceso.
  const desbloqueado = await estaDesbloqueado("boveda");
  const niveles = await nivelesEfectivos();
  return (
    <>
      <PortalNav desbloqueado={algunNivel} />
      {/* Solo la versión "tarjeta" (sin contenido real) viaja al cliente */}
      <RecursosClient recursos={bovedaParaTarjetas()} desbloqueado={desbloqueado} niveles={niveles} />
    </>
  );
}
