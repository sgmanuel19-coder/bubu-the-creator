import { addDays, differenceInCalendarDays, format, parseISO } from "date-fns";
import {
  Complexity,
  DEADLINE_BUFFER_DAYS,
  PRODUCTION_DAYS,
  REWORK_DAYS,
} from "./constants";

const ISO = "yyyy-MM-dd";

/**
 * Deadline para que el cliente apruebe el CONCEPTO (guion + storyboard):
 * fecha de publicación − días de producción − buffer.
 */
export function conceptDeadline(scheduledDate: string, complexity: Complexity): string {
  const d = parseISO(scheduledDate);
  return format(addDays(d, -(PRODUCTION_DAYS[complexity] + DEADLINE_BUFFER_DAYS)), ISO);
}

/**
 * Deadline para que el cliente apruebe la PIEZA FINAL:
 * fecha de publicación − 1 día (margen para programar).
 */
export function finalDeadline(scheduledDate: string): string {
  return format(addDays(parseISO(scheduledDate), -1), ISO);
}

export type Urgency = "red" | "yellow" | "green";

/** Semáforo de urgencia respecto a hoy. */
export function urgency(deadline: string, today = new Date()): Urgency {
  const days = differenceInCalendarDays(parseISO(deadline), today);
  if (days <= 0) return "red";
  if (days <= 2) return "yellow";
  return "green";
}

export function daysUntil(deadline: string, today = new Date()): number {
  return differenceInCalendarDays(parseISO(deadline), today);
}

/**
 * ¿El rework llega a la fecha de publicación?
 * Si hoy + días de rework + buffer pasa la fecha, hay que reprogramar.
 */
export function reworkFits(
  scheduledDate: string,
  complexity: Complexity,
  today = new Date(),
): boolean {
  const finish = addDays(today, REWORK_DAYS[complexity] + DEADLINE_BUFFER_DAYS);
  return differenceInCalendarDays(parseISO(scheduledDate), finish) >= 0;
}

/** Nueva fecha propuesta cuando el rework ya no llega: hoy + rework + buffer. */
export function proposeNewDate(complexity: Complexity, today = new Date()): string {
  return format(addDays(today, REWORK_DAYS[complexity] + DEADLINE_BUFFER_DAYS), ISO);
}

export function todayISO(): string {
  return format(new Date(), ISO);
}
