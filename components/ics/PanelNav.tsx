"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  CalendarDays,
  Inbox,
  BarChart3,
  Palette,
  LayoutDashboard,
} from "lucide-react";
import { ICS_BASE } from "@/lib/ics/constants";

const CLIENT_ITEMS = [
  { href: ICS_BASE, label: "Inicio", icon: Home },
  { href: `${ICS_BASE}/grilla`, label: "Grilla", icon: CalendarDays },
  { href: `${ICS_BASE}/pedidos`, label: "Pedidos", icon: Inbox },
  { href: `${ICS_BASE}/metricas`, label: "Métricas", icon: BarChart3 },
  { href: `${ICS_BASE}/marca`, label: "Mi marca", icon: Palette },
];

/** Nav inferior fija en mobile, superior en desktop (debajo del header). */
export default function PanelNav({ staff }: { staff: boolean }) {
  const pathname = usePathname();

  const items = staff
    ? [
        { href: `${ICS_BASE}/admin`, label: "Pipeline", icon: LayoutDashboard },
        ...CLIENT_ITEMS.filter((i) => i.label !== "Mi marca"),
      ]
    : CLIENT_ITEMS;

  return (
    <nav className="fixed bottom-0 inset-x-0 z-40 border-t border-white/10 bg-surface/95 backdrop-blur md:sticky md:top-14 md:bottom-auto md:border-t-0 md:border-b md:bg-bg/90">
      <div className="max-w-6xl mx-auto flex md:justify-start justify-around md:gap-2 px-2">
        {items.map(({ href, label, icon: Icon }) => {
          const active =
            href === ICS_BASE
              ? pathname === ICS_BASE
              : pathname?.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              className={`flex flex-col md:flex-row items-center gap-0.5 md:gap-2 px-3 py-2 md:py-2.5 text-[10px] md:text-xs transition-colors ${
                active
                  ? "text-brand-blue"
                  : "text-muted hover:text-cream"
              }`}
            >
              <Icon size={18} />
              {label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
