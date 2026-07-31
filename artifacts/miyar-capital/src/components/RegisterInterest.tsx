"use client";

import { useState } from "react";
import { ContactForm } from "./ContactForm";
import { ContactModal } from "./ContactModal";

type Props = {
  sourcePage: string;
  /** Optional override; ContactModal defaults to man_on_phone. */
  image?: string | null;
  buttonLabel?: string;
  className?: string;
};

export function RegisterInterest({
  sourcePage,
  image,
  buttonLabel = "Register Interest",
  className = "btn btn-navy",
}: Props) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        className={className}
        onClick={() => setOpen(true)}
      >
        {buttonLabel}
      </button>
      <ContactModal
        open={open}
        onClose={() => setOpen(false)}
        title="Register Interest"
        image={image}
      >
        <ContactForm
          sourcePage={sourcePage}
          variant="register"
          submitLabel="Send Message"
        />
      </ContactModal>
    </>
  );
}
