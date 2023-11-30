import PrivacyPolicyContent from '@/components/articles/privacy-policy'
import { getPublicSiteURL } from '@/utils/headers/URL'
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
