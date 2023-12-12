import { cookies } from 'next/headers'
import { NextResponse, type NextRequest } from 'next/server'
import createSupabaseServerClient from '@/lib/supabase/ssr/server'

export const runtime = 'edge'

export async function GET(request: NextRequest) {

  const cookieStore = cookies()
  const supabase = createSupabaseServerClient(cookieStore)
  const { searchParams } = new URL(request.url)
  const code = searchParams.get('code')

  if (code) {
    await supabase.auth.exchangeCodeForSession(code)
  }

  return NextResponse.redirect(new URL('/account', request.url))
}
