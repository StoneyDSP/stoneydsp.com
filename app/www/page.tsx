import HomeContent from '@/app/www/content'
import { getPublicSiteURL } from '@/utils/headers/URL'
import { Metadata } from 'next'
// import { cookies } from 'next/headers'

// export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  description: 'Systems, Web, Audio & Graphics',
  alternates: {
    canonical: new URL(getPublicSiteURL())
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
