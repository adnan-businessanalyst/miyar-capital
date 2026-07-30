import { CONTENT_IMAGES } from "../site/contentImages";

/**
 * Hardcoded news articles for /news and /news/[slug].
 * Add or edit entries here — no CMS in this pass.
 */
export interface NewsArticle {
  id: string;
  slug: string;
  title: string;
  /** Display date, e.g. "15 March 2026". */
  date: string;
  /** Short card excerpt. */
  blurb: string;
  image: string;
  /** Full article body as paragraphs. */
  body: string[];
}

const NEWS: NewsArticle[] = [
  {
    id: "1",
    slug: "miyar-capital-expands-asset-management-platform",
    title: "Miyar Capital Expands Its Asset Management Platform",
    date: "12 March 2026",
    blurb:
      "New strategies across liquidity, equities, and private markets deepen our principal-minded offering for institutional and private clients.",
    image: CONTENT_IMAGES.service_asset_management,
    body: [
      "Miyar Capital continues to deepen its asset-management platform with a focus on principal-minded strategies across liquidity and fixed income, equities, real assets, and private markets.",
      "The expansion reflects growing demand from institutional investors and family offices seeking CMA-regulated partners who underwrite conviction rather than product shelves.",
      "Clients will benefit from clearer reporting frameworks, disciplined portfolio construction, and closer alignment between investment teams and investor objectives.",
    ],
  },
  {
    id: "2",
    slug: "investment-banking-advisory-outlook-2026",
    title: "Investment Banking: Advisory Outlook for 2026",
    date: "28 February 2026",
    blurb:
      "Our IB team shares perspectives on capital markets, M&A, and financing arrangements shaping Saudi corporate agendas this year.",
    image: CONTENT_IMAGES.service_investment_banking,
    body: [
      "Saudi corporate agendas in 2026 continue to emphasise capital formation, strategic partnerships, and carefully sequenced financing.",
      "Miyar Capital’s investment banking practice advises companies and shareholders across capital markets, mergers and acquisitions, and debt and financing arrangements.",
      "We expect selective M&A and structured financing to remain active as sponsors seek partners who combine local market fluency with independent judgment.",
    ],
  },
  {
    id: "3",
    slug: "liquidity-and-fixed-income-strategies-update",
    title: "Liquidity & Fixed Income Strategies: Q1 Update",
    date: "10 February 2026",
    blurb:
      "How our liquidity and fixed-income solutions are positioned for clients seeking stability alongside measured yield.",
    image: CONTENT_IMAGES.pillar_liquidity,
    body: [
      "Liquidity and fixed-income solutions remain a core pillar of Miyar Capital’s offering for clients who prioritise capital preservation and predictable cash flow.",
      "In the first quarter, portfolios emphasised high-quality instruments, careful duration management, and Shariah-compliant structures aligned with CMA standards.",
      "We continue to refine allocation frameworks so that liquidity sleeves complement longer-horizon equity and private-market exposures within client mandates.",
    ],
  },
  {
    id: "4",
    slug: "private-markets-opportunities-for-qualified-investors",
    title: "Private Markets Opportunities for Qualified Investors",
    date: "22 January 2026",
    blurb:
      "Illiquidity premium, governance, and access — what qualified investors should weigh when evaluating private market allocations.",
    image: CONTENT_IMAGES.pillar_private_markets,
    body: [
      "Private markets can offer diversification and access to opportunities not available in public markets, but they require careful underwriting of liquidity, governance, and manager alignment.",
      "Miyar Capital works with qualified investors to evaluate private arrangements that fit long-term objectives and regulatory eligibility.",
      "Official fund documents and suitability assessments remain the foundation of any private markets discussion — this update is informational and does not constitute an offer.",
    ],
  },
];

/** All articles, newest first (array order). */
export function listNews(): NewsArticle[] {
  return [...NEWS];
}

export function getNewsBySlug(slug: string): NewsArticle | undefined {
  return NEWS.find((article) => article.slug === slug);
}
