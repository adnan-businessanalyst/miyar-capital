"use client";

import {
  Building2,
  Calculator,
  CandlestickChart,
  Combine,
  FileSearch,
  Handshake,
  Landmark,
  type LucideIcon,
} from "lucide-react";
import type { ReactNode } from "react";
import { PageHero } from "../components/PageHero";
import { PrimaryCard, PrimaryCardGrid } from "../components/PrimaryCard";
import { RegisterInterest } from "../components/RegisterInterest";
import { Steps } from "../components/Steps";
import { INVESTMENT_BANKING } from "../data/investmentbanking";
import { useLanguage } from "../i18n/LanguageContext";
import { pickLang } from "../site/types";

const PRODUCT_ICONS: Record<string, LucideIcon> = {
  "/investment-banking/capital-markets-advisory": CandlestickChart,
  "/investment-banking/mergers-acquisitions": Combine,
  "/investment-banking/debt-financing-arrangement": Landmark,
  "/investment-banking/valuation-financial-advisory": Calculator,
  "/investment-banking/real-estate-private-arrangements": Building2,
};

const ADVISE_ICONS: Record<string, LucideIcon> = {
  "Standalone Advisory": FileSearch,
  "Transaction Advisory": Handshake,
};

function emphasizeWords(text: string, words: string[]): ReactNode {
  if (words.length === 0) return text;
  const pattern = new RegExp(
    `(${words.map((w) => w.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|")})`,
    "gi",
  );
  const parts = text.split(pattern);
  return parts.map((part, i) => {
    const match = words.some(
      (w) => w.toLowerCase() === part.toLowerCase(),
    );
    return match ? <strong key={`${part}-${i}`}>{part}</strong> : part;
  });
}

export function InvestmentBanking() {
  const { lang } = useLanguage();
  const data = INVESTMENT_BANKING;

  const renderSection = (id: (typeof data.sectionOrder)[number]) => {
    switch (id) {
      case "hero":
        return (
          <PageHero
            key={id}
            animate
            title={pickLang(data.hero.titleEn, data.hero.titleAr, lang)}
            crumb={pickLang(data.hero.crumbEn, data.hero.crumbAr, lang)}
            badge={pickLang(data.hero.badgeEn, data.hero.badgeAr, lang)}
            description={pickLang(
              data.hero.descriptionEn,
              data.hero.descriptionAr,
              lang,
            )}
            chips={lang === "ar" ? data.hero.chipsAr : data.hero.chipsEn}
          />
        );
      case "overview": {
        const paras =
          lang === "ar" ? data.overview.parasAr : data.overview.parasEn;
        const emphasize =
          lang === "ar"
            ? data.overview.emphasizeAr
            : data.overview.emphasizeEn;
        return (
          <section key={id} className="blk">
            <div className="wrap">
              <div className="sec-tag">
                {pickLang(data.overview.tagEn, data.overview.tagAr, lang)}
              </div>
              <h2 className="ib-h2">
                {pickLang(
                  data.overview.headingEn,
                  data.overview.headingAr,
                  lang,
                )}
              </h2>
              <div className="ib-lead">
                {paras.map((para, i) => (
                  <p key={para.slice(0, 40)}>
                    {i === 1
                      ? emphasizeWords(para, emphasize)
                      : para}
                  </p>
                ))}
              </div>
            </div>
          </section>
        );
      }
      case "advise": {
        const paras = lang === "ar" ? data.advise.parasAr : data.advise.parasEn;
        return (
          <section key={id} className="blk blk--cream">
            <div className="wrap">
              <div className="sec-tag">
                {pickLang(data.advise.tagEn, data.advise.tagAr, lang)}
              </div>
              <h2 className="ib-h2">
                {pickLang(data.advise.headingEn, data.advise.headingAr, lang)}
              </h2>
              <div className="ib-lead">
                {paras.map((para) => (
                  <p key={para.slice(0, 40)}>{para}</p>
                ))}
              </div>
              <PrimaryCardGrid columns={2}>
                {data.advise.cards.map((card) => {
                  const Icon = ADVISE_ICONS[card.titleEn];
                  return (
                    <PrimaryCard
                      key={card.titleEn}
                      icon={Icon ? <Icon strokeWidth={1.5} /> : undefined}
                      title={pickLang(card.titleEn, card.titleAr, lang)}
                    >
                      <p>{pickLang(card.bodyEn, card.bodyAr, lang)}</p>
                    </PrimaryCard>
                  );
                })}
              </PrimaryCardGrid>
            </div>
          </section>
        );
      }
      case "method":
        return (
          <section key={id} className="blk">
            <div className="wrap">
              <div className="sec-tag">
                {pickLang(data.method.tagEn, data.method.tagAr, lang)}
              </div>
              <h2 className="ib-h2">
                {pickLang(data.method.headingEn, data.method.headingAr, lang)}
              </h2>
              <Steps
                items={data.method.steps.map((step) => ({
                  num: step.num,
                  title: pickLang(step.titleEn, step.titleAr, lang),
                  body: pickLang(step.bodyEn, step.bodyAr, lang),
                }))}
              />
            </div>
          </section>
        );
      case "execute":
        return (
          <section key={id} className="blk blk--cream">
            <div className="wrap">
              <div className="sec-tag">
                {pickLang(data.execute.tagEn, data.execute.tagAr, lang)}
              </div>
              <h2 className="ib-h2">
                {pickLang(
                  data.execute.headingEn,
                  data.execute.headingAr,
                  lang,
                )}
              </h2>
              <div className="ib-lead">
                <p>
                  {pickLang(data.execute.bodyEn, data.execute.bodyAr, lang)}
                </p>
              </div>
            </div>
          </section>
        );
      case "products":
        return (
          <section key={id} className="blk">
            <div className="wrap">
              <div className="sec-tag">
                {pickLang(data.products.tagEn, data.products.tagAr, lang)}
              </div>
              <h2 className="ib-h2">
                {pickLang(
                  data.products.headingEn,
                  data.products.headingAr,
                  lang,
                )}
              </h2>
              <PrimaryCardGrid columns={3}>
                {data.products.items.map((item) => {
                  const Icon = PRODUCT_ICONS[item.href];
                  return (
                    <PrimaryCard
                      key={item.href}
                      href={item.href}
                      icon={Icon ? <Icon strokeWidth={1.5} /> : undefined}
                      title={pickLang(item.titleEn, item.titleAr, lang)}
                      cta={pickLang(
                        data.products.viewServiceEn,
                        data.products.viewServiceAr,
                        lang,
                      )}
                    >
                      <p>{pickLang(item.bodyEn, item.bodyAr, lang)}</p>
                    </PrimaryCard>
                  );
                })}
              </PrimaryCardGrid>
            </div>
          </section>
        );
      case "lifecycle":
        return (
          <section key={id} className="blk blk--cream">
            <div className="wrap">
              <div className="sec-tag">
                {pickLang(data.lifecycle.tagEn, data.lifecycle.tagAr, lang)}
              </div>
              <h2 className="ib-h2">
                {pickLang(
                  data.lifecycle.headingEn,
                  data.lifecycle.headingAr,
                  lang,
                )}
              </h2>
              <Steps
                items={data.lifecycle.steps.map((step) => ({
                  num: step.num,
                  title: pickLang(step.titleEn, step.titleAr, lang),
                  body: pickLang(step.bodyEn, step.bodyAr, lang),
                }))}
              />
            </div>
          </section>
        );
      case "cta":
        return (
          <section key={id} className="blk">
            <div className="wrap ib-cta">
              <div className="sec-tag">
                {pickLang(data.cta.tagEn, data.cta.tagAr, lang)}
              </div>
              <h2 className="ib-h2">
                {pickLang(data.cta.headingEn, data.cta.headingAr, lang)}
              </h2>
              <p className="ib-cta-sub">
                {pickLang(data.cta.bodyEn, data.cta.bodyAr, lang)}
              </p>
              <RegisterInterest
                sourcePage="/investment-banking"
                buttonLabel={pickLang(
                  data.cta.buttonEn,
                  data.cta.buttonAr,
                  lang,
                )}
                className="btn btn-gold"
              />
            </div>
          </section>
        );
      case "notes": {
        const items = lang === "ar" ? data.notes.itemsAr : data.notes.itemsEn;
        return (
          <section key={id} className="ib-notes">
            <div className="wrap">
              <h3>
                {pickLang(data.notes.headingEn, data.notes.headingAr, lang)}
              </h3>
              <ol>
                {items.map((item) => (
                  <li key={item.slice(0, 48)}>{item}</li>
                ))}
              </ol>
              <p className="ib-ref">
                {pickLang(data.notes.refEn, data.notes.refAr, lang)}
              </p>
            </div>
          </section>
        );
      }
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
