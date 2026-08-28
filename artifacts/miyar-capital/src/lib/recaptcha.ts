declare global {
  interface Window {
    __MIYAR_RECAPTCHA_SITE_KEY__?: string;
    /** Set from layout when Vercel/APP_ENV is production or a site key is present. */
    __MIYAR_REQUIRE_RECAPTCHA__?: boolean;
    grecaptcha?: {
      ready: (cb: () => void) => void;
      execute: (key: string, options: { action: string }) => Promise<string>;
    };
  }
}

export type RecaptchaAction =
  | "get_in_touch"
  | "register_interest"
  | "job_apply";

const LOAD_TIMEOUT_MS = 15000;

function siteKey(): string | undefined {
  if (typeof window === "undefined") return undefined;
  return window.__MIYAR_RECAPTCHA_SITE_KEY__?.trim() || undefined;
}

/** True when submit must obtain a token before calling the API. */
export function recaptchaRequired(): boolean {
  if (typeof window === "undefined") return false;
  if (window.__MIYAR_REQUIRE_RECAPTCHA__) return true;
  return Boolean(siteKey());
}

export function isCaptchaApiError(error: string | undefined): boolean {
  if (!error) return false;
  return /captcha|recaptcha|security check|التحقق الأمني/i.test(error);
}

function grecaptchaApi():
  | {
      ready: (cb: () => void) => void;
      execute: (key: string, options: { action: string }) => Promise<string>;
    }
  | undefined {
  if (typeof window === "undefined") return undefined;
  return window.grecaptcha;
}

async function waitForGrecaptcha() {
  const existing = grecaptchaApi();
  if (existing) return existing;

  const started = Date.now();
  return new Promise<NonNullable<ReturnType<typeof grecaptchaApi>> | undefined>(
    (resolve) => {
      const tick = () => {
        const api = grecaptchaApi();
        if (api) {
          resolve(api);
          return;
        }
        if (Date.now() - started >= LOAD_TIMEOUT_MS) {
          resolve(undefined);
          return;
        }
        window.setTimeout(tick, 50);
      };
      tick();
    },
  );
}

/**
 * Returns a v3 token, or undefined if captcha is not configured.
 * When recaptchaRequired(), callers must treat undefined as a hard failure.
 */
export async function getRecaptchaToken(
  action: RecaptchaAction,
): Promise<string | undefined> {
  const key = siteKey();
  if (!key) {
    if (recaptchaRequired()) {
      console.error(
        "[recaptcha] required on this host but RECAPTCHA_SITE_KEY was not injected",
      );
    }
    return undefined;
  }
  const api = await waitForGrecaptcha();
  if (!api) {
    console.error("[recaptcha] google script did not load in time");
    return undefined;
  }
  try {
    const token = await new Promise<string>((resolve, reject) => {
      api.ready(() => {
        api.execute(key, { action }).then(resolve).catch(reject);
      });
    });
    return token || undefined;
  } catch (err) {
    console.error("[recaptcha] execute failed", err);
    return undefined;
  }
}
