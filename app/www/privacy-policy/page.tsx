import PrivacyPolicyContent from './content'
import { getPublicSiteURL } from '@/lib/url'
import { Metadata } from 'next'

// export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Privacy policy.',
  alternates: {
    canonical: new URL('privacy-policy', getPublicSiteURL())
  }
}

export default async function PrivacyPolicyPage(): Promise<JSX.Element> {
  return (
    <PrivacyPolicyContent />
  )
}
