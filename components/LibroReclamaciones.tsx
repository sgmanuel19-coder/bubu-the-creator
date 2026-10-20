"use client";

import { useState } from "react";
import { LEGAL } from "@/components/LegalNotice";

type Estado =
  | { paso: "form"; error?: string }
  | { paso: "enviando" }
  | { paso: "listo"; codigo: string; fecha: string; copiaEnviada: boolean };

const campo =
  "w-full rounded-lg border border-white/10 bg-white/[0.03] px-4 py-3 text-cream placeholder:text-muted/50 " +
  "focus:border-[#1A80FF] focus:outline-none transition-colors";
const etiqueta = "block text-xs font-semibold uppercase tracking-[0.16em] text-muted mb-2";

function Grupo({ n, titulo, children }: { n: string; titulo: string; children: React.ReactNode }) {
  return (
    <fieldset className="border-t border-white/10 pt-8">
      <legend className="float-left w-full mb-6 flex items-baseline gap-3">
        <span className="text-xs tracking-[0.24em] text-[#1A80FF]">{n}</span>
        <span className="font-display text-xl text-cream">{titulo}</span>
      </legend>
      <div className="clear-both grid gap-5 sm:grid-cols-2">{children}</div>
    </fieldset>
  );
}

export default function LibroReclamaciones() {
  const [estado, setEstado] = useState<Estado>({ paso: "form" });
  const [menor, setMenor] = useState(false);

  async function enviar(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const datos = Object.fromEntries(fd.entries()) as Record<string, string>;
    setEstado({ paso: "enviando" });
    try {
      const res = await fetch("/api/reclamaciones", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...datos, menor_de_edad: menor }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        setEstado({ paso: "form", error: data.error || "No pudimos registrar tu hoja. Inténtalo de nuevo." });
        return;
      }
      setEstado({ paso: "listo", codigo: data.codigo, fecha: data.fecha, copiaEnviada: data.copiaEnviada });
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch {
      setEstado({ paso: "form", error: "No pudimos conectar. Revisa tu conexión e inténtalo de nuevo." });
    }
  }

  if (estado.paso === "listo") {
    return (
      <div className="rounded-2xl border border-[#1A80FF]/40 bg-[#1A80FF]/[0.06] p-8">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#1A80FF]">Hoja registrada</p>
        <p className="mt-3 font-display text-3xl text-cream">N.° {estado.codigo}</p>
        <p className="mt-1 text-sm text-muted">{estado.fecha}</p>
        <p className="mt-6 text-muted">
          {estado.copiaEnviada
            ? "Te enviamos una copia de tu hoja al correo que indicaste. "
            : "Guarda este número: es la constancia de tu hoja. "}
          Te responderemos en un plazo no mayor a quince (15) días hábiles.
        </p>
        <button
          type="button"
          onClick={() => window.print()}
          className="mt-6 rounded-full border border-white/20 px-5 py-2.5 text-sm text-cream hover:border-[#1A80FF] transition-colors"
        >
          Imprimir o guardar en PDF
        </button>
      </div>
    );
  }

  const enviando = estado.paso === "enviando";

  return (
    <form onSubmit={enviar} className="space-y-10">
      <div className="grid gap-1 rounded-xl border border-white/10 p-5 text-sm">
        <p className="text-cream font-semibold">{LEGAL.razonSocial}</p>
        <p>RUC {LEGAL.ruc} · {LEGAL.domicilio}</p>
        <p>Fecha: {new Date().toLocaleDateString("es-PE", { timeZone: "America/Lima", dateStyle: "long" })}</p>
      </div>

      {/* Honeypot: invisible para personas */}
      <input type="text" name="web" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />

      <Grupo n="1" titulo="Identificación del consumidor">
        <div className="sm:col-span-2">
          <label className={etiqueta} htmlFor="nombre">Nombre completo *</label>
          <input id="nombre" name="nombre" required className={campo} />
        </div>
        <div>
          <label className={etiqueta} htmlFor="tipo_documento">Tipo de documento *</label>
          <select id="tipo_documento" name="tipo_documento" className={campo} defaultValue="DNI">
            <option value="DNI">DNI</option>
            <option value="CE">Carné de extranjería</option>
            <option value="Pasaporte">Pasaporte</option>
            <option value="RUC">RUC</option>
          </select>
        </div>
        <div>
          <label className={etiqueta} htmlFor="numero_documento">Número de documento *</label>
          <input id="numero_documento" name="numero_documento" required className={campo} />
        </div>
        <div className="sm:col-span-2">
          <label className={etiqueta} htmlFor="domicilio">Domicilio *</label>
          <input id="domicilio" name="domicilio" required className={campo} />
        </div>
        <div>
          <label className={etiqueta} htmlFor="telefono">Teléfono</label>
          <input id="telefono" name="telefono" type="tel" className={campo} />
        </div>
        <div>
          <label className={etiqueta} htmlFor="email">Correo electrónico *</label>
          <input id="email" name="email" type="email" required className={campo} />
        </div>
        <label className="sm:col-span-2 flex items-center gap-3 text-sm text-muted cursor-pointer">
          <input type="checkbox" checked={menor} onChange={(e) => setMenor(e.target.checked)} className="accent-[#1A80FF]" />
          Soy menor de edad
        </label>
        {menor && (
          <div className="sm:col-span-2">
            <label className={etiqueta} htmlFor="apoderado">Nombre del padre, madre o apoderado *</label>
            <input id="apoderado" name="apoderado" required className={campo} />
          </div>
        )}
      </Grupo>

      <Grupo n="2" titulo="Identificación del bien contratado">
        <div>
          <span className={etiqueta}>Tipo *</span>
          <div className="flex gap-6 py-3 text-cream">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="radio" name="tipo_bien" value="servicio" defaultChecked className="accent-[#1A80FF]" /> Servicio
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="radio" name="tipo_bien" value="producto" className="accent-[#1A80FF]" /> Producto
            </label>
          </div>
        </div>
        <div>
          <label className={etiqueta} htmlFor="monto">Monto reclamado (S/)</label>
          <input id="monto" name="monto" inputMode="decimal" placeholder="0.00" className={campo} />
        </div>
        <div className="sm:col-span-2">
          <label className={etiqueta} htmlFor="descripcion_bien">Descripción *</label>
          <textarea id="descripcion_bien" name="descripcion_bien" required rows={2} className={campo} />
        </div>
      </Grupo>

      <Grupo n="3" titulo="Detalle de la reclamación">
        <div className="sm:col-span-2 grid gap-3 sm:grid-cols-2">
          <label className="flex gap-3 rounded-xl border border-white/10 p-4 cursor-pointer has-[:checked]:border-[#1A80FF]">
            <input type="radio" name="tipo" value="reclamo" defaultChecked className="mt-1 accent-[#1A80FF]" />
            <span>
              <span className="block text-cream font-semibold">Reclamo</span>
              <span className="text-sm">Disconformidad relacionada con los productos o servicios.</span>
            </span>
          </label>
          <label className="flex gap-3 rounded-xl border border-white/10 p-4 cursor-pointer has-[:checked]:border-[#1A80FF]">
            <input type="radio" name="tipo" value="queja" className="mt-1 accent-[#1A80FF]" />
            <span>
              <span className="block text-cream font-semibold">Queja</span>
              <span className="text-sm">Disconformidad no relacionada con los productos o servicios, o malestar respecto a la atención al público.</span>
            </span>
          </label>
        </div>
        <div className="sm:col-span-2">
          <label className={etiqueta} htmlFor="detalle">Detalle *</label>
          <textarea id="detalle" name="detalle" required rows={5} className={campo} />
        </div>
        <div className="sm:col-span-2">
          <label className={etiqueta} htmlFor="pedido">Pedido *</label>
          <textarea id="pedido" name="pedido" required rows={3} className={campo} />
        </div>
      </Grupo>

      <div className="space-y-3 border-t border-white/10 pt-8 text-sm">
        <p>
          La formulación del reclamo no impide acudir a otras vías de solución de controversias ni es
          requisito previo para interponer una denuncia ante el INDECOPI.
        </p>
        <p>
          El proveedor deberá dar respuesta al reclamo o queja en un plazo no mayor a quince (15) días
          hábiles, pudiendo ampliar el plazo hasta por quince (15) días más, previa comunicación al consumidor.
        </p>
        <p>
          Tus datos se usan solo para atender esta hoja, conforme a nuestra{" "}
          <a href="/privacidad">política de privacidad</a>.
        </p>
      </div>

      {estado.paso === "form" && estado.error && (
        <p role="alert" className="rounded-lg border border-red-400/40 bg-red-400/10 px-4 py-3 text-sm text-red-200">
          {estado.error}
        </p>
      )}

      <button
        type="submit"
        disabled={enviando}
        className="rounded-xl bg-[#1A80FF] px-8 py-4 text-sm font-semibold text-white disabled:opacity-60 transition-opacity"
      >
        {enviando ? "Enviando…" : "Enviar hoja de reclamación"}
      </button>
    </form>
  );
}
