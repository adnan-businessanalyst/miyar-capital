"use client";

import { useEffect, useRef } from "react";
import { LazyVideo } from "../components/LazyVideo";
import { PageHero } from "../components/PageHero";
import { RegisterInterestSection } from "../components/RegisterInterestSection";
import { RichText } from "../components/RichText";
import { SectionHead } from "../components/SectionHead";
import { INVESTMENT_ADVISORY } from "../data/investmentadvisory";
import { useLanguage } from "../i18n/LanguageContext";
import {
  DETAILS_PG_IMAGE,
  IA_BG,
  IA_INTRO_IMAGE,
  IA_PROCESS_IMAGES,
} from "../site/contentImages";
import { pickLang } from "../site/types";

export function InvestmentAdvisory() {
  const { lang } = useLanguage();
  const data = INVESTMENT_ADVISORY;
  const bgVideo = IA_BG.video;
  const bgImage = IA_BG.image;
  const hasBg = Boolean(bgVideo || bgImage);
  const servicesFront = IA_INTRO_IMAGE || IA_PROCESS_IMAGES[1];
  const servicesBack = DETAILS_PG_IMAGE || servicesFront;
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
            title={pickLang(data.hero.titleEn, data.hero.titleAr, lang)}
            crumb={pickLang(data.hero.crumbEn, data.hero.crumbAr, lang)}
          />
        );
      case "pillars":
        return (
          <section key={id} className="blk">
            <div className="wrap">
              <div
                className={`advisory-card${hasBg ? " advisory-card--media" : ""}`}
              >
                {hasBg ? (
                  <div className="advisory-card-media" aria-hidden="true">
                    {bgVideo ? (
                      <LazyVideo
                        className="advisory-card-video"
                        src={bgVideo}
                        poster={bgImage || undefined}
                        aria-label={pickLang(
                          data.intro.backgroundAriaEn,
                          data.intro.backgroundAriaAr,
                          lang,
                        )}
                      />
                    ) : (
                      <img className="advisory-card-img" src={bgImage} alt="" />
                    )}
                  </div>
                ) : null}
                <div className="advisory-card-body">
                  <SectionHead
                    title={pickLang(
                      data.intro.headingEn,
                      data.intro.headingAr,
                      lang,
                    )}
                  />
                  <p>
                    <RichText
                      html={pickLang(data.intro.bodyEn, data.intro.bodyAr, lang)}
                    />
                  </p>
                  <div className="adv-pillars">
                    {data.pillars.map((pillar) => {
                      const title = pickLang(
                        pillar.titleEn,
                        pillar.titleAr,
                        lang,
                      );
                      return (
                        <div className="adv-pillar" key={pillar.titleEn}>
                          <h4>
                            <RichText html={title} />
                          </h4>
                          <RichText
                            as="p"
                            html={pickLang(
                              pillar.bodyEn,
                              pillar.bodyAr,
                              lang,
                            )}
                          />
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </section>
        );
      case "services": {
        const svc = data.services;
        const heading = pickLang(svc.headingEn, svc.headingAr, lang);
        const topic = pickLang(svc.topicEn, svc.topicAr, lang);
        return (
          <section
            key={id}
            ref={servicesSectionRef}
            className="blk ia-services ia-valuate-section"
          >
            <div className="wrap">
              {heading.trim() ? <SectionHead title={heading} /> : null}
              {topic.trim() ? (
                <h3 className="ia-valuate-title">
                  <RichText html={topic} />
                </h3>
              ) : null}
            </div>
            <figure className="ia-valuate-media">
              <img
                className="ia-valuate-media-back"
                src={servicesBack}
                alt=""
                aria-hidden="true"
              />
              <div className="ia-valuate-media-front">
                <img
                  src={servicesFront}
                  alt={pickLang(
                    "Investment advisory services",
                    "خدمات الاستشارات الاستثمارية",
                    lang,
                  )}
                />
              </div>
            </figure>
            <div className="wrap">
              <div className="ia-valuate">
                <div className="ia-valuate-grid">
                  {svc.cards.map((card, i) => {
                    const title = pickLang(card.titleEn, card.titleAr, lang);
                    const cardBody = pickLang(card.bodyEn, card.bodyAr, lang);
                    if (!title.trim() && !cardBody.trim()) return null;
                    return (
                      <article
                        className="ia-valuate-card"
                        key={`${card.titleEn || card.titleAr}-${i}`}
                      >
                        <div className="ia-valuate-card-head">
                          <h4>
                            <RichText html={title} />
                          </h4>
                        </div>
                        <div className="ia-valuate-card-body">
                          <RichText as="p" html={cardBody} />
                        </div>
                      </article>
                    );
                  })}
                </div>
              </div>
            </div>
          </section>
        );
      }
      case "process":
        return (
          <section key={id} className="blk blk--cream">
            <div className="wrap">
              <div className="timeline">
                {data.steps.map((step, i) => {
                  const mediaFirst = i % 2 === 1;
                  const stepNum = String(Number.parseInt(step.n, 10));
                  const stepBody = pickLang(step.bodyEn, step.bodyAr, lang);
                  const alt = pickLang(step.altEn, step.altAr, lang);
                  const img = IA_PROCESS_IMAGES[step.imageKey];
                  return (
                    <div
                      className={`tl-row${mediaFirst ? " tl-row--media-first" : ""}`}
                      key={step.n}
                    >
                      <div className="tl-text">
                        <div className="tl-num" aria-hidden="true">
                          {stepNum}
                        </div>
                        <p>
                          <RichText html={stepBody} />
                        </p>
                      </div>
                      <div className="tl-media">
                        <div className="tl-img">
                          <img src={img} alt={alt} />
                        </div>
                      </div>
                      <span className="tl-dot" aria-hidden="true" />
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
        );
      case "interest":
        return null;
      default:
        return null;
    }
  };

  return (
    <div className="page">
      {data.sectionOrder.map((id) => renderSection(id))}
      <RegisterInterestSection
        sourcePage="/investment-advisory"
        pageTitleEn="Investment Advisory"
        pageTitleAr="الاستشارات الاستثمارية"
      />
    </div>
  );
}
