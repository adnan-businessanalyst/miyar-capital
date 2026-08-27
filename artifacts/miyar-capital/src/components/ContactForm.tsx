/**
 * ContactForm — Validated contact or register-interest form that posts to the API with optional image upload and reCAPTCHA.
 *
 * Used by:
 * - components/GetInTouch.tsx
 * - components/RegisterInterest.tsx
 */

"use client";

import { useEffect, useMemo, useState, type FormEvent } from "react";
import { CONTACT } from "@/data/contact";
import { useLanguage } from "@/i18n/LanguageContext";
import { apiUrl } from "@/lib/api";
import { getRecaptchaToken, recaptchaRequired } from "@/lib/recaptcha";
import { pickLang } from "@/site/types";

export type ContactFormVariant = "get-in-touch" | "register";

type Props = {
  sourcePage: string;
  variant?: ContactFormVariant;
  className?: string;
  submitLabel?: string;
  thanksMessage?: string;
  /** Required for register interest — shown as a read-only page field. */
  pageTitleEn?: string;
  pageTitleAr?: string;
  /** Adds contact-consent checkbox and investor-classification select. */
  serviceEnquiry?: boolean;
};

const MESSAGE_MIN = 20;
const MESSAGE_MAX = 300;
const IMAGE_MAX_BYTES = 2 * 1024 * 1024;
const IMAGE_ACCEPT = "image/jpeg,image/png,.jpg,.jpeg,.png";
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function isAllowedImageFile(file: File): boolean {
  if (!/\.(jpe?g|png)$/i.test(file.name)) return false;
  if (!file.type) return true;
  return file.type === "image/jpeg" || file.type === "image/png";
}

function RequiredMark() {
  return (
    <span className="contact-required" aria-hidden="true">
      *
    </span>
  );
}

function buildRegisterMessage(
  template: string,
  pageTitle: string,
): string {
  return template.replace(/\{pageTitle\}/g, pageTitle);
}

/** Shared form body used inside GetInTouch / RegisterInterest modals. */
export function ContactForm({
  sourcePage,
  variant = "register",
  className = "contact-modal-form",
  submitLabel,
  thanksMessage,
  pageTitleEn = "",
  pageTitleAr = "",
  serviceEnquiry = false,
}: Props) {
  const { lang } = useLanguage();
  const copy = CONTACT;
  const isGetInTouch = variant === "get-in-touch";
  const isRegister = variant === "register";
  const pageTitle = pickLang(pageTitleEn, pageTitleAr, lang);
  const defaultRegisterMessage = buildRegisterMessage(
    pickLang(
      copy.registerMessageTemplateEn,
      copy.registerMessageTemplateAr,
      lang,
    ),
    pageTitle,
  );

  const resolvedSubmit =
    submitLabel ?? pickLang(copy.submitEn, copy.submitAr, lang);
  const resolvedThanks =
    thanksMessage ?? pickLang(copy.thanksEn, copy.thanksAr, lang);

  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle",
  );
  const [error, setError] = useState("");
  const [warning, setWarning] = useState("");
  const [subject, setSubject] = useState<"Complaint" | "Inquiry" | "Info">(
    "Inquiry",
  );
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState(
    isRegister ? defaultRegisterMessage : "",
  );
  const [messageTouched, setMessageTouched] = useState(false);
  const [fileName, setFileName] = useState("");
  const [attachOk, setAttachOk] = useState(true);
  const [contactConsent, setContactConsent] = useState(false);
  const [investorClass, setInvestorClass] = useState("");
  const canAttachImage = isGetInTouch && subject === "Complaint";

  useEffect(() => {
    if (canAttachImage) return;
    setFileName("");
    setAttachOk(true);
  }, [canAttachImage]);

  useEffect(() => {
    if (!isRegister || messageTouched) return;
    setMessage(defaultRegisterMessage);
  }, [defaultRegisterMessage, isRegister, messageTouched]);

  const messageLen = message.trim().length;
  const messageLenOk =
    messageLen >= MESSAGE_MIN && messageLen <= MESSAGE_MAX;
  const messageOutOfRange = !messageLenOk;

  const isValid = useMemo(() => {
    const n = name.trim();
    const e = email.trim();
    const p = phone.trim();

    if (e && !EMAIL_RE.test(e)) return false;
    if (!n || !p) return false;
    if (!messageLenOk) return false;

    if (isGetInTouch) {
      if (!attachOk) return false;
      return true;
    }

    if (!pageTitle.trim()) return false;
    if (serviceEnquiry) {
      if (!contactConsent) return false;
      if (!investorClass.trim()) return false;
    }
    return true;
  }, [
    attachOk,
    contactConsent,
    email,
    investorClass,
    isGetInTouch,
    messageLenOk,
    name,
    pageTitle,
    phone,
    serviceEnquiry,
  ]);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isValid || status === "loading") return;

    setStatus("loading");
    setError("");
    setWarning("");

    const form = e.currentTarget;
    const data = new FormData(form);
    const nameVal = name.trim();
    const emailVal = email.trim();
    const phoneVal = phone.trim();
    const messageVal = message.trim();
    const subjectRaw = String(data.get("subject") ?? subject);
    const file = data.get("attachment");

    if (!nameVal) {
      setStatus("error");
      setError(pickLang(copy.errorNameEn, copy.errorNameAr, lang));
      return;
    }
    if (!phoneVal) {
      setStatus("error");
      setError(pickLang(copy.errorPhoneEn, copy.errorPhoneAr, lang));
      return;
    }
    if (emailVal && !EMAIL_RE.test(emailVal)) {
      setStatus("error");
      setError(pickLang(copy.errorEmailEn, copy.errorEmailAr, lang));
      return;
    }

    if (
      messageVal.length < MESSAGE_MIN ||
      messageVal.length > MESSAGE_MAX
    ) {
      setStatus("error");
      setError(pickLang(copy.errorMessageLenEn, copy.errorMessageLenAr, lang));
      return;
    }

    if (isGetInTouch) {
      if (
        subjectRaw !== "Complaint" &&
        subjectRaw !== "Inquiry" &&
        subjectRaw !== "Info"
      ) {
        setStatus("error");
        setError(pickLang(copy.errorSubjectEn, copy.errorSubjectAr, lang));
        return;
      }
      if (file instanceof File && file.size > 0) {
        if (subjectRaw !== "Complaint") {
          setStatus("error");
          setError(
            pickLang(
              copy.errorAttachmentSubjectEn,
              copy.errorAttachmentSubjectAr,
              lang,
            ),
          );
          return;
        }
        if (file.size > IMAGE_MAX_BYTES || !isAllowedImageFile(file)) {
          setStatus("error");
          setError(
            pickLang(copy.errorAttachmentEn, copy.errorAttachmentAr, lang),
          );
          return;
        }
      }
    } else if (!pageTitle.trim()) {
      setStatus("error");
      setError(pickLang(copy.errorGenericEn, copy.errorGenericAr, lang));
      return;
    }

    if (serviceEnquiry) {
      if (!contactConsent) {
        setStatus("error");
        setError(pickLang(copy.errorConsentEn, copy.errorConsentAr, lang));
        return;
      }
      if (!investorClass.trim()) {
        setStatus("error");
        setError(
          pickLang(copy.errorInvestorClassEn, copy.errorInvestorClassAr, lang),
        );
        return;
      }
    }

    const token = await getRecaptchaToken(
      isGetInTouch ? "get_in_touch" : "register_interest",
    );
    if (recaptchaRequired() && !token) {
      setStatus("error");
      setError(pickLang(copy.errorCaptchaEn, copy.errorCaptchaAr, lang));
      return;
    }

    try {
      let res: Response;
      if (isGetInTouch) {
        const body = new FormData();
        body.set("variant", "get-in-touch");
        body.set("name", nameVal);
        body.set("email", emailVal);
        body.set("phone", phoneVal);
        body.set("subject", subjectRaw);
        body.set("message", messageVal);
        body.set("sourcePage", sourcePage);
        if (token) body.set("recaptchaToken", token);
        if (
          subjectRaw === "Complaint" &&
          file instanceof File &&
          file.size > 0
        ) {
          body.set("attachment", file);
        }
        res = await fetch(apiUrl("/api/contact"), {
          method: "POST",
          credentials: "include",
          body,
        });
      } else {
        res = await fetch(apiUrl("/api/contact"), {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({
            variant: "register",
            name: nameVal,
            email: emailVal,
            phone: phoneVal,
            subject: "",
            message: serviceEnquiry
              ? `${messageVal}\n\n${pickLang(copy.investorClassLabelEn, copy.investorClassLabelAr, lang)}: ${
                  investorClass === "qualified"
                    ? pickLang(
                        copy.investorClassQualifiedEn,
                        copy.investorClassQualifiedAr,
                        lang,
                      )
                    : pickLang(
                        copy.investorClassInstitutionEn,
                        copy.investorClassInstitutionAr,
                        lang,
                      )
                }\n${pickLang(copy.consentLabelEn, copy.consentLabelAr, lang)}: yes`
              : messageVal,
            sourcePage,
            pageTitle: pageTitle.trim(),
            recaptchaToken: token,
          }),
        });
      }

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
      setSubject("Inquiry");
      setName("");
      setEmail("");
      setPhone("");
      setMessage(isRegister ? defaultRegisterMessage : "");
      setMessageTouched(false);
      setFileName("");
      setAttachOk(true);
      setContactConsent(false);
      setInvestorClass("");
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

  const canSubmit = isValid && status !== "loading";

  return (
    <form className={className} onSubmit={onSubmit} noValidate>
      {isRegister ? (
        <label className="contact-field">
          <span className="contact-field-label">
            {pickLang(copy.pageTitleLabelEn, copy.pageTitleLabelAr, lang)}
          </span>
          <input
            type="text"
            name="pageTitle"
            value={pageTitle}
            readOnly
            disabled
            tabIndex={-1}
            className="contact-field-readonly"
            aria-readonly="true"
          />
        </label>
      ) : null}
      <label className="contact-field">
        <span className="contact-field-label">
          {pickLang(copy.nameEn, copy.nameAr, lang)}
          <RequiredMark />
        </span>
        <input
          type="text"
          name="name"
          value={name}
          onChange={(ev) => setName(ev.target.value)}
          placeholder={pickLang(copy.nameEn, copy.nameAr, lang)}
          required
          aria-required="true"
          autoComplete="name"
          maxLength={200}
        />
      </label>
      <label className="contact-field">
        <span className="contact-field-label">
          {isGetInTouch
            ? pickLang(copy.emailOptionalEn, copy.emailOptionalAr, lang)
            : pickLang(copy.emailEn, copy.emailAr, lang)}
        </span>
        <input
          type="email"
          name="email"
          value={email}
          onChange={(ev) => setEmail(ev.target.value)}
          placeholder={
            isGetInTouch
              ? pickLang(copy.emailOptionalEn, copy.emailOptionalAr, lang)
              : pickLang(copy.emailEn, copy.emailAr, lang)
          }
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
          placeholder={pickLang(copy.phoneEn, copy.phoneAr, lang)}
          required
          aria-required="true"
          autoComplete="tel"
          maxLength={80}
        />
      </label>
      {isGetInTouch ? (
        <fieldset className="fp-radios contact-modal-radios">
          <legend className="fp-radios-label">
            {pickLang(copy.subjectLabelEn, copy.subjectLabelAr, lang)}
            <RequiredMark />
          </legend>
          <div className="contact-modal-radio-row">
            <label>
              <input
                type="radio"
                name="subject"
                value="Complaint"
                checked={subject === "Complaint"}
                onChange={() => setSubject("Complaint")}
              />{" "}
              {pickLang(copy.subjectComplaintEn, copy.subjectComplaintAr, lang)}
            </label>
            <label>
              <input
                type="radio"
                name="subject"
                value="Inquiry"
                checked={subject === "Inquiry"}
                onChange={() => setSubject("Inquiry")}
              />{" "}
              {pickLang(copy.subjectInquiryEn, copy.subjectInquiryAr, lang)}
            </label>
            <label>
              <input
                type="radio"
                name="subject"
                value="Info"
                checked={subject === "Info"}
                onChange={() => setSubject("Info")}
              />{" "}
              {pickLang(copy.subjectInfoEn, copy.subjectInfoAr, lang)}
            </label>
          </div>
        </fieldset>
      ) : null}
      <div className="contact-modal-message">
        <label className="contact-field">
          <span className="contact-field-label">
            {pickLang(copy.messageEn, copy.messageAr, lang)}
            <RequiredMark />
          </span>
          <textarea
            name="message"
            value={message}
            onChange={(ev) => {
              setMessageTouched(true);
              setMessage(ev.target.value);
            }}
            placeholder={pickLang(copy.messageEn, copy.messageAr, lang)}
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
      {canAttachImage ? (
        <div className="contact-modal-attach">
          <span className="contact-modal-attach-label">
            {pickLang(copy.attachmentLabelEn, copy.attachmentLabelAr, lang)}
          </span>
          <input
            id="contact-attachment"
            key="contact-attachment-complaint"
            className="contact-upload-input"
            type="file"
            name="attachment"
            accept={IMAGE_ACCEPT}
            multiple={false}
            onChange={(ev) => {
              const list = ev.target.files;
              const f = list?.[0];
              if (list && list.length > 1) {
                setError(
                  pickLang(copy.errorAttachmentEn, copy.errorAttachmentAr, lang),
                );
                ev.target.value = "";
                setFileName("");
                setAttachOk(true);
                return;
              }
              if (!f) {
                setFileName("");
                setAttachOk(true);
                setError("");
                return;
              }
              if (f.size > IMAGE_MAX_BYTES || !isAllowedImageFile(f)) {
                setError(
                  pickLang(copy.errorAttachmentEn, copy.errorAttachmentAr, lang),
                );
                ev.target.value = "";
                setFileName("");
                setAttachOk(true);
                return;
              }
              setFileName(f.name);
              setAttachOk(true);
              setError("");
            }}
          />
          <label htmlFor="contact-attachment" className="btn btn-navy contact-upload-btn">
            {pickLang(copy.attachmentButtonEn, copy.attachmentButtonAr, lang)}
          </label>
          <p className="contact-modal-attach-hint">
            {pickLang(copy.attachmentHintEn, copy.attachmentHintAr, lang)}
            {fileName ? ` — ${fileName}` : ""}
          </p>
        </div>
      ) : null}
      {serviceEnquiry ? (
        <>
          <label className="contact-field">
            <span className="contact-field-label">
              {pickLang(
                copy.investorClassLabelEn,
                copy.investorClassLabelAr,
                lang,
              )}
              <RequiredMark />
            </span>
            <select
              name="investorClass"
              value={investorClass}
              onChange={(ev) => setInvestorClass(ev.target.value)}
              required
              aria-required="true"
            >
              <option value="">
                {pickLang(
                  copy.investorClassPlaceholderEn,
                  copy.investorClassPlaceholderAr,
                  lang,
                )}
              </option>
              <option value="institution">
                {pickLang(
                  copy.investorClassInstitutionEn,
                  copy.investorClassInstitutionAr,
                  lang,
                )}
              </option>
              <option value="qualified">
                {pickLang(
                  copy.investorClassQualifiedEn,
                  copy.investorClassQualifiedAr,
                  lang,
                )}
              </option>
            </select>
          </label>
          <label className="contact-field contact-field--check">
            <input
              type="checkbox"
              name="contactConsent"
              checked={contactConsent}
              onChange={(ev) => setContactConsent(ev.target.checked)}
              required
              aria-required="true"
            />
            <span>
              {pickLang(copy.consentLabelEn, copy.consentLabelAr, lang)}
              <RequiredMark />
            </span>
          </label>
        </>
      ) : null}
      {error ? <p className="form-error">{error}</p> : null}
      <button
        type="submit"
        className="btn btn-navy"
        disabled={!canSubmit}
        aria-disabled={!canSubmit}
      >
        {status === "loading"
          ? pickLang(copy.sendingEn, copy.sendingAr, lang)
          : resolvedSubmit}
      </button>
    </form>
  );
}
