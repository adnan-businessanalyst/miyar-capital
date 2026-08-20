"use client";

import { useState } from "react";
import { PageHero } from "../components/PageHero";
import { RegisterInterestSection } from "../components/RegisterInterestSection";
import { RichText } from "../components/RichText";
import { SectionHead } from "../components/SectionHead";
import { ARRANGEMENT_MANAGEMENT } from "../data/arrangementmanagement";
import { useLanguage } from "../i18n/LanguageContext";
import {
  CONTENT_IMAGES,
  DETAILS_PG_IMAGE,
  IA_INTRO_IMAGE,
} from "../site/contentImages";
import { pickLang } from "../site/types";

const buildingImg = CONTENT_IMAGES.app_bg;
const introImg = IA_INTRO_IMAGE || buildingImg;
const detailBg = DETAILS_PG_IMAGE || buildingImg;
const servicesImg = CONTENT_IMAGES.our_services_arrangement_management;

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
  const svc = data.services;

  const cardTitle = (i: number) =>
    pickLang(cards[i].titleEn, cards[i].titleAr, lang);
  const cardBody = (i: number) =>
    pickLang(cards[i].bodyEn, cards[i].bodyAr, lang);

  const goDetail = (index: number) => {
    const n = cards.length;
    setActiveDetail(((index % n) + n) % n);
  };

  const renderServices = () => {
    const cm = svc.capitalMarkets;
    const sukuk = svc.sukukDebt;
    const ma = svc.ma;
    const bank = svc.bankFinancing;

    return (
      <section
        key="services"
        className="blk arr-services"
        style={{ background: "#fff", backgroundColor: "#fff" }}
      >
        <div className="wrap">
          <div className="arr-services-layout">
            <aside className="arr-services-right">
              <SectionHead
                title={pickLang(svc.headingEn, svc.headingAr, lang)}
              />
              <figure className="arr-services-media">
                <img
                  className="arr-services-media-back"
                  src={detailBg}
                  alt=""
                  aria-hidden="true"
                />
                <div className="arr-services-media-frame">
                  <img
                    src={servicesImg}
                    alt={pickLang(
                      "Arrangement management services",
                      "خدمات إدارة الترتيبات",
                      lang,
                    )}
                  />
                </div>
              </figure>
              <nav
                className="arr-services-toc"
                aria-label={pickLang(svc.headingEn, svc.headingAr, lang)}
              >
                <ul>
                  {(
                    [
                      { id: cm.id, titleEn: cm.titleEn, titleAr: cm.titleAr },
                      {
                        id: sukuk.id,
                        titleEn: sukuk.titleEn ?? "",
                        titleAr: sukuk.titleAr,
                      },
                      { id: ma.id, titleEn: ma.titleEn, titleAr: ma.titleAr },
                      {
                        id: bank.id,
                        titleEn: bank.titleEn,
                        titleAr: bank.titleAr,
                      },
                    ] as const
                  ).map((item) => {
                    const label = pickLang(item.titleEn, item.titleAr, lang);
                    if (!label.trim()) return null;
                    return (
                      <li key={item.id}>
                        <a href={`#${item.id}`}>{label}</a>
                      </li>
                    );
                  })}
                </ul>
              </nav>
            </aside>

            <div className="arr-services-left">
              {/* Capital Markets — arrow chips */}
              <article className="arr-svc arr-svc--capital" id={cm.id}>
                <div className="arr-svc-head">
                  <div className="arr-svc-head-copy">
                    <h3 className="arr-svc-title">
                      <RichText
                        html={pickLang(cm.titleEn, cm.titleAr, lang)}
                      />
                    </h3>
                    <RichText
                      as="p"
                      className="arr-svc-lead"
                      html={pickLang(cm.bodyEn, cm.bodyAr, lang)}
                    />
                  </div>
                </div>
                <div className="arr-arrows" role="list">
                  {cm.arrows.map((arrow, i) => (
                    <div
                      key={`${arrow.labelAr}-${i}`}
                      className={`arr-arrow arr-arrow--${arrow.tone}`}
                      role="listitem"
                    >
                      <span className="arr-arrow-label">
                        <RichText
                          html={pickLang(arrow.labelEn, arrow.labelAr, lang)}
                        />
                      </span>
                    </div>
                  ))}
                </div>
              </article>

              {/* Sukuk & Debt — numbered rows */}
              <article className="arr-svc arr-svc--sukuk" id={sukuk.id}>
                <div className="arr-svc-head">
                  <h3 className="arr-svc-title">
                    <RichText
                      html={pickLang(sukuk.titleEn, sukuk.titleAr, lang)}
                    />
                  </h3>
                </div>
                <div className="arr-sukuk-rows">
                  {sukuk.rows.map((row) => (
                    <div
                      key={row.num}
                      className={`arr-sukuk-row arr-sukuk-row--${row.tone}`}
                    >
                      <span className="arr-sukuk-num" aria-hidden="true">
                        {row.num}
                      </span>
                      <div className="arr-sukuk-title">
                        <RichText
                          html={pickLang(row.titleEn, row.titleAr, lang)}
                        />
                      </div>
                      <div className="arr-sukuk-body">
                        <RichText
                          html={pickLang(row.bodyEn, row.bodyAr, lang)}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </article>

              {/* M&A — 3×2 mosaic */}
              <article className="arr-svc arr-svc--ma" id={ma.id}>
                <div className="arr-svc-head">
                  <div className="arr-svc-head-copy">
                    <h3 className="arr-svc-title">
                      <RichText html={pickLang(ma.titleEn, ma.titleAr, lang)} />
                    </h3>
                    <RichText
                      as="p"
                      className="arr-svc-lead"
                      html={pickLang(ma.subtitleEn, ma.subtitleAr, lang)}
                    />
                  </div>
                </div>
                <div className="arr-ma-grid" role="list">
                  {ma.cells.map((cell, i) => (
                    <div
                      key={`${cell.labelAr}-${i}`}
                      className={`arr-ma-cell arr-ma-cell--${cell.tone}`}
                      role="listitem"
                    >
                      <RichText
                        html={pickLang(cell.labelEn, cell.labelAr, lang)}
                      />
                    </div>
                  ))}
                </div>
              </article>

              {/* Bank financing — intro + bordered cards */}
              <article className="arr-svc arr-svc--bank" id={bank.id}>
                <div className="arr-bank-split">
                  <div className="arr-bank-intro">
                    <h3 className="arr-svc-title">
                      <RichText
                        html={pickLang(bank.titleEn, bank.titleAr, lang)}
                      />
                    </h3>
                    <RichText
                      as="p"
                      className="arr-svc-lead"
                      html={pickLang(bank.bodyEn, bank.bodyAr, lang)}
                    />
                    <RichText
                      as="p"
                      className="arr-bank-highlight"
                      html={pickLang(bank.highlightEn, bank.highlightAr, lang)}
                    />
                  </div>
                  <div className="arr-bank-cards">
                    {bank.cards.map((card, i) => (
                      <div key={`${card.titleAr}-${i}`} className="arr-bank-card">
                        <h4>
                          <RichText
                            html={pickLang(card.titleEn, card.titleAr, lang)}
                          />
                        </h4>
                        <RichText
                          as="p"
                          html={pickLang(card.bodyEn, card.bodyAr, lang)}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </article>
            </div>
          </div>
        </div>
      </section>
    );
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
                  <SectionHead
                    className="arr-intro-head"
                    title={pickLang(data.intro.tagEn, data.intro.tagAr, lang)}
                    subtitle={pickLang(
                      data.intro.headingEn,
                      data.intro.headingAr,
                      lang,
                    )}
                  />
                  <RichText
                    as="p"
                    html={pickLang(data.intro.bodyEn, data.intro.bodyAr, lang)}
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
        return renderServices();
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
                  <RichText
                    html={pickLang(
                      data.detail.headingEn,
                      data.detail.headingAr,
                      lang,
                    )}
                  />
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
                      <h3>{cardTitle(prevDetail)}</h3>
                      <p>{cardBody(prevDetail)}</p>
                    </button>
                    <div
                      className="detail-card detail-card--active"
                      role="tabpanel"
                    >
                      <h3>{cardTitle(activeDetail)}</h3>
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
                      <h3>{cardTitle(nextDetail)}</h3>
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
        return null;
      default:
        return null;
    }
  };

  return (
    <div className="page page--arrangement">
      {data.sectionOrder.map((id) => renderSection(id))}
      <RegisterInterestSection
        sourcePage="/arrangement-management"
        pageTitleEn="Arrangement Management"
        pageTitleAr="إدارة الترتيبات"
      />
    </div>
  );
}
