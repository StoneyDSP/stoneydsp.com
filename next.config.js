// @ts-check

const withMDX = require('@next/mdx')()

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],
  experimental: {
    serverActions: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.vercel.app',
        // port: '',
        pathname: '/**',
      },
    ],
  },
  async redirects() {
    return [
      {
        source: '/index.html',
        destination: '/',
        basePath: false,
        permanent: true,
      },
      {
        source: '/:path*/index.html',
        destination: '/:path*',
        basePath: false,
        permanent: true,
      }
    ]
  },
}

module.exports = withMDX(nextConfig)
