import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.dirname(fileURLToPath(import.meta.url));

for (const file of ["package-lock.json", "yarn.lock"]) {
  try {
    fs.unlinkSync(path.join(root, file));
  } catch (err) {
    if (err?.code !== "ENOENT") throw err;
  }
}

const userAgent = process.env.npm_config_user_agent ?? "";
if (!userAgent.startsWith("pnpm/")) {
  console.error("Use pnpm instead");
  process.exit(1);
}
