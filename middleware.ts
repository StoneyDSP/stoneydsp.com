import { userAgent, NextResponse, type NextRequest } from 'next/server'
import { createSupabaseMiddlewareClient } from '@/utils/supabase/ssr'
import logMiddlewareRequest from '@/utils/logger'

export async function middleware(request: NextRequest) {

  // Create Supabase Middleware Client
  const { supabase, response } = createSupabaseMiddlewareClient(request)

  // Refresh session if expired - required for Server Components
  await supabase.auth.getSession()

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
