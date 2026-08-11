"use client";

import { useState, type FormEvent } from "react";
import { CONTACT } from "@/data/contact";
import { useLanguage } from "@/i18n/LanguageContext";
import { apiUrl } from "@/lib/api";
import { pickLang } from "@/site/types";

export type ContactFormVariant = "get-in-touch" | "register";

type Props = {
  sourcePage: string;
  variant?: ContactFormVariant;
  className?: string;
  submitLabel?: string;
  thanksMessage?: string;
};

declare global {
  interface Window {
    grecaptcha?: {
      ready: (cb: () => void) => void;
      execute: (siteKey: string, options: { action: string }) => Promise<string>;
    };
  }
}

async function getRecaptchaToken(): Promise<string | undefined> {
  const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
  if (!siteKey || typeof window === "undefined" || !window.grecaptcha) {
    return undefined;
  }
  return new Promise((resolve) => {
    window.grecaptcha!.ready(() => {
      window
        .grecaptcha!.execute(siteKey, { action: "contact" })
        .then(resolve)
        .catch(() => resolve(undefined));
    });
  });
}

/** Shared form body used inside GetInTouch / RegisterInterest modals. */
export function ContactForm({
  sourcePage,
  variant = "register",
  className = "contact-modal-form",
  submitLabel,
  thanksMessage,
}: Props) {
  const { lang } = useLanguage();
  const copy = CONTACT;
  const resolvedSubmit =
    submitLabel ?? pickLang(copy.submitEn, copy.submitAr, lang);
  const resolvedThanks =
    thanksMessage ?? pickLang(copy.thanksEn, copy.thanksAr, lang);

  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle",
  );
  const [error, setError] = useState("");
  const [warning, setWarning] = useState("");

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");
    setError("");
    setWarning("");

    const form = e.currentTarget;
    const data = new FormData(form);
    const subjectRaw = data.get("subject");
    const payload = {
      name: String(data.get("name") ?? ""),
      email: String(data.get("email") ?? ""),
      phone: String(data.get("phone") ?? ""),
      subject: typeof subjectRaw === "string" ? subjectRaw : "",
      message: String(data.get("message") ?? ""),
      sourcePage,
      recaptchaToken: await getRecaptchaToken(),
    };

    try {
      const res = await fetch(apiUrl("/api/contact"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(payload),
      });
      const json = (await res.json()) as {
        ok?: boolean;
        error?: string;
        warning?: string;
      };
      if (!res.ok || !json.ok) {
        setStatus("error");
        setError(
          json.error ||
            pickLang(copy.errorGenericEn, copy.errorGenericAr, lang),
        );
        return;
      }
      if (json.warning) setWarning(json.warning);
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
      setError(pickLang(copy.errorNetworkEn, copy.errorNetworkAr, lang));
    }
  };

  if (status === "success") {
    return (
      <div className="contact-modal-thanks">
        <p>{resolvedThanks}</p>
        {warning ? <p className="form-warning">{warning}</p> : null}
      </div>
    );
  }

  return (
    <form className={className} onSubmit={onSubmit} noValidate>
      <input
        type="text"
        name="name"
        placeholder={pickLang(copy.nameEn, copy.nameAr, lang)}
        required
        autoComplete="name"
      />
      <input
        type="email"
        name="email"
        placeholder={pickLang(copy.emailEn, copy.emailAr, lang)}
        required
        autoComplete="email"
      />
      <input
        type="tel"
        name="phone"
        placeholder={pickLang(copy.phoneEn, copy.phoneAr, lang)}
        autoComplete="tel"
      />
      {variant === "get-in-touch" ? (
        <div className="fp-radios contact-modal-radios">
          <span className="fp-radios-label">
            {pickLang(copy.subjectLabelEn, copy.subjectLabelAr, lang)}
          </span>
          <label>
            <input
              type="radio"
              name="subject"
              value="Inquiry"
              defaultChecked
            />{" "}
            {pickLang(copy.subjectInquiryEn, copy.subjectInquiryAr, lang)}
          </label>
          <label>
            <input type="radio" name="subject" value="Complaint" />{" "}
            {pickLang(copy.subjectComplaintEn, copy.subjectComplaintAr, lang)}
          </label>
          <label>
            <input type="radio" name="subject" value="Info" />{" "}
            {pickLang(copy.subjectInfoEn, copy.subjectInfoAr, lang)}
          </label>
        </div>
      ) : null}
      <textarea
        name="message"
        placeholder={pickLang(copy.messageEn, copy.messageAr, lang)}
        rows={4}
        required
      />
      {error ? <p className="form-error">{error}</p> : null}
      <button
        type="submit"
        className="btn btn-navy"
        disabled={status === "loading"}
      >
        {status === "loading"
          ? pickLang(copy.sendingEn, copy.sendingAr, lang)
          : resolvedSubmit}
      </button>
    </form>
  );
}
