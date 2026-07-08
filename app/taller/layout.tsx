import type { Metadata } from "next";
import { TALLER } from "@/lib/taller/content";
import AsistenteBubu from "@/components/taller/AsistenteBubu";

// Metadata base del portal. La landing (/taller) SÍ se indexa y define su
// propia metadata completa en page.tsx; las páginas internas del portal
// declaran noindex individualmente.
export const metadata: Metadata = {
  title: `${TALLER.nombre} | ${TALLER.marca}`,
  description:
    "Aprende a pensar campañas como un director creativo y a producirlas con calidad de cine usando IA.",
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
      <AsistenteBubu />
    </div>
  );
}
