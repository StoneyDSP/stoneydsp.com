import { usePathname } from 'next/navigation'
import { Nav } from '@/components/elements'
import NavBreadcrumbs from '@/components/elements/nav/breadcrumbs'
// import { Suspense } from 'react'

export default async function Header() {

  const pathname = usePathname()

  const addHome = 'home' + pathname

  const spacedSlashes = addHome.replaceAll(`/`, ` / &`).split(`&`)

  return (
    <header>
      <Nav />
      <NavBreadcrumbs />
    </header>
  )
}
