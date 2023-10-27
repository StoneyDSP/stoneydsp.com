'use client'
import { usePathname } from 'next/navigation'
import LogoutButton from '@/components/LogoutButton'
import Link from 'next/link'

export default function NavMenu() {

  const pathname = usePathname()

  return (
    <ul className="w-full flex justify-evenly gap-4 flex-row items-center">
      <li>
        <Link className={`link ${pathname === '/' ? 'active' : ''}`} href="/">
          Home
        </Link>
      </li>
      <li>
        <Link
          className={`link ${pathname === '/about' ? 'active' : ''}`} href="/about">
          About
        </Link>
      </li>
    </ul>
  )
}
