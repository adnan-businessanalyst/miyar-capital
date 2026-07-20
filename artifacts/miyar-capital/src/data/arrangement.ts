export interface ArrangementService {
  title: string;
  items: string[];
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
