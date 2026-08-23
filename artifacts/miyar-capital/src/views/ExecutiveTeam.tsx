"use client";

import { PageHero } from "../components/PageHero";
import { PersonRow } from "../components/PersonRow";
import { EXECUTIVE_TEAM } from "../data/people";
import { useLanguage } from "../i18n/LanguageContext";
import { usePeopleGridReveal } from "../hooks/usePeopleGridReveal";
import { ORGANIZATIONAL_CHART_IMAGE } from "../site/executiveImages";

export function ExecutiveTeam() {
  const { lang } = useLanguage();
  const isAr = lang === "ar";
  const listRef = usePeopleGridReveal(EXECUTIVE_TEAM.length);
  const orgTitle = isAr ? "الهيكل التنظيمي" : "Organizational Structure";

  return (
    <div className="page page--executive-team">
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
      <section className="blk hierarchy-sec">
        <div className="wrap">
          <div className="hierarchy hierarchy--image">
            <h2 className="hierarchy-title">{orgTitle}</h2>
            {ORGANIZATIONAL_CHART_IMAGE ? (
              <figure className="hierarchy-org-figure">
                <img
                  className="hierarchy-org-img"
                  src={ORGANIZATIONAL_CHART_IMAGE}
                  alt={orgTitle}
                />
              </figure>
            ) : null}
          </div>
        </div>
      </section>
      <section className="blk">
        <div className="wrap">
          <div ref={listRef} className="people-rows">
            {EXECUTIVE_TEAM.map((person, i) => (
              <PersonRow key={`${person.id ?? person.name}-${i}`} {...person} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
