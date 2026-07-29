"use client";

import { PageHero } from "../components/PageHero";
import { PersonRow } from "../components/PersonRow";
import { BOARD_MEMBERS } from "../data/people";
import { useLanguage } from "../i18n/LanguageContext";
import { usePeopleGridReveal } from "../hooks/usePeopleGridReveal";

export function BoardOfDirectors() {
  const { lang } = useLanguage();
  const isAr = lang === "ar";
  const listRef = usePeopleGridReveal(BOARD_MEMBERS.length);

  return (
    <div className="page">
      <PageHero
        title={isAr ? "مجلس الإدارة" : "Board of Directors"}
        crumbs={[
          { label: isAr ? "من نحن" : "About", href: "/who-we-are" },
          { label: isAr ? "مجلس الإدارة" : "Board of Directors" },
        ]}
        description={
          isAr
            ? "مجلس إدارة مستقل يضع الاستراتيجية ويعزز الحوكمة المتوافقة مع الشريعة ويحمي ثقة عملاء مِعيار كابيتال على المدى الطويل."
            : "An independent board that sets strategy, upholds Shariah-aligned governance, and stewards Miyar Capital for long-term client trust."
        }
      />
      <section className="blk">
        <div className="wrap">
          <div ref={listRef} className="people-rows">
            {BOARD_MEMBERS.map((person, i) => (
              <PersonRow key={`${person.name}-${i}`} {...person} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
