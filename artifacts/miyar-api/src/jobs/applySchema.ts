import { z } from "zod";

/** Shared message rule for job applications (matches contact forms). */
export const applyMessageSchema = z
  .string()
  .trim()
  .min(20, "Message must be at least 20 characters")
  .max(300, "Message must be at most 300 characters");

/** Careers Apply form — all fields required; CV is validated separately (PDF). */
export const jobApplyPayloadSchema = z.object({
  firstName: z.string().trim().min(1, "First name is required").max(200),
  lastName: z.string().trim().min(1, "Last name is required").max(200),
  email: z
    .string()
    .trim()
    .min(1, "Email is required")
    .email("Valid email is required")
    .max(320),
  phone: z.string().trim().min(1, "Phone is required").max(80),
  message: applyMessageSchema,
  jobSlug: z.string().trim().min(1, "Job is required").max(200),
  jobTitle: z.string().trim().min(1, "Job title is required").max(300),
  jobReference: z.string().trim().min(1, "Job reference is required").max(80),
  jobId: z.string().trim().uuid().optional().or(z.literal("")),
  sourcePage: z.string().trim().min(1).max(300),
  /** reCAPTCHA v3 token — verified when RECAPTCHA_SECRET_KEY is set. */
  recaptchaToken: z.string().optional(),
});

export type JobApplyPayload = z.infer<typeof jobApplyPayloadSchema>;

export function parseJobApplyFields(raw: Record<string, unknown>) {
  return jobApplyPayloadSchema.safeParse({
    firstName: raw.firstName ?? "",
    lastName: raw.lastName ?? "",
    email: raw.email ?? "",
    phone: raw.phone ?? "",
    message: raw.message ?? "",
    jobSlug: raw.jobSlug ?? "",
    jobTitle: raw.jobTitle ?? "",
    jobReference: raw.jobReference ?? "",
    jobId: raw.jobId ?? "",
    sourcePage: raw.sourcePage ?? "",
    recaptchaToken: raw.recaptchaToken,
  });
}
