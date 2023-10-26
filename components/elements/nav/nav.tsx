import Badge from '@/components/elements/badge/badge'

import styles from './nav.module.css'

export default async function Nav() {


  return (
    <nav className={styles.nav}>
      <div className="w-full max-w-4xl flex justify-between items-center p-3 text-sm text-foreground">
        <Badge />
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
