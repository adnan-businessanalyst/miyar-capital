"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaApple, FaGooglePlay } from "react-icons/fa";
import { useLanguage } from "../i18n/LanguageContext";
import { useLocalePath } from "../i18n/useLocalePath";
import { FOOTER_BG_IMAGE, SITE_FOOTER } from "../site/footer";
import { pickLang } from "../site/types";
import { Brand } from "./Brand";
import { Disclaimer } from "./Disclaimer";

function isHomePath(pathname: string): boolean {
  const p = pathname.replace(/\/+$/, "") || "/";
  return p === "/" || p === "/en";
}

export function Footer() {
  const { lang } = useLanguage();
  const withLocale = useLocalePath();
  const pathname = usePathname() || "/";
  const footer = SITE_FOOTER;
  const showAppStores = !isHomePath(pathname);

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
            {showAppStores && footer.appStores.length > 0 ? (
              <div className="footer-stores">
                {footer.appStores.map((store) => (
                  <a
                    key={store.id}
                    className="footer-store-btn"
                    href={store.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={pickLang(store.labelEn, store.labelAr, lang)}
                  >
                    {store.id === "apple" ? (
                      <FaApple aria-hidden="true" />
                    ) : (
                      <FaGooglePlay aria-hidden="true" />
                    )}
                    <span>
                      <small>
                        {store.id === "apple"
                          ? lang === "ar"
                            ? "حمّل من"
                            : "Download on the"
                          : lang === "ar"
                            ? "حمّل من"
                            : "Get it on"}
                      </small>
                      {store.id === "apple" ? "App Store" : "Google Play"}
                    </span>
                  </a>
                ))}
              </div>
            ) : null}
            {footer.social.length > 0 ? (
              <div className="footer-social">
                {footer.social.map((item) => (
                  <a
                    key={item.id}
                    className="footer-social-link"
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={pickLang(item.labelEn, item.labelAr, lang)}
                  >
                    <img src={item.icon} alt="" width={31} height={31} />
                  </a>
                ))}
              </div>
            ) : null}
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
                    <Link key={link.id} href={withLocale(link.href)}>
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
        <Disclaimer className="site-footer-disclaimer" />
        <div className="bottom">
          <span>
            {pickLang(footer.bottomRightEn, footer.bottomRightAr, lang)}
          </span>
        </div>
      </div>
    </footer>
  );
}
