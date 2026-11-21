import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Standalone output is opt-in for self-hosting (Docker / bare node server):
  //   bun run build:standalone && node .next/standalone/server.js
  // Vercel does not use `output: "standalone"` — it deploys via its own Build
  // Output API, so plain `next build` / `next start` is the default here.
  output: process.env.BUILD_STANDALONE === "true" ? "standalone" : undefined,
  async rewrites() {
    return {
      beforeFiles: [],
      afterFiles: [],
      // Super-admin URL separation: every /superadmin/* path WITHOUT a real
      // page of its own renders the corresponding /admin/* page in place —
      // the browser URL stays in superadmin space. Native superadmin pages
      // (dashboard, admins, revenue, settings) are real files and always win
      // over this fallback, so they keep their dedicated implementations.
      // Paired with the proxy (src/proxy.ts): superadmin sessions hitting
      // /admin/* are redirected to the mirrored /superadmin/* URL, so the
      // super admin browses exclusively under /superadmin/* while the admin
      // panel keeps /admin/* for admins only — zero page duplication.
      fallback: [{ source: "/superadmin/:path*", destination: "/admin/:path*" }],
    };
  },
  // Allow the sandbox preview gateway hosts to fetch dev assets (HMR,
  // static chunks) — Next 16 blocks unknown cross-origin dev requests.
  allowedDevOrigins: ["*.space-z.ai", "*.cn-hongkong-vpc.fcapp.run"],
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,
  // Dev-only overlay: keep the indicator out of the sidebar's bottom-left
  // corner, where it covered the settings gear icon.
  devIndicators: {
    position: "bottom-right",
  },
  // Sandbox preview gateway rewrites `x-forwarded-host` (outer fcapp.run host)
  // while the browser `origin` stays the preview-chat domain. Next.js Server
  // Actions reject that mismatch unless the origin is explicitly allowed.
  experimental: {
    serverActions: {
      allowedOrigins: [
        "*.space-z.ai",
        "preview-chat-1945cbd9-55db-4b00-b567-bac737eb3797.space-z.ai",
        "localhost:3000",
        "127.0.0.1:3000",
        "ws-fa-ebff-ceda-mdomjldeyy.cn-hongkong-vpc.fcapp.run",
        "*.cn-hongkong-vpc.fcapp.run",
        "*.vercel.app",
        "*.atomcode.dev",
        "*.atomapps.space",
      ],
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ik.imagekit.io",
        pathname: "**",
      },
      {
        // Wildcard: original student app allowed any https CDN (branding logos
        // may point at arbitrary hosts). Prevents next/image crashes.
        protocol: "https",
        hostname: "**",
      },
    ],
  },
};

export default nextConfig;
