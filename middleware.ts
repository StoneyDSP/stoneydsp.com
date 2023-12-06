import { NextResponse, type NextRequest } from 'next/server'
import { createSupabaseMiddlewareClient } from '@/lib/supabase/middleware'
import parseNextRequest from '@/lib/parse/next/request'
import logRequestToServer from '@/lib/log/request/server'
// import parseError from './lib/parse/error'

export default async function middleware(nextRequest: NextRequest) {

  const { data: { request }, error } = await parseNextRequest(nextRequest)

  if (request! && !error) {

    const { data: { supabase, response } } = createSupabaseMiddlewareClient(request!)

    const { data: { session }, error } = await supabase.auth.getSession()


    // Middleware response was successful!
    logRequestToServer(request)
    // return response
    return NextResponse.rewrite(new URL(`/www${request.nextUrl.pathname}`, request.nextUrl.origin), {
      headers: response.headers,
      status: 200,
      statusText: 'ok'
    })

  }

  // Middleware response was unsuccessful!
  logRequestToServer(request!)
  return NextResponse.redirect(new URL(`/?message=${error?.message}`, request!.url ), {
    status: 400,
    statusText: error?.message,
  })
}







// async function supa(request: NextRequest) {
//   const { supabase, response } = createSupabaseMiddlewareClient(request)

//   // Refresh session if expired - required for Server Components
//   const { data: { session }, error }  = await supabase.auth.getSession()

//   if (!error) {

//     if (request.nextUrl.hostname === `www.${process.env.NEXT_PUBLIC_HOST_NAME}`) {
//       return NextResponse.rewrite('/www', {
//         headers: response.headers,
//         request: {
//           headers: request.headers
//         }
//       })
//     }
//   }
// }

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
      source: '/((?!api|_next/static|_next/image|favicon.ico|manifest.webmanifest|robots.txt|images).*)',
      missing: [
        { type: 'header', key: 'next-router-prefetch' },
        { type: 'header', key: 'purpose', value: 'prefetch' },
      ],
    },
  ],
}
