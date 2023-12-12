import { NextResponse, type NextRequest } from 'next/server'
import { cookies } from 'next/headers'
import createSupabaseServerClient from '@/lib/supabase/ssr/server'

export const runtime = 'edge'

export async function POST(request: NextRequest) {

  const formData = await request.formData()

  const email = formData.get('email') as string
  const password = formData.get('password') as string
  const cookieStore = cookies()
  const supabase = createSupabaseServerClient(cookieStore)

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${request.nextUrl.origin}/auth/v1/callback`,
    },
  })

  if (!error) {
    return NextResponse.redirect(new URL(`/login?message=Check email to continue sign in process`, request.nextUrl.origin), {
      status: 302,
    })
  }

  return NextResponse.redirect(new URL(`/login?message=${error.message}`, request.nextUrl.origin), {
    status: 302,
  })
}
