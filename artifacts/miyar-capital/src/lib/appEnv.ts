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

function firstUrl(...candidates: Array<string | undefined>): string | undefined {
  for (const candidate of candidates) {
    const url = candidate?.trim().replace(/\/$/, "");
    if (url) return url;
  }
  return undefined;
}

/** Railway API origin for Next `/api` rewrites and server fetches. */
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
    return firstUrl(production, fallback) ?? LOCAL_API;
  }

  return firstUrl(staging, fallback, LOCAL_API) ?? LOCAL_API;
}
