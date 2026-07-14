/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    typedRoutes: true,
  },
  images: {
    domains: ['r2.cloudflarestorage.com'], // Add R2 domain for image optimization
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'r2.cloudflarestorage.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

module.exports = nextConfig;