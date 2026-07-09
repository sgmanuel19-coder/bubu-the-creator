import { passwordsPorNivel, tokenDeNivel } from "@/lib/taller/auth";
import { NIVELES_VENTA } from "@/lib/taller/content";
import { recursoBovedaPorSlug } from "@/lib/taller/boveda-server";

// Página SOLO para Manuel: lista las contraseñas y links mágicos de cada
// nivel, listos para copiar y enviar por WhatsApp tras confirmar un pago.
// Protegida con TALLER_ADMIN_KEY (env de Vercel) vía ?key=... — no está
// enlazada desde ningún lugar del sitio y no se indexa.
export const metadata = { robots: { index: false, follow: false } };
export const dynamic = "force-dynamic";

const BASE = "https://www.resueltoagency.com";

function nombreDe(nivel: string): string {
  const venta = NIVELES_VENTA.find((n) => n.nivel === nivel);
  if (venta) return venta.nombre;
  const recurso = recursoBovedaPorSlug(nivel);
  if (recurso) return `Premium: ${recurso.titulo}`;
  return nivel;
}

export default async function AdminLinksPage({
  searchParams,
}: {
  searchParams: Promise<{ key?: string }>;
}) {
  const { key } = await searchParams;
  const adminKey = process.env.TALLER_ADMIN_KEY;

  if (!adminKey || key !== adminKey) {
    return (
      <main className="mx-auto max-w-2xl px-5 py-16">
        <h1 className="text-xl font-bold">Acceso restringido</h1>
        <p className="mt-3 text-sm" style={{ color: "var(--muted)" }}>
          {adminKey
            ? "Falta la clave de administrador en la URL (?key=...)."
            : "Configura la env TALLER_ADMIN_KEY en Vercel para habilitar esta página."}
        </p>
      </main>
    );
  }

  const configuradas = passwordsPorNivel();
  const niveles = await Promise.all(
    Object.entries(configuradas).map(async ([nivel, pass]) => ({
      nivel,
      nombre: nombreDe(nivel),
      password: pass,
      link: `${BASE}/api/taller/desbloquear?nivel=${encodeURIComponent(nivel)}&t=${await tokenDeNivel(nivel, pass)}`,
    })),
  );

  return (
    <main className="mx-auto max-w-3xl px-5 py-12">
      <h1 className="text-2xl font-bold">Links de desbloqueo</h1>
      <p className="mt-2 text-sm" style={{ color: "var(--muted)" }}>
        Tras confirmar un pago, copia el link del nivel y envíaselo por WhatsApp.
        Quien lo abre queda desbloqueado y aterriza directo en su contenido.
        Si cambias una contraseña en Vercel, sus links viejos dejan de funcionar
        (recarga esta página para ver los nuevos).
      </p>

      {niveles.length === 0 ? (
        <p className="mt-8 text-sm" style={{ color: "var(--muted)" }}>
          No hay niveles configurados. Agrega la env TALLER_PASSWORDS en Vercel.
        </p>
      ) : (
        <div className="mt-8 space-y-4">
          {niveles.map((n) => (
            <div
              key={n.nivel}
              className="rounded-2xl border p-5"
              style={{ borderColor: "rgba(244,240,222,0.15)", background: "var(--surface)" }}
            >
              <p className="font-semibold">
                {n.nombre} <span className="text-xs" style={{ color: "var(--muted)" }}>({n.nivel})</span>
              </p>
              <p className="mt-2 text-xs" style={{ color: "var(--muted)" }}>
                Contraseña: <code className="select-all" style={{ color: "var(--cream)" }}>{n.password}</code>
              </p>
              <p className="mt-2 break-all text-xs" style={{ color: "var(--muted)" }}>
                Link mágico:{" "}
                <code className="select-all" style={{ color: "var(--green)" }}>{n.link}</code>
              </p>
              <p className="mt-3 rounded-lg border p-3 text-xs leading-relaxed select-all"
                style={{ borderColor: "rgba(244,240,222,0.1)", color: "var(--cream)" }}>
                ¡Pago confirmado! 🎉 Aquí está tu acceso a {n.nombre}: {n.link} — ábrelo
                y quedas dentro. Guárdalo por si cambias de dispositivo. Cualquier duda me escribes.
              </p>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
