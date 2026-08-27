/**
 * Footer — Site footer with brand, localized links, address, optional app-store badges, and disclaimer.
 *
 * Used by:
 * - components/SiteChrome.tsx
 */

"use client";

import Link from "next/link";
import { Fragment } from "react";
import { usePathname } from "next/navigation";
import { FaApple, FaGooglePlay } from "react-icons/fa";
import { useLanguage } from "../i18n/LanguageContext";
import { useLocalePath } from "../i18n/useLocalePath";
import { FOOTER_BG_IMAGE, SITE_FOOTER } from "../site/footer";
import { pickLang, type FooterLink } from "../site/types";
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

  const renderFooterLink = (
    link: FooterLink,
    colId: string,
    nested = false,
  ) => {
    const label = pickLang(link.labelEn, link.labelAr, lang);
    const key = `${colId}-${link.id}`;
    const className = [
      nested ? "nav-nested" : link.children?.length ? "nav-branch-parent" : "",
    ]
      .filter(Boolean)
      .join(" ");

    let node;
    if (!link.href) {
      node = (
        <a key={key} className={className || undefined}>
          {label}
        </a>
      );
    } else if (link.href.startsWith("/")) {
      const href = withLocale(link.href);
      const normalizedPath = pathname.replace(/\/+$/, "") || "/";
      const normalizedHref = href.replace(/\/+$/, "") || "/";
      const isActive = normalizedPath === normalizedHref;
      node = (
        <Link
          key={key}
          href={href}
          className={[className, isActive ? "is-active" : ""]
            .filter(Boolean)
            .join(" ")}
          aria-current={isActive ? "page" : undefined}
        >
          {label}
        </Link>
      );
    } else {
      node = (
        <a
          key={key}
          className={className || undefined}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
        >
          {label}
        </a>
      );
    }

    if (!link.children?.length) return node;

    return (
      <Fragment key={key}>
        {node}
        <div className="nav-nested-group">
          {link.children.map((child) => renderFooterLink(child, colId, true))}
        </div>
      </Fragment>
    );
  };

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
              {col.links.map((link) => renderFooterLink(link, col.id))}
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
