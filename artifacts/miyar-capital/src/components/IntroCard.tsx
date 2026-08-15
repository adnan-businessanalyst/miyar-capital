/**
 * IntroCard — Two-column investment-management intro with copy, register CTA, and image.
 *
 * Used by:
 * - components/FundPage.tsx
 * - views/InvestmentManagement.tsx
 */

"use client";

import { CONTACT } from "../data/contact";
import { useLanguage } from "../i18n/LanguageContext";
import { pickLang } from "../site/types";
import { SectionHead } from "./SectionHead";

interface IntroCardProps {
  image: string;
  alt?: string;
}

export function IntroCard({ image, alt = "Asset Management" }: IntroCardProps) {
  const { lang } = useLanguage();
  const scrollToRegister = () => {
    document
      .getElementById("register")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="blk">
      <div className="wrap">
        <div className="arr-intro">
          <div className="arr-intro-text">
            <SectionHead
              className="arr-intro-head"
              title="Investment Management"
              subtitle="Guided by Expertise. Built on Trust."
            />
            <p>
              We focus on delivering sustainable returns through disciplined
              analysis, professional management, and continuous market
              monitoring. Our approach treats every client as a partner —
              ensuring decisions are aligned with long-term value and responsible
              investing.
            </p>
            <button
              className="btn btn-outline-navy"
              onClick={scrollToRegister}
            >
              {pickLang(
                CONTACT.registerButtonEn,
                CONTACT.registerButtonAr,
                lang,
              )}
            </button>
          </div>
          <div className="arr-intro-img">
            <img src={image} alt={alt} />
          </div>
        </div>
      </div>
    </section>
  );
}
