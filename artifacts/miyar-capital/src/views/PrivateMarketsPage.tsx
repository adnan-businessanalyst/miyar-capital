"use client";

import { Fragment } from "react";
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
                  <SectionHead
                    title={pickLang(
                      data.overview.productHeadingEn,
                      data.overview.productHeadingAr,
                      lang,
                    )}
                  />
                  <dl className="eq-fact-list">
                    {data.overview.facts.map((fact) => (
                      <Fragment key={fact.labelEn}>
                        <dt>
                          {pickLang(fact.labelEn, fact.labelAr, lang)}
                        </dt>
                        <dd>
                          {pickLang(fact.valueEn, fact.valueAr, lang)}
                        </dd>
                      </Fragment>
                    ))}
                  </dl>
                </div>
              </div>
            </div>
          </section>
        );

      case "capabilities":
        return (
          <section key={id} className="blk">
            <div className="wrap">
              <div className="eq-cap-head">
                <SectionHead
                  title={pickLang(
                    data.capabilities.headingEn,
                    data.capabilities.headingAr,
                    lang,
                  )}
                />
              </div>
            </div>

            <div className="cap-rows">
              {data.capabilities.items.map((item) => (
                <div
                  key={item.titleEn}
                  className={`cap-row cap-row--${item.layout}`}
                >
                  <div
                    className="cap-img"
                    role="img"
                    aria-label={pickLang(item.ariaEn, item.ariaAr, lang)}
                  />
                  <div className="cap-text">
                    <h3>
                      {pickLang(item.titleEn, item.titleAr, lang)}
                    </h3>
                    <RichText
                      as="p"
                      html={pickLang(item.bodyEn, item.bodyAr, lang)}
                    />
                  </div>
                </div>
              ))}
            </div>
          </section>
        );

      case "cta":
        return (
          <section key={id} className="blk eq-cta">
            <div className="wrap eq-cta-inner">
              <SectionHead
                center
                title={pickLang(data.cta.headingEn, data.cta.headingAr, lang)}
              />
              <RichText
                as="p"
                html={pickLang(data.cta.bodyEn, data.cta.bodyAr, lang)}
              />
            </div>
          </section>
        );

      case "disclaimer":
        return (
          <div key={id} className="disclaimer">
            <div className="wrap">
              <b>
                {pickLang(
                  data.disclaimer.leadEn,
                  data.disclaimer.leadAr,
                  lang,
                )}
              </b>{" "}
              {pickLang(data.disclaimer.bodyEn, data.disclaimer.bodyAr, lang)}
            </div>
          </div>
        );

      case "disclosure":
        return (
          <section key={id} className="blk">
            <div className="disclaimer">
              <div className="wrap">
                <b>
                  {pickLang(
                    data.disclosure.titleEn,
                    data.disclosure.titleAr,
                    lang,
                  )}
                </b>{" "}
                <RichText
                  as="span"
                  html={pickLang(
                    data.disclosure.bodyEn,
                    data.disclosure.bodyAr,
                    lang,
                  )}
                />
              </div>
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
          {id === "disclaimer" ? (
            <RegisterInterestSection
              sourcePage={SOURCE_PAGE}
              pageTitleEn="Private Markets"
              pageTitleAr="الأسواق الخاصة"
            />
          ) : null}
          {renderSection(id)}
        </Fragment>
      ))}
    </div>
  );
}
