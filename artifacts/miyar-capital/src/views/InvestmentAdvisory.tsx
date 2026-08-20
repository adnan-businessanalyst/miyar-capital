"use client";

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
        const body = pickLang(svc.bodyEn, svc.bodyAr, lang);
        const highlight = pickLang(svc.highlightEn, svc.highlightAr, lang);
        return (
          <section
            key={id}
            className="blk arr-services ia-services"
            style={{ background: "#fff", backgroundColor: "#fff" }}
          >
            <div className="wrap">
              <div className="arr-services-layout">
                <aside className="arr-services-right">
                  {heading.trim() ? <SectionHead title={heading} /> : null}
                  <figure className="arr-services-media">
                    <img
                      className="arr-services-media-back"
                      src={servicesBack}
                      alt=""
                      aria-hidden="true"
                    />
                    <div className="arr-services-media-frame">
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
                </aside>

                <div className="arr-services-left ia-services-left">
                  {topic.trim() ? (
                    <h3 className="arr-svc-title ia-services-left-title">
                      <RichText html={topic} />
                    </h3>
                  ) : null}
                  {(body.trim() || highlight.trim()) && (
                    <div className="ia-services-intro">
                      {body.trim() ? (
                        <RichText
                          as="p"
                          className="ia-services-body"
                          html={body}
                        />
                      ) : null}
                      {highlight.trim() ? (
                        <RichText
                          as="p"
                          className="ia-services-highlight"
                          html={highlight}
                        />
                      ) : null}
                    </div>
                  )}
                  <div className="arr-bank-cards ia-svc-cards">
                    {svc.cards.map((card, i) => {
                      const title = pickLang(card.titleEn, card.titleAr, lang);
                      const cardBody = pickLang(card.bodyEn, card.bodyAr, lang);
                      if (!title.trim() && !cardBody.trim()) return null;
                      return (
                        <article
                          className="arr-bank-card ia-svc-card"
                          key={`${card.titleAr}-${i}`}
                        >
                          {title.trim() ? (
                            <h4 className="ia-svc-card-title">
                              <RichText html={title} />
                            </h4>
                          ) : null}
                          {cardBody.trim() ? (
                            <RichText
                              as="p"
                              className="ia-svc-card-body"
                              html={cardBody}
                            />
                          ) : null}
                        </article>
                      );
                    })}
                  </div>
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
