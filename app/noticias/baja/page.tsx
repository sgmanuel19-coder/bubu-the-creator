import type { Metadata } from "next";

import { darDeBaja } from "@/lib/noticias/newsletter";

// Baja de la newsletter en un clic desde el correo.
// Es obligatorio en cualquier envío masivo y no debe pedir nada:
// ni contraseña, ni confirmar el correo, ni motivo.

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Baja de la newsletter | La noticIA",
  // Una página de baja no aporta nada en buscadores y no debe
  // indexarse: solo se llega a ella desde el correo.
  robots: { index: false, follow: false },
};

export default async function BajaPage({
  searchParams,
}: {
  searchParams: Promise<{ t?: string }>;
}) {
  const { t } = await searchParams;
  const listo = t ? await darDeBaja(t) : false;

  return (
    <main className="noticias-root relative z-10 flex min-h-screen items-center justify-center bg-bg px-6">
      <div className="max-w-md text-center">
        <div className="font-display text-2xl font-bold text-cream">
          La notic<span className="text-brand-blue">IA</span>
        </div>
        {listo ? (
          <>
            <h1 className="mt-8 font-display text-2xl font-bold text-cream">
              Listo, te diste de baja
            </h1>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              No vas a recibir más correos. El portal sigue abierto por si
              quieres pasar cuando se te ocurra.
            </p>
          </>
        ) : (
          <>
            <h1 className="mt-8 font-display text-2xl font-bold text-cream">
              No pudimos procesar la baja
            </h1>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              El enlace puede estar incompleto o ya lo usaste antes. Si sigues
              recibiendo correos, responde a cualquiera de ellos y te sacamos a
              mano.
            </p>
          </>
        )}
        <a
          href="/noticias"
          className="mt-8 inline-flex items-center gap-2 font-display text-xs font-semibold uppercase tracking-[0.16em] text-brand-blue transition-opacity hover:opacity-75"
        >
          <span aria-hidden>←</span> Ir al portal
        </a>
      </div>
    </main>
  );
}
