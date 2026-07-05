"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { TALLER } from "@/lib/taller/content";

const TABS = [
  { href: "/taller/en-vivo", label: "● En vivo" },
  { href: "/taller/curso", label: "Curso grabado" },
];

export default function PortalNav() {
  const pathname = usePathname();

  return (
    <header
      className="sticky top-0 z-40 border-b backdrop-blur-md"
      style={{ borderColor: "rgba(244,240,222,0.10)", background: "rgba(13,12,8,0.85)" }}
    >
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-5 py-4">
        <div className="flex flex-col">
          <span
            className="text-[11px] uppercase tracking-[0.2em]"
            style={{ color: "var(--muted)" }}
          >
            {TALLER.marca}
          </span>
          <span className="text-sm font-semibold sm:text-base">
            {TALLER.nombre}
          </span>
        </div>

        <nav className="flex items-center gap-1 sm:gap-2">
          {TABS.map((tab) => {
            const active = pathname === tab.href;
            return (
              <Link
                key={tab.href}
                href={tab.href}
                className="rounded-full px-3 py-1.5 text-xs font-medium transition-colors sm:px-4 sm:text-sm"
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
          <form action="/api/taller/logout" method="POST">
            <button
              type="submit"
              className="ml-1 rounded-full border px-3 py-1.5 text-xs transition-opacity hover:opacity-80 sm:ml-2"
              style={{ borderColor: "rgba(244,240,222,0.25)", color: "var(--muted)" }}
            >
              Salir
            </button>
          </form>
        </nav>
      </div>
    </header>
  );
}
