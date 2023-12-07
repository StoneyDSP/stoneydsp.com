import { getPublicSiteURL } from '@/utils/headers/URL'
import { redirect } from 'next/navigation'
import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"
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

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value
        },
      },
    }
  )

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
