import type { Disclosure } from "@/data/disclosures";
import { apiInternalBase } from "@/lib/api-server";

type ApiDisclosure = {
  id: string;
  title: string;
  titleAr: string | null;
  body: string;
  bodyAr: string | null;
  fileName: string;
  fileNameAr: string | null;
  fileUrl: string;
  fileUrlAr: string | null;
  hasArabicFile: boolean;
};

export async function fetchDisclosures(): Promise<Disclosure[]> {
  const res = await fetch(`${apiInternalBase()}/api/disclosures`, {
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error(`Failed to load disclosures (${res.status})`);
  }
  const json = (await res.json()) as { disclosures?: ApiDisclosure[] };
  return (json.disclosures ?? []).map((d) => ({
    id: d.id,
    title: d.title,
    titleAr: d.titleAr ?? null,
    body: d.body,
    bodyAr: d.bodyAr ?? null,
    fileName: d.fileName,
    fileNameAr: d.fileNameAr ?? null,
    fileUrl: d.fileUrl,
    fileUrlAr: d.fileUrlAr ?? null,
    hasArabicFile: Boolean(d.hasArabicFile),
  }));
}
