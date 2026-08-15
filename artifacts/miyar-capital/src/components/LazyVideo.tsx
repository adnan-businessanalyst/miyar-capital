/**
 * LazyVideo — Muted looping video that loads and plays only when near the viewport (or eagerly when requested).
 *
 * Used by:
 * - views/FrontPage.tsx
 * - views/InvestmentAdvisory.tsx
 */

"use client";

import { useEffect, useRef } from "react";

type LazyVideoProps = {
  src: string;
  className?: string;
  poster?: string;
  /** Eager for above-the-fold hero; default lazy via IntersectionObserver. */
  eager?: boolean;
  "aria-label"?: string;
};

/**
 * Muted loop video: preload none until near viewport, then play.
 * Avoids downloading heavy loops that never scroll into view.
 */
export function LazyVideo({
  src,
  className,
  poster,
  eager = false,
  "aria-label": ariaLabel,
}: LazyVideoProps) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const play = () => {
      el.play().catch(() => {
        /* autoplay may be blocked; muted + playsInline usually ok */
      });
    };

    if (eager) {
      if (el.dataset.src && !el.src) {
        el.src = el.dataset.src;
        el.load();
      }
      play();
      return;
    }

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && entry.intersectionRatio > 0.12) {
          if (el.dataset.src && !el.getAttribute("src")) {
            el.src = el.dataset.src;
            el.load();
          }
          play();
        } else if (!el.paused) {
          el.pause();
        }
      },
      { rootMargin: "120px 0px", threshold: [0, 0.12, 0.35] },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [src, eager]);

  return (
    <video
      ref={ref}
      className={className}
      muted
      loop
      playsInline
      preload={eager ? "metadata" : "none"}
      poster={poster || undefined}
      aria-label={ariaLabel}
      autoPlay={eager || undefined}
      {...(eager ? { src } : { "data-src": src })}
    />
  );
}
