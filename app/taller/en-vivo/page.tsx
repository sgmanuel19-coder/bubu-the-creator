import PortalNav from "@/components/taller/PortalNav";
import EnVivoClient from "@/components/taller/EnVivoClient";
import { estaDesbloqueado } from "@/lib/taller/session";

export default async function EnVivoPage() {
  const desbloqueado = await estaDesbloqueado();
  return (
    <>
      <PortalNav desbloqueado={desbloqueado} />
      <EnVivoClient desbloqueado={desbloqueado} />
    </>
  );
}
