"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { apiUrl } from "@/lib/api";

export function FundEditLink({ id }: { id: string }) {
  return <Link href={`/my-access-nimda/funds-reports/${id}`}>Edit</Link>;
}

export function FundVisibilityButton({
  id,
  isPublished,
}: {
  id: string;
  isPublished: boolean;
}) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);

  async function toggle() {
    setBusy(true);
    try {
      const res = await fetch(apiUrl(`/api/admin/funds/${id}/visibility`), {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isPublished: !isPublished }),
      });
      if (!res.ok) {
        const json = (await res.json().catch(() => ({}))) as { error?: string };
        alert(json.error || "Visibility update failed");
        return;
      }
      router.refresh();
    } finally {
      setBusy(false);
    }
  }

  return (
    <button
      type="button"
      className="admin-btn admin-btn--ghost"
      onClick={toggle}
      disabled={busy}
    >
      {busy ? "…" : isPublished ? "Hide" : "Show"}
    </button>
  );
}

export function FundDeleteButton({ id }: { id: string }) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);

  async function onDelete() {
    if (!confirm("Delete this fund and all its report cards permanently?")) {
      return;
    }
    setBusy(true);
    try {
      const res = await fetch(apiUrl(`/api/admin/funds/${id}`), {
        method: "DELETE",
        credentials: "include",
      });
      if (!res.ok) {
        const json = (await res.json().catch(() => ({}))) as { error?: string };
        alert(json.error || "Delete failed");
        return;
      }
      router.refresh();
    } finally {
      setBusy(false);
    }
  }

  return (
    <button
      type="button"
      className="admin-btn admin-btn--danger"
      onClick={onDelete}
      disabled={busy}
    >
      {busy ? "…" : "Delete"}
    </button>
  );
}

export function FundReportDeleteButton({ id }: { id: string }) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);

  async function onDelete() {
    if (!confirm("Delete this report card permanently?")) return;
    setBusy(true);
    try {
      const res = await fetch(apiUrl(`/api/admin/fund-reports/${id}`), {
        method: "DELETE",
        credentials: "include",
      });
      if (!res.ok) {
        const json = (await res.json().catch(() => ({}))) as { error?: string };
        alert(json.error || "Delete failed");
        return;
      }
      router.refresh();
    } finally {
      setBusy(false);
    }
  }

  return (
    <button
      type="button"
      className="admin-btn admin-btn--danger"
      onClick={onDelete}
      disabled={busy}
    >
      {busy ? "…" : "Delete"}
    </button>
  );
}
