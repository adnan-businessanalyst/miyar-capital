import type { Metadata } from "next";
import { DiscretionaryPortfolioManagement } from "@/views/DiscretionaryPortfolioManagement";

export const metadata: Metadata = {
  title: "الإدارة التقديرية للمحافظ | Discretionary Portfolio Management",
};

export default function Page() {
  return <DiscretionaryPortfolioManagement />;
}
