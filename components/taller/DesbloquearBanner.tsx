"use client";

import { useState } from "react";
import { TALLER } from "@/lib/taller/content";
import { trackTaller } from "@/lib/taller/analytics";
import LoginModal from "@/components/taller/LoginModal";

// Banner de "vista previa" para el público (sin sesión). Da la ilusión de
// ver toda la plataforma bloqueada e invita a desbloquear con la contraseña
// (que se gestiona/compra por WhatsApp).
export default function DesbloquearBanner() {
  const [login, setLogin] = useState(false);
  const waComprar = `${TALLER.whatsapp}?text=${encodeURIComponent(
    "Hola Manuel, quiero comprar el acceso a la masterclass",
  )}`;

  return (
    <>
      <div
        className="mb-6 flex flex-col items-center gap-3 rounded-2xl border px-5 py-4 text-center sm:flex-row sm:justify-between sm:text-left"
        style={{
          borderColor: "rgba(26,128,255,0.5)",
          background: "linear-gradient(90deg, rgba(26,128,255,0.14), rgba(26,128,255,0.03))",
        }}
      >
        <div className="flex items-center gap-3">
          <span className="text-2xl">🔒</span>
          <div>
            <p className="text-sm font-semibold">Estás viendo una vista previa</p>
            <p className="text-xs" style={{ color: "var(--muted)" }}>
              Desbloquea toda la plataforma con tu contraseña de alumno.
            </p>
          </div>
        </div>
        <div className="flex shrink-0 gap-2">
          <button
            type="button"
            onClick={() => setLogin(true)}
            className="rounded-xl px-4 py-2.5 text-xs font-semibold transition-opacity hover:opacity-90"
            style={{ background: "var(--green)", color: "#fff" }}
          >
            Ya tengo contraseña
          </button>
          <a
            href={waComprar}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackTaller("taller_cta_comprar", { origen: "candado" })}
            className="rounded-xl border px-4 py-2.5 text-xs font-semibold transition-opacity hover:opacity-80"
            style={{ borderColor: "rgba(244,240,222,0.25)", color: "var(--cream)" }}
          >
            Comprar acceso
          </a>
        </div>
      </div>
      {login && <LoginModal onClose={() => setLogin(false)} />}
    </>
  );
}
