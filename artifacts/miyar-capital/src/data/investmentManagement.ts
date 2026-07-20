import { CONTENT_IMAGES } from "../site/contentImages";

const publicOffers = CONTENT_IMAGES.service_investment_banking;
const privateOffers = CONTENT_IMAGES.private_offers;

export interface Service {
  title: string;
  img: string;
  alt?: string;
}

export const IM_SERVICES: Service[] = [
  { title: "Public Offers", img: publicOffers, alt: "Investment Banking" },
  { title: "Private Offers Fund", img: privateOffers },
];

export interface DmpFeature {
  title: string;
  text: string;
}

export const DMP_FEATURES: DmpFeature[] = [
  {
    title: "Unified Data Hub",
    text: "All portfolio data, mandates and reporting consolidated in one place.",
  },
  {
    title: "Smarter Targeting",
    text: "Precise allocation aligned to each client's objectives and risk profile.",
  },
  {
    title: "Higher ROI",
    text: "Disciplined decision-making designed to maximize risk-adjusted returns.",
  },
];

export type RiskLevel = "Low" | "Medium" | "High";

export interface PortfolioType {
  portfolio: string;
  characteristics: string;
  risk: RiskLevel;
  assets: string;
}

export const PORTFOLIO_TYPES: PortfolioType[] = [
  {
    portfolio: "Money Markets",
    characteristics:
      "Achieves acceptable returns through disciplined investment in local, regional, and global money market products.",
    risk: "Low",
    assets:
      "Murabaha / Musharaka / Wakala Islamic sukuk deals (local – regional – global), short-term and long-term money market products (local – regional – global).",
  },
  {
    portfolio: "Stocks",
    characteristics:
      "Aims to grow capital and achieve distribution returns, with high risk to achieve targeted returns.",
    risk: "High",
    assets: "Stock markets.",
  },
  {
    portfolio: "Diversified",
    characteristics:
      "Aims to grow capital within a diversified and balanced portfolio, with medium to high risk to achieve returns over the medium and long terms.",
    risk: "Medium",
    assets: "Multi-asset diversified portfolio.",
  },
];
