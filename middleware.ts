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

  const res = NextResponse.next()

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
