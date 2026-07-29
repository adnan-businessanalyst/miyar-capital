"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { apiUrl } from "@/lib/api";

export function DisclosureDeleteButton({ id }: { id: string }) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);

  async function onDelete() {
    if (!confirm("Delete this disclosure and its PDFs?")) return;
    setBusy(true);
    try {
      const res = await fetch(apiUrl(`/api/admin/disclosures/${id}`), {
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

export function DisclosureEditLink({ id }: { id: string }) {
  return <Link href={`/my-access-nimda/disclosures/${id}`}>Edit</Link>;
}
