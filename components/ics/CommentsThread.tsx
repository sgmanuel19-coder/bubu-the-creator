"use client";

import { useEffect, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Send } from "lucide-react";
import { addComment, toggleCommentResolved } from "@/lib/ics/actions";
import { createSupabaseBrowser } from "@/lib/ics/supabase/client";
import { fmtDate } from "@/lib/ics/utils";
import type { Comment } from "@/lib/ics/types";

export default function CommentsThread({
  pieceId,
  initial,
  canResolve,
}: {
  pieceId: string;
  initial: Comment[];
  canResolve: boolean;
}) {
  const router = useRouter();
  const [body, setBody] = useState("");
  const [pending, startTransition] = useTransition();

  // Realtime: comentarios nuevos aparecen sin recargar
  useEffect(() => {
    const supabase = createSupabaseBrowser();
    const channel = supabase
      .channel(`ics-comments-${pieceId}`)
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "comments",
          filter: `piece_id=eq.${pieceId}`,
        },
        () => router.refresh(),
      )
      .subscribe();
    return () => {
      supabase.removeChannel(channel);
    };
  }, [pieceId, router]);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!body.trim()) return;
    const text = body;
    setBody(""); // optimistic clear
    startTransition(async () => {
      await addComment(pieceId, text);
      router.refresh();
    });
  }

  return (
    <div className="space-y-3">
      {initial.length === 0 && (
        <p className="text-sm text-muted">Aún no hay comentarios.</p>
      )}

      <ul className="space-y-2">
        {initial.map((c) => (
          <li
            key={c.id}
            className={`rounded-xl border px-4 py-3 ${
              c.resolved
                ? "border-white/5 bg-surface/50 opacity-60"
                : "border-white/10 bg-surface"
            }`}
          >
            <div className="flex items-center justify-between gap-2">
              <span className="text-xs font-semibold">{c.author_name}</span>
              <span className="text-[10px] text-muted">
                {fmtDate(c.created_at, "d MMM, HH:mm")}
              </span>
            </div>
            <p className="text-sm mt-1 whitespace-pre-wrap">{c.body}</p>
            {canResolve && (
              <button
                onClick={() =>
                  startTransition(async () => {
                    await toggleCommentResolved(c.id, !c.resolved);
                    router.refresh();
                  })
                }
                className="mt-2 text-[11px] text-muted hover:text-cream"
              >
                {c.resolved ? "Reabrir" : "Marcar resuelto"}
              </button>
            )}
          </li>
        ))}
      </ul>

      <form onSubmit={submit} className="flex gap-2">
        <input
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder="Escribe un comentario…"
          className="flex-1 rounded-lg bg-surface border border-white/10 px-4 py-2.5 text-sm placeholder:text-muted/50 focus:outline-none focus:border-brand-blue"
        />
        <button
          type="submit"
          disabled={pending || !body.trim()}
          className="rounded-lg bg-brand-blue text-white px-4 disabled:opacity-50"
          aria-label="Enviar comentario"
        >
          <Send size={16} />
        </button>
      </form>
    </div>
  );
}
