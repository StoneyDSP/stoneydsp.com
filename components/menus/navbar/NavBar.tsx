import { getSession, getUser, } from '@/app/supabase-server'
import { redirect } from 'next/navigation'
import BrandBadge from "@/components/StoneyDSPBadge"
import LogoutButton from "@/components/LogoutButton"
import Link from "next/link"

export default async function NavBar() {

  const [ session, user, ] = await Promise.all([
    getSession(),
    getUser(),
  ])

  if (!session) {
    return redirect('/login')
  }

  return (
    <nav className="">
      <BrandBadge />
      <div className="">
        {user ? (
          <div className="">
            <Link href="/account" target="_self">Hey, {user.email}! ({session.user.role})</Link>
            <LogoutButton />
          </div>
        ) : (
          <Link
            href="/login"
            className=""
          >
            Login
          </Link>
        )}
      </div>
    </nav>
  )
}
