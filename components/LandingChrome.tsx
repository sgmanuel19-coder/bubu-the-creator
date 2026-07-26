"use client";

import { usePathname } from "next/navigation";
import CursorTrail from "@/components/CursorTrail";
import StickyCTA from "@/components/StickyCTA";
import ScrollProgress from "@/components/ScrollProgress";
import CookieConsentBanner from "@/components/CookieConsentBanner";
import FacebookPixel from "@/components/FacebookPixel";

/**
 * UI global de la landing (CTA, cursor, cookies, píxel).
 * No se renderiza dentro de RESUELTO / IA CONTENT SYSTEM.
 */
export default function LandingChrome() {
  const pathname = usePathname();
  if (pathname?.startsWith("/ia-content-system")) return null;

  return (
    <>
      <ScrollProgress />
      <StickyCTA />
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
