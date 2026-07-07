import PortalNav from "@/components/taller/PortalNav";
import CatalogoClient from "@/components/taller/CatalogoClient";
import { estaDesbloqueado } from "@/lib/taller/session";

export default async function CursoCatalogoPage() {
  const desbloqueado = await estaDesbloqueado();
  return (
    <>
      <PortalNav desbloqueado={desbloqueado} />
      <CatalogoClient desbloqueado={desbloqueado} />
    </>
  );
}
