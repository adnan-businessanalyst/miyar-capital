declare global {
  interface Window {
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

const LOAD_TIMEOUT_MS = 8000;

function siteKey(): string | undefined {
  return process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY?.trim() || undefined;
}

/** Production Vercel sets the site key; staging leaves it empty. */
export function recaptchaRequired(): boolean {
  return Boolean(siteKey());
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

export async function getRecaptchaToken(
  action: RecaptchaAction,
): Promise<string | undefined> {
  const key = siteKey();
  if (!key) return undefined;
  const api = await waitForGrecaptcha();
  if (!api) return undefined;
  try {
    return await new Promise((resolve, reject) => {
      api.ready(() => {
        api.execute(key, { action }).then(resolve).catch(reject);
      });
    });
  } catch {
    return undefined;
  }
}
