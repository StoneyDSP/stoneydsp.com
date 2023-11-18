import { Nav } from '@/components/elements'
import NavBreadcrumbs from '@/components/elements/nav/breadcrumbs'

export default async function Header() {

  return (
    <header>
      <Nav />
      <NavBreadcrumbs />
    </header>
  )
}
