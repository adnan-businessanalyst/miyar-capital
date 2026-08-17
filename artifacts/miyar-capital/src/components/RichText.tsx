/**
 * RichText — Renders trusted static HTML snippets from `.ts` copy via dangerouslySetInnerHTML.
 *
 * Allowed in data strings (static site copy only — never user input):
 * - `<br>` / `<br />` — line breaks
 * - `<strong>…</strong>` — bold
 * - `<em>…</em>` — italic
 * - `<span class="rt-navy">…</span>` — primary navy
 * - `<span class="rt-accent">…</span>` — lighter brand blue
 * - `<span class="rt-muted">…</span>` — muted grey
 * - `<span class="rt-white">…</span>` — white (dark surfaces)
 * - Inline `style="color: …"` when a one-off color is needed
 *
 * Used by shared chrome (PageHero, SectionHead, MetaFacts, Steps, cards, …)
 * and content views that pass body/description strings from data files.
 */

import { createElement, type JSX } from "react";

interface RichTextProps {
  html: string;
  as?: keyof JSX.IntrinsicElements;
  className?: string;
}

/**
 * Renders trusted, static translation strings that may include light markup.
 * All content originates from bundled data dictionaries — never from user input.
 */
export function RichText({ html, as = "span", className }: RichTextProps) {
  const classes = ["rich-text", className].filter(Boolean).join(" ");
  return createElement(as, {
    className: classes || undefined,
    dangerouslySetInnerHTML: { __html: html },
  });
}
