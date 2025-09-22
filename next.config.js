/** @type {import('next').NextConfig} */
const nextConfig = {
  productionBrowserSourceMaps: false, // enable browser source map generation during the production build
  // Configure pageExtensions to include md and mdx
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
  experimental: {
    // appDir: true,
  },
  // fix all before production. Now it slow the develop speed.
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  typescript: {
    // https://nextjs.org/docs/api-reference/next.config.js/ignoring-typescript-errors
    ignoreBuildErrors: true,
  },
  output: 'standalone',
  async headers() {
    const csp = [
      "default-src 'self'",
      // Allow scripts (dev uses eval; Monaco/Workers may need blob)
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' blob: https:",
      // Inline styles are used by Next/Tailwind during SSR hydration
      "style-src 'self' 'unsafe-inline' https:",
      // Images from self, https, data URLs, and blobs
      "img-src 'self' data: blob: https:",
      // Fonts
      "font-src 'self' data: https:",
      // XHR/SSE/WebSocket endpoints
      "connect-src 'self' https: wss:",
      // Frames if needed (e.g., OAuth providers); restrict to https by default
      "frame-src 'self' https:",
      // Web workers / Monaco uses blob workers
      "worker-src 'self' blob:",
      // Disallow plugins
      "object-src 'none'",
      // Mitigations
      "base-uri 'self'",
      "form-action 'self'",
      // Auto-upgrade http assets on https sites
      'upgrade-insecure-requests',
    ].join('; ')

    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: csp,
          },
        ],
      },
    ]
  },
}

module.exports = nextConfig
