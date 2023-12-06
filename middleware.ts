import {
  generateCSP,
  setHeaders,
  headersDefaults,
} from '@/lib/headers'
import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'
// import { createSupabaseMiddlewareClient } from '@/lib/supabase/middleware'
import parseNextRequest from '@/lib/parse/next/request'
import logRequestToServer from '@/lib/log/request/server'
// import customStorageAdapter from '@/lib/supabase/storage'
// import parseError from './lib/parse/error'

export default async function middleware(nextRequest: NextRequest) {

  const { data: { request }, error } = await parseNextRequest(nextRequest)

  if (request! && !error) {

    const date = new Date()

    request.headers.set('X-StoneyDSP-Middleware-Request', `${date.toUTCString()}`)

    headersDefaults.forEach(async headerDefault => {
      await setHeaders(request, headerDefault)
    })

    let response = NextResponse.next({
      request: {
        headers: request.headers
      }
    })

    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        auth: {
          detectSessionInUrl: true,
          flowType: 'pkce',
          // storage: customStorageAdapter,
        },
        cookies: {
          get(name: string) {
            // console.log('Middleware - getting cookie: %s', name)
            return request.cookies.get(name)?.value
          },
          set(name: string, value: string, options: CookieOptions) {
            // console.log('Middleware - setting cookie: %s', name)
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
            // console.log('Middleware - removing cookie: %s', name)
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

    if (!error) {

      const { data: { user }, error } = await supabase.auth.getUser()

      response.headers.set('X-StoneyDSP-Middleware-Response', `${date.toUTCString()}`)

      headersDefaults.forEach(async headerDefault => {
        await setHeaders(response, headerDefault)
      })

      // Middleware response was successful!
      logRequestToServer(request)

      if (request.nextUrl.pathname === '/' ||
          request.nextUrl.pathname === '/about' ||
          request.nextUrl.pathname === '/projects' ||
          request.nextUrl.pathname === '/projects/*' ||
          request.nextUrl.pathname === '/contact') {
        return NextResponse.rewrite(new URL(`/www${request.nextUrl.pathname}`, request.nextUrl.origin), {
          headers: response.headers,
        })
      }

      return response
    }

    // Middleware response was unsuccessful!
    logRequestToServer(request!)
    return NextResponse.redirect(new URL(`/?message=${error?.message}`, request!.url ), {
      status: 400,
      statusText: error?.message,
    })

  }

  // Middleware response was unsuccessful!
  logRequestToServer(request!)
  return NextResponse.redirect(new URL(`/?message=${error?.message}`, request!.url ), {
    status: 400,
    statusText: error?.message,
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
