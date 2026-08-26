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
  /** Optional override; ContactModal defaults to get-in-touch. */
  image?: string | null;
  /** Optional CTA button label override. */
  buttonLabelEn?: string;
  buttonLabelAr?: string;
  /** Optional modal title override. */
  modalTitleEn?: string;
  modalTitleAr?: string;
  serviceEnquiry?: boolean;
};

/** Consistent Register Interest CTA button + modal (EN / AR). */
export function RegisterInterest({
  sourcePage,
  pageTitleEn,
  pageTitleAr,
  image,
  buttonLabelEn,
  buttonLabelAr,
  modalTitleEn,
  modalTitleAr,
  serviceEnquiry = false,
}: Props) {
  const { lang } = useLanguage();
  const [open, setOpen] = useState(false);
  const label = pickLang(
    buttonLabelEn ?? CONTACT.registerButtonEn,
    buttonLabelAr ?? CONTACT.registerButtonAr,
    lang,
  );
  const title = pickLang(
    modalTitleEn ?? CONTACT.registerModalTitleEn,
    modalTitleAr ?? CONTACT.registerModalTitleAr,
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
          serviceEnquiry={serviceEnquiry}
        />
      </ContactModal>
    </>
  );
}
