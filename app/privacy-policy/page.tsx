import PrivacyPolicyContent from '@/app/privacy-policy/pp_content'
import { Metadata } from 'next'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Privacy policy.',
  alternates: {
    canonical: 'https://www.stoneydsp.com/privacy-policy'
  }
}

export default async function PrivacyPolicyPage() {
  return (
    <PrivacyPolicyContent />
  )
}
