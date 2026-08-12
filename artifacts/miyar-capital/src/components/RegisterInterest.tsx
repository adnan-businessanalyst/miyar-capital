"use client";

import { useState } from "react";
import { CONTACT } from "../data/contact";
import { useLanguage } from "../i18n/LanguageContext";
import { pickLang } from "../site/types";
import { ContactForm } from "./ContactForm";
import { ContactModal } from "./ContactModal";
import { SecondaryButton } from "./SecondaryButton";

type Props = {
  sourcePage: string;
  /** Optional override; ContactModal defaults to man_on_phone. */
  image?: string | null;
  /** Optional override; defaults to bilingual Register Interest CTA. */
  buttonLabel?: string;
  className?: string;
  /** Use SecondaryButton chrome (rounded outline). */
  variant?: "default" | "secondary";
  fullWidth?: boolean;
};

export function RegisterInterest({
  sourcePage,
  image,
  buttonLabel,
  className,
  variant = "default",
  fullWidth = false,
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
  const openModal = () => setOpen(true);

  return (
    <>
      {variant === "secondary" ? (
        <SecondaryButton
          fullWidth={fullWidth}
          className={className}
          onClick={openModal}
        >
          {label}
        </SecondaryButton>
      ) : (
        <button
          type="button"
          className={className ?? "btn btn-navy"}
          onClick={openModal}
        >
          {label}
        </button>
      )}
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
