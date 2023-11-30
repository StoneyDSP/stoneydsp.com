'use client'
import 'client-only'
import { usePathname } from 'next/navigation'

export default function NavBreadcrumbs(): JSX.Element {

  const pathname = usePathname()

  const addHome = 'home' + pathname

  const spacedSlashes = addHome.replaceAll(`/`, ` / &`).split(`&`)

  return (
    <span className='text-xs text-left'>
      {pathname && pathname !== '/' ? spacedSlashes : ''}
    </span>
  )
}
