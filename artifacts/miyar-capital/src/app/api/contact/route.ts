import { NextResponse } from "next/server";
import { getDb } from "@/server/db";
import { contactSubmissions } from "@/server/db/schema";
import { sendContactEmail } from "@/server/contact/mail";
import { rateLimit } from "@/server/contact/rateLimit";
import { verifyRecaptcha } from "@/server/contact/recaptcha";
import { contactPayloadSchema } from "@/server/contact/schema";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      req.headers.get("x-real-ip") ||
      "unknown";
    const limited = rateLimit(`contact:${ip}`);
    if (!limited.ok) {
      return NextResponse.json(
        { ok: false, error: "Too many requests. Please try again shortly." },
        { status: 429, headers: { "Retry-After": String(limited.retryAfterSec) } },
      );
    }

    const json = await req.json().catch(() => null);
    const parsed = contactPayloadSchema.safeParse(json);
    if (!parsed.success) {
      return NextResponse.json(
        { ok: false, error: parsed.error.issues[0]?.message ?? "Invalid form data" },
        { status: 400 },
      );
    }

    const payload = parsed.data;
    const captchaOk = await verifyRecaptcha(payload.recaptchaToken, ip);
    if (!captchaOk) {
      return NextResponse.json(
        { ok: false, error: "Captcha verification failed. Please try again." },
        { status: 400 },
      );
    }

    const db = getDb();
    const createdAt = new Date();
    const [row] = await db
      .insert(contactSubmissions)
      .values({
        name: payload.name,
        email: payload.email,
        phone: payload.phone || null,
        subject: payload.subject || null,
        message: payload.message,
        sourcePage: payload.sourcePage,
        status: "new",
        ip,
        userAgent: req.headers.get("user-agent")?.slice(0, 500) ?? null,
        createdAt,
      })
      .returning({ id: contactSubmissions.id, createdAt: contactSubmissions.createdAt });

    try {
      await sendContactEmail(payload, { id: row.id, createdAt: row.createdAt });
    } catch (mailErr) {
      console.error("[contact] email failed", mailErr);
      // Submission is persisted; report soft failure so ops can follow up from admin.
      return NextResponse.json({
        ok: true,
        id: row.id,
        warning: "Saved, but email notification failed. Our team can still see your message.",
      });
    }

    return NextResponse.json({ ok: true, id: row.id });
  } catch (err) {
    console.error("[contact] error", err);
    const message =
      err instanceof Error && err.message.includes("DATABASE_URL")
        ? "Form service is temporarily unavailable."
        : "Something went wrong. Please try again.";
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}
