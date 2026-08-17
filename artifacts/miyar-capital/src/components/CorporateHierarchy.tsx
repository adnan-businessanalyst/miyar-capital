/**
 * CorporateHierarchy — Renders an organizational chart from a flat member list grouped by reporting level.
 *
 * Used by:
 * - views/ExecutiveTeam.tsx
 */

"use client";

import { useMemo } from "react";
import {
  groupMembersByLevel,
  type HierarchyMember,
} from "../data/hierarchy";
import { getExecutiveById, resolvePersonPhoto } from "../data/people";
import { useLanguage } from "../i18n/LanguageContext";
import { pickLang } from "../site/types";

export interface CorporateHierarchyProps {
  /**
   * Flat list of org members. Customize each entry's:
   * - `level` — which row / shade
   * - `reportsTo` — id of their direct higher-up
   */
  members: HierarchyMember[];
}

function HierarchyCard({ member }: { member: HierarchyMember }) {
  const { lang } = useLanguage();
  const person = member.personId
    ? getExecutiveById(member.personId)
    : undefined;
  const title = pickLang(
    member.title ?? person?.role ?? "",
    member.titleAr ?? person?.roleAr ?? "",
    lang,
  );
  const name = person
    ? pickLang(person.name, person.nameAr, lang)
    : member.name || member.nameAr
      ? pickLang(member.name ?? "", member.nameAr ?? "", lang)
      : null;
  const level = Math.max(1, Math.floor(member.level) || 1);
  const photo = resolvePersonPhoto(person?.photo, person?.gender ?? "male");

  return (
    <article
      className="hierarchy-card"
      data-level={Math.min(level, 8)}
      data-hierarchy-id={member.id}
      data-reports-to={member.reportsTo ?? undefined}
    >
      <div className="hierarchy-card-media">
        <img src={photo} alt={name ?? title} loading="lazy" />
      </div>
      <div className="hierarchy-card-body">
        {name ? <h3 className="hierarchy-card-name">{name}</h3> : null}
        <p className="hierarchy-card-title">{title}</p>
      </div>
    </article>
  );
}

export function CorporateHierarchy({ members }: CorporateHierarchyProps) {
  const { lang } = useLanguage();
  const isAr = lang === "ar";
  const levels = useMemo(() => groupMembersByLevel(members), [members]);

  return (
    <div className="hierarchy">
      <h2 className="hierarchy-title">
        {isAr ? "الهيكل التنظيمي" : "Organizational Structure"}
      </h2>

      <div
        className="hierarchy-chart"
        role="tree"
        aria-label={isAr ? "الهيكل التنظيمي" : "Organizational Structure"}
      >
        <div className="hierarchy-levels">
          {levels.map(({ level, members: row }, index) => (
            <div
              key={level}
              className={`hierarchy-level${index === 0 ? " is-first" : ""}`}
              data-level={Math.min(level, 8)}
            >
              <ul className="hierarchy-level-row" role="group">
                {row.map((member) => (
                  <li key={member.id} className="hierarchy-level-item">
                    <HierarchyCard member={member} />
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
