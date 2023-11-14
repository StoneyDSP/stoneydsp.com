import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { type NextRequest, NextResponse } from 'next/server'

export const createHashedNonce = async (nonce: string) => {
  const encoder = new TextEncoder()
  const encodedNonce = encoder.encode(nonce) // Encode the nonce
  const hash = await crypto.subtle.digest('SHA-256', encodedNonce) // Hash it with SHA-256
  const bytes = new Uint8Array(hash)
  const hashedNonce = Array.from(bytes)
    .map((b) => b.toString(16).padStart(2, '0')) // Convert the hash to a hexadecimal string
    .join('')
  return hashedNonce
}

export const createClient = (request: NextRequest) => {

  // Generate a random nonce
  // Use 'nonce' when invoking the supabase.auth.signInWithIdToken() method
  const nonce = Buffer.from(crypto.randomUUID()).toString('base64')
  // Use 'hashedNonce' when making the authentication request to Google
  const hashedNnonce = createHashedNonce(nonce)

  const cspHeader = `
    default-src 'self';
    script-src 'self' 'nonce-${nonce}' 'strict-dynamic';
    style-src 'self' 'nonce-${nonce}';
    img-src 'self' blob: data:;
    font-src 'self';
    object-src 'none';
    base-uri 'self';
    form-action 'self';
    frame-ancestors 'none';
    block-all-mixed-content;
    upgrade-insecure-requests;
`
  // const cspHeader = `
  //   default-src 'self';
  //   connect-src vitals.vercel-insights.com;
  //   script-src 'self' 'nonce-${nonce}' 'strict-dynamic';
  //   style-src 'self' 'nonce-${nonce}';
  //   img-src 'self' blob: data:;
  //   font-src 'self';
  //   object-src 'none';
  //   base-uri 'self';
  //   form-action 'self';
  //   frame-ancestors 'none';
  //   block-all-mixed-content;
  //   upgrade-insecure-requests;
  // `

  // Replace newline characters and spaces
  const contentSecurityPolicyHeaderValue = cspHeader
    .replace(/\s{2,}/g, ' ')
    .trim()

  // Clone the request headers
  const requestHeaders = new Headers(request.headers)
  // set nonce request header to read in pages if needed
  requestHeaders.set('x-nonce', nonce)
  requestHeaders.set('X-Content-Type-Options', 'nosniff')
  requestHeaders.set('cache-control', 'public, max-age=0, s-maxage=86400, must-revalidate')
  requestHeaders.set('Strict-Transport-Security', 'max-age=63072000; includeSubDomains; preload')
  // requestHeaders.set(
  //   'Content-Security-Policy',
  //   contentSecurityPolicyHeaderValue
  // )
  // requestHeaders.set(
  //   'Content-Security-Policy-Report-Only',
  //   contentSecurityPolicyHeaderValue
  // )

  // create a new unmodified response
  let response = NextResponse.next({
    request: {
      // New request headers
      headers: request.headers,
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
            headers: request.headers,
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
            headers: request.headers,
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

  return { supabase, response }
}
