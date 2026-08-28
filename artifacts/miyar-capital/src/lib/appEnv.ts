export type AppEnv = "staging" | "production";

const LOCAL_API = "http://127.0.0.1:4000";

function normalizeEnv(raw: string | undefined): AppEnv | undefined {
  const value = (raw ?? "").trim().toLowerCase();
  if (value === "production" || value === "prod") return "production";
  if (value === "staging" || value === "stage" || value === "development" || value === "dev") {
    return "staging";
  }
  return undefined;
}

export function isHostedRuntime(): boolean {
  return Boolean(process.env.VERCEL || process.env.VERCEL_ENV);
}

export function resolveAppEnv(): AppEnv {
  return (
    normalizeEnv(process.env.APP_ENV) ||
    normalizeEnv(process.env.MIYAR_ENV) ||
    "staging"
  );
}

function stripTrailingSlash(url: string): string {
  return url.replace(/\/$/, "");
}

/** Accept `https://host` or `https://host/api` — callers always append `/api/...`. */
export function normalizeApiOrigin(url: string | undefined): string | undefined {
  const trimmed = url?.trim();
  if (!trimmed) return undefined;
  return stripTrailingSlash(trimmed).replace(/\/api$/i, "");
}

export function isLocalApiUrl(url: string | undefined): boolean {
  if (!url) return false;
  try {
    const host = new URL(url).hostname;
    return host === "localhost" || host === "127.0.0.1";
  } catch {
    return false;
  }
}

function firstUrl(...candidates: Array<string | undefined>): string | undefined {
  for (const candidate of candidates) {
    const url = normalizeApiOrigin(candidate);
    if (url) return url;
  }
  return undefined;
}

function firstRemoteUrl(...candidates: Array<string | undefined>): string | undefined {
  for (const candidate of candidates) {
    const url = normalizeApiOrigin(candidate);
    if (!url || isLocalApiUrl(url)) continue;
    return url;
  }
  return undefined;
}

/** Railway API origin for Next `/api` proxy and server fetches. */
export function resolveApiInternalUrl(): string {
  if (!isHostedRuntime()) {
    return (
      firstUrl(process.env.API_INTERNAL_URL, process.env.NEXT_PUBLIC_API_URL, LOCAL_API) ??
      LOCAL_API
    );
  }

  const staging = firstUrl(process.env.RAILWAY_URL_STAGING, process.env.API_INTERNAL_URL_STAGING);
  const production = firstUrl(
    process.env.RAILWAY_URL_PRODUCTION,
    process.env.API_INTERNAL_URL_PRODUCTION,
  );
  const fallback = firstUrl(process.env.API_INTERNAL_URL, process.env.NEXT_PUBLIC_API_URL);

  if (resolveAppEnv() === "production") {
    return firstRemoteUrl(production, fallback, staging) ?? LOCAL_API;
  }

  return firstRemoteUrl(staging, fallback, production) ?? LOCAL_API;
}

export function isHostedApiConfigured(): boolean {
  if (!isHostedRuntime()) return true;
  return !isLocalApiUrl(resolveApiInternalUrl());
}
