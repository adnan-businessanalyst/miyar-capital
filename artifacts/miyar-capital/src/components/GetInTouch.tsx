"use client";

import { useState } from "react";
import { CONTACT } from "../data/contact";
import { useLanguage } from "../i18n/LanguageContext";
import { pickLang } from "../site/types";
import { ContactForm } from "./ContactForm";
import { ContactModal } from "./ContactModal";

type Props = {
  sourcePage: string;
  /** Optional override; defaults to bilingual Get In Touch CTA. */
  buttonLabel?: string;
  className?: string;
};

export function GetInTouch({
  sourcePage,
  buttonLabel,
  className = "btn btn-navy",
}: Props) {
  const { lang } = useLanguage();
  const [open, setOpen] = useState(false);
  const label =
    buttonLabel ??
    pickLang(
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
        className={className}
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
