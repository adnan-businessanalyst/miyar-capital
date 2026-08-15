/**
 * RegisterInterest — Localized Register Interest CTA that opens a ContactModal with the register ContactForm.
 *
 * Used by:
 * - app/investment-banking/register-interest/page.tsx
 * - components/RegisterInterestSection.tsx
 */

"use client";

import { useState } from "react";
import { CONTACT } from "../data/contact";
import { useLanguage } from "../i18n/LanguageContext";
import { pickLang } from "../site/types";
import { ContactForm } from "./ContactForm";
import { ContactModal } from "./ContactModal";

type Props = {
  sourcePage: string;
  pageTitleEn: string;
  pageTitleAr: string;
  /** Optional override; ContactModal defaults to man_on_phone. */
  image?: string | null;
};

/** Consistent Register Interest CTA button + modal (EN / AR). */
export function RegisterInterest({
  sourcePage,
  pageTitleEn,
  pageTitleAr,
  image,
}: Props) {
  const { lang } = useLanguage();
  const [open, setOpen] = useState(false);
  const label = pickLang(
    CONTACT.registerButtonEn,
    CONTACT.registerButtonAr,
    lang,
  );
  const title = pickLang(
    CONTACT.registerModalTitleEn,
    CONTACT.registerModalTitleAr,
    lang,
  );

  return (
    <>
      <button
        type="button"
        className="btn btn-navy cta-btn"
        onClick={() => setOpen(true)}
      >
        {label}
      </button>
      <ContactModal
        open={open}
        onClose={() => setOpen(false)}
        title={title}
        image={image}
      >
        <ContactForm
          sourcePage={sourcePage}
          variant="register"
          pageTitleEn={pageTitleEn}
          pageTitleAr={pageTitleAr}
        />
      </ContactModal>
    </>
  );
}
