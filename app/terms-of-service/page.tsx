import TermsOfService from '@/app/terms-of-service/tos'
import { Metadata } from 'next'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Terms Of Service',
}

export default async function TermsOfServicePage() {
  return (
    <TermsOfService />
  )
}
