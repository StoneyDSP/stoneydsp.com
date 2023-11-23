import 'server-only'
import Nav from '@/components/elements/nav/nav'
import NavBreadcrumbs from '@/components/elements/nav/breadcrumbs'

export default async function Header(): Promise<JSX.Element> {

  return (
    <header>
      <Nav />
      <NavBreadcrumbs />
    </header>
  )
}
