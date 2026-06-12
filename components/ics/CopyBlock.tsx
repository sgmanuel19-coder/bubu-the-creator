"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";

export default function CopyBlock({
  copyOut,
  hashtags,
}: {
  copyOut: string | null;
  hashtags: string | null;
}) {
  const [copied, setCopied] = useState(false);
  const full = [copyOut, hashtags].filter(Boolean).join("\n\n");

  async function copy() {
    await navigator.clipboard.writeText(full);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="rounded-xl border border-white/10 bg-surface p-4">
      {copyOut && (
        <p className="text-sm leading-relaxed whitespace-pre-wrap">{copyOut}</p>
      )}
      {hashtags && (
        <p className="text-sm text-brand-blue mt-3 break-words">{hashtags}</p>
      )}
      <button
        onClick={copy}
        className="mt-4 inline-flex items-center gap-2 rounded-lg border border-white/15 px-3 py-1.5 text-xs hover:border-brand-blue/60 transition-colors"
      >
        {copied ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
        {copied ? "Copiado" : "Copiar todo"}
      </button>
    </div>
  );
}
