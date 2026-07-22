import { NextResponse } from "next/server";
import { createAdminSession, verifyAdminPassword } from "@/server/admin/auth";
import { rateLimit } from "@/server/contact/rateLimit";

export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  const limited = rateLimit(`admin-login:${ip}`);
  if (!limited.ok) {
    return NextResponse.json({ error: "Too many attempts" }, { status: 429 });
  }

  const body = (await req.json().catch(() => null)) as { password?: string } | null;
  if (!body?.password || !verifyAdminPassword(body.password)) {
    return NextResponse.json({ error: "Invalid password" }, { status: 401 });
  }

  try {
    await createAdminSession();
  } catch {
    return NextResponse.json(
      { error: "Admin auth is not configured (ADMIN_SESSION_SECRET / ADMIN_PASSWORD)" },
      { status: 500 },
    );
  }
  return NextResponse.json({ ok: true });
}
