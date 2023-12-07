import { NextResponse, type NextRequest } from 'next/server'
import { headers, cookies } from 'next/headers'
import { createServerClient, type CookieOptions } from '@supabase/ssr'
import parseNextRequest from '@/lib/parse/next/request'

export const runtime = 'edge'

export async function POST(nextRequest: NextRequest) {

  const { data: { request }, error } = await parseNextRequest(nextRequest)

  if (!error) {

    const origin = headers().get('origin')

    const formData = await request.formData()

    const email = formData.get('email') as string
    const password = formData.get('password') as string
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

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (!error) {
      return NextResponse.redirect(new URL(`/account`, request.nextUrl.origin), {
        status: 302,
      })
    }

    return NextResponse.redirect(new URL(`/login?message=${error!.message}`, request.nextUrl.origin), {
      status: 302,
    })
  }

  return NextResponse.redirect(new URL(`/login?message=${error!.message}`, request.nextUrl.origin), {
    status: 302,
  })
}
