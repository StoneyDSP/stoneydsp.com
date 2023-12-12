import { NextResponse, type NextRequest } from 'next/server'
import { cookies } from 'next/headers'
import createSupabaseServerClient from '@/lib/supabase/ssr/server'

export const runtime = 'edge'

export async function POST(request: NextRequest) {

  const cookieStore = cookies()
  const supabase = createSupabaseServerClient(cookieStore)

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'github',
  })

  if (!error) {
    return NextResponse.redirect(new URL(`/account`, request.nextUrl.origin), {
      status: 302,
    })
  }

  return NextResponse.redirect(new URL(`/login?message=${error.message}`, request.nextUrl.origin), {
    status: 302,
  })
}
