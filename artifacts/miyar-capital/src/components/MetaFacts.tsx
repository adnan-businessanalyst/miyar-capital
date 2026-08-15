/**
 * MetaFacts — Renders label/value meta pairs in row, stack, or grid layouts for light or dark surfaces.
 *
 * Used by:
 * - components/PageHero.tsx
 * - components/ScrollExamples.tsx
 */

export interface MetaFact {
  label: string;
  value: string;
  /** When true, label stays on its own line above the value (e.g. long copy). */
  stacked?: boolean;
  /** When true, allow the label text to wrap (up to natural wrap; used for long titles). */
  wrapLabel?: boolean;
}

type MetaFactsTone = "dark" | "light";
type MetaFactsLayout = "row" | "stack" | "grid";

export function MetaFacts({
  items,
  tone = "dark",
  layout = "row",
  className = "",
}: {
  items: MetaFact[];
  /** `dark` = on navy/hero; `light` = on cream/white cards */
  tone?: MetaFactsTone;
  /** `row` = horizontal wraps (hero); `stack` = vertical list; `grid` = 2-col */
  layout?: MetaFactsLayout;
  className?: string;
}) {
  if (items.length === 0) return null;

  return (
    <div
      className={`meta-facts meta-facts--${tone} meta-facts--${layout}${className ? ` ${className}` : ""}`}
    >
      {items.map((item) => {
        const factClass = [
          "meta-fact",
          item.stacked ? "meta-fact--stacked" : "",
          item.wrapLabel ? "meta-fact--wrap-label" : "",
        ]
          .filter(Boolean)
          .join(" ");
        return (
          <div className={factClass} key={item.label}>
            <div className="meta-fact-label">{item.label}</div>
            <div className="meta-fact-value">{item.value}</div>
          </div>
        );
      })}
    </div>
  );
}
