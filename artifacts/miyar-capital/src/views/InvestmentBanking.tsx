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
import { PrimaryCardClickableGrid } from "../components/PrimaryCardClickable";
import { PrimaryCardSmall } from "../components/PrimaryCardSmall";
import { RegisterInterestSection } from "../components/RegisterInterestSection";
import { SectionHead } from "../components/SectionHead";
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
        const emphasize =
          lang === "ar"
            ? data.overview.emphasizeAr
            : data.overview.emphasizeEn;
        return (
          <section key={id} className="blk">
            <div className="wrap">
              <SectionHead
                title={pickLang(
                  data.overview.tagEn,
                  data.overview.tagAr,
                  lang,
                )}
                subtitle={pickLang(
                  data.overview.headingEn,
                  data.overview.headingAr,
                  lang,
                )}
              />
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
              <SectionHead
                title={pickLang(data.advise.tagEn, data.advise.tagAr, lang)}
                subtitle={pickLang(
                  data.advise.headingEn,
                  data.advise.headingAr,
                  lang,
                )}
              />
              <div className="ib-lead">
                {paras.map((para, i) =>
                  i === paras.length - 1 ? (
                    <span key={para.slice(0, 40)} className="ib-lead-line">
                      {para}
                    </span>
                  ) : (
                    <p key={para.slice(0, 40)}>{para}</p>
                  ),
                )}
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
              <SectionHead
                title={pickLang(data.method.tagEn, data.method.tagAr, lang)}
                subtitle={pickLang(
                  data.method.headingEn,
                  data.method.headingAr,
                  lang,
                )}
              />
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
              <SectionHead
                title={pickLang(data.execute.tagEn, data.execute.tagAr, lang)}
                subtitle={pickLang(
                  data.execute.headingEn,
                  data.execute.headingAr,
                  lang,
                )}
              />
              <div className="ib-lead">
                <p>
                  {pickLang(data.execute.bodyEn, data.execute.bodyAr, lang)}
                </p>
              </div>
              <PrimaryCardGrid
                columns={4}
                className="ib-execute-cards"
              >
                {data.execute.cards.map((card) => (
                  <PrimaryCardSmall
                    key={card.titleEn}
                    title={pickLang(card.titleEn, card.titleAr, lang)}
                  />
                ))}
              </PrimaryCardGrid>
            </div>
          </section>
        );
      case "products":
        return (
          <section key={id} className="blk">
            <div className="wrap">
              <SectionHead
                title={pickLang(
                  data.products.tagEn,
                  data.products.tagAr,
                  lang,
                )}
                subtitle={pickLang(
                  data.products.headingEn,
                  data.products.headingAr,
                  lang,
                )}
              />
              <PrimaryCardClickableGrid
                columns={3}
                items={data.products.items.map((item) => {
                  const Icon = PRODUCT_ICONS[item.href];
                  return {
                    id: item.href,
                    href: "",
                    showArrow: false,
                    icon: Icon ? <Icon strokeWidth={1.5} /> : undefined,
                    title: pickLang(item.titleEn, item.titleAr, lang),
                    body: pickLang(item.bodyEn, item.bodyAr, lang),
                  };
                })}
              />
            </div>
          </section>
        );
      case "lifecycle":
        return (
          <section key={id} className="blk blk--cream">
            <div className="wrap">
              <SectionHead
                title={pickLang(
                  data.lifecycle.tagEn,
                  data.lifecycle.tagAr,
                  lang,
                )}
                subtitle={pickLang(
                  data.lifecycle.headingEn,
                  data.lifecycle.headingAr,
                  lang,
                )}
              />
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
      default:
        return null;
    }
  };

  return (
    <div className="page">
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
