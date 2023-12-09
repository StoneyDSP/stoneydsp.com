import { NextResponse, type NextRequest } from 'next/server'
import { headers, cookies } from 'next/headers'
import { createServerClient, type CookieOptions } from '@supabase/ssr'

export const runtime = 'edge'

export async function POST(request: NextRequest) {

  const origin = headers().get('origin')

  const cookieStore = cookies()
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value
        },
        set(name: string, value: string, options: CookieOptions) {
          cookieStore.set({ name, value, ...options })
        },
        remove(name: string, options: CookieOptions) {
          cookieStore.set({ name, value: '', ...options })
        },
      },
    }
  )

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
