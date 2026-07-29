import type { Report, ReportSection } from "@/data/reports";
import { apiInternalBase } from "@/lib/api-server";

type ApiReport = {
  id: string;
  section: ReportSection;
  title: string;
  titleAr: string | null;
  date: string;
  dateAr: string | null;
  fileName: string;
  fileNameAr: string | null;
  fileUrl: string;
  fileUrlAr: string | null;
  hasArabicFile: boolean;
};

export async function fetchReports(section?: ReportSection): Promise<Report[]> {
  const qs = section ? `?section=${section}` : "";
  const res = await fetch(`${apiInternalBase()}/api/reports${qs}`, {
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error(`Failed to load reports (${res.status})`);
  }
  const json = (await res.json()) as { reports?: ApiReport[] };
  return (json.reports ?? []).map((r) => ({
    id: r.id,
    section: r.section,
    title: r.title,
    titleAr: r.titleAr ?? null,
    date: r.date,
    dateAr: r.dateAr ?? null,
    fileName: r.fileName,
    fileNameAr: r.fileNameAr ?? null,
    fileUrl: r.fileUrl,
    fileUrlAr: r.fileUrlAr ?? null,
    hasArabicFile: Boolean(r.hasArabicFile),
  }));
}
