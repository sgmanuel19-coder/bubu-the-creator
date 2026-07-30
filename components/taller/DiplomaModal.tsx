"use client";

import { useEffect, useState } from "react";
import { trackTaller } from "@/lib/taller/analytics";

// Diploma de participación: se genera 100% en el navegador con jsPDF
// (sin backend, sin base de datos — coherente con el resto del portal,
// que ya guarda todo en localStorage). El nombre del alumno se recuerda
// para no tener que retiparlo si saca el diploma de otro curso.
const CLAVE_NOMBRE = "taller_nombre_alumno";

function hoyEnEspanol(): string {
  return new Date().toLocaleDateString("es-PE", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "America/Lima",
  });
}

async function generarPdf(nombre: string, curso: string) {
  const { jsPDF } = await import("jspdf");
  const doc = new jsPDF({ orientation: "landscape", unit: "mm", format: "a4" });
  const W = doc.internal.pageSize.getWidth();
  const H = doc.internal.pageSize.getHeight();

  const CREMA: [number, number, number] = [244, 240, 222];
  const CARBON: [number, number, number] = [61, 61, 61];
  const AZUL: [number, number, number] = [26, 128, 255];
  const MUTED: [number, number, number] = [140, 132, 108];

  // Fondo crema + borde
  doc.setFillColor(...CREMA);
  doc.rect(0, 0, W, H, "F");
  doc.setDrawColor(...AZUL);
  doc.setLineWidth(1.2);
  doc.rect(8, 8, W - 16, H - 16);
  doc.setLineWidth(0.3);
  doc.rect(11, 11, W - 22, H - 22);

  // Logo (si falla la carga, sigue sin el logo — nunca rompe la descarga)
  try {
    const img = new Image();
    img.crossOrigin = "anonymous";
    await new Promise<void>((resolve) => {
      img.onload = () => resolve();
      img.onerror = () => resolve();
      img.src = "/images/logo-mark.png";
    });
    if (img.width > 0) {
      const logoAltura = 14;
      const logoAncho = (img.width / img.height) * logoAltura;
      doc.addImage(img, "PNG", W / 2 - logoAncho / 2, 18, logoAncho, logoAltura);
    }
  } catch {
    // sin logo, el diploma igual se genera
  }

  doc.setTextColor(...MUTED);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(11);
  doc.text("RESUELTO ACADEMY", W / 2, 42, { align: "center" });

  doc.setTextColor(...CARBON);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(28);
  doc.text("DIPLOMA DE PARTICIPACIÓN", W / 2, 58, { align: "center" });

  doc.setFont("helvetica", "normal");
  doc.setFontSize(13);
  doc.text("Se otorga el presente diploma a", W / 2, 78, { align: "center" });

  doc.setTextColor(...AZUL);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(30);
  doc.text(nombre, W / 2, 96, { align: "center" });
  // línea bajo el nombre
  const anchoNombre = doc.getTextWidth(nombre);
  doc.setDrawColor(...AZUL);
  doc.setLineWidth(0.5);
  doc.line(W / 2 - anchoNombre / 2 - 6, 101, W / 2 + anchoNombre / 2 + 6, 101);

  doc.setTextColor(...CARBON);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(13);
  doc.text("por completar exitosamente", W / 2, 114, { align: "center" });
  doc.setFont("helvetica", "bold");
  doc.setFontSize(17);
  const cursoLineas = doc.splitTextToSize(curso, W - 80);
  doc.text(cursoLineas, W / 2, 124, { align: "center" });

  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.setTextColor(...MUTED);
  doc.text(hoyEnEspanol(), W / 2, H - 22, { align: "center" });

  // Firma
  doc.setDrawColor(...CARBON);
  doc.setLineWidth(0.3);
  doc.line(W / 2 - 35, H - 34, W / 2 + 35, H - 34);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.setTextColor(...CARBON);
  doc.text("Manuel Severo", W / 2, H - 28, { align: "center" });
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(...MUTED);
  doc.text("Fundador, RESUELTO Agency", W / 2, H - 23.5, { align: "center" });

  doc.save(`Diploma - ${curso} - ${nombre}.pdf`);
}

export default function DiplomaModal({
  cursoTitulo,
  onClose,
}: {
  cursoTitulo: string;
  onClose: () => void;
}) {
  const [nombre, setNombre] = useState("");
  const [generando, setGenerando] = useState(false);

  useEffect(() => {
    setNombre(localStorage.getItem(CLAVE_NOMBRE) ?? "");
    trackTaller("taller_diploma_abrir", { curso: cursoTitulo });
  }, [cursoTitulo]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  async function descargar() {
    const limpio = nombre.trim();
    if (!limpio || generando) return;
    setGenerando(true);
    localStorage.setItem(CLAVE_NOMBRE, limpio);
    try {
      await generarPdf(limpio, cursoTitulo);
      trackTaller("taller_diploma_descarga", { curso: cursoTitulo });
    } finally {
      setGenerando(false);
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/80 p-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl rounded-2xl border p-6 sm:p-8"
        style={{ borderColor: "rgba(244,240,222,0.15)", background: "var(--surface)" }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-[11px] uppercase tracking-[0.25em]" style={{ color: "var(--green)" }}>
              🎓 ¡Completaste el curso!
            </p>
            <h2 className="mt-1 text-xl font-bold">Tu diploma de participación</h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar"
            className="shrink-0 text-2xl transition-opacity hover:opacity-70"
            style={{ color: "var(--muted)" }}
          >
            ✕
          </button>
        </div>

        {/* Vista previa: mismo layout que el PDF, en HTML */}
        <div
          className="relative mt-5 overflow-hidden rounded-xl border px-6 py-8 text-center sm:px-10 sm:py-10"
          style={{ borderColor: "rgba(26,128,255,0.5)", background: "#F4F0DE" }}
        >
          <div
            className="pointer-events-none absolute inset-2 rounded-lg border sm:inset-3"
            style={{ borderColor: "rgba(26,128,255,0.35)" }}
          />
          <p className="relative text-[10px] font-semibold uppercase tracking-[0.3em]" style={{ color: "#8C846C" }}>
            Resuelto Academy
          </p>
          <p className="relative mt-3 text-lg font-bold tracking-wide sm:text-2xl" style={{ color: "#3D3D3D" }}>
            DIPLOMA DE PARTICIPACIÓN
          </p>
          <p className="relative mt-4 text-xs sm:text-sm" style={{ color: "#3D3D3D" }}>
            Se otorga el presente diploma a
          </p>
          <p
            className="relative mt-1 min-h-[2em] border-b-2 pb-1 text-xl font-bold sm:text-3xl"
            style={{ color: "#1A80FF", borderColor: "#1A80FF" }}
          >
            {nombre.trim() || "Tu nombre aquí"}
          </p>
          <p className="relative mt-4 text-xs sm:text-sm" style={{ color: "#3D3D3D" }}>
            por completar exitosamente
          </p>
          <p className="relative mt-1 text-sm font-bold sm:text-base" style={{ color: "#3D3D3D" }}>
            {cursoTitulo}
          </p>
        </div>

        <label className="mt-5 block text-sm font-semibold" htmlFor="diploma-nombre">
          Tu nombre completo (para el diploma)
        </label>
        <input
          id="diploma-nombre"
          type="text"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          placeholder="Ej. María Fernández"
          className="mt-2 w-full rounded-xl px-4 py-3 text-sm outline-none focus:ring-2"
          style={{
            background: "rgba(244,240,222,0.06)",
            border: "1px solid rgba(244,240,222,0.18)",
            color: "var(--cream)",
          }}
        />

        <button
          type="button"
          onClick={descargar}
          disabled={!nombre.trim() || generando}
          className="mt-4 w-full rounded-xl py-3.5 text-sm font-bold transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
          style={{ background: "var(--green)", color: "#fff" }}
        >
          {generando ? "Generando…" : "📄 Descargar mi diploma (PDF)"}
        </button>
      </div>
    </div>
  );
}
