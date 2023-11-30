import { createClient } from '@/lib/supabase/server'
import { NextResponse, type NextRequest } from 'next/server'
import { cookies } from 'next/headers'

export async function GET(request: NextRequest) {

  // if (request.method !== 'GET') {
  //   throw new Error('This route only accepts GET requests...')
  // }

  try {

    // The `/auth/callback` route is required for the server-side auth flow implemented
    // by the Auth Helpers package. It exchanges an auth code for the user's session.
    // https://supabase.com/docs/guides/auth/auth-helpers/nextjs#managing-sign-in-with-code-exchange
    const requestUrl = new URL(request.url)
    const code = requestUrl.searchParams.get('code')

    try {

      if (code) {
        const cookieStore = cookies()
        const supabase = createClient(cookieStore)
        await supabase.auth.exchangeCodeForSession(code)
      }

      try {

        // URL to redirect to after sign in process completes
        return NextResponse.redirect(requestUrl.origin)

      } catch(e) {

        const error: any = e
        console.log(`Error on route '/auth/callback': ${error}`)
        throw new Error(error)
      }

    } catch(e) {

      const error: any = e
      console.log(`Error on route '/auth/callback': ${error}`)
      throw new Error(error)
    }

  } catch(e) {

    const error: any = e
    console.log(`Error on route '/auth/callback': ${error}`)
    throw new Error(error)

  }
}
