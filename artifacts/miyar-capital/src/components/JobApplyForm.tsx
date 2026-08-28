/**
 * JobApplyForm — Job application form with CV upload, validation, reCAPTCHA, and API submit.
 *
 * Used by:
 * - components/JobApplyButton.tsx
 */

"use client";

import { useMemo, useState, type FormEvent } from "react";
import { JOB_APPLY } from "@/data/jobApply";
import type { JobPosting } from "@/data/jobs";
import { useLanguage } from "@/i18n/LanguageContext";
import { apiUrl } from "@/lib/api";
import { getRecaptchaToken, isCaptchaApiError } from "@/lib/recaptcha";
import { pickLang } from "@/site/types";

type Props = {
  job: JobPosting;
  sourcePage: string;
};

const MESSAGE_MIN = 20;
const MESSAGE_MAX = 300;
const CV_MAX_BYTES = 5 * 1024 * 1024;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function RequiredMark() {
  return (
    <span className="contact-required" aria-hidden="true">
      *
    </span>
  );
}

function isPdfFile(file: File): boolean {
  if (!/\.pdf$/i.test(file.name)) return false;
  if (!file.type) return true;
  return file.type === "application/pdf" || file.type === "application/x-pdf";
}

/** Careers Apply form — all fields mandatory; PDF CV only. */
export function JobApplyForm({ job, sourcePage }: Props) {
  const { lang } = useLanguage();
  const copy = JOB_APPLY;
  const jobTitle = pickLang(job.title, job.titleAr ?? "", lang);

  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle",
  );
  const [error, setError] = useState("");
  const [warning, setWarning] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [cvName, setCvName] = useState("");
  const [cvOk, setCvOk] = useState(false);

  const messageLen = message.trim().length;
  const messageLenOk = messageLen >= MESSAGE_MIN && messageLen <= MESSAGE_MAX;
  const messageOutOfRange = !messageLenOk;

  const isValid = useMemo(() => {
    if (!firstName.trim() || !lastName.trim() || !phone.trim()) return false;
    if (!EMAIL_RE.test(email.trim())) return false;
    if (!messageLenOk) return false;
    if (!cvOk) return false;
    return true;
  }, [cvOk, email, firstName, lastName, messageLenOk, phone]);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isValid || status === "loading") return;

    setStatus("loading");
    setError("");
    setWarning("");

    const form = e.currentTarget;
    const file = (form.elements.namedItem("cv") as HTMLInputElement | null)
      ?.files?.[0];

    const first = firstName.trim();
    const last = lastName.trim();
    const emailVal = email.trim();
    const phoneVal = phone.trim();
    const messageVal = message.trim();

    if (!first || !last || !phoneVal || !emailVal || !messageVal) {
      setStatus("error");
      setError(pickLang(copy.errorRequiredEn, copy.errorRequiredAr, lang));
      return;
    }
    if (!EMAIL_RE.test(emailVal)) {
      setStatus("error");
      setError(pickLang(copy.errorEmailEn, copy.errorEmailAr, lang));
      return;
    }
    if (messageVal.length < MESSAGE_MIN || messageVal.length > MESSAGE_MAX) {
      setStatus("error");
      setError(pickLang(copy.errorMessageLenEn, copy.errorMessageLenAr, lang));
      return;
    }
    if (!file || file.size <= 0 || file.size > CV_MAX_BYTES || !isPdfFile(file)) {
      setStatus("error");
      setError(pickLang(copy.errorCvEn, copy.errorCvAr, lang));
      return;
    }

    const token = await getRecaptchaToken("job_apply");

    const body = new FormData();
    body.set("firstName", first);
    body.set("lastName", last);
    body.set("email", emailVal);
    body.set("phone", phoneVal);
    body.set("message", messageVal);
    body.set("jobId", job.id);
    body.set("jobSlug", job.slug);
    body.set("jobTitle", jobTitle);
    body.set("jobReference", job.referenceCode);
    body.set("sourcePage", sourcePage);
    body.set("cv", file);
    if (token) body.set("recaptchaToken", token);

    try {
      const res = await fetch(apiUrl("/api/jobs/apply"), {
        method: "POST",
        credentials: "include",
        body,
      });
      const json = (await res.json()) as {
        ok?: boolean;
        error?: string;
        warning?: string;
      };
      if (!res.ok || !json.ok) {
        setStatus("error");
        setError(
          isCaptchaApiError(json.error)
            ? pickLang(copy.errorCaptchaEn, copy.errorCaptchaAr, lang)
            : json.error ||
                pickLang(copy.errorGenericEn, copy.errorGenericAr, lang),
        );
        return;
      }
      if (json.warning) setWarning(json.warning);
      setStatus("success");
      form.reset();
      setFirstName("");
      setLastName("");
      setEmail("");
      setPhone("");
      setMessage("");
      setCvName("");
      setCvOk(false);
    } catch {
      setStatus("error");
      setError(pickLang(copy.errorNetworkEn, copy.errorNetworkAr, lang));
    }
  };

  if (status === "success") {
    return (
      <div className="contact-modal-thanks">
        <p>{pickLang(copy.thanksEn, copy.thanksAr, lang)}</p>
        {warning ? <p className="form-warning">{warning}</p> : null}
      </div>
    );
  }

  const canSubmit = isValid && status !== "loading";

  return (
    <form className="contact-modal-form" onSubmit={onSubmit} noValidate>
      <label className="contact-field">
        <span className="contact-field-label">
          {pickLang(copy.jobLabelEn, copy.jobLabelAr, lang)}
        </span>
        <input
          type="text"
          value={jobTitle}
          readOnly
          disabled
          tabIndex={-1}
          className="contact-field-readonly"
          aria-readonly="true"
        />
      </label>
      <div className="job-apply-name-row">
        <label className="contact-field">
          <span className="contact-field-label">
            {pickLang(copy.firstNameEn, copy.firstNameAr, lang)}
            <RequiredMark />
          </span>
          <input
            type="text"
            name="firstName"
            value={firstName}
            onChange={(ev) => setFirstName(ev.target.value)}
            required
            aria-required="true"
            autoComplete="given-name"
            maxLength={200}
          />
        </label>
        <label className="contact-field">
          <span className="contact-field-label">
            {pickLang(copy.lastNameEn, copy.lastNameAr, lang)}
            <RequiredMark />
          </span>
          <input
            type="text"
            name="lastName"
            value={lastName}
            onChange={(ev) => setLastName(ev.target.value)}
            required
            aria-required="true"
            autoComplete="family-name"
            maxLength={200}
          />
        </label>
      </div>
      <label className="contact-field">
        <span className="contact-field-label">
          {pickLang(copy.emailEn, copy.emailAr, lang)}
          <RequiredMark />
        </span>
        <input
          type="email"
          name="email"
          value={email}
          onChange={(ev) => setEmail(ev.target.value)}
          required
          aria-required="true"
          autoComplete="email"
          maxLength={320}
        />
      </label>
      <label className="contact-field">
        <span className="contact-field-label">
          {pickLang(copy.phoneEn, copy.phoneAr, lang)}
          <RequiredMark />
        </span>
        <input
          type="tel"
          name="phone"
          value={phone}
          onChange={(ev) => setPhone(ev.target.value)}
          required
          aria-required="true"
          autoComplete="tel"
          maxLength={80}
        />
      </label>
      <div className="contact-modal-message">
        <label className="contact-field">
          <span className="contact-field-label">
            {pickLang(copy.messageEn, copy.messageAr, lang)}
            <RequiredMark />
          </span>
          <textarea
            name="message"
            value={message}
            onChange={(ev) => setMessage(ev.target.value)}
            rows={3}
            required
            aria-required="true"
            aria-invalid={messageOutOfRange ? true : undefined}
          />
        </label>
        <span
          className="contact-modal-charcount"
          data-out-of-range={messageOutOfRange ? "true" : "false"}
        >
          {messageLen}/{MESSAGE_MAX}
        </span>
      </div>
      <div className="contact-modal-attach">
        <span className="contact-modal-attach-label">
          {pickLang(copy.cvEn, copy.cvAr, lang)}
          <RequiredMark />
        </span>
        <input
          id="job-apply-cv"
          className="contact-upload-input"
          type="file"
          name="cv"
          accept="application/pdf,.pdf"
          multiple={false}
          required
          aria-required="true"
          onChange={(ev) => {
            const list = ev.target.files;
            const f = list?.[0];
            if (list && list.length > 1) {
              setError(pickLang(copy.errorCvEn, copy.errorCvAr, lang));
              ev.target.value = "";
              setCvName("");
              setCvOk(false);
              return;
            }
            if (!f) {
              setCvName("");
              setCvOk(false);
              setError("");
              return;
            }
            if (f.size > CV_MAX_BYTES || !isPdfFile(f)) {
              setError(pickLang(copy.errorCvEn, copy.errorCvAr, lang));
              ev.target.value = "";
              setCvName("");
              setCvOk(false);
              return;
            }
            setCvName(f.name);
            setCvOk(true);
            setError("");
          }}
        />
        <label htmlFor="job-apply-cv" className="btn btn-navy contact-upload-btn">
          {pickLang(copy.cvButtonEn, copy.cvButtonAr, lang)}
        </label>
        <p className="contact-modal-attach-hint">
          {pickLang(copy.cvHintEn, copy.cvHintAr, lang)}
          {cvName ? ` — ${cvName}` : ""}
        </p>
      </div>
      {error ? <p className="form-error">{error}</p> : null}
      <button
        type="submit"
        className="btn btn-navy"
        disabled={!canSubmit}
        aria-disabled={!canSubmit}
      >
        {status === "loading"
          ? pickLang(copy.sendingEn, copy.sendingAr, lang)
          : pickLang(copy.submitEn, copy.submitAr, lang)}
      </button>
    </form>
  );
}
