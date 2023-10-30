// import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'

import isbot from 'isbot'

import type { NextRequest } from 'next/server'
import type { Database } from './types_db'

export async function middleware(req: NextRequest) {

  // const res = NextResponse.next()

  // // Create a Supabase client configured to use cookies
  // const supabase = createMiddlewareClient<Database>({ req, res })

  // // Refresh session if expired - required for Server Components
  // // https://supabase.com/docs/guides/auth/auth-helpers/nextjs#managing-session-with-middleware
  // await supabase.auth.getSession()

  // // Extract user info
  // const {
  //   data: { user },
  // } = await supabase.auth.getUser()

  // Extract visitor info. This can be moved below the login check to prevent
  // double-logging if preferred.
  const country = (req.geo && req.geo.country) || 'Earth'
  const city = (req.geo && req.geo.city) || 'Nowhere'
  const region = (req.geo && req.geo.region) || 'Somewhere'
  const ip = (req.ip) || 'Visitor'
  const agent = (req.headers.get('user-agent')) || 'Agent Unknown'

  if (isbot(req.headers.get('user-agent'))) {
    console.log(`Bot ${ip} ${agent} crawling from ${city}, ${region}, ${country}`)
  } else {
    console.log(`User ${ip} ${agent} visiting from ${city}, ${region}, ${country}`)
  }

  // if user is not signed in and the current path is not '/login',
  // redirect the user to '/login'
  // if (!user && req.nextUrl.pathname !== '/login') {
  //   return NextResponse.redirect(new URL('/login', req.url))
  // }

  // return res

  const nonce = Buffer.from(crypto.randomUUID()).toString('base64')
  const cspHeader = `
    default-src 'self';
    script-src 'self' 'nonce-${nonce}' 'strict-dynamic';
    style-src 'self' 'nonce-${nonce}';
    img-src 'self' blob: data:;
    connect-src vitals.vercel-insights.com github-readme-stats-two-lime-18.vercel.app;
    font-src 'self';
    object-src 'none';
    base-uri 'self';
    form-action 'self';
    frame-ancestors 'none';
    block-all-mixed-content;
    upgrade-insecure-requests;
`

  const requestHeaders = new Headers(req.headers)
  requestHeaders.set('x-nonce', nonce)
  requestHeaders.set(
    'Content-Security-Policy',
    // Replace newline characters and spaces
    cspHeader.replace(/\s{2,}/g, ' ').trim()
  )
  requestHeaders.set('Access-Control-Allow-Origin', 'vitals.vercel-insights.com')
  requestHeaders.set('Access-Control-Allow-Origin', 'github-readme-stats-two-lime-18.vercel.app')

  return NextResponse.next({
    headers: requestHeaders,
    request: {
      headers: requestHeaders,
    },
  })
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
