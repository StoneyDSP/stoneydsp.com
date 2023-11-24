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
      { hostname: "public.blob.vercel-storage.com" },
      { hostname: "res.cloudinary.com" },
      { hostname: "abs.twimg.com" },
      { hostname: "pbs.twimg.com" },
      { hostname: "avatar.vercel.sh" },
      { hostname: "avatars.githubusercontent.com" },
      { hostname: "www.google.com" },
      { hostname: "flag.vercel.app" },
      { hostname: "illustrations.popsy.co" },
      {
        protocol: 'https',
        hostname: '*.stoneydsp.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '*-stoneydsp.vercel.app',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'raw.githubusercontent.com',
        port: '',
        pathname: '/StoneyDSP/**'
      },
      {
        protocol: 'https',
        hostname: 'raw.githubusercontent.com',
        port: '',
        pathname: '/nathanjhood/**'
      }
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
  async headers() {
    return [
      {
        // matching all API routes
        source: "/api/:path*",
        headers: [
          { key: "Access-Control-Allow-Credentials", value: "true" },
          { key: "Access-Control-Allow-Origin", value: "*" },
          { key: "Access-Control-Allow-Methods", value: "GET,OPTIONS,PATCH,DELETE,POST,PUT" },
          { key: "Access-Control-Allow-Headers", value: "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version" },
        ]
      },
      // {
      //   source: "/:path*",
      //   headers: [
      //     { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
      //     { key: "X-Content-Type-Options", value: "nosniff" },
      //     { key: "X-Frame-Options", value: "DENY" },
      //     { key: "X-XSS-Protection", value: "1; mode=block" }
      //   ]
      // },
      {
        source: "/:path*",
        has: [
          { type: "query", key: "authorized" }
        ],
        headers: [
          { key: "x-authorized", value: "true" }
        ]
      }
    ]
  },
  // async rewrites() {
  //   return [
  //     {
  //       "source": "/projects/:id(\\d+)",
  //       "destination": "http://:id.localhost:3000/"
  //     }
  //   ]
  // }
}

module.exports = withMDX(nextConfig)
