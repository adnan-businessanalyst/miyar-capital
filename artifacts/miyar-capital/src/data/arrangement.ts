export interface ArrangementService {
  title: string;
  items: string[];
}

export interface ArrangementDetailCard {
  title: string;
  body: string;
}

const SHARED_ITEMS = [
  "IPO Readiness",
  "Diagnostic Studies",
  "Economic feasibility studies",
  "Financial valuation",
  "Financial due diligence",
];

export const ARRANGEMENT_SERVICES: ArrangementService[] = [
  { title: "Business Consultations", items: SHARED_ITEMS },
  { title: "Financial Consulting", items: SHARED_ITEMS },
  { title: "Debt Advisory", items: SHARED_ITEMS },
  { title: "Capital Markets", items: SHARED_ITEMS },
];

export const ARRANGEMENT_DETAIL_CARDS: ArrangementDetailCard[] = [
  {
    title: "Capital Increase through a Rights Offering",
    body: "Miyar Capital supports companies in increasing capital through a Rights Offering to their existing shareholders, while adhering to the Shariah controls related to such operations.",
  },
  {
    title: "Debt Restructuring Solutions",
    body: "We provide comprehensive debt restructuring services to help companies optimize their capital structure and improve financial stability.",
  },
  {
    title: "Merger & Acquisition Advisory",
    body: "Our team offers expert guidance on M&A transactions, ensuring compliance with Islamic finance principles while maximizing value.",
  },
  {
    title: "IPO & Capital Markets",
    body: "We assist companies in accessing capital markets through IPOs and other capital market instruments in compliance with Shariah requirements.",
  },
  {
    title: "Strategic Financial Advisory",
    body: "Our consultants provide strategic financial advice to help organizations achieve their growth objectives sustainably.",
  },
  {
    title: "Project Finance Structuring",
    body: "We structure project finance solutions that align with Islamic finance principles and project requirements.",
  },
];
