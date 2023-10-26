'use client'
import { usePathname } from 'next/navigation'
import Link from 'next/link'

export default function NavMenu() {

  const pathname = usePathname()

  return (
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
  )
}
