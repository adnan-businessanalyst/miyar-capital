import { z } from "zod";

const optionalEmail = z
  .string()
  .trim()
  .max(320)
  .refine((v) => v === "" || z.string().email().safeParse(v).success, {
    message: "Valid email is required when provided",
  });

const getInTouchSubject = z.enum(["Complaint", "Inquiry", "Info"], {
  errorMap: () => ({ message: "Please select a subject" }),
});

/** Shared message rule for Get In Touch and Register Interest. */
export const contactMessageSchema = z
  .string()
  .trim()
  .min(20, "Message must be at least 20 characters")
  .max(300, "Message must be at most 300 characters");

/** Homepage Get In Touch — name, phone, message required; email optional. */
export const getInTouchPayloadSchema = z.object({
  variant: z.literal("get-in-touch"),
  name: z.string().trim().min(1, "Name is required").max(200),
  email: optionalEmail.default(""),
  phone: z.string().trim().min(1, "Phone is required").max(80),
  subject: getInTouchSubject,
  message: contactMessageSchema,
  sourcePage: z.string().trim().min(1).max(300),
  pageTitle: z.string().trim().max(300).optional().or(z.literal("")),
  recaptchaToken: z.string().optional(),
});

/** Register Interest — name + phone + page title required; email optional. */
export const registerPayloadSchema = z.object({
  variant: z.literal("register"),
  name: z.string().trim().min(1, "Name is required").max(200),
  email: optionalEmail.default(""),
  phone: z.string().trim().min(1, "Phone is required").max(80),
  subject: z.string().trim().max(200).optional().or(z.literal("")),
  message: contactMessageSchema,
  sourcePage: z.string().trim().min(1).max(300),
  pageTitle: z.string().trim().min(1, "Page title is required").max(300),
  recaptchaToken: z.string().optional(),
});

/** Accept JSON or multipart field bags; omit `variant` → register. */
export function parseContactFields(raw: Record<string, unknown>) {
  const variant = raw.variant === "get-in-touch" ? "get-in-touch" : "register";
  if (variant === "get-in-touch") {
    return getInTouchPayloadSchema.safeParse({
      ...raw,
      variant,
      email: raw.email ?? "",
      phone: raw.phone ?? "",
      subject: raw.subject ?? "",
      message: raw.message ?? "",
      name: raw.name ?? "",
      sourcePage: raw.sourcePage ?? "",
      pageTitle: raw.pageTitle ?? "",
    });
  }
  return registerPayloadSchema.safeParse({
    ...raw,
    variant: "register",
    email: raw.email ?? "",
    phone: raw.phone ?? "",
    message: raw.message ?? "",
    name: raw.name ?? "",
    sourcePage: raw.sourcePage ?? "",
    pageTitle: raw.pageTitle ?? "",
  });
}

export type GetInTouchPayload = z.infer<typeof getInTouchPayloadSchema>;
export type RegisterPayload = z.infer<typeof registerPayloadSchema>;
export type ContactPayload = GetInTouchPayload | RegisterPayload;
