"use client";

import { useState, type FormEvent } from "react";
import { apiUrl } from "@/lib/api";

export function AdminForgotPasswordForm() {
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const email = String(new FormData(e.currentTarget).get("email") ?? "");
    const res = await fetch(apiUrl("/api/admin/forgot-password"), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ email }),
    });
    setLoading(false);
    if (!res.ok) {
      const json = (await res.json().catch(() => ({}))) as { error?: string };
      setError(json.error || "Could not send reset email");
      return;
    }
    setDone(true);
  }

  if (done) {
    return (
      <p>
        If that email is registered for this CMS, we sent a reset link. Check your inbox
        and spam folder.
      </p>
    );
  }

  return (
    <form onSubmit={onSubmit}>
      <label htmlFor="email">Admin email</label>
      <input id="email" name="email" type="email" required autoComplete="username" />
      {error ? <p className="form-error">{error}</p> : null}
      <button type="submit" disabled={loading}>
        {loading ? "Sending…" : "Send reset link"}
      </button>
    </form>
  );
}
