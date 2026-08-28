/**
 * Failed-password lockout (in-memory, per Railway/Node instance).
 * 3 failures → 5 minute lock. Successful auth clears the scope.
 * Replace with Redis if the API runs more than one instance.
 */

const FAIL_LIMIT = 3;
const LOCK_MS = 5 * 60 * 1000;

type Entry = { fails: number; lockedUntil: number };

const store = new Map<string, Entry>();

function now(): number {
  return Date.now();
}

function keys(scope: string, ip: string): string[] {
  return [`${scope}:${ip || "unknown"}`, `${scope}:global`];
}

function retryAfterSec(until: number): number {
  return Math.max(1, Math.ceil((until - now()) / 1000));
}

export function lockoutMessage(retryAfterSec: number): string {
  const minutes = Math.max(1, Math.ceil(retryAfterSec / 60));
  return `Too many attempts. Try again in ${minutes} minute${minutes === 1 ? "" : "s"}.`;
}

export function lockoutStatus(
  scope: string,
  ip: string,
): { ok: true } | { ok: false; retryAfterSec: number } {
  let latest = 0;
  for (const key of keys(scope, ip)) {
    const entry = store.get(key);
    if (entry && entry.lockedUntil > now()) {
      latest = Math.max(latest, entry.lockedUntil);
    }
  }
  if (latest) return { ok: false, retryAfterSec: retryAfterSec(latest) };
  return { ok: true };
}

export function lockoutFail(
  scope: string,
  ip: string,
): { ok: true } | { ok: false; retryAfterSec: number } {
  let lockedUntil = 0;
  for (const key of keys(scope, ip)) {
    const entry = store.get(key) ?? { fails: 0, lockedUntil: 0 };
    if (entry.lockedUntil > now()) {
      lockedUntil = Math.max(lockedUntil, entry.lockedUntil);
      continue;
    }
    entry.fails += 1;
    if (entry.fails >= FAIL_LIMIT) {
      entry.fails = 0;
      entry.lockedUntil = now() + LOCK_MS;
      lockedUntil = Math.max(lockedUntil, entry.lockedUntil);
    }
    store.set(key, entry);
  }
  if (lockedUntil) return { ok: false, retryAfterSec: retryAfterSec(lockedUntil) };
  return { ok: true };
}

export function lockoutClear(scope: string, ip: string): void {
  for (const key of keys(scope, ip)) store.delete(key);
}

/** Clear every key for a scope (used after email reset so recovery can sign in). */
export function lockoutClearScope(scope: string): void {
  const prefix = `${scope}:`;
  for (const key of [...store.keys()]) {
    if (key.startsWith(prefix)) store.delete(key);
  }
}
