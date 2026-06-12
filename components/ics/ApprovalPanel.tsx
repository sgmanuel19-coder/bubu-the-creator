"use client";

import { useState, useTransition } from "react";
import { respondApproval } from "@/lib/ics/actions";
import { STAGE_LABELS, ApprovalStage } from "@/lib/ics/constants";
import { daysUntil, urgency } from "@/lib/ics/deadlines";
import { UrgencyBadge } from "@/components/ics/Badges";
import { fmtDate } from "@/lib/ics/utils";
import type { Approval } from "@/lib/ics/types";

export default function ApprovalPanel({ approval }: { approval: Approval }) {
  const [mode, setMode] = useState<"idle" | "changes">("idle");
  const [note, setNote] = useState("");
  const [result, setResult] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  function respond(decision: "approved" | "changes_requested") {
    startTransition(async () => {
      const res = await respondApproval(approval.id, decision, note || undefined);
      if (!res.ok) {
        setResult(res.message ?? "Ocurrió un error.");
        return;
      }
      setResult(
        decision === "approved"
          ? "✅ Aprobado. ¡Gracias! Seguimos con la producción."
          : `📝 Cambios solicitados.${res.message ? " " + res.message : ""}`,
      );
      setMode("idle");
    });
  }

  if (result) {
    return (
      <div className="rounded-xl border border-brand-blue/40 bg-brand-blue/10 p-4 text-sm">
        {result}
      </div>
    );
  }

  const dl = approval.deadline;

  return (
    <section className="rounded-xl border border-brand-blue/40 bg-brand-blue/5 p-4 space-y-3">
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <div>
          <p className="font-display font-bold text-sm">
            Tu revisión: {STAGE_LABELS[approval.stage as ApprovalStage]}
          </p>
          {dl && (
            <p className="text-xs text-muted mt-0.5">
              Si no respondes antes del {fmtDate(dl)}, se aprueba
              automáticamente para no atrasar tu grilla.
            </p>
          )}
        </div>
        {dl && (
          <UrgencyBadge
            level={urgency(dl)}
            label={
              daysUntil(dl) <= 0
                ? "Vence hoy"
                : `Vence en ${daysUntil(dl)} día${daysUntil(dl) === 1 ? "" : "s"}`
            }
          />
        )}
      </div>

      {mode === "changes" && (
        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          rows={3}
          placeholder="Cuéntanos qué cambiarías (sé específico para resolverlo en una sola ronda)…"
          className="w-full rounded-lg bg-surface border border-white/10 px-3 py-2.5 text-sm placeholder:text-muted/50 focus:outline-none focus:border-brand-blue"
        />
      )}

      <div className="flex gap-2">
        {mode === "idle" ? (
          <>
            <button
              onClick={() => respond("approved")}
              disabled={pending}
              className="flex-1 rounded-lg bg-emerald-500 text-bg font-bold py-3 text-sm hover:bg-emerald-400 transition-colors disabled:opacity-50"
            >
              {pending ? "Guardando…" : "✓ Aprobar"}
            </button>
            <button
              onClick={() => setMode("changes")}
              disabled={pending}
              className="flex-1 rounded-lg border border-white/15 py-3 text-sm hover:border-amber-400/60 transition-colors"
            >
              Pedir cambios
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => respond("changes_requested")}
              disabled={pending || !note.trim()}
              className="flex-1 rounded-lg bg-amber-500 text-bg font-bold py-3 text-sm hover:bg-amber-400 transition-colors disabled:opacity-50"
            >
              {pending ? "Enviando…" : "Enviar cambios"}
            </button>
            <button
              onClick={() => setMode("idle")}
              disabled={pending}
              className="rounded-lg border border-white/15 px-4 py-3 text-sm"
            >
              Cancelar
            </button>
          </>
        )}
      </div>
    </section>
  );
}
