import PortalNav from "@/components/taller/PortalNav";
import RecursosClient from "@/components/taller/RecursosClient";
import { estaDesbloqueado } from "@/lib/taller/session";

export default async function RecursosPage() {
  const desbloqueado = await estaDesbloqueado();
  return (
    <>
      <PortalNav desbloqueado={desbloqueado} />
      <RecursosClient desbloqueado={desbloqueado} />
    </>
  );
}
