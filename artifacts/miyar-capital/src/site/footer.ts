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

export interface FooterAppStore {
  id: "apple" | "google";
  labelEn: string;
  labelAr: string;
  href: string;
}

export interface FooterSocial {
  id: string;
  labelEn: string;
  labelAr: string;
  href: string;
  /** Absolute or site-relative icon URL (SVG). */
  icon: string;
}

export interface SiteFooter extends FooterDoc {
  /** Solid footer base colour (shows behind / without the image). */
  backgroundColor: string;
  /** 0–100 dark overlay over the background image for text contrast. */
  overlayOpacity: number;
  disclaimerLabelEn: string;
  disclaimerLabelAr: string;
  disclaimerEn: string;
  disclaimerAr: string;
  /** App store badge links — hidden on the homepage footer. */
  appStores: FooterAppStore[];
  social: FooterSocial[];
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
          href: "/asset-management/liquidity-fi",
        },
        {
          id: "f-eq",
          labelEn: "Equity Management",
          labelAr: "أسهم الملكية الخاصة",
          href: "/asset-management/equity-management",
        },
        {
          id: "f-real",
          labelEn: "Real Assets",
          labelAr: "الأصول العقارية",
          href: "/asset-management/real-assets",
        },
        {
          id: "f-pm",
          labelEn: "Private Markets",
          labelAr: "الأسواق الخاصة",
          href: "/asset-management/private-markets",
        },
        {
          id: "f-dpm",
          labelEn: "DPM",
          labelAr: "إدارة المحافظ الاستثمارية الخاصة",
          href: "/asset-management/dpm",
        },
        {
          id: "f-ifo",
          labelEn: "Institutional & Family Office",
          labelAr: "المؤسسات و المكاتب العائلية",
          href: "/asset-management/institutional-family-office",
        },
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
          labelEn: "Financial Advisory",
          labelAr: "مستشار المالية",
          href: "/investment-advisory",
        },
      ],
    },
    {
      id: "col-disc",
      titleEn: "Disclosures",
      titleAr: "الإفصاحات",
      links: [
        { id: "f-cma", labelEn: "CMA Disclosures", labelAr: "إفصاحات هيئة السوق المالية", href: "/disclosures" },
        // { id: "f-ctrl", labelEn: "Controlling Members", labelAr: "الأعضاء المسيطرون" },
        // { id: "f-fatca", labelEn: "FATCA / CRS", labelAr: "فاتكا / المعيار الموحد" },
        { id: "f-priv", labelEn: "Privacy Policy", labelAr: "سياسة الخصوصية" },
        // { id: "f-terms", labelEn: "Terms of Use", labelAr: "شروط الاستخدام" },
        {
          id: "f-news",
          labelEn: "News",
          labelAr: "الأخبار",
          href: "/news",
        },
        {
          id: "f-careers",
          labelEn: "Careers",
          labelAr: "الوظائف",
          href: "/careers",
        },
      ],
    },
  ],
  disclaimerLabelEn: "Regulatory:",
  disclaimerLabelAr: "تنظيمي:",
  disclaimerEn:
    " Miyar Financial is authorized and regulated by the Capital Market Authority (CMA), license No. 21216-32, for arranging, advising, managing investments and operating funds. Content is for information only and does not constitute an offer of securities or investment advice. Products are offered solely through their official, Compliance-approved documents.",
  disclaimerAr:
    " معيار المالية شركة مرخّصة ومنظّمة من هيئة السوق المالية، ترخيص رقم 21216-32، لممارسة أنشطة الترتيب وتقديم المشورة وإدارة الاستثمارات وتشغيل الصناديق. المحتوى المنشور لأغراض المعلومات فقط ولا يُعدّ عرضاً لأوراق مالية أو مشورة استثمارية. وتُقدَّم المنتجات حصراً من خلال مستنداتها الرسمية المعتمدة.",
  bottomLeftEn: "© 2026 Miyar Capital. All rights reserved.",
  bottomLeftAr: "© 2026 معيار كابيتال. جميع الحقوق محفوظة.",
  bottomRightEn:
    "Arabic is the primary regulatory language · العربية هي لغة الإفصاح الأساسية",
  bottomRightAr:
    "العربية هي لغة الإفصاح الأساسية · Arabic is the primary regulatory language",
  appStores: [
    {
      id: "apple",
      labelEn: "Download on the App Store",
      labelAr: "حمّل من App Store",
      href: "https://apps.apple.com/us/app/miyar-capital/id6743315158",
    },
    {
      id: "google",
      labelEn: "Get it on Google Play",
      labelAr: "حمّل من Google Play",
      href: "https://play.google.com/store/apps/details?id=com.miyarcapital.app",
    },
  ],
  social: [
    {
      id: "x",
      labelEn: "X",
      labelAr: "X",
      href: "https://x.com/miyarcapital",
      icon: "https://miyarcapital.com.sa/assets/icons/TwitterX.svg",
    },
    {
      id: "linkedin",
      labelEn: "LinkedIn",
      labelAr: "لينكدإن",
      href: "https://www.linkedin.com/company/miyar-capital",
      icon: "https://miyarcapital.com.sa/assets/icons/Linkedin.svg",
    },
    {
      id: "instagram",
      labelEn: "Instagram",
      labelAr: "إنستغرام",
      href: "https://www.instagram.com/miyarcapital",
      icon: "https://miyarcapital.com.sa/assets/icons/Instagram.svg",
    },
  ],
};
