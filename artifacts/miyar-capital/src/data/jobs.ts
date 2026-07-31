export interface JobPosting {
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
  description: string;
  descriptionAr: string | null;
  howToApply: string;
  howToApplyAr: string | null;
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

export const EMPTY_JOBS_SETTINGS: JobsSettings = {
  hrEmail: "hr@miyarcapital.com.sa",
  tagEn: "Careers",
  tagAr: "الوظائف",
  headingEn: "Join Miyar Capital",
  headingAr: "انضم إلى معيار المالية",
  introEn:
    "Explore open roles and select a position for details and how to apply.",
  introAr:
    "اطّلع على الوظائف الشاغرة واختر وظيفة لمعرفة التفاصيل وطريقة التقديم.",
  hrLabelEn: "HR email:",
  hrLabelAr: "بريد الموارد البشرية:",
  applyLabelEn: "Apply by email",
  applyLabelAr: "قدّم عبر البريد",
  emptyEn: "There are no open positions at this time. Please check back later.",
  emptyAr: "لا توجد وظائف شاغرة حاليًا. يرجى المراجعة لاحقًا.",
  disclaimerEn:
    "Important: the email subject and body must match exactly as provided. Applications with altered subject or body may not be processed.",
  disclaimerAr:
    "مهم: يجب أن يتطابق موضوع الرسالة ونصها تمامًا كما هو موضح. قد لا تُعالَج الطلبات ذات الموضوع أو النص المعدّل.",
};

export const EMPTY_JOBS_PAGE: JobsPageData = {
  settings: EMPTY_JOBS_SETTINGS,
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

export function splitJobParagraphs(text: string): string[] {
  return text
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean);
}
