"use client";

import { useEffect, useState } from "react";

/**
 * Resolve a public media basename at runtime via /api/media/resolve.
 * Drop any supported image extension under public/media/{folder}/.
 */
export function useResolvedMedia(folder: string, basename: string): string {
  const [url, setUrl] = useState("");

  useEffect(() => {
    let cancelled = false;
    const params = new URLSearchParams({ folder, basename });

    fetch(`/api/media/resolve?${params.toString()}`, { cache: "no-store" })
      .then((res) => (res.ok ? res.json() : null))
      .then((json: { ok?: boolean; url?: string | null } | null) => {
        if (cancelled || !json?.ok || !json.url) return;
        setUrl(json.url);
      })
      .catch(() => {
        /* leave empty — card shows navy fallback */
      });

    return () => {
      cancelled = true;
    };
  }, [folder, basename]);

  return url;
}
