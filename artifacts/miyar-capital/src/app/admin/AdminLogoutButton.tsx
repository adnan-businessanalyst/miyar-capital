"use client";

import { useRouter } from "next/navigation";

export function AdminLogoutButton() {
  const router = useRouter();
  return (
    <a
      href="#"
      onClick={async (e) => {
        e.preventDefault();
        await fetch("/api/admin/logout", { method: "POST" });
        router.push("/admin");
        router.refresh();
      }}
    >
      Log out
    </a>
  );
}
