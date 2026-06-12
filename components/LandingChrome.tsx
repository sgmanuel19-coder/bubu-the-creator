"use client";

import { usePathname } from "next/navigation";
import CursorTrail from "@/components/CursorTrail";
import StickyCTA from "@/components/StickyCTA";
import ScrollProgress from "@/components/ScrollProgress";
import CookieConsentBanner from "@/components/CookieConsentBanner";

/**
 * UI global de la landing (CTA, cursor, cookies).
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
    </>
  );
}
