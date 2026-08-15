/**
 * Factsheet — Sticky label/value facts panel with optional primary and secondary CTAs.
 *
 * Used by:
 * - views/LiquidityFI.tsx
 */

"use client";

import type { ReactNode } from "react";
import { PrimaryButton } from "./PrimaryButton";
import { RichText } from "./RichText";

export type FactsheetRow = {
  label: string;
  /** Plain text or light HTML (via RichText). */
  value: string;
};

export type FactsheetProps = {
  title: string;
  rows: FactsheetRow[];
  /** Primary CTA label (supports light HTML). */
  primaryCta?: string;
  /** Optional href for the primary CTA. */
  primaryCtaHref?: string;
  /** Secondary action node. */
  secondaryCta?: ReactNode;
  className?: string;
};

/** Sticky fund/product facts panel with optional CTAs. */
export function Factsheet({
  title,
  rows,
  primaryCta,
  primaryCtaHref,
  secondaryCta,
  className = "",
}: FactsheetProps) {
  return (
    <aside
      className={["factsheet", className].filter(Boolean).join(" ")}
    >
      <h4 className="factsheet-title">{title}</h4>
      <div className="factsheet-rows">
        {rows.map((row) => (
          <div className="factsheet-row" key={row.label}>
            <span className="factsheet-label">{row.label}</span>
            <RichText as="span" className="factsheet-value" html={row.value} />
          </div>
        ))}
      </div>
      {primaryCta || secondaryCta ? (
        <div className="factsheet-actions">
          {primaryCta ? (
            <PrimaryButton
              fullWidth
              html={primaryCta}
              href={primaryCtaHref}
            />
          ) : null}
          {secondaryCta}
        </div>
      ) : null}
    </aside>
  );
}
