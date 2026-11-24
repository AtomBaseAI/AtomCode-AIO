import type { NextConfig } from "next";

/**
 * Server Actions origin allow-list.
 *
 * - Development keeps the sandbox/preview wildcard list EXACTLY as before —
 *   the live preview gateway (space-z.ai / fcapp.run hosts) depends on it.
 * - Production is strict: ONLY hosts from ALLOWED_ORIGINS (comma-separated
 *   exact hostnames, no wildcards). Empty/unset → Next's same-origin default
 *   (empty array), so a forgotten env var cannot widen the attack surface.
 */
const devAllowedOrigins = [
  "*.space-z.ai",
  "localhost:3000",
  "127.0.0.1:3000",
  "*.vercel.app",
  "*.atomcode.dev",
  "*.atomapps.space",
];

const prodAllowedOrigins = (process.env.ALLOWED_ORIGINS ?? "")
  .split(",")
  .map((origin) => origin.trim())
  .filter((origin) => {
    if (origin === "") return false;
    // Exact hostnames only — reject anything with a wildcard or protocol.
    return !origin.includes("*") && !origin.includes("://");
  });

const serverActionsAllowedOrigins =
  process.env.NODE_ENV === "production" ? prodAllowedOrigins : devAllowedOrigins;

/**
 * Pragmatic CSP: Next dev/turbopack and CodeMirror need 'unsafe-eval'/'unsafe-inline';
 * img-src allows arbitrary https because custom course branding embeds logos
 * from arbitrary CDN hosts (same trade-off as images.remotePatterns below);
 * frame-src https: is needed because module concept URLs embed external
 * https iframes; frame-ancestors 'none' pairs with X-Frame-Options: DENY.
 */
const contentSecurityPolicy = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' https: data: blob:",
  "font-src 'self' data:",
  "connect-src 'self' https:",
  "frame-src https:",
  "worker-src 'self' blob:",
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "object-src 'none'",
].join("; ");

const securityHeaders = [
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(self), microphone=(), geolocation=(self), payment=(), usb=()",
  },
  { key: "Content-Security-Policy", value: contentSecurityPolicy },
];

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
    // Type errors must never be silently swallowed in production builds.
    ignoreBuildErrors: process.env.NODE_ENV !== "production",
  },
  reactStrictMode: false,
  poweredByHeader: false,
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
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
      allowedOrigins: serverActionsAllowedOrigins,
    },
    // Client router cache: keep back/forward navigations client-side for 30s
    // instead of re-requesting server components on every navigation.
    staleTimes: {
      dynamic: 30,
    },
    optimizePackageImports: ["lucide-react", "framer-motion", "recharts"],
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ik.imagekit.io",
        pathname: "**",
      },
      {
        // TRADE-OFF (audit): wildcard hostname means next/image will proxy
        // images from ANY https host. Custom course branding needs arbitrary
        // CDN hosts, so we keep it — but that widens the SSRF/image-flood
        // surface. Tighten to an allow-list if branding moves to fixed hosts.
        protocol: "https",
        hostname: "**",
      },
    ],
  },
};

export default nextConfig;
