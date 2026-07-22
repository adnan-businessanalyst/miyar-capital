"use client";

import { useState } from "react";
import { CONTENT_IMAGES, CONTENT_VIDEOS } from "../site/contentImages";
import { LazyVideo } from "./LazyVideo";

interface Pillar {
  num: string;
  title: string;
  body: string;
  href: string;
  image: string;
  video: string;
}

const PILLARS: Pillar[] = [
  {
    num: "I",
    title: "Liquidity & Fixed Income",
    body: "Murabaha and money-market solutions engineered for capital preservation and stable, risk-conscious returns.",
    href: "/product",
    image: CONTENT_IMAGES.pillar_liquidity,
    video: CONTENT_VIDEOS.pillar_liquidity,
  },
  {
    num: "II",
    title: "Equity Management",
    body: "Saudi and regional equity strategies built on a disciplined process for long-term value creation.",
    href: "/asset-management",
    image: CONTENT_IMAGES.pillar_equity,
    video: CONTENT_VIDEOS.pillar_equity,
  },
  {
    num: "III",
    title: "Real Assets",
    body: "Real estate income and development funds offering resilience and diversification for a portfolio.",
    href: "/asset-management",
    image: CONTENT_IMAGES.pillar_real_assets,
    video: CONTENT_VIDEOS.pillar_real_assets,
  },
  {
    num: "IV",
    title: "Private Markets",
    body: "Private equity and private credit strategies for qualified and institutional investors.",
    href: "/private-markets",
    image: CONTENT_IMAGES.pillar_private_markets,
    video: CONTENT_VIDEOS.pillar_private_markets,
  },
];

function getOffset(index: number, active: number, length: number) {
  let diff = index - active;
  const half = length / 2;
  if (diff > half) diff -= length;
  if (diff < -half) diff += length;
  return diff;
}

function roleForOffset(offset: number): "active" | "thumb-left" | "thumb-right" | "hidden" {
  if (offset === 0) return "active";
  if (offset === -1) return "thumb-left";
  if (offset === 1) return "thumb-right";
  return "hidden";
}

interface PillarCarouselProps {
  onNavigate: (href: string) => void;
}

export function PillarCarousel({ onNavigate }: PillarCarouselProps) {
  const [active, setActive] = useState(0);

  const select = (index: number) => {
    const normalized = ((index % PILLARS.length) + PILLARS.length) % PILLARS.length;
    setActive(normalized);
  };

  const prev = () => select(active - 1);
  const next = () => select(active + 1);

  return (
    <div className="pcar">
      <div className="pcar-stage">
        <div className="pcar-pillwrap">
          {PILLARS.map((p, i) => {
            const offset = getOffset(i, active, PILLARS.length);
            const role = roleForOffset(offset);
            const isActive = role === "active";
            const isThumb = role === "thumb-left" || role === "thumb-right";
            const useVideo = Boolean(p.video);
            return (
              <div
                key={p.num}
                className={`pcar-card is-${role}${useVideo || p.image ? " has-media" : ""}`}
                style={
                  !useVideo && p.image
                    ? { backgroundImage: `url(${p.image})` }
                    : undefined
                }
                onClick={() => isThumb && select(i)}
                onKeyDown={(e) => {
                  if (isThumb && (e.key === "Enter" || e.key === " ")) {
                    e.preventDefault();
                    select(i);
                  }
                }}
                role={isThumb ? "button" : undefined}
                tabIndex={isThumb ? 0 : undefined}
                aria-label={isThumb ? `Show ${p.title}` : undefined}
              >
                {useVideo ? (
                  <LazyVideo
                    className="pcar-card-video"
                    src={p.video}
                    poster={p.image || undefined}
                    eager={isActive}
                    aria-label={p.title}
                  />
                ) : null}
                <div className="pcar-overlay" />
                <div className="pcar-num">{p.num}</div>
                <div className="pcar-copy">
                  {isActive && (
                    <div className="pcar-active-body-box">
                      <p className="pcar-active-body">{p.body}</p>
                    </div>
                  )}
                  <a
                    className="pcar-caption"
                    href={p.href}
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      if (isActive) onNavigate(p.href);
                    }}
                    tabIndex={isActive ? 0 : -1}
                    aria-label={`Go to ${p.title}`}
                    aria-hidden={!isActive}
                  >
                    <span className="pcar-caption-label">{p.title}</span>
                    <span className="pcar-caption-arrow" aria-hidden="true">
                      →
                    </span>
                  </a>
                </div>
              </div>
            );
          })}

          <div className="pcar-arrows">
            <button type="button" className="pcar-arrow" onClick={prev} aria-label="Previous pillar">
              ←
            </button>
            <button type="button" className="pcar-arrow" onClick={next} aria-label="Next pillar">
              →
            </button>
          </div>
        </div>

        <ul className="pcar-list">
          {PILLARS.map((pl, i) => (
            <li key={pl.num}>
              <button
                type="button"
                className={`pcar-list-item${i === active ? " is-active" : ""}`}
                onClick={() => select(i)}
              >
                <span className="pcar-list-num">{pl.num}</span>
                <span className="pcar-list-title">{pl.title}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
