"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { apiUrl } from "@/lib/api";
import type { FundsReportsSettings } from "@/data/fundsreports";

export function FundSettingsForm({
  initial,
}: {
  initial: FundsReportsSettings;
}) {
  const router = useRouter();
  const [headingEn, setHeadingEn] = useState(initial.headingEn);
  const [headingAr, setHeadingAr] = useState(initial.headingAr);
  const [crumbEn, setCrumbEn] = useState(initial.crumbEn);
  const [crumbAr, setCrumbAr] = useState(initial.crumbAr);
  const [introEn, setIntroEn] = useState(initial.introEn);
  const [introAr, setIntroAr] = useState(initial.introAr);
  const [emptyEn, setEmptyEn] = useState(initial.emptyEn);
  const [emptyAr, setEmptyAr] = useState(initial.emptyAr);
  const [viewReportsEn, setViewReportsEn] = useState(initial.viewReportsEn);
  const [viewReportsAr, setViewReportsAr] = useState(initial.viewReportsAr);
  const [childCrumbReportsEn, setChildCrumbReportsEn] = useState(
    initial.childCrumbReportsEn,
  );
  const [childCrumbReportsAr, setChildCrumbReportsAr] = useState(
    initial.childCrumbReportsAr,
  );
  const [votingPolicyEn, setVotingPolicyEn] = useState(initial.votingPolicyEn);
  const [votingPolicyAr, setVotingPolicyAr] = useState(initial.votingPolicyAr);
  const [termsEn, setTermsEn] = useState(initial.termsEn);
  const [termsAr, setTermsAr] = useState(initial.termsAr);
  const [quarterlyEn, setQuarterlyEn] = useState(initial.quarterlyEn);
  const [quarterlyAr, setQuarterlyAr] = useState(initial.quarterlyAr);
  const [error, setError] = useState("");
  const [ok, setOk] = useState(false);
  const [busy, setBusy] = useState(false);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    setOk(false);
    setBusy(true);
    try {
      const res = await fetch(apiUrl("/api/admin/funds-reports-settings"), {
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          headingEn,
          headingAr,
          crumbEn,
          crumbAr,
          introEn,
          introAr,
          emptyEn,
          emptyAr,
          viewReportsEn,
          viewReportsAr,
          childCrumbReportsEn,
          childCrumbReportsAr,
          votingPolicyEn,
          votingPolicyAr,
          termsEn,
          termsAr,
          quarterlyEn,
          quarterlyAr,
        }),
      });
      const json = (await res.json().catch(() => ({}))) as { error?: string };
      if (!res.ok) {
        setError(json.error || "Save failed");
        return;
      }
      setOk(true);
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Save failed");
    } finally {
      setBusy(false);
    }
  }

  return (
    <form className="admin-form" onSubmit={onSubmit}>
      <h2 style={{ marginTop: 0, fontSize: "1.1rem" }}>Page settings</h2>
      <div className="admin-form-grid">
        <label>
          Heading (EN)
          <input value={headingEn} onChange={(e) => setHeadingEn(e.target.value)} required />
        </label>
        <label>
          Heading (AR)
          <input value={headingAr} onChange={(e) => setHeadingAr(e.target.value)} dir="rtl" />
        </label>
        <label>
          Crumb (EN)
          <input value={crumbEn} onChange={(e) => setCrumbEn(e.target.value)} required />
        </label>
        <label>
          Crumb (AR)
          <input value={crumbAr} onChange={(e) => setCrumbAr(e.target.value)} dir="rtl" />
        </label>
        <label className="admin-form-span">
          Intro (EN)
          <textarea value={introEn} onChange={(e) => setIntroEn(e.target.value)} rows={2} required />
        </label>
        <label className="admin-form-span">
          Intro (AR)
          <textarea value={introAr} onChange={(e) => setIntroAr(e.target.value)} rows={2} dir="rtl" />
        </label>
        <label>
          Empty state (EN)
          <input value={emptyEn} onChange={(e) => setEmptyEn(e.target.value)} required />
        </label>
        <label>
          Empty state (AR)
          <input value={emptyAr} onChange={(e) => setEmptyAr(e.target.value)} dir="rtl" />
        </label>
        <label>
          View reports CTA (EN)
          <input value={viewReportsEn} onChange={(e) => setViewReportsEn(e.target.value)} required />
        </label>
        <label>
          View reports CTA (AR)
          <input value={viewReportsAr} onChange={(e) => setViewReportsAr(e.target.value)} dir="rtl" />
        </label>
        <label>
          Child crumb “Reports” (EN)
          <input
            value={childCrumbReportsEn}
            onChange={(e) => setChildCrumbReportsEn(e.target.value)}
            required
          />
        </label>
        <label>
          Child crumb “Reports” (AR)
          <input
            value={childCrumbReportsAr}
            onChange={(e) => setChildCrumbReportsAr(e.target.value)}
            dir="rtl"
          />
        </label>
        <label>
          Section: Voting Policy (EN)
          <input
            value={votingPolicyEn}
            onChange={(e) => setVotingPolicyEn(e.target.value)}
            required
          />
        </label>
        <label>
          Section: Voting Policy (AR)
          <input
            value={votingPolicyAr}
            onChange={(e) => setVotingPolicyAr(e.target.value)}
            dir="rtl"
          />
        </label>
        <label>
          Section: Terms (EN)
          <input
            value={termsEn}
            onChange={(e) => setTermsEn(e.target.value)}
            required
          />
        </label>
        <label>
          Section: Terms (AR)
          <input
            value={termsAr}
            onChange={(e) => setTermsAr(e.target.value)}
            dir="rtl"
          />
        </label>
        <label>
          Section: Quarterly (EN)
          <input
            value={quarterlyEn}
            onChange={(e) => setQuarterlyEn(e.target.value)}
            required
          />
        </label>
        <label>
          Section: Quarterly (AR)
          <input
            value={quarterlyAr}
            onChange={(e) => setQuarterlyAr(e.target.value)}
            dir="rtl"
          />
        </label>
      </div>
      {error ? <p className="form-error">{error}</p> : null}
      {ok ? <p className="admin-meta">Settings saved.</p> : null}
      <button type="submit" className="admin-btn" disabled={busy}>
        {busy ? "Saving…" : "Save settings"}
      </button>
    </form>
  );
}
