"use client";

import {
  ChartColumnIncreasing,
  Globe2,
  type LucideIcon,
} from "lucide-react";
import { MetaFacts } from "../components/MetaFacts";
import { PageHero } from "../components/PageHero";
import { RegisterInterest } from "../components/RegisterInterest";
import { RichText } from "../components/RichText";
import {
  EQUITY_MANAGEMENT,
  type EquityManagementOfferIconId,
} from "../data/equitymanagement";
import { useResolvedMedia } from "../hooks/useResolvedMedia";
import { useLanguage } from "../i18n/LanguageContext";
import { pickLang } from "../site/types";

/** Basename under public/media/content/ — any image extension. */
const INTRO_MEDIA_BASENAME = "pe-intro";

const OFFER_ICONS: Record<EquityManagementOfferIconId, LucideIcon> = {
  local: ChartColumnIncreasing,
  regional: Globe2,
};

export function EquityManagement() {
  const { lang } = useLanguage();
  const data = EQUITY_MANAGEMENT;
  const introImg = useResolvedMedia("content", INTRO_MEDIA_BASENAME);

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
              <div className="pi-intro">
                <div className="pi-intro-text">
                  <span className="pi-intro-eyebrow">
                    {pickLang(
                      data.intro.eyebrowEn,
                      data.intro.eyebrowAr,
                      lang,
                    )}
                  </span>
                  <h2>
                    {pickLang(
                      data.intro.headingEn,
                      data.intro.headingAr,
                      lang,
                    )}
                  </h2>
                  <RichText
                    as="div"
                    className="eq-rich"
                    html={pickLang(data.intro.bodyEn, data.intro.bodyAr, lang)}
                  />
                  <RegisterInterest
                    sourcePage="/asset-management/equity-management"
                    className="btn btn-outline-navy"
                  />
                </div>
                <div
                  className="pi-intro-img"
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
      case "what-we-offer":
        return (
          <section key={id} className="blk">
            <div className="wrap">
              <div className="sec-head sec-head--center">
                <h2 className="sec-head-navy">
                  {pickLang(
                    data.offers.headingEn,
                    data.offers.headingAr,
                    lang,
                  )}
                </h2>
              </div>
              <div className="svc-grid svc-grid--2">
                {data.offers.items.map((item) => {
                  const Icon = OFFER_ICONS[item.icon];
                  return (
                    <div className="svc svc--dark" key={item.titleEn}>
                      <div className="si" aria-hidden="true">
                        <Icon strokeWidth={1.5} />
                      </div>
                      <h4>
                        {pickLang(item.titleEn, item.titleAr, lang)}
                      </h4>
                      <RichText
                        as="div"
                        className="eq-rich"
                        html={pickLang(item.bodyEn, item.bodyAr, lang)}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
        );
      case "examples":
        return (
          <section key={id} className="blk blk--cream">
            <div className="wrap">
              <div className="sec-head sec-head--center">
                <h2 className="sec-head-navy">
                  {pickLang(
                    data.examples.headingEn,
                    data.examples.headingAr,
                    lang,
                  )}
                </h2>
                <p className="eq-examples-intro">
                  {pickLang(
                    data.examples.introEn,
                    data.examples.introAr,
                    lang,
                  )}
                </p>
              </div>
              <div className="eq-examples-grid">
                {data.examples.items.map((item) => {
                  const labels = data.examples.labels;
                  const meta = [
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
                      label: pickLang(
                        labels.geographyEn,
                        labels.geographyAr,
                        lang,
                      ),
                      value: pickLang(
                        item.geographyEn,
                        item.geographyAr,
                        lang,
                      ),
                    },
                    {
                      label: pickLang(labels.stageEn, labels.stageAr, lang),
                      value: pickLang(item.stageEn, item.stageAr, lang),
                    },
                  ];
                  return (
                    <article
                      className="svc svc--dark eq-example"
                      key={item.titleEn}
                    >
                      <div className="eq-example-sector">
                        {pickLang(item.sectorEn, item.sectorAr, lang)}
                      </div>
                      <h4>
                        {pickLang(item.titleEn, item.titleAr, lang)}
                      </h4>
                      <p>{pickLang(item.bodyEn, item.bodyAr, lang)}</p>
                      <MetaFacts
                        items={meta}
                        tone="dark"
                        layout="stack"
                        className="eq-example-meta"
                      />
                    </article>
                  );
                })}
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
      {data.sectionOrder.map((id) => renderSection(id))}
    </div>
  );
}
