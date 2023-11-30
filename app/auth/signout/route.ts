'use server'
import 'server-only'
import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { userAgent, NextResponse, type NextRequest } from 'next/server'

export async function POST(req: NextRequest) {

  const requestHeaders = new Headers(req.headers)
  const url = new URL(req.url)
  const { searchParams, origin } = url
  const next = searchParams.get('next') ?? '/'

  // const url = req.url
  // const origin = req.nextUrl.origin

  // console.log('called signout route')

  try {

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

    // Check if we have a session
    const { data: { session }, error } = await supabase.auth.getSession()

    if (!error) {

      if (session) {

        try {
          console.log('logging out...')
          await supabase.auth.signOut()
          // Middleware response was successful!
          const { isBot } = userAgent(req)
          const visitor = isBot ? 'Bot' : 'Human'
          const travelling = isBot ? 'crawling' : 'visiting'
          const country = (req.geo && req.geo.country) || 'Earth'
          const city = (req.geo && req.geo.city) || 'Nowhere'
          const region = (req.geo && req.geo.region) || 'Somewhere'
          const ip = (req.ip) || 'Visitor'
          // const agent = (request.headers.get('user-agent')) || 'Agent Unknown'

          console.log(` \u{2713} Route - ${req.method} ${req.url} :: ${visitor} ${ip} ${travelling} from ${city}, ${region}, ${country} with ${'user agent' /* agent */}.`)

          return NextResponse.redirect(new URL('/', req.url), {
            status: 302,
          })

        } catch(error) {

          const e: any = error
          console.log(` \u{2715} Route - ${req.method} ${req.url} :: Error Supabase Route Handler on '/auth/signout': ${e}`)

          throw new Error(e)
        }

      } else {

        console.log('no session to log out from')
        throw new Error('no session to log out from')
      }
    }

    console.log(` \u{2715} Route - ${req.method} ${req.url} :: Error Supabase Route Handler on '/auth/signout': ${error.message}`)

    throw error

  } catch(e) {

    const error: any = e
    console.log(` \u{2715} Route - ${req.method} ${req.url} :: Error Supabase Route Handler on '/auth/signout': ${error}`)

    throw new Error(error)
  }

}


// import { cookies } from 'next/headers'
// import { NextResponse } from 'next/server'
// import { createSupabaseServerSideClient } from '@/utils/supabase/ssr/server'

// export async function POST(request: Request) {

//   const requestHeaders = new Headers(request.headers)
//   const requestUrl = new URL(request.url)
//   const { searchParams, origin } = requestUrl
//   const next = searchParams.get('next') ?? '/'

//   let response = NextResponse.redirect(new URL(next, origin), {
//     status: 302,
//     headers: requestHeaders
//   })

//   const cookieStore = cookies()
//   const supabase = createSupabaseServerSideClient(cookieStore)

//   // Check if we have a session
//   const {
//     data: { session },
//   } = await supabase.auth.getSession()

//   if (session) {
//     await supabase.auth.signOut()
//   }

//   return response
// }
