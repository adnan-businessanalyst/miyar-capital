export type AppEnv = "staging" | "production";

const LOCAL_SITE = "http://localhost:3001";

function normalizeEnv(raw: string | undefined): AppEnv | undefined {
  const value = (raw ?? "").trim().toLowerCase();
  if (value === "production" || value === "prod") return "production";
  if (value === "staging" || value === "stage" || value === "development" || value === "dev") {
    return "staging";
  }
  return undefined;
}

function fromNpmScript(): AppEnv | undefined {
  const script = process.env.npm_lifecycle_event ?? "";
  if (script.endsWith(":production")) return "production";
  return undefined;
}

/** True on Railway / Vercel. Local `pnpm dev` stays on localhost URLs. */
export function isHostedRuntime(): boolean {
  return Boolean(
    process.env.RAILWAY_ENVIRONMENT ||
      process.env.RAILWAY_ENVIRONMENT_NAME ||
      process.env.RAILWAY_PROJECT_ID ||
      process.env.VERCEL ||
      process.env.VERCEL_ENV,
  );
}

/** staging (local + staging hosts) or production. Default: staging. */
export function resolveAppEnv(): AppEnv {
  return (
    normalizeEnv(process.env.MIYAR_DB) ||
    fromNpmScript() ||
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

function firstOfCsv(raw: string | undefined): string | undefined {
  return raw
    ?.split(",")
    .map((part) => part.trim().replace(/\/$/, ""))
    .find(Boolean);
}

function splitOrigins(raw: string | undefined): string[] {
  return (raw ?? "")
    .split(",")
    .map((part) => part.trim().replace(/\/$/, ""))
    .filter(Boolean);
}

function unique(values: string[]): string[] {
  return [...new Set(values)];
}

/** Prefer env-specific URL; never use the staging value when production was requested. */
function pickPairedUrl(opts: {
  staging?: string;
  production?: string;
  fallback?: string;
}): string | undefined {
  if (resolveAppEnv() === "production") {
    return firstUrl(opts.production, opts.fallback);
  }
  return firstUrl(opts.staging, opts.fallback);
}

export function peekDatabaseUrl(): string | undefined {
  return pickPairedUrl({
    staging: process.env.DATABASE_URL_STAGING,
    production: process.env.DATABASE_URL_PRODUCTION,
    fallback: process.env.DATABASE_URL,
  });
}

export function resolveDatabaseUrl(): string {
  const env = resolveAppEnv();
  const url = peekDatabaseUrl();
  if (url) return url;

  if (env === "production") {
    throw new Error(
      "DATABASE_URL is not configured for production. Set DATABASE_URL_PRODUCTION in .env (local) or DATABASE_URL on the production host.",
    );
  }

  throw new Error(
    "DATABASE_URL is not configured for staging. Set DATABASE_URL_STAGING or DATABASE_URL.",
  );
}

function isLocalOrigin(url: string | undefined): boolean {
  if (!url) return false;
  try {
    const host = new URL(url).hostname;
    return host === "localhost" || host === "127.0.0.1";
  } catch {
    return false;
  }
}

const PRODUCTION_SITE = "https://miyarcapital.com.sa";

/** Vercel (or local) site origin for CORS and reset-email links. */
export function resolveFrontendOrigin(): string {
  if (!isHostedRuntime()) {
    return firstUrl(firstOfCsv(process.env.FRONTEND_ORIGIN), LOCAL_SITE) ?? LOCAL_SITE;
  }

  const picked = pickPairedUrl({
    staging: firstUrl(process.env.VERCEL_URL_STAGING, process.env.FRONTEND_ORIGIN_STAGING),
    production: firstUrl(process.env.VERCEL_URL_PRODUCTION, process.env.FRONTEND_ORIGIN_PRODUCTION),
    fallback: firstOfCsv(process.env.FRONTEND_ORIGIN),
  });

  if (resolveAppEnv() === "production" && (!picked || isLocalOrigin(picked))) {
    return PRODUCTION_SITE;
  }

  return picked ?? LOCAL_SITE;
}

export function resolveFrontendOrigins(): string[] {
  const extras = isHostedRuntime()
    ? splitOrigins(process.env.FRONTEND_ORIGIN).filter((origin) => !isLocalOrigin(origin))
    : splitOrigins(process.env.FRONTEND_ORIGIN);
  const productionSites =
    resolveAppEnv() === "production"
      ? [PRODUCTION_SITE, "https://www.miyarcapital.com.sa"]
      : [];
  return unique([resolveFrontendOrigin(), ...productionSites, ...extras]);
}
