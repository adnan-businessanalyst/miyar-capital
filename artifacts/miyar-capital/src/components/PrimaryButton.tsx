/**
 * PrimaryButton — Navy primary action control that renders as a button or link, with optional HTML label.
 *
 * Used by:
 * - components/Factsheet.tsx
 */

"use client";

import type { ButtonHTMLAttributes, ReactNode } from "react";
import { RichText } from "./RichText";

export type PrimaryButtonProps = {
  children?: ReactNode;
  /** Light HTML label (alternative to children). */
  html?: string;
  /** Stretch to container width (e.g. factsheet CTAs). */
  fullWidth?: boolean;
  className?: string;
  href?: string;
  type?: ButtonHTMLAttributes<HTMLButtonElement>["type"];
  onClick?: ButtonHTMLAttributes<HTMLButtonElement>["onClick"];
  disabled?: boolean;
};

/** Navy primary action button with rounded corners. */
export function PrimaryButton({
  children,
  html,
  fullWidth = false,
  className = "",
  href,
  type = "button",
  onClick,
  disabled,
}: PrimaryButtonProps) {
  const classes = [
    "primary-button",
    fullWidth ? "primary-button--full" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const content =
    html != null && html !== "" ? (
      <RichText as="span" html={html} />
    ) : (
      children
    );

  if (href) {
    return (
      <a className={classes} href={href}>
        {content}
      </a>
    );
  }

  return (
    <button
      type={type}
      className={classes}
      onClick={onClick}
      disabled={disabled}
    >
      {content}
    </button>
  );
}
