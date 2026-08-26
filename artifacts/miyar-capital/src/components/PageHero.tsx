/**
 * PageHero — Inner-page hero with optional title, subtitle, crumbs, chips, MetaFacts, background, and optional reveal animation.
 *
 * Used by:
 * - components/FundPage.tsx
 * - components/ReportsPage.tsx
 * - views/ArrangementManagement.tsx
 * - views/AssetManagement.tsx
 * - views/BoardOfDirectors.tsx
 * - views/Careers.tsx
 * - views/CapitalMarketsAdvisory.tsx
 * - views/DPM.tsx
 * - views/DebtFinancingArrangement.tsx
 * - views/DirectMurabaha.tsx
 * - views/Disclosures.tsx
 * - views/EquityManagement.tsx
 * - views/ExecutiveTeam.tsx
 * - views/FATCA.tsx
 * - views/FinancialReports.tsx
 * - views/FundReportsDetail.tsx
 * - views/FundsReports.tsx
 * - views/GovernanceIndependence.tsx
 * - views/IBRegisterInterest.tsx
 * - views/InstitutionalFamilyOffice.tsx
 * - views/InvestmentAdvisory.tsx
 * - views/InvestmentBanking.tsx
 * - views/InvestmentManagement.tsx
 * - views/JobDetail.tsx
 * - views/LiquidityAndFixedIncome.tsx
 * - views/LiquidityFI.tsx
 * - views/MergersAcquisitions.tsx
 * - views/News.tsx
 * - views/NewsArticle.tsx
 * - views/PrivacyPolicy.tsx
 * - views/PrivateMarketsPage.tsx
 * - views/RealAssets.tsx
 * - views/RealEstatePrivateArrangements.tsx
 * - views/ShariahPrinciples.tsx
 * - views/ValuationFinancialAdvisory.tsx
 * - views/WhoWeAre.tsx
 */

"use client";

import { useEffect, useState, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { MetaFacts, type MetaFact } from "./MetaFacts";
import { RichText } from "./RichText";
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
  /**
   * Main heading (`h1`). Omit or pass empty to leave the title slot blank.
   */
  title?: string;
  /**
   * Simple trail after Home, e.g. `"About Us"` → Home / About Us.
   * Ignored when `crumbs` is provided. Falls back to `title` when set.
   */
  crumb?: string;
  /** Full crumb trail after Home (use for linked middle segments). */
  crumbs?: PageHeroCrumb[];
  /** Small uppercase badge above the title. */
  badge?: string;
  /**
   * Supporting line under the title (`h2.ph-desc`).
   * Prefer this over `description`. Omit or empty → blank slot.
   */
  subtitle?: string;
  /**
   * @deprecated Use `subtitle`. Still accepted for existing call sites.
   */
  description?: string;
  /** Pill chips under the subtitle. */
  chips?: PageHeroChip[];
  /**
   * Label/value meta row via `MetaFacts`.
   * Omit or pass an empty list → blank slot (component not rendered).
   */
  meta?: PageHeroMeta[];
  /** Optional hero background image (defaults to page-hero-bg.*). */
  backgroundImage?: string;
  /**
   * Miyar Hero Reveal: center logo → type title → fade in badge/desc/chips/meta.
   * Default false — identical to the static hero (no logo / typing / delays).
   */
  animate?: boolean;
  /** Optional content rendered below the subtitle (e.g. featured quote). */
  children?: ReactNode;
  /** Extra class on the hero section (e.g. page-hero--fold). */
  className?: string;
}

type RevealPhase = "logo" | "typing" | "done";

const LOGO_MS = 3800;
const TYPE_MS = 42;

function textOrEmpty(value: string | undefined | null): string {
  return typeof value === "string" ? value.trim() : "";
}

function normalizeCrumbs(
  title: string,
  crumb: string | undefined,
  crumbs: PageHeroCrumb[] | undefined,
): PageHeroCrumb[] {
  if (crumbs && crumbs.length > 0) return crumbs;
  const label = textOrEmpty(crumb) || title;
  return label ? [{ label }] : [];
}

function prefersReducedMotion(): boolean {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

function filterMeta(meta: PageHeroMeta[] | undefined): MetaFact[] {
  if (!meta || meta.length === 0) return [];
  return meta.filter(
    (item) => textOrEmpty(item.label) && textOrEmpty(item.value),
  );
}

export function PageHero({
  title,
  crumb,
  crumbs,
  badge,
  subtitle,
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

  const titleText = textOrEmpty(title);
  const subtitleText = textOrEmpty(subtitle) || textOrEmpty(description);
  const metaItems = filterMeta(meta);
  const trail = normalizeCrumbs(titleText, crumb, crumbs);
  const go = (href: string) => () => router.push(withLocale(href));
  const homeLabel = lang === "ar" ? "الرئيسية" : "Home";

  const [phase, setPhase] = useState<RevealPhase>(() =>
    animate && titleText && !prefersReducedMotion() ? "logo" : "done",
  );
  const [typed, setTyped] = useState(() =>
    animate && titleText && !prefersReducedMotion() ? "" : titleText,
  );
  const [logoIn, setLogoIn] = useState(false);

  useEffect(() => {
    if (!animate || !titleText || prefersReducedMotion()) {
      setPhase("done");
      setTyped(titleText);
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
  }, [animate, titleText]);

  useEffect(() => {
    if (phase !== "typing" || !titleText) return;

    let i = 0;
    setTyped("");
    const id = window.setInterval(() => {
      i += 1;
      setTyped(titleText.slice(0, i));
      if (i >= titleText.length) {
        window.clearInterval(id);
        window.setTimeout(() => setPhase("done"), 280);
      }
    }, TYPE_MS);

    return () => window.clearInterval(id);
  }, [phase, titleText]);

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

  const crumbEl = (
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
  );

  const chipsEl =
    chips && chips.length > 0 ? (
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
    ) : null;

  /* ── Static hero (default) ── */
  if (!animate) {
    return (
      <section className={sectionClass}>
        {bg}
        <div className="wrap">
          {crumbEl}

          {badge ? <div className="ph-badge">{badge}</div> : null}

          {titleText ? <h1>{titleText}</h1> : null}

          {subtitleText ? (
            <h2 className="ph-desc">
              <RichText html={subtitleText} />
            </h2>
          ) : null}

          {children}

          {chipsEl}

          {metaItems.length > 0 ? (
            <MetaFacts items={metaItems} tone="dark" layout="row" />
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
          <img
            className="ph-logo-img"
            src={logoSpinner}
            alt=""
            width={200}
            height={200}
          />
        </div>
      ) : null}

      <div className="wrap">
        {crumbEl}

        {badge ? (
          <div className={`ph-badge ph-reveal${revealed ? " is-in" : ""}`}>
            {badge}
          </div>
        ) : null}

        {titleText ? (
          <div className="ph-heading-wrap">
            <h1 className="ph-typewriter-ghost" aria-hidden="true">
              {titleText}
            </h1>
            <h1 className="ph-typed" aria-label={titleText}>
              {typed}
              {showCursor ? (
                <span className="ph-cursor" aria-hidden="true" />
              ) : null}
            </h1>
          </div>
        ) : null}

        {subtitleText ? (
          <h2 className={`ph-desc ph-reveal${revealed ? " is-in" : ""}`}>
            <RichText html={subtitleText} />
          </h2>
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

        {metaItems.length > 0 ? (
          <MetaFacts
            items={metaItems}
            tone="dark"
            layout="row"
            className={`ph-reveal${revealed ? " is-in" : ""}`}
          />
        ) : null}
      </div>
    </section>
  );
}
