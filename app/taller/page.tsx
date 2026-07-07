import TallerGate from "@/components/taller/TallerGate";

// INICIO del portal — página de venta pública. Es una pestaña más del
// portal (junto a Cursos, En vivo, etc.), así que se muestra a todos,
// alumnos o no. La conversión y el login viven dentro de TallerGate.
export default function TallerPage() {
  return <TallerGate />;
}
