/**
 * RichText — Renders trusted static HTML snippets from translation strings via dangerouslySetInnerHTML.
 *
 * Used by:
 * - components/Factsheet.tsx
 * - components/PrimaryButton.tsx
 * - components/PrimaryCardClickable.tsx
 * - components/SecondaryButton.tsx
 * - components/Steps.tsx
 * - views/DPM.tsx
 * - views/EquityManagement.tsx
 * - views/InstitutionalFamilyOffice.tsx
 * - views/LiquidityFI.tsx
 * - views/PrivateMarketsPage.tsx
 * - views/RealAssets.tsx
 */

import { createElement, type JSX } from "react";

interface RichTextProps {
  html: string;
  as?: keyof JSX.IntrinsicElements;
  className?: string;
}

/**
 * Renders trusted, static translation strings that contain a small amount of
 * inline markup (<em>, <strong>). All content originates from the bundled
 * translation dictionaries — never from user input.
 */
export function RichText({ html, as = "span", className }: RichTextProps) {
  return createElement(as, {
    className,
    dangerouslySetInnerHTML: { __html: html },
  });
}
