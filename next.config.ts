import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  trailingSlash: true,
  typescript: {
    ignoreBuildErrors: false,
  },
  env: {
    NEXT_PUBLIC_INSFORGE_BASE_URL: process.env.NEXT_PUBLIC_INSFORGE_BASE_URL,
    NEXT_PUBLIC_INSFORGE_ANON_KEY: process.env.NEXT_PUBLIC_INSFORGE_ANON_KEY,
  },
}

export default nextConfig
