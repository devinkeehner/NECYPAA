/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  // Add redirects for /bid to point to the homepage
  async redirects() {
    return [
      {
        source: '/bid',
        destination: '/',
        permanent: true,
      },
    ]
  },
}

export default nextConfig
