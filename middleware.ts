import {
  generateCSP,
  setHeaders,
  headersDefaults,
} from '@/lib/headers'
import { NextResponse, NextRequest } from 'next/server'
import createSupabaseMiddlewareClient from '@/lib/supabase/ssr/middleware'
import logRequestToServer from '@/lib/log/request/server'

export default async function middleware(request: NextRequest) {

  const date = new Date()

  const { csp, nonce } = generateCSP()

  request.headers.set('X-StoneyDSP-Middleware-Request', `${date.toUTCString()}`)
  request.headers.set('Content-Security-Policy', csp)
  request.headers.set('X-Data-Nonce', nonce)

  headersDefaults.forEach(async headerDefault => {
    setHeaders(request, headerDefault)
  })

  const { supabase, response } = createSupabaseMiddlewareClient(request)

  const { data: { session }, error } = await supabase.auth.getSession()


  response.headers.set('X-StoneyDSP-Middleware-Response', `${date.toUTCString()}`)
  response.headers.set('Content-Security-Policy', csp)
  response.headers.set('X-Data-Nonce', nonce)

  headersDefaults.forEach(async headerDefault => {
    await setHeaders(response, headerDefault)
  })

  if (!error) {

    // Middleware response was successful!
    logRequestToServer(request)

    if (request.nextUrl.pathname === '/' ||
        request.nextUrl.pathname === '/about' ||
        request.nextUrl.pathname === '/contact' ||
        request.nextUrl.pathname === '/terms-of-service' ||
        request.nextUrl.pathname === '/privacy-policy' ||
        request.nextUrl.pathname === '/projects' ||
        request.nextUrl.pathname === '/projects/biquads' || // not ideal, but secure at least...
        request.nextUrl.pathname === '/projects/base64' ||
        request.nextUrl.pathname === '/projects/hostconfig' ||
        request.nextUrl.pathname === '/projects/modules' ||
        request.nextUrl.pathname === '/projects/ubento' ||
        request.nextUrl.pathname === '/projects/cxxwin' ||
        request.nextUrl.pathname === '/projects/msys2-toolchain' ||
        request.nextUrl.pathname === '/projects/noderc' ||
        request.nextUrl.pathname === '/projects/audioplugin-svf' ||
        request.nextUrl.pathname === '/projects/orfanidisbiquad' ||
        request.nextUrl.pathname === '/projects/nonlinearfilters' ||
        request.nextUrl.pathname === '/projects/bilineareq') {
      return NextResponse.rewrite(new URL(`/www${request.nextUrl.pathname === "/" ? "" : request.nextUrl.pathname}`, request.nextUrl.origin), {
        headers: response.headers,
        request: {
          headers: request.headers,
        }
      })
    }

    return response
  }

  // Middleware response was unsuccessful!
  logRequestToServer(request!)
  return NextResponse.rewrite(new URL(`/?message=${error?.message}`, request!.url ), {
    request: {
      headers: request.headers,
    }
    // status: 400,
    // statusText: error?.message,
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
      source: '/((?!api|_next/static|_next/image|favicon.ico|manifest.webmanifest|robots.txt|images).*)',
      missing: [
        { type: 'header', key: 'next-router-prefetch' },
        { type: 'header', key: 'purpose', value: 'prefetch' },
      ],
    },
  ],
}
