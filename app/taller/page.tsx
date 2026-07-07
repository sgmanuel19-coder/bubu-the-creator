import PortalNav from "@/components/taller/PortalNav";
import TallerGate from "@/components/taller/TallerGate";
import { estaDesbloqueado } from "@/lib/taller/session";

// INICIO del portal — página de venta pública. Es una pestaña más del
// portal (junto a Cursos, En vivo, etc.), con la misma barra de navegación.
export default async function TallerPage() {
  const desbloqueado = await estaDesbloqueado();
  return (
    <>
      <PortalNav desbloqueado={desbloqueado} />
      <TallerGate />
    </>
  );
}
