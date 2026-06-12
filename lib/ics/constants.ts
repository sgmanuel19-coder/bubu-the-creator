// RESUELTO / IA CONTENT SYSTEM — constantes de dominio

export const ICS_BASE = "/ia-content-system";

export type Role = "admin" | "team" | "client";

export type PieceStatus =
  | "planificado"
  | "en_guion"
  | "concepto_en_revision"
  | "concepto_aprobado"
  | "en_produccion"
  | "pieza_en_revision"
  | "correcciones"
  | "aprobado"
  | "publicado";

export const PIECE_STATUSES: PieceStatus[] = [
  "planificado",
  "en_guion",
  "concepto_en_revision",
  "concepto_aprobado",
  "en_produccion",
  "pieza_en_revision",
  "correcciones",
  "aprobado",
  "publicado",
];

export const STATUS_LABELS: Record<PieceStatus, string> = {
  planificado: "Planificado",
  en_guion: "En guion",
  concepto_en_revision: "Boceto en revisión",
  concepto_aprobado: "Boceto aprobado",
  en_produccion: "En producción",
  pieza_en_revision: "Pieza en revisión",
  correcciones: "Correcciones",
  aprobado: "Aprobado",
  publicado: "Publicado",
};

export const STATUS_COLORS: Record<PieceStatus, string> = {
  planificado: "bg-white/10 text-muted",
  en_guion: "bg-white/10 text-cream",
  concepto_en_revision: "bg-amber-500/15 text-amber-300",
  concepto_aprobado: "bg-brand-blue/15 text-violet-glow",
  en_produccion: "bg-violet/20 text-violet-light",
  pieza_en_revision: "bg-amber-500/15 text-amber-300",
  correcciones: "bg-orange-500/15 text-orange-300",
  aprobado: "bg-emerald-500/15 text-emerald-300",
  publicado: "bg-emerald-500/25 text-emerald-200",
};

/** Estados en los que el cliente tiene la pelota (debe revisar). */
export const CLIENT_REVIEW_STATUSES: PieceStatus[] = [
  "concepto_en_revision",
  "pieza_en_revision",
];

export type FunnelLevel = "TOF" | "MOF" | "BOF";

export const FUNNEL_LABELS: Record<FunnelLevel, string> = {
  TOF: "TOF · Alcance",
  MOF: "MOF · Consideración",
  BOF: "BOF · Conversión",
};

export const FUNNEL_COLORS: Record<FunnelLevel, string> = {
  TOF: "bg-sky-500/15 text-sky-300 border-sky-500/30",
  MOF: "bg-amber-500/15 text-amber-300 border-amber-500/30",
  BOF: "bg-emerald-500/15 text-emerald-300 border-emerald-500/30",
};

export const FUNNEL_DOT: Record<FunnelLevel, string> = {
  TOF: "bg-sky-400",
  MOF: "bg-amber-400",
  BOF: "bg-emerald-400",
};

export type PieceType = "reel" | "carrusel" | "imagen" | "story";

export const TYPE_LABELS: Record<PieceType, string> = {
  reel: "Reel / Video",
  carrusel: "Carrusel",
  imagen: "Imagen",
  story: "Story",
};

export type Complexity = "baja" | "media" | "alta";

export const COMPLEXITY_LABELS: Record<Complexity, string> = {
  baja: "Baja (1-2 días)",
  media: "Media (2-3 días)",
  alta: "Alta (3-5 días)",
};

/** Días de producción estimados por complejidad (peor caso del rango). */
export const PRODUCTION_DAYS: Record<Complexity, number> = {
  baja: 2,
  media: 3,
  alta: 5,
};

/** Días estimados de rework cuando piden cambios. */
export const REWORK_DAYS: Record<Complexity, number> = {
  baja: 1,
  media: 2,
  alta: 3,
};

/** Días de colchón entre fin de producción y publicación. */
export const DEADLINE_BUFFER_DAYS = 2;

/** Rondas de cambios incluidas; desde la siguiente se marca "ronda adicional". */
export const INCLUDED_REVISION_ROUNDS = 2;

export type ApprovalStage = "concepto" | "final" | "grilla";

export const STAGE_LABELS: Record<ApprovalStage, string> = {
  concepto: "Boceto (guion + storyboard)",
  final: "Pieza final",
  grilla: "Grilla del mes",
};

export type RequestStatus = "abierto" | "en_proceso" | "hecho";

export const REQUEST_STATUS_LABELS: Record<RequestStatus, string> = {
  abierto: "Abierto",
  en_proceso: "En proceso",
  hecho: "Hecho",
};
