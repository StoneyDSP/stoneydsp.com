import { NextRequest } from 'next/server'
import { createSupabaseServerSideClient } from '@/utils/supabase/ssr/server'
import { cookies } from 'next/headers'

export async function getSupabaseUser(req: NextRequest) {

  const cookieStore = cookies()

  const canInitSupabaseClient = () => {
    try {
      createSupabaseServerSideClient(cookieStore)
      return true
    } catch (e) {
      return false
    }
  }

  const isSupabaseConnected = canInitSupabaseClient()

  if (!isSupabaseConnected) {
    return null
  }

  const supabase = createSupabaseServerSideClient(cookieStore)

  const refreshToken = req.cookies.get('my-refresh-token')?.value
  const accessToken = req.cookies.get('my-access-token')?.value

  if (refreshToken && accessToken) {
    await supabase.auth.setSession({
      refresh_token: refreshToken,
      access_token: accessToken,

    })
  } else {
    // make sure you handle this case!
    throw new Error('User is not authenticated.')
  }

  // returns user information
  const user = await supabase.auth.getUser()

  return user
}
