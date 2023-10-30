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
