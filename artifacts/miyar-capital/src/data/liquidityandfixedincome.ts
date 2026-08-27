/**
 * Liquidity & Fixed Income Solutions page copy (EN + AR).
 * Imported by `views/LiquidityAndFixedIncome.tsx` — not CMS-managed.
 * Route: /asset-management/liquidity-fixed-income
 *
 * Bodies may include RichText markup: `<br>`, `<strong>`, `<em>`,
 * `<span class="rt-navy|rt-accent|rt-muted|rt-white">…</span>` (rendered via RichText).
 */

import { DIRECT_MURABAHA_PATH } from "./directmurabaha";

export type LiquidityFixedIncomeSectionId =
  | "hero"
  | "strategy"
  | "audience"
  | "products"
  | "disclaimer"
  | "regulatory";

export interface LiquidityFixedIncomeMeta {
  labelEn: string;
  labelAr: string;
  valueEn: string;
  valueAr: string;
}

export interface LiquidityFixedIncomeProductItem {
  id: string;
  titleEn: string;
  titleAr: string;
  bodyEn: string;
  bodyAr: string;
  href: string;
  ctaEn: string;
  ctaAr: string;
}

export interface LiquidityFixedIncomeContent {
  sectionOrder: LiquidityFixedIncomeSectionId[];
  hero: {
    titleEn: string;
    titleAr: string;
    crumbAmEn: string;
    crumbAmAr: string;
    crumbPageEn: string;
    crumbPageAr: string;
    descriptionEn: string;
    descriptionAr: string;
    meta: LiquidityFixedIncomeMeta[];
  };
  strategy: {
    titleEn: string;
    titleAr: string;
    bodyEn: string;
    bodyAr: string;
  };
  audience: {
    titleEn: string;
    titleAr: string;
    bodyEn: string;
    bodyAr: string;
  };
  products: {
    titleEn: string;
    titleAr: string;
    items: LiquidityFixedIncomeProductItem[];
  };
  disclaimer: {
    titleEn: string;
    titleAr: string;
    bodyEn: string;
    bodyAr: string;
  };
  regulatory: {
    titleEn: string;
    titleAr: string;
    bodyEn: string;
    bodyAr: string;
  };
}

export const LFI_PAGE_PATH = "/asset-management/liquidity-fixed-income";

export const MURABAHA_PAGE_PATH =
  "/asset-management/liquidity-fixed-income/murabaha-fund";

export { DIRECT_MURABAHA_PATH };

export const LIQUIDITY_AND_FIXED_INCOME: LiquidityFixedIncomeContent = {
  sectionOrder: [
    "hero",
    "strategy",
    "audience",
    "products",
    "disclaimer",
  ],

  hero: {
    titleEn: "Liquidity & Fixed Income Solutions",
    titleAr: "حلول السيولة والدخل الثابت",
    crumbAmEn: "Asset Management",
    crumbAmAr: "إدارة الأصول",
    crumbPageEn: "Liquidity & Fixed Income Solutions",
    crumbPageAr: "حلول السيولة والدخل الثابت",
    descriptionEn:
      "Disciplined liquidity management that combines capital preservation with short-term income, through Shariah-compliant instruments.",
    descriptionAr:
      "إدارة منضبطة للسيولة تجمع بين الحفاظ على رأس المال وتوليد دخل قصير الأجل، بأدوات متوافقة مع الشريعة.",
    meta: [
      {
        labelEn: "Pillar",
        labelAr: "الركيزة",
        valueEn: "I — Liquidity &amp; Fixed Income",
        valueAr: "الأولى — السيولة والدخل الثابت",
      },
      {
        labelEn: "Focus",
        labelAr: "التركيز",
        valueEn: "Capital preservation · Income · Liquidity",
        valueAr: "المحافظة على رأس المال · الدخل · السيولة",
      },
      {
        labelEn: "Vehicles",
        labelAr: "الأدوات",
        valueEn: "Public funds · Private placements",
        valueAr: "صناديق عامة · طرح خاص",
      },
    ],
  },

  strategy: {
    titleEn: "Strategy",
    titleAr: "الاستراتيجية",
    bodyEn:
      "In this pillar, Miyar Capital focuses on liquidity management through Murabaha transactions and Shariah-compliant money-market instruments, seeking to preserve capital and generate short-term income while keeping liquidity available. We offer this through two routes, so every investor can choose what suits them: a public fund whose investment decisions Miyar Capital manages, or a direct route the client controls.",
    bodyAr:
      "تركّز معيار المالية في هذه الركيزة على إدارة السيولة من خلال صفقات المرابحة وأدوات أسواق النقد المتوافقة مع الشريعة، بهدف الحفاظ على رأس المال وتوليد دخل قصير الأجل مع إتاحة السيولة. ونقدّم هذه القدرة عبر مسارين يتيحان لكل مستثمر اختيار ما يناسبه: صندوق عام تدير معيار قراره الاستثماري، أو مسار مباشر يتحكّم فيه العميل بقراراته.",
  },

  audience: {
    titleEn: "Who It Is For",
    titleAr: "لمن تناسب",
    bodyEn:
      "For anyone seeking capital preservation with steady income and available liquidity — from individuals looking for a lower-volatility home for cash, to family offices and corporate treasuries seeking a stable component within a broader portfolio.",
    bodyAr:
      "لكل من يسعى إلى الحفاظ على رأس ماله مع دخل مستقر وسيولة متاحة — من الأفراد الراغبين في بديل استثماري منخفض التذبذب للسيولة، إلى المكاتب العائلية وخزائن الشركات الباحثة عن مكوّن مستقر ضمن محفظة أوسع.",
  },

  products: {
    titleEn: "Our Products",
    titleAr: "منتجاتنا",
    items: [
      {
        id: "murabaha",
        titleEn: "Miyar Murabaha Fund",
        titleAr: "صندوق معيار للمرابحة",
        bodyEn:
          "A public, Shariah-compliant money-market fund investing in Murabaha transactions and high-quality short-term instruments, with daily liquidity — managed by Miyar Capital's team on investors' behalf. Open to individuals and institutions alike.",
        bodyAr:
          "صندوق أسواق نقد عام متوافق مع الشريعة، يستثمر في صفقات المرابحة وأدوات نقدية قصيرة الأجل عالية الجودة، مع سيولة يومية — يديره فريق معيار نيابةً عن المستثمرين. متاح للأفراد والمؤسسات على حدٍّ سواء.",
        href: MURABAHA_PAGE_PATH,
        ctaEn: "Fund details →",
        ctaAr: "تفاصيل الصندوق ←",
      },
      {
        id: "direct-murabaha",
        titleEn: "Direct Murabaha",
        titleAr: "المرابحة المباشرة",
        bodyEn:
          "A direct Murabaha route the client controls: setting the counterparty, tenor and allocation to their own policy, while Miyar Capital provides indicative pricing, execution, documentation and reporting.",
        bodyAr:
          "مسار مباشر لأدوات المرابحة يتحكّم فيه العميل بقراراته: يحدّد الطرف المقابل والمدة والتوزيع وفق سياسته، وتتولّى معيار التسعير الإرشادي والتنفيذ والتوثيق والتقارير.",
        href: DIRECT_MURABAHA_PATH,
        ctaEn: "Direct Murabaha details →",
        ctaAr: "تفاصيل المرابحة المباشرة ←",
      },
      // {
      //   id: "product-3",
      //   titleEn: "",
      //   titleAr: "",
      //   bodyEn: "",
      //   bodyAr: "",
      //   href: "",
      //   ctaEn: "",
      //   ctaAr: "",
      // },
    ],
  },

  disclaimer: {
    titleEn: "Risk Note",
    titleAr: "تنويه المخاطر",
    bodyEn:
      "The value of investments may fall as well as rise, and past performance is not a reliable indicator of future results. Eligibility is subject to client classification and a suitability assessment. Products are offered solely through their official, Compliance-approved documents.",
    bodyAr:
      "قد تنخفض قيمة الاستثمارات كما قد ترتفع، والأداء السابق ليس مؤشراً موثوقاً للنتائج المستقبلية. الأهلية مشروطة بتصنيف العميل وتقييم الملاءمة. وتُقدَّم المنتجات حصراً من خلال مستنداتها الرسمية المعتمدة.",
  },

  regulatory: {
    titleEn: "Disclosure",
    titleAr: "الإفصاح التنظيمي",
    bodyEn:
      "Miyar Capital is authorised and regulated by the CMA, licence No. 21216-32. Content is for information only and does not constitute an offer of securities or investment advice.",
    bodyAr:
      "معيار المالية شركة مرخّصة ومنظّمة من هيئة السوق المالية، ترخيص رقم 21216-32. المحتوى لأغراض المعلومات فقط ولا يُعدّ عرضاً لأوراق مالية أو مشورة استثمارية.",
  },
};
