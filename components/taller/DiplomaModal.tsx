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

// Carga una imagen y la reduce a un canvas chico antes de dársela a
// addImage(). jsPDF embebe la imagen a su resolución NATIVA sin
// reescalarla nunca, sin importar el tamaño en mm que le pidas — con el
// logo real (3240×3240px) eso generaba un PDF de 21 MB por un sello de
// 11mm. 300px de lado alcanza y sobra para verse nítido impreso.
const LADO_MAX = 300;

function cargarImagenChica(src: string): Promise<{ url: string; w: number; h: number } | null> {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      if (img.width <= 0 || img.height <= 0) return resolve(null);
      const escala = Math.min(1, LADO_MAX / Math.max(img.width, img.height));
      const w = Math.round(img.width * escala);
      const h = Math.round(img.height * escala);
      const canvas = document.createElement("canvas");
      canvas.width = w;
      canvas.height = h;
      const ctx = canvas.getContext("2d");
      if (!ctx) return resolve(null);
      ctx.drawImage(img, 0, 0, w, h);
      resolve({ url: canvas.toDataURL("image/png"), w, h });
    };
    img.onerror = () => resolve(null);
    img.src = src;
  });
}

async function generarPdf(nombre: string, curso: string) {
  const { jsPDF } = await import("jspdf");
  const doc = new jsPDF({ orientation: "landscape", unit: "mm", format: "a4" });
  const W = doc.internal.pageSize.getWidth();
  const H = doc.internal.pageSize.getHeight();
  const CX = W / 2;

  const CREMA: [number, number, number] = [244, 240, 222];
  const CARBON: [number, number, number] = [61, 61, 61];
  const AZUL: [number, number, number] = [26, 128, 255];
  const MUTED: [number, number, number] = [140, 132, 108];

  // Fondo + borde doble
  doc.setFillColor(...CREMA);
  doc.rect(0, 0, W, H, "F");
  doc.setDrawColor(...AZUL);
  doc.setLineWidth(1.2);
  doc.rect(8, 8, W - 16, H - 16);
  doc.setLineWidth(0.3);
  doc.rect(11, 11, W - 22, H - 22);

  // ── Encabezado ──
  doc.setTextColor(...MUTED);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(11);
  doc.text("RESUELTO ACADEMY", CX, 26, { align: "center" });
  doc.setDrawColor(...AZUL);
  doc.setLineWidth(0.4);
  doc.line(CX - 12, 30, CX + 12, 30);

  doc.setTextColor(...CARBON);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(30);
  doc.text("DIPLOMA DE PARTICIPACIÓN", CX, 46, { align: "center" });

  // Filete ornamental (línea—rombo—línea) para no dejar el título "solo"
  doc.setDrawColor(...AZUL);
  doc.setLineWidth(0.3);
  doc.line(CX - 45, 52, CX - 4, 52);
  doc.line(CX + 4, 52, CX + 45, 52);
  doc.setFillColor(...AZUL);
  doc.triangle(CX - 2, 52, CX + 2, 52, CX, 49, "F");
  doc.triangle(CX - 2, 52, CX + 2, 52, CX, 55, "F");

  // ── Cuerpo ──
  doc.setTextColor(...CARBON);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(13);
  doc.text("Se otorga el presente diploma a", CX, 66, { align: "center" });

  doc.setTextColor(...AZUL);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(30);
  doc.text(nombre, CX, 84, { align: "center" });
  const anchoNombre = doc.getTextWidth(nombre);
  doc.setDrawColor(...AZUL);
  doc.setLineWidth(0.5);
  doc.line(CX - anchoNombre / 2 - 6, 89, CX + anchoNombre / 2 + 6, 89);

  doc.setTextColor(...CARBON);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(13);
  doc.text("por haber completado exitosamente", CX, 102, { align: "center" });
  doc.setFont("helvetica", "bold");
  doc.setFontSize(18);
  const cursoLineas: string[] = doc.splitTextToSize(curso, W - 90);
  doc.text(cursoLineas, CX, 113, { align: "center" });
  const finCurso = 113 + (cursoLineas.length - 1) * 7.5;

  // Bajada descriptiva — llena el aire entre el título y el pie, y suma
  // contexto de marca sin repetir el nombre del curso.
  doc.setFont("helvetica", "italic");
  doc.setFontSize(11);
  doc.setTextColor(...MUTED);
  const bajada =
    "Un programa de RESUELTO ACADEMY sobre creatividad publicitaria dirigida con Inteligencia Artificial.";
  doc.text(bajada, CX, finCurso + 12, { align: "center" });

  // ── Sello (círculo con el logo) — esquina inferior derecha ──
  const selloX = W - 42;
  const selloY = H - 42;
  const selloR = 17;
  doc.setDrawColor(...AZUL);
  doc.setLineWidth(0.9);
  doc.circle(selloX, selloY, selloR, "S");
  doc.setLineWidth(0.3);
  doc.circle(selloX, selloY, selloR - 2.5, "S");

  const logo = await cargarImagenChica("/images/logo-mark.png");
  if (logo) {
    const altura = 11;
    const ancho = (logo.w / logo.h) * altura;
    doc.addImage(logo.url, "PNG", selloX - ancho / 2, selloY - altura / 2 - 3, ancho, altura);
  }
  doc.setFont("helvetica", "bold");
  doc.setFontSize(7);
  doc.setTextColor(...AZUL);
  doc.text("ACADEMY", selloX, selloY + (logo ? 9 : 2), { align: "center" });

  // ── Pie: fecha (izq.) y firma (centro) en columnas — nunca se cruzan
  // con el sello ni entre sí, a diferencia de la versión anterior que
  // apilaba todo centrado y terminaba con la fecha encima de la firma. ──
  const filaLinea = H - 34;
  const filaTitulo = H - 28;
  const filaSub = H - 23;

  const colFecha = 78;
  doc.setDrawColor(...CARBON);
  doc.setLineWidth(0.3);
  doc.line(colFecha - 26, filaLinea, colFecha + 26, filaLinea);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10.5);
  doc.setTextColor(...CARBON);
  doc.text(hoyEnEspanol(), colFecha, filaTitulo, { align: "center" });
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8.5);
  doc.setTextColor(...MUTED);
  doc.text("Fecha de emisión", colFecha, filaSub, { align: "center" });

  const colFirma = 178;
  doc.setDrawColor(...CARBON);
  doc.line(colFirma - 30, filaLinea, colFirma + 30, filaLinea);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.setTextColor(...CARBON);
  doc.text("Manuel Severo", colFirma, filaTitulo, { align: "center" });
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8.5);
  doc.setTextColor(...MUTED);
  doc.text("Fundador, RESUELTO Agency", colFirma, filaSub, { align: "center" });

  doc.setFontSize(8);
  doc.setTextColor(...MUTED);
  doc.text("resueltoagency.com", CX, H - 13, { align: "center" });

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
