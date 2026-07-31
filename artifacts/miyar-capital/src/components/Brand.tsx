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
    <Link href={withLocale("/")} className="brand brand--logo">
      <img className="brand-logo" src={logo} alt="Miyar Capital" />
    </Link>
  );
}
