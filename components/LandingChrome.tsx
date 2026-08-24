"use client";

import { usePathname } from "next/navigation";
import CursorTrail from "@/components/CursorTrail";
import ScrollProgress from "@/components/ScrollProgress";
import CookieConsentBanner from "@/components/CookieConsentBanner";
import FacebookPixel from "@/components/FacebookPixel";

/**
 * UI global de la landing (cursor, progreso, cookies, píxel).
 * No se renderiza dentro de RESUELTO / IA CONTENT SYSTEM.
 *
 * La barra flotante de CTA (StickyCTA) se retiró: se renderizaba desde
 * el layout raíz, o sea en TODO el sitio — incluido el portal de
 * noticias, donde no pinta nada. El componente sigue en el repo por si
 * se quiere reponer en una landing puntual, pero ya no es global.
 */
export default function LandingChrome() {
  const pathname = usePathname();
  if (pathname?.startsWith("/ia-content-system")) return null;

  return (
    <>
      <ScrollProgress />
      <CursorTrail />
      <CookieConsentBanner />
      {/* El píxel de Meta vivía solo en /sistemas-ia; al convertir esa ruta
          en redirect dejó de dispararse en TODO el sitio. Va aquí para que
          cubra la landing completa. Se auto-desactiva sin consentimiento de
          cookies o sin NEXT_PUBLIC_FACEBOOK_PIXEL_ID válido. */}
      <FacebookPixel />
    </>
  );
}
