import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { type NextRequest, NextResponse } from 'next/server'
import customStorageAdapter from './storage'
// import * as crypto from 'crypto'

export const createClient = (request: NextRequest) => {

  const date = new Date()

  const generateCSP = () => {

    // generate random nonce converted to base64. Must be different on every HTTP page load
    // const nonce = crypto.randomBytes(16).toString('base64')
    // const nonce = crypto.randomUUID();

    // const nonce = Buffer.from(crypto.randomUUID()).toString('base64')
    const nonce = Buffer.from(crypto.randomUUID()).toString('base64')

    const csp = [
      { name: "default-src", values: ["'self'",] },
      {
        name: "script-src",
        values: [
          "'report-sample'",
          "'self'",
          `'nonce-${nonce}'`,
          "'strict-dynamic'",
          "https:",
          "http:",
          `${process.env.VERCEL_ENV === "production" ? "" : `'unsafe-eval'`}`
        ],
      },
      {
        name: "style-src",
        values: ["'report-sample'", "'self'", `${process.env.NEXT_PUBLIC_SUPABASE_URL!}`, `'nonce-${nonce}'`],
      },
      {
        name: "connect-src",
        values: ["'self'", "*.vercel-insights.com", "plausible.io", "*.stoneydsp.com", `${process.env.NEXT_PUBLIC_SUPABASE_URL!}`,],
      },
      { name: "font-src", values: ["'self'", "data:"] },
      { name: "img-src", values: ["'self'", "*.stoneydsp.com", "blob:", "data:", 'https://raw.githubusercontent.com', `${process.env.NEXT_PUBLIC_SUPABASE_URL!}`,] },
      { name: "media-src", values: ["'self'", 'data:', 'blob:', `${process.env.NEXT_PUBLIC_SUPABASE_URL!}`] },
      { name: "worker-src", values: ["'self'", "blob:"] },
      { name: "frame-ancestors", values: ["'none'"] },
      { name: "form-action", values: ["'self'"] },

      { name: "object-src", values: ["none"] },
      { name: "base-uri", values: ['self'] },
      { name: "upgrade-insecure-requests", values: [""] },
      { name: "block-all-mixed-content", values: [""] }
    ];

    const cspString = csp
      .map((directive) => {
        return `${directive.name} ${directive.values.join(" ")}`;
      })
      .join("; ");

    return { csp: cspString, nonce };
  }
  // generate CSP and nonce
  const { csp, nonce } = generateCSP()

  request.headers.set('X-StoneyDSP-Middleware-Request', `${date.toUTCString()}`)

  // set nonce request header to read in pages if needed
  request.headers.set('X-Nonce', nonce)
  // Set the CSP header so that `app-render` can read it and generate tags with the nonce
  request.headers.set('Content-Security-Policy', csp)
  // Set the CORS for pre-flight requests
  request.headers.set('Access-Control-Allow-Origin', '*')
  request.headers.set('Access-Control-Allow-Credentials', 'true')
  request.headers.set('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT')
  request.headers.set('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version')

  request.headers.set('Cache-Control', 'max-age=10')
  request.headers.set('CDN-Cache-Control', 'max-age=60')
  request.headers.set('Vercel-CDN-Cache-Control', 'max-age=3600')

  request.headers.set('X-Content-Type-Options', 'nosniff')
  request.headers.set('Strict-Transport-security', 'max-age=63072000; includeSubDomains; preload')
  request.headers.set('X-Frame-Options', 'DENY')
  request.headers.set('X-XSS-Protection', '1; mode=block')
  request.headers.set('Upgrade-Insecure-Requests', '1')

  // Create an unmodified response - but don't change the request method!
  let response = NextResponse.next({
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

  response.headers.set('X-StoneyDSP-Middleware-Response', `${date.toUTCString()}`)

  // Also set the CSP so that it is outputted to the browser
  response.headers.set('Content-Security-Policy', csp)
  // Set the CORS for pre-flight requests
  response.headers.set('Access-Control-Allow-Origin', '*')
  response.headers.set('Access-Control-Allow-Credentials', 'true')
  response.headers.set('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT')
  response.headers.set('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version')

  response.headers.set('Cache-Control', 'max-age=10')
  response.headers.set('CDN-Cache-Control', 'max-age=60')
  response.headers.set('Vercel-CDN-Cache-Control', 'max-age=3600')

  response.headers.set('X-Content-Type-Options', 'nosniff')
  response.headers.set('Strict-Transport-security', 'max-age=63072000; includeSubDomains; preload')
  response.headers.set('X-Frame-Options', 'DENY')
  response.headers.set('X-XSS-Protection', '1; mode=block')
  response.headers.set('Upgrade-Insecure-Requests', '1')

  return { supabase, response }
}
