import { useEffect, useRef } from "react";

/** Stagger step between cards (seconds). */
const DELAY_STEP = 0.12;
/** Single-card entrance duration (seconds). */
const DURATION = 0.85;
/** Extra buffer after last card settles. */
const BUFFER_MS = 80;

/**
 * Soft stagger reveal for Board / Executive people lists.
 * Adds `is-visible` when the list enters view, then `is-ready`
 * after all rows finish.
 */
export function usePeopleGridReveal(cardCount: number) {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced || !("IntersectionObserver" in window)) {
      grid.classList.add("is-visible", "is-ready");
      return;
    }

    let readyTimer = 0;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          grid.classList.add("is-visible");
          const totalMs =
            Math.max(0, cardCount - 1) * DELAY_STEP * 1000 + DURATION * 1000 + BUFFER_MS;
          readyTimer = window.setTimeout(() => {
            grid.classList.add("is-ready");
          }, totalMs);
          io.disconnect();
        });
      },
      /* Trigger when the list top enters view — same feel for short (board) and tall (executive) lists */
      { threshold: 0, rootMargin: "0px 0px -10% 0px" },
    );

    io.observe(grid);
    return () => {
      io.disconnect();
      window.clearTimeout(readyTimer);
    };
  }, [cardCount]);

  return gridRef;
}

export const PEOPLE_GRID_STAGGER = { DELAY_STEP, DURATION } as const;
