import { createServerClient, type CookieOptions } from '@supabase/ssr'
import generateCsp from '@/utils/headers/CSP'
import { cookies } from 'next/headers'
import { NextResponse, type NextRequest } from 'next/server'

export async function POST(request: NextRequest) {
  const cookieStore = cookies()

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value
        },
        set(name: string, value: string, options: CookieOptions) {
          cookieStore.set({ name, value, ...options })
        },
        remove(name: string, options: CookieOptions) {
          cookieStore.set({ name, value: '', ...options })
        },
      },
    }
  )

  const {
    data: { session },
  } = await supabase.auth.getSession()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  // if user is not signed in redirect the user to /login
  if (((!user) || (!session))) {
    return NextResponse.redirect(new URL('/login', request.url), {
      status: 302,
    })
  }

  // generate CSP and nonce
  const { csp, nonce } = generateCsp();

  // Clone the request headers
  const requestHeaders = new Headers(request.headers)

  // set nonce request header to read in pages if needed
  requestHeaders.set('x-nonce', nonce)
  // Set the CSP header so that `app-render` can read it and generate tags with the nonce
  requestHeaders.set('content-security-policy', csp);

  // create a new unmodified response...
  let response = NextResponse.next({
    request: {
      // ...using the new request headers 'requestHeaders'
      headers: requestHeaders,
    },
  })

  // Also set the CSP so that it is outputted to the browser
  response.headers.set('content-security-policy', csp);
  response.headers.set('x-content-type-options', 'nosniff')
  response.headers.set('cache-control', 'public, max-age=0, s-maxage=86400, must-revalidate')
  response.headers.set('strict-transport-security', 'max-age=63072000; includeSubDomains; preload')

  return NextResponse.redirect(new URL('/', request.url), {
    ...response,
    status: 302,
  })
}
