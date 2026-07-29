"use client";

import type { Person } from "../data/people";
import { useLanguage } from "../i18n/LanguageContext";
import { pickLang } from "../site/types";

export function PersonRow({
  name,
  nameAr,
  role,
  roleAr,
  photo,
  bio,
  bioAr,
  initials,
}: Person) {
  const { lang } = useLanguage();
  const displayName = pickLang(name, nameAr, lang);
  const displayRole = pickLang(role, roleAr, lang);
  const displayBio = pickLang(bio ?? "", bioAr ?? "", lang);
  const label =
    initials ?? name.replace(/[^A-Za-z]/g, "").slice(0, 2).toUpperCase();

  return (
    <article className="person-row">
      <div className={`person-row-media${!photo ? " person-row-media--placeholder" : ""}`}>
        {photo ? (
          <img src={photo} alt={displayName} loading="lazy" />
        ) : (
          <span className="person-row-initials" aria-hidden="true">
            {label}
          </span>
        )}
      </div>
      <div className="person-row-body">
        <div className="person-row-role">{displayRole}</div>
        <h3 className="person-row-name">{displayName}</h3>
        {displayBio ? <p className="person-row-bio">{displayBio}</p> : null}
      </div>
    </article>
  );
}
