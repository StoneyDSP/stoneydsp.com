import { userAgent, NextResponse, type NextRequest } from 'next/server'
// import { createClient } from '@/utils/supabase/middleware'
import { createSupabaseMiddlewareClient } from '@/utils/supabase/ssr'

export async function middleware(request: NextRequest) {

  const { isBot } = userAgent(request)
  // Extract visitor info.
  const visitor = isBot ? 'Bot' : 'User'
  const travelling = isBot ? 'crawling' : 'visiting'
  const country = (request.geo && request.geo.country) || 'Earth'
  const city = (request.geo && request.geo.city) || 'Nowhere'
  const region = (request.geo && request.geo.region) || 'Somewhere'
  const ip = (request.ip) || 'Visitor'
  const agent = (request.headers.get('user-agent')) || 'Agent Unknown'

  console.log(`${visitor} ${ip} ${travelling} from ${city}, ${region}, ${country} with ${agent}`)

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
