'use client'
import { usePathname } from 'next/navigation'
import Link from 'next/link'

import '@/app/globals.css'

export default function NavBar() {
  const pathname = usePathname()

  return (
    <nav className="flex justify-evenly flex-row items-center">
      <ul className="w-full flex justify-evenly gap-8 flex-row items-center">
        <li>
          <Link className={`link ${pathname === '/' ? 'active' : ''}`} href="/">
            Home
          </Link>
        </li>
        <li>
          <Link
            className={`link ${pathname === '/example' ? 'active' : ''}`} href="/example">
            Example
          </Link>
        </li>
      </ul>
    </nav>
  )
}
