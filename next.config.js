// @ts-check

const withMDX = require('@next/mdx')()

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
        has: [{ type: 'host', value: `${process?.env?.NEXT_PUBLIC_ROOT_DOMAIN}` }],
      },
      {
        source: '/contact',
        destination: '/www/contact',
        has: [{ type: 'host', value: `${process?.env?.NEXT_PUBLIC_ROOT_DOMAIN}` }],
      },
      {
        source: '/projects',
        destination: '/www/projects',
        has: [{ type: 'host', value: `${process?.env?.NEXT_PUBLIC_ROOT_DOMAIN}` }],
      },
      {
        source: '/projects/biquads',
        destination: '/www/projects/biquads',
        has: [{ type: 'host', value: `${process?.env?.NEXT_PUBLIC_ROOT_DOMAIN}` }],
      },
      {
        source: '/projects/ubento',
        destination: '/www/projects/ubento',
        has: [{ type: 'host', value: `${process?.env?.NEXT_PUBLIC_ROOT_DOMAIN}` }],
      },
      {
        source: '/projects/cxxwin',
        destination: '/www/projects/cxxwin',
        has: [{ type: 'host', value: `${process?.env?.NEXT_PUBLIC_ROOT_DOMAIN}` }],
      },
      {
        source: '/projects/msys2-toolchain',
        destination: '/www/projects/msys2-toolchain',
        has: [{ type: 'host', value: `${process?.env?.NEXT_PUBLIC_ROOT_DOMAIN}` }],
      },
      {
        source: '/projects/orfanidisbiquad',
        destination: '/www/projects/orfanidisbiquad',
        has: [{ type: 'host', value: `${process?.env?.NEXT_PUBLIC_ROOT_DOMAIN}` }],
      },
      {
        source: '/projects/audioplugin-svf',
        destination: '/www/projects/audioplugin-svf',
        has: [{ type: 'host', value: `${process?.env?.NEXT_PUBLIC_ROOT_DOMAIN}` }],
      },
      {
        source: '/projects/cmodule',
        destination: '/www/projects/cmodule',
        has: [{ type: 'host', value: `${process?.env?.NEXT_PUBLIC_ROOT_DOMAIN}` }],
      },
      {
        source: '/projects/nonlinearfilters',
        destination: '/www/projects/nonlinearfilters',
        has: [{ type: 'host', value: `${process?.env?.NEXT_PUBLIC_ROOT_DOMAIN}` }],
      },
      {
        source: '/projects/bilineareq',
        destination: '/www/projects/bilineareq',
        has: [{ type: 'host', value: `${process?.env?.NEXT_PUBLIC_ROOT_DOMAIN}` }],
      },
      {
        source: '/terms-of-service',
        destination: '/www/terms-of-service',
        has: [{ type: 'host', value: `${process?.env?.NEXT_PUBLIC_ROOT_DOMAIN}` }],
      },
      {
        source: '/privacy-policy',
        destination: '/www/privacy-policy',
        has: [{ type: 'host', value: `${process?.env?.NEXT_PUBLIC_ROOT_DOMAIN}` }],
      },
    ],
    afterFiles: [],
    fallback: [
      {
        source: '/www',
        destination: '/',
        has: [{ type: 'host', value: `${process?.env?.NEXT_PUBLIC_ROOT_DOMAIN}` }],
      },
      {
        source: '/www/:path(\\d+)',
        destination: '/:path(\\d+)',
        has: [{ type: 'host', value: `${process?.env?.NEXT_PUBLIC_ROOT_DOMAIN}` }],
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
  //       has: [{ type: 'host', value: `${process?.env?.NEXT_PUBLIC_ROOT_DOMAIN}` }],
  //       destination: `https://www.${process?.env?.NEXT_PUBLIC_ROOT_DOMAIN}/:path*`,
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
  // rewrites: async () => {
  //   return {
  //     beforeFiles: [
  //       // These rewrites are checked after headers/redirects
  //       // and before all files including _next/public files which
  //       // allows overriding page files
  //       {
  //         source: '/some-page',
  //         destination: '/somewhere-else',
  //         has: [{ type: 'query', key: 'overrideMe' }],
  //       },
  //     ],
  //     afterFiles: [
  //       // These rewrites are checked after pages/public files
  //       // are checked but before dynamic routes
  //       // {
  //       //   source: '/non-existent',
  //       //   destination: '/somewhere-else',
  //       // },
  //       {
  //         source: '/about',
  //         destination: '/aboot',
  //       },
  //     ],
  //     fallback: [
  //       // These rewrites are checked after both pages/public files
  //       // and dynamic routes are checked
  //       // {
  //       //   source: '/:path*',
  //       //   destination: `https://my-old-site.com/:path*`,
  //       // },

  //       {
  //         source: '/www/:path*',
  //         destination:
  //           process.env.NODE_ENV === 'production'
  //             ? 'https://www.stoneydsp.com/:path*'
  //             : 'http://www.locahost:3000/:path*',
  //       },
  //       {
  //         source: '/www',
  //         destination:
  //           process.env.NODE_ENV === 'production'
  //             ? 'https://www.stoneydsp.com'
  //             : 'http://www.locahost:3000',
  //       },

  //     ],
  //   }
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
