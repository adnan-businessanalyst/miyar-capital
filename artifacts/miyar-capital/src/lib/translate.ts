import { apiUrl } from "@/lib/api";

/** Translate one or more English strings to Arabic via the admin API. */
export async function translateToArabic(
  texts: Record<string, string>,
): Promise<Record<string, string>> {
  const res = await fetch(apiUrl("/api/admin/translate"), {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ texts }),
  });
  const json = (await res.json().catch(() => ({}))) as {
    texts?: Record<string, string>;
    error?: string;
  };
  if (!res.ok) {
    throw new Error(json.error || "Translation failed");
  }
  return json.texts ?? {};
}
