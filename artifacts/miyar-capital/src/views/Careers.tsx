"use client";

import { JobsSection } from "../components/JobsSection";
import { PageHero } from "../components/PageHero";
import type { JobsPageData } from "../data/jobs";
import { useLanguage } from "../i18n/LanguageContext";
import { pickLang } from "../site/types";

export function Careers({ data }: { data: JobsPageData }) {
  const { lang } = useLanguage();
  const { settings } = data;
  const tag = pickLang(settings.tagEn, settings.tagAr, lang);
  const heading = pickLang(settings.headingEn, settings.headingAr, lang);
  const intro = pickLang(settings.introEn, settings.introAr, lang);

  return (
    <div className="page">
      <PageHero title={heading} crumb={tag} subtitle={intro} />
      <JobsSection data={data} hideHead />
    </div>
  );
}
