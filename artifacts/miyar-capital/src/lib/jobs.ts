import {
  EMPTY_JOBS_PAGE,
  EMPTY_JOBS_SETTINGS,
  type JobPosting,
  type JobsPageData,
  type JobsSettings,
} from "@/data/jobs";
import { apiInternalBase } from "@/lib/api-server";

type ApiJob = {
  id: string;
  slug: string;
  referenceCode: string;
  title: string;
  titleAr: string | null;
  location: string;
  locationAr: string | null;
  employmentType: string;
  employmentTypeAr: string | null;
  summary: string;
  summaryAr: string | null;
  description?: string | null;
  descriptionAr?: string | null;
  howToApply?: string | null;
  howToApplyAr?: string | null;
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
    slug: j.slug,
    referenceCode: j.referenceCode,
    title: j.title,
    titleAr: j.titleAr ?? null,
    location: j.location,
    locationAr: j.locationAr ?? null,
    employmentType: j.employmentType,
    employmentTypeAr: j.employmentTypeAr ?? null,
    summary: j.summary,
    summaryAr: j.summaryAr ?? null,
    description: j.description ?? "",
    descriptionAr: j.descriptionAr ?? null,
    howToApply: j.howToApply ?? "",
    howToApplyAr: j.howToApplyAr ?? null,
    emailSubject: j.emailSubject,
    emailSubjectAr: j.emailSubjectAr ?? null,
    emailBody: j.emailBody,
    emailBodyAr: j.emailBodyAr ?? null,
    isPublished: Boolean(j.isPublished),
    sortOrder: j.sortOrder ?? 0,
  };
}

function mapSettings(s: Partial<JobsSettings> | undefined): JobsSettings {
  const merged = { ...EMPTY_JOBS_SETTINGS, ...s };
  for (const key of Object.keys(EMPTY_JOBS_SETTINGS) as Array<
    keyof JobsSettings
  >) {
    if (!String(merged[key] ?? "").trim()) {
      merged[key] = EMPTY_JOBS_SETTINGS[key];
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

export async function fetchJobBySlug(
  slug: string,
): Promise<{ settings: JobsSettings; job: JobPosting } | null> {
  try {
    const res = await fetch(
      `${apiInternalBase()}/api/jobs/${encodeURIComponent(slug)}`,
      { cache: "no-store" },
    );
    if (!res.ok) return null;
    const json = (await res.json()) as {
      settings?: JobsSettings;
      job?: ApiJob;
    };
    if (!json.job?.slug) return null;
    return {
      settings: mapSettings(json.settings),
      job: mapJob(json.job),
    };
  } catch {
    return null;
  }
}
