import { createClient } from '@/lib/supabase/server'
import { cookies } from 'next/headers'
import { NextResponse, type NextRequest } from 'next/server'

export async function POST(request: NextRequest) {

  if (request.method !== 'POST') {
    return Error('This route only accepts POST requests...')
  }

  console.log('called signInWithPassword route')

  try {
    const requestHeaders = new Headers(request.headers)

    const requestUrl = new URL(request.url)
    const { searchParams, origin } = requestUrl
    const next = searchParams.get('next') ?? '/'

    const formData = await request.formData()
    const email = String(formData.get('email'))
    const password = String(formData.get('password'))

    const cookieStore = cookies()
    const supabase = createClient(cookieStore)

    await supabase.auth.signInWithPassword({
      email,
      password,
    })

    return NextResponse.redirect(new URL(next, origin), {
      status: 301,
      headers: requestHeaders
    })

  }  catch(errorSupabaseRouteHandler) {

    const e: any = errorSupabaseRouteHandler
    console.log(`Error Supabase Route Handler: ${e}`)

    return NextResponse.redirect(new URL('/', request.nextUrl), {
      ...request
    })
  }
}
