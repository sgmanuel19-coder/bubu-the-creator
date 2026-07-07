import PortalNav from "@/components/taller/PortalNav";
import CalendarioClient from "@/components/taller/CalendarioClient";
import { estaDesbloqueado } from "@/lib/taller/session";

export default async function CalendarioPage() {
  const desbloqueado = await estaDesbloqueado();
  return (
    <>
      <PortalNav desbloqueado={desbloqueado} />
      <CalendarioClient desbloqueado={desbloqueado} />
    </>
  );
}
