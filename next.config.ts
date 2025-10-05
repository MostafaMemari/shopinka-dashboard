import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    domains: ['s3.shopinka.ir']
  },
  experimental: {
    serverActions: {
      bodySizeLimit: '5mb'
    }
  },
  basePath: process.env.BASEPATH,
  redirects: async () => {
    return [
      {
        source: '/',
        destination: '/home',
        permanent: true,
        locale: false
      }
    ]
  }
}

export default nextConfig
