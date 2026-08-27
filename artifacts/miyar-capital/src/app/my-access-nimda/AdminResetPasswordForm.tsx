"use client";

import { useState, type FormEvent } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { apiUrl } from "@/lib/api";

export function AdminResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token") || "";
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const data = new FormData(e.currentTarget);
    const password = String(data.get("password") ?? "");
    const confirm = String(data.get("confirm") ?? "");
    if (password !== confirm) {
      setLoading(false);
      setError("Passwords do not match");
      return;
    }
    const res = await fetch(apiUrl("/api/admin/reset-password"), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ token, password }),
    });
    setLoading(false);
    if (!res.ok) {
      const json = (await res.json().catch(() => ({}))) as { error?: string };
      setError(json.error || "Could not reset password");
      return;
    }
    router.push("/my-access-nimda");
    router.refresh();
  }

  if (!token) {
    return (
      <p className="form-error">
        This reset link is missing a token. Request a new one from the login page.
      </p>
    );
  }

  return (
    <form onSubmit={onSubmit}>
      <label htmlFor="password">New password</label>
      <input
        id="password"
        name="password"
        type="password"
        required
        minLength={10}
        autoComplete="new-password"
      />
      <label htmlFor="confirm">Confirm password</label>
      <input
        id="confirm"
        name="confirm"
        type="password"
        required
        minLength={10}
        autoComplete="new-password"
      />
      {error ? <p className="form-error">{error}</p> : null}
      <button type="submit" disabled={loading}>
        {loading ? "Saving…" : "Set new password"}
      </button>
    </form>
  );
}
