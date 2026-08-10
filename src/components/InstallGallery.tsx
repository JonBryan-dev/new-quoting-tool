"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { Download, X } from "lucide-react";
import type { InstallPhoto } from "@/lib/install-photos";

// Real-job photo gallery with a click-to-enlarge lightbox and download.
// next/image serves optimised sizes in the grid; the lightbox and the
// download link use the full-size original from /public.

interface InstallGalleryProps {
  photos: InstallPhoto[];
  /** columns at desktop width */
  columns?: 3 | 4;
  className?: string;
}

export default function InstallGallery({ photos, columns = 3, className }: InstallGalleryProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const close = useCallback(() => setOpenIndex(null), []);

  useEffect(() => {
    if (openIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") setOpenIndex((i) => (i === null ? i : (i + 1) % photos.length));
      if (e.key === "ArrowLeft")
        setOpenIndex((i) => (i === null ? i : (i - 1 + photos.length) % photos.length));
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [openIndex, photos.length, close]);

  if (photos.length === 0) return null;

  const open = openIndex === null ? null : photos[openIndex];

  return (
    <>
      <div
        className={`grid grid-cols-2 ${
          columns === 4 ? "lg:grid-cols-4 sm:grid-cols-3" : "sm:grid-cols-3"
        } gap-3 sm:gap-4${className ? ` ${className}` : ""}`}
      >
        {photos.map((photo, index) => (
          <button
            key={photo.src}
            type="button"
            onClick={() => setOpenIndex(index)}
            className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-gray-100 group cursor-zoom-in text-left"
            aria-label={`View larger: ${photo.alt}`}
          >
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
            {photo.caption && (
              <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent px-3 pt-8 pb-2">
                <span className="text-white text-xs font-medium">{photo.caption}</span>
              </span>
            )}
          </button>
        ))}
      </div>

      {open && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={close}
          role="dialog"
          aria-modal="true"
          aria-label={open.alt}
        >
          <div
            className="relative max-w-5xl w-full max-h-[85vh] flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={open.src}
              alt={open.alt}
              className="max-h-[85vh] max-w-full rounded-xl object-contain"
            />
          </div>

          <div className="absolute top-4 right-4 flex items-center gap-2">
            <a
              href={open.src}
              download
              onClick={(e) => e.stopPropagation()}
              className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg text-sm font-medium backdrop-blur"
            >
              <Download className="w-4 h-4" />
              Download
            </a>
            <button
              type="button"
              onClick={close}
              className="p-2 bg-white/10 hover:bg-white/20 text-white rounded-lg backdrop-blur"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {open.caption && (
            <p className="absolute bottom-5 inset-x-0 text-center text-white/90 text-sm px-4">
              {open.caption}
            </p>
          )}
        </div>
      )}
    </>
  );
}
