/**
 * PersonRow — Localized horizontal person row with photo, name, role, and bio.
 *
 * Used by:
 * - views/BoardOfDirectors.tsx
 * - views/ExecutiveTeam.tsx
 */

"use client";

import { resolvePersonPhoto, type Person } from "../data/people";
import { useLanguage } from "../i18n/LanguageContext";
import { pickLang } from "../site/types";

export function PersonRow({
  name,
  nameAr,
  role,
  roleAr,
  photo,
  gender = "male",
  bio,
  bioAr,
}: Person) {
  const { lang } = useLanguage();
  const displayName = pickLang(name, nameAr, lang);
  const displayRole = pickLang(role, roleAr, lang);
  const displayBio = pickLang(bio ?? "", bioAr ?? "", lang);
  const resolvedPhoto = resolvePersonPhoto(photo, gender);

  return (
    <article className="person-row">
      <div
        className={[
          "person-row-media",
          photo ? "" : "person-row-media--placeholder",
        ]
          .filter(Boolean)
          .join(" ")}
      >
        <img src={resolvedPhoto} alt={displayName} loading="lazy" />
      </div>
      <div className="person-row-body">
        <div className="person-row-role">{displayRole}</div>
        <h3 className="person-row-name">{displayName}</h3>
        {displayBio ? <p className="person-row-bio">{displayBio}</p> : null}
      </div>
    </article>
  );
}
