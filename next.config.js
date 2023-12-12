// @ts-check

const withMDX = require('@next/mdx')()

const getSiteURL = () => {
  let url
  switch (process?.env?.VERCEL_ENV) {
    case 'production': {
      url = process?.env?.NEXT_PUBLIC_SITE_URL
    }
    case 'preview': {
      url = process?.env?.VERCEL_URL
    }
    case 'development': {
      url = 'localhost'
    }
    default: {
      url = process?.env?.VERCEL_URL
    }
  }
  return url
}

const siteUrl = getSiteURL()

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],
  experimental: {
    webpackBuildWorker: true,
  },
  // crossOrigin: "use-credentials",
  // trailingSlash: false,
  // basePath: '/www',
async rewrites() {
  return {
    beforeFiles: [
      {
        source: '/about',
        destination: '/www/about',
        has: [{ type: 'host', value: `${siteUrl}` }],
      },
      {
        source: '/contact',
        destination: '/www/contact',
        has: [{ type: 'host', value: `${siteUrl}` }],
      },
      {
        source: '/projects',
        destination: '/www/projects',
        has: [{ type: 'host', value: `${siteUrl}` }],
      },
      {
        source: '/projects/biquads',
        destination: '/www/projects/biquads',
        has: [{ type: 'host', value: `${siteUrl}` }],
      },
      {
        source: '/projects/ubento',
        destination: '/www/projects/ubento',
        has: [{ type: 'host', value: `${siteUrl}` }],
      },
      {
        source: '/projects/cxxwin',
        destination: '/www/projects/cxxwin',
        has: [{ type: 'host', value: `${siteUrl}` }],
      },
      {
        source: '/projects/msys2-toolchain',
        destination: '/www/projects/msys2-toolchain',
        has: [{ type: 'host', value: `${siteUrl}` }],
      },
      {
        source: '/projects/orfanidisbiquad',
        destination: '/www/projects/orfanidisbiquad',
        has: [{ type: 'host', value: `${siteUrl}` }],
      },
      {
        source: '/projects/audioplugin-svf',
        destination: '/www/projects/audioplugin-svf',
        has: [{ type: 'host', value: `${siteUrl}` }],
      },
      {
        source: '/projects/cmodule',
        destination: '/www/projects/cmodule',
        has: [{ type: 'host', value: `${siteUrl}` }],
      },
      {
        source: '/projects/nonlinearfilters',
        destination: '/www/projects/nonlinearfilters',
        has: [{ type: 'host', value: `${siteUrl}` }],
      },
      {
        source: '/projects/bilineareq',
        destination: '/www/projects/bilineareq',
        has: [{ type: 'host', value: `${siteUrl}` }],
      },
      {
        source: '/terms-of-service',
        destination: '/www/terms-of-service',
        has: [{ type: 'host', value: `${siteUrl}` }],
      },
      {
        source: '/privacy-policy',
        destination: '/www/privacy-policy',
        has: [{ type: 'host', value: `${siteUrl}` }],
      },
    ],
    afterFiles: [],
    fallback: [
      {
        source: '/www',
        destination: '/',
        has: [{ type: 'host', value: `${siteUrl}` }],
      },
      {
        source: '/www/:path(\\d+)',
        destination: '/:path(\\d+)',
        has: [{ type: 'host', value: `${siteUrl}` }],
      },
    ]
  }
},
  // redirects: async () => {
  //   return [
  //     {
  //       source: '/index.html',
  //       destination: '/',
  //       basePath: false,
  //       permanent: true,
  //     },
  //     {
  //       source: '/:path(\\d+)/index.html',
  //       destination: '/:path(\\d+)',
  //       basePath: false,
  //       permanent: true,
  //     },
  //     {
  //       source: '/www/:path*',
  //       has: [{ type: 'host', value: `${siteUrl}` }],
  //       destination: `https://www.${siteUrl}/:path*`,
  //       permanent: true
  //     }
  //   ]
  // },
  // headers: async () => {
  //   return [
      // {
      //   source: "/:path*",
      //   has: [
      //     { type: "query", key: "authorized" }
      //   ],
      //   headers: [
      //     { key: "x-authorized", value: "true" }
      //   ]
      // },
      // {
      //   // matching all API routes
      //   source: "/api/:path*",
      //   headers: [
      //     { key: "Access-Control-Allow-Credentials", value: "true" },
      //     { key: "Access-Control-Allow-Origin", value: "*" },
      //     { key: "Access-Control-Allow-Methods", value: "GET,OPTIONS,PATCH,DELETE,POST,PUT" },
      //     { key: "Access-Control-Allow-Headers", value: "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version" },
      //   ]
      // },
      // {
      //   source: "/:path*",
      //   headers: [
      //     { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
      //     { key: "X-Content-Type-Options", value: "nosniff" },
      //     { key: "X-Frame-Options", value: "DENY" },
      //     { key: "X-XSS-Protection", value: "1; mode=block" }
      //   ]
      // },
  //   ]
  // },
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
}

module.exports = withMDX(nextConfig)
