"use server";

import { revalidatePath } from "next/cache";
import { requireProfile } from "./auth";
import {
  Complexity,
  ICS_BASE,
  INCLUDED_REVISION_ROUNDS,
  PieceStatus,
} from "./constants";
import {
  conceptDeadline,
  finalDeadline,
  proposeNewDate,
  reworkFits,
} from "./deadlines";
import { createSupabaseServer } from "./supabase/server";
import { createSupabaseAdmin } from "./supabase/admin";
import type { Approval, ContentPiece } from "./types";

// ---------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------

async function logActivity(
  action: string,
  entity: string,
  entityId: string | null,
  clientId: string | null,
  detail?: Record<string, unknown>,
) {
  const supabase = await createSupabaseServer();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  await supabase.from("activity_log").insert({
    actor: user?.id ?? null,
    action,
    entity,
    entity_id: entityId,
    client_id: clientId,
    detail: detail ?? null,
  });
}

function revalidateICS() {
  revalidatePath(ICS_BASE, "layout");
}

// ---------------------------------------------------------------
// Aprobaciones (cliente responde; staff también puede)
// ---------------------------------------------------------------

export async function respondApproval(
  approvalId: string,
  decision: "approved" | "changes_requested",
  note?: string,
): Promise<{ ok: boolean; message?: string }> {
  const profile = await requireProfile();
  const supabase = await createSupabaseServer();

  const { data: approval } = await supabase
    .from("approvals")
    .select("*")
    .eq("id", approvalId)
    .single<Approval>();
  if (!approval || approval.status !== "pending") {
    return { ok: false, message: "Esta revisión ya fue respondida." };
  }

  const { data: piece } = await supabase
    .from("content_pieces")
    .select("*")
    .eq("id", approval.piece_id)
    .single<ContentPiece>();
  if (!piece) return { ok: false, message: "Pieza no encontrada." };

  // ¿Cambios después de un concepto ya aprobado? → fuera de alcance
  const outOfScope = decision === "changes_requested" && approval.stage === "final";

  const { error: aErr } = await supabase
    .from("approvals")
    .update({
      status: decision,
      responded_by: profile.id,
      responded_at: new Date().toISOString(),
      note: note ?? null,
      out_of_scope: outOfScope,
    })
    .eq("id", approvalId);
  if (aErr) return { ok: false, message: "No se pudo guardar la respuesta." };

  const pieceUpdate: Record<string, unknown> = {};
  let message: string | undefined;

  if (decision === "approved") {
    if (approval.stage === "concepto") {
      pieceUpdate.status = "concepto_aprobado" satisfies PieceStatus;
      pieceUpdate.date_confirmed = true; // calendario: tentativa → confirmada
    } else if (approval.stage === "final") {
      pieceUpdate.status = "aprobado" satisfies PieceStatus;
    }
  } else {
    const rounds = piece.revision_rounds + 1;
    pieceUpdate.revision_rounds = rounds;
    pieceUpdate.status = (
      approval.stage === "concepto" ? "en_guion" : "correcciones"
    ) satisfies PieceStatus;

    if (rounds > INCLUDED_REVISION_ROUNDS) {
      message = `Ronda de cambios #${rounds}: ronda adicional fuera de las ${INCLUDED_REVISION_ROUNDS} incluidas.`;
    }

    // ¿El rework llega a la fecha? Si no, reprogramar automáticamente.
    if (
      piece.scheduled_date &&
      !reworkFits(piece.scheduled_date, piece.complexity as Complexity)
    ) {
      const newDate = proposeNewDate(piece.complexity as Complexity);
      pieceUpdate.scheduled_date = newDate;
      pieceUpdate.date_confirmed = false;
      pieceUpdate.rescheduled_reason = `Reprogramada por cambios (ronda ${rounds}): la fecha original ${piece.scheduled_date} ya no alcanzaba.`;
      message = `${message ? message + " " : ""}La pieza se reprogramó al ${newDate} porque el rework no llegaba a la fecha original.`;
    }
  }

  await supabase.from("content_pieces").update(pieceUpdate).eq("id", piece.id);

  await logActivity(
    decision === "approved" ? "aprobó" : "pidió cambios",
    `aprobación ${approval.stage}`,
    piece.id,
    piece.client_id,
    { stage: approval.stage, note, out_of_scope: outOfScope, ...pieceUpdate },
  );

  revalidateICS();
  return { ok: true, message };
}

// ---------------------------------------------------------------
// Comentarios
// ---------------------------------------------------------------

export async function addComment(pieceId: string, body: string) {
  const profile = await requireProfile();
  if (!body.trim()) return { ok: false };
  const supabase = await createSupabaseServer();

  const { error } = await supabase.from("comments").insert({
    piece_id: pieceId,
    user_id: profile.id,
    body: body.trim(),
  });
  if (error) return { ok: false };

  revalidateICS();
  return { ok: true };
}

export async function toggleCommentResolved(commentId: string, resolved: boolean) {
  await requireProfile();
  const supabase = await createSupabaseServer();
  await supabase.from("comments").update({ resolved }).eq("id", commentId);
  revalidateICS();
  return { ok: true };
}

// ---------------------------------------------------------------
// Staff: estados y ciclo de vida de la pieza
// ---------------------------------------------------------------

export async function setPieceStatus(pieceId: string, status: PieceStatus) {
  const profile = await requireProfile(["admin", "team"]);
  const supabase = await createSupabaseServer();

  const { data: piece } = await supabase
    .from("content_pieces")
    .select("*")
    .eq("id", pieceId)
    .single<ContentPiece>();
  if (!piece) return { ok: false, message: "Pieza no encontrada." };

  await supabase.from("content_pieces").update({ status }).eq("id", pieceId);

  // Al mandar a revisión se crea la aprobación con deadline calculado
  if (status === "concepto_en_revision" && piece.scheduled_date) {
    await supabase.from("approvals").insert({
      piece_id: pieceId,
      stage: "concepto",
      deadline: conceptDeadline(piece.scheduled_date, piece.complexity as Complexity),
    });
  }

  if (status === "pieza_en_revision") {
    if (piece.scheduled_date) {
      await supabase.from("approvals").insert({
        piece_id: pieceId,
        stage: "final",
        deadline: finalDeadline(piece.scheduled_date),
      });
    }
    // nueva versión con snapshot del estado actual
    const version = piece.current_version + 1;
    await supabase.from("piece_versions").insert({
      piece_id: pieceId,
      version_number: piece.current_version,
      snapshot: piece as unknown as Record<string, unknown>,
      created_by: profile.id,
    });
    await supabase
      .from("content_pieces")
      .update({ current_version: version })
      .eq("id", pieceId);
  }

  await logActivity("cambió estado a " + status, "pieza", pieceId, piece.client_id);
  revalidateICS();
  return { ok: true };
}

// ---------------------------------------------------------------
// Staff: CRUD de piezas
// ---------------------------------------------------------------

export interface PieceInput {
  client_id: string;
  code: string;
  title: string;
  format?: string | null;
  type: string;
  platforms: string[];
  funnel_level: string;
  complexity: string;
  duration_target?: string | null;
  assignee?: string | null;
  scheduled_date?: string | null;
  idea_description?: string | null;
  script?: string | null;
  copy_out?: string | null;
  hashtags?: string | null;
  drive_link?: string | null;
  grid_id?: string | null;
}

export async function createPiece(input: PieceInput) {
  await requireProfile(["admin", "team"]);
  const supabase = await createSupabaseServer();

  const { data, error } = await supabase
    .from("content_pieces")
    .insert(input)
    .select("id, client_id")
    .single();
  if (error || !data) return { ok: false as const, message: error?.message };

  await logActivity("creó pieza", "pieza", data.id, data.client_id, { code: input.code });
  revalidateICS();
  return { ok: true as const, id: data.id as string };
}

export async function updatePiece(pieceId: string, input: Partial<PieceInput>) {
  await requireProfile(["admin", "team"]);
  const supabase = await createSupabaseServer();

  const { data, error } = await supabase
    .from("content_pieces")
    .update(input)
    .eq("id", pieceId)
    .select("client_id")
    .single();
  if (error) return { ok: false, message: error.message };

  await logActivity("editó pieza", "pieza", pieceId, data?.client_id ?? null);
  revalidateICS();
  return { ok: true };
}

export async function deletePiece(pieceId: string) {
  await requireProfile(["admin"]);
  const supabase = await createSupabaseServer();
  await supabase.from("content_pieces").delete().eq("id", pieceId);
  revalidateICS();
  return { ok: true };
}

// ---------------------------------------------------------------
// Staff: storyboard
// ---------------------------------------------------------------

export interface FrameInput {
  piece_id: string;
  position: number;
  image_url?: string | null;
  what_we_see?: string;
  what_we_say?: string;
  duration_seconds?: number | null;
}

export async function saveFrame(frameId: string | null, input: FrameInput) {
  await requireProfile(["admin", "team"]);
  const supabase = await createSupabaseServer();

  if (frameId) {
    const { error } = await supabase
      .from("storyboard_frames")
      .update(input)
      .eq("id", frameId);
    if (error) return { ok: false as const, message: error.message };
    revalidateICS();
    return { ok: true as const, id: frameId };
  }

  const { data, error } = await supabase
    .from("storyboard_frames")
    .insert(input)
    .select("id")
    .single();
  if (error || !data) return { ok: false as const, message: error?.message };
  revalidateICS();
  return { ok: true as const, id: data.id as string };
}

export async function deleteFrame(frameId: string) {
  await requireProfile(["admin", "team"]);
  const supabase = await createSupabaseServer();
  await supabase.from("storyboard_frames").delete().eq("id", frameId);
  revalidateICS();
  return { ok: true };
}

export async function reorderFrames(pieceId: string, orderedIds: string[]) {
  await requireProfile(["admin", "team"]);
  const supabase = await createSupabaseServer();
  await Promise.all(
    orderedIds.map((id, i) =>
      supabase
        .from("storyboard_frames")
        .update({ position: i })
        .eq("id", id)
        .eq("piece_id", pieceId),
    ),
  );
  revalidateICS();
  return { ok: true };
}

// ---------------------------------------------------------------
// Pedidos (bidireccional)
// ---------------------------------------------------------------

export async function createRequest(input: {
  client_id: string;
  title: string;
  description?: string;
  due_date?: string | null;
}) {
  const profile = await requireProfile();
  const supabase = await createSupabaseServer();

  const direction =
    profile.role === "client" ? "client_to_agency" : "agency_to_client";

  const { error } = await supabase.from("requests").insert({
    ...input,
    direction,
    created_by: profile.id,
  });
  if (error) return { ok: false, message: error.message };

  await logActivity("creó pedido", "pedido", null, input.client_id, {
    title: input.title,
    direction,
  });
  revalidateICS();
  return { ok: true };
}

export async function setRequestStatus(requestId: string, status: string) {
  await requireProfile();
  const supabase = await createSupabaseServer();
  await supabase.from("requests").update({ status }).eq("id", requestId);
  revalidateICS();
  return { ok: true };
}

// ---------------------------------------------------------------
// Staff: métricas
// ---------------------------------------------------------------

export async function savePieceMetrics(input: {
  piece_id: string;
  reach?: number | null;
  likes?: number | null;
  comments_count?: number | null;
  shares?: number | null;
  saves?: number | null;
  watch_time?: string | null;
}) {
  await requireProfile(["admin", "team"]);
  const supabase = await createSupabaseServer();
  const { error } = await supabase.from("piece_metrics").insert(input);
  if (error) return { ok: false, message: error.message };
  revalidateICS();
  return { ok: true };
}

export async function saveAccountMetrics(input: {
  client_id: string;
  month: string;
  followers?: number | null;
  total_reach?: number | null;
  engagement_rate?: number | null;
  notes?: string | null;
}) {
  await requireProfile(["admin", "team"]);
  const supabase = await createSupabaseServer();
  const { error } = await supabase
    .from("account_metrics")
    .upsert(input, { onConflict: "client_id,month" });
  if (error) return { ok: false, message: error.message };
  revalidateICS();
  return { ok: true };
}

// ---------------------------------------------------------------
// Admin: usuarios
// ---------------------------------------------------------------

export async function createUser(input: {
  email: string;
  password: string;
  full_name: string;
  role: "admin" | "team" | "client";
  client_id?: string | null;
}) {
  await requireProfile(["admin"]);
  const admin = createSupabaseAdmin();

  const { data, error } = await admin.auth.admin.createUser({
    email: input.email,
    password: input.password,
    email_confirm: true,
  });
  if (error || !data.user) {
    return { ok: false, message: error?.message ?? "No se pudo crear el usuario." };
  }

  const { error: pErr } = await admin.from("profiles").insert({
    id: data.user.id,
    role: input.role,
    client_id: input.role === "client" ? input.client_id : null,
    full_name: input.full_name,
    email: input.email,
  });
  if (pErr) {
    await admin.auth.admin.deleteUser(data.user.id);
    return { ok: false, message: pErr.message };
  }

  revalidateICS();
  return { ok: true };
}
