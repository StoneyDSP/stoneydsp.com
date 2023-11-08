import Badge from '@/components/elements/badge/badge'

// import styles from './nav.module.css'
import NavMenu from '@/components/elements/nav/menu/menu'
import Link from 'next/link'
import { Suspense } from 'react'

export default async function Nav() {


  return (
    <nav
      // className={styles.nav}
    >
      <div className="w-full max-w-4xl flex justify-between gap-8 items-center p-3 text-sm text-foreground">
        <Badge />
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
    <Link
        href="/"
        className="py-2 px-3 flex rounded-md no-underline transition-colors bg-green-700 hover:bg-purple-500 border transition___shadow_off"
      >
        <span className='text-sm font-bold text-center text-foreground'>
          Login
        </span>
    </Link>

      </div>
    </nav>
  )
}
