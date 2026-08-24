"use client";

import { useEffect, useRef } from "react";
import {
  Building2,
  Calculator,
  CandlestickChart,
  Combine,
  Landmark,
  type LucideIcon,
} from "lucide-react";
import { PageHero } from "../components/PageHero";
import { PrimaryCardGrid } from "../components/PrimaryCard";
import { PrimaryCardSmall } from "../components/PrimaryCardSmall";
import { RegisterInterestSection } from "../components/RegisterInterestSection";
import { RichText } from "../components/RichText";
import { SectionHead } from "../components/SectionHead";
import { Steps } from "../components/Steps";
import { INVESTMENT_BANKING } from "../data/investmentbanking";
import { useLanguage } from "../i18n/LanguageContext";
import { CONTENT_IMAGES } from "../site/contentImages";
import { pickLang } from "../site/types";

/** Title-matched icons for advise cards (view-local; PrimaryCard untouched). */
const ADVISE_CARD_ICONS: { match: string; Icon: LucideIcon }[] = [
  { match: "Capital Markets", Icon: CandlestickChart },
  { match: "Sukuk", Icon: Landmark },
  { match: "Mergers", Icon: Combine },
  { match: "Bank", Icon: Building2 },
  { match: "Financial Consulting", Icon: Calculator },
  { match: "Valuation", Icon: Calculator },
];

function adviseIconForTitle(titleEn: string): LucideIcon {
  const found = ADVISE_CARD_ICONS.find(({ match }) =>
    titleEn.toLowerCase().includes(match.toLowerCase()),
  );
  return found?.Icon ?? CandlestickChart;
}

function AdviseCardIcon({ Icon }: { Icon: LucideIcon }) {
  return (
    <div className="ib-advise-icon" aria-hidden="true">
      <span className="ib-advise-icon-layer ib-advise-icon-layer--back">
        <Icon strokeWidth={1.5} />
      </span>
      <span className="ib-advise-icon-layer ib-advise-icon-layer--mid">
        <Icon strokeWidth={1.5} />
      </span>
      <span className="ib-advise-icon-layer ib-advise-icon-layer--face">
        <Icon strokeWidth={1.5} />
      </span>
    </div>
  );
}

function splitBodyByBr(html: string): string[] {
  const parts = html
    .split(/<br\s*\/?>/i)
    .map((part) => part.trim())
    .filter(Boolean);
  return parts.length > 0 ? parts : [];
}

export function InvestmentBanking() {
  const { lang } = useLanguage();
  const data = INVESTMENT_BANKING;
  const introImg =
    CONTENT_IMAGES.investment_banking_intro || CONTENT_IMAGES.app_bg;
  const servicesFront =
    CONTENT_IMAGES.service_investment_banking || CONTENT_IMAGES.app_bg;
  const servicesSectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = servicesSectionRef.current;
    if (!el || typeof ResizeObserver === "undefined") return;
    const sync = () => {
      el.style.setProperty("--ia-sec-h", `${el.getBoundingClientRect().height}px`);
    };
    sync();
    const ro = new ResizeObserver(sync);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const renderSection = (id: (typeof data.sectionOrder)[number]) => {
    switch (id) {
      case "hero":
        return (
          <PageHero
            key={id}
            animate
            title={pickLang(data.hero.titleEn, data.hero.titleAr, lang)}
            crumb={pickLang(data.hero.crumbEn, data.hero.crumbAr, lang)}
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
      case "overview": {
        const paras =
          lang === "ar" ? data.overview.parasAr : data.overview.parasEn;
        return (
          <section key={id} className="blk ib-intro">
            <div className="wrap">
              <SectionHead
                title={pickLang(
                  data.overview.tagEn,
                  data.overview.tagAr,
                  lang,
                )}
                // subtitle={pickLang(
                //   data.overview.headingEn,
                //   data.overview.headingAr,
                //   lang,
                // )}
              />
              <div className="ib-lead">
                {paras.map((para) => (
                  <RichText
                    key={para.slice(0, 40)}
                    as="p"
                    html={para}
                  />
                ))}
              </div>
              {introImg ? (
                <figure className="ib-intro-media">
                  <img
                    src={introImg}
                    alt={pickLang(
                      "Investment banking",
                      "المصرفية الاستثمارية",
                      lang,
                    )}
                  />
                </figure>
              ) : null}
            </div>
          </section>
        );
      }
      case "advise": {
        return (
          <section key={id} className="blk ib-advise">
            <div className="wrap">
              <SectionHead
                title={pickLang(data.advise.tagEn, data.advise.tagAr, lang)}
              />
              <PrimaryCardGrid columns={3} className="ib-advise-grid">
                {data.advise.cards.map((card, i) => {
                  const title = pickLang(card.titleEn, card.titleAr, lang);
                  const body = pickLang(card.bodyEn, card.bodyAr, lang);
                  const lines = splitBodyByBr(body);
                  const Icon = adviseIconForTitle(card.titleEn);
                  return (
                    <article
                      className="ib-advise-card"
                      key={`${card.titleEn || card.titleAr}-${i}`}
                    >
                      <div className="ib-advise-card-head">
                        <AdviseCardIcon Icon={Icon} />
                        {title.trim() ? (
                          <h3 className="ib-advise-card-title">
                            <RichText html={title} />
                          </h3>
                        ) : null}
                      </div>
                      {lines.length > 0 ? (
                        <ul className="ib-advise-card-list">
                          {lines.map((line) => (
                            <li key={line.slice(0, 48)}>
                              <RichText html={line} />
                            </li>
                          ))}
                        </ul>
                      ) : null}
                    </article>
                  );
                })}
              </PrimaryCardGrid>
            </div>
          </section>
        );
      }
      case "method": {
        const methodImg = CONTENT_IMAGES.section_bg_our_approach;
        return (
          <section key={id} className="blk ib-method-section">
            <div className="wrap">
              <SectionHead
                title={pickLang(data.method.tagEn, data.method.tagAr, lang)}
                subtitle={pickLang(
                  data.method.headingEn,
                  data.method.headingAr,
                  lang,
                )}
              />
            </div>
            <div className="ib-method-stage">
              {methodImg ? (
                <div
                  className="ib-method-media"
                  style={{ backgroundImage: `url(${methodImg})` }}
                  aria-hidden="true"
                />
              ) : null}
              <div className="wrap ib-method-cards-wrap">
                <div className="ib-method-cards">
                  <Steps
                    className="ib-method-steps"
                    items={data.method.steps.map((step) => ({
                      num: step.num,
                      title: pickLang(step.titleEn, step.titleAr, lang),
                      body: pickLang(step.bodyEn, step.bodyAr, lang),
                    }))}
                  />
                </div>
              </div>
            </div>
          </section>
        );
      }
      case "execute": {
        return (
          <section key={id} className="blk ib-execute">
            <div className="wrap">
              <SectionHead
                title={pickLang(data.execute.tagEn, data.execute.tagAr, lang)}
                subtitle={pickLang(
                  data.execute.headingEn,
                  data.execute.headingAr,
                  lang,
                )}
              />
              <div className="ib-lead">
                <RichText
                  as="p"
                  html={pickLang(
                    data.execute.bodyEn,
                    data.execute.bodyAr,
                    lang,
                  )}
                />
              </div>
              <div className="ib-execute-stage">
                <PrimaryCardGrid
                  columns={4}
                  className="ib-execute-cards"
                >
                  {data.execute.cards.map((card, i) => (
                    <PrimaryCardSmall
                      key={`${card.titleEn || card.bodyEn}-${i}`}
                      className="ib-execute-card"
                      title={pickLang(card.titleEn, card.titleAr, lang)}
                      body={pickLang(card.bodyEn, card.bodyAr, lang)}
                    />
                  ))}
                </PrimaryCardGrid>
              </div>
            </div>
          </section>
        );
      }
      case "products": {
        const heading = pickLang(
          data.products.tagEn,
          data.products.tagAr,
          lang,
        );
        const subtitle = pickLang(
          data.products.headingEn,
          data.products.headingAr,
          lang,
        );
        return (
          <section
            key={id}
            ref={servicesSectionRef}
            className="blk ib-services ib-services-duo"
          >
            <div className="wrap">
              {heading.trim() ? <SectionHead title={heading} /> : null}
              {subtitle.trim() ? (
                <h3 className="ib-services-duo-title">
                  <RichText html={subtitle} />
                </h3>
              ) : null}
            </div>
            <figure className="ib-services-media">
              <div className="ib-services-media-front">
                <img
                  src={servicesFront}
                  alt={pickLang(
                    "Investment banking services",
                    "خدمات المصرفية الاستثمارية",
                    lang,
                  )}
                />
              </div>
            </figure>
            <div className="wrap">
              <div className="ib-services-cards-wrap">
                <div className="arr-bank-cards ib-svc-cards">
                  {data.products.items.map((item, i) => {
                    const title = pickLang(item.titleEn, item.titleAr, lang);
                    const body = pickLang(item.bodyEn, item.bodyAr, lang);
                    if (!title.trim() && !body.trim()) return null;
                    return (
                      <article
                        className="arr-bank-card ib-svc-card"
                        key={`${item.href}-${i}`}
                      >
                        {title.trim() ? (
                          <h4>
                            <RichText html={title} />
                          </h4>
                        ) : null}
                        {body.trim() ? (
                          <RichText as="p" html={body} />
                        ) : null}
                      </article>
                    );
                  })}
                </div>
              </div>
            </div>
          </section>
        );
      }
      case "lifecycle": {
        const title = pickLang(
          data.lifecycle.tagEn,
          data.lifecycle.tagAr,
          lang,
        );
        const subtitle = pickLang(
          data.lifecycle.headingEn,
          data.lifecycle.headingAr,
          lang,
        );
        return (
          <section key={id} className="blk ib-lifecycle">
            {servicesFront ? (
              <div
                className="ib-lifecycle-bg"
                style={{ backgroundImage: `url(${servicesFront})` }}
                aria-hidden="true"
              />
            ) : null}
            <div className="wrap">
              <SectionHead title={title} subtitle={subtitle} />
              <div className="ib-lifecycle-panel">
                <Steps
                  className="ib-lifecycle-steps"
                  items={data.lifecycle.steps.map((step) => ({
                    num: step.num,
                    title: pickLang(step.titleEn, step.titleAr, lang),
                    body: pickLang(step.bodyEn, step.bodyAr, lang),
                  }))}
                />
              </div>
            </div>
          </section>
        );
      }
      default:
        return null;
    }
  };

  return (
    <div className="page page--investment-banking">
      {data.sectionOrder.map((id) => renderSection(id))}
      <RegisterInterestSection
        sourcePage="/investment-banking"
        pageTitleEn="Investment Banking"
        pageTitleAr="الخدمات المصرفية الاستثمارية"
        bodyEn={data.cta.bodyEn}
        bodyAr={data.cta.bodyAr}
      />
    </div>
  );
}
