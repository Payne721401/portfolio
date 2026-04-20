"use client";

import { useState } from "react";
import Link from "next/link";
import { FileText, ImageIcon, ExternalLink, X } from "lucide-react";
import { SiInstagram } from "react-icons/si";

// Strict type for external reference / documentation
export interface Attachment {
  type: "pdf" | "image" | "link";
  label: string;
  url: string;
}

// Wide type used internally so JSON imports (inferred as string) are accepted
type AnyAttachment = { type: string; label: string; url: string };

function linkIcon(label: string) {
  const l = label.toLowerCase();
  if (l.includes("instagram")) return <SiInstagram size={11} />;
  return <ExternalLink size={11} />;
}

function Lightbox({ src, label, onClose }: { src: string; label: string; onClose: () => void }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
      onClick={onClose}
    >
      <button
        onClick={onClose}
        className="absolute top-4 right-4 p-2 text-white hover:text-neutral-300 transition-colors"
        aria-label="Close"
      >
        <X size={24} />
      </button>
      <div
        className="relative max-w-3xl w-full"
        onClick={(e) => e.stopPropagation()}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt={label}
          className="object-contain w-full max-h-[85vh] rounded-lg"
        />
        <p className="text-center text-white/70 text-sm mt-2">{label}</p>
      </div>
    </div>
  );
}

const chipClass =
  "inline-flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-md border border-neutral-200 dark:border-neutral-700 text-neutral-500 dark:text-neutral-400 hover:text-neutral-950 dark:hover:text-neutral-50 hover:border-neutral-400 dark:hover:border-neutral-500 transition-colors";

export function AttachmentChips({ attachments }: { attachments: AnyAttachment[] }) {
  const [lightbox, setLightbox] = useState<AnyAttachment | null>(null);

  const visible = attachments.filter((a) => a.url);
  if (!visible.length) return null;

  return (
    <>
      <div className="flex flex-wrap gap-2 mt-3 pt-3 border-t border-neutral-100 dark:border-neutral-800">
        {visible.map((a, i) => {
          if (a.type === "pdf") {
            return (
              <Link key={i} href={a.url} target="_blank" rel="noopener noreferrer" className={chipClass}>
                <FileText size={11} />
                {a.label}
              </Link>
            );
          }
          if (a.type === "link") {
            return (
              <Link key={i} href={a.url} target="_blank" rel="noopener noreferrer" className={chipClass}>
                {linkIcon(a.label)}
                {a.label}
              </Link>
            );
          }
          // image
          return (
            <button key={i} onClick={() => setLightbox(a)} className={chipClass}>
              <ImageIcon size={11} />
              {a.label}
            </button>
          );
        })}
      </div>

      {lightbox && (
        <Lightbox
          src={lightbox.url}
          label={lightbox.label}
          onClose={() => setLightbox(null)}
        />
      )}
    </>
  );
}
