import { NextResponse, type NextRequest } from 'next/server'
import { cookies } from 'next/headers'
import createSupabaseServerClient from '@/lib/supabase/ssr/server'
import parseNextRequest from '@/lib/parse/next/request'

export const runtime = 'edge'

export async function POST(nextRequest: NextRequest) {

  const { data: { request }, error } = await parseNextRequest(nextRequest)

  if (!error) {

    const formData = await request.formData()

    const email = formData.get('email') as string
    const password = formData.get('password') as string
    const cookieStore = cookies()
    const supabase = createSupabaseServerClient(cookieStore)

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    console.log('error: %s', error)

    // if (!error) {
      return NextResponse.redirect(new URL(`/account`, request.nextUrl.origin), {
        status: 302,
      })
    // }

    // return NextResponse.redirect(new URL(`/login?message=${error!.message}`, request.nextUrl.origin), {
    //   status: 302,
    // })
  }

  return NextResponse.redirect(new URL(`/login?message=${error!.message}`, request.nextUrl.origin), {
    status: 302,
  })
}
