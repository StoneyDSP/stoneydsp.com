import { Metadata } from 'next'
import { getPublicSiteURL } from '@/lib/url'
import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import Login from './content'
// import AuthForm from './auth-form'

// import { createSupabaseServerSideClient } from '@/utils/supabase/ssr/server'




export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Login',
  description: 'Systems, Web, Audio & Graphics',
  alternates: {
    canonical: new URL('/projects', getPublicSiteURL())
  }
}

export default async function LoginPage({
  searchParams,
}: {
  searchParams: { message: string }
}) {

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

  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (session) {
    redirect('/account')
  }

  return (
    <Login searchParams={searchParams} />
  )

    // return (<AuthForm />)
}
