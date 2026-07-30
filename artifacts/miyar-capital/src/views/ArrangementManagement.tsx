"use client";

import { useState } from "react";
import { PageHero } from "../components/PageHero";
import { RegisterInterest } from "../components/RegisterInterest";
import {
  ARRANGEMENT_DETAIL_CARDS,
  ARRANGEMENT_SERVICES,
} from "../data/arrangement";
import { CONTENT_IMAGES, DETAILS_PG_IMAGE, IA_INTRO_IMAGE } from "../site/contentImages";
import { MAN_ON_PHONE_IMG as manOnPhone } from "../site/manOnPhone";

const buildingImg = CONTENT_IMAGES.app_bg;
const introImg = IA_INTRO_IMAGE || buildingImg;
const detailBg = DETAILS_PG_IMAGE || buildingImg;

const DEFAULT_ORDER = ["hero", "intro", "services", "detail", "interest"];

export function ArrangementManagement() {
  const sectionOrder = DEFAULT_ORDER;
  const [activeDetail, setActiveDetail] = useState(0);
  const cards = ARRANGEMENT_DETAIL_CARDS;
  const prevDetail = (activeDetail - 1 + cards.length) % cards.length;
  const nextDetail = (activeDetail + 1) % cards.length;

  const goDetail = (index: number) => {
    const n = cards.length;
    setActiveDetail(((index % n) + n) % n);
  };

  const renderSection = (id: string) => {
    switch (id) {
      case "hero":
        return (
          <PageHero
            key={id}
            title="Arrangement Management"
            crumb="Investment Banking / Arrangement Management"
          />
        );
      case "intro":
        return (
          <section key={id} className="blk">
            <div className="wrap">
              <div className="arr-intro">
                <div className="arr-intro-text">
                  <div className="sec-tag">Arrangement &amp; Management</div>
                  <h2>Comprehensive Investment Management</h2>
                  <p>
                    At Miyar Capital, we provide professional arrangement and
                    management services designed to meet the diverse needs of
                    investors and partners. Our approach is grounded in market
                    expertise, disciplined strategy, and full compliance with the
                    Capital Market Authority (CMA) regulations. We focus on
                    structuring investment opportunities that create long-term value
                    while maintaining transparency and integrity at every step.
                  </p>
                  <RegisterInterest
                    sourcePage="/arrangement-management"
                    className="btn btn-outline-navy"
                  />
                </div>
                <div className="arr-intro-img">
                  <img src={introImg} alt="Arrangement management" />
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
                <h2>Arrangement Management Services</h2>
              </div>
              <div className="arr-services">
                {ARRANGEMENT_SERVICES.map((service) => (
                  <div className="arr-service" key={service.title}>
                    <div className="arr-service-icon" aria-hidden="true">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="3" y="3" width="18" height="18" rx="2" />
                        <path d="M3 9h18M9 21V9" />
                      </svg>
                    </div>
                    <h4>{service.title}</h4>
                    <ul>
                      {service.items.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </section>
        );
      case "detail":
        return (
          <section key={id} className="detail">
            <div
              className="detail-bg"
              style={detailBg ? { backgroundImage: `url(${detailBg})` } : undefined}
            />
            <div className="wrap">
              <div className="detail-inner">
                <h2>More Detailed Information</h2>
                <div className="detail-cards">
                  <div className="detail-index" role="tablist" aria-label="Detail cards">
                    {cards.map((card, i) => (
                      <button
                        key={card.title}
                        type="button"
                        role="tab"
                        aria-selected={i === activeDetail}
                        className={i === activeDetail ? "on" : undefined}
                        onClick={() => goDetail(i)}
                      >
                        {card.title}
                      </button>
                    ))}
                  </div>
                  <div className="detail-stage">
                    <button
                      type="button"
                      className="detail-card detail-card--peek detail-card--prev"
                      onClick={() => goDetail(prevDetail)}
                      aria-label={`Previous: ${cards[prevDetail].title}`}
                    >
                      <h4>{cards[prevDetail].title}</h4>
                      <p>{cards[prevDetail].body}</p>
                    </button>
                    <div className="detail-card detail-card--active" role="tabpanel">
                      <h4>{cards[activeDetail].title}</h4>
                      <p>{cards[activeDetail].body}</p>
                    </div>
                    <button
                      type="button"
                      className="detail-card detail-card--peek detail-card--next"
                      onClick={() => goDetail(nextDetail)}
                      aria-label={`Next: ${cards[nextDetail].title}`}
                    >
                      <h4>{cards[nextDetail].title}</h4>
                      <p>{cards[nextDetail].body}</p>
                    </button>
                  </div>
                </div>
                <div className="detail-arrows">
                  <button
                    type="button"
                    className="detail-arrow"
                    onClick={() => goDetail(activeDetail - 1)}
                    aria-label="Previous detail card"
                  >
                    ←
                  </button>
                  <button
                    type="button"
                    className="detail-arrow"
                    onClick={() => goDetail(activeDetail + 1)}
                    aria-label="Next detail card"
                  >
                    →
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

  return <div className="page">{sectionOrder.map((id) => renderSection(id))}</div>;
}
