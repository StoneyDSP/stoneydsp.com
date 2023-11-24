// import { createClient } from '@/utils/supabase/ssr/server'
import createSupabaseServerSideClient from '@/utils/supabase/ssr/server'
import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { type EmailOtpType } from '@supabase/supabase-js'
import { cookies } from 'next/headers'
import { NextResponse, type NextRequest } from 'next/server'

export async function GET(request: NextRequest): Promise<NextResponse<unknown>> {

  const requestHeaders = new Headers(request.headers)
  const requestUrl = new URL(request.url)
  const { searchParams, origin } = requestUrl
  const token_hash = searchParams.get('token_hash')
  const type = searchParams.get('type') as EmailOtpType | null
  const next = searchParams.get('next') ?? '/'

  if (token_hash && type) {

    const cookieStore = cookies()
    const supabase = createSupabaseServerSideClient(cookieStore)

    const { error } = await supabase.auth.verifyOtp({
      type,
      token_hash,
    })

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

  // return the user to an error page with instructions
  return NextResponse.redirect(new URL(`/auth/auth-error?message=\'No exchange code\'`, origin), {
    status: 401,
    headers: requestHeaders
  })
}
