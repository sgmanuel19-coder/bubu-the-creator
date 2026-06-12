import Link from "next/link";
import { notFound } from "next/navigation";
import { requireProfile } from "@/lib/ics/auth";
import { createSupabaseServer } from "@/lib/ics/supabase/server";
import { ICS_BASE, STAGE_LABELS, ApprovalStage } from "@/lib/ics/constants";
import { fmtDate } from "@/lib/ics/utils";
import PieceForm from "@/components/ics/PieceForm";
import StoryboardBuilder from "@/components/ics/StoryboardBuilder";
import StatusControl from "@/components/ics/StatusControl";
import MetricsForm from "@/components/ics/MetricsForm";
import { StatusBadge } from "@/components/ics/Badges";
import type {
  Approval,
  Client,
  ContentPiece,
  StoryboardFrame,
} from "@/lib/ics/types";

export default async function AdminPiezaPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  await requireProfile(["admin", "team"]);
  const supabase = await createSupabaseServer();

  const { data: piece } = await supabase
    .from("content_pieces")
    .select("*")
    .eq("id", id)
    .single<ContentPiece>();
  if (!piece) notFound();

  const [{ data: clients }, { data: frames }, { data: approvals }] =
    await Promise.all([
      supabase.from("clients").select("id, name, formats").order("name"),
      supabase
        .from("storyboard_frames")
        .select("*")
        .eq("piece_id", id)
        .order("position", { ascending: true }),
      supabase
        .from("approvals")
        .select("*")
        .eq("piece_id", id)
        .order("requested_at", { ascending: false }),
    ]);

  return (
    <main className="max-w-3xl mx-auto space-y-8">
      <header className="flex items-center justify-between gap-3 flex-wrap">
        <div>
          <h1 className="font-display text-xl font-bold">
            <span className="font-mono text-muted mr-2">{piece.code}</span>
            {piece.title}
          </h1>
          <div className="mt-2 flex items-center gap-3 flex-wrap">
            <StatusBadge status={piece.status} />
            <span className="text-xs text-muted">
              V{piece.current_version} · {piece.revision_rounds} ronda(s) de cambios
            </span>
          </div>
        </div>
        <Link
          href={`${ICS_BASE}/pieza/${piece.id}`}
          className="text-xs text-brand-blue border border-brand-blue/30 rounded-md px-3 py-1.5"
        >
          Ver como cliente
        </Link>
      </header>

      <section className="rounded-xl border border-white/10 bg-surface p-4">
        <h2 className="font-display text-sm font-bold text-muted uppercase tracking-wider mb-3">
          Estado de la pieza
        </h2>
        <StatusControl pieceId={piece.id} status={piece.status} />
        <p className="text-[11px] text-muted mt-2">
          Al pasar a “Boceto en revisión” o “Pieza en revisión” se crea la
          aprobación del cliente con su deadline calculado y la fecha tentativa
          empieza a correr.
        </p>
      </section>

      {(approvals ?? []).length > 0 && (
        <section>
          <h2 className="font-display text-sm font-bold text-muted uppercase tracking-wider mb-3">
            Historial de aprobaciones
          </h2>
          <ul className="space-y-1.5">
            {((approvals ?? []) as Approval[]).map((a) => (
              <li
                key={a.id}
                className="rounded-lg border border-white/10 bg-surface px-3.5 py-2.5 text-xs flex items-center justify-between gap-2 flex-wrap"
              >
                <span>
                  {STAGE_LABELS[a.stage as ApprovalStage]}
                  {a.deadline && ` · vence ${fmtDate(a.deadline)}`}
                  {a.out_of_scope && (
                    <span className="text-orange-300"> · fuera de alcance</span>
                  )}
                </span>
                <span
                  className={
                    a.status === "pending"
                      ? "text-amber-300"
                      : a.status === "changes_requested"
                        ? "text-orange-300"
                        : "text-emerald-300"
                  }
                >
                  {a.status === "pending"
                    ? "Pendiente"
                    : a.status === "approved"
                      ? "Aprobada"
                      : a.status === "auto_approved"
                        ? "Auto-aprobada"
                        : "Pidió cambios"}
                </span>
                {a.note && (
                  <p className="w-full text-muted mt-1">“{a.note}”</p>
                )}
              </li>
            ))}
          </ul>
        </section>
      )}

      <section>
        <h2 className="font-display text-sm font-bold text-muted uppercase tracking-wider mb-3">
          Storyboard
        </h2>
        <StoryboardBuilder
          pieceId={piece.id}
          frames={(frames ?? []) as StoryboardFrame[]}
        />
      </section>

      <section>
        <h2 className="font-display text-sm font-bold text-muted uppercase tracking-wider mb-3">
          Métricas (cuando esté publicada)
        </h2>
        <MetricsForm pieceId={piece.id} />
      </section>

      <section>
        <h2 className="font-display text-sm font-bold text-muted uppercase tracking-wider mb-3">
          Datos de la pieza
        </h2>
        <PieceForm
          clients={(clients ?? []) as Pick<Client, "id" | "name" | "formats">[]}
          piece={piece}
        />
      </section>
    </main>
  );
}
