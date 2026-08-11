"use client";

import { useState } from "react";
import { CONTACT } from "../data/contact";
import { useLanguage } from "../i18n/LanguageContext";
import { pickLang } from "../site/types";
import { ContactForm } from "./ContactForm";
import { ContactModal } from "./ContactModal";

type Props = {
  sourcePage: string;
  /** Optional override; ContactModal defaults to man_on_phone. */
  image?: string | null;
  /** Optional override; defaults to bilingual Register Interest CTA. */
  buttonLabel?: string;
  className?: string;
};

export function RegisterInterest({
  sourcePage,
  image,
  buttonLabel,
  className = "btn btn-navy",
}: Props) {
  const { lang } = useLanguage();
  const [open, setOpen] = useState(false);
  const label =
    buttonLabel ??
    pickLang(
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
        className={className}
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
        <ContactForm sourcePage={sourcePage} variant="register" />
      </ContactModal>
    </>
  );
}
