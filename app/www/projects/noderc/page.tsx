import NodercContent from './content'
import { getPublicSiteURL } from '@/lib/url'
import { Metadata } from 'next'

// export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'noderc',
  description: 'CMakeRC as a NodeJS C++ Addon. Serve a binary-compiled embedded filesystem as a Javascript object in NodeJS.',
  alternates: {
    canonical: new URL('projects/noderc', getPublicSiteURL())
  }
}

export default async function NodercPage(): Promise<JSX.Element> {
  return (
    <NodercContent />
  )
}
