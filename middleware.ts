import { NextResponse, type NextRequest } from 'next/server'
import { createSupabaseMiddlewareClient } from '@/utils/supabase/ssr/middleware'

export async function middleware(request: NextRequest) {

  // Create Supabase Middleware Client
  const { supabase, response } = createSupabaseMiddlewareClient(request)

  // Refresh session if expired - required for Server Components
  const session = await supabase.auth.getSession()

  const url = request.nextUrl

  const searchParams = url.searchParams.toString();
  // Get the pathname of the request (e.g. /, /about, /blog/first-post)
  const path = `${url.pathname}${
    searchParams.length > 0 ? `?${searchParams}` : ""
  }`;

  if (!session) {
    // return non-users to the www dir
    return NextResponse.rewrite(
      new URL(`/www${path === "/" ? "" : path}`, request.url),
      response
    )
  }

  // if (process.env.VERCEL_ENV === 'development') {
  //   request.headers.set("host", "test.localhost:3000")
  // }

  // Get hostname of request (e.g. demo.vercel.pub, demo.localhost:3000)
  let hostname = request.headers
    .get("host")!
    .replace(".localhost:3000", `.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`)

  switch (hostname) {

  case `www.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`:
    // rewrites for www pages
    return NextResponse.rewrite(new URL(`/www${path === "/" ? "" : path}`, request.url), response)

  case `app.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`:
    // rewrites for app pages
    return NextResponse.rewrite(new URL(`/app${path === "/" ? "" : path}`, request.url), response)

  case `blog.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`:
    // rewrites for www pages
    return NextResponse.rewrite(new URL(`/blog${path === "/" ? "" : path}`, request.url), response)

  case `docs.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`:
    // rewrites for www pages
    return NextResponse.rewrite(new URL(`/docs${path === "/" ? "" : path}`, request.url), response)

  case `test.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`:
    // rewrites for www pages
    return NextResponse.rewrite(new URL(`/test${path === "/" ? "" : path}`, request.url), response)

  default:
    // return everything else to the www dir
    return NextResponse.rewrite(new URL(`/www${path === "/" ? "" : path}`, request.url), response)
  }
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
      source: '/((?!api|_next/static|_next/image|favicon.ico).*)',
      missing: [
        { type: 'header', key: 'next-router-prefetch' },
        { type: 'header', key: 'purpose', value: 'prefetch' },
      ],
    },
  ],
}
