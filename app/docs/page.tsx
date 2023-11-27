import DocsContent from './content'
import { getPublicSiteURL } from '@/utils/headers/URL'
import { Metadata } from 'next'

// export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Docs',
  description: 'Systems, Web, Audio & Graphics',
  alternates: {
    canonical: new URL('docs', getPublicSiteURL())
  }
}

export default async function DocsPage(): Promise<JSX.Element> {
  return (
    <DocsContent />
  )
}
