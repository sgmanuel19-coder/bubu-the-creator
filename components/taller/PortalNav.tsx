"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { TALLER } from "@/lib/taller/content";

const TABS = [
  { href: "/taller/curso", label: "Cursos" },
  { href: "/taller/en-vivo", label: "● En vivo" },
  { href: "/taller/calendario", label: "Calendario" },
  { href: "/taller/recursos", label: "Recursos" },
  { href: "/taller/novedades", label: "Novedades" },
];

export default function PortalNav() {
  const pathname = usePathname();

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
          <form action="/api/taller/logout" method="POST">
            <button
              type="submit"
              className="shrink-0 rounded-full border px-3 py-1.5 text-xs transition-opacity hover:opacity-80"
              style={{ borderColor: "rgba(244,240,222,0.25)", color: "var(--muted)" }}
            >
              Salir
            </button>
          </form>
        </div>

        <nav className="-mx-1 flex gap-1 overflow-x-auto px-1 pb-2 pt-3 sm:gap-2">
          {TABS.map((tab) => {
            // La pestaña "Cursos" queda activa también en el detalle de un
            // curso (/taller/curso/<slug>).
            const active =
              tab.href === "/taller/curso"
                ? pathname.startsWith("/taller/curso")
                : pathname === tab.href;
            return (
              <Link
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
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
