'use client'
import { usePathname } from 'next/navigation'
import Link from 'next/link'

export default function NavMenu() {

  const pathname = usePathname()

  return (
    <ul className="w-full flex justify-items-start gap-4 flex-row items-center">
      <li>
        <Link
          href="/projects"
          className={`link ${pathname === '/projects' ? 'active' : ''} py-2 px-3 flex rounded-md no-underline transition-colors`}
        >
          Projects
        </Link>
      </li>
      <li>
        <Link
          href="/about"
          className={`link ${pathname === '/about' ? 'active' : ''} py-2 px-3 flex rounded-md no-underline transition-colors`}
          >
          About
        </Link>
      </li>
      <li>
        <Link
          href="/contact"
          className={`link ${pathname === '/contact' ? 'active' : ''} py-2 px-3 flex rounded-md no-underline transition-colors`}
          >
          Contact
        </Link>
      </li>
    </ul>
  )
}
