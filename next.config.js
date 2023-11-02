// @ts-check

const withMDX = require('@next/mdx')()

/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: 'export',
  pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],
  experimental: {
    serverActions: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'github-readme-stats-two-lime-18.vercel.app',
        // port: '',
        pathname: '/**',
      },
    ],
  },
  // basePath: '',
  // async headers() {
  //   return [
  //     {
  //       source: '/:path*',
  //       headers: [
  //         {
  //           key: 'Strict-Transport-Security',
  //           value: 'max-age=31536000; includeSubDomains; preload',
  //         },
  //         {
  //           key: 'X-DNS-Prefetch-Control',
  //           value: 'on'
  //         },
  //         {
  //           key: 'X-Robots-Tag',
  //           value: 'all',
  //         },
  //         {
  //           key: 'X-Frame-Options',
  //           value: 'DENY',
  //         },
  //         {
  //           key: 'X-Content-Type-Options',
  //           value: 'nosniff'
  //         },
  //         {
  //           key: 'Referrer-Policy',
  //           value: 'origin-when-cross-origin'
  //         }
  //       ],
  //     },
  //   ]
  // },
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

// export default withMDX(nextConfig)
// next.config.js.
// export default () => {
// 	// const plugins = [withMDX, withBundleAnalyzer, withTM(['ui', 'common', 'shared-data'])]
// 	// return plugins.reduce((acc, next) => next(acc), nextConfig)
// 	return nextConfig
// }
module.exports = withMDX(nextConfig)
