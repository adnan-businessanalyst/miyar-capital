import type { WhatsAppConfig, MetaDoc } from "./types";

/** Site metadata — edit here (or in index.html) for SEO / favicon. */
export const SITE_META: MetaDoc = {
  metaTitle: "Miyar Capital — Independent Saudi Investment Firm",
  metaDescription:
    "Miyar Capital is an independent, CMA-regulated Saudi investment firm managing capital across four integrated disciplines and advising on defining transactions.",
  metaKeywords: "Miyar Capital, investment, asset management, Saudi Arabia, CMA",
  metaFavicon: "",
};

/** WhatsApp floating widget config. */
export const WHATSAPP: WhatsAppConfig = {
  enabled: true,
  phone: "+966 92 003 2099",
  messageEn: "Hello Miyar Capital, I would like to know more.",
  messageAr: "مرحباً معيار كابيتال، أود معرفة المزيد.",
  bgColor: "#0c476e",
  customIcon: "",
  side: "right",
  scrollThresholdPct: 12,
  bounceMinSec: 15,
  bounceMaxSec: 90,
};
