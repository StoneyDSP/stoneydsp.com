import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { type NextRequest, NextResponse } from 'next/server'

import { Database } from '@/types_db'

export const dynamic = 'force-dynamic'

export async function POST(req: NextRequest) {
  const requestUrl = new URL(req.url)
  const cookieStore = cookies()
  const supabase = createRouteHandlerClient<Database>({ cookies: () => cookieStore })

  // Check if we have a session
  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (session) {
    await supabase.auth.signOut()
  }

  // return NextResponse.redirect(new URL('/login', requestUrl.origin), {
  //   status: 302,
  // })

  // return NextResponse.redirect(`${requestUrl.origin}/login`, {
  //   // a 301 status is required to redirect from a POST to a GET route
  //   status: 301,
  // })

  return NextResponse.redirect(new URL('/login', requestUrl.origin), {
    // a 301 status is required to redirect from a POST to a GET route
    status: 301,
  })
}
