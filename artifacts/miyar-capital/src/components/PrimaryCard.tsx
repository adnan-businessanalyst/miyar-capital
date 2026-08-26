/**
 * PrimaryCard — Dark offer/value card with optional icon, watermark animation, and body content (plus PrimaryCardGrid).
 *
 * Used by:
 * - views/ArrangementManagement.tsx
 * - views/DirectMurabaha.tsx
 * - views/DiscretionaryPortfolioManagement.tsx
 * - views/DPM.tsx
 * - views/EquityManagement.tsx
 * - views/InstitutionalFamilyOffice.tsx
 * - views/InvestmentBanking.tsx
 * - views/LiquidityAndFixedIncome.tsx
 * - views/WhoWeAre.tsx
 */

"use client";

import { useRouter } from "next/navigation";
import {
  useState,
  type AnimationEvent,
  type KeyboardEvent,
  type ReactNode,
} from "react";
import { useLocalePath } from "../i18n/useLocalePath";
import { RichText } from "./RichText";

const WM_BARS = [
  { cls: "primary-card-wm-b1", x: 120, y: 230, h: 740 },
  { cls: "primary-card-wm-b2", x: 235, y: 320, h: 650 },
  { cls: "primary-card-wm-b3", x: 350, y: 400, h: 570 },
  { cls: "primary-card-wm-b4", x: 465, y: 485, h: 485 },
  { cls: "primary-card-wm-b5", x: 565, y: 610, h: 360 },
  { cls: "primary-card-wm-b6", x: 665, y: 485, h: 485 },
  { cls: "primary-card-wm-b7", x: 780, y: 400, h: 570 },
  { cls: "primary-card-wm-b8", x: 895, y: 320, h: 650 },
  { cls: "primary-card-wm-b9", x: 1010, y: 230, h: 740 },
] as const;

function prefersReducedMotion(): boolean {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

function MiyarSquareLogo({
  playing,
  onPlayEnd,
}: {
  playing: boolean;
  onPlayEnd: () => void;
}) {
  const onAnimationEnd = (e: AnimationEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement;
    if (!target.classList.contains("primary-card-wm-b1")) return;
    onPlayEnd();
  };

  return (
    <div
      className={`primary-card-watermark${playing ? " is-playing-in" : ""}`}
      aria-hidden="true"
      onAnimationEnd={onAnimationEnd}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1200 1200"
        focusable="false"
      >
        <g>
          {WM_BARS.map((bar) => (
            <rect
              key={bar.cls}
              className={`primary-card-wm-bar ${bar.cls}`}
              x={bar.x}
              y={bar.y}
              width={70}
              height={bar.h}
              rx={35}
            />
          ))}
        </g>
      </svg>
    </div>
  );
}

export interface PrimaryCardProps {
  title: ReactNode;
  children: ReactNode;
  /** Optional Lucide (or other) icon rendered in the gold circle. */
  icon?: ReactNode;
  /** Optional letter/number badge (e.g. A–D). */
  badge?: ReactNode;
  /** When true, shows the animated Miyar square watermark. */
  logo?: boolean;
  /** Optional link — makes the card clickable. */
  href?: string;
  /** Optional CTA label shown at the bottom (often with href). */
  cta?: ReactNode;
  className?: string;
}

/**
 * Primary offer card: dark at rest, ~20% darker on hover.
 */
export function PrimaryCard({
  title,
  children,
  icon,
  badge,
  logo = false,
  href,
  cta,
  className = "",
}: PrimaryCardProps) {
  const router = useRouter();
  const withLocale = useLocalePath();
  const [playing, setPlaying] = useState(false);

  const playIn = () => {
    if (!logo || prefersReducedMotion()) return;
    setPlaying(false);
    requestAnimationFrame(() => {
      requestAnimationFrame(() => setPlaying(true));
    });
  };

  const resolvedHref =
    href && href.startsWith("/") ? withLocale(href) : href;
  const clickable = Boolean(resolvedHref);

  const rootClass = [
    "primary-card",
    clickable ? "primary-card--link" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const go = () => {
    if (!resolvedHref) return;
    if (resolvedHref.startsWith("/")) {
      router.push(resolvedHref);
      return;
    }
    window.open(resolvedHref, "_blank", "noopener,noreferrer");
  };

  const onKeyDown = (e: KeyboardEvent<HTMLElement>) => {
    if (!clickable) return;
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      go();
    }
  };

  const inner = (
    <>
      {logo ? (
        <MiyarSquareLogo
          playing={playing}
          onPlayEnd={() => setPlaying(false)}
        />
      ) : null}
      {badge ? (
        <div className="primary-card-badge" aria-hidden="true">
          {badge}
        </div>
      ) : null}
      {icon ? (
        <div className="primary-card-icon" aria-hidden="true">
          {icon}
        </div>
      ) : null}
      <h3 className="primary-card-title">
        {typeof title === "string" ? <RichText html={title} /> : title}
      </h3>
      <div className="primary-card-body">{children}</div>
      {cta ? <div className="primary-card-cta">{cta}</div> : null}
    </>
  );

  if (clickable && resolvedHref) {
    return (
      <a
        className={rootClass}
        href={resolvedHref}
        onMouseEnter={playIn}
        onClick={(e) => {
          if (!resolvedHref.startsWith("/")) return;
          e.preventDefault();
          go();
        }}
      >
        {inner}
      </a>
    );
  }

  return (
    <div
      className={rootClass}
      onMouseEnter={playIn}
      onKeyDown={onKeyDown}
    >
      {inner}
    </div>
  );
}

export type PrimaryCardGridColumns = 2 | 3 | 4;

/** Stretch-aligned multi-column grid for primary cards. */
export function PrimaryCardGrid({
  children,
  columns = 2,
  className = "",
}: {
  children: ReactNode;
  columns?: PrimaryCardGridColumns;
  className?: string;
}) {
  return (
    <div
      className={[
        "primary-card-grid",
        `primary-card-grid--${columns}`,
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {children}
    </div>
  );
}
