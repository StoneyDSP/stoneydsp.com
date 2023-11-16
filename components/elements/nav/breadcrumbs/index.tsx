'use client'
import 'client-only'
import { usePathname } from 'next/navigation'
import { Suspense } from 'react'

export default function NavBreadcrumbs() {

  const pathname = usePathname()

  const addHome = 'home' + pathname

  const spacedSlashes = addHome.replaceAll(`/`, ` / &`).split(`&`)

  return (
    <Suspense>
      <span className='text-xs text-left'>
        {pathname && pathname !== '/' ? spacedSlashes : ''}
      </span>
    </Suspense>
  )
}