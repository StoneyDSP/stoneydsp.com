import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'

import isbot from 'isbot'

import type { NextRequest } from 'next/server'
import type { Database } from './types_db'

export async function middleware(req: NextRequest) {

  const res = NextResponse.next()

  // Create a Supabase client configured to use cookies
  const supabase = createMiddlewareClient<Database>({ req, res })

  // Refresh session if expired - required for Server Components
  // https://supabase.com/docs/guides/auth/auth-helpers/nextjs#managing-session-with-middleware
  await supabase.auth.getSession()

  // // Extract user info
  // const {
  //   data: { user },
  // } = await supabase.auth.getUser()

  // Extract visitor info
  const country = (req.geo && req.geo.country) || 'Earth'
  const city = (req.geo && req.geo.city) || 'Nowhere'
  const region = (req.geo && req.geo.region) || 'Somewhere'
  const id = (req.ip) || 'Visitor'

  if (isbot(req.headers.get('user-agent'))) {
    console.log(`Bot ${id} crawling from ${city}, ${region}, ${country}`)
  } else {
    console.log(`User ${id} visiting from ${city}, ${region}, ${country}`)
  }

  // if (!user) {
  //   return redirect('/login')
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
