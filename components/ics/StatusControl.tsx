"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { setPieceStatus } from "@/lib/ics/actions";
import {
  PIECE_STATUSES,
  PieceStatus,
  STATUS_LABELS,
} from "@/lib/ics/constants";

/** Selector de estado de la pieza (staff). Mandar a revisión crea la aprobación con deadline. */
export default function StatusControl({
  pieceId,
  status,
}: {
  pieceId: string;
  status: PieceStatus;
}) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  return (
    <div className="flex items-center gap-2">
      <select
        value={status}
        disabled={pending}
        onChange={(e) =>
          startTransition(async () => {
            await setPieceStatus(pieceId, e.target.value as PieceStatus);
            router.refresh();
          })
        }
        className="rounded-lg bg-bg border border-white/10 px-3 py-2 text-sm focus:outline-none focus:border-brand-blue"
      >
        {PIECE_STATUSES.map((s) => (
          <option key={s} value={s}>
            {STATUS_LABELS[s]}
          </option>
        ))}
      </select>
      {pending && <span className="text-xs text-muted">Guardando…</span>}
    </div>
  );
}
