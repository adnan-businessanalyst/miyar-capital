/**
 * GetInTouch — Localized Get In Touch CTA that opens a ContactModal with ContactForm.
 *
 * Used by:
 * - views/FrontPage.tsx
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
};

/** Consistent Get In Touch CTA button + modal (EN / AR). */
export function GetInTouch({ sourcePage }: Props) {
  const { lang } = useLanguage();
  const [open, setOpen] = useState(false);
  const label = pickLang(
    CONTACT.getInTouchButtonEn,
    CONTACT.getInTouchButtonAr,
    lang,
  );
  const title = pickLang(
    CONTACT.contactModalTitleEn,
    CONTACT.contactModalTitleAr,
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
      >
        <ContactForm sourcePage={sourcePage} variant="get-in-touch" />
      </ContactModal>
    </>
  );
}
