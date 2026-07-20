import { useState } from "react";
import liquidityImg from "@assets/generated_images/pillar_liquidity.png";
import equityImg from "@assets/generated_images/pillar_equity.png";
import realAssetsImg from "@assets/generated_images/pillar_real_assets.png";
import privateMarketsImg from "@assets/generated_images/pillar_private_markets.png";

interface Pillar {
  num: string;
  title: string;
  body: string;
  href: string;
  image: string;
}

const PILLARS: Pillar[] = [
  {
    num: "I",
    title: "Liquidity & Fixed Income",
    body: "Murabaha and money-market solutions engineered for capital preservation and stable, risk-conscious returns.",
    href: "/product",
    image: liquidityImg,
  },
  {
    num: "II",
    title: "Equity Management",
    body: "Saudi and regional equity strategies built on a disciplined process for long-term value creation.",
    href: "/asset-management",
    image: equityImg,
  },
  {
    num: "III",
    title: "Real Assets",
    body: "Real estate income and development funds offering resilience and diversification for a portfolio.",
    href: "/asset-management",
    image: realAssetsImg,
  },
  {
    num: "IV",
    title: "Private Markets",
    body: "Private equity and private credit strategies for qualified and institutional investors.",
    href: "/private-markets",
    image: privateMarketsImg,
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
            return (
              <div
                key={p.num}
                className={`pcar-card is-${role}`}
                style={{ backgroundImage: `url(${p.image})` }}
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
                <div className="pcar-overlay" />
                <div className="pcar-num">{p.num}</div>
                <div
                  className="pcar-caption"
                  onClick={(e) => {
                    e.stopPropagation();
                    if (isActive) onNavigate(p.href);
                  }}
                  onKeyDown={(e) => {
                    if (isActive && (e.key === "Enter" || e.key === " ")) {
                      e.preventDefault();
                      onNavigate(p.href);
                    }
                  }}
                  role={isActive ? "button" : undefined}
                  tabIndex={isActive ? 0 : undefined}
                  aria-label={isActive ? `Go to ${p.title}` : undefined}
                >
                  <h3>{p.title}</h3>
                </div>
                {isActive && (
                  <div className="pcar-active-body-box">
                    <p className="pcar-active-body">{p.body}</p>
                  </div>
                )}
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
