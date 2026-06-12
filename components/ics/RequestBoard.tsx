"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Plus } from "lucide-react";
import { createRequest, setRequestStatus } from "@/lib/ics/actions";
import {
  REQUEST_STATUS_LABELS,
  RequestStatus,
} from "@/lib/ics/constants";
import { fmtDate } from "@/lib/ics/utils";
import type { RequestItem } from "@/lib/ics/types";

type Req = RequestItem & { clients: { name: string } | null };

const NEXT_STATUS: Record<RequestStatus, RequestStatus> = {
  abierto: "en_proceso",
  en_proceso: "hecho",
  hecho: "abierto",
};

export default function RequestBoard({
  requests,
  staff,
  ownClientId,
  clients,
}: {
  requests: Req[];
  staff: boolean;
  ownClientId: string | null;
  clients: { id: string; name: string }[];
}) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [clientId, setClientId] = useState(ownClientId ?? "");
  const [pending, startTransition] = useTransition();

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const cid = staff ? clientId : ownClientId;
    if (!title.trim() || !cid) return;
    startTransition(async () => {
      await createRequest({
        client_id: cid,
        title: title.trim(),
        description: description.trim() || undefined,
        due_date: dueDate || null,
      });
      setTitle("");
      setDescription("");
      setDueDate("");
      setOpen(false);
      router.refresh();
    });
  }

  return (
    <div className="space-y-4">
      <button
        onClick={() => setOpen(!open)}
        className="inline-flex items-center gap-2 rounded-lg bg-brand-blue text-white px-4 py-2.5 text-sm font-semibold"
      >
        <Plus size={16} /> Nuevo pedido
      </button>

      {open && (
        <form
          onSubmit={submit}
          className="rounded-xl border border-white/10 bg-surface p-4 space-y-3"
        >
          {staff && (
            <select
              value={clientId}
              onChange={(e) => setClientId(e.target.value)}
              required
              className="w-full rounded-lg bg-bg border border-white/10 px-3 py-2.5 text-sm"
            >
              <option value="">Cliente…</option>
              {clients.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          )}
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            placeholder="¿Qué se necesita?"
            className="w-full rounded-lg bg-bg border border-white/10 px-3 py-2.5 text-sm placeholder:text-muted/50"
          />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={2}
            placeholder="Detalle (opcional)"
            className="w-full rounded-lg bg-bg border border-white/10 px-3 py-2.5 text-sm placeholder:text-muted/50"
          />
          <div className="flex items-center gap-3">
            <label className="text-xs text-muted">Fecha límite:</label>
            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="rounded-lg bg-bg border border-white/10 px-3 py-2 text-sm"
            />
            <button
              type="submit"
              disabled={pending}
              className="ml-auto rounded-lg bg-brand-blue text-white px-4 py-2 text-sm font-semibold disabled:opacity-50"
            >
              {pending ? "Creando…" : "Crear"}
            </button>
          </div>
        </form>
      )}

      {requests.length === 0 ? (
        <p className="text-sm text-muted py-4">No hay pedidos todavía.</p>
      ) : (
        <ul className="space-y-2">
          {requests.map((r) => (
            <li
              key={r.id}
              className={`rounded-xl border px-4 py-3 ${
                r.status === "hecho"
                  ? "border-white/5 bg-surface/50 opacity-60"
                  : "border-white/10 bg-surface"
              }`}
            >
              <div className="flex items-center justify-between gap-3 flex-wrap">
                <div className="min-w-0">
                  <p className="text-sm font-medium truncate">{r.title}</p>
                  <p className="text-[11px] text-muted mt-0.5">
                    {r.direction === "agency_to_client"
                      ? "Resuelto te lo pide"
                      : "Pedido a Resuelto"}
                    {staff && r.clients?.name ? ` · ${r.clients.name}` : ""}
                    {r.due_date ? ` · para ${fmtDate(r.due_date)}` : ""}
                  </p>
                </div>
                <button
                  onClick={() =>
                    startTransition(async () => {
                      await setRequestStatus(
                        r.id,
                        NEXT_STATUS[r.status as RequestStatus],
                      );
                      router.refresh();
                    })
                  }
                  className={`shrink-0 rounded-full px-3 py-1 text-[11px] font-semibold border ${
                    r.status === "abierto"
                      ? "border-amber-500/40 text-amber-300"
                      : r.status === "en_proceso"
                        ? "border-sky-500/40 text-sky-300"
                        : "border-emerald-500/40 text-emerald-300"
                  }`}
                  title="Click para avanzar el estado"
                >
                  {REQUEST_STATUS_LABELS[r.status as RequestStatus]}
                </button>
              </div>
              {r.description && (
                <p className="text-xs text-muted mt-2 whitespace-pre-wrap">
                  {r.description}
                </p>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
