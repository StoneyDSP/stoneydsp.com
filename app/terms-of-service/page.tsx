import TermsOfService from '@/app/terms-of-service/tos'
import { Metadata } from 'next'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Terms Of Service',
  description: 'Terms of service.',
  alternates: {
    canonical: 'https://www.stoneydsp.com/terms-of-service'
  }
}

export default async function TermsOfServicePage() {
  return (
    <TermsOfService />
  )
}
