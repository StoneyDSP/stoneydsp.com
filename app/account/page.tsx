import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { Database } from '../database.types'
import AccountForm from './account-form'

export default async function Account() {
  const cookieStore = cookies()
  const supabase = createServerComponentClient<Database>({ cookies: () => cookieStore })

  const {
    data: { session },
  } = await supabase.auth.getSession()

  return (
    <div className="w-full flex flex-col items-center">
      <div className="animate-in flex flex-col gap-14 opacity-0 max-w-4xl px-3 py-16 lg:py-24 text-foreground">
        <AccountForm session={session} />
      </div>
    </div>
  )
}
