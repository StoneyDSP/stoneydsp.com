import { Metadata } from 'next'
import { getPublicSiteURL } from '@/lib/url'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import Login from './content'
// import AuthForm from './auth-form'

import createSupabaseServerClient from '@/lib/supabase/ssr/server'

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
  const supabase = createSupabaseServerClient(cookieStore)

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
