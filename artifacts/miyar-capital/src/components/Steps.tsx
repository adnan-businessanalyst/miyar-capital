import type { CSSProperties } from "react";
import { RichText } from "./RichText";

export interface StepItem {
  title: string;
  body: string;
  /** Optional badge label; defaults to 01, 02, … */
  num?: string;
}

/**
 * Numbered process cards with a connecting line.
 * Desktop: horizontal line through card centers.
 * Small screens: stacked cards with a vertical line top → bottom.
 */
export function Steps({
  items,
  className = "",
}: {
  items: StepItem[];
  className?: string;
}) {
  if (items.length === 0) return null;

  const rootClass = ["steps", className].filter(Boolean).join(" ");

  return (
    <div
      className={rootClass}
      style={{ "--steps-count": items.length } as CSSProperties}
    >
      <div className="steps-line" aria-hidden="true" />
      <ol className="steps-grid">
        {items.map((item, index) => {
          const num = item.num ?? String(index + 1).padStart(2, "0");
          return (
            <li key={`${num}-${item.title}`} className="steps-item">
              <article className="svc svc--dark steps-card">
                <div className="steps-num" aria-hidden="true">
                  <span>{num}</span>
                </div>
                <h4>{item.title}</h4>
                <RichText as="p" html={item.body} />
              </article>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
