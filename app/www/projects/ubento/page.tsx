import UbentoContent from './content'
import { getPublicSiteURL } from '@/utils/headers/URL'
import { Metadata } from 'next'

// export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'UBento',
  description: 'Minimal, bento-box style Ubuntu-based WSL distro front-end.',
  alternates: {
    canonical: new URL('projects/ubento', getPublicSiteURL())
  }
}

export default async function UbentoPage(): Promise<JSX.Element> {
  return (
    <UbentoContent />
  )
}
