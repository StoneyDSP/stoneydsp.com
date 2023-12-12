import { getPublicSiteURL } from '@/lib/url'
import { redirect } from 'next/navigation'
import { cookies } from "next/headers"
import createSupabaseServerClient from '@/lib/supabase/ssr/server'
import AccountForm from "./account-form"

import { Metadata } from 'next'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Account',
  description: 'Systems, Web, Audio & Graphics',
  alternates: {
    canonical: new URL('projects', getPublicSiteURL())
  }
}

export default async function AccountPage() {

  const cookieStore = cookies()
  const supabase = createSupabaseServerClient(cookieStore)

  const {
    data: { session }, error,
  } = await supabase.auth.getSession()



  if (!session) {
    return redirect(`/login?message=Could not authenticate user`)
  }

  return (
    <AccountForm
      // session={session}
    />
  )
}
