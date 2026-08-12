"use client";

import {
  useEffect,
  useRef,
  useState,
  type AnimationEvent,
  type MouseEvent,
} from "react";
import { useLanguage } from "../i18n/LanguageContext";

export interface PillarCarouselItem {
  num: string;
  title: string;
  body: string;
  href: string;
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

const WM_BARS = [
  { cls: "pcar-wm-b1", x: 120, y: 230, h: 740 },
  { cls: "pcar-wm-b2", x: 235, y: 320, h: 650 },
  { cls: "pcar-wm-b3", x: 350, y: 400, h: 570 },
  { cls: "pcar-wm-b4", x: 465, y: 485, h: 485 },
  { cls: "pcar-wm-b5", x: 565, y: 610, h: 360 },
  { cls: "pcar-wm-b6", x: 665, y: 485, h: 485 },
  { cls: "pcar-wm-b7", x: 780, y: 400, h: 570 },
  { cls: "pcar-wm-b8", x: 895, y: 320, h: 650 },
  { cls: "pcar-wm-b9", x: 1010, y: 230, h: 740 },
] as const;

function prefersReducedMotion(): boolean {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

/** Plays logo animation once per playToken bump. */
function MiyarWatermark({ playToken }: { playToken: number }) {
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    if (playToken === 0) return;
    if (prefersReducedMotion()) return;
    setPlaying(false);
    let outer = 0;
    let inner = 0;
    outer = requestAnimationFrame(() => {
      inner = requestAnimationFrame(() => setPlaying(true));
    });
    return () => {
      cancelAnimationFrame(outer);
      cancelAnimationFrame(inner);
    };
  }, [playToken]);

  const onAnimationEnd = (e: AnimationEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement;
    if (!target.classList.contains("pcar-wm-b1")) return;
    setPlaying(false);
  };

  return (
    <div
      className={`pcar-watermark${playing ? " is-playing-in" : ""}`}
      aria-hidden="true"
      onAnimationEnd={onAnimationEnd}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1200 1200"
        focusable="false"
      >
        <g>
          {WM_BARS.map((bar) => (
            <rect
              key={bar.cls}
              className={`pcar-wm-bar ${bar.cls}`}
              x={bar.x}
              y={bar.y}
              width={70}
              height={bar.h}
              rx={35}
            />
          ))}
        </g>
      </svg>
    </div>
  );
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
  const [logoPlayToken, setLogoPlayToken] = useState(0);
  /** After a slide change, ignore hover-enter until the pointer leaves the card. */
  const suppressHoverPlay = useRef(false);

  const playLogo = () => {
    if (prefersReducedMotion()) return;
    setLogoPlayToken((t) => t + 1);
  };

  useEffect(() => {
    if (prefersReducedMotion()) return;
    setLogoPlayToken(1);
  }, []);

  if (pillars.length === 0) return null;

  const select = (index: number) => {
    const normalized =
      ((index % pillars.length) + pillars.length) % pillars.length;
    if (normalized === active) return;
    suppressHoverPlay.current = true;
    setActive(normalized);
    playLogo();
  };

  const prev = () => select(active - 1);
  const next = () => select(active + 1);

  const onActiveCardEnter = (e: MouseEvent<HTMLElement>) => {
    const related = e.relatedTarget as Node | null;
    if (related && e.currentTarget.contains(related)) return;
    if (suppressHoverPlay.current) return;
    playLogo();
  };

  const onActiveCardLeave = (e: MouseEvent<HTMLElement>) => {
    const related = e.relatedTarget as Node | null;
    if (related && e.currentTarget.contains(related)) return;
    suppressHoverPlay.current = false;
  };

  return (
    <div className="pcar">
      <div className="pcar-stage">
        <aside className="pcar-aside">
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
        </aside>

        <div className="pcar-pillwrap">
          {pillars.map((p, i) => {
            const offset = getOffset(i, active, pillars.length);
            const role = roleForOffset(offset);
            const isActive = role === "active";
            const isThumb = role === "thumb-left" || role === "thumb-right";
            return (
              <div
                key={p.num}
                className={`pcar-card is-${role}`}
                onClick={() => isThumb && select(i)}
                onMouseEnter={isActive ? onActiveCardEnter : undefined}
                onMouseLeave={isActive ? onActiveCardLeave : undefined}
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
                {isActive ? (
                  <MiyarWatermark playToken={logoPlayToken} />
                ) : null}
                <div className="pcar-num">{p.num}</div>
                <div className="pcar-copy">
                  {isActive ? (
                    <a
                      className="pcar-cta"
                      href={p.href}
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        onNavigate(p.href);
                      }}
                      tabIndex={0}
                      aria-label={withTitle(goToPillarAriaLabel, p.title)}
                    >
                      <span className="pcar-outer-title">{p.title}</span>
                      <span className="pcar-panel">
                        <p className="pcar-panel-body">{p.body}</p>
                        <span className="pcar-panel-go" aria-hidden="true">
                          {lang === "ar" ? "←" : "→"}
                        </span>
                      </span>
                    </a>
                  ) : null}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
