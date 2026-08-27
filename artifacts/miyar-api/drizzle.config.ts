import { defineConfig } from "drizzle-kit";
import { peekDatabaseUrl } from "./src/db/env.ts";

export default defineConfig({
  schema: "./src/db/schema.ts",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url: peekDatabaseUrl() ?? "",
  },
});
