import { NextResponse, type NextRequest } from 'next/server'
import { createClient } from '@/utils/supabase/middleware'
import isbot from 'isbot'

export async function middleware(req: NextRequest) {

  const res = NextResponse.next

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
  const cspHeader = `
    default-src 'self';
    connect-src vitals.vercel-insights.com;
    script-src 'self' 'nonce-${nonce}' 'strict-dynamic';
    style-src 'self' 'nonce-${nonce}';
    img-src 'self' blob: data:;
    font-src 'self';
    object-src 'none';
    base-uri 'self';
    form-action 'self';
    frame-ancestors 'none';
    block-all-mixed-content;
    upgrade-insecure-requests;
  `

  const requestHeaders = new Headers(req.headers)

  // Setting request headers
  requestHeaders.set('x-nonce', nonce)
  requestHeaders.set('X-Content-Type-Options', 'nosniff')
  requestHeaders.set('cache-control', 'public, max-age=0, s-maxage=86400, must-revalidate')
  requestHeaders.set('Strict-Transport-Security', 'max-age=63072000; includeSubDomains; preload')
  requestHeaders.set(
    'Content-Security-Policy',
    // Replace newline characters and spaces
    cspHeader.replace(/\s{2,}/g, ' ').trim()
  )
  // requestHeaders.set(
  //   'Content-Security-Policy-Report-Only',
  //   // Replace newline characters and spaces
  //   cspHeader.replace(/\s{2,}/g, ' ').trim()
  // )

  return res({
    headers: requestHeaders,
    request: {
      headers: requestHeaders,
    },
  })

  // try {

  //   // This `try/catch` block is only here for the interactive tutorial.
  //   // Feel free to remove once you have Supabase connected.
  //   const { supabase, response } = createClient(req)

  //   // Refresh session if expired - required for Server Components
  //   // https://supabase.com/docs/guides/auth/auth-helpers/nextjs#managing-session-with-middleware
  //   await supabase.auth.getSession()

  //   return response

  // } catch (e) {

  //   // // If you are here, a Supabase client could not be created!
  //   // // This is likely because you have not set up environment variables.
  //   // // Check out http://localhost:3000 for Next Steps.
  //   return res({
  //     headers: requestHeaders,
  //     request: {
  //       headers: requestHeaders,
  //     },
  //   })
  // }
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
