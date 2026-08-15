/**
 * Brand — Locale-aware home-link logo that swaps light/dark/transparent Miyar Capital mark variants.
 *
 * Used by:
 * - components/Footer.tsx
 * - components/Header.tsx
 */

"use client";

import Link from "next/link";
import { useLocalePath } from "../i18n/useLocalePath";
import { mediaUrl } from "../site/resolveAssetUrl";

interface BrandProps {
  variant?: "light" | "dark";
  transparent?: boolean;
}

export function Brand({ variant = "light", transparent = false }: BrandProps) {
  const withLocale = useLocalePath();
  let logo: string;
  if (variant === "dark") {
    logo = mediaUrl("brand", "logo-footer");
  } else if (transparent) {
    logo = mediaUrl("brand", "logo-nav-light");
  } else {
    logo = mediaUrl("brand", "logo-nav-dark");
  }

  return (
    <Link href={withLocale("/")} className="brand brand--logo" aria-label="Miyar Capital">
      <img
        className="brand-logo"
        src={logo}
        alt="Miyar Capital"
        decoding="async"
        sizes="(max-width: 1024px) 62vw, (max-width: 1280px) 40vw, 204px"
      />
    </Link>
  );
}
