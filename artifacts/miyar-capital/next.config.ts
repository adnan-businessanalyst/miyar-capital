import os from "node:os";
import path from "node:path";
import type { NextConfig } from "next";
import { resolveApiInternalUrl } from "./src/lib/appEnv";

const apiInternal = resolveApiInternalUrl();

/**
 * Local Windows only: keep the Next cache off OneDrive (EBUSY/EINVAL).
 * CI/Vercel must use `.next` so generated types resolve during `next build`.
 */
const useOffOneDriveCache =
  process.platform === "win32" &&
  process.env.CI !== "1" &&
  process.env.VERCEL !== "1";

const distDir = useOffOneDriveCache
  ? path
      .relative(process.cwd(), path.join(os.tmpdir(), "miyar-capital-next"))
      .replaceAll("\\", "/")
  : ".next";

const nextConfig: NextConfig = {
  distDir,
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    remotePatterns: [],
    unoptimized: false,
  },
  async redirects() {
    return [
      {
        source: "/asset-management/liquidity-fi",
        destination: "/asset-management/liquidity-fixed-income/murabaha-fund",
        permanent: true,
      },
      {
        source: "/asset-management/murabaha",
        destination: "/asset-management/liquidity-fixed-income/murabaha-fund",
        permanent: true,
      },
      {
        source: "/asset-management/liquidity-and-fixed-income-solutions",
        destination: "/asset-management/liquidity-fixed-income",
        permanent: true,
      },
      {
        source:
          "/asset-management/liquidity-and-fixed-income-solutions/murabaha",
        destination: "/asset-management/liquidity-fixed-income/murabaha-fund",
        permanent: true,
      },
    ];
  },
  async rewrites() {
    // Same-origin /api → standalone miyar-api (admin cookies stay Lax-compatible).
    const base = apiInternal.replace(/\/$/, "");
    return [
      {
        source: "/api/:path*",
        destination: `${base}/api/:path*`,
      },
      {
        source: "/asset-management/Discretionary-portfolio-management",
        destination:
          "/asset-management/discretionary-portfolio-management",
      },
    ];
  },
  async headers() {
    return [
      {
        source: "/docs/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Cache-Control", value: "public, max-age=3600" },
        ],
      },
    ];
  },
};

export default nextConfig;
