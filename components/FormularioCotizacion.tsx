"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  PAISES,
  PLAZOS,
  SERVICIOS_COTIZAR,
  leerOrigen,
  servicioPor,
  telefonoValido,
  tramosDe,
} from "@/lib/cotizacion";

// Formulario de /cotizar: 8 campos (servicio, presupuesto, plazo, empresa,
// nombre, WhatsApp, correo y comentario). Al enviarse dispara generate_lead
// con servicio, rango y plazo; nunca nombre, teléfono ni correo.

const campo =
  "w-full rounded-lg border border-white/10 bg-white/[0.03] px-4 py-3 text-cream placeholder:text-muted/50 " +
  "focus:border-[#1A80FF] focus:outline-none transition-colors";
const etiqueta = "block text-xs font-semibold uppercase tracking-[0.16em] text-muted mb-2";
const opcion =
  "cursor-pointer rounded-lg border px-4 py-3 text-sm transition-colors has-[:checked]:border-[#1A80FF] " +
  "has-[:checked]:bg-[#1A80FF]/10 has-[:checked]:text-cream border-white/10 text-muted hover:border-white/30 " +
  "has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-[#1A80FF]/60";

export default function FormularioCotizacion({ inicial }: { inicial?: string }) {
  const router = useRouter();
  const [servicio, setServicio] = useState(servicioPor(inicial)?.slug ?? "");
  const [rango, setRango] = useState("");
  const [pais, setPais] = useState<string>(PAISES[0].id);
  const [error, setError] = useState<string | null>(null);
  const [enviando, setEnviando] = useState(false);

  const s = servicioPor(servicio);
  const tramos = s ? tramosDe(s.key) : [];
  const ejemplo = PAISES.find((p) => p.id === pais)?.ejemplo;

  async function enviar(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const datos = Object.fromEntries(new FormData(e.currentTarget).entries()) as Record<string, string>;

    if (!s) return setError("Elige el servicio que quieres cotizar.");
    if (!datos.rango_presupuesto) return setError("Elige un rango de presupuesto.");
    if (!datos.plazo) return setError("Cuéntanos para cuándo lo necesitas.");
    if (!telefonoValido(pais, datos.whatsapp || "")) {
      return setError(
        pais === "51"
          ? "Revisa tu WhatsApp: debe ser un celular peruano de 9 dígitos que empieza en 9."
          : "Revisa tu WhatsApp: debe ser un celular de Colombia de 10 dígitos que empieza en 3.",
      );
    }

    setError(null);
    setEnviando(true);
    const origen = leerOrigen();
    try {
      const res = await fetch("/api/cotizaciones", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...datos,
          servicio: s.slug,
          pais,
          origen: origen?.letra,
          utm_source: origen?.source,
          utm_campaign: origen?.campaign,
          gclid: origen?.gclid ?? false,
          pagina: document.referrer ? new URL(document.referrer).pathname : undefined,
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        setEnviando(false);
        setError(data.error || "No pudimos enviar tu pedido. Inténtalo de nuevo.");
        return;
      }

      const tramo = tramos.find((t) => t.id === datos.rango_presupuesto);
      window.gtag?.("event", "generate_lead", {
        servicio: s.key,
        rango_presupuesto: tramo?.label ?? datos.rango_presupuesto,
        plazo: datos.plazo,
        ...(tramo?.valor ? { value: tramo.valor, currency: "PEN" } : {}),
        transport_type: "beacon",
      });

      const q = new URLSearchParams({
        servicio: s.slug,
        rango: datos.rango_presupuesto,
        plazo: datos.plazo,
        pedido: data.codigo,
      });
      router.push(`/gracias-cotizacion?${q}`);
    } catch {
      setEnviando(false);
      setError("No pudimos conectar. Revisa tu conexión e inténtalo de nuevo.");
    }
  }

  return (
    <form onSubmit={enviar} noValidate className="space-y-8">
      {/* Honeypot: invisible para personas. */}
      <input type="text" name="web" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />

      <div>
        <label htmlFor="cz-servicio" className={etiqueta}>Servicio</label>
        <select
          id="cz-servicio"
          name="servicio"
          required
          value={servicio}
          onChange={(e) => {
            setServicio(e.target.value);
            setRango("");
          }}
          className={campo}
        >
          <option value="" disabled>Elige un servicio</option>
          {SERVICIOS_COTIZAR.map((x) => (
            <option key={x.slug} value={x.slug} className="bg-[#0D0C08]">{x.label}</option>
          ))}
        </select>
      </div>

      {s && (
        <fieldset>
          <legend className={etiqueta}>Presupuesto aproximado</legend>
          <div className="grid gap-2 sm:grid-cols-2">
            {tramos.map((t) => (
              <label key={t.id} className={opcion}>
                <input
                  type="radio"
                  name="rango_presupuesto"
                  value={t.id}
                  required
                  checked={rango === t.id}
                  onChange={() => setRango(t.id)}
                  className="sr-only"
                />
                {t.label}
              </label>
            ))}
          </div>
        </fieldset>
      )}

      <fieldset>
        <legend className={etiqueta}>¿Para cuándo?</legend>
        <div className="grid gap-2 sm:grid-cols-3">
          {PLAZOS.map((p) => (
            <label key={p.id} className={opcion}>
              <input type="radio" name="plazo" value={p.id} required className="sr-only" />
              {p.label}
            </label>
          ))}
        </div>
      </fieldset>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="cz-empresa" className={etiqueta}>Empresa o marca</label>
          <input id="cz-empresa" name="empresa" required maxLength={160} autoComplete="organization" className={campo} />
        </div>
        <div>
          <label htmlFor="cz-nombre" className={etiqueta}>Tu nombre</label>
          <input id="cz-nombre" name="nombre" required maxLength={160} autoComplete="name" className={campo} />
        </div>
        <div>
          <label htmlFor="cz-whatsapp" className={etiqueta}>WhatsApp</label>
          <div className="flex gap-2">
            <select
              aria-label="País"
              value={pais}
              onChange={(e) => setPais(e.target.value)}
              className={`${campo} w-auto shrink-0 pr-2`}
            >
              {PAISES.map((p) => (
                <option key={p.id} value={p.id} className="bg-[#0D0C08]">+{p.id}</option>
              ))}
            </select>
            <input
              id="cz-whatsapp"
              name="whatsapp"
              type="tel"
              inputMode="tel"
              required
              maxLength={20}
              autoComplete="tel-national"
              placeholder={ejemplo}
              className={campo}
            />
          </div>
        </div>
        <div>
          <label htmlFor="cz-email" className={etiqueta}>Correo <span className="normal-case tracking-normal font-normal">(opcional)</span></label>
          <input id="cz-email" name="email" type="email" maxLength={160} autoComplete="email" className={campo} />
        </div>
      </div>

      <div>
        <label htmlFor="cz-comentario" className={etiqueta}>Cuéntanos en breve <span className="normal-case tracking-normal font-normal">(opcional)</span></label>
        <textarea
          id="cz-comentario"
          name="comentario"
          rows={3}
          maxLength={1000}
          placeholder="Qué necesitas, para qué fecha, alguna referencia…"
          className={campo}
        />
      </div>

      {error && (
        <p role="alert" className="rounded-lg border border-red-400/40 bg-red-400/10 px-4 py-3 text-sm text-red-200">
          {error}
        </p>
      )}

      <div className="space-y-3">
        <button
          type="submit"
          disabled={enviando}
          className="btn-glow w-full justify-center py-4 text-base disabled:opacity-60 sm:w-auto sm:px-10"
        >
          {enviando ? "Enviando…" : "Pedir cotización →"}
        </button>
        <p className="text-xs text-muted/80">
          Te respondemos en el día por WhatsApp. Usamos tus datos solo para preparar tu propuesta
          (<a href="/privacidad" className="underline decoration-white/30">privacidad</a>).
        </p>
      </div>
    </form>
  );
}
