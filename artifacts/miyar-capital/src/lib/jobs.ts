import {
  EMPTY_JOBS_PAGE,
  type JobPosting,
  type JobsPageData,
  type JobsSettings,
} from "@/data/jobs";
import { apiInternalBase } from "@/lib/api-server";

type ApiJob = {
  id: string;
  referenceCode: string;
  title: string;
  titleAr: string | null;
  location: string;
  locationAr: string | null;
  employmentType: string;
  employmentTypeAr: string | null;
  summary: string;
  summaryAr: string | null;
  emailSubject: string;
  emailSubjectAr: string | null;
  emailBody: string;
  emailBodyAr: string | null;
  isPublished: boolean;
  sortOrder: number;
};

function mapJob(j: ApiJob): JobPosting {
  return {
    id: j.id,
    referenceCode: j.referenceCode,
    title: j.title,
    titleAr: j.titleAr ?? null,
    location: j.location,
    locationAr: j.locationAr ?? null,
    employmentType: j.employmentType,
    employmentTypeAr: j.employmentTypeAr ?? null,
    summary: j.summary,
    summaryAr: j.summaryAr ?? null,
    emailSubject: j.emailSubject,
    emailSubjectAr: j.emailSubjectAr ?? null,
    emailBody: j.emailBody,
    emailBodyAr: j.emailBodyAr ?? null,
    isPublished: Boolean(j.isPublished),
    sortOrder: j.sortOrder ?? 0,
  };
}

function mapSettings(s: Partial<JobsSettings> | undefined): JobsSettings {
  const merged = { ...EMPTY_JOBS_PAGE.settings, ...s };
  /* Keep defaults when API returns blank strings. */
  for (const key of Object.keys(EMPTY_JOBS_PAGE.settings) as Array<
    keyof JobsSettings
  >) {
    if (!String(merged[key] ?? "").trim()) {
      merged[key] = EMPTY_JOBS_PAGE.settings[key];
    }
  }
  return merged;
}

export async function fetchJobsPage(): Promise<JobsPageData> {
  try {
    const res = await fetch(`${apiInternalBase()}/api/jobs`, {
      cache: "no-store",
    });
    if (!res.ok) return EMPTY_JOBS_PAGE;
    const raw = await res.text();
    let json: { settings?: JobsSettings; jobs?: ApiJob[] } = {};
    try {
      json = raw ? (JSON.parse(raw) as typeof json) : {};
    } catch {
      return EMPTY_JOBS_PAGE;
    }
    return {
      settings: mapSettings(json.settings),
      jobs: (json.jobs ?? []).map(mapJob),
    };
  } catch {
    return EMPTY_JOBS_PAGE;
  }
}
