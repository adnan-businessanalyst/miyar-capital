/**
 * CoreCapabilities — Bulleted capability list: each item is an h3 title with a p body.
 * Section title (h2 / SectionHead) stays in the parent page — not part of this component.
 *
 * Used by:
 * - views/EquityManagement.tsx
 * - views/PrivateMarketsPage.tsx
 * - views/RealAssets.tsx
 */

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

/** Vertical list of capability titles (h3) and descriptions (p). */
export function CoreCapabilities({
  items,
  className = "",
}: CoreCapabilitiesProps) {
  if (items.length === 0) return null;

  return (
    <ul
      className={["core-capabilities", className].filter(Boolean).join(" ")}
    >
      {items.map((item) => (
        <li key={item.title} className="core-capabilities-item">
          <h3 className="core-capabilities-title">{item.title}</h3>
          <RichText
            as="p"
            className="core-capabilities-body"
            html={item.body}
          />
        </li>
      ))}
    </ul>
  );
}
