import type { FooterDoc } from "./types";

/**
 * Hardcoded site footer content + background.
 * Edit labels (EN/AR), columns, address, and background settings here.
 * Not managed by Site Manager or the API.
 *
 * Background image: place `footer-bg.*` in `public/media/footer/` (or src/assets/footer + regenerate manifest).
 */
import { mediaUrl } from "./resolveAssetUrl";

/** Resolved URL for the local footer background image, or empty if missing. */
export const FOOTER_BG_IMAGE = mediaUrl("footer", "footer-bg");

export interface SiteFooter extends FooterDoc {
  /** Solid footer base colour (shows behind / without the image). */
  backgroundColor: string;
  /** 0–100 dark overlay over the background image for text contrast. */
  overlayOpacity: number;
}

export const SITE_FOOTER: SiteFooter = {
  backgroundColor: "var(--navy-deep)",
  overlayOpacity: 55,
  addressEn:
    "Unit 11, Building 7720, King Fahd Road,\nAl Muhammadiyah, Riyadh 12363, KSA\n920032099 · info@miyarcapital.com.sa",
  addressAr:
    "وحدة 11، مبنى 7720، طريق الملك فهد،\nالمحمدية، الرياض 12363، المملكة العربية السعودية\n920032099 · info@miyarcapital.com.sa",
  columns: [
    {
      id: "col-am",
      titleEn: "Asset Management",
      titleAr: "إدارة الأصول",
      links: [
        {
          id: "f-liq",
          labelEn: "Liquidity & FI Solutions",
          labelAr: "حلول السيولة والدخل الثابت",
          href: "/product",
        },
        {
          id: "f-eq",
          labelEn: "Equity Management",
          labelAr: "إدارة الأسهم",
          href: "/asset-management",
        },
        {
          id: "f-real",
          labelEn: "Real Assets",
          labelAr: "الأصول الحقيقية",
          href: "/asset-management",
        },
        {
          id: "f-pm",
          labelEn: "Private Markets",
          labelAr: "الأسواق الخاصة",
          href: "/private-markets",
        },
        { id: "f-dpm", labelEn: "DPM", labelAr: "الإدارة التقديرية", href: "/dpm" },
      ],
    },
    {
      id: "col-ib",
      titleEn: "Investment Banking",
      titleAr: "المصرفية الاستثمارية",
      links: [
        {
          id: "f-cm",
          labelEn: "Capital Markets",
          labelAr: "أسواق المال",
          href: "/investment-banking",
        },
        {
          id: "f-ma",
          labelEn: "M&A",
          labelAr: "الاندماج والاستحواذ",
          href: "/investment-banking",
        },
        {
          id: "f-debt",
          labelEn: "Debt Advisory",
          labelAr: "استشارات الديون",
          href: "/investment-banking",
        },
        {
          id: "f-val",
          labelEn: "Valuation",
          labelAr: "التقييم",
          href: "/investment-banking",
        },
        {
          id: "f-reg",
          labelEn: "Register Interest",
          labelAr: "تسجيل الاهتمام",
          href: "/investment-banking",
        },
      ],
    },
    {
      id: "col-disc",
      titleEn: "Disclosures",
      titleAr: "الإفصاحات",
      links: [
        { id: "f-cma", labelEn: "CMA Disclosures", labelAr: "إفصاحات هيئة السوق المالية" },
        { id: "f-ctrl", labelEn: "Controlling Members", labelAr: "الأعضاء المسيطرون" },
        { id: "f-fatca", labelEn: "FATCA / CRS", labelAr: "فاتكا / المعيار الموحد" },
        { id: "f-priv", labelEn: "Privacy Policy", labelAr: "سياسة الخصوصية" },
        { id: "f-terms", labelEn: "Terms of Use", labelAr: "شروط الاستخدام" },
      ],
    },
  ],
  bottomLeftEn: "© 2026 Miyar Capital. All rights reserved.",
  bottomLeftAr: "© 2026 معيار كابيتال. جميع الحقوق محفوظة.",
  bottomRightEn:
    "Arabic is the primary regulatory language · العربية هي لغة الإفصاح الأساسية",
  bottomRightAr:
    "العربية هي لغة الإفصاح الأساسية · Arabic is the primary regulatory language",
};
