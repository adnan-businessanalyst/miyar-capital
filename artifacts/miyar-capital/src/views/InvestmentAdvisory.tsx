"use client";

import { LazyVideo } from "../components/LazyVideo";
import { PageHero } from "../components/PageHero";
import { RegisterInterestSection } from "../components/RegisterInterestSection";
import { SectionHead } from "../components/SectionHead";
import { INVESTMENT_ADVISORY } from "../data/investmentadvisory";
import { useLanguage } from "../i18n/LanguageContext";
import { IA_BG, IA_PROCESS_IMAGES } from "../site/contentImages";
import { pickLang } from "../site/types";

export function InvestmentAdvisory() {
  const { lang } = useLanguage();
  const data = INVESTMENT_ADVISORY;
  const bgVideo = IA_BG.video;
  const bgImage = IA_BG.image;
  const hasBg = Boolean(bgVideo || bgImage);

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
                    {pickLang(data.intro.bodyEn, data.intro.bodyAr, lang)}
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
                          <h4>{title}</h4>
                          <p>
                            {pickLang(pillar.bodyEn, pillar.bodyAr, lang)}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </section>
        );
      case "process":
        return (
          <section key={id} className="blk blk--cream">
            <div className="wrap">
              <div className="timeline">
                {data.steps.map((step, i) => {
                  const mediaFirst = i % 2 === 1;
                  const stepNum = String(Number.parseInt(step.n, 10));
                  const body = pickLang(step.bodyEn, step.bodyAr, lang);
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
                        <p>{body}</p>
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
