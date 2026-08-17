/**
 * CoreCapabilities — Numbered capability pillars in a responsive grid.
 * Section title (h2 / SectionHead) stays in the parent page — not part of this component.
 *
 * Used by:
 * - views/EquityManagement.tsx
 * - views/PrivateMarketsPage.tsx
 * - views/RealAssets.tsx
 */

import type { CSSProperties } from "react";
import { RichText } from "./RichText";

export type CoreCapabilityItem = {
  title: string;
  /** Plain text or light HTML (via RichText). */
  body: string;
};

export type CoreCapabilitiesProps = {
  items: CoreCapabilityItem[];
  className?: string;
};

/** Grid of numbered capability pillars (h3 title + body). */
export function CoreCapabilities({
  items,
  className = "",
}: CoreCapabilitiesProps) {
  if (items.length === 0) return null;

  return (
    <ul
      className={["core-capabilities", className].filter(Boolean).join(" ")}
      style={{ "--cc-count": items.length } as CSSProperties}
    >
      {items.map((item, index) => {
        const num = String(index + 1).padStart(2, "0");
        return (
          <li key={item.title} className="core-capabilities-item">
            <span className="core-capabilities-index" aria-hidden="true">
              {num}
            </span>
            <div className="core-capabilities-content">
              <h3 className="core-capabilities-title">
                <RichText html={item.title} />
              </h3>
              <RichText
                as="p"
                className="core-capabilities-body"
                html={item.body}
              />
            </div>
          </li>
        );
      })}
    </ul>
  );
}
