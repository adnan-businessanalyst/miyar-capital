import { useLayoutEffect, type RefObject } from "react";

const DESKTOP_MQ = "(min-width: 1101px)";

/**
 * Pin the hero promo card's inline-start edge to the Login button's
 * inline-start edge (desktop only).
 *
 * Absolute offsets are relative to the containing block's padding box
 * (not the content box), so we must not subtract wrap padding here.
 */
export function useHeroCardLoginAlign(
  wrapRef: RefObject<HTMLElement | null>,
  enabled: boolean,
  /** Re-measure when labels/layout change (e.g. language). */
  layoutKey?: string | number,
) {
  useLayoutEffect(() => {
    if (!enabled) return;

    const wrap = wrapRef.current;
    if (!wrap) return;

    const mq = window.matchMedia(DESKTOP_MQ);

    const clear = () => {
      wrap.style.removeProperty("--fp-hero-card-inline-start");
      wrap.classList.remove("is-card-aligned");
      const card = wrap.querySelector<HTMLElement>(".fp-hero-card");
      if (card) {
        card.style.removeProperty("inset-inline-start");
        card.style.removeProperty("inset-inline-end");
      }
    };

    const sync = () => {
      const login = document.querySelector<HTMLElement>("header .tb-login");
      const card = wrap.querySelector<HTMLElement>(".fp-hero-card");
      if (!mq.matches || !login || !card) {
        clear();
        return;
      }

      const wrapRect = wrap.getBoundingClientRect();
      const loginRect = login.getBoundingClientRect();
      const cs = getComputedStyle(wrap);
      const isRtl = getComputedStyle(document.body).direction === "rtl";
      const borderStart = parseFloat(isRtl ? cs.borderRightWidth : cs.borderLeftWidth) || 0;

      // Containing block for position:absolute is the padding box.
      const paddingBoxStart = isRtl
        ? wrapRect.right - borderStart
        : wrapRect.left + borderStart;
      const loginStart = isRtl ? loginRect.right : loginRect.left;
      const insetStart = Math.max(0, isRtl ? paddingBoxStart - loginStart : loginStart - paddingBoxStart);
      const value = `${insetStart}px`;

      wrap.style.setProperty("--fp-hero-card-inline-start", value);
      wrap.classList.add("is-card-aligned");
      card.style.insetInlineStart = value;
      card.style.insetInlineEnd = "auto";
    };

    sync();
    const raf = requestAnimationFrame(sync);

    const ro = new ResizeObserver(sync);
    ro.observe(wrap);
    const header = document.querySelector("header");
    if (header) ro.observe(header);
    const loginEl = document.querySelector("header .tb-login");
    if (loginEl) ro.observe(loginEl);

    window.addEventListener("resize", sync);
    mq.addEventListener("change", sync);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener("resize", sync);
      mq.removeEventListener("change", sync);
      clear();
    };
  }, [wrapRef, enabled, layoutKey]);
}
