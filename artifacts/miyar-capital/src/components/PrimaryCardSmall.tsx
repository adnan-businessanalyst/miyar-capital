/**
 * PrimaryCardSmall — Compact skewed-square primary card with centered title and optional body.
 *
 * Used by:
 * - views/InvestmentBanking.tsx
 */

import type { ReactNode } from "react";
import { RichText } from "./RichText";

export type PrimaryCardSmallProps = {
  title?: ReactNode;
  /** Optional body copy under the title (supports RichText markup when string). */
  body?: ReactNode;
  className?: string;
};

function renderCopy(node: ReactNode) {
  if (typeof node === "string") return <RichText html={node} />;
  return node;
}

/** Compact square primary card — centered title + optional body. */
export function PrimaryCardSmall({
  title,
  body,
  className = "",
}: PrimaryCardSmallProps) {
  const showTitle =
    title != null && (typeof title !== "string" || title.trim().length > 0);
  const showBody =
    body != null && (typeof body !== "string" || body.trim().length > 0);

  return (
    <div
      className={["primary-card", "primary-card-small", className]
        .filter(Boolean)
        .join(" ")}
    >
      {showTitle ? (
        <h3 className="primary-card-small-title">{renderCopy(title)}</h3>
      ) : null}
      {showBody ? (
        <div className="primary-card-small-body">{renderCopy(body)}</div>
      ) : null}
    </div>
  );
}
