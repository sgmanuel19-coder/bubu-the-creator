import Link from "next/link";
import { redirect } from "next/navigation";
import { requireProfile, isStaff } from "@/lib/ics/auth";
import { createSupabaseServer } from "@/lib/ics/supabase/server";
import { ICS_BASE, STAGE_LABELS, ApprovalStage } from "@/lib/ics/constants";
import { daysUntil, urgency } from "@/lib/ics/deadlines";
import { fmtDate } from "@/lib/ics/utils";
import { FunnelBadge, StatusBadge, UrgencyBadge } from "@/components/ics/Badges";
import type { Approval, ContentPiece } from "@/lib/ics/types";

type PendingApproval = Approval & { content_pieces: ContentPiece };

function urgencyLabel(deadline: string): string {
  const d = daysUntil(deadline);
  if (d < 0) return `Venció hace ${Math.abs(d)} día${Math.abs(d) === 1 ? "" : "s"}`;
  if (d === 0) return "Vence HOY";
  if (d === 1) return "Vence mañana";
  return `Vence en ${d} días`;
}

export default async function HomePage() {
  const profile = await requireProfile();
  if (isStaff(profile)) redirect(`${ICS_BASE}/admin`);

  const supabase = await createSupabaseServer();
  const today = new Date().toISOString().slice(0, 10);

  const [{ data: pending }, { data: upcoming }, { data: openRequests }] =
    await Promise.all([
      supabase
        .from("approvals")
        .select("*, content_pieces(*)")
        .eq("status", "pending")
        .order("deadline", { ascending: true, nullsFirst: false }),
      supabase
        .from("content_pieces")
        .select("*")
        .gte("scheduled_date", today)
        .not("status", "eq", "publicado")
        .order("scheduled_date", { ascending: true })
        .limit(5),
      supabase
        .from("requests")
        .select("id, title, direction, due_date, status")
        .neq("status", "hecho")
        .order("created_at", { ascending: false })
        .limit(5),
    ]);

  const queue = ((pending ?? []) as PendingApproval[]).filter(
    (a) => a.content_pieces,
  );

  return (
    <main className="space-y-8">
      {/* Cola: Revisa primero */}
      <section>
        <h1 className="font-display text-xl font-bold mb-1">Revisa primero</h1>
        <p className="text-sm text-muted mb-4">
          En orden de urgencia. Si algo vence, la pieza se aprueba sola para no
          atrasar tu grilla.
        </p>

        {queue.length === 0 ? (
          <div className="rounded-xl border border-white/10 bg-surface p-6 text-center text-sm text-muted">
            ✅ Estás al día. No tienes nada pendiente de revisar.
          </div>
        ) : (
          <ul className="space-y-3">
            {queue.map((a) => {
              const p = a.content_pieces;
              return (
                <li key={a.id}>
                  <Link
                    href={`${ICS_BASE}/pieza/${p.id}`}
                    className="block rounded-xl border border-white/10 bg-surface p-4 hover:border-brand-blue/50 transition-colors"
                  >
                    <div className="flex items-center justify-between gap-3 flex-wrap">
                      <div className="flex items-center gap-2 min-w-0">
                        <span className="font-mono text-xs text-muted">{p.code}</span>
                        <span className="font-semibold text-sm truncate">{p.title}</span>
                      </div>
                      {a.deadline && (
                        <UrgencyBadge
                          level={urgency(a.deadline)}
                          label={urgencyLabel(a.deadline)}
                        />
                      )}
                    </div>
                    <div className="flex items-center gap-2 mt-2 flex-wrap">
                      <FunnelBadge level={p.funnel_level} />
                      <StatusBadge status={p.status} />
                      <span className="text-[11px] text-muted">
                        Revisar: {STAGE_LABELS[a.stage as ApprovalStage]}
                      </span>
                      {p.scheduled_date && (
                        <span className="text-[11px] text-muted">
                          · Publica {fmtDate(p.scheduled_date)}
                        </span>
                      )}
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
        )}
      </section>

      {/* Próximas publicaciones */}
      <section>
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-display text-base font-bold">Próximas publicaciones</h2>
          <Link href={`${ICS_BASE}/grilla`} className="text-xs text-brand-blue">
            Ver grilla →
          </Link>
        </div>
        {(upcoming ?? []).length === 0 ? (
          <p className="text-sm text-muted">Nada programado por ahora.</p>
        ) : (
          <ul className="divide-y divide-white/5 rounded-xl border border-white/10 bg-surface">
            {(upcoming as ContentPiece[]).map((p) => (
              <li key={p.id}>
                <Link
                  href={`${ICS_BASE}/pieza/${p.id}`}
                  className="flex items-center justify-between gap-3 px-4 py-3 hover:bg-white/5"
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="font-mono text-xs text-muted">{p.code}</span>
                    <span className="text-sm truncate">{p.title}</span>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <FunnelBadge level={p.funnel_level} />
                    <span className="text-xs text-muted">
                      {fmtDate(p.scheduled_date)}
                      {!p.date_confirmed && " (tentativa)"}
                    </span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* Pedidos abiertos */}
      <section>
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-display text-base font-bold">Pedidos abiertos</h2>
          <Link href={`${ICS_BASE}/pedidos`} className="text-xs text-brand-blue">
            Ver todos →
          </Link>
        </div>
        {(openRequests ?? []).length === 0 ? (
          <p className="text-sm text-muted">Sin pedidos abiertos.</p>
        ) : (
          <ul className="space-y-2">
            {(openRequests ?? []).map((r) => (
              <li
                key={r.id}
                className="rounded-lg border border-white/10 bg-surface px-4 py-2.5 text-sm flex items-center justify-between gap-3"
              >
                <span className="truncate">{r.title}</span>
                <span className="text-[11px] text-muted shrink-0">
                  {r.direction === "agency_to_client"
                    ? "Te lo pedimos"
                    : "Lo pediste"}
                </span>
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}
