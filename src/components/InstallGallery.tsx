import Image from "next/image";
import type { InstallPhoto } from "@/lib/install-photos";

// Real-job photo gallery. next/image handles resizing/format on Vercel,
// so full-size originals in /public are served optimised.

interface InstallGalleryProps {
  photos: InstallPhoto[];
  /** columns at desktop width */
  columns?: 3 | 4;
  className?: string;
}

export default function InstallGallery({ photos, columns = 3, className }: InstallGalleryProps) {
  if (photos.length === 0) return null;
  return (
    <div
      className={`grid grid-cols-2 ${
        columns === 4 ? "lg:grid-cols-4 sm:grid-cols-3" : "sm:grid-cols-3"
      } gap-3 sm:gap-4${className ? ` ${className}` : ""}`}
    >
      {photos.map((photo) => (
        <div
          key={photo.src}
          className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-gray-100 group"
        >
          <Image
            src={photo.src}
            alt={photo.alt}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
          {photo.caption && (
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent px-3 pt-8 pb-2">
              <p className="text-white text-xs font-medium">{photo.caption}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
