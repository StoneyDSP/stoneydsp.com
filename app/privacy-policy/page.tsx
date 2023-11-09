import PrivacyPolicy from '@/app/privacy-policy/pp'
import { Metadata } from 'next'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Privacy Policy',
}

export default async function PrivacyPolicyPage() {
  return (
    <PrivacyPolicy />
  )
}
