'use client'
import 'client-only'
import { usePathname } from 'next/navigation'
import { Nav } from '@/components/elements'
import { Suspense } from 'react'

export default function Header(
): JSX.Element {

  const pathname = usePathname()

  const addHome = 'home' + pathname

  const spacedSlashes = addHome.replaceAll(`/`, ` / &`).split(`&`)

  return (
    <header
      // className='absolute w-screen z-50'
    >
      <Suspense >
        <Nav />
      </Suspense>
      <span className='text-xs text-left'>
        {pathname && pathname !== '/' ? spacedSlashes : ''}
      </span>
    </header>
  )
}
