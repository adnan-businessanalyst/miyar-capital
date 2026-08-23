"use client";

import { useState, useEffect, useLayoutEffect, useRef, type CSSProperties, type ComponentType } from "react";
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
import { useLocalePath } from "../i18n/useLocalePath";
import { HERO_TEXT } from "../site/heroText";
import { pickLang } from "../site/types";
import { HeroBackground } from "../components/HeroBackground";
import { CONTENT_IMAGES } from "../site/contentImages";
import { FOOTER_BG_IMAGE } from "../site/footer";
import { useHeroCardLoginAlign } from "../hooks/useHeroCardLoginAlign";
import { GetInTouch } from "../components/GetInTouch";
import { RichText } from "../components/RichText";
import { SarText } from "../components/SarText";
import { SectionHead } from "../components/SectionHead";
import { CONTACT } from "../data/contact";
import type { TranslationKey } from "../data/frontpage";
import type { HomepageHero } from "../data/homepageHero";
import { DEFAULT_HOMEPAGE_HERO } from "../data/homepageHero";
import { EXECUTIVE_TEAM, resolvePersonPhoto } from "../data/people";

const ceo = EXECUTIVE_TEAM.find((p) => p.id === "ceo") ?? EXECUTIVE_TEAM[0];
const ceoPhoto = resolvePersonPhoto(ceo.photo, ceo.gender);

const appPhoneScreen = CONTENT_IMAGES.app_phone_screen;
const whySectionBg = CONTENT_IMAGES.section_bg_our_approach;
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

function AppPhone({ className }: { className?: string }) {
  return (
    <div className={`fp-phone${className ? ` ${className}` : ""}`}>
      <div className="fp-phone-notch" />
      <div
        className={`fp-phone-screen${appPhoneScreen ? " has-media" : ""}`}
        style={
          appPhoneScreen
            ? {
                backgroundImage: `url(${appPhoneScreen})`,
                backgroundSize: "cover",
                backgroundPosition: "top center",
                backgroundRepeat: "no-repeat",
              }
            : undefined
        }
        role={appPhoneScreen ? "img" : undefined}
        aria-label={appPhoneScreen ? "Miyar mobile app screen" : undefined}
      >
        {!appPhoneScreen && (
          <>
            <div className="fp-phone-brand">MIYAR</div>
            <div className="fp-phone-bar" />
            <div className="fp-phone-bar short" />
            <div className="fp-phone-tile" />
            <div className="fp-phone-bar" />
            <div className="fp-phone-bar short" />
          </>
        )}
      </div>
    </div>
  );
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
      {/* List first: left in EN (LTR), right in AR (RTL). */}
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
    </div>
  );
}

const MIYAR_LETTERS_EN = ["M", "I", "Y", "A", "R"];
/** Same 5-letter structure as MIYAR → معيار */
const MIYAR_LETTERS_AR = ["م", "ع", "ي", "ا", "ر"];
const CAPITAL_EN = "CAPITAL";
const CAPITAL_AR = "المالية";

function AnimatedHero({ lang }: { lang: string }) {
  const FADE_MS = 300;
  const isAr = lang === "ar";
  const letters = isAr ? MIYAR_LETTERS_AR : MIYAR_LETTERS_EN;
  const capital = isAr ? CAPITAL_AR : CAPITAL_EN;
  const [litIdx, setLitIdx] = useState(0);
  const [displayIdx, setDisplayIdx] = useState(0);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    let pos = 0;
    const id = setInterval(() => {
      setFading(true);
      setTimeout(() => {
        pos = (pos + 1) % letters.length;
        setLitIdx(pos);
        setDisplayIdx(pos);
        setFading(false);
      }, FADE_MS);
    }, HERO_TEXT.animationSpeedMs);
    return () => clearInterval(id);
  }, [letters.length]);

  const data = HERO_TEXT.letters[displayIdx] ?? {
    hEn: "",
    hAr: "",
    pEn: "",
    pAr: "",
  };
  const h1Text =
    (isAr ? data.hAr : data.hEn) ||
    (isAr ? HERO_TEXT.fallbackH1Ar : HERO_TEXT.fallbackH1En);
  const pText =
    (isAr ? data.pAr : data.pEn) ||
    (isAr ? HERO_TEXT.fallbackPAr : HERO_TEXT.fallbackPEn);

  return (
    <>
      <h1 className="fp-eyebrow" lang={isAr ? "ar" : "en"} dir={isAr ? "rtl" : "ltr"}>
        {letters.map((char, i) => (
          <span key={`${char}-${i}`} className={litIdx === i ? "fp-ey-lit" : undefined}>
            {char}
          </span>
        ))}
        <span className="fp-ey-static">
          {isAr ? `${capital}\u00A0` : `\u00A0${capital}`}
        </span>
      </h1>
      <div className={`fp-hero-swap${fading ? " is-fading" : ""}`}>
        <h2>{h1Text}</h2>
        <p>{pText}</p>
      </div>
    </>
  );
}

const DEFAULT_ORDER = [
  "hero",
  "whatwedo",
  "services",
  "principals",
  "why",
  "contact",
  "app",
];

/** Sections that alternate light / soft backgrounds (not hero, app, or footer). */
const FP_BANDED_SECTIONS = new Set([
  "whatwedo",
  "services",
  "principals",
  "why",
  "contact",
]);

function fpSectionBgClass(id: string, order: string[]): string {
  if (!FP_BANDED_SECTIONS.has(id)) return "";
  const banded = order.filter((s) => FP_BANDED_SECTIONS.has(s));
  const i = banded.indexOf(id);
  if (i < 0) return "";
  return i % 2 === 0 ? "fp-section-bg-a" : "fp-section-bg-b";
}

export function FrontPage({
  hero,
}: {
  hero?: HomepageHero;
}) {
  const router = useRouter();
  const { t, lang } = useLanguage();
  const withLocale = useLocalePath();
  const heroWrapRef = useRef<HTMLDivElement>(null);
  const fpRootRef = useRef<HTMLDivElement>(null);
  const pillarsBoxRef = useRef<HTMLDivElement>(null);
  const h = hero ?? DEFAULT_HOMEPAGE_HERO;
  useHeroCardLoginAlign(heroWrapRef, h.promoShow, lang);

  useLayoutEffect(() => {
    const root = fpRootRef.current;
    const box = pillarsBoxRef.current;
    if (!root || !box) return;
    const apply = () => {
      root.style.setProperty("--fp-pillars-h", `${Math.round(box.getBoundingClientRect().height)}px`);
    };
    apply();
    const ro = new ResizeObserver(apply);
    ro.observe(box);
    return () => {
      ro.disconnect();
      root.style.removeProperty("--fp-pillars-h");
    };
  }, [lang]);

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
    if (href.startsWith("/")) {
      router.push(withLocale(href));
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
                {h.ctaShow && (
                  <button
                    className="btn btn-gold fp-round"
                    type="button"
                    onClick={() => openHref(h.ctaHref)}
                  >
                    {pickLang(h.ctaLabelEn, h.ctaLabelAr, lang)}
                  </button>
                )}
              </div>
              {h.promoShow && (
                <aside
                  className="fp-hero-card"
                  onClick={() => openHref(h.promoHref)}
                >
                  <div className="fp-hero-card-body">
                    <h2>
                      <RichText
                        html={pickLang(h.promoTitleEn, h.promoTitleAr, lang)}
                      />
                    </h2>
                    <RichText
                      as="p"
                      html={pickLang(h.promoBodyEn, h.promoBodyAr, lang)}
                    />
                  </div>
                  <span className="fp-card-arrow" aria-hidden="true">
                    →
                  </span>
                </aside>
              )}
            </div>
          </section>
        );
      case "whatwedo":
        return (
          <section key={id} className={`blk fp-wwd ${bg(id)}`}>
            <div className="wrap">
              <h2 className="fp-tag">{t("fp_wwd_tag")}</h2>
              <p className="subtitle fp-h2 fp-wwd-h2">{t("fp_wwd_h")}</p>
              <p className="fp-wwd-lead">{t("fp_wwd_lead")}</p>
              <a
                className="fp-wwd-link"
                href={withLocale("/who-we-are")}
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
                  <div className="fp-wwd-pillar-n">
                    <SarText text={t("fp_wwd_p1_n")} />
                  </div>
                  <div className="fp-wwd-pillar-l">
                    <SarText text={t("fp_wwd_p1_l")} />
                  </div>
                </div>
                <div className="fp-wwd-pillar">
                  <div className="fp-wwd-pillar-n">
                    <SarText text={t("fp_wwd_p2_n")} />
                  </div>
                  <div className="fp-wwd-pillar-l">
                    <SarText text={t("fp_wwd_p2_l")} />
                  </div>
                </div>
                <div className="fp-wwd-pillar">
                  <div className="fp-wwd-pillar-n">
                    <SarText text={t("fp_wwd_p3_n")} />
                  </div>
                  <div className="fp-wwd-pillar-l">
                    <SarText text={t("fp_wwd_p3_l")} />
                  </div>
                </div>
              </div>
            </div>
          </section>
        );
      case "principals":
        return (
          <section key={id} className={`blk fp-principals ${bg(id)}`}>
            <div className="wrap fp-principals-grid">
              <div className="fp-principals-top">
                <p className="fp-principals-left">
                  {t("fp_prin_left_a")}
                  <span className="fp-principals-hl">{t("fp_prin_left_hl")}</span>
                  {t("fp_prin_left_b")}
                </p>
                <figure className="fp-principals-photo">
                  <img
                    src={ceoPhoto}
                    alt={pickLang(ceo.name, ceo.nameAr, lang)}
                  />
                </figure>
              </div>
              <div className="fp-principals-right">
                <div className="fp-pillars-box" ref={pillarsBoxRef}>
                  <h2>{t("fp_prin_pillars")}</h2>
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
            </div>
          </section>
        );
      case "services":
        return (
          <section key={id} id="what-we-do" className={`blk fp-services-section ${bg(id)}`}>
            <div className="wrap fp-services-layout">
              <div className="fp-services-head">
                <h2 className="fp-tag">{t("fp_services_tag")}</h2>
                <p className="subtitle fp-h2">{t("fp_services_h")}</p>
              </div>
              <div className="fp-services">
                <div className="fp-service" onClick={() => followLink(t("fp_svc_ib_url"), "/investment-banking")}>
                  <SlotImg raw={t("fp_img_svc_ib")} fallback={ibImg} alt="Investment Banking" />
                  <div className="fp-service-cap">
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
          <section
            key={id}
            className={`blk fp-why ${bg(id)}`}
            style={
              whySectionBg
                ? ({ "--fp-why-section-bg": `url(${whySectionBg})` } as CSSProperties)
                : undefined
            }
          >
            <div className="wrap">
              <div className="fp-center">
                <h2 className="fp-tag">{t("fp_why_tag")}</h2>
              </div>
              <WhyAccordion t={t} />
            </div>
          </section>
        );
      case "contact":
        return (
          <section key={id} className={`fp-contact fp-contact--form-only ${bg(id)}`}>
            <div className="fp-contact-form">
              <SectionHead
                center
                title={pickLang(
                  CONTACT.getInTouchSectionTitleEn,
                  CONTACT.getInTouchSectionTitleAr,
                  lang,
                )}
                subtitle={pickLang(
                  CONTACT.getInTouchSectionSubtitleEn,
                  CONTACT.getInTouchSectionSubtitleAr,
                  lang,
                )}
              />
              <GetInTouch sourcePage="/" />
            </div>
          </section>
        );
      case "app":
        return (
          <section key={id} className="fp-app">
            <div className="wrap fp-app-inner">
              <div className="fp-app-text">
                <div className="fp-app-copy">
                  <h2>{t("fp_app_h")}</h2>
                  <p className="subtitle">{t("fp_app_p")}</p>
                </div>
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
                <AppPhone className="fp-phone--left" />
                <AppPhone className="fp-phone--mid" />
                <AppPhone className="fp-phone--right" />
              </div>
            </div>
          </section>
        );
      default:
        return null;
    }
  };

  return <div className="page fp" ref={fpRootRef}>{sectionOrder.map((id) => renderSection(id))}</div>;
}
