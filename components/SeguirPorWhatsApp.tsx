"use client";

import { useEffect, useState } from "react";
import { SITE } from "@/lib/constants";
import { PLAZOS, codigosWhatsApp, servicioPor, tramosDe } from "@/lib/cotizacion";

// Botón de /gracias-cotizacion. Abre WhatsApp con el resumen del pedido
// (servicio, rango, plazo y códigos). Va con data-wa="seguimiento": el
// pedido ya se midió con generate_lead, así que no suma cotizar_whatsapp.

type Props = { servicio?: string; rango?: string; plazo?: string; pedido?: string };

export default function SeguirPorWhatsApp({ servicio, rango, plazo, pedido }: Props) {
  const s = servicioPor(servicio);
  const tramo = s ? tramosDe(s.key).find((t) => t.id === rango) : undefined;
  const p = PLAZOS.find((x) => x.id === plazo);

  const resumen = [
    s ? `Servicio: ${s.label}` : null,
    tramo ? `Presupuesto: ${tramo.label}` : null,
    p ? `Plazo: ${p.label}` : null,
    pedido && /^[\w-]{1,20}$/.test(pedido) ? `Pedido: ${pedido}` : null,
  ].filter(Boolean) as string[];

  // Los códigos de origen viven en sessionStorage: se arman ya en el cliente.
  const [codigos, setCodigos] = useState(s ? `[${s.codigo}]` : "");
  useEffect(() => {
    if (s) setCodigos(codigosWhatsApp(s.codigo, s.corto));
  }, [s]);

  const texto = `Hola, acabo de pedir una cotización en la web.\n${resumen.join("\n")}${codigos ? `\n${codigos}` : ""}`;

  return (
    <div className="rounded-2xl border border-[#1A80FF]/40 bg-[#1A80FF]/[0.06] p-6 sm:p-8">
      {resumen.length > 0 && (
        <ul className="mb-6 space-y-1 text-sm text-cream/90">
          {resumen.map((r) => <li key={r}>{r}</li>)}
        </ul>
      )}
      <a
        href={`${SITE.links.whatsapp}?text=${encodeURIComponent(texto)}`}
        data-wa="seguimiento"
        data-loc="gracias_cotizacion"
        data-service={s?.pagina}
        target="_blank"
        rel="noopener noreferrer"
        className="btn-glow w-full justify-center py-4 text-base sm:w-auto sm:px-10"
      >
        Seguir por WhatsApp →
      </a>
    </div>
  );
}
