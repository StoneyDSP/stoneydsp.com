import createSupabaseServerSideClient from '@/utils/supabase/ssr/server'
import { cookies } from 'next/headers'
import { NextResponse, type NextRequest } from 'next/server'

export async function POST(request: NextRequest): Promise<NextResponse<unknown>> {

  const requestHeaders = new Headers(request.headers)
  const requestUrl = new URL(request.url)
  const { searchParams, origin } = requestUrl
  const next = searchParams.get('next') ?? '/'

  const formData = await request.formData()
  const email = String(formData.get('email'))
  const password = String(formData.get('password'))

  const cookieStore = cookies()
  const supabase = createSupabaseServerSideClient(cookieStore)

  await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${origin}/auth/callback`,
    },
  })

  return NextResponse.redirect(new URL(next, origin), {
    status: 301,
    headers: requestHeaders
  })
}
