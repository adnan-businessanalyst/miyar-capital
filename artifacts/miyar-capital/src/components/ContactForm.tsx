"use client";

import { useState, type FormEvent } from "react";
import { apiUrl } from "@/lib/api";

export type ContactFormVariant = "homepage" | "register" | "ib" | "who-we-are";

type Props = {
  sourcePage: string;
  variant?: ContactFormVariant;
  className?: string;
  showSubject?: boolean;
  submitLabel?: string;
  thanksClassName?: string;
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
  if (!siteKey || typeof window === "undefined" || !window.grecaptcha) return undefined;
  return new Promise((resolve) => {
    window.grecaptcha!.ready(() => {
      window
        .grecaptcha!.execute(siteKey, { action: "contact" })
        .then(resolve)
        .catch(() => resolve(undefined));
    });
  });
}

export function ContactForm({
  sourcePage,
  variant = "register",
  className = "reg-form",
  showSubject = false,
  submitLabel = "Send Message",
  thanksClassName = "ri-thanks",
  thanksMessage = "Thank you — your message has been received. Our team will be in touch shortly.",
}: Props) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
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
      const json = (await res.json()) as { ok?: boolean; error?: string; warning?: string };
      if (!res.ok || !json.ok) {
        setStatus("error");
        setError(json.error || "Submission failed. Please try again.");
        return;
      }
      if (json.warning) setWarning(json.warning);
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
      setError("Network error. Please try again.");
    }
  };

  if (status === "success") {
    return (
      <div>
        <p className={thanksClassName}>{thanksMessage}</p>
        {warning ? <p className="form-warning">{warning}</p> : null}
      </div>
    );
  }

  const subjectBlock =
    showSubject || variant === "homepage" ? (
      <div className="fp-radios">
        <span className="fp-radios-label">Select Subject</span>
        <label>
          <input type="radio" name="subject" value="General Inquiry" defaultChecked /> General
          Inquiry
        </label>
        <label>
          <input type="radio" name="subject" value="Complaint" /> Complaint
        </label>
        <label>
          <input type="radio" name="subject" value="Info" /> Info
        </label>
      </div>
    ) : null;

  return (
    <form className={className} onSubmit={onSubmit} noValidate>
      <input type="text" name="name" placeholder="Name" required autoComplete="name" />
      <input type="email" name="email" placeholder="Email" required autoComplete="email" />
      <input type="tel" name="phone" placeholder="Phone" autoComplete="tel" />
      {subjectBlock}
      <textarea
        name="message"
        placeholder={variant === "homepage" ? "Write your message" : "Write your message"}
        rows={variant === "ib" ? 5 : 4}
        required
      />
      {error ? <p className="form-error">{error}</p> : null}
      <button
        type="submit"
        className={variant === "ib" ? "btn btn-navy ib-submit" : undefined}
        disabled={status === "loading"}
      >
        {status === "loading" ? "Sending…" : submitLabel}
      </button>
    </form>
  );
}
