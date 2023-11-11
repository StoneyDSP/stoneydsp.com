import NavMenu from '@/components/elements/nav/menu/menu'
import AuthButton from '@/components/elements/nav/account/login'
import { createClient } from '@/utils/supabase/server'
import Link from 'next/link'
import { Suspense } from 'react'
import { cookies } from 'next/headers'

export default async function Nav() {

  const cookieStore = cookies()

  const canInitSupabaseClient = () => {
    try {
      createClient(cookieStore)
      return true
    } catch (e) {
      return false
    }
  }

  const isSupabaseConnected = canInitSupabaseClient()

  return (
    <nav className='tableRowEven'>
      <div className="w-full max-w-4xl flex justify-between gap-8 items-center p-3 text-sm text-foreground">

        <a
          className="
            py-2
            px-3
            flex
            rounded-md
            no-underline
            transition-colors
            bg-green-500
            hover:bg-purple-400
            border-2
            hover:border-transparent
            "
          href="/"
          rel="noreferrer"
        >
          <span className="text-lg font-semibold text-center text-white">
            StoneyDSP
          </span>

        </a>

        <Suspense>
          <NavMenu />
        </Suspense>

        {/* {user ? (
          <div className="flex items-center gap-4">
            <Link href="/account" target="_self">Hey, {user.email}! ({session?.user.role})</Link>
            <LogoutButton />
          </div>
          ) : (
          <Link
            href="/login"
            className="py-2 px-3 flex rounded-md no-underline bg-btn-background hover:bg-btn-background-hover"
          >
            Login
          </Link>
        )} */}

        <span className="text-xs font-light text-center">
          Systems, Web, Audio & Graphics
        </span>

        {/* <Link
          href="/"
          className="
            py-2
            px-3
            flex
            rounded-md
            no-underline
            transition-colors
            bg-green-500
            hover:bg-purple-400
            border-2
            hover:border-transparent
            "
        >
          <span className='font-bold text-center text-white'>
            Login
          </span>
        </Link> */}

        {isSupabaseConnected && <AuthButton />}

      </div>
    </nav>
  )
}
