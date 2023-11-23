import createSupabaseServerSideClient from '@/utils/supabase/ssr/server'
import { cookies } from 'next/headers'
import { NextResponse, type NextRequest } from 'next/server'

export async function POST(request: NextRequest): Promise<NextResponse<unknown>> {

  const requestUrl = new URL(request.url)
  const formData = await request.formData()
  const email = String(formData.get('email'))
  const password = String(formData.get('password'))
  const cookieStore = cookies()

  const supabase = createSupabaseServerSideClient(cookieStore)

  await supabase.auth.signInWithPassword({
    email,
    password,
  })

  return NextResponse.redirect(requestUrl.origin, {
    status: 301,
  })
}
