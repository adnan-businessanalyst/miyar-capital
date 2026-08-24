/**
 * JobApplyButton — Apply button that opens a ContactModal containing JobApplyForm for a given posting.
 *
 * Used by:
 * - components/JobsSection.tsx
 * - views/JobDetail.tsx
 */

"use client";

import { useState } from "react";
import { JOB_APPLY } from "../data/jobApply";
import type { JobPosting, JobsSettings } from "../data/jobs";
import { useLanguage } from "../i18n/LanguageContext";
import { pickLang } from "../site/types";
import { ContactModal } from "./ContactModal";
import { JobApplyForm } from "./JobApplyForm";

export function JobApplyButton({
  job,
  settings,
  className = "btn btn-gold fp-job-apply",
}: {
  job: JobPosting;
  settings: JobsSettings;
  className?: string;
}) {
  const { lang } = useLanguage();
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        className={className}
        onClick={() => setOpen(true)}
      >
        {pickLang(settings.applyLabelEn, settings.applyLabelAr, lang)}
      </button>
      <ContactModal
        open={open}
        onClose={() => setOpen(false)}
        title={pickLang(JOB_APPLY.modalTitleEn, JOB_APPLY.modalTitleAr, lang)}
        image={null}
      >
        <JobApplyForm
          job={job}
          sourcePage={`/careers/${job.slug}`}
        />
      </ContactModal>
    </>
  );
}
