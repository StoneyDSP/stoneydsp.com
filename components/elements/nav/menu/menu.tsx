// 'use client'
// import { usePathname } from 'next/navigation'
import Link from 'next/link'

export const paths = [
  {
    page: 'Projects',
    path: '/projects'
  },
  {
    page: 'About',
    path: '/about'
  },
  {
    page: 'Contact',
    path: '/contact'
  },
]

export default function NavMenu() {

  // const pathname = usePathname()

  return (
    <ul className="w-full flex justify-items-start gap-4 flex-row items-center">
      {paths.map(({ page, path }) => (
        <li key={page}>
          <Link
            href={path}
            className={`
              link
              py-2
              px-4
              rounded-md
              no-underline
              hover:no-underline
              text-foreground
              bg-btn-background
              hover:bg-btn-background-hover
              flex
              items-center
              group
              text-sm
              border

            `/** ${pathname === path ? 'active' : ''} */}
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
              className="mr-2 h-4 w-4 transition-transform group-hover:translate-y-1"
            >
              <polyline points="6 9 12 15 18 9" />
            </svg><span className='hover:no-underline'>|&nbsp;&nbsp;&nbsp;&nbsp;</span>{' '}{page}
          </Link>
        </li>
      ))}
    </ul>
  )
}
