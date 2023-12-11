import AboutContent from './content'
import { getPublicSiteURL } from '@/lib/url'
import { Metadata } from 'next'

// export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'About',
  description: 'Systems, Web, Audio & Graphics',
  alternates: {
    canonical: new URL('about', getPublicSiteURL())
  }
}

export default async function AboutPage(): Promise<JSX.Element> {
  return (
    <AboutContent />
  )
}
