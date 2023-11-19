'use server'
import 'server-only'
import { Nav } from '@/components/elements'
import NavBreadcrumbs from '@/components/elements/nav/breadcrumbs'
import { Suspense } from 'react'

export default async function Header() {

  return (
    <header>
      <Suspense fallback={<span className='text-foreground'>Loading nav...</span>}>
        <Nav />
        <NavBreadcrumbs />
      </Suspense>
    </header>
  )
}
