"use client";

import Link from "next/link";
import { useLanguage } from "../i18n/LanguageContext";
import { FOOTER_BG_IMAGE, SITE_FOOTER } from "../site/footer";
import { pickLang } from "../site/types";
import { Brand } from "./Brand";

export function Footer() {
  const { lang, t } = useLanguage();
  const footer = SITE_FOOTER;

  const address = pickLang(footer.addressEn, footer.addressAr, lang);
  const overlay = Math.max(0, Math.min(100, footer.overlayOpacity)) / 100;

  return (
    <footer
      className="site-footer"
      style={{ backgroundColor: footer.backgroundColor }}
    >
      {FOOTER_BG_IMAGE ? (
        <img
          className="site-footer-bg"
          src={FOOTER_BG_IMAGE}
          alt=""
          aria-hidden="true"
        />
      ) : null}
      {FOOTER_BG_IMAGE && overlay > 0 ? (
        <div
          className="site-footer-overlay"
          style={{ background: `rgba(0,0,0,${overlay})` }}
          aria-hidden="true"
        />
      ) : null}
      <div className="wrap">
        <div className="top">
          <div>
            <div style={{ marginBottom: 20 }}>
              <Brand variant="dark" />
            </div>
            <div className="lic">
              {address.split("\n").map((line, i) => (
                <span key={i}>
                  {line}
                  <br />
                </span>
              ))}
            </div>
          </div>
          {footer.columns.map((col) => (
            <div key={col.id}>
              <h6>{pickLang(col.titleEn, col.titleAr, lang)}</h6>
              {col.links.map((link) => {
                const label = pickLang(link.labelEn, link.labelAr, lang);
                if (!link.href) {
                  return <a key={link.id}>{label}</a>;
                }
                if (link.href.startsWith("/")) {
                  return (
                    <Link key={link.id} href={link.href}>
                      {label}
                    </Link>
                  );
                }
                return (
                  <a
                    key={link.id}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {label}
                  </a>
                );
              })}
            </div>
          ))}
        </div>
        <div className="footer-reg">{t("reg")}</div>
        <div className="bottom">
          <span>{pickLang(footer.bottomLeftEn, footer.bottomLeftAr, lang)}</span>
          <span>
            {pickLang(footer.bottomRightEn, footer.bottomRightAr, lang)}
          </span>
        </div>
      </div>
    </footer>
  );
}
