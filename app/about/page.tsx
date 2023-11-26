import AboutContent from './content'
import { getPublicSiteURL } from '@/utils/headers/URL'
import { Metadata } from 'next'

// export const dynamic = 'force-dynamic'

export const title = 'About'
export const description = 'Systems, Web, Audio & Graphics'
export const canonical = new URL('about', getPublicSiteURL())

export const metadata: Metadata = {
  title: title,
  description: description,
  alternates: {
    canonical: canonical
  }
}

export default async function AboutPage(): Promise<JSX.Element> {
  return (
    <AboutContent />
  )
}
