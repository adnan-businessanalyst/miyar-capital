"use client";

import { useState } from "react";
import { ContactForm } from "./ContactForm";
import { ContactModal } from "./ContactModal";

type Props = {
  sourcePage: string;
  buttonLabel?: string;
  className?: string;
};

export function GetInTouch({
  sourcePage,
  buttonLabel = "Get In Touch",
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
        title="Contact Us"
      >
        <ContactForm
          sourcePage={sourcePage}
          variant="get-in-touch"
          submitLabel="Send Message"
        />
      </ContactModal>
    </>
  );
}
