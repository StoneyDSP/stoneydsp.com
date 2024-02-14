import {
  generateCSP,
  setHeaders,
  headersDefaults,
} from '@/lib/headers'
import { NextResponse, NextRequest } from 'next/server'
// import createSupabaseMiddlewareClient from '@/lib/supabase/ssr/middleware'
import { Database } from '@/types/supabase'
import { createServerClient, type CookieOptions } from '@supabase/ssr'
import logRequestToServer from '@/lib/log/request/server'

export default async function middleware(request: NextRequest) {

  const date = new Date()

  const { csp, nonce } = generateCSP()

  request.headers.set('X-StoneyDSP-Middleware-Request', `${date.toUTCString()}`)
  request.headers.set('Content-Security-Policy', csp)
  request.headers.set('X-Data-Nonce', nonce)

  headersDefaults.forEach(headerDefault => {
    setHeaders(request, headerDefault)
  })

  // const { supabase, response } = createSupabaseMiddlewareClient(request)

  // Create an unmodified response
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  })

  const supabase = createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value
        },
        set(name: string, value: string, options: CookieOptions) {
          // If the cookie is updated, update the cookies for the request and response
          request.cookies.set({
            name,
            value,
            ...options,
          })
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          })
          response.cookies.set({
            name,
            value,
            ...options,
          })
        },
        remove(name: string, options: CookieOptions) {
          // If the cookie is removed, update the cookies for the request and response
          request.cookies.set({
            name,
            value: '',
            ...options,
          })
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          })
          response.cookies.set({
            name,
            value: '',
            ...options,
          })
        },
      },
    }
  )

  const { data: { session }, error } = await supabase.auth.getSession()

  response.headers.set('X-StoneyDSP-Middleware-Response', `${date.toUTCString()}`)
  response.headers.set('Content-Security-Policy', csp)
  response.headers.set('X-Data-Nonce', nonce)

  headersDefaults.forEach(headerDefault => {
    setHeaders(response, headerDefault)
  })

  if (!error) {

    // Middleware response was successful!
    logRequestToServer(request)

    // Very specific router: not ideal, but secure at least...

    if (request.nextUrl.pathname === '/auth/v1/signin' ||
        request.nextUrl.pathname === '/auth/v1/signout' ||
        request.nextUrl.pathname === '/auth/v1/signup' ||
        request.nextUrl.pathname === '/auth/v1/callback' ||
        request.nextUrl.pathname === '/auth/v1/providers/github' ||
        request.nextUrl.pathname === '/login' ||
        request.nextUrl.pathname === '/account' ||
        request.nextUrl.pathname === '/robots.txt' ||
        request.nextUrl.pathname === '/humans.txt' ||
        request.nextUrl.pathname === '/ads.txt' ||
        request.nextUrl.pathname === '/favicon.ico' ||
        request.nextUrl.pathname === '/sitemap.xml' ||
        request.nextUrl.pathname === '/www_sitemap.xml') {
      return NextResponse.next({
        headers: response.headers,
        request: {
          headers: request.headers,
        }
      })
    }

    if (request.nextUrl.pathname === '/' ||
        request.nextUrl.pathname === '/about' ||
        request.nextUrl.pathname === '/contact' ||
        request.nextUrl.pathname === '/terms-of-service' ||
        request.nextUrl.pathname === '/privacy-policy' ||
        request.nextUrl.pathname === '/projects' ||
        request.nextUrl.pathname === '/projects/biquads' ||
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

    return NextResponse.next({
      headers: response.headers,
      request: {
        headers: request.headers,
      }
    })

    // // Middleware response was unsuccessful!
    // return NextResponse.rewrite(new URL(`/?message=Not found`, request!.url ), {
    //   request: {
    //     headers: request.headers,
    //   }
    //   // status: 404,
    //   // statusText: `Not found`,
    // })
  }

  // Middleware response was unsuccessful!
  logRequestToServer(request)
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
      source: '/((?!api|_next/static|_next/image|favicon.ico|manifest.webmanifest|robots.txt|humans.txt|ads.txt|images).*)',
      missing: [
        { type: 'header', key: 'next-router-prefetch' },
        { type: 'header', key: 'purpose', value: 'prefetch' },
      ],
    },
  ],
}
