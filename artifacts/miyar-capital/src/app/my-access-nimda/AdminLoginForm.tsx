"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { apiUrl } from "@/lib/api";

export function AdminLoginForm() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const password = String(new FormData(e.currentTarget).get("password") ?? "");
    try {
      const res = await fetch(apiUrl("/api/admin/login"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ password }),
      });
      if (!res.ok) {
        const json = (await res.json().catch(() => ({}))) as { error?: string };
        setError(
          json.error ||
            (res.status === 404 || res.status >= 502
              ? "API is not reachable. Set RAILWAY_URL_PRODUCTION on Vercel and confirm Railway /health is up."
              : "Login failed"),
        );
        return;
      }
      router.push("/my-access-nimda/submissions");
      router.refresh();
    } catch {
      setError("Cannot reach the API. Check that production Railway is up and Vercel APP_ENV / RAILWAY_URL_PRODUCTION are set.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit}>
      <label htmlFor="password">Password</label>
      <input id="password" name="password" type="password" required autoComplete="current-password" />
      {error ? <p className="form-error">{error}</p> : null}
      <button type="submit" disabled={loading}>
        {loading ? "Signing in…" : "Sign in"}
      </button>
      <p className="admin-login-forgot">
        <a href="/my-access-nimda/forgot-password">Forgot my password</a>
      </p>
    </form>
  );
}
