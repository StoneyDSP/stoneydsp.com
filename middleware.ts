import { NextResponse, type NextRequest } from 'next/server'
// import { createClient } from '@/utils/supabase/middleware'
import { createSupabaseMiddlewareClient } from '@/utils/supabase/ssr'
import isbot from 'isbot'

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

  const { supabase, response } = createSupabaseMiddlewareClient(req)

  // Refresh session if expired - required for Server Components
  // https://supabase.com/docs/guides/auth/auth-helpers/nextjs#managing-session-with-middleware

  await supabase.auth.getSession()
  
  // const {
  //   data: { session },
  // } = await supabase.auth.getSession()

  // const {
  //   data: { user },
  // } = await supabase.auth.getUser()

  // // if user is not signed in and the requested path is /contact,
  // // redirect the user to /login
  // if (((!user) || (!session)) && (req.nextUrl.pathname === '/contact')) {
  //   return NextResponse.redirect(new URL('/login', req.url))
  // }

  return response
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
