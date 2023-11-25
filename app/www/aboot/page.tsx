import AbootContent from './content'
import { getPublicSiteURL } from '@/utils/headers/URL'
import { Metadata } from 'next'

// export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'About',
  description: 'Systems, Web, Audio & Graphics',
  alternates: {
    canonical: new URL('about', getPublicSiteURL())
  }
}

export default async function AbootPage(): Promise<JSX.Element> {
  return (
    <AbootContent />
  )
}
