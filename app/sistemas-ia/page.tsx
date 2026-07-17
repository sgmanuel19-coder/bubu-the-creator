import { permanentRedirect } from "next/navigation";

// La landing de Sistemas IA fue absorbida por /servicios (tarjetas de
// automatización: chatbot, base de datos, email marketing). Redirect 308
// permanente para no romper links antiguos ni el SEO acumulado.
export default function SistemasIARedirect() {
  permanentRedirect("/servicios");
}
