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
