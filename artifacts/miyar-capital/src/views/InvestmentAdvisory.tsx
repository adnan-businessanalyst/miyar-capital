"use client";

import { Handshake, ShieldCheck, Star } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { LazyVideo } from "../components/LazyVideo";
import { PageHero } from "../components/PageHero";
import { RegisterInterest } from "../components/RegisterInterest";
import {
  INVESTMENT_ADVISORY,
  type InvestmentAdvisoryIconId,
} from "../data/investmentadvisory";
import { useLanguage } from "../i18n/LanguageContext";
import { IA_BG, IA_PROCESS_IMAGES } from "../site/contentImages";
import { MAN_ON_PHONE_IMG as manOnPhone } from "../site/manOnPhone";
import { pickLang } from "../site/types";

const PILLAR_ICONS: Record<InvestmentAdvisoryIconId, LucideIcon> = {
  priority: Star,
  trust: ShieldCheck,
  partnership: Handshake,
};

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
                  <div className="adv-pillars">
                    {data.pillars.map((pillar) => {
                      const Icon = PILLAR_ICONS[pillar.icon];
                      const title = pickLang(
                        pillar.titleEn,
                        pillar.titleAr,
                        lang,
                      );
                      return (
                        <div className="adv-pillar" key={pillar.titleEn}>
                          <div className="adv-icon" aria-hidden="true">
                            <Icon />
                          </div>
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
                  const textFirst = i % 2 === 0;
                  const body = pickLang(step.bodyEn, step.bodyAr, lang);
                  const alt = pickLang(step.altEn, step.altAr, lang);
                  const img = IA_PROCESS_IMAGES[step.imageKey];
                  const media = (
                    <div
                      className={`tl-media${textFirst ? "" : " tl-media--rev"}`}
                      key="media"
                    >
                      <div className="tl-img">
                        <img src={img} alt={alt} />
                      </div>
                      <div className="tl-num">{step.n}</div>
                    </div>
                  );
                  const text = (
                    <div className="tl-text" key="text">
                      <p>{body}</p>
                    </div>
                  );
                  return (
                    <div className="tl-row" key={step.n}>
                      {textFirst ? [text, media] : [media, text]}
                      <span className="tl-dot" aria-hidden="true" />
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
        );
      case "interest":
        return (
          <section key={id} className="blk ri" id="register">
            <div className="wrap contact-cta">
              <RegisterInterest
                sourcePage="/investment-advisory"
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
