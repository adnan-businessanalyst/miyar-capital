"use client";

import { PageHero } from "../components/PageHero";
import { PersonRow } from "../components/PersonRow";
import { BOARD_INTRO, BOARD_MEMBERS } from "../data/people";
import { useLanguage } from "../i18n/LanguageContext";
import { usePeopleGridReveal } from "../hooks/usePeopleGridReveal";

export function BoardOfDirectors() {
  const { lang } = useLanguage();
  const isAr = lang === "ar";
  const listRef = usePeopleGridReveal(BOARD_MEMBERS.length);
  const introParas = isAr ? BOARD_INTRO.parasAr : BOARD_INTRO.parasEn;

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
            ? ""
            : ""
        }
      />
      <section className="blk blk--cream">
        <div className="wrap">
          <div
            className="board-intro"
            lang={isAr ? "ar" : "en"}
            dir={isAr ? "rtl" : "ltr"}
          >
            {introParas.map((para) => (
              <p key={para.slice(0, 40)}>{para}</p>
            ))}
          </div>
        </div>
      </section>
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
