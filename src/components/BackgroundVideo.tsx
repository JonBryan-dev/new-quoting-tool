"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

// Ambient background video that only downloads when it is worth it.
//
// The two site videos are several megabytes each. On a phone, on mobile
// data, in a Staffordshire village, that is a slow first paint for pure
// decoration. So the poster image renders immediately for everyone and
// the video only loads on a wide screen, over a decent connection, for
// someone who has not asked their browser to save data or reduce motion.

interface BackgroundVideoProps {
  src: string;
  poster: string;
  className?: string;
}

export default function BackgroundVideo({ src, poster, className }: BackgroundVideoProps) {
  const [play, setPlay] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (window.innerWidth < 1024) return;

    // Chromium-only, absent elsewhere, so treat missing as "fine"
    const conn = (navigator as unknown as {
      connection?: { saveData?: boolean; effectiveType?: string };
    }).connection;
    if (conn?.saveData) return;
    if (conn?.effectiveType && !conn.effectiveType.includes("4g")) return;

    setPlay(true);
  }, []);

  return (
    <div className={className}>
      {/* next/image so the still is served resized and in a modern
          format rather than as the full-size original */}
      <Image
        src={poster}
        alt=""
        aria-hidden="true"
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      {play && (
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="none"
          aria-hidden="true"
          onCanPlay={() => setLoaded(true)}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
            loaded ? "opacity-100" : "opacity-0"
          }`}
          src={src}
        />
      )}
    </div>
  );
}
