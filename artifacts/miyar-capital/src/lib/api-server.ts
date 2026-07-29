import { cookies } from "next/headers";

/** Server-side base URL for miyar-api (never expose secrets; cookie forwarded). */
export function apiInternalBase(): string {
  return (
    process.env.API_INTERNAL_URL ||
    process.env.NEXT_PUBLIC_API_URL ||
    "http://127.0.0.1:4000"
  ).replace(/\/$/, "");
}

export async function apiServerFetch(path: string, init?: RequestInit): Promise<Response> {
  const jar = await cookies();
  const session = jar.get("miyar_admin_session");
  const headers = new Headers(init?.headers);
  if (session?.value) {
    headers.set("Cookie", `miyar_admin_session=${session.value}`);
  }
  const p = path.startsWith("/") ? path : `/${path}`;
  return fetch(`${apiInternalBase()}${p}`, {
    ...init,
    headers,
    cache: "no-store",
  });
}

export async function isAdminAuthenticatedViaApi(): Promise<boolean> {
  try {
    const res = await apiServerFetch("/api/admin/me");
    return res.ok;
  } catch {
    return false;
  }
}
