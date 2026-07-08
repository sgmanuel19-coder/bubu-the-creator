import PortalNav from "@/components/taller/PortalNav";
import CatalogoClient from "@/components/taller/CatalogoClient";
import { estaDesbloqueado } from "@/lib/taller/session";

// Página interna del portal: no se indexa (la landing /taller sí).
export const metadata = { robots: { index: false, follow: false } };

export default async function CursoCatalogoPage() {
  const desbloqueado = await estaDesbloqueado();
  return (
    <>
      <PortalNav desbloqueado={desbloqueado} />
      <CatalogoClient desbloqueado={desbloqueado} />
    </>
  );
}
