import 'server-only'
import Nav from '@/components/elements/nav/nav'
import NavBreadcrumbs from '@/components/elements/nav/breadcrumbs'
import { Suspense } from 'react'

export default async function Header() {

  return (
    <header>
        <Nav />
        <NavBreadcrumbs />
    </header>
  )
}
