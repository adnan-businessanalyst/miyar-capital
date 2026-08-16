"use client";

import { Globe2, MapPinned, type LucideIcon } from "lucide-react";
import { CoreCapabilities } from "../components/CoreCapabilities";
import { Factsheet } from "../components/Factsheet";
import { PrimaryCard, PrimaryCardGrid } from "../components/PrimaryCard";
import { PageHero } from "../components/PageHero";
import { RegisterInterestSection } from "../components/RegisterInterestSection";
import { RichText } from "../components/RichText";
import { ScrollExamples } from "../components/ScrollExamples";
import { SectionHead } from "../components/SectionHead";
import {
  EQUITY_MANAGEMENT,
  type EquityManagementOfferIconId,
} from "../data/equitymanagement";
import { useLanguage } from "../i18n/LanguageContext";
import { pickLang } from "../site/types";

const OFFER_ICONS: Record<EquityManagementOfferIconId, LucideIcon> = {
  local: MapPinned,
  regional: Globe2,
};

export function EquityManagement() {
  const { lang } = useLanguage();
  const data = EQUITY_MANAGEMENT;

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
          />
        );
      case "offer":
        return (
          <section key={id} className="blk blk--cream">
            <div className="wrap">
              <div className="prod-body">
                <div>
                  <SectionHead
                    title={pickLang(
                      data.intro.headingEn,
                      data.intro.headingAr,
                      lang,
                    )}
                  />
                  <RichText
                    as="p"
                    className="eq-rich"
                    html={pickLang(data.intro.bodyEn, data.intro.bodyAr, lang)}
                  />
                </div>
                <Factsheet
                  title={pickLang(
                    data.productOverview.headingEn,
                    data.productOverview.headingAr,
                    lang,
                  )}
                  rows={data.productOverview.rows.map((row) => ({
                    label: pickLang(row.labelEn, row.labelAr, lang),
                    value: pickLang(row.valueEn, row.valueAr, lang),
                  }))}
                />
              </div>
            </div>
          </section>
        );
      case "capabilities":
        return (
          <section key={id} className="blk">
            <div className="wrap">
              <SectionHead
                title={pickLang(
                  data.capabilities.headingEn,
                  data.capabilities.headingAr,
                  lang,
                )}
              />
              <CoreCapabilities
                items={data.capabilities.items.map((item) => ({
                  title: pickLang(item.titleEn, item.titleAr, lang),
                  body: pickLang(item.bodyEn, item.bodyAr, lang),
                }))}
              />
            </div>
          </section>
        );
      case "what-we-offer":
        return (
          <section key={id} className="blk">
            <div className="wrap">
              <SectionHead
                center
                title={pickLang(
                  data.offers.headingEn,
                  data.offers.headingAr,
                  lang,
                )}
              />
              <PrimaryCardGrid>
                {data.offers.items.map((item) => {
                  const Icon = OFFER_ICONS[item.icon];
                  return (
                    <PrimaryCard
                      key={item.titleEn}
                      logo
                      icon={<Icon strokeWidth={1.5} />}
                      title={pickLang(item.titleEn, item.titleAr, lang)}
                    >
                      <RichText
                        as="div"
                        className="eq-rich"
                        html={pickLang(item.bodyEn, item.bodyAr, lang)}
                      />
                    </PrimaryCard>
                  );
                })}
              </PrimaryCardGrid>
            </div>
          </section>
        );
      case "examples": {
        const labels = data.examples.labels;
        const scrollItems = data.examples.items.map((item) => ({
          title: pickLang(item.titleEn, item.titleAr, lang),
          body: pickLang(item.bodyEn, item.bodyAr, lang),
          meta: [
            {
              label: pickLang(
                labels.acquisitionYearEn,
                labels.acquisitionYearAr,
                lang,
              ),
              value: pickLang(
                item.acquisitionYearEn,
                item.acquisitionYearAr,
                lang,
              ),
            },
            {
              label: pickLang(labels.stakeEn, labels.stakeAr, lang),
              value: pickLang(item.stakeEn, item.stakeAr, lang),
            },
            {
              label: pickLang(labels.geographyEn, labels.geographyAr, lang),
              value: pickLang(item.geographyEn, item.geographyAr, lang),
            },
            {
              label: pickLang(labels.stageEn, labels.stageAr, lang),
              value: pickLang(item.stageEn, item.stageAr, lang),
            },
          ],
        }));
        return (
          <section key={id} className="blk blk--cream">
            <div className="wrap">
              <SectionHead
                center
                title={pickLang(
                  data.examples.headingEn,
                  data.examples.headingAr,
                  lang,
                )}
                subtitle={pickLang(
                  data.examples.introEn,
                  data.examples.introAr,
                  lang,
                )}
              />
              <ScrollExamples
                items={scrollItems}
                ariaLabel={pickLang(
                  data.examples.headingEn,
                  data.examples.headingAr,
                  lang,
                )}
              />
            </div>
          </section>
        );
      }
      default:
        return null;
    }
  };

  return (
    <div className="page page--equity-management">
      {data.sectionOrder.map((id) => renderSection(id))}
      <RegisterInterestSection
        sourcePage="/asset-management/equity-management"
        pageTitleEn="Equity Management"
        pageTitleAr="إدارة الأسهم"
        titleEn={data.contact.titleEn}
        titleAr={data.contact.titleAr}
        bodyEn={data.contact.bodyEn}
        bodyAr={data.contact.bodyAr}
        buttonLabelEn={data.contact.buttonEn}
        buttonLabelAr={data.contact.buttonAr}
        modalTitleEn={data.contact.buttonEn}
        modalTitleAr={data.contact.buttonAr}
        disclaimerLeadEn={data.disclaimer.leadEn}
        disclaimerLeadAr={data.disclaimer.leadAr}
        disclaimerBodyEn={data.disclaimer.bodyEn}
        disclaimerBodyAr={data.disclaimer.bodyAr}
      />
    </div>
  );
}
