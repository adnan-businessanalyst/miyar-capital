import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { isAdminAuthenticated } from "@/server/admin/auth";
import { getDb } from "@/server/db";
import { contactSubmissions } from "@/server/db/schema";

type Ctx = { params: Promise<{ id: string }> };

export async function POST(_req: Request, ctx: Ctx) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { id } = await ctx.params;
  await getDb()
    .update(contactSubmissions)
    .set({ status: "read" })
    .where(eq(contactSubmissions.id, id));
  return NextResponse.json({ ok: true });
}
