import createSupabaseServerSideClient from '@/utils/supabase/ssr/server'
import { NextResponse} from 'next/server'
import { cookies } from 'next/headers'

/** The `/auth/callback` route is required for the server-side auth flow implemented
 * by the Auth Helpers package. It exchanges an auth code for the user's session.
 * https://supabase.com/docs/guides/auth/auth-helpers/nextjs#managing-sign-in-with-code-exchange
*/
export async function GET(request: Request){

  const requestHeaders = new Headers(request.headers)
  const requestUrl = new URL(request.url)
  const { searchParams, origin } = requestUrl
  // if "next" is in param, use it as the redirect URL
  const next = searchParams.get('next') ?? '/'
  const code = searchParams.get('code')

  if (code) {

    const cookieStore = cookies()
    const supabase = createSupabaseServerSideClient(cookieStore)
    const { error } = await supabase.auth.exchangeCodeForSession(code)

    if (!error) {

      // return the user to "next"
      return NextResponse.redirect(new URL(next, origin), {
        status: 200,
        headers: requestHeaders
      })
    }

    // return the user to an error page with instructions
    return NextResponse.redirect(new URL(`/auth/auth-error?message=\'${error}\'`, origin), {
      status: 500,
      headers: requestHeaders
    })
  }

  return NextResponse.redirect(new URL(`/auth/auth-error?message=\'No exchange code\'`, origin), {
    status: 401,
    headers: requestHeaders
  })
}
