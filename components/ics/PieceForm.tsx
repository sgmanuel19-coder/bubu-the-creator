"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { createPiece, updatePiece, PieceInput } from "@/lib/ics/actions";
import {
  COMPLEXITY_LABELS,
  ICS_BASE,
  TYPE_LABELS,
} from "@/lib/ics/constants";
import type { Client, ContentPiece } from "@/lib/ics/types";

const PLATFORMS = ["TikTok", "Instagram", "Facebook", "YouTube", "LinkedIn"];

type ClientLite = Pick<Client, "id" | "name" | "formats">;

export default function PieceForm({
  clients,
  piece,
}: {
  clients: ClientLite[];
  piece?: ContentPiece;
}) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const [form, setForm] = useState<PieceInput>({
    client_id: piece?.client_id ?? clients[0]?.id ?? "",
    code: piece?.code ?? "",
    title: piece?.title ?? "",
    format: piece?.format ?? null,
    type: piece?.type ?? "reel",
    platforms: piece?.platforms ?? ["TikTok"],
    funnel_level: piece?.funnel_level ?? "TOF",
    complexity: piece?.complexity ?? "media",
    duration_target: piece?.duration_target ?? "",
    assignee: piece?.assignee ?? "",
    scheduled_date: piece?.scheduled_date ?? "",
    idea_description: piece?.idea_description ?? "",
    script: piece?.script ?? "",
    copy_out: piece?.copy_out ?? "",
    hashtags: piece?.hashtags ?? "",
    drive_link: piece?.drive_link ?? "",
  });

  const selectedClient = clients.find((c) => c.id === form.client_id);

  function set<K extends keyof PieceInput>(key: K, value: PieceInput[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  function submit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    const payload: PieceInput = {
      ...form,
      scheduled_date: form.scheduled_date || null,
      format: form.format || null,
      duration_target: form.duration_target || null,
      assignee: form.assignee || null,
      drive_link: form.drive_link || null,
    };
    startTransition(async () => {
      let id: string;
      if (piece) {
        const res = await updatePiece(piece.id, payload);
        if (!res.ok) {
          setError(res.message ?? "Error al guardar.");
          return;
        }
        id = piece.id;
      } else {
        const res = await createPiece(payload);
        if (!res.ok) {
          setError(res.message ?? "Error al guardar.");
          return;
        }
        id = res.id;
      }
      router.push(`${ICS_BASE}/admin/pieza/${id}`);
      router.refresh();
    });
  }

  const input =
    "w-full rounded-lg bg-bg border border-white/10 px-3 py-2.5 text-sm placeholder:text-muted/50 focus:outline-none focus:border-brand-blue";
  const label = "block text-xs text-muted mb-1.5";

  return (
    <form onSubmit={submit} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className={label}>Cliente</label>
          <select
            value={form.client_id}
            onChange={(e) => set("client_id", e.target.value)}
            className={input}
            disabled={!!piece}
          >
            {clients.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className={label}>Formato</label>
          <select
            value={form.format ?? ""}
            onChange={(e) => set("format", e.target.value || null)}
            className={input}
          >
            <option value="">— Sin formato —</option>
            {(selectedClient?.formats ?? []).map((f) => (
              <option key={f.prefix} value={f.name}>
                {f.prefix} · {f.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className={label}>Código (ej. OA-01)</label>
          <input
            value={form.code}
            onChange={(e) => set("code", e.target.value.toUpperCase())}
            required
            className={input}
            placeholder="OA-01"
          />
        </div>
        <div>
          <label className={label}>Tema / título</label>
          <input
            value={form.title}
            onChange={(e) => set("title", e.target.value)}
            required
            className={input}
            placeholder="HFC vs Fibra — Red compartida"
          />
        </div>
        <div>
          <label className={label}>Tipo</label>
          <select
            value={form.type}
            onChange={(e) => set("type", e.target.value)}
            className={input}
          >
            {Object.entries(TYPE_LABELS).map(([v, l]) => (
              <option key={v} value={v}>
                {l}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className={label}>Nivel de funnel</label>
          <select
            value={form.funnel_level}
            onChange={(e) => set("funnel_level", e.target.value)}
            className={input}
          >
            <option value="TOF">TOF — Alcance</option>
            <option value="MOF">MOF — Consideración</option>
            <option value="BOF">BOF — Conversión</option>
          </select>
        </div>
        <div>
          <label className={label}>Complejidad (define los deadlines)</label>
          <select
            value={form.complexity}
            onChange={(e) => set("complexity", e.target.value)}
            className={input}
          >
            {Object.entries(COMPLEXITY_LABELS).map(([v, l]) => (
              <option key={v} value={v}>
                {l}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className={label}>Fecha tentativa de publicación</label>
          <input
            type="date"
            value={form.scheduled_date ?? ""}
            onChange={(e) => set("scheduled_date", e.target.value)}
            className={input}
          />
        </div>
        <div>
          <label className={label}>Duración objetivo</label>
          <input
            value={form.duration_target ?? ""}
            onChange={(e) => set("duration_target", e.target.value)}
            className={input}
            placeholder="30-50s"
          />
        </div>
        <div>
          <label className={label}>Responsable</label>
          <input
            value={form.assignee ?? ""}
            onChange={(e) => set("assignee", e.target.value)}
            className={input}
            placeholder="Manuel"
          />
        </div>
      </div>

      <div>
        <label className={label}>Plataformas</label>
        <div className="flex gap-2 flex-wrap">
          {PLATFORMS.map((p) => {
            const on = form.platforms.includes(p);
            return (
              <button
                type="button"
                key={p}
                onClick={() =>
                  set(
                    "platforms",
                    on
                      ? form.platforms.filter((x) => x !== p)
                      : [...form.platforms, p],
                  )
                }
                className={`rounded-full px-3 py-1.5 text-xs border ${on ? "border-brand-blue text-brand-blue" : "border-white/10 text-muted"}`}
              >
                {p}
              </button>
            );
          })}
        </div>
      </div>

      <div>
        <label className={label}>La idea (lo que ve el cliente)</label>
        <textarea
          value={form.idea_description ?? ""}
          onChange={(e) => set("idea_description", e.target.value)}
          rows={3}
          className={input}
          placeholder="De qué trata la pieza y por qué funciona…"
        />
      </div>
      <div>
        <label className={label}>Guion</label>
        <textarea
          value={form.script ?? ""}
          onChange={(e) => set("script", e.target.value)}
          rows={6}
          className={input}
          placeholder="Hook 0-3s…"
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className={label}>Copy out (descripción)</label>
          <textarea
            value={form.copy_out ?? ""}
            onChange={(e) => set("copy_out", e.target.value)}
            rows={4}
            className={input}
          />
        </div>
        <div>
          <label className={label}>Hashtags</label>
          <textarea
            value={form.hashtags ?? ""}
            onChange={(e) => set("hashtags", e.target.value)}
            rows={4}
            className={input}
            placeholder="#wininternet #fibra…"
          />
        </div>
      </div>
      <div>
        <label className={label}>Link de Drive (material final)</label>
        <input
          value={form.drive_link ?? ""}
          onChange={(e) => set("drive_link", e.target.value)}
          className={input}
          placeholder="https://drive.google.com/file/d/…"
        />
      </div>

      {error && <p className="text-sm text-red-400">{error}</p>}

      <button
        type="submit"
        disabled={pending}
        className="rounded-lg bg-brand-blue text-white font-semibold px-6 py-3 text-sm disabled:opacity-50"
      >
        {pending ? "Guardando…" : piece ? "Guardar cambios" : "Crear pieza"}
      </button>
    </form>
  );
}
