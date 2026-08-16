/**
 * PrimaryCardSmall — Compact skewed-square primary card with centered title only.
 *
 * Used by:
 * - views/InvestmentBanking.tsx
 */

import type { ReactNode } from "react";

export type PrimaryCardSmallProps = {
  title: ReactNode;
  className?: string;
};

/** Compact square primary card — centered title, no body/icon. */
export function PrimaryCardSmall({
  title,
  className = "",
}: PrimaryCardSmallProps) {
  return (
    <div
      className={["primary-card", "primary-card-small", className]
        .filter(Boolean)
        .join(" ")}
    >
      <h3 className="primary-card-small-title">{title}</h3>
    </div>
  );
}
