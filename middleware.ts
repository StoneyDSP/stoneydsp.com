import { NextResponse, type NextRequest } from 'next/server'
import {  createSupabaseMiddlewareClient, parseRequest } from '@/utils/supabase/ssr/middleware'

export async function middleware(request: NextRequest) {

  // Parse the request URL
  const { url, hostname, path, searchParams } = await parseRequest(request)

  // Create Supabase Middleware Client
  const { supabase, response } = await createSupabaseMiddlewareClient(request)

  // Refresh session if expired - required for Server Components
  const { data: { session }, error } = await supabase.auth.getSession()

  if (!session) {
    // console.log('No session...')
    // return non-users to the www dir
    return NextResponse.rewrite(
      new URL(`/www${path === "/" ? "" : path}`, url),
      response
    )
  }

  if (!error) {
    console.log('No error...')
    // App router
    switch (hostname) {

      case `www.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`:
        // rewrites for www pages
        return NextResponse.rewrite(new URL(`/www${path === "/" ? "" : path}`, url), response)

      case `api.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`:
        // rewrites for api pages
        return NextResponse.rewrite(new URL(`/api${path === "/" ? "" : path}`, url), response)

      case `app.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`:
        // rewrites for app pages
        return NextResponse.rewrite(new URL(`/app${path === "/" ? "" : path}`, url), response)

      case `blog.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`:
        // rewrites for blog pages
        return NextResponse.rewrite(new URL(`/blog${path === "/" ? "" : path}`, url), response)

      case `docs.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`:
        // rewrites for docs pages
        return NextResponse.rewrite(new URL(`/docs${path === "/" ? "" : path}`, url), response)

      default:
        // rewrite everything else to the www dir
        return NextResponse.rewrite(new URL(`/www${path === "/" ? "" : path}`, url), response)
      }
  }

  console.log(`Supabase Middleware Client returned AuthError: ${error}`)
  // return errored requests to the www dir
  return NextResponse.redirect(
    new URL(`/www${path === "/" ? "" : path}`, url),
    response
  )
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
