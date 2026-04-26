// next.config.mjs
//
// Security headers, image optimization, and 308 redirects from secondary
// domains to the canonical apex.
//
// Authority: NYT pack Sections 10.8, 16.5, 16.6.

/**
 * Content Security Policy.
 * Allows only:
 *   - self
 *   - Plausible (script + connect)
 *   - Resend (form submission via server actions runs server-side, so no
 *     browser-side connect is needed)
 *   - Inline styles (Tailwind ships some; restrict to 'self' otherwise)
 *
 * No 'unsafe-eval'. No third-party fonts (we self-host).
 */
const cspDirectives = {
  "default-src": ["'self'"],
  "script-src": [
    "'self'",
    // Next.js requires inline scripts for hydration in production.
    // Restrict to self otherwise.
    "'unsafe-inline'",
    "https://plausible.io",
  ],
  "style-src": ["'self'", "'unsafe-inline'"],
  "img-src": ["'self'", "data:", "blob:"],
  "font-src": ["'self'", "data:"],
  "connect-src": ["'self'", "https://plausible.io"],
  "frame-ancestors": ["'none'"],
  "base-uri": ["'self'"],
  "form-action": ["'self'"],
  "object-src": ["'none'"],
  "upgrade-insecure-requests": [],
};

const csp = Object.entries(cspDirectives)
  .map(([key, values]) => (values.length > 0 ? `${key} ${values.join(" ")}` : key))
  .join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: csp },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
  // HSTS — enable after 30-day burn-in (NYT pack 10.8).
  // Uncomment after launch + 30 days clean.
  // { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
];

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,

  images: {
    formats: ["image/avif", "image/webp"],
    // No remote patterns. All images live in /public.
    remotePatterns: [],
    deviceSizes: [375, 640, 660, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },

  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
      {
        // Aggressive caching for hashed Next.js assets.
        source: "/_next/static/:path*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
      {
        // Cache images for a year; they are content-hashed by Next/Image.
        source: "/images/:path*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
      {
        // PDFs (Code of Conduct) — moderate cache, allow revalidation.
        source: "/downloads/:path*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=86400, must-revalidate" },
        ],
      },
    ];
  },

  async redirects() {
    return [
      // Canonicalize www → apex.
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.newyorktitans.org" }],
        destination: "https://newyorktitans.org/:path*",
        permanent: true,
      },
      // Canonicalize secondary domain → apex.
      {
        source: "/:path*",
        has: [{ type: "host", value: "nytitans.org" }],
        destination: "https://newyorktitans.org/:path*",
        permanent: true,
      },
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.nytitans.org" }],
        destination: "https://newyorktitans.org/:path*",
        permanent: true,
      },
    ];
  },

  // Strict experimental features only.
  experimental: {
    typedRoutes: true,
  },
};

export default nextConfig;
