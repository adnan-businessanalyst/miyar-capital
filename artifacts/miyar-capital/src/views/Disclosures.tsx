"use client";

import { PageHero } from "../components/PageHero";
import { Accordion, type AccordionItem } from "../components/Accordion";
import { SectionHead } from "../components/SectionHead";
import type { Disclosure } from "../data/disclosures";
import { useLanguage } from "../i18n/LanguageContext";
import { apiUrl } from "../lib/api";

interface DisclosuresProps {
  disclosures: Disclosure[];
  loadError?: string;
}

export function Disclosures({ disclosures, loadError }: DisclosuresProps) {
  const { lang } = useLanguage();
  const isAr = lang === "ar";

  const items: AccordionItem[] = disclosures.map((d) => {
    const title = (isAr ? d.titleAr : d.title) || d.title;
    const body = (isAr ? d.bodyAr : d.body) || d.body;
    const useArabicFile = isAr && d.hasArabicFile && d.fileUrlAr;
    const fileUrl = useArabicFile ? d.fileUrlAr! : d.fileUrl;
    return {
      title,
      body,
      action: isAr ? "عرض الملف المرفق" : "View Attached File",
      actionHref: fileUrl ? apiUrl(fileUrl) : undefined,
    };
  });

  return (
    <div className="page">
      <PageHero
        title={isAr ? "الإفصاحات" : "Disclosures"}
        crumb={isAr ? "الإفصاحات" : "Disclosures"}
      />

      <section className="blk">
        <div className="wrap">
          <SectionHead
            center
            title={isAr ? "الإفصاحات" : "Disclosures"}
          />
          {loadError ? (
            <p style={{ color: "#b42318" }}>{loadError}</p>
          ) : items.length === 0 ? (
            <p style={{ color: "var(--muted)", textAlign: "center" }}>
              {isAr
                ? "لا توجد إفصاحات منشورة حالياً."
                : "No disclosures published yet."}
            </p>
          ) : (
            <Accordion items={items} />
          )}
        </div>
      </section>
    </div>
  );
}
