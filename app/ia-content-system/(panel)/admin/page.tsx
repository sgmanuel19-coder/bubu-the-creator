import Link from "next/link";
import { requireProfile } from "@/lib/ics/auth";
import { createSupabaseServer } from "@/lib/ics/supabase/server";
import { ICS_BASE } from "@/lib/ics/constants";
import { urgency } from "@/lib/ics/deadlines";
import KanbanBoard from "@/components/ics/KanbanBoard";
import type { Approval, ContentPiece } from "@/lib/ics/types";

export default async function AdminPage({
  searchParams,
}: {
  searchParams: Promise<{ c?: string }>;
}) {
  await requireProfile(["admin", "team"]);
  const { c } = await searchParams;
  const supabase = await createSupabaseServer();

  const [{ data: clients }, { data: pendingApprovals }] = await Promise.all([
    supabase.from("clients").select("id, name").order("name"),
    supabase
      .from("approvals")
      .select("*, content_pieces(id, code, title, client_id)")
      .eq("status", "pending"),
  ]);

  let piecesQuery = supabase
    .from("content_pieces")
    .select("*")
    .neq("status", "publicado")
    .order("scheduled_date", { ascending: true, nullsFirst: false });
  if (c) piecesQuery = piecesQuery.eq("client_id", c);
  const { data: pieces } = await piecesQuery;

  // Alertas: aprobaciones pendientes con deadline en rojo/amarillo
  const atRisk = ((pendingApprovals ?? []) as (Approval & {
    content_pieces: { id: string; code: string; title: string; client_id: string } | null;
  })[]).filter(
    (a) =>
      a.content_pieces &&
      a.deadline &&
      (!c || a.content_pieces.client_id === c) &&
      urgency(a.deadline) !== "green",
  );

  return (
    <main className="space-y-6">
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <h1 className="font-display text-xl font-bold">Pipeline</h1>
        <div className="flex items-center gap-2 flex-wrap">
          <div className="flex gap-1 flex-wrap">
            <Link
              href={`${ICS_BASE}/admin`}
              className={`rounded-full px-3 py-1.5 text-xs border ${!c ? "border-brand-blue text-brand-blue" : "border-white/10 text-muted"}`}
            >
              Todos
            </Link>
            {(clients ?? []).map((cl) => (
              <Link
                key={cl.id}
                href={`${ICS_BASE}/admin?c=${cl.id}`}
                className={`rounded-full px-3 py-1.5 text-xs border ${c === cl.id ? "border-brand-blue text-brand-blue" : "border-white/10 text-muted"}`}
              >
                {cl.name}
              </Link>
            ))}
          </div>
          <Link
            href={`${ICS_BASE}/admin/pieza/nueva`}
            className="rounded-lg bg-brand-blue text-white px-4 py-2 text-xs font-semibold"
          >
            + Nueva pieza
          </Link>
          <Link
            href={`${ICS_BASE}/admin/usuarios`}
            className="rounded-lg border border-white/15 px-4 py-2 text-xs"
          >
            Usuarios
          </Link>
        </div>
      </div>

      {atRisk.length > 0 && (
        <section className="rounded-xl border border-red-500/30 bg-red-500/5 p-4">
          <p className="text-sm font-semibold text-red-300 mb-2">
            ⚠️ Aprobaciones en riesgo ({atRisk.length})
          </p>
          <ul className="space-y-1">
            {atRisk.map((a) => (
              <li key={a.id} className="text-xs">
                <Link
                  href={`${ICS_BASE}/pieza/${a.content_pieces!.id}`}
                  className="hover:text-brand-blue"
                >
                  <span className="font-mono text-muted mr-1">
                    {a.content_pieces!.code}
                  </span>
                  {a.content_pieces!.title} — vence {a.deadline}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      <KanbanBoard pieces={(pieces ?? []) as ContentPiece[]} />
    </main>
  );
}
