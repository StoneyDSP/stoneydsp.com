import { NextResponse } from 'next/server'
import isbot from 'isbot'

import type { NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {

  // Extract visitor info. This can be moved below the login check to prevent
  // double-logging if preferred.
  const country = (req.geo && req.geo.country) || 'Earth'
  const city = (req.geo && req.geo.city) || 'Nowhere'
  const region = (req.geo && req.geo.region) || 'Somewhere'
  const ip = (req.ip) || 'Visitor'
  const agent = (req.headers.get('user-agent')) || 'Agent Unknown'

  if (isbot(req.headers.get('user-agent'))) {
    console.log(`Bot ${ip} crawling from ${city}, ${region}, ${country} with ${agent}`)
  } else {
    console.log(`User ${ip} visiting from ${city}, ${region}, ${country} with ${agent} `)
  }

  // if user is not signed in and the current path is not '/login',
  // redirect the user to '/login'
  // if (!user && req.nextUrl.pathname !== '/login') {
  //   return NextResponse.redirect(new URL('/login', req.url))
  // }

  const nonce = Buffer.from(crypto.randomUUID()).toString('base64')
//   const cspHeader = `
//     default-src 'self';
//     script-src 'self' 'nonce-${nonce}' 'strict-dynamic';
//     style-src 'self' 'nonce-${nonce}';
//     img-src 'self' blob: data:;
//     connect-src vitals.vercel-insights.com github-readme-stats-two-lime-18.vercel.app;
//     font-src 'self';
//     object-src 'none';
//     base-uri 'self';
//     form-action 'self';
//     frame-ancestors 'none';
//     block-all-mixed-content;
//     upgrade-insecure-requests;
// `

  const requestHeaders = new Headers(req.headers)
  requestHeaders.set('x-nonce', nonce)
  // requestHeaders.set(
  //   'Content-Security-Policy',
  //   // Replace newline characters and spaces
  //   cspHeader.replace(/\s{2,}/g, ' ').trim()
  // )
  requestHeaders.set('Access-Control-Allow-Origin', '*')
//   requestHeaders.set('Access-Control-Allow-Origin', 'vitals.vercel-insights.com')
  requestHeaders.set('Access-Control-Allow-Origin', 'github-readme-stats-two-lime-18.vercel.app')
  requestHeaders.set('Referrer-Policy', 'origin-when-cross-origin')

  requestHeaders.set('X-DNS-Prefetch-Control', 'on')
  requestHeaders.set('X-XSS-Protection', '1; mode=block')
  requestHeaders.set('X-Frame-Options', 'DENY')
  requestHeaders.set('X-Content-Type-Options', 'nosniff')

  requestHeaders.set('X-Robots-Tag', 'all')
  requestHeaders.set('Strict-Transport-Security', 'max-age=63072000; includeSubDomains; preload')
  requestHeaders.set('X-Frame-Options', 'DENY')

  const res = NextResponse.next({
    headers: requestHeaders,
    request: {
      headers: requestHeaders,
    },
  })

  return res
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    {
      source: '/((?!api|_next/static|_next/image|favicon.ico).*)',
      missing: [
        { type: 'header', key: 'next-router-prefetch' },
        { type: 'header', key: 'purpose', value: 'prefetch' },
      ],
    },
  ],
}
