"use client";

import { Handshake, ShieldCheck, Star } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { LazyVideo } from "../components/LazyVideo";
import { PageHero } from "../components/PageHero";
import { RegisterInterest } from "../components/RegisterInterest";
import { ADVISORY_PILLARS, ADVISORY_STEPS } from "../data/advisory";
import { IA_BG } from "../site/contentImages";
import { MAN_ON_PHONE_IMG as manOnPhone } from "../site/manOnPhone";

const DEFAULT_ORDER = ["hero", "pillars", "process", "interest"];

const PILLAR_ICONS: Record<(typeof ADVISORY_PILLARS)[number]["icon"], LucideIcon> = {
  priority: Star,
  trust: ShieldCheck,
  partnership: Handshake,
};

export function InvestmentAdvisory() {
  const sectionOrder = DEFAULT_ORDER;
  const bgVideo = IA_BG.video;
  const bgImage = IA_BG.image;
  const hasBg = Boolean(bgVideo || bgImage);

  const renderSection = (id: string) => {
    switch (id) {
      case "hero":
        return (
          <PageHero
            key={id}
            title="Investment Advisory"
            crumb="Investment Banking / Investment Advisory"
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
                        aria-label="Investment advisory background"
                      />
                    ) : (
                      <img className="advisory-card-img" src={bgImage} alt="" />
                    )}
                  </div>
                ) : null}
                <div className="advisory-card-body">
                  <h2>Investment Advisory</h2>
                  <p>
                    Miyar Capital believes the first step in investment advisory
                    services is to understand the client's needs, objectives, and
                    constraints.
                  </p>
                  <div className="adv-pillars">
                    {ADVISORY_PILLARS.map((pillar) => {
                      const Icon = PILLAR_ICONS[pillar.icon];
                      return (
                        <div className="adv-pillar" key={pillar.title}>
                          <div className="adv-icon" aria-hidden="true">
                            <Icon />
                          </div>
                          <h4>{pillar.title}</h4>
                          <p>{pillar.text}</p>
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
                {ADVISORY_STEPS.map((step, i) => {
                  const textFirst = i % 2 === 0;
                  const media = (
                    <div className={`tl-media${textFirst ? "" : " tl-media--rev"}`} key="media">
                      <div className="tl-img"><img src={step.img} alt={step.alt ?? `Advisory step ${step.n}`} /></div>
                      <div className="tl-num">{step.n}</div>
                    </div>
                  );
                  const text = <div className="tl-text" key="text"><p>{step.text}</p></div>;
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
        return <RegisterInterest key={id} image={manOnPhone} sourcePage="/investment-advisory" />;
      default:
        return null;
    }
  };

  return <div className="page">{sectionOrder.map((id) => renderSection(id))}</div>;
}
