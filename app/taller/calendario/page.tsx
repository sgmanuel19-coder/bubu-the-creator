import PortalNav from "@/components/taller/PortalNav";
import CalendarioClient from "@/components/taller/CalendarioClient";
import { estaDesbloqueado } from "@/lib/taller/session";

// Página interna del portal: no se indexa (la landing /taller sí).
export const metadata = { robots: { index: false, follow: false } };

export default async function CalendarioPage() {
  const desbloqueado = await estaDesbloqueado();
  return (
    <>
      <PortalNav desbloqueado={desbloqueado} />
      <CalendarioClient desbloqueado={desbloqueado} />
    </>
  );
}
