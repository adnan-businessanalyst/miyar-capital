/**
 * WhatsAppWidget — Floating WhatsApp chat button that appears after scrolling past the hero/threshold.
 *
 * Used by:
 * - components/SiteChrome.tsx
 */

"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { useLanguage } from "../i18n/LanguageContext";
import { WHATSAPP } from "../site/defaults";

/** Official WhatsApp glyph (viewBox 0 0 24 24). */
const WHATSAPP_GLYPH =
  "M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.885-9.885 9.885M20.52 3.449C18.24 1.245 15.24 0 12.045 0 5.463 0 .104 5.359.101 11.892c0 2.096.549 4.14 1.595 5.945L0 24l6.335-1.652a11.882 11.882 0 005.71 1.454h.006c6.585 0 11.946-5.359 11.949-11.893a11.821 11.821 0 00-3.495-8.46";

/** Absolute document offset of the bottom edge of the first hero/banner on the page. */
function heroBottom(): number {
  const el = document.querySelector<HTMLElement>(
    ".hero, .page-hero, .fp-hero, .pb-hero",
  );
  if (!el) return 0;
  const rect = el.getBoundingClientRect();
  return rect.top + window.scrollY + rect.height;
}

export function WhatsAppWidget() {
  const cfg = WHATSAPP;
  const { lang } = useLanguage();
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);
  const [bouncing, setBouncing] = useState(false);
  const bounceTimer = useRef<number | null>(null);
  const bounceReset = useRef<number | null>(null);
  const wasVisible = useRef(false);

  const phoneDigits = cfg.phone.replace(/\D/g, "");
  const active = cfg.enabled && phoneDigits.length > 0;

  // Reveal after scrolling past the greater of the % threshold or the hero.
  useEffect(() => {
    if (!active) {
      setVisible(false);
      return;
    }
    const compute = () => {
      const scrollable =
        document.documentElement.scrollHeight - window.innerHeight;
      const pctTrigger =
        (cfg.scrollThresholdPct / 100) * Math.max(scrollable, 0);
      const trigger = Math.max(pctTrigger, heroBottom());
      const footer = document.querySelector<HTMLElement>(".site-footer");
      const footerInView = footer
        ? footer.getBoundingClientRect().top < window.innerHeight
        : false;
      setVisible(
        trigger > 0 && window.scrollY >= trigger && !footerInView,
      );
    };
    compute();
    window.addEventListener("scroll", compute, { passive: true });
    window.addEventListener("resize", compute);
    return () => {
      window.removeEventListener("scroll", compute);
      window.removeEventListener("resize", compute);
    };
  }, [active, cfg.scrollThresholdPct, pathname]);

  // Bounce once as it slides in (fires only on the hidden→visible transition).
  useEffect(() => {
    if (!visible) {
      wasVisible.current = false;
      return;
    }
    if (wasVisible.current) return;
    wasVisible.current = true;
    const start = window.setTimeout(() => setBouncing(true), 450);
    const end = window.setTimeout(() => setBouncing(false), 1450);
    return () => {
      window.clearTimeout(start);
      window.clearTimeout(end);
    };
  }, [visible]);

  // Bounce at a random interval within the configured range while visible.
  useEffect(() => {
    if (!active || !visible) return;
    const min = Math.max(1, cfg.bounceMinSec);
    const max = Math.max(min, cfg.bounceMaxSec);
    let cancelled = false;
    const schedule = () => {
      const ms = (min + Math.random() * (max - min)) * 1000;
      bounceTimer.current = window.setTimeout(() => {
        if (cancelled) return;
        setBouncing(true);
        bounceReset.current = window.setTimeout(() => setBouncing(false), 1000);
        schedule();
      }, ms);
    };
    schedule();
    return () => {
      cancelled = true;
      if (bounceTimer.current) window.clearTimeout(bounceTimer.current);
      if (bounceReset.current) window.clearTimeout(bounceReset.current);
    };
  }, [active, visible, cfg.bounceMinSec, cfg.bounceMaxSec]);

  if (!active) return null;

  const message = lang === "ar" ? cfg.messageAr : cfg.messageEn;
  const href =
    `https://wa.me/${phoneDigits}` +
    (message.trim() ? `?text=${encodeURIComponent(message)}` : "");

  return (
    <div
      className={`wa-widget wa-${cfg.side}${visible ? " is-visible" : ""}`}
      aria-hidden={!visible}
    >
      <a
        className={`wa-btn${bouncing ? " is-bouncing" : ""}`}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        style={{ background: cfg.bgColor }}
        aria-label="WhatsApp"
        title="WhatsApp"
        tabIndex={visible ? 0 : -1}
      >
        {cfg.customIcon ? (
          <img className="wa-custom" src={cfg.customIcon} alt="WhatsApp" />
        ) : (
          <svg viewBox="0 0 24 24" width="30" height="30" aria-hidden="true">
            <path fill="#fff" d={WHATSAPP_GLYPH} />
          </svg>
        )}
      </a>
    </div>
  );
}
