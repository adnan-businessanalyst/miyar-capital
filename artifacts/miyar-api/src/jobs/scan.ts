/**
 * Upload scanning hook for job CVs (and future attachments).
 *
 * Env (to be configured later):
 * - FILE_SCAN_ENABLED=true — turn on remote scanning
 * - FILE_SCAN_URL — scanner HTTP endpoint (POST multipart or raw body)
 * - FILE_SCAN_API_KEY — optional bearer/API key
 * - FILE_SCAN_PROVIDER — label stored on the row (e.g. clamav, cloudmersive)
 *
 * When scanning is disabled, returns `skipped` so uploads still proceed after
 * local validation. When enabled, infected files must be rejected by the caller.
 */

export type ScanStatus =
  | "pending"
  | "clean"
  | "infected"
  | "skipped"
  | "error";

export type ScanResult = {
  status: ScanStatus;
  detail?: string;
  provider?: string;
};

export type ScanUploadInput = {
  buffer: Buffer;
  fileName: string;
  mimeType: string;
};

function scanEnabled(): boolean {
  const v = (process.env.FILE_SCAN_ENABLED || "").trim().toLowerCase();
  return v === "1" || v === "true" || v === "yes";
}

/**
 * Scan a validated upload. Safe to call before persisting; reject on `infected`.
 * Designed so a real scanner can be plugged in without changing callers.
 */
export async function scanUpload(
  input: ScanUploadInput,
): Promise<ScanResult> {
  const provider =
    (process.env.FILE_SCAN_PROVIDER || "").trim() || "pending-config";

  if (!scanEnabled()) {
    return {
      status: "skipped",
      detail: "File scanning not enabled (FILE_SCAN_ENABLED).",
      provider: undefined,
    };
  }

  const url = (process.env.FILE_SCAN_URL || "").trim();
  if (!url) {
    // Enabled but not wired — mark pending; caller may still accept after local checks.
    return {
      status: "pending",
      detail: "FILE_SCAN_URL not configured; marked pending for later scan.",
      provider,
    };
  }

  try {
    const form = new FormData();
    const bytes = new Uint8Array(input.buffer);
    form.set(
      "file",
      new Blob([bytes], { type: input.mimeType }),
      input.fileName,
    );

    const headers: Record<string, string> = {};
    const apiKey = (process.env.FILE_SCAN_API_KEY || "").trim();
    if (apiKey) headers.Authorization = `Bearer ${apiKey}`;

    const res = await fetch(url, {
      method: "POST",
      headers,
      body: form,
    });

    if (!res.ok) {
      return {
        status: "error",
        detail: `Scanner HTTP ${res.status}`,
        provider,
      };
    }

    const data = (await res.json().catch(() => null)) as {
      status?: string;
      result?: string;
      clean?: boolean;
      infected?: boolean;
      detail?: string;
      message?: string;
    } | null;

    if (!data) {
      return {
        status: "error",
        detail: "Scanner returned invalid JSON",
        provider,
      };
    }

    if (data.infected === true || data.status === "infected" || data.result === "infected") {
      return {
        status: "infected",
        detail: data.detail || data.message || "Threat detected",
        provider,
      };
    }

    if (
      data.clean === true ||
      data.status === "clean" ||
      data.result === "clean"
    ) {
      return {
        status: "clean",
        detail: data.detail || data.message,
        provider,
      };
    }

    return {
      status: "pending",
      detail: data.detail || data.message || "Awaiting scanner result",
      provider,
    };
  } catch (err) {
    return {
      status: "error",
      detail: err instanceof Error ? err.message : "Scanner request failed",
      provider,
    };
  }
}
