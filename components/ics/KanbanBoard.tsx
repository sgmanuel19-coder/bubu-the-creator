"use client";

import { useEffect, useTransition } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { setPieceStatus } from "@/lib/ics/actions";
import { createSupabaseBrowser } from "@/lib/ics/supabase/client";
import {
  ICS_BASE,
  PIECE_STATUSES,
  PieceStatus,
  STATUS_LABELS,
} from "@/lib/ics/constants";
import { FunnelBadge } from "@/components/ics/Badges";
import { fmtDate } from "@/lib/ics/utils";
import type { ContentPiece } from "@/lib/ics/types";

const COLUMNS = PIECE_STATUSES.filter((s) => s !== "publicado");

function nextStatus(s: PieceStatus): PieceStatus | null {
  const i = PIECE_STATUSES.indexOf(s);
  return PIECE_STATUSES[i + 1] ?? null;
}

export default function KanbanBoard({ pieces }: { pieces: ContentPiece[] }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  useEffect(() => {
    const supabase = createSupabaseBrowser();
    const channel = supabase
      .channel("ics-kanban")
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

  return (
    <div className="flex gap-3 overflow-x-auto pb-3 -mx-4 px-4">
      {COLUMNS.map((status) => {
        const items = pieces.filter((p) => p.status === status);
        return (
          <div
            key={status}
            className="shrink-0 w-60 rounded-xl border border-white/10 bg-surface/60"
          >
            <div className="px-3 py-2.5 border-b border-white/10 flex items-center justify-between">
              <span className="text-xs font-semibold">{STATUS_LABELS[status]}</span>
              <span className="text-[10px] text-muted">{items.length}</span>
            </div>
            <div className="p-2 space-y-2 min-h-12">
              {items.map((p) => {
                const next = nextStatus(p.status);
                return (
                  <div
                    key={p.id}
                    className="rounded-lg border border-white/10 bg-bg p-2.5"
                  >
                    <Link
                      href={`${ICS_BASE}/admin/pieza/${p.id}`}
                      className="block hover:text-brand-blue"
                    >
                      <p className="text-xs font-medium leading-snug">
                        <span className="font-mono text-muted mr-1">{p.code}</span>
                        {p.title}
                      </p>
                    </Link>
                    <div className="flex items-center justify-between gap-2 mt-2">
                      <div className="flex items-center gap-1.5">
                        <FunnelBadge level={p.funnel_level} />
                        <span className="text-[10px] text-muted">
                          {fmtDate(p.scheduled_date, "d MMM")}
                        </span>
                      </div>
                      {next && (
                        <button
                          disabled={pending}
                          onClick={() =>
                            startTransition(async () => {
                              await setPieceStatus(p.id, next);
                              router.refresh();
                            })
                          }
                          title={`Pasar a: ${STATUS_LABELS[next]}`}
                          className="rounded-md border border-white/10 p-1 text-muted hover:text-brand-blue hover:border-brand-blue/50 disabled:opacity-40"
                        >
                          <ArrowRight size={12} />
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
