"use client";

import { useEffect } from "react";
import {
  codigosWhatsApp,
  mensajePorDefecto,
  registrarOrigen,
  servicioDeBoton,
  ubicacionBoton,
  type TipoWhatsApp,
} from "@/lib/cotizacion";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

const RESUELTO_PHONE = "51936529753";

/**
 * Medición y mensaje de todos los botones de WhatsApp del sitio.
 *
 * - `data-wa="cotizar"` marca los botones que piden precio o propuesta;
 *   el resto cuenta como consulta. `data-wa="seguimiento"` es el botón de
 *   /gracias-cotizacion: esa cotización ya se midió con generate_lead.
 * - Cada clic agrega al mensaje el código del servicio ([SPOT-IA]) y, si
 *   la visita vino de una campaña, el de origen ([G-SPOT]).
 * - `whatsapp_click` se mantiene en todos los botones durante la
 *   transición (brief del 2-nov-2026): se retira a las 2 semanas.
 */
export default function WhatsAppMeasurement() {
  useEffect(() => {
    registrarOrigen(window.location.search);

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

      const pagePath = window.location.pathname;
      const servicio = servicioDeBoton(anchor.dataset.service, pagePath);
      const ubicacion = ubicacionBoton(anchor.dataset.loc);
      const seguimiento = anchor.dataset.wa === "seguimiento";
      const tipo: TipoWhatsApp = anchor.dataset.wa === "cotizar" ? "cotizar" : "consulta";

      // Mensaje: el texto original del botón (se guarda la primera vez para
      // no repetir códigos si hacen clic dos veces) + los códigos.
      if (anchor.dataset.waBase === undefined) anchor.dataset.waBase = url.searchParams.get("text") ?? "";
      if (!seguimiento) {
        const base = anchor.dataset.waBase || mensajePorDefecto(tipo, servicio.label);
        url.searchParams.set("text", `${base} ${codigosWhatsApp(servicio.codigo, servicio.corto)}`);
        anchor.href = url.toString();
      }

      // El clic describe una intención de contacto; no prueba que se envió el mensaje.
      // Se envía siempre: Consent Mode decide si va con cookies o como ping sin
      // cookies (Google lo usa para modelar conversiones de quien no aceptó).
      if (!seguimiento) {
        window.gtag?.("event", tipo === "cotizar" ? "cotizar_whatsapp" : "consulta_whatsapp", {
          servicio: servicio.key,
          ubicacion_boton: ubicacion,
          transport_type: "beacon",
        });
      }
      window.gtag?.("event", "whatsapp_click", {
        page_path: pagePath,
        // Mismo valor que antes (id de la página) para no cortar la serie.
        service: anchor.dataset.service || pagePath.match(/^\/servicios\/([^/]+)/)?.[1] || "general",
        cta_location: anchor.dataset.loc || "sin_ubicacion",
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
