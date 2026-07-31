import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { FundReportsDetail } from "@/views/FundReportsDetail";
import { fetchFundBySlug } from "@/lib/funds-reports";

type Props = { params: Promise<{ slug: string }> };

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const data = await fetchFundBySlug(slug);
  if (!data) return { title: "Funds Reports" };
  return { title: `${data.fund.titleEn} Reports` };
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const data = await fetchFundBySlug(slug);
  if (!data) notFound();
  return (
    <FundReportsDetail settings={data.settings} fund={data.fund} />
  );
}
