import HostconfigContent from './content'
import { getPublicSiteURL } from '@/lib/url'
import { Metadata } from 'next'

// export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'hostconfig',
  description: 'Docker multi-tenant, multi-protocol web servers.',
  alternates: {
    canonical: new URL('projects/hostconfig', getPublicSiteURL())
  }
}

export default async function HostconfigPage(): Promise<JSX.Element> {
  return (
    <HostconfigContent />
  )
}
