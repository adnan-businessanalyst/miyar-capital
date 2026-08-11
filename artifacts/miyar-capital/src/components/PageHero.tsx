"use client";

import { useEffect, useState, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { MetaFacts, type MetaFact } from "./MetaFacts";
import { useLanguage } from "../i18n/LanguageContext";
import { useLocalePath } from "../i18n/useLocalePath";
import { mediaUrl } from "../site/resolveAssetUrl";

const logoSpinner = mediaUrl("brand", "logo-spinner-hero");
const pageHeroBg = mediaUrl("page-hero", "page-hero-bg");

export interface PageHeroCrumb {
  label: string;
  href?: string;
}

export type PageHeroChip = string | { lead: string; text: string };

/** @deprecated Prefer `MetaFact` from `./MetaFacts`. */
export type PageHeroMeta = MetaFact;

export interface PageHeroProps {
  /** Main heading (required). */
  title: string;
  /**
   * Simple trail after Home, e.g. `"About Us"` → Home / About Us.
   * Ignored when `crumbs` is provided. Defaults to `title`.
   */
  crumb?: string;
  /** Full crumb trail after Home (use for linked middle segments). */
  crumbs?: PageHeroCrumb[];
  /** Small uppercase badge above the title. */
  badge?: string;
  /** Supporting line under the title. */
  description?: string;
  /** Pill chips under the description. */
  chips?: PageHeroChip[];
  /** Label/value meta row (funds, product facts). */
  meta?: PageHeroMeta[];
  /** Optional hero background image (defaults to page-hero-bg.*). */
  backgroundImage?: string;
  /**
   * Miyar Hero Reveal: center logo → type title → fade in badge/desc/chips/meta.
   * Default false — identical to the static hero (no logo / typing / delays).
   */
  animate?: boolean;
  /** Optional content rendered below the description (e.g. featured quote). */
  children?: ReactNode;
  /** Extra class on the hero section (e.g. page-hero--fold). */
  className?: string;
}

type RevealPhase = "logo" | "typing" | "done";

const LOGO_MS = 3800;
const TYPE_MS = 42;

function normalizeCrumbs(
  title: string,
  crumb: string | undefined,
  crumbs: PageHeroCrumb[] | undefined,
): PageHeroCrumb[] {
  if (crumbs && crumbs.length > 0) return crumbs;
  return [{ label: crumb ?? title }];
}

function prefersReducedMotion(): boolean {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

export function PageHero({
  title,
  crumb,
  crumbs,
  badge,
  description,
  chips,
  meta,
  backgroundImage = pageHeroBg,
  animate = false,
  children,
  className = "",
}: PageHeroProps) {
  const sectionClass = ["page-hero", className].filter(Boolean).join(" ");
  const router = useRouter();
  const { lang } = useLanguage();
  const withLocale = useLocalePath();
  const trail = normalizeCrumbs(title, crumb, crumbs);
  const go = (href: string) => () => router.push(withLocale(href));
  const homeLabel = lang === "ar" ? "الرئيسية" : "Home";

  const [phase, setPhase] = useState<RevealPhase>(() =>
    animate && !prefersReducedMotion() ? "logo" : "done",
  );
  const [typed, setTyped] = useState(() =>
    animate && !prefersReducedMotion() ? "" : title,
  );
  const [logoIn, setLogoIn] = useState(false);

  useEffect(() => {
    if (!animate || prefersReducedMotion()) {
      setPhase("done");
      setTyped(title);
      return;
    }

    setPhase("logo");
    setTyped("");
    setLogoIn(false);

    const raf = requestAnimationFrame(() => setLogoIn(true));
    const toTyping = window.setTimeout(() => setPhase("typing"), LOGO_MS);

    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(toTyping);
    };
  }, [animate, title]);

  useEffect(() => {
    if (phase !== "typing") return;

    let i = 0;
    setTyped("");
    const id = window.setInterval(() => {
      i += 1;
      setTyped(title.slice(0, i));
      if (i >= title.length) {
        window.clearInterval(id);
        window.setTimeout(() => setPhase("done"), 280);
      }
    }, TYPE_MS);

    return () => window.clearInterval(id);
  }, [phase, title]);

  const revealed = phase === "done";
  const showLogo = animate && phase === "logo";
  const showCursor = animate && phase === "typing";

  const bg = backgroundImage ? (
    <div className="ph-bg" aria-hidden="true">
      <img
        className="ph-bg-img"
        src={backgroundImage}
        alt=""
        decoding="async"
        fetchPriority="high"
      />
    </div>
  ) : (
    <div className="ph-bg" aria-hidden="true" />
  );

  /* ── Static hero (default): unchanged from pre-animate PageHero ── */
  if (!animate) {
    return (
      <section className={sectionClass}>
        {bg}
        <div className="wrap">
          <div className="crumb">
            <a onClick={go("/")}>{homeLabel}</a>
            {trail.map((item) => (
              <span key={`${item.label}-${item.href ?? ""}`}>
                {" / "}
                {item.href ? (
                  <a onClick={go(item.href)}>{item.label}</a>
                ) : (
                  item.label
                )}
              </span>
            ))}
          </div>

          {badge ? <div className="ph-badge">{badge}</div> : null}

          <h1>{title}</h1>

          {description ? <p className="ph-desc">{description}</p> : null}

          {children}

          {chips && chips.length > 0 ? (
            <div className="ph-chips">
              {chips.map((chip, i) =>
                typeof chip === "string" ? (
                  <div className="ph-chip" key={`${chip}-${i}`}>
                    {chip}
                  </div>
                ) : (
                  <div className="ph-chip" key={`${chip.lead}-${i}`}>
                    <strong>{chip.lead}</strong> {chip.text}
                  </div>
                ),
              )}
            </div>
          ) : null}

          {meta && meta.length > 0 ? (
            <MetaFacts items={meta} tone="dark" layout="row" />
          ) : null}
        </div>
      </section>
    );
  }

  /* ── Miyar Hero Reveal (animate={true} only) ── */
  return (
    <section className={`${sectionClass} page-hero--animate`}>
      {bg}

      {showLogo ? (
        <div className={`ph-logo${logoIn ? " is-in" : ""}`} aria-hidden="true">
          <img className="ph-logo-img" src={logoSpinner} alt="" width={200} height={200} />
        </div>
      ) : null}

      <div className="wrap">
        <div className="crumb">
          <a onClick={go("/")}>{homeLabel}</a>
          {trail.map((item) => (
            <span key={`${item.label}-${item.href ?? ""}`}>
              {" / "}
              {item.href ? (
                <a onClick={go(item.href)}>{item.label}</a>
              ) : (
                item.label
              )}
            </span>
          ))}
        </div>

        {badge ? (
          <div className={`ph-badge ph-reveal${revealed ? " is-in" : ""}`}>{badge}</div>
        ) : null}

        <div className="ph-heading-wrap">
          <h1 className="ph-typewriter-ghost" aria-hidden="true">
            {title}
          </h1>
          <h1 className="ph-typed" aria-label={title}>
            {typed}
            {showCursor ? <span className="ph-cursor" aria-hidden="true" /> : null}
          </h1>
        </div>

        {description ? (
          <p className={`ph-desc ph-reveal${revealed ? " is-in" : ""}`}>{description}</p>
        ) : null}

        {chips && chips.length > 0 ? (
          <div className={`ph-chips ph-reveal${revealed ? " is-in" : ""}`}>
            {chips.map((chip, i) =>
              typeof chip === "string" ? (
                <div className="ph-chip" key={`${chip}-${i}`}>
                  {chip}
                </div>
              ) : (
                <div className="ph-chip" key={`${chip.lead}-${i}`}>
                  <strong>{chip.lead}</strong> {chip.text}
                </div>
              ),
            )}
          </div>
        ) : null}

        {meta && meta.length > 0 ? (
          <MetaFacts
            items={meta}
            tone="dark"
            layout="row"
            className={`ph-reveal${revealed ? " is-in" : ""}`}
          />
        ) : null}
      </div>
    </section>
  );
}
