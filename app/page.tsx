import Home from '@/app/home/home'
import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'

// export const dynamic = 'force-dynamic'

export default async function Index() {

  const cookieStore = cookies()

  const canInitSupabaseClient = () => {
    // This function is just for the interactive tutorial.
    // Feel free to remove it once you have Supabase connected.
    try {
      createClient(cookieStore)
      return true
    } catch (e) {
      return false
    }
  }

  const isSupabaseConnected = canInitSupabaseClient()

  return (
    <Home />
  )
}
