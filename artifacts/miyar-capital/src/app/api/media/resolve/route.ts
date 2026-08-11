import { NextResponse } from "next/server";
import { resolvePublicMedia } from "@/lib/resolvePublicMedia";

export const dynamic = "force-dynamic";

/**
 * GET /api/media/resolve?folder=content&basename=ra-geo-network
 * Scans public/media at request time (any image extension).
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const folder = searchParams.get("folder") ?? "";
  const basename = searchParams.get("basename") ?? "";

  const hit = resolvePublicMedia(folder, basename);
  if (!hit) {
    return NextResponse.json({ ok: false, url: null }, { status: 404 });
  }

  return NextResponse.json(
    {
      ok: true,
      url: `${hit.url}?v=${Math.round(hit.mtimeMs)}`,
      ext: hit.ext,
    },
    {
      headers: {
        "Cache-Control": "no-store",
      },
    },
  );
}
