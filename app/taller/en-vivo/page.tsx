import PortalNav from "@/components/taller/PortalNav";
import EnVivoClient from "@/components/taller/EnVivoClient";
import { estaDesbloqueado } from "@/lib/taller/session";

// Página interna del portal: no se indexa (la landing /taller sí).
export const metadata = { robots: { index: false, follow: false } };

export default async function EnVivoPage() {
  const algunNivel = await estaDesbloqueado();
  // El en vivo pide su propio nivel ("vivo") o el acceso maestro.
  const desbloqueado = await estaDesbloqueado("vivo");
  return (
    <>
      <PortalNav desbloqueado={algunNivel} />
      <EnVivoClient desbloqueado={desbloqueado} />
    </>
  );
}
