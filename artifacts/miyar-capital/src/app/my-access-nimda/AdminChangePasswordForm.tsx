"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { apiUrl } from "@/lib/api";

export function AdminChangePasswordForm() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const data = new FormData(e.currentTarget);
    const currentPassword = String(data.get("currentPassword") ?? "");
    const newPassword = String(data.get("newPassword") ?? "");
    const confirm = String(data.get("confirm") ?? "");
    if (newPassword !== confirm) {
      setLoading(false);
      setError("Passwords do not match");
      return;
    }
    if (newPassword === currentPassword) {
      setLoading(false);
      setError("New password must be different from the current password.");
      return;
    }
    const res = await fetch(apiUrl("/api/admin/change-password"), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ currentPassword, newPassword }),
    });
    setLoading(false);
    if (!res.ok) {
      const json = (await res.json().catch(() => ({}))) as { error?: string };
      setError(json.error || "Could not change password");
      return;
    }
    router.push("/my-access-nimda?updated=1");
    router.refresh();
  }

  return (
    <form onSubmit={onSubmit}>
      <label htmlFor="currentPassword">Current password</label>
      <input
        id="currentPassword"
        name="currentPassword"
        type="password"
        required
        autoComplete="current-password"
      />
      <label htmlFor="newPassword">New password</label>
      <input
        id="newPassword"
        name="newPassword"
        type="password"
        required
        minLength={10}
        maxLength={200}
        autoComplete="new-password"
      />
      <label htmlFor="confirm">Confirm password</label>
      <input
        id="confirm"
        name="confirm"
        type="password"
        required
        minLength={10}
        maxLength={200}
        autoComplete="new-password"
      />
      {error ? <p className="form-error">{error}</p> : null}
      <button type="submit" disabled={loading}>
        {loading ? "Saving…" : "Update password"}
      </button>
    </form>
  );
}
