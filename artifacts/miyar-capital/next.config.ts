import os from "node:os";
import path from "node:path";
import type { NextConfig } from "next";

const apiInternal =
  process.env.API_INTERNAL_URL ||
  process.env.NEXT_PUBLIC_API_URL ||
  "http://127.0.0.1:4000";

/** Keep the Next cache off OneDrive — otherwise Windows hits EBUSY/EINVAL and the app dies. */
const distDir = path
  .relative(process.cwd(), path.join(os.tmpdir(), "miyar-capital-next"))
  .replaceAll("\\", "/");

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
