/**
 * RegisterInterestSection — Bottom-of-page band: h2 title, body p, CTA button, optional disclaimer footer.
 *
 * Used by:
 * - views/ArrangementManagement.tsx
 * - views/AssetManagement.tsx
 * - views/CapitalMarketsAdvisory.tsx
 * - views/DPM.tsx
 * - views/DebtFinancingArrangement.tsx
 * - views/EquityManagement.tsx
 * - views/IBRegisterInterest.tsx
 * - views/InstitutionalFamilyOffice.tsx
 * - views/InvestmentAdvisory.tsx
 * - views/InvestmentBanking.tsx
 * - views/LiquidityFI.tsx
 * - views/MergersAcquisitions.tsx
 * - views/PrivateMarketsPage.tsx
 * - views/RealAssets.tsx
 * - views/RealEstatePrivateArrangements.tsx
 * - views/ValuationFinancialAdvisory.tsx
 */

"use client";

import { CONTACT } from "../data/contact";
import { useLanguage } from "../i18n/LanguageContext";
import { pickLang } from "../site/types";
import { RegisterInterest } from "./RegisterInterest";
import { RichText } from "./RichText";

type Props = {
  sourcePage: string;
  pageTitleEn: string;
  pageTitleAr: string;
  /** Optional override; ContactModal defaults to get-in-touch. */
  image?: string | null;
  /** Optional section title override (h2). */
  titleEn?: string;
  titleAr?: string;
  /** Optional body copy override (p). */
  bodyEn?: string;
  bodyAr?: string;
  /** @deprecated Prefer bodyEn — kept for existing callers. */
  subtitleEn?: string;
  /** @deprecated Prefer bodyAr — kept for existing callers. */
  subtitleAr?: string;
  /** Optional CTA button label override. */
  buttonLabelEn?: string;
  buttonLabelAr?: string;
  /** Optional modal title override. */
  modalTitleEn?: string;
  modalTitleAr?: string;
  /** Optional disclaimer lead (e.g. "Risk note:"). */
  disclaimerLeadEn?: string;
  disclaimerLeadAr?: string;
  /** Optional disclaimer body (supports light HTML). */
  disclaimerBodyEn?: string;
  disclaimerBodyAr?: string;
};

/** Bottom-of-page Register Interest band — title, body, CTA, optional disclaimer. */
export function RegisterInterestSection({
  sourcePage,
  pageTitleEn,
  pageTitleAr,
  image,
  titleEn,
  titleAr,
  bodyEn,
  bodyAr,
  subtitleEn,
  subtitleAr,
  buttonLabelEn,
  buttonLabelAr,
  modalTitleEn,
  modalTitleAr,
  disclaimerLeadEn,
  disclaimerLeadAr,
  disclaimerBodyEn,
  disclaimerBodyAr,
}: Props) {
  const { lang } = useLanguage();

  const title = pickLang(
    titleEn ?? CONTACT.registerSectionTitleEn,
    titleAr ?? CONTACT.registerSectionTitleAr,
    lang,
  );
  const body = pickLang(
    bodyEn ?? subtitleEn ?? CONTACT.registerSectionSubtitleEn,
    bodyAr ?? subtitleAr ?? CONTACT.registerSectionSubtitleAr,
    lang,
  );
  const disclaimerLead = pickLang(
    disclaimerLeadEn ?? "",
    disclaimerLeadAr ?? "",
    lang,
  );
  const disclaimerBody = pickLang(
    disclaimerBodyEn ?? "",
    disclaimerBodyAr ?? "",
    lang,
  );
  const showDisclaimer = Boolean(
    disclaimerLead.trim() || disclaimerBody.trim(),
  );

  return (
    <section className="blk ri" id="register">
      <div className="wrap contact-cta">
        <h2 className="ri-title">
          <RichText html={title} />
        </h2>
        <RichText as="p" className="ri-body" html={body} />
        <RegisterInterest
          sourcePage={sourcePage}
          pageTitleEn={pageTitleEn}
          pageTitleAr={pageTitleAr}
          image={image}
          buttonLabelEn={buttonLabelEn}
          buttonLabelAr={buttonLabelAr}
          modalTitleEn={modalTitleEn}
          modalTitleAr={modalTitleAr}
        />
      </div>
      {showDisclaimer ? (
        <footer className="ri-disclaimer">
          <div className="wrap">
            {disclaimerLead.trim() ? <b>{disclaimerLead}</b> : null}
            {disclaimerLead.trim() && disclaimerBody.trim() ? " " : null}
            {disclaimerBody.trim() ? (
              <RichText as="span" html={disclaimerBody} />
            ) : null}
          </div>
        </footer>
      ) : null}
    </section>
  );
}
