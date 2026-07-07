// ============================================================
// GAMIFICACIÓN — 100% offline, calculada desde el progreso local.
// XP por lección vista, niveles con nombre, y logros por hitos.
// Estilo videojuego pero premium (se pinta en GamificacionHeader).
// El ranking entre alumnos (leaderboard) llega con la base de datos.
// ============================================================

import { TALLER, leccionesConVideoGlobal } from "@/lib/taller/content";

export const XP_POR_LECCION = 10;

// Umbrales de XP acumulada por nivel. El total del sistema (~27
// lecciones × 10) llega holgado al último nivel.
export const NIVELES = [
  { min: 0, nombre: "Aprendiz" },
  { min: 30, nombre: "Creativo Jr." },
  { min: 70, nombre: "Guionista" },
  { min: 120, nombre: "Director" },
  { min: 190, nombre: "Estratega" },
  { min: 270, nombre: "Maestro IA" },
];

export type Logro = { id: string; nombre: string; icono: string; obtenido: boolean };

export type Gamificacion = {
  xp: number;
  nivel: number;
  nombre: string;
  pctNivel: number;
  xpEnNivel: number;
  xpRango: number;
  sigMin: number | null;
  logros: Logro[];
  vistasValidas: number;
};

export function calcularGamificacion(vistas: Record<string, boolean>): Gamificacion {
  const idsValidos = new Set(leccionesConVideoGlobal().map((l) => l.youtubeId));
  const vistasValidas = Object.keys(vistas).filter(
    (id) => vistas[id] && idsValidos.has(id),
  ).length;
  const xp = vistasValidas * XP_POR_LECCION;

  let nivelIdx = 0;
  NIVELES.forEach((n, i) => {
    if (xp >= n.min) nivelIdx = i;
  });
  const min = NIVELES[nivelIdx].min;
  const sigMin = NIVELES[nivelIdx + 1]?.min ?? null;
  const xpEnNivel = xp - min;
  const xpRango = sigMin !== null ? sigMin - min : Math.max(xpEnNivel, 1);
  const pctNivel = sigMin !== null ? Math.min(100, Math.round((xpEnNivel / xpRango) * 100)) : 100;

  const cursos = TALLER.cursos.filter((c) => c.disponible);
  const moduloCompleto = cursos.some((c) =>
    c.modulos.some((m) => {
      const cv = m.lecciones.filter((l) => l.youtubeId);
      return cv.length > 0 && cv.every((l) => vistas[l.youtubeId]);
    }),
  );
  const cursoMedio = cursos.some((c) => {
    const cv = c.modulos.flatMap((m) => m.lecciones).filter((l) => l.youtubeId);
    return cv.length > 0 && cv.filter((l) => vistas[l.youtubeId]).length / cv.length >= 0.5;
  });
  const cursoCompleto = cursos.some((c) => {
    const cv = c.modulos.flatMap((m) => m.lecciones).filter((l) => l.youtubeId);
    return cv.length > 0 && cv.every((l) => vistas[l.youtubeId]);
  });

  const logros: Logro[] = [
    { id: "primer-paso", nombre: "Primer paso", icono: "🎬", obtenido: vistasValidas >= 1 },
    { id: "un-modulo", nombre: "Módulo dominado", icono: "🎯", obtenido: moduloCompleto },
    { id: "medio-camino", nombre: "A mitad de camino", icono: "⚡", obtenido: cursoMedio },
    { id: "maestro", nombre: "Sistema completo", icono: "👑", obtenido: cursoCompleto },
  ];

  return { xp, nivel: nivelIdx + 1, nombre: NIVELES[nivelIdx].nombre, pctNivel, xpEnNivel, xpRango, sigMin, logros, vistasValidas };
}
