import ModulesContent from './content'
import { getPublicSiteURL } from '@/lib/url'
import { Metadata } from 'next'

// export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'modules',
  description: 'NodeJs C++ Addon for binary-compiling and serving static assets via CMakeRC.',
  alternates: {
    canonical: new URL('projects/modules', getPublicSiteURL())
  }
}

export default async function ModulesPage(): Promise<JSX.Element> {
  return (
    <ModulesContent />
  )
}
