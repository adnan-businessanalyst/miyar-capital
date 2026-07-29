"use client";

import { useRouter } from "next/navigation";
import { apiUrl } from "@/lib/api";

export function AdminLogoutButton() {
  const router = useRouter();
  return (
    <a
      href="#"
      onClick={async (e) => {
        e.preventDefault();
        await fetch(apiUrl("/api/admin/logout"), {
          method: "POST",
          credentials: "include",
        });
        router.push("/my-access-nimda");
        router.refresh();
      }}
    >
      Log out
    </a>
  );
}
