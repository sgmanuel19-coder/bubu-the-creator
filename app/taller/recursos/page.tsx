import PortalNav from "@/components/taller/PortalNav";
import RecursosClient from "@/components/taller/RecursosClient";
import { estaDesbloqueado } from "@/lib/taller/session";

// Página interna del portal: no se indexa (la landing /taller sí).
export const metadata = { robots: { index: false, follow: false } };

export default async function RecursosPage() {
  const desbloqueado = await estaDesbloqueado();
  return (
    <>
      <PortalNav desbloqueado={desbloqueado} />
      <RecursosClient desbloqueado={desbloqueado} />
    </>
  );
}
