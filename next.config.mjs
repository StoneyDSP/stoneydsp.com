// @ts-check

/** @type {import('next').NextConfig} */
const nextConfig = {
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
  // basePath: '',
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Strict-Transport-Security',
            value: '',
          },
          {
            key: 'X-Robots-Tag',
            value: 'all',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
        ],
      },
      {
        source: "github-readme-stats-two-lime-18.vercel.app/(.*)",
        headers: [
          {
            key: "Vercel-CDN-Cache-Control",
            value: "max-age=3600"
          },
          {
            key: "CDN-Cache-Control",
            value: "max-age=60"
          },
          {
            key: "Cache-Control",
            value: "public, max-age=10, s-maxage=86400, immutable"
          },
          {
            key: "X-XSS-Protection",
            value: "1; mode=block"
          }
        ]
      }
    ]
  },
  // async redirects() {
  //   return [
  //     {
  //       source: '/index.html',
  //       destination: '/',
  //       basePath: false,
  //       permanent: true,
  //     },
  //   ]
  // },
}

export default nextConfig
// next.config.js.
// export default () => {
// 	// const plugins = [withMDX, withBundleAnalyzer, withTM(['ui', 'common', 'shared-data'])]
// 	// return plugins.reduce((acc, next) => next(acc), nextConfig)
// 	return nextConfig
// }
