/**
 * Who We Are page copy (EN + AR).
 * Imported by `views/WhoWeAre.tsx` — not CMS-managed.
 */

export type WhoWeAreIconId =
  | "compass"
  | "flag"
  | "target"
  | "award"
  | "shield"
  | "handshake"
  | "eye";

export interface WhoWeAreFact {
  labelEn: string;
  labelAr: string;
  valueEn: string;
  valueAr: string;
}

export interface WhoWeAreCard {
  icon: WhoWeAreIconId;
  titleEn: string;
  titleAr: string;
  bodyEn: string;
  bodyAr: string;
}

export interface WhoWeAreContent {
  hero: {
    titleEn: string;
    titleAr: string;
    crumbEn: string;
    crumbAr: string;
    descriptionEn: string;
    descriptionAr: string;
  };
  story: {
    /** Drop-cap letter for English lede only (Arabic keeps معيار intact). */
    dropEn: string;
    /** EN: first para continues after drop cap. AR: full paragraphs, no split. */
    parasEn: string[];
    parasAr: string[];
    imageAltEn: string;
    imageAltAr: string;
    facts: WhoWeAreFact[];
  };
  methodology: {
    headingEn: string;
    headingAr: string;
    items: WhoWeAreCard[];
  };
  principles: {
    headingEn: string;
    headingAr: string;
    subEn: string;
    subAr: string;
    items: WhoWeAreCard[];
  };
  /** Section keys rendered on the page, in order. */
  sectionOrder: Array<
    "hero" | "story" | "profile" | "methodology" | "principles"
  >;
}

export const WHO_WE_ARE: WhoWeAreContent = {
  hero: {
    titleEn: "Who We Are",
    titleAr: "من نحن",
    crumbEn: "Who We Are",
    crumbAr: "من نحن",
    descriptionEn:
      "Miyar Capital is a Shariah-compliant financial institution committed to ethical investment, transparent governance, and long-term value for the communities we serve.",
    descriptionAr:
      "معيار المالية مؤسسة مالية متوافقة مع الشريعة ملتزمة بالاستثمار الأخلاقي والحوكمة الشفافة والقيمة طويلة الأجل للمجتمعات التي نخدمها.",
  },
  story: {
    dropEn: "M",
    parasEn: [
      "Miyar — the Arabic word for standard — is more than our name. It is the measure we hold ourselves to in every decision, every contract, and every relationship.",
      "Founded to bridge modern financial services and timeless Islamic values, Miyar Capital provides investment, financing, and wealth-management solutions that are fully compliant with the principles of Shariah. We serve individuals, families, and institutions who believe that how wealth is earned matters as much as how it grows.",
      "Our approach combines rigorous financial discipline with an unwavering ethical framework. Every product we offer is screened, structured, and certified before it reaches our clients — and monitored continuously thereafter. We measure success not only in returns, but in the integrity of every transaction and the confidence of every stakeholder.",
      "From our headquarters in Riyadh, we work with a network of partners, scholars, and regulators to advance a financial system that is fair, transparent, and rooted in real economic activity.",
    ],
    parasAr: [
      "معيار — وهي الكلمة العربية التي تعني المعيار — أكثر من مجرد اسم لنا. إنه المقياس الذي نلتزم به في كل قرار، وكل عقد، وكل علاقة.",
      "تأسست معيار المالية لتجسير الخدمات المالية الحديثة والقيم الإسلامية الخالدة، وتقدّم حلول الاستثمار والتمويل وإدارة الثروات المتوافقة بالكامل مع مبادئ الشريعة. نخدم الأفراد والعائلات والمؤسسات الذين يؤمنون بأن طريقة كسب الثروة لا تقل أهمية عن نموها.",
      "يجمع نهجنا بين الانضباط المالي الصارم وإطار أخلاقي راسخ. يُفحص كل منتج نقدّمه ويُهيكل ويُعتمد قبل أن يصل إلى عملائنا — ويُراقب باستمرار بعد ذلك. نقيس النجاح لا بالعوائد فحسب، بل بنزاهة كل معاملة وثقة كل صاحب مصلحة.",
      "من مقرنا في الرياض، نعمل مع شبكة من الشركاء والعلماء والجهات التنظيمية لتعزيز نظام مالي عادل وشفاف ومتجذّر في النشاط الاقتصادي الحقيقي.",
    ],
    imageAltEn: "Miyar Capital",
    imageAltAr: "معيار المالية",
    facts: [
      {
        labelEn: "Founded",
        labelAr: "تأسست",
        valueEn: "2021",
        valueAr: "٢٠٢١",
      },
      {
        labelEn: "Headquarters",
        labelAr: "المقر الرئيسي",
        valueEn: "Riyadh, Saudi Arabia",
        valueAr: "الرياض، المملكة العربية السعودية",
      },
      {
        labelEn: "License No.",
        labelAr: "رقم الترخيص",
        valueEn: "21216-32",
        valueAr: "21216-32",
      },
      {
        labelEn: "Licensed by",
        labelAr: "مرخّصة من",
        valueEn: "Capital Market Authority (CMA)",
        valueAr: "هيئة السوق المالية",
      },
    ],
  },
  methodology: {
    headingEn: "Our Strategic Framework",
    headingAr: "إطارنا الاستراتيجي",
    items: [
      {
        icon: "compass",
        titleEn: "Our Purpose",
        titleAr: "غرضنا",
        bodyEn:
          "To be the preferred investment partner in Saudi Arabia, known for innovation and excellence in customer service and sustainable returns.",
        bodyAr:
          "أن نكون شريك الاستثمار المفضّل في المملكة العربية السعودية، معروفين بالابتكار والتميّز في خدمة العملاء والعوائد المستدامة.",
      },
      {
        icon: "flag",
        titleEn: "Our Mission",
        titleAr: "رسالتنا",
        bodyEn:
          "We strive to deliver outstanding performance and continuously exceed our clients' expectations, using a long-term value-based approach that aligns individual objectives.",
        bodyAr:
          "نسعى لتقديم أداء متميز وتجاوز توقعات عملائنا باستمرار، عبر نهج قائم على القيمة طويلة الأجل يوائم الأهداف الفردية.",
      },
      {
        icon: "target",
        titleEn: "Our Goals",
        titleAr: "أهدافنا",
        bodyEn:
          "Achieve sustainable financial returns for our clients, build long-term relationships based on trust, and contribute to the development of the Saudi economy in line with Vision 2030.",
        bodyAr:
          "تحقيق عوائد مالية مستدامة لعملائنا، وبناء علاقات طويلة الأجل قائمة على الثقة، والمساهمة في تنمية الاقتصاد السعودي بما يتماشى مع رؤية ٢٠٣٠.",
      },
    ],
  },
  principles: {
    headingEn: "Our Values",
    headingAr: "قيمنا",
    subEn: "What guides every decision",
    subAr: "ما يوجّه كل قرار",
    items: [
      {
        icon: "award",
        titleEn: "Priority",
        titleAr: "الأولوية",
        bodyEn: "Our unit-holders' profits and benefits always come first.",
        bodyAr: "أرباح ومصالح مالكي الوحدات لدينا تأتي دائمًا أولًا.",
      },
      {
        icon: "shield",
        titleEn: "Integrity",
        titleAr: "النزاهة",
        bodyEn:
          "We do not create any investment product except what we would be satisfied investing in ourselves.",
        bodyAr:
          "لا ننشئ أي منتج استثماري إلا ما نرضى بالاستثمار فيه لأنفسنا.",
      },
      {
        icon: "handshake",
        titleEn: "Partnership",
        titleAr: "الشراكة",
        bodyEn:
          "We act like your partners, not like the traditional fund managers.",
        bodyAr: "نعمل كشركاء لكم، لا كمديري صناديق تقليديين.",
      },
      {
        icon: "eye",
        titleEn: "Transparency",
        titleAr: "الشفافية",
        bodyEn:
          "We uphold honesty and openness, ensuring clarity in every step of the investment journey.",
        bodyAr:
          "نلتزم بالصدق والانفتاح، ونضمن الوضوح في كل خطوة من رحلة الاستثمار.",
      },
    ],
  },
  sectionOrder: ["hero", "story", "methodology", "principles"],
};
