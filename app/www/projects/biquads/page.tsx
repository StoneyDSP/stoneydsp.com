import BiquadsContent from './content'
import { getPublicSiteURL } from '@/lib/url'
import { Metadata } from 'next'

// export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Biquads',
  description: 'Multi-mode equalizer with variable BiLinear Tranformations and oversampling.',
  alternates: {
    canonical: new URL('projects/biquads', getPublicSiteURL())
  }
}

export default async function BiquadsPage(): Promise<JSX.Element> {
  return (
    <BiquadsContent />
  )
}
