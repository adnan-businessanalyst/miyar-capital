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
      wrap.style.removeProperty("--fp-hero-card-width");
      wrap.classList.remove("is-card-aligned");
      const card = wrap.querySelector<HTMLElement>(".fp-hero-card");
      if (card) {
        card.style.removeProperty("inset-inline-start");
        card.style.removeProperty("inset-inline-end");
        card.style.removeProperty("width");
        card.style.removeProperty("max-width");
      }
    };

    const sync = () => {
      const login = document.querySelector<HTMLElement>("header .tb-login");
      const auth = document.querySelector<HTMLElement>("header .tb-auth");
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
      const insetStart = Math.round(
        Math.max(0, isRtl ? paddingBoxStart - loginStart : loginStart - paddingBoxStart),
      );
      const value = `${insetStart}px`;
      const authPx = auth ? auth.getBoundingClientRect().width : 0;
      const cardPx = authPx ? (isRtl ? authPx : authPx * 1.3) : 0;
      const authWidth = cardPx ? `${Math.round(cardPx)}px` : "";

      wrap.style.setProperty("--fp-hero-card-inline-start", value);
      if (authWidth) wrap.style.setProperty("--fp-hero-card-width", authWidth);
      wrap.classList.add("is-card-aligned");
      card.style.insetInlineStart = value;
      card.style.insetInlineEnd = "auto";
      if (authWidth) {
        card.style.width = authWidth;
        card.style.maxWidth = "none";
      }
    };

    sync();
    const raf = requestAnimationFrame(sync);

    const ro = new ResizeObserver(sync);
    ro.observe(wrap);
    const header = document.querySelector("header");
    if (header) ro.observe(header);
    const loginEl = document.querySelector("header .tb-login");
    if (loginEl) ro.observe(loginEl);
    const authEl = document.querySelector("header .tb-auth");
    if (authEl) ro.observe(authEl);

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
