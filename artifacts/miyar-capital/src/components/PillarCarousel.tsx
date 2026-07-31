"use client";

import { useState } from "react";
import { useLanguage } from "../i18n/LanguageContext";
import { LazyVideo } from "./LazyVideo";

export interface PillarCarouselItem {
  num: string;
  title: string;
  body: string;
  href: string;
  image: string;
  video: string;
}

interface PillarCarouselProps {
  pillars: PillarCarouselItem[];
  onNavigate: (href: string) => void;
  prevAriaLabel: string;
  nextAriaLabel: string;
  /** Use `{title}` placeholder. */
  showPillarAriaLabel: string;
  /** Use `{title}` placeholder. */
  goToPillarAriaLabel: string;
}

function getOffset(index: number, active: number, length: number) {
  let diff = index - active;
  const half = length / 2;
  if (diff > half) diff -= length;
  if (diff < -half) diff += length;
  return diff;
}

function roleForOffset(
  offset: number,
): "active" | "thumb-left" | "thumb-right" | "hidden" {
  if (offset === 0) return "active";
  if (offset === -1) return "thumb-left";
  if (offset === 1) return "thumb-right";
  return "hidden";
}

function withTitle(template: string, title: string) {
  return template.replace("{title}", title);
}

export function PillarCarousel({
  pillars,
  onNavigate,
  prevAriaLabel,
  nextAriaLabel,
  showPillarAriaLabel,
  goToPillarAriaLabel,
}: PillarCarouselProps) {
  const { lang } = useLanguage();
  const [active, setActive] = useState(0);

  if (pillars.length === 0) return null;

  const select = (index: number) => {
    const normalized =
      ((index % pillars.length) + pillars.length) % pillars.length;
    setActive(normalized);
  };

  const prev = () => select(active - 1);
  const next = () => select(active + 1);

  return (
    <div className="pcar">
      <div className="pcar-stage">
        <div className="pcar-pillwrap">
          {pillars.map((p, i) => {
            const offset = getOffset(i, active, pillars.length);
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
                aria-label={
                  isThumb
                    ? withTitle(showPillarAriaLabel, p.title)
                    : undefined
                }
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
                    aria-label={withTitle(goToPillarAriaLabel, p.title)}
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
            <button
              type="button"
              className="pcar-arrow"
              onClick={prev}
              aria-label={prevAriaLabel}
            >
              {lang === "ar" ? "→" : "←"}
            </button>
            <button
              type="button"
              className="pcar-arrow"
              onClick={next}
              aria-label={nextAriaLabel}
            >
              {lang === "ar" ? "←" : "→"}
            </button>
          </div>
        </div>

        <ul className="pcar-list">
          {pillars.map((pl, i) => (
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
