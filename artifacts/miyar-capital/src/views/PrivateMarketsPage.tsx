"use client";

import { CoreCapabilities } from "../components/CoreCapabilities";
import { Factsheet } from "../components/Factsheet";
import { PageHero } from "../components/PageHero";
import { RegisterInterestSection } from "../components/RegisterInterestSection";
import { RichText } from "../components/RichText";
import { SectionHead } from "../components/SectionHead";
import {
  PRIVATE_MARKETS,
  type PrivateMarketsSectionId,
} from "../data/privatemarkets";
import { useLanguage } from "../i18n/LanguageContext";
import { pickLang } from "../site/types";

const SOURCE_PAGE = "/asset-management/private-markets";

export function PrivateMarketsPage() {
  const { lang } = useLanguage();
  const data = PRIVATE_MARKETS;

  const renderSection = (id: PrivateMarketsSectionId) => {
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

      case "overview":
        return (
          <section key={id} className="blk blk--cream">
            <div className="wrap">
              <div className="eq-approach">
                <div className="eq-col">
                  <SectionHead
                    title={pickLang(
                      data.overview.introTagEn,
                      data.overview.introTagAr,
                      lang,
                    )}
                    subtitle={pickLang(
                      data.overview.approachHeadingEn,
                      data.overview.approachHeadingAr,
                      lang,
                    )}
                  />
                  <RichText
                    as="p"
                    html={pickLang(
                      data.overview.approachBodyEn,
                      data.overview.approachBodyAr,
                      lang,
                    )}
                  />
                </div>
                <div className="eq-col">
                  <Factsheet
                    title={pickLang(
                      data.overview.productHeadingEn,
                      data.overview.productHeadingAr,
                      lang,
                    )}
                    rows={data.overview.facts.map((fact) => ({
                      label: pickLang(fact.labelEn, fact.labelAr, lang),
                      value: pickLang(fact.valueEn, fact.valueAr, lang),
                    }))}
                  />
                </div>
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

      case "contact":
        return (
          <RegisterInterestSection
            key={id}
            sourcePage={SOURCE_PAGE}
            pageTitleEn="Private Markets"
            pageTitleAr="الأسواق الخاصة"
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
        );

      default:
        return null;
    }
  };

  return (
    <div className="page">
      {data.sectionOrder.map((id) => renderSection(id))}
    </div>
  );
}
