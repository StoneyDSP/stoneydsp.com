import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'

import type { NextRequest } from 'next/server'
import type { Database } from './types_db'

export async function middleware(req: NextRequest) {

  const res = NextResponse.next()

  // Create a Supabase client configured to use cookies
  const supabase = createMiddlewareClient<Database>({ req, res })

  // Refresh session if expired - required for Server Components
  // https://supabase.com/docs/guides/auth/auth-helpers/nextjs#managing-session-with-middleware
  await supabase.auth.getSession()

  // Extract user info
  const {
    data: { user },
  } = await supabase.auth.getUser()

  // Extract visitor info. This can be moved below the login check to prevent
  // double-logging if preferred.
  const country = (req.geo && req.geo.country) || 'Earth'
  const city = (req.geo && req.geo.city) || 'Nowhere'
  const region = (req.geo && req.geo.region) || 'Somewhere'
  const agent = (req.ip) || 'Visitor'

  console.log(`${agent} visiting from ${city}, ${region}, ${country}`)

  // if user is not signed in and the current path is not '/login',
  // redirect the user to '/login'
  if (!user && req.nextUrl.pathname !== '/login') {
    return NextResponse.redirect(new URL('/login', req.url))
  }

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
