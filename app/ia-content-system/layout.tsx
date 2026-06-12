import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "RESUELTO / IA CONTENT SYSTEM",
  description: "Centro de control de contenido — Resuelto Agency",
  robots: { index: false, follow: false },
};

export default function ICSLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-bg text-cream font-body">
      {children}
    </div>
  );
}
