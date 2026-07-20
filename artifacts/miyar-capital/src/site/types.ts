export type Lang = "en" | "ar";

export interface NavItem {
  id: string;
  labelEn: string;
  labelAr: string;
  href?: string;
  group?: boolean;
  children?: NavItem[];
}

export interface NavDoc {
  items: NavItem[];
}

export interface FooterLink {
  id: string;
  labelEn: string;
  labelAr: string;
  href?: string;
}

export interface FooterColumn {
  id: string;
  titleEn: string;
  titleAr: string;
  links: FooterLink[];
}

export interface FooterDoc {
  addressEn: string;
  addressAr: string;
  columns: FooterColumn[];
  bottomLeftEn: string;
  bottomLeftAr: string;
  bottomRightEn: string;
  bottomRightAr: string;
}

export interface WhatsAppConfig {
  enabled: boolean;
  phone: string;
  messageEn: string;
  messageAr: string;
  bgColor: string;
  customIcon: string;
  side: "left" | "right";
  scrollThresholdPct: number;
  bounceMinSec: number;
  bounceMaxSec: number;
}

/** Site-wide SEO / favicon metadata. */
export interface MetaDoc {
  metaTitle: string;
  metaDescription: string;
  metaKeywords: string;
  metaFavicon: string;
}

export function pickLang(en: string, ar: string, lang: Lang): string {
  const value = lang === "ar" ? ar : en;
  return value && value.trim() ? value : en;
}
