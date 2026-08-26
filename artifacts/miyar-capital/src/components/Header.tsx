/**
 * Header — Main site navigation with Brand, multi-level menus, auth actions, EN/AR toggle, and mobile hamburger.
 *
 * Used by:
 * - components/SiteChrome.tsx
 */

"use client";

import { Fragment, useEffect, useLayoutEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useLanguage } from "../i18n/LanguageContext";
import {
  persistLocalePreference,
  stripLocalePrefix,
  switchLocalePath,
} from "../i18n/locale";
import { useLocalePath } from "../i18n/useLocalePath";
import { SITE_NAV } from "../site/nav";
import { pickLang, type NavItem, type Lang } from "../site/types";
import { Brand } from "./Brand";

function GlobeIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="lang-globe-icon"
      aria-hidden="true"
    >
      <circle cx="10" cy="10" r="8" />
      <ellipse cx="10" cy="10" rx="3.2" ry="8" />
      <line x1="2" y1="10" x2="18" y2="10" />
      <line x1="3.5" y1="6" x2="16.5" y2="6" />
      <line x1="3.5" y1="14" x2="16.5" y2="14" />
    </svg>
  );
}

function collectHrefs(item: NavItem): string[] {
  const hrefs = item.href ? [item.href] : [];
  for (const child of item.children ?? []) hrefs.push(...collectHrefs(child));
  return hrefs;
}

function pathMatches(href: string | undefined, barePath: string): boolean {
  if (!href) return false;
  if (href === "/") return barePath === "/";
  return barePath === href || barePath.startsWith(`${href}/`);
}

function NavCaret() {
  return (
    <svg
      className="nav-caret"
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M2.5 4.25L6 8.25L9.5 4.25"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Header() {
  const pathname = usePathname() || "/";
  const router = useRouter();
  const { lang, t } = useLanguage();
  const withLocale = useLocalePath();
  const barePath = stripLocalePrefix(pathname);
  const nav = SITE_NAV;
  const [menuOpen, setMenuOpen] = useState(false);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const headerRef = useRef<HTMLElement | null>(null);

  const [transparent, setTransparent] = useState(true);

  useLayoutEffect(() => {
    document.body.classList.toggle("nav-transparent", transparent);
  }, [transparent]);

  useEffect(() => {
    const update = () => {
      const hasHero = !!document.querySelector(".fp-hero, .page-hero");
      setTransparent(hasHero && window.scrollY === 0);
    };

    window.addEventListener("scroll", update, { passive: true });
    const raf = requestAnimationFrame(update);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", update);
    };
  }, [pathname]);

  useEffect(() => {
    setMenuOpen(false);
    setExpandedId(null);
  }, [pathname]);

  useEffect(() => {
    if (!menuOpen) return;
    const onResize = () => {
      if (window.matchMedia("(min-width: 1025px)").matches) {
        setMenuOpen(false);
        setExpandedId(null);
      }
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [menuOpen]);

  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (!headerRef.current?.contains(e.target as Node)) {
        setExpandedId(null);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setExpandedId(null);
    };
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  const go = (href?: string) => () => {
    if (!href) return;
    if (href.startsWith("/")) router.push(withLocale(href));
    else window.open(href, "_blank");
    setMenuOpen(false);
    setExpandedId(null);
  };

  const toggleExpanded = (id: string) =>
    setExpandedId((cur) => (cur === id ? null : id));

  const isActive = (item: NavItem): boolean =>
    collectHrefs(item).some((h) => pathMatches(h, barePath));

  const isHrefActive = (href?: string) => pathMatches(href, barePath);

  const label = (item: { labelEn: string; labelAr: string }, l: Lang) =>
    pickLang(item.labelEn, item.labelAr, l);

  const navColor = transparent ? "#ffffff" : "#0c476e";

  const loginUrl = t("tb_login_url") || undefined;
  const signupUrl = t("tb_signup_url") || undefined;
  const toggleLang = () => {
    const next = lang === "en" ? "ar" : "en";
    persistLocalePreference(next);
    router.push(switchLocalePath(pathname, next));
  };
  const langLabel = lang === "en" ? "EN" : "ع";

  return (
    <header
      ref={headerRef}
      className={[menuOpen ? "nav-open" : "", transparent ? "header--transparent" : ""].join(" ").trim()}
      style={{ "--nav-link-color": navColor } as React.CSSProperties}
    >
      <div className="wrap">
        <div className="nav">
          <Brand transparent={transparent && !menuOpen} />
          <nav>
            <ul>
              {nav.items.map((item) => {
                const hasChildren = !!item.children && item.children.length > 0;
                const open = expandedId === item.id;
                return (
                  <li
                    key={item.id}
                    className={[isActive(item) ? "on" : "", open ? "is-open" : ""]
                      .filter(Boolean)
                      .join(" ")}
                  >
                    {hasChildren ? (
                      <button
                        type="button"
                        className="nav-parent"
                        aria-expanded={open}
                        aria-haspopup="true"
                        onClick={() => toggleExpanded(item.id)}
                      >
                        {label(item, lang)}
                        <NavCaret />
                      </button>
                    ) : (
                      <a onClick={go(item.href)}>{label(item, lang)}</a>
                    )}
                    {hasChildren && (
                      <div className="dropdown">
                        {item.children!.map((child) => {
                          if (child.group) {
                            return (
                              <div className="grp" key={child.id}>
                                {label(child, lang)}
                              </div>
                            );
                          }
                          const nested = (child.children ?? []).filter(
                            (gc) => !gc.group,
                          );
                          return (
                            <Fragment key={child.id}>
                              <a
                                className={`nav-branch-parent${isActive(child) ? " on" : ""}`}
                                onClick={go(child.href)}
                              >
                                {label(child, lang)}
                              </a>
                              {nested.map((gc) => (
                                <a
                                  key={gc.id}
                                  className={`nav-nested${isHrefActive(gc.href) ? " on" : ""}`}
                                  onClick={go(gc.href)}
                                >
                                  {label(gc, lang)}
                                </a>
                              ))}
                            </Fragment>
                          );
                        })}
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>
          </nav>
          <div className="nav-actions">
            <div className="tb-auth">
              {loginUrl ? (
                <a href={loginUrl} className="tb-login" target="_blank" rel="noopener noreferrer">
                  {t("tb_login")}
                </a>
              ) : (
                <button type="button" className="tb-login">
                  {t("tb_login")}
                </button>
              )}
              {signupUrl ? (
                <a href={signupUrl} className="tb-signup" target="_blank" rel="noopener noreferrer">
                  {t("tb_signup")}
                </a>
              ) : (
                <button type="button" className="tb-signup">
                  {t("tb_signup")}
                </button>
              )}
            </div>
            <button
              type="button"
              className="lang-globe lang-globe--desktop"
              onClick={toggleLang}
              aria-label={lang === "en" ? "Switch to Arabic" : "التبديل إلى الإنجليزية"}
            >
              <GlobeIcon />
              <span className="lang-globe-label">{langLabel}</span>
            </button>
          </div>
          <button
            type="button"
            className="nav-toggle"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMenuOpen((o) => !o)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>

      <div id="mobile-menu" className="mobile-menu" hidden={!menuOpen}>
        <ul>
          {nav.items.map((item) => {
            const hasChildren = !!item.children && item.children.length > 0;
            return (
              <li key={item.id}>
                <div className="mm-row">
                  {hasChildren ? (
                    <button
                      type="button"
                      className={`mm-parent${isActive(item) ? " on" : ""}`}
                      aria-expanded={expandedId === item.id}
                      onClick={() => toggleExpanded(item.id)}
                    >
                      {label(item, lang)}
                      <NavCaret />
                    </button>
                  ) : (
                    <a
                      className={isActive(item) ? "on" : ""}
                      onClick={go(item.href)}
                    >
                      {label(item, lang)}
                    </a>
                  )}
                </div>
                {hasChildren && expandedId === item.id && (
                  <div className="mm-sub">
                    {item.children!.map((child) => {
                      if (child.group) {
                        return (
                          <div className="mm-grp" key={child.id}>
                            {label(child, lang)}
                          </div>
                        );
                      }
                      const nested = (child.children ?? []).filter(
                        (gc) => !gc.group,
                      );
                      return (
                        <Fragment key={child.id}>
                          <a
                            className={`nav-branch-parent${isActive(child) ? " on" : ""}`}
                            onClick={go(child.href)}
                          >
                            {label(child, lang)}
                          </a>
                          {nested.map((gc) => (
                            <a
                              key={gc.id}
                              className={`nav-nested${isHrefActive(gc.href) ? " on" : ""}`}
                              onClick={go(gc.href)}
                            >
                              {label(gc, lang)}
                            </a>
                          ))}
                        </Fragment>
                      );
                    })}
                  </div>
                )}
              </li>
            );
          })}
        </ul>
        <div className="mm-auth">
          {loginUrl ? (
            <a href={loginUrl} className="tb-login" target="_blank" rel="noopener noreferrer">
              {t("tb_login")}
            </a>
          ) : (
            <button type="button" className="tb-login">
              {t("tb_login")}
            </button>
          )}
          {signupUrl ? (
            <a href={signupUrl} className="tb-signup" target="_blank" rel="noopener noreferrer">
              {t("tb_signup")}
            </a>
          ) : (
            <button type="button" className="tb-signup">
              {t("tb_signup")}
            </button>
          )}
        </div>
        <div className="mm-lang">
          <button
            type="button"
            className="lang-globe"
            onClick={toggleLang}
            aria-label={lang === "en" ? "Switch to Arabic" : "التبديل إلى الإنجليزية"}
          >
            <GlobeIcon />
            <span className="lang-globe-label">{langLabel}</span>
          </button>
        </div>
      </div>
    </header>
  );
}
