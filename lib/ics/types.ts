import type {
  ApprovalStage,
  Complexity,
  FunnelLevel,
  PieceStatus,
  PieceType,
  RequestStatus,
  Role,
} from "./constants";

export interface ClientFormat {
  /** Prefijo de código, ej. "OA" */
  prefix: string;
  /** Nombre del formato, ej. "Objetos Animados" */
  name: string;
  /** Duración típica, ej. "30-50s" */
  duration?: string;
}

export interface Client {
  id: string;
  name: string;
  slug: string;
  logo_url: string | null;
  brand_colors: string[] | null;
  social_links: Record<string, string> | null;
  contacts: { name: string; role?: string; phone?: string; email?: string }[] | null;
  brand_kit_links: { label: string; url: string }[] | null;
  formats: ClientFormat[];
  monthly_deliverables: number | null;
  created_at: string;
}

export interface Profile {
  id: string;
  role: Role;
  client_id: string | null;
  full_name: string;
  email: string;
  created_at: string;
}

export interface Grid {
  id: string;
  client_id: string;
  month: string; // YYYY-MM-01
  status: "borrador" | "presentada" | "aprobada";
  presented_at: string | null;
  approved_at: string | null;
  created_at: string;
}

export interface ContentPiece {
  id: string;
  grid_id: string | null;
  client_id: string;
  code: string;
  title: string;
  format: string | null;
  type: PieceType;
  platforms: string[];
  funnel_level: FunnelLevel;
  complexity: Complexity;
  duration_target: string | null;
  assignee: string | null;
  scheduled_date: string | null; // YYYY-MM-DD
  date_confirmed: boolean;
  rescheduled_reason: string | null;
  status: PieceStatus;
  idea_description: string | null;
  script: string | null;
  copy_out: string | null;
  hashtags: string | null;
  drive_link: string | null;
  current_version: number;
  revision_rounds: number;
  created_at: string;
  updated_at: string;
}

export interface StoryboardFrame {
  id: string;
  piece_id: string;
  position: number;
  image_url: string | null;
  what_we_see: string;
  what_we_say: string;
  duration_seconds: number | null;
}

export interface Approval {
  id: string;
  piece_id: string;
  stage: ApprovalStage;
  requested_at: string;
  deadline: string | null; // YYYY-MM-DD
  status: "pending" | "approved" | "changes_requested" | "auto_approved";
  responded_by: string | null;
  responded_at: string | null;
  note: string | null;
  out_of_scope: boolean;
}

export interface Comment {
  id: string;
  piece_id: string;
  user_id: string;
  body: string;
  resolved: boolean;
  created_at: string;
  author_name?: string;
}

export interface RequestItem {
  id: string;
  client_id: string;
  direction: "client_to_agency" | "agency_to_client";
  title: string;
  description: string | null;
  status: RequestStatus;
  due_date: string | null;
  created_by: string;
  created_at: string;
}

export interface PieceMetrics {
  id: string;
  piece_id: string;
  reach: number | null;
  likes: number | null;
  comments_count: number | null;
  shares: number | null;
  saves: number | null;
  watch_time: string | null;
  measured_at: string;
}

export interface AccountMetrics {
  id: string;
  client_id: string;
  month: string;
  followers: number | null;
  total_reach: number | null;
  engagement_rate: number | null;
  notes: string | null;
}

export interface PieceVersion {
  id: string;
  piece_id: string;
  version_number: number;
  snapshot: Record<string, unknown>;
  created_by: string | null;
  created_at: string;
}

/** Pieza + su aprobación pendiente (para la cola "Revisa primero"). */
export interface ReviewQueueItem {
  piece: ContentPiece;
  approval: Approval;
}
