import {
  generateCSP,
  setHeaders,
  headersDefaults,
} from '@/lib/headers'
import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { type NextRequest, NextResponse } from 'next/server'
// import generateCSP from '@/lib/headers'
import customStorageAdapter from './storage'
import { AuthError } from '@supabase/supabase-js'

export const createSupabaseMiddlewareClient = (request: NextRequest) => {

  const date = new Date()

  const requireHashedNonce: boolean = false

  // generate CSP and nonce
  const { csp, nonce } = generateCSP(requireHashedNonce)

  request.headers.set('X-StoneyDSP-Middleware-Request', `${date.toUTCString()}`)

  // set nonce request header to read in pages if needed
  request.headers.set('X-Nonce', nonce)
  // Set the CSP header so that `app-render` can read it and generate tags with the nonce
  request.headers.set('Content-Security-Policy', csp)

  headersDefaults.forEach(async headerDefault => {
    await setHeaders(request, headerDefault)
  })

  // Create an unmodified response - don't change the request method!
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      // auth: {
      //   detectSessionInUrl: true,
      //   flowType: 'pkce',
      //   storage: customStorageAdapter,
      // },
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

  response.headers.set('X-StoneyDSP-Middleware-Response', `${date.toUTCString()}`)

  // Also set the CSP so that it is outputted to the browser
  response.headers.set('Content-Security-Policy', csp)

  headersDefaults.forEach(async headerDefault => {
    await setHeaders(response, headerDefault)
  })

  return { data: { supabase, response } }
}
