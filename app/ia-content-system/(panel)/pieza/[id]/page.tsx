import { notFound } from "next/navigation";
import Link from "next/link";
import { requireProfile, isStaff } from "@/lib/ics/auth";
import { createSupabaseServer } from "@/lib/ics/supabase/server";
import {
  COMPLEXITY_LABELS,
  ICS_BASE,
  INCLUDED_REVISION_ROUNDS,
  TYPE_LABELS,
} from "@/lib/ics/constants";
import { driveEmbedUrl, fmtDate } from "@/lib/ics/utils";
import { FunnelBadge, StatusBadge } from "@/components/ics/Badges";
import StoryboardStrip from "@/components/ics/StoryboardStrip";
import CopyBlock from "@/components/ics/CopyBlock";
import ApprovalPanel from "@/components/ics/ApprovalPanel";
import CommentsThread from "@/components/ics/CommentsThread";
import type {
  Approval,
  Comment,
  ContentPiece,
  StoryboardFrame,
} from "@/lib/ics/types";

export default async function PiecePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const profile = await requireProfile();
  const supabase = await createSupabaseServer();

  const { data: piece } = await supabase
    .from("content_pieces")
    .select("*")
    .eq("id", id)
    .single<ContentPiece>();
  if (!piece) notFound();

  const [{ data: frames }, { data: approvals }, { data: comments }] =
    await Promise.all([
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
      supabase
        .from("comments")
        .select("*, profiles(full_name)")
        .eq("piece_id", id)
        .order("created_at", { ascending: true }),
    ]);

  const pendingApproval = ((approvals ?? []) as Approval[]).find(
    (a) => a.status === "pending",
  );
  const embed = driveEmbedUrl(piece.drive_link);
  const staff = isStaff(profile);

  const commentList: Comment[] = ((comments ?? []) as (Comment & {
    profiles: { full_name: string } | null;
  })[]).map((c) => ({ ...c, author_name: c.profiles?.full_name ?? "—" }));

  return (
    <main className="space-y-8 max-w-3xl mx-auto">
      {/* Encabezado */}
      <header>
        <div className="flex items-center justify-between gap-3 flex-wrap">
          <div className="flex items-center gap-2">
            <span className="font-mono text-sm text-muted">{piece.code}</span>
            <FunnelBadge level={piece.funnel_level} />
            <StatusBadge status={piece.status} />
          </div>
          {staff && (
            <Link
              href={`${ICS_BASE}/admin/pieza/${piece.id}`}
              className="text-xs text-brand-blue border border-brand-blue/30 rounded-md px-3 py-1.5"
            >
              Editar pieza
            </Link>
          )}
        </div>
        <h1 className="font-display text-2xl font-bold mt-2">{piece.title}</h1>
        <div className="flex items-center gap-2 mt-2 text-xs text-muted flex-wrap">
          <span>{TYPE_LABELS[piece.type]}</span>
          {piece.format && <span>· {piece.format}</span>}
          <span>· Complejidad {COMPLEXITY_LABELS[piece.complexity]}</span>
          <span>
            · Publica {fmtDate(piece.scheduled_date)}
            {!piece.date_confirmed && " (tentativa)"}
          </span>
          <span>· V{piece.current_version}</span>
        </div>
        {piece.rescheduled_reason && (
          <p className="mt-3 rounded-lg border border-orange-500/30 bg-orange-500/10 px-3 py-2 text-xs text-orange-200">
            📅 {piece.rescheduled_reason}
          </p>
        )}
        {piece.revision_rounds > INCLUDED_REVISION_ROUNDS && (
          <p className="mt-2 rounded-lg border border-amber-500/30 bg-amber-500/10 px-3 py-2 text-xs text-amber-200">
            Esta pieza lleva {piece.revision_rounds} rondas de cambios (
            {INCLUDED_REVISION_ROUNDS} incluidas).
          </p>
        )}
      </header>

      {/* Aprobación pendiente */}
      {pendingApproval && (
        <ApprovalPanel approval={pendingApproval} />
      )}

      {/* Idea */}
      {piece.idea_description && (
        <section>
          <h2 className="font-display text-sm font-bold text-muted uppercase tracking-wider mb-2">
            La idea
          </h2>
          <p className="text-sm leading-relaxed whitespace-pre-wrap">
            {piece.idea_description}
          </p>
        </section>
      )}

      {/* Guion */}
      {piece.script && (
        <section>
          <h2 className="font-display text-sm font-bold text-muted uppercase tracking-wider mb-2">
            Guion
          </h2>
          <div className="rounded-xl border border-white/10 bg-surface p-4 text-sm leading-relaxed whitespace-pre-wrap">
            {piece.script}
          </div>
        </section>
      )}

      {/* Storyboard */}
      {(frames ?? []).length > 0 && (
        <section>
          <h2 className="font-display text-sm font-bold text-muted uppercase tracking-wider mb-2">
            Storyboard
          </h2>
          <StoryboardStrip frames={(frames ?? []) as StoryboardFrame[]} />
        </section>
      )}

      {/* Material final */}
      {embed && (
        <section>
          <h2 className="font-display text-sm font-bold text-muted uppercase tracking-wider mb-2">
            Material
          </h2>
          <div className="aspect-[9/16] max-w-xs rounded-xl overflow-hidden border border-white/10">
            <iframe
              src={embed}
              className="w-full h-full"
              allow="autoplay"
              title="Material de la pieza"
            />
          </div>
        </section>
      )}

      {/* Copy out */}
      {(piece.copy_out || piece.hashtags) && (
        <section>
          <h2 className="font-display text-sm font-bold text-muted uppercase tracking-wider mb-2">
            Copy para publicar
          </h2>
          <CopyBlock copyOut={piece.copy_out} hashtags={piece.hashtags} />
        </section>
      )}

      {/* Comentarios */}
      <section>
        <h2 className="font-display text-sm font-bold text-muted uppercase tracking-wider mb-2">
          Comentarios
        </h2>
        <CommentsThread pieceId={piece.id} initial={commentList} canResolve={staff} />
      </section>
    </main>
  );
}
