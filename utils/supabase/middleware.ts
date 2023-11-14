import { createServerClient, type CookieOptions } from '@supabase/ssr'
import generateCsp from '@/utils/headers/generateCSP'
import { type NextRequest, NextResponse } from 'next/server'



export const createClient = (request: NextRequest) => {

  // generate CSP and nonce
  const { csp, nonce } = generateCsp();

  // Clone the request headers
  const requestHeaders = new Headers(request.headers)

  // set nonce request header to read in pages if needed
  requestHeaders.set('x-nonce', nonce)
  requestHeaders.set('x-content-type-options', 'nosniff')
  requestHeaders.set('cache-control', 'public, max-age=0, s-maxage=86400, must-revalidate')
  requestHeaders.set('strict-transport-security', 'max-age=63072000; includeSubDomains; preload')
  // Set the CSP header so that `app-render` can read it and generate tags with the nonce
  requestHeaders.set('content-security-policy', csp);

  // create a new unmodified response...
  let response = NextResponse.next({
    request: {
      // ...using the new request headers
      headers: requestHeaders,
    },
  })

  const supabase = createServerClient(
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
              headers: requestHeaders,
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
              headers: requestHeaders,
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

  // // Also set the CSP so that it is outputted to the browser
  // response.headers.set(
  //   'Content-Security-Policy',
  //   contentSecurityPolicyHeaderValue
  // )

  // Also set the CSP so that it is outputted to the browser
  response.headers.set('Content-Security-Policy', csp);

  response.headers.set('x-content-type-options', 'nosniff')
  response.headers.set('cache-control', 'public, max-age=0, s-maxage=86400, must-revalidate')
  response.headers.set('strict-transport-security', 'max-age=63072000; includeSubDomains; preload')

  return { supabase, response }
}
