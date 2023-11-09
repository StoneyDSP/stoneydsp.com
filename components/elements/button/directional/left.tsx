'use client'
import { usePathname } from 'next/navigation'

export default function ButtonDirectionLeft() {

  const pathname = usePathname()

  return (
    <a
      href="/"
      className={`link ${pathname === '/' ? 'active' : ''} py-2 px-4 rounded-md no-underline text-foreground bg-btn-background hover:bg-btn-background-hover flex items-center group text-sm transition___shadow_off`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1"
      >
        <polyline points="15 18 9 12 15 6" />
      </svg>{' '}
      Left
    </a>
  )
}
