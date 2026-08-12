import { Hono } from "hono";
import { cors } from "hono/cors";
import { desc, eq } from "drizzle-orm";
import {
  clearAdminSession,
  createAdminSession,
  isAdminAuthenticated,
  verifyAdminPassword,
} from "./admin/auth.js";
import {
  validateContactImage,
  type ValidatedContactImage,
} from "./contact/image.js";
import { isContactEmailConfigured, sendContactEmail } from "./contact/mail.js";
import { rateLimit } from "./contact/rateLimit.js";
import { verifyRecaptcha } from "./contact/recaptcha.js";
import { parseContactFields } from "./contact/schema.js";
import { getDb } from "./db/index.js";
import { contactSubmissions } from "./db/schema.js";
import { registerReportRoutes } from "./reports/routes.js";
import { registerDisclosureRoutes } from "./disclosures/routes.js";
import { registerHomepageRoutes } from "./homepage/routes.js";
import { registerJobRoutes } from "./jobs/routes.js";
import { registerNewsRoutes } from "./news/routes.js";
import { registerFundRoutes } from "./funds/routes.js";

function clientIp(c: { req: { header: (name: string) => string | undefined } }): string {
  return (
    c.req.header("x-forwarded-for")?.split(",")[0]?.trim() ||
    c.req.header("x-real-ip") ||
    "unknown"
  );
}

function frontendOrigins(): string[] {
  const raw = process.env.FRONTEND_ORIGIN || "http://localhost:3001";
  return raw
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}

export function createApp() {
  const app = new Hono();

  app.use(
    "*",
    cors({
      origin: (origin) => {
        const allowed = frontendOrigins();
        if (!origin) return allowed[0] ?? "*";
        return allowed.includes(origin) ? origin : allowed[0] ?? "";
      },
      credentials: true,
      allowMethods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
      allowHeaders: ["Content-Type"],
    }),
  );

  app.get("/health", (c) =>
    c.json({
      ok: true,
      service: "miyar-api",
      // Bump when shipping route sets so deploys are easy to verify.
      build: "2026-08-12-job-apply",
      routes: ["jobs", "jobs-apply", "news", "reports", "disclosures", "homepage", "funds"],
    }),
  );

  app.post("/api/contact", async (c) => {
    try {
      const ip = clientIp(c);
      const limited = rateLimit(`contact:${ip}`);
      if (!limited.ok) {
        c.header("Retry-After", String(limited.retryAfterSec));
        return c.json(
          { ok: false, error: "Too many requests. Please try again shortly." },
          429,
        );
      }

      const contentType = c.req.header("content-type") || "";
      let fields: Record<string, unknown> = {};
      let rawFile: File | null = null;

      if (contentType.includes("multipart/form-data")) {
        const body = await c.req.parseBody({ all: true });
        for (const [key, value] of Object.entries(body)) {
          if (key === "attachment") {
            if (value instanceof File) rawFile = value;
            else if (Array.isArray(value)) {
              const first = value.find((v) => v instanceof File);
              if (first instanceof File) rawFile = first;
            }
            continue;
          }
          if (typeof value === "string") fields[key] = value;
          else if (Array.isArray(value) && typeof value[0] === "string") {
            fields[key] = value[0];
          }
        }
      } else {
        const json = await c.req.json().catch(() => null);
        if (!json || typeof json !== "object") {
          return c.json({ ok: false, error: "Invalid form data" }, 400);
        }
        fields = json as Record<string, unknown>;
      }

      const parsed = parseContactFields(fields);
      if (!parsed.success) {
        return c.json(
          {
            ok: false,
            error: parsed.error.issues[0]?.message ?? "Invalid form data",
          },
          400,
        );
      }

      const payload = parsed.data;
      let attachment: ValidatedContactImage | null = null;
      const hasFile = Boolean(rawFile && rawFile.size > 0);

      if (hasFile && rawFile) {
        if (payload.variant !== "get-in-touch" || payload.subject !== "Complaint") {
          return c.json(
            {
              ok: false,
              error: "Attachments are only allowed for complaint submissions.",
            },
            400,
          );
        }
        const imageResult = await validateContactImage(rawFile, rawFile.name);
        if (!imageResult.ok) {
          return c.json({ ok: false, error: imageResult.error }, 400);
        }
        attachment = imageResult.image;
      }

      // Get-in-touch: reject attachment metadata without a validated file.
      if (
        payload.variant === "get-in-touch" &&
        payload.subject !== "Complaint" &&
        hasFile
      ) {
        return c.json(
          {
            ok: false,
            error: "Attachments are only allowed for complaint submissions.",
          },
          400,
        );
      }

      const captchaOk = await verifyRecaptcha(payload.recaptchaToken, ip);
      if (!captchaOk) {
        return c.json(
          { ok: false, error: "Captcha verification failed. Please try again." },
          400,
        );
      }

      const db = getDb();
      const createdAt = new Date();
      const email =
        typeof payload.email === "string" && payload.email.trim()
          ? payload.email.trim()
          : null;
      const phone = payload.phone.trim();
      const message = payload.message.trim();
      if (message.length < 20 || message.length > 300) {
        return c.json(
          {
            ok: false,
            error: "Message must be between 20 and 300 characters.",
          },
          400,
        );
      }
      const pageTitle =
        "pageTitle" in payload &&
        typeof payload.pageTitle === "string" &&
        payload.pageTitle.trim()
          ? payload.pageTitle.trim()
          : null;

      // Persist every valid submission (email notify is best-effort / optional).
      const [row] = await db
        .insert(contactSubmissions)
        .values({
          name: payload.name.trim(),
          email,
          phone,
          subject:
            typeof payload.subject === "string" && payload.subject.trim()
              ? payload.subject.trim()
              : null,
          message,
          sourcePage: payload.sourcePage.trim(),
          pageTitle,
          status: "new",
          ip,
          userAgent: c.req.header("user-agent")?.slice(0, 500) ?? null,
          createdAt,
          attachmentName: attachment?.fileName ?? null,
          attachmentMime: attachment?.mimeType ?? null,
          attachmentData: attachment?.buffer ?? null,
        })
        .returning({
          id: contactSubmissions.id,
          createdAt: contactSubmissions.createdAt,
        });

      if (isContactEmailConfigured()) {
        try {
          await sendContactEmail(
            payload,
            { id: row.id, createdAt: row.createdAt },
            attachment,
          );
        } catch (mailErr) {
          console.error("[contact] email failed", mailErr);
          return c.json({
            ok: true,
            id: row.id,
            warning:
              "Saved, but email notification failed. Our team can still see your message.",
          });
        }
      }

      return c.json({ ok: true, id: row.id });
    } catch (err) {
      console.error("[contact] error", err);
      const message =
        err instanceof Error && err.message.includes("DATABASE_URL")
          ? "Form service is temporarily unavailable."
          : "Something went wrong. Please try again.";
      return c.json({ ok: false, error: message }, 500);
    }
  });

  app.post("/api/admin/login", async (c) => {
    const ip = clientIp(c);
    const limited = rateLimit(`admin-login:${ip}`);
    if (!limited.ok) {
      return c.json({ error: "Too many attempts" }, 429);
    }

    const body = (await c.req.json().catch(() => null)) as { password?: string } | null;
    if (!body?.password || !verifyAdminPassword(body.password)) {
      return c.json({ error: "Invalid password" }, 401);
    }

    try {
      createAdminSession(c);
    } catch {
      return c.json(
        { error: "Admin auth is not configured (ADMIN_SESSION_SECRET / ADMIN_PASSWORD)" },
        500,
      );
    }
    return c.json({ ok: true });
  });

  app.post("/api/admin/logout", (c) => {
    clearAdminSession(c);
    return c.json({ ok: true });
  });

  app.get("/api/admin/me", (c) => {
    if (!isAdminAuthenticated(c)) return c.json({ ok: false }, 401);
    return c.json({ ok: true });
  });

  app.get("/api/admin/submissions", async (c) => {
    if (!isAdminAuthenticated(c)) return c.json({ error: "Unauthorized" }, 401);
    try {
      const rows = await getDb()
        .select({
          id: contactSubmissions.id,
          createdAt: contactSubmissions.createdAt,
          name: contactSubmissions.name,
          email: contactSubmissions.email,
          phone: contactSubmissions.phone,
          subject: contactSubmissions.subject,
          message: contactSubmissions.message,
          sourcePage: contactSubmissions.sourcePage,
          pageTitle: contactSubmissions.pageTitle,
          status: contactSubmissions.status,
          ip: contactSubmissions.ip,
          userAgent: contactSubmissions.userAgent,
          attachmentName: contactSubmissions.attachmentName,
        })
        .from(contactSubmissions)
        .orderBy(desc(contactSubmissions.createdAt))
        .limit(200);
      return c.json({
        ok: true,
        submissions: rows.map((r) => ({
          ...r,
          createdAt: r.createdAt.toISOString(),
          hasAttachment: Boolean(r.attachmentName),
        })),
      });
    } catch (e) {
      console.error("[admin] list failed", e);
      return c.json(
        { error: e instanceof Error ? e.message : "Database unavailable" },
        500,
      );
    }
  });

  app.get("/api/admin/submissions/:id", async (c) => {
    if (!isAdminAuthenticated(c)) return c.json({ error: "Unauthorized" }, 401);
    const id = c.req.param("id");
    const [row] = await getDb()
      .select({
        id: contactSubmissions.id,
        createdAt: contactSubmissions.createdAt,
        name: contactSubmissions.name,
        email: contactSubmissions.email,
        phone: contactSubmissions.phone,
        subject: contactSubmissions.subject,
        message: contactSubmissions.message,
        sourcePage: contactSubmissions.sourcePage,
        pageTitle: contactSubmissions.pageTitle,
        status: contactSubmissions.status,
        ip: contactSubmissions.ip,
        userAgent: contactSubmissions.userAgent,
        attachmentName: contactSubmissions.attachmentName,
        attachmentMime: contactSubmissions.attachmentMime,
      })
      .from(contactSubmissions)
      .where(eq(contactSubmissions.id, id))
      .limit(1);
    if (!row) return c.json({ error: "Not found" }, 404);
    return c.json({
      ok: true,
      submission: {
        ...row,
        createdAt: row.createdAt.toISOString(),
        hasAttachment: Boolean(row.attachmentName),
      },
    });
  });

  app.get("/api/admin/submissions/:id/attachment", async (c) => {
    if (!isAdminAuthenticated(c)) return c.json({ error: "Unauthorized" }, 401);
    const id = c.req.param("id");
    const [row] = await getDb()
      .select({
        attachmentName: contactSubmissions.attachmentName,
        attachmentMime: contactSubmissions.attachmentMime,
        attachmentData: contactSubmissions.attachmentData,
      })
      .from(contactSubmissions)
      .where(eq(contactSubmissions.id, id))
      .limit(1);
    if (!row?.attachmentData || !row.attachmentName) {
      return c.json({ error: "Not found" }, 404);
    }
    const safeName = row.attachmentName.replace(/[/\\?%*:|"<>]/g, "_");
    c.header("Content-Type", row.attachmentMime || "application/octet-stream");
    c.header(
      "Content-Disposition",
      `attachment; filename="${safeName}"`,
    );
    c.header("X-Content-Type-Options", "nosniff");
    return c.body(new Uint8Array(row.attachmentData));
  });

  app.post("/api/admin/submissions/:id/read", async (c) => {
    if (!isAdminAuthenticated(c)) return c.json({ error: "Unauthorized" }, 401);
    const id = c.req.param("id");
    await getDb()
      .update(contactSubmissions)
      .set({ status: "read" })
      .where(eq(contactSubmissions.id, id));
    return c.json({ ok: true });
  });

  registerReportRoutes(app);
  registerDisclosureRoutes(app);
  registerHomepageRoutes(app);
  registerJobRoutes(app);
  registerNewsRoutes(app);
  registerFundRoutes(app);

  return app;
}
