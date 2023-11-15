'use client'
import 'client-only'
import NavMenu from '@/components/elements/nav/menu/menu'
// import { createClient } from '@/utils/supabase/client'
// import LogoutButton from '@/components/LogoutButton'
import Link from 'next/link'
import { Suspense } from 'react'
import UserButton from '@/components/elements/nav/user'

export default function Nav() {

  // const supabase = createClient()

  // const { data: {user} } = await supabase.auth.getUser()

  return (
    <nav className='tableRowEven'>
      <div className="w-full max-w-4xl flex justify-between gap-8 items-center p-3 text-sm text-foreground">

        <Link
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

        </Link>

        {/* <Suspense fallback={<>Loading...</>}> */}
          <NavMenu />
        {/* </Suspense> */}

        <span className="text-xs font-light text-center">
          Systems, Web, Audio & Graphics
        </span>

        {/* <Link
          href="/login"
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

        {/* {user ? (
          <div className="flex items-center gap-4">
            <Link href="/account" target="_self">Hey, {user.email}! ({session?.user.role})</Link>
            <LogoutButton />
          </div>
          ) : (
          <Link
            href="/login"
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
          </Link>
        )} */}

        <Suspense fallback={<>Loading...</>}>
          <UserButton />
        </Suspense>

      </div>
    </nav>
  )
}
