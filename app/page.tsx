import HomeContent from '@/app/www/content'
import { getPublicSiteURL } from '@/utils/headers/URL'
import { Metadata } from 'next'
// import { createClient } from '@/utils/supabase/server'
// import { cookies } from 'next/headers'

// export const dynamic = 'force-dynamic'

export const description = 'Systems, Web, Audio & Graphics'
export const canonical = new URL(getPublicSiteURL())

export const metadata: Metadata = {
  description: description,
  alternates: {
    canonical: canonical
  }
}

export default async function Index() {

  // const cookieStore = cookies()

  // const canInitSupabaseClient = () => {
  //   // This function is just for the interactive tutorial.
  //   // Feel free to remove it once you have Supabase connected.
  //   try {
  //     createClient(cookieStore)
  //     return true
  //   } catch (e) {
  //     return false
  //   }
  // }

  // const isSupabaseConnected = canInitSupabaseClient()

  return (
    <HomeContent />
  )
}
