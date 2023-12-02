'use server'
import 'server-only'
import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { userAgent, NextResponse, type NextRequest } from 'next/server'
import { revalidateTag } from 'next/cache'

export const revalidateCollectionTag = async () => {
  'use server'

  console.log('revaliding tag \'collection\'')
  revalidateTag('collection')
}

export const supabaseAuthStateChange = async (request: NextRequest) => {
  'use server'

  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  })

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


  const { data, error } = await supabase.auth.getSession()

  if (!error) {

    supabase.auth.onAuthStateChange((event, session) => {

      console.log(`Auth event callback: ${event}`)
      if (session !== null) {

        // delete cookies on sign out
        if (event === 'SIGNED_OUT') {
          //  || event === 'USER_DELETED' - condition doesn't exist?

          // document.cookie = `my-access-token=; path=/; expires=${expires}; SameSite=Lax; secure`
          // document.cookie = `my-refresh-token=; path=/; expires=${expires}; SameSite=Lax; secure`

          const expires = new Date(0) //.toUTCString()

          request.cookies.set({
            name: "my-access-token",
            value: '',
            // path: '/',
            // expires: expires,
            // sameSite: "lax",
            // secure: true,
          })
          request.cookies.set({
            name: "my-refresh-token",
            value: '',
            // path: '/',
            // expires: expires,
            // sameSite: "lax",
            // secure: true,
          })
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          })
          response.cookies.set({
            name: "my-access-token",
            value: '',
            path: '/',
            expires: expires,
            sameSite: "lax",
            secure: true,
          })
          response.cookies.set({
            name: "my-refresh-token",
            value: '',
            path: '/',
            expires: expires,
            sameSite: "lax",
            secure: true,
          })

        } else if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {

          const maxAge = 100 * 365 * 24 * 60 * 60 // 100 years, never expires
          // document.cookie = `my-access-token=${session.access_token}; path=/; max-age=${maxAge}; SameSite=Lax; secure`
          // document.cookie = `my-refresh-token=${session.refresh_token}; path=/; max-age=${maxAge}; SameSite=Lax; secure`

          request.cookies.set({
            name: "my-access-token",
            value: session.access_token,
            // path: '/',
            // maxAge: maxAge,
            // sameSite: "lax",
            // secure: true,
          })
          request.cookies.set({
            name: "my-refresh-token",
            value: session.refresh_token,
            // path: '/',
            // maxAge: maxAge,
            // sameSite: "lax",
            // secure: true,
          })
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          })
          response.cookies.set({
            name: "my-stoneydsp-access-token",
            value: session.access_token,
            path: '/',
            maxAge: maxAge,
            sameSite: "lax",
            secure: true,
          })
          response.cookies.set({
            name: "my-stoneydsp-refresh-token",
            value: session.refresh_token,
            path: '/',
            maxAge: maxAge,
            sameSite: "lax",
            secure: true,
          })
        }
      }
    })

    return { response }
  }

  throw error
}
