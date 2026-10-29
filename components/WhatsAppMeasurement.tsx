"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

const RESUELTO_PHONE = "51936529753";

export default function WhatsAppMeasurement() {
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const anchor = (event.target as Element | null)?.closest?.("a[href]") as HTMLAnchorElement | null;
      if (!anchor) return;

      let url: URL;
      try {
        url = new URL(anchor.href);
      } catch {
        return;
      }
      if (url.hostname !== "wa.me" || url.pathname !== `/${RESUELTO_PHONE}`) return;

      // El clic describe una intención de contacto; no prueba que se envió el mensaje.
      // Se envía siempre: Consent Mode decide si va con cookies o como ping sin
      // cookies (Google lo usa para modelar conversiones de quien no aceptó).

      const pagePath = window.location.pathname;
      const service = anchor.dataset.service || pagePath.match(/^\/servicios\/([^/]+)/)?.[1];
      const ctaLocation = anchor.dataset.loc || "sin_ubicacion";
      window.gtag?.("event", "whatsapp_click", {
        page_path: pagePath,
        service: service || "general",
        cta_location: ctaLocation,
        link_url: `${url.origin}${url.pathname}`,
        transport_type: "beacon",
      });
    };

    document.addEventListener("click", onClick, true);
    return () => {
      document.removeEventListener("click", onClick, true);
    };
  }, []);

  return null;
}
