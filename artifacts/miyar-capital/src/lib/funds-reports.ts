import {
  EMPTY_FUNDS_REPORTS_PAGE,
  EMPTY_FUNDS_REPORTS_SETTINGS,
  type FundsReportCard,
  type FundsReportFund,
  type FundsReportsPageData,
  type FundsReportsSettings,
} from "@/data/fundsreports";
import { apiInternalBase } from "@/lib/api-server";

type ApiReport = {
  id: string;
  section?: string;
  title: string;
  titleAr: string | null;
  date: string;
  dateAr: string | null;
  hasFile: boolean;
  hasArabicFile: boolean;
  fileUrl: string | null;
  fileUrlAr: string | null;
  fileName: string | null;
  fileNameAr: string | null;
};

type ApiFund = {
  id: string;
  slug: string;
  title: string;
  titleAr: string | null;
  description: string;
  descriptionAr: string | null;
  reports?: ApiReport[];
};

function mapCard(r: ApiReport): FundsReportCard {
  const section =
    r.section === "voting_policy" ||
    r.section === "terms_and_conditions" ||
    r.section === "quarterly_disclosures"
      ? r.section
      : "quarterly_disclosures";
  return {
    id: r.id,
    section,
    titleEn: r.title,
    titleAr: r.titleAr ?? "",
    dateEn: r.date,
    dateAr: r.dateAr ?? "",
    hasFile: Boolean(r.hasFile),
    hasArabicFile: Boolean(r.hasArabicFile),
    fileUrl: r.fileUrl,
    fileUrlAr: r.fileUrlAr,
    fileName: r.fileName,
    fileNameAr: r.fileNameAr,
  };
}

function mapFund(f: ApiFund): FundsReportFund {
  return {
    id: f.id,
    slug: f.slug,
    titleEn: f.title,
    titleAr: f.titleAr ?? "",
    descriptionEn: f.description,
    descriptionAr: f.descriptionAr ?? "",
    cards: (f.reports ?? []).map(mapCard),
  };
}

function mapSettings(
  s: Partial<FundsReportsSettings> | undefined,
): FundsReportsSettings {
  return { ...EMPTY_FUNDS_REPORTS_SETTINGS, ...s };
}

export async function fetchFundsReportsPage(): Promise<FundsReportsPageData> {
  try {
    const res = await fetch(`${apiInternalBase()}/api/funds`, {
      cache: "no-store",
    });
    if (!res.ok) return EMPTY_FUNDS_REPORTS_PAGE;
    const json = (await res.json()) as {
      settings?: FundsReportsSettings;
      funds?: ApiFund[];
    };
    return {
      settings: mapSettings(json.settings),
      funds: (json.funds ?? []).map(mapFund),
    };
  } catch {
    return EMPTY_FUNDS_REPORTS_PAGE;
  }
}

export async function fetchFundBySlug(
  slug: string,
): Promise<{
  settings: FundsReportsSettings;
  fund: FundsReportFund;
} | null> {
  try {
    const res = await fetch(
      `${apiInternalBase()}/api/funds/${encodeURIComponent(slug)}`,
      { cache: "no-store" },
    );
    if (!res.ok) return null;
    const json = (await res.json()) as {
      settings?: FundsReportsSettings;
      fund?: ApiFund;
    };
    if (!json.fund) return null;
    return {
      settings: mapSettings(json.settings),
      fund: mapFund(json.fund),
    };
  } catch {
    return null;
  }
}
