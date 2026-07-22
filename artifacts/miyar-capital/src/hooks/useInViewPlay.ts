"use client";

import { useEffect, useRef, useState } from "react";

/** Play muted looping videos only while (mostly) in the viewport. */
export function useInViewPlay<T extends HTMLElement = HTMLVideoElement>(
  options?: IntersectionObserverInit,
) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting && entry.intersectionRatio > 0.15),
      { rootMargin: "80px 0px", threshold: [0, 0.15, 0.4], ...options },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [options]);

  return { ref, inView };
}
