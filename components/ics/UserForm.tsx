"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { createUser } from "@/lib/ics/actions";

export default function UserForm({
  clients,
}: {
  clients: { id: string; name: string }[];
}) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [msg, setMsg] = useState<string | null>(null);
  const [form, setForm] = useState({
    full_name: "",
    email: "",
    password: "",
    role: "client" as "admin" | "team" | "client",
    client_id: "",
  });

  function submit(e: React.FormEvent) {
    e.preventDefault();
    setMsg(null);
    startTransition(async () => {
      const res = await createUser({
        ...form,
        client_id: form.role === "client" ? form.client_id : null,
      });
      setMsg(
        res.ok
          ? `✅ Usuario creado. Entrégale el acceso: ${form.email} / ${form.password}`
          : `❌ ${res.message}`,
      );
      if (res.ok) {
        setForm({ full_name: "", email: "", password: "", role: "client", client_id: "" });
        router.refresh();
      }
    });
  }

  const input =
    "w-full rounded-lg bg-bg border border-white/10 px-3 py-2.5 text-sm placeholder:text-muted/50 focus:outline-none focus:border-brand-blue";

  return (
    <form
      onSubmit={submit}
      className="rounded-xl border border-white/10 bg-surface p-4 space-y-3"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <input
          value={form.full_name}
          onChange={(e) => setForm({ ...form, full_name: e.target.value })}
          required
          placeholder="Nombre completo"
          className={input}
        />
        <input
          type="email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
          placeholder="correo@empresa.com"
          className={input}
        />
        <input
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          required
          minLength={8}
          placeholder="Contraseña (mín. 8)"
          className={input}
        />
        <select
          value={form.role}
          onChange={(e) =>
            setForm({ ...form, role: e.target.value as typeof form.role })
          }
          className={input}
        >
          <option value="client">Cliente</option>
          <option value="team">Equipo</option>
          <option value="admin">Admin</option>
        </select>
        {form.role === "client" && (
          <select
            value={form.client_id}
            onChange={(e) => setForm({ ...form, client_id: e.target.value })}
            required
            className={input}
          >
            <option value="">Marca…</option>
            {clients.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        )}
      </div>
      {msg && <p className="text-sm">{msg}</p>}
      <button
        type="submit"
        disabled={pending}
        className="rounded-lg bg-brand-blue text-white px-5 py-2.5 text-sm font-semibold disabled:opacity-50"
      >
        {pending ? "Creando…" : "Crear usuario"}
      </button>
    </form>
  );
}
