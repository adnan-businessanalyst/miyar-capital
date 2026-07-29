import type { Metadata } from "next";
import { Disclosures } from "@/views/Disclosures";
import { fetchDisclosures } from "@/lib/disclosures";
import type { Disclosure } from "@/data/disclosures";

export const metadata: Metadata = {
  title: "Disclosures",
};

export const dynamic = "force-dynamic";

export default async function Page() {
  let disclosures: Disclosure[] = [];
  let loadError = "";

  try {
    disclosures = await fetchDisclosures();
  } catch (e) {
    loadError =
      e instanceof Error
        ? e.message
        : "Disclosures are temporarily unavailable. Please try again later.";
  }

  return (
    <Disclosures
      disclosures={disclosures}
      loadError={loadError || undefined}
    />
  );
}
