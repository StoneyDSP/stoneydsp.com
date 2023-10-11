import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import AccountForm from './account-form'
import Footer from '@/components/Footer'
import BackButton from '@/components/BackButton'
import { Database } from '@/types_db'

export default async function Account() {
  const cookieStore = cookies()
  const supabase = createServerComponentClient<Database>({ cookies: () => cookieStore })

  const {
    data: { session },
  } = await supabase.auth.getSession()

  return (
    <div className="w-full flex flex-col items-center">
      <AccountForm session={session} />
    </div>
  )
}
