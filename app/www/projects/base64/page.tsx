import Base64Content from './content'
import { getPublicSiteURL } from '@/lib/url'
import { Metadata } from 'next'

// export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'base64',
  description: 'Docker multi-tenant, multi-protocol web servers.',
  alternates: {
    canonical: new URL('projects/base64', getPublicSiteURL())
  }
}

export default async function Base64Page(): Promise<JSX.Element> {
  return (
    <Base64Content />
  )
}
