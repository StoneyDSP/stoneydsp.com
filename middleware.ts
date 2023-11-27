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

  if (!session && path !== "/login") {
    return NextResponse.redirect(new URL("/login", request.url), response);
  } else if (session && path == "/login") {
    return NextResponse.redirect(new URL("/account", request.url), response);
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
