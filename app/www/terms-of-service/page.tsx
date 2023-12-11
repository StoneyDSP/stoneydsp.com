import TermsOfServiceContent from '@/components/articles/terms-of-service'
import { getPublicSiteURL } from '@/lib/url'
import { Metadata } from 'next'

// export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Terms Of Service',
  description: 'Terms of service.',
  alternates: {
    canonical: new URL('terms-of-service', getPublicSiteURL())
  }
}

export default async function TermsOfServicePage(): Promise<JSX.Element> {
  return (
    <TermsOfServiceContent />
  )
}
