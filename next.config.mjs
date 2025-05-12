/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  output: 'standalone',
  // Allow mock API calls in development
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  experimental: {
    serverComponentsExternalPackages: ['@prisma/client', 'bcrypt'],
  },
  webpack: (config) => {
    config.externals = [...(config.externals || []), 'bcrypt'];
    return config;
  },
};

export default nextConfig;
