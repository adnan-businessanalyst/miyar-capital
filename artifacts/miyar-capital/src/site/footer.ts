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
  disclaimerLabelEn: string;
  disclaimerLabelAr: string;
  disclaimerEn: string;
  disclaimerAr: string;
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
          labelAr: "أسهم لأصول الملكية",
          href: "/asset-management",
        },
        {
          id: "f-real",
          labelEn: "Real Assets",
          labelAr: "الأصول العقارية",
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
          labelEn: "Investment Banking",
          labelAr: "المصرفية الاستثمارية",
          href: "/investment-banking",
        },
        {
          id: "f-ma",
          labelEn: "Arrangement Management",
          labelAr: "إدارة المصرفية الإستثمارية",
          href: "/arrangement-management",
        },
        {
          id: "f-debt",
          labelEn: "Investment Advisory",
          labelAr: "مستشار الإستثمار",
          href: "/investment-advisory",
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
        {
          id: "f-news",
          labelEn: "News",
          labelAr: "الأخبار",
          href: "/news",
        },
      ],
    },
  ],
  disclaimerLabelEn: "Regulatory.",
  disclaimerLabelAr: "تنظيمي.",
  disclaimerEn:
    "Miyar Capital is authorised and regulated by the Capital Market Authority (CMA), licence No. 21216-32, for arranging, advising, managing investments and operating funds. Content on this site is for information only and does not constitute an offer of securities or investment advice. Investment products are offered solely through their official, Compliance-approved documents.",
  disclaimerAr:
    "معيار كابيتال مرخّصة ومنظمة من هيئة السوق المالية (ترخيص رقم 21216-32) في أعمال الترتيب والمشورة وإدارة الاستثمارات وتشغيل الصناديق. المحتوى على هذا الموقع لأغراض معلوماتية فقط ولا يُعد عرضاً لأوراق مالية أو مشورة استثمارية. تُقدَّم المنتجات الاستثمارية فقط عبر مستنداتها الرسمية المعتمدة من الالتزام.",
  bottomLeftEn: "© 2026 Miyar Capital. All rights reserved.",
  bottomLeftAr: "© 2026 معيار كابيتال. جميع الحقوق محفوظة.",
  bottomRightEn:
    "Arabic is the primary regulatory language · العربية هي لغة الإفصاح الأساسية",
  bottomRightAr:
    "العربية هي لغة الإفصاح الأساسية · Arabic is the primary regulatory language",
};
