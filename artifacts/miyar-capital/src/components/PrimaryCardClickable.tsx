/**
 * PrimaryCardClickable — Clickable primary card with badge/icon, title, body, and optional arrow/link navigation (plus grid helper).
 *
 * Used by:
 * - views/AssetManagement.tsx
 * - views/InvestmentBanking.tsx
 */

"use client";

import { useRouter } from "next/navigation";
import type { ReactNode } from "react";
import { RichText } from "./RichText";
import { useLocalePath } from "../i18n/useLocalePath";

export interface PrimaryCardClickableItem {
  id: string;
  title: string;
  body: string;
  /** Empty string disables navigation (card still looks clickable). */
  href?: string;
  /** Letter/number badge (e.g. A–D). Ignored when `icon` is set. */
  badge?: string;
  /** Lucide (or other) icon node. */
  icon?: ReactNode;
  /** Bottom-left corner arrow; defaults to true when href is non-empty. */
  showArrow?: boolean;
}

export function PrimaryCardClickable({
  badge,
  icon,
  title,
  body,
  href = "",
  showArrow,
  className = "",
}: Omit<PrimaryCardClickableItem, "id"> & { className?: string }) {
  const router = useRouter();
  const withLocale = useLocalePath();
  const empty = !href.trim();
  const resolvedHref = empty
    ? "#"
    : href.startsWith("/")
      ? withLocale(href)
      : href;
  const internal = !empty && href.startsWith("/");
  const arrow = showArrow ?? !empty;

  const rootClass = [
    "primary-card",
    "primary-card--link",
    "primary-card-clickable",
    arrow ? "primary-card-clickable--arrow" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <a
      className={rootClass}
      href={resolvedHref}
      target={internal || empty ? undefined : "_blank"}
      rel={internal || empty ? undefined : "noopener noreferrer"}
      onClick={(e) => {
        if (empty) {
          e.preventDefault();
          return;
        }
        if (internal) {
          e.preventDefault();
          router.push(resolvedHref);
        }
      }}
    >
      {icon ? (
        <div className="primary-card-icon" aria-hidden="true">
          {icon}
        </div>
      ) : badge ? (
        <div className="primary-card-badge" aria-hidden="true">
          {badge}
        </div>
      ) : null}
      <h3 className="primary-card-title">{title}</h3>
      <div className="primary-card-body">
        <RichText as="p" html={body} />
      </div>
      {arrow ? (
        <span className="primary-card-clickable-arrow" aria-hidden="true">
          →
        </span>
      ) : null}
    </a>
  );
}

export type PrimaryCardClickableGridColumns = 2 | 3 | 4;

/** Multi-column grid for primary clickable cards. */
export function PrimaryCardClickableGrid({
  items,
  columns = 2,
  className = "",
}: {
  items: PrimaryCardClickableItem[];
  columns?: PrimaryCardClickableGridColumns;
  className?: string;
}) {
  if (items.length === 0) return null;

  return (
    <div
      className={[
        "primary-card-grid",
        `primary-card-grid--${columns}`,
        "primary-card-clickable-grid",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {items.map((item) => (
        <PrimaryCardClickable
          key={item.id}
          badge={item.badge}
          icon={item.icon}
          title={item.title}
          body={item.body}
          href={item.href}
          showArrow={item.showArrow}
        />
      ))}
    </div>
  );
}
