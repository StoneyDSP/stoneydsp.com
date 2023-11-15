// import { createClient } from '@/utils/supabase/ssr/server'
import { createSupabaseServerSideClient } from '@/utils/supabase/ssr'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {

  const cookieStore = cookies()

  const supabase = createSupabaseServerSideClient(cookieStore)

  // Check if we have a session
  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (session) {
    await supabase.auth.signOut()
  }

  return NextResponse.redirect(new URL('/', req.url), {
    status: 302,
  })
}

// import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
// import { cookies } from 'next/headers'
// import { type NextRequest, NextResponse } from 'next/server'

// export async function POST(req: NextRequest) {
//   const supabase = createRouteHandlerClient({ cookies })

//   // Check if we have a session
//   const {
//     data: { session },
//   } = await supabase.auth.getSession()

//   if (session) {
//     await supabase.auth.signOut()
//   }

//   return NextResponse.redirect(new URL('/', req.url), {
//     status: 302,
//   })
// }
