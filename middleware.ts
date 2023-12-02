import { userAgent, NextResponse, type NextRequest } from 'next/server'
import { createClient } from '@/lib/supabase/middleware'

export default async function middleware(request: NextRequest) {

  try {

    const { supabase, response } = await createClient(request)

    try {

      // Refresh session if expired - required for Server Components
      const { data: { session }, error }  = await supabase.auth.getSession()

      if (!error) {

        try {

          try {

            let sessionData: string = 'session not found'
            let userData: string = 'user not found'

            if (session) {
              sessionData = 'session found'
            }

            try {

              const { data: { user } } = await supabase.auth.getUser()

              if(user) {

                userData = 'user found'

                // if user is signed in and the current path is /login redirect the user to /account
                if (request.nextUrl.pathname === '/login') {

                  return NextResponse.redirect(new URL('/account', request.nextUrl.origin))
                }

              }

              // // // if user is not signed in and the current path is not / redirect the user to /
              // if (!user && request.nextUrl.pathname === '/account') {
              //   return NextResponse.redirect(new URL('/login', request.nextUrl.origin))
              // }

              // Middleware response was successful!
              const { isBot } = userAgent(request)
              const visitor = isBot ? 'Bot' : 'Human'
              const travelling = isBot ? 'crawling' : 'visiting'
              const country = (request.geo && request.geo.country) || 'Earth'
              const city = (request.geo && request.geo.city) || 'Nowhere'
              const region = (request.geo && request.geo.region) || 'Somewhere'
              const ip = (request.ip) || 'Visitor'
              const agent = (request.headers.get('user-agent')) || 'Agent Unknown'

              console.log(` \u{2713} ${visitor} ${ip} ${travelling} from ${city}, ${region}, ${country} with ${agent}.`)

              return response

            } catch(e) {

              const error: any = e
              console.log(` \u{2715} Middleware - ${request.method} ${request.url} :: Error fetching Supabase Middleware Client user data: ${error}`)
              throw new Error(error)
            }

          } catch(e) {

            const error: any = e
            console.log(` \u{2715} Middleware - ${request.method} ${request.url} :: Error refreshing Supabase Middleware Client Auth data: ${error}`)
            throw new Error(error)
          }

        } catch (e) {

          const error: any = e
          console.log(` \u{2715} Middleware - ${request.method} ${request.url} :: Error returning Supabase Middleware Client Auth data: ${error}`)

          throw new Error(error)
        }
      }

      console.log(` \u{2715} Middleware - ${request.method} ${request.url} :: Error getting Supabase Middleware Client Auth data: ${error.message}`)
      throw error

    } catch(e) {

      const error: any = e
      console.log(` \u{2715} Middleware - ${request.method} ${request.url} :: Error creating Supabase Middleware Client Auth data: ${error}`)

      throw new Error(error)
    }

  } catch (e) {

    const error: any = e
    console.log(` \u{2715} Middleware - ${request.method} ${request.url} :: Error creating Supabase Middleware Client response: ${error}`)

    throw new Error(error)
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
      source: '/((?!api|_next/static|_next/image|favicon.ico|manifest.webmanifest|robots.txt|sitemap.xml|images|www_sitemap.xml).*)',
      missing: [
        { type: 'header', key: 'next-router-prefetch' },
        { type: 'header', key: 'purpose', value: 'prefetch' },
      ],
    },
  ],
}
