export interface MetaFact {
  label: string;
  value: string;
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
      {items.map((item) => (
        <div className="meta-fact" key={item.label}>
          <div className="meta-fact-label">{item.label}</div>
          <div className="meta-fact-value">{item.value}</div>
        </div>
      ))}
    </div>
  );
}
