"use client";

/* eslint-disable @next/next/no-img-element */

import { useRef, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { ArrowDown, ArrowUp, ImagePlus, Trash2 } from "lucide-react";
import { deleteFrame, reorderFrames, saveFrame } from "@/lib/ics/actions";
import { createSupabaseBrowser } from "@/lib/ics/supabase/client";
import type { StoryboardFrame } from "@/lib/ics/types";

/**
 * Constructor de storyboard (solo staff):
 * subir imágenes (multi), escribir LO QUE VEMOS / LO QUE DECIMOS,
 * duración por cuadro, reordenar y eliminar.
 */
export default function StoryboardBuilder({
  pieceId,
  frames,
}: {
  pieceId: string;
  frames: StoryboardFrame[];
}) {
  const router = useRouter();
  const fileRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [, startTransition] = useTransition();

  async function uploadImages(files: FileList) {
    setUploading(true);
    const supabase = createSupabaseBrowser();
    let pos = frames.length;

    for (const file of Array.from(files)) {
      const ext = file.name.split(".").pop() ?? "jpg";
      const path = `${pieceId}/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
      const { error } = await supabase.storage
        .from("storyboards")
        .upload(path, file, { upsert: false });
      if (error) continue;
      const {
        data: { publicUrl },
      } = supabase.storage.from("storyboards").getPublicUrl(path);
      await saveFrame(null, {
        piece_id: pieceId,
        position: pos++,
        image_url: publicUrl,
      });
    }
    setUploading(false);
    router.refresh();
  }

  function updateText(
    frame: StoryboardFrame,
    field: "what_we_see" | "what_we_say",
    value: string,
  ) {
    if (frame[field] === value) return;
    startTransition(async () => {
      await saveFrame(frame.id, {
        piece_id: pieceId,
        position: frame.position,
        [field]: value,
      });
    });
  }

  function updateDuration(frame: StoryboardFrame, value: string) {
    startTransition(async () => {
      await saveFrame(frame.id, {
        piece_id: pieceId,
        position: frame.position,
        duration_seconds: value ? Number(value) : null,
      });
    });
  }

  function move(index: number, delta: number) {
    const ids = frames.map((f) => f.id);
    const j = index + delta;
    if (j < 0 || j >= ids.length) return;
    [ids[index], ids[j]] = [ids[j], ids[index]];
    startTransition(async () => {
      await reorderFrames(pieceId, ids);
      router.refresh();
    });
  }

  function remove(frameId: string) {
    startTransition(async () => {
      await deleteFrame(frameId);
      router.refresh();
    });
  }

  const input =
    "w-full rounded-md bg-bg border border-white/10 px-2.5 py-2 text-xs placeholder:text-muted/50 focus:outline-none focus:border-brand-blue";

  return (
    <div className="space-y-3">
      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        multiple
        hidden
        onChange={(e) => e.target.files?.length && uploadImages(e.target.files)}
      />
      <button
        type="button"
        onClick={() => fileRef.current?.click()}
        disabled={uploading}
        className="inline-flex items-center gap-2 rounded-lg border border-dashed border-white/20 px-4 py-3 text-sm text-muted hover:border-brand-blue/60 hover:text-cream transition-colors disabled:opacity-50 w-full justify-center"
      >
        <ImagePlus size={16} />
        {uploading
          ? "Subiendo imágenes…"
          : "Agregar cuadros (puedes subir varias imágenes a la vez)"}
      </button>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {frames.map((f, i) => (
          <div
            key={f.id}
            className="rounded-xl border border-white/10 bg-surface overflow-hidden"
          >
            <div className="relative aspect-video bg-surface-2">
              {f.image_url ? (
                <img
                  src={f.image_url}
                  alt={`Cuadro ${i + 1}`}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center text-muted text-xs">
                  Sin imagen
                </div>
              )}
              <span className="absolute top-1.5 left-1.5 rounded bg-bg/80 px-1.5 py-0.5 text-[10px] font-mono">
                {i + 1}
              </span>
              <div className="absolute top-1.5 right-1.5 flex gap-1">
                <button
                  type="button"
                  onClick={() => move(i, -1)}
                  className="rounded bg-bg/80 p-1 hover:text-brand-blue"
                  aria-label="Subir"
                >
                  <ArrowUp size={12} />
                </button>
                <button
                  type="button"
                  onClick={() => move(i, 1)}
                  className="rounded bg-bg/80 p-1 hover:text-brand-blue"
                  aria-label="Bajar"
                >
                  <ArrowDown size={12} />
                </button>
                <button
                  type="button"
                  onClick={() => remove(f.id)}
                  className="rounded bg-bg/80 p-1 hover:text-red-400"
                  aria-label="Eliminar"
                >
                  <Trash2 size={12} />
                </button>
              </div>
            </div>
            <div className="p-2.5 space-y-2">
              <div>
                <label className="block text-[10px] font-bold tracking-wider text-brand-blue uppercase mb-1">
                  Lo que vemos
                </label>
                <textarea
                  defaultValue={f.what_we_see}
                  onBlur={(e) => updateText(f, "what_we_see", e.target.value)}
                  rows={2}
                  className={input}
                  placeholder="Encuadre, acción, texto en pantalla…"
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold tracking-wider text-emerald-300 uppercase mb-1">
                  Lo que decimos
                </label>
                <textarea
                  defaultValue={f.what_we_say}
                  onBlur={(e) => updateText(f, "what_we_say", e.target.value)}
                  rows={2}
                  className={input}
                  placeholder="VO / diálogo de este cuadro…"
                />
              </div>
              <div className="flex items-center gap-2">
                <label className="text-[10px] text-muted">Duración (s):</label>
                <input
                  type="number"
                  min={0}
                  defaultValue={f.duration_seconds ?? ""}
                  onBlur={(e) => updateDuration(f, e.target.value)}
                  className="w-16 rounded-md bg-bg border border-white/10 px-2 py-1 text-xs"
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      <p className="text-[11px] text-muted">
        Los cambios de texto se guardan al salir del campo. El cliente ve el
        storyboard como tira de cine en su vista de la pieza.
      </p>
    </div>
  );
}
