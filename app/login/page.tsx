import { Metadata } from 'next'
import { getPublicSiteURL } from '@/utils/headers/URL'
import Login from './content'
// import AuthForm from './auth-form'

import { createSupabaseServerSideClient } from '@/utils/supabase/ssr/server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'


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
  const supabase = createSupabaseServerSideClient(cookieStore)

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
