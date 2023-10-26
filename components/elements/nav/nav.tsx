// import { getSession, getUser } from '@/utils/supabase-server'
import BrandBadge from '@/components/StoneyDSPBadge'
// import LogoutButton from '@/components/LogoutButton'
// import Link from 'next/link'

import styles from './nav.module.css'

export default async function Nav() {

  // const [ session, user, ] = await Promise.all([
  //   getSession(),
  //   getUser()
  // ])

  return (
    <nav className={styles.nav}>
      <div className="w-full max-w-4xl flex justify-between items-center p-3 text-sm text-foreground">
        <BrandBadge />
        <div>
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
        </div>
      </div>
    </nav>
  )
}
