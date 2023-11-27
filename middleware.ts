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

  // if (request.headers.get("host") == "www.[::1]:3000") {
  //   request.headers.set("host", "www.localhost:3000")
  // }

  // Get hostname of request (e.g. demo.vercel.pub, demo.localhost:3000)
  let hostname = request.headers
    .get("host")!
    .replace(".localhost:3000", `.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`)

  // if (!session && path !== "/login") {
  //   return NextResponse.redirect(new URL("/login", request.url), response);
  // } else if (session && path == "/login") {
  //   return NextResponse.redirect(new URL("/account", request.url), response);
  // }

  // if (path === "/auth*") {
  //   return response
  // }

  // if (path === "/login") {
  //   return response
  // }

  // rewrites for www pages
  if (hostname == `www.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`) {
    return NextResponse.rewrite(
      new URL(`/www${path === "/" ? "" : path}`, request.url),
    );
  }

  // return response
  return NextResponse.rewrite(
    new URL(`/www${path === "/" ? "" : path}`, request.url),
    response
  );

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

async function canInitSupabaseMiddlewareClient(request: NextRequest) {

  try {

    // Create Supabase Middleware Client
    const { supabase, response } = createSupabaseMiddlewareClient(request)

    // Refresh session if expired - required for Server Components
    await supabase.auth.getSession()

    return response

  } catch (e) {

    // If you are here, a Supabase client could not be created!
    return NextResponse.next({
      request: {
        headers: request.headers,
      },
    })
  }

}
