"use client";

import { useState, useEffect, useRef, type CSSProperties, type ComponentType } from "react";
import { useRouter } from "next/navigation";
import {
  Target,
  SlidersHorizontal,
  Compass,
  Handshake,
  ChartColumnIncreasing,
  type LucideProps,
} from "lucide-react";
import { useLanguage } from "../i18n/LanguageContext";
import { HERO_CARD, HERO_CARD_IMAGE } from "../site/heroCard";
import { HERO_CTA } from "../site/heroCta";
import { HERO_TEXT } from "../site/heroText";
import { pickLang } from "../site/types";
import { HeroBackground } from "../components/HeroBackground";
import { LazyVideo } from "../components/LazyVideo";
import { Disclaimer } from "../components/Disclaimer";
import { CONTENT_IMAGES, CONTENT_VIDEOS } from "../site/contentImages";
import { FOOTER_BG_IMAGE } from "../site/footer";
import { MAN_ON_PHONE_IMG as contactImg } from "../site/manOnPhone";
import { useHeroCardLoginAlign } from "../hooks/useHeroCardLoginAlign";
import { ContactForm } from "../components/ContactForm";
import type { TranslationKey } from "../i18n/translations";

const appBg = CONTENT_IMAGES.app_bg;
const appPhoneScreen = CONTENT_IMAGES.app_phone_screen;
const appPhoneVideo = CONTENT_VIDEOS.app_phone_screen;
const ibImg = CONTENT_IMAGES.service_investment_banking;
const amImg = CONTENT_IMAGES.service_asset_management;

type TFn = (key: TranslationKey) => string;

interface SlotCfg {
  mode?: "original" | "upload" | "color" | "gradient";
  src?: string;
  color?: string;
  g2?: string;
  ga?: number;
  shadow?: boolean;
  sat?: number;
  altText?: string;
}

function parseSlot(raw: string): SlotCfg {
  if (!raw) return {};
  try { return JSON.parse(raw); } catch { return {}; }
}

function slotStyle(cfg: SlotCfg): React.CSSProperties {
  const parts: string[] = [];
  if (cfg.sat !== undefined && cfg.sat !== 100) parts.push(`saturate(${cfg.sat}%)`);
  if (cfg.shadow) parts.push("drop-shadow(0 6px 16px rgba(0,0,0,0.45))");
  return parts.length ? { filter: parts.join(" ") } : {};
}

function SlotImg({ raw, fallback, className, alt }: { raw: string; fallback: string; className?: string; alt?: string }) {
  const cfg = parseSlot(raw);
  const style = slotStyle(cfg);
  if (cfg.mode === "color" && cfg.color) {
    const boxShadow = cfg.shadow ? "0 6px 16px rgba(0,0,0,0.45)" : undefined;
    return <div className={`fp-img-slot${className ? ` ${className}` : ""}`} style={{ background: cfg.color, boxShadow }} />;
  }
  if (cfg.mode === "gradient" && cfg.color) {
    const angle = cfg.ga ?? 135;
    const c2 = cfg.g2 ?? cfg.color;
    const boxShadow = cfg.shadow ? "0 6px 16px rgba(0,0,0,0.45)" : undefined;
    return <div className={`fp-img-slot${className ? ` ${className}` : ""}`} style={{ background: `linear-gradient(${angle}deg, ${cfg.color}, ${c2})`, boxShadow }} />;
  }
  const src = cfg.mode === "upload" && cfg.src ? cfg.src : fallback;
  return <img className={className} src={src} alt={cfg.altText ?? alt ?? ""} style={style} />;
}

const WHY_CARDS: {
  Icon: ComponentType<LucideProps>;
  h: TranslationKey;
  p: TranslationKey;
}[] = [
  { Icon: Target, h: "fp_why_h", p: "fp_why_p" },
  { Icon: SlidersHorizontal, h: "fp_why2_h", p: "fp_why2_p" },
  { Icon: Compass, h: "fp_why3_h", p: "fp_why3_p" },
  { Icon: Handshake, h: "fp_why4_h", p: "fp_why4_p" },
  { Icon: ChartColumnIncreasing, h: "fp_why5_h", p: "fp_why5_p" },
];

function WhyAccordion({ t }: { t: TFn }) {
  const [open, setOpen] = useState(0);
  return (
    <div className="fp-why-layout">
      <div
        className="fp-why-acc"
        style={
          FOOTER_BG_IMAGE
            ? ({ "--fp-why-expanded-bg": `url(${FOOTER_BG_IMAGE})` } as CSSProperties)
            : undefined
        }
      >
        {WHY_CARDS.map((card, i) => {
          const Icon = card.Icon;
          return (
            <div
              key={i}
              className={`fp-why-item${open === i ? " is-open" : ""}`}
              onClick={() => setOpen(i)}
            >
              <span className="fp-why-item-num">0{i + 1}</span>
              <span className="fp-why-icon" aria-hidden="true">
                <span className="fp-why-icon-extrude">
                  <Icon strokeWidth={1.5} />
                </span>
                <span className="fp-why-icon-extrude fp-why-icon-extrude--mid">
                  <Icon strokeWidth={1.5} />
                </span>
                <span className="fp-why-icon-face">
                  <Icon strokeWidth={1.5} />
                </span>
              </span>
              <div className="fp-why-item-body">
                <h3>{t(card.h)}</h3>
                <p>{t(card.p)}</p>
              </div>
            </div>
          );
        })}
      </div>
      <ul className="fp-why-list">
        {WHY_CARDS.map((card, i) => (
          <li
            key={i}
            className={open === i ? "is-active" : undefined}
            onClick={() => setOpen(i)}
          >
            {t(card.h)}
          </li>
        ))}
      </ul>
    </div>
  );
}

const MIYAR_LETTERS = ["M", "I", "Y", "A", "R"];

function AnimatedHero({ lang }: { lang: string }) {
  const FADE_MS = 300;
  const [litIdx, setLitIdx] = useState(0);
  const [displayIdx, setDisplayIdx] = useState(0);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    let pos = 0;
    const id = setInterval(() => {
      setFading(true);
      setTimeout(() => {
        pos = (pos + 1) % MIYAR_LETTERS.length;
        setLitIdx(pos);
        setDisplayIdx(pos);
        setFading(false);
      }, FADE_MS);
    }, HERO_TEXT.animationSpeedMs);
    return () => clearInterval(id);
  }, []);

  const data = HERO_TEXT.letters[displayIdx] ?? {
    hEn: "",
    hAr: "",
    pEn: "",
    pAr: "",
  };
  const h1Text =
    (lang === "ar" ? data.hAr : data.hEn) ||
    (lang === "ar" ? HERO_TEXT.fallbackH1Ar : HERO_TEXT.fallbackH1En);
  const pText =
    (lang === "ar" ? data.pAr : data.pEn) ||
    (lang === "ar" ? HERO_TEXT.fallbackPAr : HERO_TEXT.fallbackPEn);

  return (
    <>
      <span className="fp-eyebrow">
        {MIYAR_LETTERS.map((char, i) => (
          <span key={i} className={litIdx === i ? "fp-ey-lit" : undefined}>
            {char}
          </span>
        ))}
        <span className="fp-ey-static">{"\u00A0CAPITAL"}</span>
      </span>
      <div className={`fp-hero-swap${fading ? " is-fading" : ""}`}>
        <h1>{h1Text}</h1>
        <p>{pText}</p>
      </div>
    </>
  );
}

const DEFAULT_ORDER = ["hero", "whatwedo", "services", "principals", "why", "contact", "disclaimer", "app"];

/** Sections that alternate light / soft backgrounds (not hero, app, or footer). */
const FP_BANDED_SECTIONS = new Set([
  "whatwedo",
  "services",
  "principals",
  "why",
  "contact",
  "disclaimer",
]);

function fpSectionBgClass(id: string, order: string[]): string {
  if (!FP_BANDED_SECTIONS.has(id)) return "";
  const banded = order.filter((s) => FP_BANDED_SECTIONS.has(s));
  const i = banded.indexOf(id);
  if (i < 0) return "";
  return i % 2 === 0 ? "fp-section-bg-a" : "fp-section-bg-b";
}

export function FrontPage() {
  const router = useRouter();
  const { t, lang } = useLanguage();
  const heroWrapRef = useRef<HTMLDivElement>(null);
  useHeroCardLoginAlign(heroWrapRef, HERO_CARD.show, lang);

  const openHref = (href: string) => {
    if (/^https?:\/\//.test(href)) {
      window.open(href, "_blank", "noopener,noreferrer");
      return;
    }
    if (href.startsWith("#")) {
      const el = document.getElementById(href.slice(1));
      el?.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }
    router.push(href);
  };

  const followLink = (stored: string, defaultPath: string) => {
    openHref(stored || defaultPath);
  };

  const googlePlayUrl = t("fp_app_google_url");
  const appStoreUrl = t("fp_app_store_url");
  const sectionOrder = DEFAULT_ORDER;
  const bg = (id: string) => fpSectionBgClass(id, sectionOrder);

  const renderSection = (id: string) => {
    switch (id) {
      case "hero":
        return (
          <section key={id} className="fp-hero">
            <HeroBackground />
            <div className="wrap fp-hero-inner" ref={heroWrapRef}>
              <div className="fp-hero-text">
                <AnimatedHero lang={lang} />
                {HERO_CTA.show && (
                  <button
                    className="btn btn-gold fp-round"
                    type="button"
                    onClick={() => openHref(HERO_CTA.href)}
                  >
                    {pickLang(HERO_CTA.labelEn, HERO_CTA.labelAr, lang)}
                  </button>
                )}
              </div>
              {HERO_CARD.show && (
                <aside
                  className="fp-hero-card"
                  style={{
                    ...(HERO_CARD.background ? { background: HERO_CARD.background } : {}),
                    ...(HERO_CARD.width > 0
                      ? { width: "100%", maxWidth: HERO_CARD.width }
                      : {}),
                    ...(HERO_CARD.height > 0
                      ? {
                          height: HERO_CARD.height,
                          display: "flex",
                          flexDirection: "column" as const,
                        }
                      : {}),
                  }}
                  onClick={() => openHref(HERO_CARD.href)}
                >
                  {HERO_CARD.showImage && HERO_CARD_IMAGE ? (
                    <img
                      src={HERO_CARD_IMAGE}
                      alt={pickLang(HERO_CARD.titleEn, HERO_CARD.titleAr, lang)}
                    />
                  ) : null}
                  <div className="fp-hero-card-body">
                    <h4
                      style={{
                        ...(HERO_CARD.headingColor ? { color: HERO_CARD.headingColor } : {}),
                        ...(HERO_CARD.headingFont
                          ? { fontFamily: HERO_CARD.headingFont }
                          : {}),
                      }}
                    >
                      {pickLang(HERO_CARD.titleEn, HERO_CARD.titleAr, lang)}
                    </h4>
                    <p style={HERO_CARD.textColor ? { color: HERO_CARD.textColor } : undefined}>
                      {pickLang(HERO_CARD.bodyEn, HERO_CARD.bodyAr, lang)}
                    </p>
                    <span className="fp-card-arrow">→</span>
                  </div>
                </aside>
              )}
            </div>
          </section>
        );
      case "whatwedo":
        return (
          <section key={id} className={`blk fp-wwd ${bg(id)}`}>
            <div className="wrap">
              <div className="fp-tag">{t("fp_wwd_tag")}</div>
              <h2 className="fp-h2 fp-wwd-h2">{t("fp_wwd_h")}</h2>
              <p className="fp-wwd-lead">{t("fp_wwd_lead")}</p>
              <a
                className="fp-wwd-link"
                href="/who-we-are"
                onClick={(e) => {
                  e.preventDefault();
                  followLink(t("fp_wwd_link_url"), "/who-we-are");
                }}
              >
                <span className="fp-wwd-link-label">{t("fp_wwd_link")}</span>
                <span className="fp-wwd-link-arrow" aria-hidden="true">
                  →
                </span>
              </a>
              <div className="fp-wwd-pillars">
                <div className="fp-wwd-pillar">
                  <div className="fp-wwd-pillar-n">{t("fp_wwd_p1_n")}</div>
                  <div className="fp-wwd-pillar-l">{t("fp_wwd_p1_l")}</div>
                </div>
                <div className="fp-wwd-pillar">
                  <div className="fp-wwd-pillar-n">{t("fp_wwd_p2_n")}</div>
                  <div className="fp-wwd-pillar-l">{t("fp_wwd_p2_l")}</div>
                </div>
                <div className="fp-wwd-pillar">
                  <div className="fp-wwd-pillar-n">{t("fp_wwd_p3_n")}</div>
                  <div className="fp-wwd-pillar-l">{t("fp_wwd_p3_l")}</div>
                </div>
              </div>
            </div>
          </section>
        );
      case "principals":
        return (
          <section key={id} className={`blk fp-principals ${bg(id)}`}>
            <div className="wrap fp-principals-grid">
              <p className="fp-principals-left">
                {t("fp_prin_left_a")}
                <span className="fp-principals-hl">{t("fp_prin_left_hl")}</span>
                {t("fp_prin_left_b")}
              </p>
              <div className="fp-principals-right">
                <p>
                  <strong>{t("fp_prin_r1_lead")}</strong>
                  {t("fp_prin_r1_body")}
                </p>
                <p>
                  <strong>{t("fp_prin_r2_lead")}</strong>
                  {t("fp_prin_r2_body")}
                </p>
                <p>
                  <strong>{t("fp_prin_r3_lead")}</strong>
                  {t("fp_prin_r3_body")}
                </p>
              </div>
            </div>
          </section>
        );
      case "services":
        return (
          <section key={id} id="what-we-do" className={`blk ${bg(id)}`}>
            <div className="wrap">
              <div className="fp-center">
                <div className="fp-tag">{t("fp_services_tag")}</div>
                <h2 className="fp-h2">{t("fp_services_h")}</h2>
              </div>
              <div className="fp-services">
                <div className="fp-service" onClick={() => followLink(t("fp_svc_ib_url"), "/investment-banking")}>
                  <SlotImg raw={t("fp_img_svc_ib")} fallback={ibImg} alt="Investment Banking" />
                  <div className="fp-service-cap">
                    <span className="fp-service-num" aria-hidden="true">01</span>
                    <h3>{t("fp_svc_ib")}</h3>
                    <p>{t("fp_svc_ib_p")}</p>
                    <span className="fp-service-link">
                      {t("fp_svc_ib_link")}
                      <span className="fp-service-link-arrow" aria-hidden="true">→</span>
                    </span>
                  </div>
                </div>
                <div className="fp-service" onClick={() => followLink(t("fp_svc_am_url"), "/asset-management")}>
                  <SlotImg raw={t("fp_img_svc_am")} fallback={amImg} alt="Asset Management" />
                  <div className="fp-service-cap">
                    <span className="fp-service-num" aria-hidden="true">02</span>
                    <h3>{t("fp_svc_am")}</h3>
                    <p>{t("fp_svc_am_p")}</p>
                    <span className="fp-service-link">
                      {t("fp_svc_am_link")}
                      <span className="fp-service-link-arrow" aria-hidden="true">→</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </section>
        );
      case "why":
        return (
          <section key={id} className={`blk ${bg(id)}`}>
            <div className="wrap">
              <div className="fp-center" style={{ marginBottom: "28px" }}>
                <div className="fp-tag">{t("fp_why_tag")}</div>
              </div>
              <WhyAccordion t={t} />
            </div>
          </section>
        );
      case "contact":
        return (
          <section key={id} className={`fp-contact ${bg(id)}`}>
            <div className="fp-contact-media">
              <SlotImg raw={t("fp_img_contact")} fallback={contactImg} alt="" />
            </div>
            <div className="fp-contact-form">
              <div className="fp-tag">{t("fp_contact_tag")}</div>
              <h2 className="fp-h2">{t("fp_contact_h")}</h2>
              <ContactForm
                sourcePage="/"
                variant="homepage"
                className="fp-contact-fields"
                showSubject
                submitLabel={t("fp_contact_send")}
                thanksClassName="ri-thanks"
              />
            </div>
          </section>
        );
      case "disclaimer":
        return (
          <section key={id} className={bg(id)}>
            <Disclaimer />
          </section>
        );
      case "app":
        return (
          <section key={id} className="fp-app">
            <img
              className="fp-app-bg"
              src={appBg}
              alt="mobile app section background image"
            />
            <div className="wrap fp-app-inner">
              <div className="fp-app-text">
                <h2>{t("fp_app_h")}</h2>
                <p>{t("fp_app_p")}</p>
                <div className="fp-store">
                  <a
                    className="fp-store-btn"
                    href={googlePlayUrl || undefined}
                    target={googlePlayUrl ? "_blank" : undefined}
                    rel={googlePlayUrl ? "noopener noreferrer" : undefined}
                  >
                    <span className="fp-store-ico">▶</span>
                    <span><small>Get it on</small>Google Play</span>
                  </a>
                  <a
                    className="fp-store-btn"
                    href={appStoreUrl || undefined}
                    target={appStoreUrl ? "_blank" : undefined}
                    rel={appStoreUrl ? "noopener noreferrer" : undefined}
                  >
                    <span className="fp-store-ico"></span>
                    <span><small>Download on the</small>App Store</span>
                  </a>
                </div>
              </div>
              <div className="fp-app-phones">
                <div className="fp-phone">
                  <div className="fp-phone-notch" />
                  <div
                    className={`fp-phone-screen${appPhoneVideo || appPhoneScreen ? " has-media" : ""}`}
                    style={
                      !appPhoneVideo && appPhoneScreen
                        ? {
                            backgroundImage: `url(${appPhoneScreen})`,
                            backgroundSize: "cover",
                            backgroundPosition: "top center",
                            backgroundRepeat: "no-repeat",
                          }
                        : undefined
                    }
                    role={!appPhoneVideo && appPhoneScreen ? "img" : undefined}
                    aria-label={
                      appPhoneVideo || appPhoneScreen
                        ? "Miyar mobile app screen"
                        : undefined
                    }
                  >
                    {appPhoneVideo ? (
                      <LazyVideo
                        className="fp-phone-media"
                        src={appPhoneVideo}
                        poster={appPhoneScreen || undefined}
                        aria-label="Miyar mobile app screen"
                      />
                    ) : (
                      !appPhoneScreen && (
                        <>
                          <div className="fp-phone-brand">MIYAR</div>
                          <div className="fp-phone-bar" />
                          <div className="fp-phone-bar short" />
                          <div className="fp-phone-tile" />
                          <div className="fp-phone-bar" />
                          <div className="fp-phone-bar short" />
                        </>
                      )
                    )}
                  </div>
                </div>
              </div>
            </div>
          </section>
        );
      default:
        return null;
    }
  };

  return <div className="page fp">{sectionOrder.map((id) => renderSection(id))}</div>;
}
