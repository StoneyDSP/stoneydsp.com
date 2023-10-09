import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'

import type { NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()

  // Create a Supabase client configured to use cookies
  const supabase = createMiddlewareClient({ req, res })

  const {
    data: { user },
  } = await supabase.auth.getUser()

  // Refresh session if expired - required for Server Components
  // https://supabase.com/docs/guides/auth/auth-helpers/nextjs#managing-session-with-middleware
  await supabase.auth.getSession()

  // Extract country. Default to US if not found.
  const country = (req.geo && req.geo.country) || 'US'

  const agent = (process.env.USER) || 'USER'

  console.log(`Visitor: ${agent} from ${country}`)

   // if user is signed in and the current path is / redirect the user to /account
   if (user && req.nextUrl.pathname === '/') {
    return NextResponse.redirect(new URL('/account', req.url))
  }

  // if user is not signed in and the current path is not / redirect the user to /
  if (!user && req.nextUrl.pathname !== '/') {
    return NextResponse.redirect(new URL('/', req.url))
  }

  return res
}

export const config = {
  matcher: ['/', '/account'],
}
