/**
 * Liquidity & FI / Miyar Murabaha Fund page copy (EN + AR).
 * Imported by `views/LiquidityFI.tsx` — not CMS-managed.
 * Route: /asset-management/liquidity-fi
 *
 * Bodies may include `<br>` for paragraph breaks (rendered via RichText).
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
}

export const LIQUIDITY_FI: LiquidityFiContent = {
  hero: {
    titleEn: "Miyar Murabaha Fund",
    titleAr: "صندوق معيار للمرابحة",
    crumbAmEn: "Asset Management",
    crumbAmAr: "إدارة الأصول",
    crumbPageEn: "Liquidity & FI Solutions",
    crumbPageAr: "حلول السيولة والدخل الثابت",
    meta: [
      {
        labelEn: "Pillar",
        labelAr: "الركيزة",
        valueEn: "Liquidity & FI Solutions",
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
        "The fund seeks capital preservation and competitive short-term income through Shariah-compliant Murabaha and money-market instruments, while maintaining daily liquidity. It is positioned as the platform's liquidity anchor for both standalone investors and DPM mandates.",
      bodyAr:
        "يسعى الصندوق إلى المحافظة على رأس المال وتحقيق دخلٍ تنافسي قصير الأجل من خلال صفقات المرابحة وأدوات أسواق النقد المتوافقة مع أحكام الشريعة الإسلامية، مع الحفاظ على سيولةٍ يومية. ويمثّل الصندوق الخيار الأساسي للسيولة في المنصة، للمستثمرين مباشرةً وللتفاويض المُدارة على حدٍّ سواء.",
    },
    {
      headingEn: "Investment Universe",
      headingAr: "نطاق الاستثمار",
      bodyEn:
        "Diversified across high-quality Murabaha placements and short-tenor money-market instruments with approved counterparties, managed to a conservative duration and concentration framework overseen by the independent risk function.",
      bodyAr:
        "استثماراتٌ مُنوّعة في المرابحات عالية الجودة وأدوات أسواق النقد قصيرة الأجل مع أطرافٍ نظيرة معتمدة، تُدار وفق إطارٍ متحفّظ لمدة الاستحقاق وحدود التركّز، تُشرف عليه وظيفة المخاطر المستقلة.",
    },
    {
      headingEn: "Who It Is For",
      headingAr: "لمن يناسب",
      bodyEn:
        "Investors prioritising liquidity and stability — corporate treasuries, family offices parking capital, and clients seeking a lower-volatility allocation within a broader mandate.",
      bodyAr:
        "للمستثمرين الذين تتقدّم لديهم السيولة والاستقرار: خزائن الشركات، والمكاتب العائلية التي تحتفظ بسيولةٍ بانتظار توظيفها، والعملاء الباحثين عن مكوّنٍ منخفض التذبذب ضمن تفويضٍ أوسع.",
    },
    {
      headingEn: "Subscription & Redemption",
      headingAr: "الاشتراك والاسترداد",
      bodyEn:
        "Subscription and redemption frequency, cut-off times and minimums are set out in the fund's Terms &amp; Conditions. Eligibility is subject to client classification and suitability assessment.",
      bodyAr:
        "تُحدَّد أيام التعامل والمواعيد النهائية لتقديم الطلبات والحد الأدنى للاشتراك في شروط الصندوق وأحكامه. وتخضع الأهلية لتصنيف العميل وتقييم الملاءمة.",
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
        valueEn: "Daily*",
        valueAr: "يومية*",
      },
      {
        labelEn: "Investor Type",
        labelAr: "نوع المستثمر",
        valueEn: "Eligible / Public",
        valueAr: "مؤهل / عام",
      },
      {
        labelEn: "Structure",
        labelAr: "الهيكل",
        valueEn: "Shariah-compliant",
        valueAr: "متوافق مع الشريعة",
      },
      {
        labelEn: "Last Updated",
        labelAr: "آخر تحديث",
        valueEn: "Per T&amp;Cs",
        valueAr: "وفق الشروط والأحكام",
      },
    ],
    primaryCtaEn: "Download Factsheet &amp; T&amp;Cs ↓",
    primaryCtaAr: "تحميل نشرة الحقائق والشروط والأحكام ↓",
    secondaryCtaEn: "Subscribe / Enquire",
    secondaryCtaAr: "اشترك / استفسر",
  },

  disclaimer: {
    leadEn: "Important.",
    leadAr: "تنبيه مهم.",
    bodyEn:
      "*Subject to fund Terms &amp; Conditions. Performance, NAV and target returns are shown only where approved by Compliance and supported by official fund documents. Past performance is not indicative of future results; the value of investments may go up or down. Nothing on this page constitutes investment advice or an offer of securities. Eligibility requires client classification and a suitability assessment.",
    bodyAr:
      "*يخضع ما ورد في هذه الصفحة لشروط الصندوق وأحكامه. ولا تُعرض بيانات الأداء وصافي قيمة الأصول والعوائد المستهدفة إلا بعد اعتمادها من إدارة الالتزام واستنادها إلى مستندات الصندوق الرسمية. والأداء السابق لا يُعد مؤشراً على الأداء المستقبلي، وقد ترتفع قيمة الاستثمارات أو تنخفض. ولا يُشكّل أيٌّ مما ورد في هذه الصفحة مشورةً استثمارية أو طرحاً لأوراق مالية. وتتطلب الأهلية تصنيف العميل وتقييم الملاءمة.",
  },
};
