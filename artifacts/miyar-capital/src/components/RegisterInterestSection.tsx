/**
 * RegisterInterestSection — Bottom-of-page Register Interest band with SectionHead and RegisterInterest CTA.
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
import { SectionHead } from "./SectionHead";

type Props = {
  sourcePage: string;
  pageTitleEn: string;
  pageTitleAr: string;
  /** Optional override; ContactModal defaults to man_on_phone. */
  image?: string | null;
  /** Optional section title override (defaults to CONTACT register copy). */
  titleEn?: string;
  titleAr?: string;
  /** Optional section subtitle override. */
  subtitleEn?: string;
  subtitleAr?: string;
  /** Optional CTA button label override. */
  buttonLabelEn?: string;
  buttonLabelAr?: string;
  /** Optional modal title override. */
  modalTitleEn?: string;
  modalTitleAr?: string;
};

/** Bottom-of-page Register Interest band — centered CTA for AM / IB pages only. */
export function RegisterInterestSection({
  sourcePage,
  pageTitleEn,
  pageTitleAr,
  image,
  titleEn,
  titleAr,
  subtitleEn,
  subtitleAr,
  buttonLabelEn,
  buttonLabelAr,
  modalTitleEn,
  modalTitleAr,
}: Props) {
  const { lang } = useLanguage();

  return (
    <section className="blk ri" id="register">
      <div className="wrap contact-cta">
        <SectionHead
          center
          title={pickLang(
            titleEn ?? CONTACT.registerSectionTitleEn,
            titleAr ?? CONTACT.registerSectionTitleAr,
            lang,
          )}
          subtitle={pickLang(
            subtitleEn ?? CONTACT.registerSectionSubtitleEn,
            subtitleAr ?? CONTACT.registerSectionSubtitleAr,
            lang,
          )}
        />
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
    </section>
  );
}
