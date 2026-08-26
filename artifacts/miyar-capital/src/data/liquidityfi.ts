/**
 * Liquidity & FI / Miyar Murabaha Fund page copy (EN + AR).
 * Imported by `views/LiquidityFI.tsx` — not CMS-managed.
 * Route: /asset-management/liquidity-fixed-income/murabaha-fund
 *
 * Bodies may include RichText markup: `<br>`, `<strong>`, `<em>`,
 * `<span class="rt-navy|rt-accent|rt-muted|rt-white">…</span>` (rendered via RichText).
 */

export interface LiquidityFiMetaFact {
  labelEn: string;
  labelAr: string;
  valueEn: string;
  valueAr: string;
}

export interface LiquidityFiBodyBlock {
  headingEn: string;
  headingAr: string;
  bodyEn: string;
  bodyAr: string;
}

export interface LiquidityFiFactRow {
  labelEn: string;
  labelAr: string;
  valueEn: string;
  valueAr: string;
}

export interface LiquidityFiContent {
  hero: {
    titleEn: string;
    titleAr: string;
    crumbAmEn: string;
    crumbAmAr: string;
    crumbPageEn: string;
    crumbPageAr: string;
    crumbParentEn: string;
    crumbParentAr: string;
    meta: LiquidityFiMetaFact[];
  };
  body: LiquidityFiBodyBlock[];
  facts: {
    headingEn: string;
    headingAr: string;
    rows: LiquidityFiFactRow[];
    primaryCtaEn: string;
    primaryCtaAr: string;
    secondaryCtaEn: string;
    secondaryCtaAr: string;
  };
  disclaimer: {
    leadEn: string;
    leadAr: string;
    bodyEn: string;
    bodyAr: string;
  };
  disclosure: {
    titleEn: string;
    titleAr: string;
    bodyEn: string;
    bodyAr: string;
  };
}

export const LIQUIDITY_FI: LiquidityFiContent = {
  hero: {
    titleEn: "Miyar Murabaha Fund",
    titleAr: "صندوق معيار للمرابحة",
    crumbAmEn: "Asset Management",
    crumbAmAr: "إدارة الأصول",
    crumbPageEn: "Miyar Murabaha Fund",
    crumbPageAr: "صندوق معيار للمرابحة",
    crumbParentEn: "Liquidity & Fixed Income",
    crumbParentAr: "حلول السيولة والدخل الثابت",
    meta: [
      {
        labelEn: "Pillar",
        labelAr: "الركيزة",
        valueEn: "Liquidity &amp; Fixed Income",
        valueAr: "حلول السيولة والدخل الثابت",
      },
      {
        labelEn: "Objective",
        labelAr: "الهدف",
        valueEn: "Liquidity & Income",
        valueAr: "السيولة والدخل",
      },
      {
        labelEn: "Risk Level",
        labelAr: "مستوى المخاطر",
        valueEn: "Low",
        valueAr: "منخفض",
      },
    ],
  },

  body: [
    {
      headingEn: "Fund Objective",
      headingAr: "هدف الصندوق",
      bodyEn:
        "The fund seeks to preserve capital and generate competitive short-term income through Murabaha transactions and Shariah-compliant money-market instruments, while maintaining daily liquidity. It is our core liquidity solution, open to individuals and institutions alike.",
      bodyAr:
        "يسعى الصندوق إلى المحافظة على رأس المال وتوليد دخل تنافسي قصير الأجل من خلال صفقات المرابحة وأدوات أسواق النقد المتوافقة مع الشريعة، مع الحفاظ على سيولة يومية. وهو خيارنا الأساسي لإدارة السيولة، متاح للأفراد والمؤسسات على حدٍّ سواء.",
    },
    {
      headingEn: "Investment Scope",
      headingAr: "نطاق الاستثمار",
      bodyEn:
        "The fund invests in high-quality Murabaha transactions and short-term money-market instruments with approved counterparties, managed within a conservative maturity and concentration framework under the oversight of an independent risk function.",
      bodyAr:
        "يستثمر الصندوق في صفقات مرابحة وأدوات نقدية قصيرة الأجل عالية الجودة مع أطراف نظيرة معتمدة، ويُدار ضمن إطار متحفّظ لمدة الاستحقاق وحدود التركّز، تحت إشراف وظيفة مستقلة لإدارة المخاطر.",
    },
    {
      headingEn: "Who It Is For",
      headingAr: "لمن يناسب",
      bodyEn:
        "For anyone seeking capital preservation with steady income and available liquidity — from individuals looking for a lower-volatility home for cash, to family offices and corporate treasuries seeking a stable component within a broader portfolio.",
      bodyAr:
        "لكل من يسعى إلى الحفاظ على رأس ماله مع دخل مستقر وسيولة متاحة — من الأفراد الراغبين في بديل استثماري منخفض التذبذب للسيولة، إلى المكاتب العائلية وخزائن الشركات الباحثة عن مكوّن مستقر ضمن محفظة أوسع.",
    },
    {
      headingEn: "Subscription & Redemption",
      headingAr: "الاشتراك والاسترداد",
      bodyEn:
        "Subscription and redemption dates, cut-off times and minimums are set out in the fund's Terms and Conditions. Eligibility is subject to client classification and a suitability assessment.",
      bodyAr:
        "تُحدَّد مواعيد الاشتراك والاسترداد وأوقات الإقفال والحد الأدنى في شروط الصندوق وأحكامه. وتخضع الأهلية لتصنيف العميل وتقييم الملاءمة.",
    },
  ],

  facts: {
    headingEn: "Fund Facts",
    headingAr: "حقائق الصندوق",
    rows: [
      {
        labelEn: "Asset Class",
        labelAr: "فئة الأصل",
        valueEn: "Money Market",
        valueAr: "أسواق النقد",
      },
      {
        labelEn: "Risk Level",
        labelAr: "مستوى المخاطر",
        valueEn: "Low",
        valueAr: "منخفض",
      },
      {
        labelEn: "Liquidity",
        labelAr: "السيولة",
        valueEn: "Daily",
        valueAr: "يومية",
      },
      {
        labelEn: "Investor Type",
        labelAr: "نوع المستثمر",
        valueEn: "Public — individuals and institutions",
        valueAr: "عام — أفراد ومؤسسات",
      },
      {
        labelEn: "Structure",
        labelAr: "الهيكل",
        valueEn: "Shariah-compliant",
        valueAr: "متوافق مع الشريعة",
      },
    ],
    primaryCtaEn: "Download Factsheet &amp; Terms and Conditions ↓",
    primaryCtaAr: "تحميل نشرة الحقائق والشروط والأحكام ↓",
    secondaryCtaEn: "Subscribe / Enquire",
    secondaryCtaAr: "اشترك / استفسر",
  },

  disclaimer: {
    leadEn: "Risk Note",
    leadAr: "تنويه المخاطر",
    bodyEn:
      "The value of investments may fall as well as rise, and past performance is not a reliable indicator of future results. Eligibility is subject to client classification and a suitability assessment. The fund is offered solely through its official, Compliance-approved documents.",
    bodyAr:
      "قد تنخفض قيمة الاستثمارات كما قد ترتفع، والأداء السابق ليس مؤشراً موثوقاً للنتائج المستقبلية. الأهلية مشروطة بتصنيف العميل وتقييم الملاءمة. ويُقدَّم الصندوق حصراً من خلال مستنداته الرسمية المعتمدة.",
  },

  disclosure: {
    titleEn: "Disclosure",
    titleAr: "الإفصاح التنظيمي",
    bodyEn:
      "Miyar Capital is authorised and regulated by the CMA, licence No. 21216-32. Content is for information only and does not constitute an offer of securities or investment advice.",
    bodyAr:
      "معيار المالية شركة مرخّصة ومنظّمة من هيئة السوق المالية، ترخيص رقم 21216-32. المحتوى لأغراض المعلومات فقط ولا يُعدّ عرضاً لأوراق مالية أو مشورة استثمارية.",
  },
};
