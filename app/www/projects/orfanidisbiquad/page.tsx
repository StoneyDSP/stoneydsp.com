import OrfanidisbiquadContent from './content'
import { getPublicSiteURL } from '@/lib/url'
import { Metadata } from 'next'

// export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Orfanidis Biquad',
  description: 'De-cramped digital filter design.',
  alternates: {
    canonical: new URL('projects/orfanidisbiquad', getPublicSiteURL())
  }
}

export default async function OrfanidisbiquadPage(): Promise<JSX.Element> {
  return (
    <OrfanidisbiquadContent />
  )
}
