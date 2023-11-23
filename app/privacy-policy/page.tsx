import PrivacyPolicyContent from '@/components/articles/privacy-policy'
import { Metadata } from 'next'

// export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Privacy policy.',
  alternates: {
    canonical: 'https://www.stoneydsp.com/privacy-policy'
  }
}

export default async function PrivacyPolicyPage(): Promise<JSX.Element> {
  return (
    <PrivacyPolicyContent />
  )
}
