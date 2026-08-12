"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { apiUrl } from "@/lib/api";

export function MarkReadButton({ id }: { id: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  return (
    <button
      className="admin-btn"
      style={{ marginTop: 20 }}
      disabled={loading}
      onClick={async () => {
        setLoading(true);
        await fetch(apiUrl(`/api/admin/applications/${id}/read`), {
          method: "POST",
          credentials: "include",
        });
        router.refresh();
        setLoading(false);
      }}
    >
      {loading ? "Updating…" : "Mark as read"}
    </button>
  );
}
