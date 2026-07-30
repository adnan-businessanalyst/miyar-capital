export interface JobPosting {
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
}

export interface JobsSettings {
  hrEmail: string;
  tagEn: string;
  tagAr: string;
  headingEn: string;
  headingAr: string;
  introEn: string;
  introAr: string;
  hrLabelEn: string;
  hrLabelAr: string;
  applyLabelEn: string;
  applyLabelAr: string;
  emptyEn: string;
  emptyAr: string;
  disclaimerEn: string;
  disclaimerAr: string;
}

export interface JobsPageData {
  settings: JobsSettings;
  jobs: JobPosting[];
}

export const EMPTY_JOBS_PAGE: JobsPageData = {
  settings: {
    hrEmail: "",
    tagEn: "",
    tagAr: "",
    headingEn: "",
    headingAr: "",
    introEn: "",
    introAr: "",
    hrLabelEn: "",
    hrLabelAr: "",
    applyLabelEn: "",
    applyLabelAr: "",
    emptyEn: "",
    emptyAr: "",
    disclaimerEn: "",
    disclaimerAr: "",
  },
  jobs: [],
};

export function jobApplicationSubject(
  job: JobPosting,
  lang: "en" | "ar",
): string {
  if (lang === "ar") {
    return (job.emailSubjectAr || job.emailSubject).trim();
  }
  return job.emailSubject.trim();
}

export function jobApplicationBody(job: JobPosting, lang: "en" | "ar"): string {
  if (lang === "ar") {
    return (job.emailBodyAr || job.emailBody).trim();
  }
  return job.emailBody.trim();
}

export function jobMailtoHref(
  job: JobPosting,
  hrEmail: string,
  lang: "en" | "ar",
): string {
  const subject = jobApplicationSubject(job, lang);
  const body = jobApplicationBody(job, lang);
  return `mailto:${hrEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
