import createSupabaseServerSideClient from '@/utils/supabase/ssr/server'
import { cookies } from 'next/headers'
import AccountForm from '@/components/layouts/Account'
import { redirect } from 'next/navigation'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Account',
  description: 'User account area.',
  alternates: {
    canonical: 'https://www.stoneydsp.com/account'
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
