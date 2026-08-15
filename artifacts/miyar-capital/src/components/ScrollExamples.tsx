/**
 * ScrollExamples — Horizontally scrollable investment/project cards with a side project-title list and arrows under the list.
 * Active card always sits in the track’s first (start) slot; trailing spacer lets the last card reach that slot.
 *
 * Used by:
 * - views/EquityManagement.tsx
 * - views/RealAssets.tsx
 */

"use client";

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { MetaFacts } from "./MetaFacts";
import { useLanguage } from "../i18n/LanguageContext";

export type ScrollExamplesItem = {
  fundType: string;
  title: string;
  body: string;
  meta: { label: string; value: string }[];
};

export type ScrollExamplesProps = {
  items: ScrollExamplesItem[];
  className?: string;
  /** Cards per arrow click. Default: 1 */
  step?: number;
  ariaLabel?: string;
};

function prefersReducedMotion(): boolean {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

/** Scroll so `card`’s inline-start edge aligns with the track’s start edge. */
function scrollCardToStart(
  track: HTMLElement,
  card: HTMLElement,
  isRtl: boolean,
  behavior: ScrollBehavior,
) {
  const trackRect = track.getBoundingClientRect();
  const cardRect = card.getBoundingClientRect();
  // LTR: align left edges. RTL: align right edges (logical start).
  const delta = isRtl
    ? cardRect.right - trackRect.right
    : cardRect.left - trackRect.left;
  if (Math.abs(delta) < 1) return;
  track.scrollBy({ left: delta, behavior });
}

export function ScrollExamples({
  items,
  className = "",
  step = 1,
  ariaLabel,
}: ScrollExamplesProps) {
  const { lang } = useLanguage();
  const isRtl = lang === "ar";
  const trackRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLElement | null)[]>([]);
  const [active, setActive] = useState(0);
  const [spacerPx, setSpacerPx] = useState(0);
  const scrollingToIndex = useRef<number | null>(null);
  const scrollLockTimer = useRef<number | null>(null);
  const activeRef = useRef(0);

  useEffect(() => {
    activeRef.current = active;
  }, [active]);

  const updateSpacer = useCallback(() => {
    const track = trackRef.current;
    const card = cardRefs.current.find(Boolean) ?? null;
    if (!track || !card) {
      setSpacerPx(0);
      return;
    }
    // Enough empty trail so the last card can sit fully in the first slot.
    setSpacerPx(Math.max(0, Math.round(track.clientWidth - card.offsetWidth)));
  }, []);

  const syncActiveFromScroll = useCallback(() => {
    const track = trackRef.current;
    if (!track || scrollingToIndex.current !== null) return;

    const trackRect = track.getBoundingClientRect();
    const startX = isRtl ? trackRect.right : trackRect.left;

    let best = 0;
    let bestDist = Infinity;
    cardRefs.current.forEach((card, i) => {
      if (!card) return;
      const r = card.getBoundingClientRect();
      const cardStart = isRtl ? r.right : r.left;
      const dist = Math.abs(cardStart - startX);
      if (dist < bestDist) {
        bestDist = dist;
        best = i;
      }
    });
    setActive(best);
  }, [isRtl]);

  const scrollToIndex = useCallback(
    (index: number, behaviorOverride?: ScrollBehavior) => {
      const track = trackRef.current;
      const next = Math.max(0, Math.min(items.length - 1, index));
      const card = cardRefs.current[next];
      if (!track || !card) return;

      setActive(next);
      scrollingToIndex.current = next;
      if (scrollLockTimer.current !== null) {
        window.clearTimeout(scrollLockTimer.current);
      }

      const behavior: ScrollBehavior =
        behaviorOverride ??
        (prefersReducedMotion() ? "auto" : "smooth");

      // Ensure spacer is current before measuring (esp. after resize).
      updateSpacer();
      requestAnimationFrame(() => {
        scrollCardToStart(track, card, isRtl, behavior);
      });

      scrollLockTimer.current = window.setTimeout(
        () => {
          scrollingToIndex.current = null;
          syncActiveFromScroll();
        },
        behavior === "smooth" ? 480 : 60,
      );
    },
    [items.length, isRtl, updateSpacer, syncActiveFromScroll],
  );

  // After spacer size changes, keep the active card pinned to the first slot.
  useLayoutEffect(() => {
    const track = trackRef.current;
    const card = cardRefs.current[activeRef.current];
    if (!track || !card) return;
    scrollCardToStart(track, card, isRtl, "auto");
  }, [spacerPx, isRtl]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const onScroll = () => {
      syncActiveFromScroll();
    };

    const onResize = () => {
      updateSpacer();
      requestAnimationFrame(() => {
        const idx = scrollingToIndex.current ?? activeRef.current;
        const card = cardRefs.current[idx];
        if (track && card) {
          scrollCardToStart(track, card, isRtl, "auto");
        }
        syncActiveFromScroll();
      });
    };

    // Initial layout pass after cards mount.
    updateSpacer();
    requestAnimationFrame(() => {
      updateSpacer();
      const card = cardRefs.current[activeRef.current];
      if (card) scrollCardToStart(track, card, isRtl, "auto");
      syncActiveFromScroll();
    });

    track.addEventListener("scroll", onScroll, { passive: true });
    const ro = new ResizeObserver(onResize);
    ro.observe(track);
    window.addEventListener("resize", onResize);
    window.addEventListener("orientationchange", onResize);

    return () => {
      track.removeEventListener("scroll", onScroll);
      ro.disconnect();
      window.removeEventListener("resize", onResize);
      window.removeEventListener("orientationchange", onResize);
      if (scrollLockTimer.current !== null) {
        window.clearTimeout(scrollLockTimer.current);
      }
    };
  }, [syncActiveFromScroll, updateSpacer, items.length, isRtl, lang]);

  // Reset to first card when the item set or language/dir change.
  const itemsKey = items.map((item) => item.title).join("\0");
  useEffect(() => {
    setActive(0);
    activeRef.current = 0;
    scrollingToIndex.current = null;
    requestAnimationFrame(() => {
      updateSpacer();
      const track = trackRef.current;
      const card = cardRefs.current[0];
      if (track && card) {
        scrollCardToStart(track, card, isRtl, "auto");
      }
    });
  }, [itemsKey, lang, isRtl, updateSpacer]);

  const scrollByStep = (direction: 1 | -1) => {
    const delta = Math.max(1, step) * direction;
    scrollToIndex(active + delta);
  };

  if (items.length === 0) return null;

  const rootClass = ["scroll-examples", className].filter(Boolean).join(" ");
  const label =
    ariaLabel ||
    (isRtl ? "أمثلة من استثماراتنا" : "Examples of our investments");
  const prevLabel = isRtl ? "السابق" : "Previous";
  const nextLabel = isRtl ? "التالي" : "Next";

  return (
    <div className={rootClass} dir={isRtl ? "rtl" : "ltr"}>
      <div className="scroll-examples-stage">
        <aside className="scroll-examples-aside">
          <ul className="scroll-examples-list" aria-label={label}>
            {items.map((item, i) => (
              <li key={`${item.title}-${i}`}>
                <button
                  type="button"
                  className={`scroll-examples-list-item${i === active ? " is-active" : ""}`}
                  onClick={() => scrollToIndex(i)}
                  aria-current={i === active ? "true" : undefined}
                >
                  {item.title}
                </button>
              </li>
            ))}
          </ul>

          <div className="scroll-examples-arrows">
            <button
              type="button"
              className="scroll-examples-arrow"
              onClick={() => scrollByStep(-1)}
              disabled={active <= 0}
              aria-label={prevLabel}
            >
              {isRtl ? "→" : "←"}
            </button>
            <button
              type="button"
              className="scroll-examples-arrow"
              onClick={() => scrollByStep(1)}
              disabled={active >= items.length - 1}
              aria-label={nextLabel}
            >
              {isRtl ? "←" : "→"}
            </button>
          </div>
        </aside>

        <div
          ref={trackRef}
          className="scroll-examples-track"
          role="region"
          aria-label={label}
          tabIndex={0}
        >
          {items.map((item, i) => (
            <article
              className={`svc svc--dark eq-example scroll-examples-card${i === active ? " is-active" : ""}`}
              key={`${item.title}-${i}`}
              ref={(node) => {
                cardRefs.current[i] = node;
              }}
            >
              <div className="eq-example-fundType">{item.fundType}</div>
              <h4>{item.title}</h4>
              <p>{item.body}</p>
              {item.meta.length > 0 ? (
                <MetaFacts
                  items={item.meta}
                  tone="dark"
                  layout="stack"
                  className="eq-example-meta"
                />
              ) : null}
            </article>
          ))}
          <div
            className="scroll-examples-spacer"
            aria-hidden="true"
            style={{ flexBasis: spacerPx, width: spacerPx }}
          />
        </div>
      </div>
    </div>
  );
}
