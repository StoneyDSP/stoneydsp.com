// 'use client'
import { usePathname } from 'next/navigation'
import { Nav } from '@/components/elements'



export default function Header(
): JSX.Element {

  const pathname = usePathname()

  const addHome = 'home' + pathname

  const spacedSlashes = addHome.replaceAll(`/`, ` / &`).split(`&`)

  return (
    <header
      // className='absolute w-screen z-50'
    >
      <Nav />
      <span className='text-xs text-left'>
        {pathname && pathname !== '/' ? spacedSlashes : ''}
      </span>
    </header>
  )
}
