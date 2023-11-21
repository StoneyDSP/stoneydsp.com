import createSupabaseServerSideClient from '@/utils/supabase/ssr/server'
import { cookies } from 'next/headers'
import AccountForm from '@/components/layouts/Account'
import { redirect } from 'next/navigation'

export default async function AccountPage() {

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
