import Link from "next/link";
import Navbar from "@/components/Navbar";

export default function NotFound() {
  return (
    <main className="relative min-h-screen overflow-hidden flex flex-col">
      <div className="absolute inset-0 grid-pattern opacity-15 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-neon-green/5 blur-[120px] pointer-events-none" />

      <Navbar minimal />

      <div className="flex-1 flex flex-col items-center justify-center text-center px-6 relative z-10">
        <p className="font-display font-extrabold text-[clamp(6rem,20vw,12rem)] leading-none text-neon-green/15 select-none">
          404
        </p>
        <h1 className="font-display font-bold text-2xl lg:text-3xl text-cream -mt-4 mb-4">
          Esta página no existe.
        </h1>
        <p className="font-body text-muted text-base mb-10 max-w-sm">
          Puede que haya sido eliminada o que el enlace esté mal escrito.
        </p>
        <Link
          href="/"
          className="btn-glow text-sm py-3 px-8"
        >
          Volver al inicio →
        </Link>
      </div>
    </main>
  );
}
