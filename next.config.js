// @ts-check

const withMDX = require('@next/mdx')()

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],
  experimental: {
    webpackBuildWorker: true,
  },
  crossOrigin: "use-credentials",
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'gh-readme-stats.stoneydsp.com',
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
  async rewrites() {
    return [
      {
        source: '/projects/cmodule',
        destination: 'https://cmodule.stoneydsp.com',
        basePath: false,
      },
    ]
  },
}

module.exports = withMDX(nextConfig)
