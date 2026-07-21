import { useEffect, useState, type ReactNode } from "react";
import { useLocation } from "wouter";
import logoSpinner from "../assets/brand/logo-spinner-hero.svg";
import { resolveAssetUrl } from "../site/resolveAssetUrl";

const pageHeroBgModules = import.meta.glob(
  "../assets/page-hero/page-hero-bg.{svg,SVG,avif,AVIF,webp,WEBP,jpg,JPG,jpeg,JPEG,png,PNG}",
  { eager: true, import: "default" },
) as Record<string, string>;

const pageHeroBg = resolveAssetUrl(pageHeroBgModules);

export interface PageHeroCrumb {
  label: string;
  href?: string;
}

export type PageHeroChip = string | { lead: string; text: string };

export interface PageHeroMeta {
  label: string;
  value: string;
}

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
  const [, navigate] = useLocation();
  const trail = normalizeCrumbs(title, crumb, crumbs);

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

  /* ── Static hero (default): unchanged from pre-animate PageHero ── */
  if (!animate) {
    return (
      <section className={sectionClass}>
        <div className="ph-bg" style={{ backgroundImage: `url(${backgroundImage})` }} />
        <div className="wrap">
          <div className="crumb">
            <a onClick={() => navigate("/")}>Home</a>
            {trail.map((item) => (
              <span key={`${item.label}-${item.href ?? ""}`}>
                {" / "}
                {item.href ? (
                  <a onClick={() => navigate(item.href!)}>{item.label}</a>
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
            <div className="ph-meta">
              {meta.map((m) => (
                <div className="ph-meta-item" key={m.label}>
                  <div className="ph-meta-label">{m.label}</div>
                  <div className="ph-meta-value">{m.value}</div>
                </div>
              ))}
            </div>
          ) : null}
        </div>
      </section>
    );
  }

  /* ── Miyar Hero Reveal (animate={true} only) ── */
  return (
    <section className={`${sectionClass} page-hero--animate`}>
      <div className="ph-bg" style={{ backgroundImage: `url(${backgroundImage})` }} />

      {showLogo ? (
        <div className={`ph-logo${logoIn ? " is-in" : ""}`} aria-hidden="true">
          <img className="ph-logo-img" src={logoSpinner} alt="" width={200} height={200} />
        </div>
      ) : null}

      <div className="wrap">
        <div className="crumb">
          <a onClick={() => navigate("/")}>Home</a>
          {trail.map((item) => (
            <span key={`${item.label}-${item.href ?? ""}`}>
              {" / "}
              {item.href ? (
                <a onClick={() => navigate(item.href!)}>{item.label}</a>
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
          <div className={`ph-meta ph-reveal${revealed ? " is-in" : ""}`}>
            {meta.map((m) => (
              <div className="ph-meta-item" key={m.label}>
                <div className="ph-meta-label">{m.label}</div>
                <div className="ph-meta-value">{m.value}</div>
              </div>
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
}
