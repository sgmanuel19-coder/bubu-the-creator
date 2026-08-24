"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { TALLER } from "@/lib/taller/content";
import LoginModal from "@/components/taller/LoginModal";

const TABS = [
  { href: "/taller", label: "Inicio" },
  { href: "/taller/curso", label: "Cursos" },
  { href: "/taller/en-vivo", label: "● En vivo" },
  { href: "/taller/calendario", label: "Calendario" },
  { href: "/taller/recursos", label: "Recursos" },
  { href: "/taller/novedades", label: "Novedades" },
  // Sale del portal hacia La noticIA, que es su propia vertical con
  // cabecera propia. La flecha avisa que se cambia de territorio.
  { href: "/noticias", label: "La noticIA ↗" },
];

export default function PortalNav({ desbloqueado = false }: { desbloqueado?: boolean }) {
  const pathname = usePathname();
  const [login, setLogin] = useState(false);

  return (
    <header
      className="sticky top-0 z-40 border-b backdrop-blur-md"
      style={{ borderColor: "rgba(244,240,222,0.10)", background: "rgba(13,12,8,0.85)" }}
    >
      <div className="mx-auto max-w-5xl px-5">
        <div className="flex items-center justify-between gap-4 pt-4">
          <div className="flex flex-col">
            <span
              className="text-[11px] uppercase tracking-[0.2em]"
              style={{ color: "var(--muted)" }}
            >
              {TALLER.marca}
            </span>
            <span className="text-sm font-semibold sm:text-base">{TALLER.nombre}</span>
          </div>
          {desbloqueado ? (
            <form action="/api/taller/logout" method="POST">
              <button
                type="submit"
                className="shrink-0 rounded-full border px-3 py-1.5 text-xs transition-opacity hover:opacity-80"
                style={{ borderColor: "rgba(244,240,222,0.25)", color: "var(--muted)" }}
              >
                Salir
              </button>
            </form>
          ) : (
            <button
              type="button"
              onClick={() => setLogin(true)}
              className="shrink-0 rounded-full px-4 py-1.5 text-xs font-semibold transition-opacity hover:opacity-90"
              style={{ background: "var(--green)", color: "#fff" }}
            >
              Entrar
            </button>
          )}
        </div>

        <nav className="-mx-1 flex gap-1 overflow-x-auto px-1 pb-2 pt-3 sm:gap-2">
          {TABS.map((tab) => {
            const active =
              tab.href === "/taller"
                ? pathname === "/taller"
                : tab.href === "/taller/curso"
                  ? pathname.startsWith("/taller/curso")
                  : pathname === tab.href;
            // Navegación real (no SPA): cada pestaña se renderiza fresca en
            // el servidor leyendo la cookie, así el estado de sesión siempre
            // es correcto y no vuelve a pedir la contraseña al cambiar de tab.
            return (
              <a
                key={tab.href}
                href={tab.href}
                className="shrink-0 rounded-full px-3 py-1.5 text-xs font-medium transition-colors sm:px-4 sm:text-sm"
                style={
                  active
                    ? { background: "var(--green)", color: "#fff" }
                    : { color: "var(--muted)" }
                }
              >
                {tab.label}
              </a>
            );
          })}
        </nav>
      </div>

      {login && <LoginModal onClose={() => setLogin(false)} />}
    </header>
  );
}
