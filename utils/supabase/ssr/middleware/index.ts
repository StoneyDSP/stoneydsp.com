import { createServerClient, type CookieOptions } from '@supabase/ssr'
import logMiddlewareRequest from '@/utils/logger'
import generateCsp from '@/utils/headers/CSP'
import customStorageAdapter from '@/utils/supabase/ssr/storage'

const createSupabaseMiddlewareClient = (request: NextRequest) => {

  // // generate CSP and nonce
  // const { csp, nonce } = generateCsp();

  // Clone the request headers
  const requestHeaders = new Headers(request.headers)

  // // set nonce request header to read in pages if needed
  // requestHeaders.set('X-Nonce', nonce)
  requestHeaders.set('X-Content-Type-Options', 'nosniff')
  requestHeaders.set('Cache-Control', 'public, max-age=0, s-maxage=86400, must-revalidate')
  requestHeaders.set('Strict-Transport-security', 'max-age=63072000; includeSubDomains; preload')
  requestHeaders.set('X-Frame-Options', 'DENY')
  requestHeaders.set('X-XSS-Protection', '1; mode=block')
  // // Set the CSP header so that `app-render` can read it and generate tags with the nonce
  // requestHeaders.set('Content-Security-Policy', csp);
  requestHeaders.set('Upgrade-Insecure-Requests', '1')
  requestHeaders.set('X-Middleware-Request', 'true')
  
  // Create an unmodified response
  let response = NextResponse.next({
    headers: requestHeaders,
    request: {
      headers: request.headers,
    },
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      auth: {
        detectSessionInUrl: true,
        flowType: 'pkce',
        storage: customStorageAdapter,
      },
      global: {
        headers: { Authorization: request.headers.get('Authorization')! },
      },
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
            headers: requestHeaders,
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
            headers: requestHeaders,
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

  supabase.auth.onAuthStateChange((event, session) => {
    if (session !== null) {
      if (event === 'SIGNED_OUT') {
        // || event === 'USER_DELETED'
        // delete cookies on sign out
        const expires = new Date(0).toUTCString()
        document.cookie = `my-access-token=; path=/; expires=${expires}; SameSite=Lax; secure`
        document.cookie = `my-refresh-token=; path=/; expires=${expires}; SameSite=Lax; secure`
      } else if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
        const maxAge = 100 * 365 * 24 * 60 * 60 // 100 years, never expires
        document.cookie = `my-access-token=${session.access_token}; path=/; max-age=${maxAge}; SameSite=Lax; secure`
        document.cookie = `my-refresh-token=${session.refresh_token}; path=/; max-age=${maxAge}; SameSite=Lax; secure`
      }
    }
  })

  // //  Also set the CSP so that it is outputted to the browser
  // response.headers.set('Content-Security-Policy', csp)
  response.headers.set('Upgrade-Insecure-Requests', '1')
  response.headers.set('X-Content-Type-Options', 'nosniff')
  response.headers.set('Cache-Control', 'public, max-age=0, s-maxage=86400, must-revalidate')
  response.headers.set('Strict-Transport-Security', 'max-age=63072000; includeSubDomains; preload')
  response.headers.set('X-Frame-Options', 'DENY')
  response.headers.set('X-XSS-Protection', '1; mode=block')
  response.headers.set('X-Middleware-Response', 'true')

  logMiddlewareRequest(request)

  return { supabase, response }
}

export default createSupabaseMiddlewareClient
