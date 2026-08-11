"use client";

import {
  Briefcase,
  Building2,
  KeyRound,
  Landmark,
  Layers,
  MessageSquareText,
  Sprout,
  type LucideIcon,
} from "lucide-react";
import { PageHero } from "../components/PageHero";
import { PrimaryCard, PrimaryCardGrid } from "../components/PrimaryCard";
import { RegisterInterest } from "../components/RegisterInterest";
import { RichText } from "../components/RichText";
import {
  INSTITUTIONAL_FAMILY_OFFICE,
  type IfoIconId,
} from "../data/institutionalfamilyoffice";
import { useLanguage } from "../i18n/LanguageContext";
import { pickLang } from "../site/types";

const SOURCE_PAGE = "/asset-management/institutional-family-office";

const ICONS: Record<IfoIconId, LucideIcon> = {
  landmark: Landmark,
  briefcase: Briefcase,
  building: Building2,
  sprout: Sprout,
  layers: Layers,
  message: MessageSquareText,
  key: KeyRound,
};

export function InstitutionalFamilyOffice() {
  const { lang } = useLanguage();
  const data = INSTITUTIONAL_FAMILY_OFFICE;

  const renderSection = (id: (typeof data.sectionOrder)[number]) => {
    switch (id) {
      case "intro":
        return (
          <PageHero
            key={id}
            title={pickLang(data.hero.titleEn, data.hero.titleAr, lang)}
            crumbs={[
              {
                label: pickLang(
                  data.hero.crumbAmEn,
                  data.hero.crumbAmAr,
                  lang,
                ),
                href: "/asset-management",
              },
              {
                label: pickLang(
                  data.hero.crumbPageEn,
                  data.hero.crumbPageAr,
                  lang,
                ),
              },
            ]}
            badge={pickLang(data.hero.badgeEn, data.hero.badgeAr, lang)}
            description={pickLang(
              data.hero.descriptionEn,
              data.hero.descriptionAr,
              lang,
            )}
            chips={data.hero.chips.map((chip) => ({
              lead: pickLang(chip.leadEn, chip.leadAr, lang),
              text: pickLang(chip.textEn, chip.textAr, lang),
            }))}
          />
        );

      case "overview":
        return (
          <section key={id} className="blk">
            <div className="wrap">
              <div className="sec-tag">
                {pickLang(data.overview.tagEn, data.overview.tagAr, lang)}
              </div>
              <div className="sec-head">
                <h2>
                  {pickLang(
                    data.overview.headingEn,
                    data.overview.headingAr,
                    lang,
                  )}
                </h2>
              </div>
              <p className="ifo-gold-sub">
                {pickLang(data.overview.subEn, data.overview.subAr, lang)}
              </p>
              <RichText
                as="p"
                className="ifo-body"
                html={pickLang(
                  data.overview.body1En,
                  data.overview.body1Ar,
                  lang,
                )}
              />
              <RichText
                as="p"
                className="ifo-body"
                html={pickLang(
                  data.overview.body2En,
                  data.overview.body2Ar,
                  lang,
                )}
              />

              <h3 className="ifo-h3">
                {pickLang(
                  data.overview.serveHeadingEn,
                  data.overview.serveHeadingAr,
                  lang,
                )}
              </h3>
              <p className="ifo-h3-sub">
                {pickLang(
                  data.overview.serveLeadEn,
                  data.overview.serveLeadAr,
                  lang,
                )}
              </p>

              <PrimaryCardGrid columns={4}>
                {data.overview.serveItems.map((item) => {
                  const Icon = ICONS[item.icon];
                  return (
                    <PrimaryCard
                      key={item.titleEn}
                      icon={<Icon strokeWidth={1.5} />}
                      title={
                        <RichText
                          as="span"
                          html={pickLang(item.titleEn, item.titleAr, lang)}
                        />
                      }
                    >
                      <RichText
                        as="p"
                        html={pickLang(item.bodyEn, item.bodyAr, lang)}
                      />
                    </PrimaryCard>
                  );
                })}
              </PrimaryCardGrid>

              <h3 className="ifo-h3" style={{ marginTop: "64px" }}>
                {pickLang(
                  data.overview.approachHeadingEn,
                  data.overview.approachHeadingAr,
                  lang,
                )}
              </h3>
              <RichText
                as="p"
                className="ifo-body"
                html={pickLang(
                  data.overview.approachBodyEn,
                  data.overview.approachBodyAr,
                  lang,
                )}
              />
            </div>
          </section>
        );

      case "engagement":
        return (
          <section key={id} className="blk blk--cream">
            <div className="wrap">
              <div className="sec-tag">
                {pickLang(
                  data.engagement.tagEn,
                  data.engagement.tagAr,
                  lang,
                )}
              </div>
              <div className="sec-head">
                <h2>
                  {pickLang(
                    data.engagement.headingEn,
                    data.engagement.headingAr,
                    lang,
                  )}
                </h2>
              </div>
              <p className="ifo-gold-sub">
                {pickLang(
                  data.engagement.subEn,
                  data.engagement.subAr,
                  lang,
                )}
              </p>

              <PrimaryCardGrid columns={3}>
                {data.engagement.items.map((item) => {
                  const Icon = ICONS[item.icon];
                  return (
                    <PrimaryCard
                      key={item.titleEn}
                      icon={<Icon strokeWidth={1.5} />}
                      title={pickLang(item.titleEn, item.titleAr, lang)}
                    >
                      <RichText
                        as="p"
                        html={pickLang(item.bodyEn, item.bodyAr, lang)}
                      />
                    </PrimaryCard>
                  );
                })}
              </PrimaryCardGrid>

              <div className="ifo-gov-block">
                <RichText
                  as="h4"
                  html={pickLang(
                    data.engagement.govHeadingEn,
                    data.engagement.govHeadingAr,
                    lang,
                  )}
                />
                <RichText
                  as="p"
                  html={pickLang(
                    data.engagement.govBodyEn,
                    data.engagement.govBodyAr,
                    lang,
                  )}
                />
              </div>

              <div style={{ marginTop: "40px" }}>
                <RegisterInterest
                  sourcePage={SOURCE_PAGE}
                  buttonLabel={pickLang(
                    data.engagement.ctaEn,
                    data.engagement.ctaAr,
                    lang,
                  )}
                  className="btn btn-gold"
                />
              </div>
            </div>
          </section>
        );

      case "notes":
        return (
          <section key={id} className="blk ifo-notes">
            <div className="wrap">
              <RichText
                as="p"
                className="ifo-notes-title"
                html={pickLang(
                  data.notes.titleEn,
                  data.notes.titleAr,
                  lang,
                )}
              />
              <ol className="ifo-note-list">
                {data.notes.items.map((note) => (
                  <li key={note.num}>
                    <span className="ifo-note-num">{note.num}</span>
                    <RichText
                      as="p"
                      html={pickLang(note.bodyEn, note.bodyAr, lang)}
                    />
                  </li>
                ))}
              </ol>
              <RichText
                as="p"
                className="ifo-closing"
                html={pickLang(
                  data.notes.closingEn,
                  data.notes.closingAr,
                  lang,
                )}
              />
            </div>
          </section>
        );

      default:
        return null;
    }
  };

  return (
    <div className="page">{data.sectionOrder.map(renderSection)}</div>
  );
}
