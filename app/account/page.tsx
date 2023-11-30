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

  // console.log(` \u{25CB} AccountPage() :: Returning new ${metadata.title} Page... `)

  // try {

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

    if (!error) {

      if (!session) {
        console.log(` \u{2713} AccountPage() :: No session, redirecting to /login`)
        return redirect('/login')
      }

      return (
        <AccountForm
          // session={session}
        />
      )
    }

    console.log(` \u{2713} AccountPage() :: Authentication error: ${error.message}`)

    throw error

  // } catch(e) {

  //   const error: any = e
  //   console.log(` \u{2715} AccountPage() :: Èrror returning new ${metadata.title} Page...: ${error}`)
  //   return Error(error)
  // }
}
