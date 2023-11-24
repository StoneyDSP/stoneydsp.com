import AccountForm from '@/components/layouts/Account'
import { getPublicSiteURL } from '@/utils/headers/URL'
import { createSupabaseServerSideClient } from '@/utils/supabase/ssr/server'
import { Metadata } from 'next'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export const metadata: Metadata = {
  title: 'Account',
  description: 'User account area.',
  alternates: {
    canonical: new URL('account', getPublicSiteURL())
  }
}

export default async function AccountPage(): Promise<JSX.Element> {

  const cookieStore = cookies()

  const supabase = createSupabaseServerSideClient(cookieStore)

  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) {
    // this is a protected route - only users who are signed in can view this route
    redirect('/login')
  }

  return (
    <AccountForm session={session} />
  )
}
