import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

import type { Database } from '@/types_db'

export const runtime = 'edge'
export const dynamic = 'force-dynamic'

export async function POST(request: Request) {
  const { title } = await request.json()

  const cookieStore = cookies()

  const supabase = createRouteHandlerClient<Database>({
    cookies: () => cookieStore,
  })

  const { data } = await supabase.from('todos').insert({ title }).select()
  return NextResponse.json(data)
}
