import { createClient } from '@/lib/supabase/server'
import { cookies } from 'next/headers'
import { NextResponse, type NextRequest } from 'next/server'

export async function POST(request: NextRequest) {

  // if (request.method !== 'POST') {
  //   return Error('This route only accepts POST requests...')
  // }

  console.log('called signInWithOTPEmail route')

  try {

    const requestHeaders = new Headers(request.headers)

    const requestUrl = new URL(request.url)
    const { searchParams, origin } = requestUrl
    const next = searchParams.get('next') ?? '/'

    const formData = await request.formData()
    const email = String(formData.get('email'))

    const cookieStore = cookies()
    const supabase = createClient(cookieStore)

    const { data, error } = await supabase.auth.signInWithOtp({
      email: email,
      options: {
        // set this to false if you do not want the user to be automatically signed up
        shouldCreateUser: false,
      },
    })

    if (!error) {
      return NextResponse.redirect(new URL(next, origin), {
        status: 301,
        headers: requestHeaders
      })
    }

    const e: any = error

    throw new Error(e)

  }  catch(errorSupabaseRouteHandler) {

    const e: any = errorSupabaseRouteHandler
    console.log(`Error Supabase Route Handler: ${e}`)

    throw new Error(e)
  }
}
