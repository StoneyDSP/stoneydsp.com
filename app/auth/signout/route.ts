import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import { createSupabaseServerSideClient } from '@/utils/supabase/ssr/server'

export async function POST(request: Request) {

  const requestHeaders = new Headers(request.headers)
  const requestUrl = new URL(request.url)
  const { searchParams, origin } = requestUrl
  const next = searchParams.get('next') ?? '/'

  let response = NextResponse.redirect(new URL(next, origin), {
    status: 302,
    headers: requestHeaders
  })

  const cookieStore = cookies()
  const supabase = createSupabaseServerSideClient(cookieStore)

  // Check if we have a session
  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (session) {
    await supabase.auth.signOut()
  }

  return response
}
