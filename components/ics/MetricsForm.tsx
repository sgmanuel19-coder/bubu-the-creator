"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { savePieceMetrics } from "@/lib/ics/actions";

export default function MetricsForm({ pieceId }: { pieceId: string }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [saved, setSaved] = useState(false);
  const [v, setV] = useState({
    reach: "",
    likes: "",
    comments_count: "",
    shares: "",
    saves: "",
    watch_time: "",
  });

  function submit(e: React.FormEvent) {
    e.preventDefault();
    startTransition(async () => {
      await savePieceMetrics({
        piece_id: pieceId,
        reach: v.reach ? Number(v.reach) : null,
        likes: v.likes ? Number(v.likes) : null,
        comments_count: v.comments_count ? Number(v.comments_count) : null,
        shares: v.shares ? Number(v.shares) : null,
        saves: v.saves ? Number(v.saves) : null,
        watch_time: v.watch_time || null,
      });
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
      router.refresh();
    });
  }

  const input =
    "w-full rounded-md bg-bg border border-white/10 px-2.5 py-2 text-xs focus:outline-none focus:border-brand-blue";

  const fields: { key: keyof typeof v; label: string; type?: string }[] = [
    { key: "reach", label: "Alcance" },
    { key: "likes", label: "Likes" },
    { key: "comments_count", label: "Comentarios" },
    { key: "shares", label: "Compartidos" },
    { key: "saves", label: "Guardados" },
    { key: "watch_time", label: "Tiempo visto", type: "text" },
  ];

  return (
    <form onSubmit={submit} className="rounded-xl border border-white/10 bg-surface p-4">
      <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
        {fields.map((f) => (
          <div key={f.key}>
            <label className="block text-[10px] text-muted mb-1">{f.label}</label>
            <input
              type={f.type ?? "number"}
              min={0}
              value={v[f.key]}
              onChange={(e) => setV({ ...v, [f.key]: e.target.value })}
              className={input}
            />
          </div>
        ))}
      </div>
      <button
        type="submit"
        disabled={pending}
        className="mt-3 rounded-lg bg-brand-blue text-white px-4 py-2 text-xs font-semibold disabled:opacity-50"
      >
        {saved ? "✓ Guardado" : pending ? "Guardando…" : "Registrar medición"}
      </button>
    </form>
  );
}
