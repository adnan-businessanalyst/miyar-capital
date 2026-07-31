import { Hono } from "hono";
import { cors } from "hono/cors";
import { desc, eq } from "drizzle-orm";
import {
  clearAdminSession,
  createAdminSession,
  isAdminAuthenticated,
  verifyAdminPassword,
} from "./admin/auth.js";
import { sendContactEmail } from "./contact/mail.js";
import { rateLimit } from "./contact/rateLimit.js";
import { verifyRecaptcha } from "./contact/recaptcha.js";
import { contactPayloadSchema } from "./contact/schema.js";
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
      build: "2026-07-31-careers-detail",
      routes: ["jobs", "news", "reports", "disclosures", "homepage", "funds"],
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

      const json = await c.req.json().catch(() => null);
      const parsed = contactPayloadSchema.safeParse(json);
      if (!parsed.success) {
        return c.json(
          { ok: false, error: parsed.error.issues[0]?.message ?? "Invalid form data" },
          400,
        );
      }

      const payload = parsed.data;
      const captchaOk = await verifyRecaptcha(payload.recaptchaToken, ip);
      if (!captchaOk) {
        return c.json(
          { ok: false, error: "Captcha verification failed. Please try again." },
          400,
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
          userAgent: c.req.header("user-agent")?.slice(0, 500) ?? null,
          createdAt,
        })
        .returning({ id: contactSubmissions.id, createdAt: contactSubmissions.createdAt });

      try {
        await sendContactEmail(payload, { id: row.id, createdAt: row.createdAt });
      } catch (mailErr) {
        console.error("[contact] email failed", mailErr);
        return c.json({
          ok: true,
          id: row.id,
          warning:
            "Saved, but email notification failed. Our team can still see your message.",
        });
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
        .select()
        .from(contactSubmissions)
        .orderBy(desc(contactSubmissions.createdAt))
        .limit(200);
      return c.json({
        ok: true,
        submissions: rows.map((r) => ({
          ...r,
          createdAt: r.createdAt.toISOString(),
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
      .select()
      .from(contactSubmissions)
      .where(eq(contactSubmissions.id, id))
      .limit(1);
    if (!row) return c.json({ error: "Not found" }, 404);
    return c.json({
      ok: true,
      submission: { ...row, createdAt: row.createdAt.toISOString() },
    });
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
