/**
 * @type {import('next').NextConfig}
 * Next.js configuration 
 * Requires Node.js 18+
 */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  
  // Image optimization config
  images: {
    domains: [],
    formats: ['image/avif', 'image/webp'],
  },
  
  // Environment variables that should be available to the browser
  // These complement the ones in .env.local
  env: {
    NEXT_PUBLIC_APP_VERSION: '1.0.0',
  },
  
  // Enable experimental features if needed
  experimental: {
    // Enable app directory features if you want to migrate later
    appDir: false,
  },
  
  // Custom headers for better security
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;