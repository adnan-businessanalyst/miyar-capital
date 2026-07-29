"use client";

import { PageHero } from "../components/PageHero";
import { PersonRow } from "../components/PersonRow";
import { EXECUTIVE_TEAM } from "../data/people";
import { useLanguage } from "../i18n/LanguageContext";
import { usePeopleGridReveal } from "../hooks/usePeopleGridReveal";

export function ExecutiveTeam() {
  const { lang } = useLanguage();
  const isAr = lang === "ar";
  const listRef = usePeopleGridReveal(EXECUTIVE_TEAM.length);

  return (
    <div className="page">
      <PageHero
        title={isAr ? "الفريق التنفيذي" : "Executive Team"}
        crumbs={[
          { label: isAr ? "من نحن" : "About", href: "/who-we-are" },
          { label: isAr ? "الفريق التنفيذي" : "Executive Team" },
        ]}
        description={
          isAr
            ? "قيادات ذات خبرة في المالية والحوكمة والاستثمار الإسلامي — تقود استراتيجية مِعيار كابيتال وعملياتها اليومية."
            : "Seasoned leaders in finance, governance, and Islamic investment — guiding Miyar Capital's strategy and day-to-day operations."
        }
      />
      <section className="blk">
        <div className="wrap">
          <div ref={listRef} className="people-rows">
            {EXECUTIVE_TEAM.map((person, i) => (
              <PersonRow key={`${person.name}-${i}`} {...person} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
