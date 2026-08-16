"use client";

import {
  Briefcase,
  Building2,
  ClipboardList,
  KeyRound,
  Landmark,
  Layers,
  MessageSquareText,
  Sprout,
  type LucideIcon,
} from "lucide-react";
import { Fragment } from "react";
import { PageHero } from "../components/PageHero";
import { PrimaryCard, PrimaryCardGrid } from "../components/PrimaryCard";
import { RegisterInterestSection } from "../components/RegisterInterestSection";
import { RichText } from "../components/RichText";
import { SectionHead } from "../components/SectionHead";
import { Steps } from "../components/Steps";
import {
  INSTITUTIONAL_FAMILY_OFFICE,
  type IfoIconId,
  type IfoSectionId,
} from "../data/institutionalfamilyoffice";
import { useResolvedMedia } from "../hooks/useResolvedMedia";
import { useLanguage } from "../i18n/LanguageContext";
import { pickLang } from "../site/types";

const SOURCE_PAGE = "/asset-management/institutional-family-office";
const INTRO_MEDIA_BASENAME = "private_offers";

const ICONS: Record<IfoIconId, LucideIcon> = {
  landmark: Landmark,
  briefcase: Briefcase,
  building: Building2,
  sprout: Sprout,
  layers: Layers,
  message: MessageSquareText,
  key: KeyRound,
  clipboard: ClipboardList,
};

export function InstitutionalFamilyOffice() {
  const { lang } = useLanguage();
  const data = INSTITUTIONAL_FAMILY_OFFICE;
  const introImg = useResolvedMedia("content", INTRO_MEDIA_BASENAME);

  const renderSection = (id: IfoSectionId) => {
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
            description={pickLang(
              data.hero.descriptionEn,
              data.hero.descriptionAr,
              lang,
            )}
            meta={data.hero.meta.map((item) => ({
              label: pickLang(item.labelEn, item.labelAr, lang),
              value: pickLang(item.valueEn, item.valueAr, lang),
            }))}
          />
        );

      case "overview":
        return (
          <section key={id} className="blk">
            <div className="wrap">
              <div className="pi-intro">
                <div className="pi-intro-text">
                  <SectionHead
                    title={pickLang(
                      data.overview.tagEn,
                      data.overview.tagAr,
                      lang,
                    )}
                    subtitle={pickLang(
                      data.overview.headingEn,
                      data.overview.headingAr,
                      lang,
                    )}
                  />
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
                </div>
                <div
                  className="pi-intro-img"
                  role="img"
                  aria-label={pickLang(
                    data.hero.titleEn,
                    data.hero.titleAr,
                    lang,
                  )}
                  style={
                    introImg
                      ? { backgroundImage: `url(${introImg})` }
                      : undefined
                  }
                />
              </div>
            </div>
          </section>
        );

      case "serve":
        return (
          <section key={id} className="blk blk--cream">
            <div className="wrap">
              <SectionHead
                title={pickLang(
                  data.serve.headingEn,
                  data.serve.headingAr,
                  lang,
                )}
              />
              <PrimaryCardGrid columns={4}>
                {data.serve.items.map((item) => {
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
            </div>
          </section>
        );

      case "approach":
        return (
          <section key={id} className="blk">
            <div className="wrap">
              <SectionHead
                title={pickLang(
                  data.approach.headingEn,
                  data.approach.headingAr,
                  lang,
                )}
              />
              <Steps
                items={data.approach.steps.map((step) => ({
                  num: step.num,
                  title: pickLang(step.titleEn, step.titleAr, lang),
                  body: pickLang(step.bodyEn, step.bodyAr, lang),
                }))}
              />
            </div>
          </section>
        );

      case "engagement":
        return (
          <section key={id} className="blk blk--cream">
            <div className="wrap">
              <SectionHead
                title={pickLang(
                  data.engagement.tagEn,
                  data.engagement.tagAr,
                  lang,
                )}
                subtitle={pickLang(
                  data.engagement.headingEn,
                  data.engagement.headingAr,
                  lang,
                )}
              />

              <PrimaryCardGrid columns={2}>
                {data.engagement.items.map((item) => {
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
                html={pickLang(data.notes.titleEn, data.notes.titleAr, lang)}
              />
              <ol className="ifo-note-list">
                {data.notes.items.map((note) => (
                  <li key={note.numEn}>
                    <span className="ifo-note-num">
                      {pickLang(note.numEn, note.numAr, lang)}
                    </span>
                    <RichText
                      as="p"
                      html={pickLang(note.bodyEn, note.bodyAr, lang)}
                    />
                  </li>
                ))}
              </ol>
            </div>
          </section>
        );

      default:
        return null;
    }
  };

  return (
    <div className="page">
      {data.sectionOrder.map((id) => (
        <Fragment key={id}>
          {id === "notes" ? (
            <RegisterInterestSection
              sourcePage={SOURCE_PAGE}
              pageTitleEn="Institutional & Family Office"
              pageTitleAr="المؤسسات والمكاتب العائلية"
              titleEn={data.contact.titleEn}
              titleAr={data.contact.titleAr}
              bodyEn={data.contact.bodyEn}
              bodyAr={data.contact.bodyAr}
              buttonLabelEn={data.contact.buttonEn}
              buttonLabelAr={data.contact.buttonAr}
              modalTitleEn={data.contact.buttonEn}
              modalTitleAr={data.contact.buttonAr}
            />
          ) : null}
          {renderSection(id)}
        </Fragment>
      ))}
    </div>
  );
}
