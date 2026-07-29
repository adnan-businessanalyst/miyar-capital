import { z } from "zod";

export const contactPayloadSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(200),
  email: z.string().trim().email("Valid email is required").max(320),
  phone: z.string().trim().max(80).optional().or(z.literal("")),
  subject: z.string().trim().max(200).optional().or(z.literal("")),
  message: z.string().trim().min(1, "Message is required").max(5000),
  sourcePage: z.string().trim().min(1).max(300),
  recaptchaToken: z.string().optional(),
});

export type ContactPayload = z.infer<typeof contactPayloadSchema>;
