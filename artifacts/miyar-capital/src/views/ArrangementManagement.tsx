"use client";

import {
  Briefcase,
  CandlestickChart,
  CircleDollarSign,
  Landmark,
  type LucideIcon,
} from "lucide-react";
import { useState } from "react";
import { PageHero } from "../components/PageHero";
import { PrimaryCard, PrimaryCardGrid } from "../components/PrimaryCard";
import { RegisterInterest } from "../components/RegisterInterest";
import {
  ARRANGEMENT_MANAGEMENT,
  type ArrangementServiceIconId,
} from "../data/arrangementmanagement";
import { useLanguage } from "../i18n/LanguageContext";
import {
  CONTENT_IMAGES,
  DETAILS_PG_IMAGE,
  IA_INTRO_IMAGE,
} from "../site/contentImages";
import { MAN_ON_PHONE_IMG as manOnPhone } from "../site/manOnPhone";
import { pickLang } from "../site/types";

const SERVICE_ICONS: Record<ArrangementServiceIconId, LucideIcon> = {
  business: Briefcase,
  financial: CircleDollarSign,
  debt: Landmark,
  capital: CandlestickChart,
};

const buildingImg = CONTENT_IMAGES.app_bg;
const introImg = IA_INTRO_IMAGE || buildingImg;
const detailBg = DETAILS_PG_IMAGE || buildingImg;

function withTitle(template: string, title: string) {
  return template.replace("{title}", title);
}

export function ArrangementManagement() {
  const { lang } = useLanguage();
  const data = ARRANGEMENT_MANAGEMENT;
  const [activeDetail, setActiveDetail] = useState(0);
  const cards = data.detail.cards;
  const prevDetail = (activeDetail - 1 + cards.length) % cards.length;
  const nextDetail = (activeDetail + 1) % cards.length;

  const cardTitle = (i: number) =>
    pickLang(cards[i].titleEn, cards[i].titleAr, lang);
  const cardBody = (i: number) =>
    pickLang(cards[i].bodyEn, cards[i].bodyAr, lang);

  const goDetail = (index: number) => {
    const n = cards.length;
    setActiveDetail(((index % n) + n) % n);
  };

  const renderSection = (id: (typeof data.sectionOrder)[number]) => {
    switch (id) {
      case "hero":
        return (
          <PageHero
            key={id}
            title={pickLang(data.hero.titleEn, data.hero.titleAr, lang)}
            crumb={pickLang(data.hero.crumbEn, data.hero.crumbAr, lang)}
          />
        );
      case "intro":
        return (
          <section key={id} className="blk">
            <div className="wrap">
              <div className="arr-intro">
                <div className="arr-intro-text">
                  <div className="sec-tag">
                    {pickLang(data.intro.tagEn, data.intro.tagAr, lang)}
                  </div>
                  <h2>
                    {pickLang(
                      data.intro.headingEn,
                      data.intro.headingAr,
                      lang,
                    )}
                  </h2>
                  <p>
                    {pickLang(data.intro.bodyEn, data.intro.bodyAr, lang)}
                  </p>
                  <RegisterInterest
                    sourcePage="/arrangement-management"
                    className="btn btn-outline-navy"
                  />
                </div>
                <div className="arr-intro-img">
                  <img
                    src={introImg}
                    alt={pickLang(
                      data.intro.imageAltEn,
                      data.intro.imageAltAr,
                      lang,
                    )}
                  />
                </div>
              </div>
            </div>
          </section>
        );
      case "services":
        return (
          <section key={id} className="blk blk--cream">
            <div className="wrap">
              <div className="sec-head sec-head--center">
                <h2>
                  {pickLang(
                    data.services.headingEn,
                    data.services.headingAr,
                    lang,
                  )}
                </h2>
              </div>
              <PrimaryCardGrid columns={4}>
                {data.services.items.map((service) => {
                  const Icon = SERVICE_ICONS[service.icon];
                  const items =
                    lang === "ar" ? service.itemsAr : service.itemsEn;
                  return (
                    <PrimaryCard
                      key={service.titleEn}
                      icon={<Icon strokeWidth={1.5} />}
                      title={pickLang(
                        service.titleEn,
                        service.titleAr,
                        lang,
                      )}
                    >
                      <ul>
                        {items.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    </PrimaryCard>
                  );
                })}
              </PrimaryCardGrid>
            </div>
          </section>
        );
      case "detail":
        return (
          <section key={id} className="detail">
            <div
              className="detail-bg"
              style={
                detailBg ? { backgroundImage: `url(${detailBg})` } : undefined
              }
            />
            <div className="wrap">
              <div className="detail-inner">
                <h2>
                  {pickLang(
                    data.detail.headingEn,
                    data.detail.headingAr,
                    lang,
                  )}
                </h2>
                <div className="detail-cards">
                  <div
                    className="detail-index"
                    role="tablist"
                    aria-label={pickLang(
                      data.detail.tablistAriaEn,
                      data.detail.tablistAriaAr,
                      lang,
                    )}
                  >
                    {cards.map((card, i) => (
                      <button
                        key={card.titleEn}
                        type="button"
                        role="tab"
                        aria-selected={i === activeDetail}
                        className={i === activeDetail ? "on" : undefined}
                        onClick={() => goDetail(i)}
                      >
                        {cardTitle(i)}
                      </button>
                    ))}
                  </div>
                  <div className="detail-stage">
                    <button
                      type="button"
                      className="detail-card detail-card--peek detail-card--prev"
                      onClick={() => goDetail(prevDetail)}
                      aria-label={withTitle(
                        pickLang(
                          data.detail.prevCardAriaEn,
                          data.detail.prevCardAriaAr,
                          lang,
                        ),
                        cardTitle(prevDetail),
                      )}
                    >
                      <h4>{cardTitle(prevDetail)}</h4>
                      <p>{cardBody(prevDetail)}</p>
                    </button>
                    <div
                      className="detail-card detail-card--active"
                      role="tabpanel"
                    >
                      <h4>{cardTitle(activeDetail)}</h4>
                      <p>{cardBody(activeDetail)}</p>
                    </div>
                    <button
                      type="button"
                      className="detail-card detail-card--peek detail-card--next"
                      onClick={() => goDetail(nextDetail)}
                      aria-label={withTitle(
                        pickLang(
                          data.detail.nextCardAriaEn,
                          data.detail.nextCardAriaAr,
                          lang,
                        ),
                        cardTitle(nextDetail),
                      )}
                    >
                      <h4>{cardTitle(nextDetail)}</h4>
                      <p>{cardBody(nextDetail)}</p>
                    </button>
                  </div>
                </div>
                <div className="detail-arrows">
                  <button
                    type="button"
                    className="detail-arrow"
                    onClick={() => goDetail(activeDetail - 1)}
                    aria-label={pickLang(
                      data.detail.prevAriaEn,
                      data.detail.prevAriaAr,
                      lang,
                    )}
                  >
                    {lang === "ar" ? "→" : "←"}
                  </button>
                  <button
                    type="button"
                    className="detail-arrow"
                    onClick={() => goDetail(activeDetail + 1)}
                    aria-label={pickLang(
                      data.detail.nextAriaEn,
                      data.detail.nextAriaAr,
                      lang,
                    )}
                  >
                    {lang === "ar" ? "←" : "→"}
                  </button>
                </div>
              </div>
            </div>
          </section>
        );
      case "interest":
        return (
          <section key={id} className="blk ri" id="register">
            <div className="wrap contact-cta">
              <RegisterInterest
                sourcePage="/arrangement-management"
                image={manOnPhone}
              />
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
