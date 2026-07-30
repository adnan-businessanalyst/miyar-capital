"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { apiUrl } from "@/lib/api";

export function NewsEditLink({ id }: { id: string }) {
  return <Link href={`/my-access-nimda/news/${id}`}>Edit</Link>;
}

export function NewsVisibilityButton({
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
      const res = await fetch(apiUrl(`/api/admin/news/${id}/visibility`), {
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

export function NewsDeleteButton({ id }: { id: string }) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);

  async function onDelete() {
    if (!confirm("Delete this news article permanently?")) return;
    setBusy(true);
    try {
      const res = await fetch(apiUrl(`/api/admin/news/${id}`), {
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
