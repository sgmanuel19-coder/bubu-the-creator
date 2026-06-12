import LoginForm from "@/components/ics/LoginForm";

export default function LoginPage() {
  return (
    <main className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <p className="font-display font-black tracking-tight text-2xl">
            RESUELTO<span className="text-brand-blue"> /</span>
          </p>
          <p className="font-display text-xs tracking-[0.3em] text-muted mt-1">
            IA CONTENT SYSTEM
          </p>
        </div>
        <LoginForm />
        <p className="text-center text-xs text-muted mt-6">
          Acceso solo para clientes y equipo de Resuelto.
        </p>
      </div>
    </main>
  );
}
