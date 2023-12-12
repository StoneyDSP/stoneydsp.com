import { NextRequest, NextResponse } from 'next/server'

export type SecurityHeaders = { readonly name: string, readonly value: string }

export async function setHeaders(message: NextRequest | NextResponse, headers: readonly SecurityHeaders[]) {
  headers.forEach(header => {
    message.headers.set(header.name, header.value)
  })
}

export async function getHeaders(message: NextRequest | NextResponse, headers: readonly SecurityHeaders[]) {
  message.headers.forEach(header => {
    return header
  })
}

export async function checkHeaders(message: NextRequest | NextResponse, headers: readonly SecurityHeaders[]) {
  let res: boolean = false
  headers.forEach(header => {
    if (message.headers.get(header.name)) {
      return true
    }

  })
}

/**
 * - Returns a random-nonce - based Content Security Policy
 * - Use 'nonce' when invoking the supabase.auth.signInWithIdToken() method
 * - Use 'hashedNonce' when making the authentication request to Google
 *
 * https://github.com/Sprokets/nextjs-csp-report-only
 */
export const generateCSP = (requireHashedNonce: boolean = false) => {

  // generate random nonce converted to base64. Must be different on every HTTP page load
  const nonce = Buffer.from(crypto.randomUUID()).toString('base64')

  const hashedNonce = createHashedNonce(nonce)

  const csp = [
    { name: "default-src", values: ["'self'",] },
    {
      name: "script-src",
      values: [
        "'report-sample'",
        "'self'",
        `'nonce-${requireHashedNonce ? hashedNonce : nonce}'`,
        "'strict-dynamic'",
        "https:",
        "http:",
        `${process.env.VERCEL_ENV === "production" ? "" : `'unsafe-eval'`}`
      ],
    },
    {
      name: "style-src",
      values: [
        "'report-sample'",
        "'self'",
        `'nonce-${requireHashedNonce ? hashedNonce : nonce}'`
      ],
    },
    {
      name: "connect-src",
      values: [
        "'self'",
        "*.vercel-insights.com",
        `*.${process.env.NEXT_PUBLIC_ROOT_DOMAIN!}`,
        `${process.env.NEXT_PUBLIC_SUPABASE_URL!}`,
      ],
    },
    {
      name: "font-src",
      values: [
        "'self'",
        "data:"
      ]
    },
    {
      name: "img-src",
      values: [
        "'self'",
        "*.stoneydsp.com",
        "blob:",
        "data:",
        'https://raw.githubusercontent.com',
        'https://github.com',
        `${process.env.NEXT_PUBLIC_SUPABASE_URL!}`,
      ]
    },
    {
      name: "media-src",
      values: [
        "'self'",
        'data:',
        'blob:',
        `${process.env.NEXT_PUBLIC_SUPABASE_URL!}`
      ]
    },
    { name: "worker-src", values: ["'self'", "blob:"] },
    { name: "frame-ancestors", values: ["'none'"] },
    { name: "form-action", values: ["'self'"] },
    { name: "manifest-src", values: ["'self'"] },

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

  return { csp: cspString, nonce, hashedNonce };

}

export const createHashedNonce = async (nonce: string) => {

  const encoder = new TextEncoder()
  // Encode the nonce
  const encodedNonce = encoder.encode(nonce)
  // Hash it with SHA-256
  const hash = await crypto.subtle.digest('SHA-256', encodedNonce)
  // Convert the hash to a hexadecimal string
  const bytes = new Uint8Array(hash)
  const hashedNonce = Array.from(bytes)
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('')
  return hashedNonce
}

// export const { csp, nonce, hashedNonce } = generateCSP()
// export var headersCSP: readonly SecurityHeaders[] = [
//   {name: 'Content-Security-Policy', value: csp,},
//   {name: 'Content-Security-Policy-Report-Only', value: csp,},
// ] as const


/** https://nextjs.org/docs/app/building-your-application/routing/route-handlers#cors */
export const headersCORSNextJs: readonly SecurityHeaders[] = [
  {name: 'Access-Control-Allow-Origin', value: '*',},
  {name: 'Access-Control-Allow-Credentials', value: 'true',},
  {name: 'Access-Control-Allow-Methods', value: 'GET,OPTIONS,PATCH,DELETE,POST,PUT'},
  {name: 'Access-Control-Allow-Headers', value: 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version',},
] as const

/** https://supabase.com/docs/guides/functions/cors */
export const headersCORSSupabase: readonly SecurityHeaders[] = [
  {name: 'Access-Control-Allow-Origin', value: '*',},
  {name: 'Access-Control-Allow-Credentials', value: 'true',},
  {name: 'Access-Control-Allow-Methods', value: 'GET,OPTIONS,PATCH,DELETE,POST,PUT'},
  {name: 'Access-Control-Allow-Headers', value: 'authorization, x-client-info, apikey, content-type',},
] as const

/** https://vercel.com/guides/how-to-enable-cors */
export const headersCORSVercel: readonly SecurityHeaders[] = [
  {name: 'Access-Control-Allow-Origin', value: '*',},
  {name: 'Access-Control-Allow-Credentials', value: 'true',},
  {name: 'Access-Control-Allow-Methods', value: 'GET,OPTIONS,PATCH,DELETE,POST,PUT'},
  {name: 'Access-Control-Allow-Headers', value: 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version',},
] as const

export const headersCacheControl: readonly SecurityHeaders[] = [
  {name: 'Cache-Control', value: 'max-age=10',},
  {name: 'CDN-Cache-Control', value: 'max-age=60',},
  {name: 'Vercel-CDN-Cache-Control', value: 'max-age=3600'},
] as const

export const headersDefaults: readonly (readonly SecurityHeaders[])[] = [
  // headersCSP,
  headersCORSNextJs,
  headersCacheControl,
  [ {name: 'Strict-Transport-security', value: 'max-age=63072000; includeSubDomains; preload'}],
  [ {name: 'X-Content-Type-Options', value: 'nosniff'}],
  [ {name: 'X-Frame-Options', value: 'DENY'}],
  [ {name: 'X-XSS-Protection', value: '1; mode=block'}],
  // [ {name: 'X-DNS-Prefetch-Control', value: 'on'}],
  [ {name: 'Upgrade-Insecure-Requests', value: '1'}],
] as const
