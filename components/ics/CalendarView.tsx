"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChevronLeft, ChevronRight, CalendarDays, List } from "lucide-react";
import { createSupabaseBrowser } from "@/lib/ics/supabase/client";
import { FUNNEL_DOT, ICS_BASE, STATUS_LABELS, TYPE_LABELS } from "@/lib/ics/constants";
import { FunnelBadge, StatusBadge } from "@/components/ics/Badges";
import { fmtDate } from "@/lib/ics/utils";
import type { ContentPiece } from "@/lib/ics/types";

const DOW = ["Lu", "Ma", "Mi", "Ju", "Vi", "Sa", "Do"];
const MONTHS = [
  "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
  "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre",
];

function shiftMonth(month: string, delta: number): string {
  const [y, m] = month.split("-").map(Number);
  const d = new Date(y, m - 1 + delta, 1);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
}

export default function CalendarView({
  month,
  pieces,
}: {
  month: string;
  pieces: ContentPiece[];
}) {
  const router = useRouter();
  const [view, setView] = useState<"cal" | "list">("cal");

  // Realtime: la grilla se actualiza sola cuando cambia cualquier pieza
  useEffect(() => {
    const supabase = createSupabaseBrowser();
    const channel = supabase
      .channel("ics-grid")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "content_pieces" },
        () => router.refresh(),
      )
      .subscribe();
    return () => {
      supabase.removeChannel(channel);
    };
  }, [router]);

  const [y, m] = month.split("-").map(Number);
  const monthLabel = `${MONTHS[m - 1]} ${y}`;

  const byDay = useMemo(() => {
    const map = new Map<string, ContentPiece[]>();
    for (const p of pieces) {
      if (!p.scheduled_date) continue;
      const list = map.get(p.scheduled_date) ?? [];
      list.push(p);
      map.set(p.scheduled_date, list);
    }
    return map;
  }, [pieces]);

  // celdas del calendario (lunes primero)
  const cells = useMemo(() => {
    const first = new Date(y, m - 1, 1);
    const daysInMonth = new Date(y, m, 0).getDate();
    const lead = (first.getDay() + 6) % 7;
    const arr: (string | null)[] = Array(lead).fill(null);
    for (let d = 1; d <= daysInMonth; d++) {
      arr.push(`${month}-${String(d).padStart(2, "0")}`);
    }
    return arr;
  }, [month, y, m]);

  const today = new Date().toISOString().slice(0, 10);

  return (
    <div>
      {/* Controles */}
      <div className="flex items-center justify-between gap-2 mb-4 flex-wrap">
        <div className="flex items-center gap-1">
          <Link
            href={`?m=${shiftMonth(month, -1)}`}
            className="p-2 rounded-lg border border-white/10 hover:border-brand-blue/50"
            aria-label="Mes anterior"
          >
            <ChevronLeft size={16} />
          </Link>
          <span className="font-display font-semibold text-sm px-2 capitalize">
            {monthLabel}
          </span>
          <Link
            href={`?m=${shiftMonth(month, 1)}`}
            className="p-2 rounded-lg border border-white/10 hover:border-brand-blue/50"
            aria-label="Mes siguiente"
          >
            <ChevronRight size={16} />
          </Link>
        </div>
        <div className="flex rounded-lg border border-white/10 overflow-hidden">
          <button
            onClick={() => setView("cal")}
            className={`px-3 py-1.5 text-xs flex items-center gap-1.5 ${view === "cal" ? "bg-brand-blue text-white" : "text-muted"}`}
          >
            <CalendarDays size={14} /> Calendario
          </button>
          <button
            onClick={() => setView("list")}
            className={`px-3 py-1.5 text-xs flex items-center gap-1.5 ${view === "list" ? "bg-brand-blue text-white" : "text-muted"}`}
          >
            <List size={14} /> Lista
          </button>
        </div>
      </div>

      {/* Leyenda */}
      <div className="flex items-center gap-3 mb-3 text-[10px] text-muted flex-wrap">
        <span className="flex items-center gap-1"><span className={`h-2 w-2 rounded-full ${FUNNEL_DOT.TOF}`} /> TOF</span>
        <span className="flex items-center gap-1"><span className={`h-2 w-2 rounded-full ${FUNNEL_DOT.MOF}`} /> MOF</span>
        <span className="flex items-center gap-1"><span className={`h-2 w-2 rounded-full ${FUNNEL_DOT.BOF}`} /> BOF</span>
        <span className="border border-dashed border-white/30 rounded px-1.5 py-0.5">fecha tentativa</span>
        <span className="border border-white/30 rounded px-1.5 py-0.5">confirmada</span>
      </div>

      {view === "cal" ? (
        <div className="grid grid-cols-7 gap-px rounded-xl overflow-hidden border border-white/10 bg-white/5">
          {DOW.map((d) => (
            <div key={d} className="bg-surface px-1 py-1.5 text-center text-[10px] text-muted font-semibold">
              {d}
            </div>
          ))}
          {cells.map((date, i) => (
            <div
              key={i}
              className={`bg-bg min-h-16 md:min-h-24 p-1 ${date === today ? "ring-1 ring-inset ring-brand-blue/60" : ""}`}
            >
              {date && (
                <>
                  <span className="text-[10px] text-muted">{Number(date.slice(8))}</span>
                  <div className="space-y-0.5 mt-0.5">
                    {(byDay.get(date) ?? []).map((p) => (
                      <Link
                        key={p.id}
                        href={`${ICS_BASE}/pieza/${p.id}`}
                        title={`${p.code} · ${p.title} · ${STATUS_LABELS[p.status]}`}
                        className={`block rounded px-1 py-0.5 text-[9px] md:text-[10px] leading-tight truncate border ${
                          p.date_confirmed
                            ? "border-white/20 bg-surface-2"
                            : "border-dashed border-white/25 bg-transparent opacity-75"
                        }`}
                      >
                        <span className={`inline-block h-1.5 w-1.5 rounded-full mr-1 ${FUNNEL_DOT[p.funnel_level]}`} />
                        {p.code}
                      </Link>
                    ))}
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      ) : (
        <ul className="space-y-2">
          {pieces.length === 0 && (
            <li className="text-sm text-muted py-6 text-center">
              No hay piezas programadas este mes.
            </li>
          )}
          {pieces.map((p) => (
            <li key={p.id}>
              <Link
                href={`${ICS_BASE}/pieza/${p.id}`}
                className="block rounded-xl border border-white/10 bg-surface p-3.5 hover:border-brand-blue/50 transition-colors"
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="font-mono text-xs text-muted shrink-0">{p.code}</span>
                    <span className="text-sm font-medium truncate">{p.title}</span>
                  </div>
                  <span className="text-xs text-muted shrink-0">
                    {fmtDate(p.scheduled_date)}
                    {!p.date_confirmed && " · tentativa"}
                  </span>
                </div>
                <div className="flex items-center gap-2 mt-2 flex-wrap">
                  <FunnelBadge level={p.funnel_level} />
                  <StatusBadge status={p.status} />
                  <span className="text-[11px] text-muted">{TYPE_LABELS[p.type]}</span>
                  {p.format && <span className="text-[11px] text-muted">· {p.format}</span>}
                  {p.rescheduled_reason && (
                    <span className="text-[11px] text-orange-300">· reprogramada</span>
                  )}
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
