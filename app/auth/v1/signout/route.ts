import { cookies } from 'next/headers'
import { NextResponse, type NextRequest } from 'next/server'
import createSupabaseServerClient from '@/lib/supabase/ssr/server'

export const runtime = 'edge'

export async function POST(request: NextRequest) {

  const cookieStore = cookies()
  const supabase = createSupabaseServerClient(cookieStore)

  // Check if we have a session
  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (session) {
    await supabase.auth.signOut()
  }

  return NextResponse.redirect(new URL('/login', request.nextUrl), {
    status: 302,
  })
}
