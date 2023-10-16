import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'

import type { NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {

  // const nonce = Buffer.from(crypto.randomUUID()).toString('base64')
  // const isDev = process.env.VERCEL_ENV !== 'production' as const

  // const cspHeader = `
  //   default-src 'self';
  //   script-src 'self' 'nonce-${nonce}' 'strict-dynamic' https: 'unsafe-inline'${
  //     isDev ? " 'unsafe-eval'" : ''
  //   };
  //   style-src 'self' 'nonce-${nonce}';
  //   ${isDev ? "connect-src vitals.vercel-insights.com" : ""};
  //   img-src 'self' blob: data:;
  //   font-src 'self';
  //   object-src 'none';
  //   base-uri 'self';
  //   form-action 'self';
  //   frame-ancestors 'none';
  //   block-all-mixed-content;
  //   upgrade-insecure-requests;
  // `

  // const requestHeaders = new Headers(req.headers)

  // // Setting request headers
  // requestHeaders.set('x-nonce', nonce)
  // requestHeaders.set(
  //   'Content-Security-Policy',
  //   // Replace newline characters and spaces
  //   cspHeader.replace(/\s{2,}/g, ' ').trim()
  // )

  const res = NextResponse.next(
    // {
    //   headers: requestHeaders,
    //   request: {
    //     headers: requestHeaders,
    //   },
    // }
  )

  // Create a Supabase client configured to use cookies
  const supabase = createMiddlewareClient({ req, res })

  const {
    data: { user },
  } = await supabase.auth.getUser()

  // Refresh session if expired - required for Server Components
  // https://supabase.com/docs/guides/auth/auth-helpers/nextjs#managing-session-with-middleware
  await supabase.auth.getSession()

  // Extract visitor info
  // Extract visitor info
  const country = (req.geo && req.geo.country) || 'Earth'
  const city = (req.geo && req.geo.city) || 'Nowhere'
  const region = (req.geo && req.geo.region) || 'Somewhere'
  const agent = (req.ip) || 'Visitor'

  console.log(`${agent} visiting from ${city}, ${region}, ${country}`)

  // // if user is not signed in and the current path is not /login redirect the user to /login
  // if (!user && req.nextUrl.pathname !== '/login') {
  //   return NextResponse.redirect(new URL('/login', req.url))
  // }

  // // if user is not signed in and the current path is not /login redirect the user to /login
  // if (!user && req.nextUrl.pathname !== '/login') {
  //   return NextResponse.redirect(new URL('/login', req.url))
  // }

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
