import type { Metadata } from "next";
import { TALLER } from "@/lib/taller/content";

export const metadata: Metadata = {
  title: `${TALLER.nombre} — Portal de alumnos | ${TALLER.marca}`,
  description: "Acceso exclusivo para alumnos del taller.",
  robots: { index: false, follow: false },
};

export default function TallerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className="taller-root min-h-screen"
      style={{ background: "var(--bg)", color: "var(--cream)" }}
    >
      {children}
    </div>
  );
}
