import {
  FUNNEL_COLORS,
  FUNNEL_DOT,
  FunnelLevel,
  PieceStatus,
  STATUS_COLORS,
  STATUS_LABELS,
} from "@/lib/ics/constants";
import type { Urgency } from "@/lib/ics/deadlines";

export function FunnelBadge({ level }: { level: FunnelLevel }) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[10px] font-semibold ${FUNNEL_COLORS[level]}`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${FUNNEL_DOT[level]}`} />
      {level}
    </span>
  );
}

export function StatusBadge({ status }: { status: PieceStatus }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-semibold ${STATUS_COLORS[status]}`}
    >
      {STATUS_LABELS[status]}
    </span>
  );
}

const URGENCY_STYLES: Record<Urgency, string> = {
  red: "bg-red-500/15 text-red-300 border-red-500/40",
  yellow: "bg-amber-500/15 text-amber-300 border-amber-500/40",
  green: "bg-emerald-500/15 text-emerald-300 border-emerald-500/40",
};

export function UrgencyBadge({
  level,
  label,
}: {
  level: Urgency;
  label: string;
}) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-semibold ${URGENCY_STYLES[level]}`}
    >
      <span
        className={`h-2 w-2 rounded-full ${
          level === "red"
            ? "bg-red-400 animate-pulse"
            : level === "yellow"
              ? "bg-amber-400"
              : "bg-emerald-400"
        }`}
      />
      {label}
    </span>
  );
}
