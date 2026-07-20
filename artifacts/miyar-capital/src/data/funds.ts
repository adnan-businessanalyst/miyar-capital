export interface FundStat {
  icon: string;
  label: string;
  value: string;
}

export interface FundReport {
  title: string;
  year: string;
}

export interface FundData {
  name: string;
  overview: FundStat[];
  performance: FundStat[];
  operation: FundStat[];
  quarterlyReports: FundReport[];
  annualReports: FundReport[];
}

export const MURABAHA_FUND: FundData = {
  name: "Murabaha Fund",
  overview: [
    { icon: "price", label: "Net Unit Price", value: "11.98" },
    { icon: "type", label: "Fund Type", value: "Open" },
    { icon: "value", label: "Fund Asset Value", value: "66,834,791.87" },
    { icon: "date", label: "Inception Date", value: "2022-07-15" },
  ],
  performance: [
    { icon: "trend", label: "YTD Price Change", value: "2.34%" },
    { icon: "percent", label: "Expense Ratio", value: "0.00%" },
    { icon: "percent", label: "Subscription Fees", value: "0.00%" },
    { icon: "percent", label: "Management Fees", value: "0.60%" },
  ],
  operation: [
    { icon: "currency", label: "Fund Currency", value: "Riyal" },
    { icon: "users", label: "Minimum Subscription", value: "5,000" },
    { icon: "date", label: "Valuation Days", value: "Everyday" },
    { icon: "date", label: "Announcement Days", value: "Everyday" },
  ],
  quarterlyReports: [
    { title: "Miyar Murabaha Fund — Third Quarterly Report", year: "2024" },
    { title: "Miyar Murabaha Fund — Second Quarterly Report", year: "2024" },
    { title: "Miyar Murabaha Fund — First Quarterly Report", year: "2024" },
    { title: "Miyar Murabaha Fund — Third Quarterly Report", year: "2023" },
    { title: "Miyar Murabaha Fund — Second Quarterly Report", year: "2023" },
  ],
  annualReports: [
    { title: "Miyar Murabaha Fund — Annual Report", year: "2023" },
    { title: "Miyar Murabaha Fund — Annual Report", year: "2022" },
  ],
};

export const SAUDI_EQUITY_FUND: FundData = {
  name: "Saudi Equity Fund",
  overview: [
    { icon: "price", label: "Net Unit Price", value: "14.52" },
    { icon: "type", label: "Fund Type", value: "Open" },
    { icon: "value", label: "Fund Asset Value", value: "128,540,320.00" },
    { icon: "date", label: "Inception Date", value: "2021-03-10" },
  ],
  performance: [
    { icon: "trend", label: "YTD Price Change", value: "8.75%" },
    { icon: "percent", label: "Expense Ratio", value: "0.15%" },
    { icon: "percent", label: "Subscription Fees", value: "1.00%" },
    { icon: "percent", label: "Management Fees", value: "1.75%" },
  ],
  operation: [
    { icon: "currency", label: "Fund Currency", value: "Riyal" },
    { icon: "users", label: "Minimum Subscription", value: "10,000" },
    { icon: "date", label: "Valuation Days", value: "Sunday & Wednesday" },
    { icon: "date", label: "Announcement Days", value: "Weekly" },
  ],
  quarterlyReports: [
    { title: "Miyar Saudi Equity Fund — Third Quarterly Report", year: "2024" },
    { title: "Miyar Saudi Equity Fund — Second Quarterly Report", year: "2024" },
    { title: "Miyar Saudi Equity Fund — First Quarterly Report", year: "2024" },
    { title: "Miyar Saudi Equity Fund — Third Quarterly Report", year: "2023" },
    { title: "Miyar Saudi Equity Fund — Second Quarterly Report", year: "2023" },
  ],
  annualReports: [
    { title: "Miyar Saudi Equity Fund — Annual Report", year: "2023" },
    { title: "Miyar Saudi Equity Fund — Annual Report", year: "2022" },
  ],
};
