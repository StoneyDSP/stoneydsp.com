import BilineareqContent from '@/components/articles/projects/bilineareq'
import { getPublicSiteURL } from '@/lib/url'
import { Metadata } from 'next'

// export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'BiLinearEQ',
  description: 'A set of gentle 1st-order filters.',
  alternates: {
    canonical: new URL('projects/bilineareq', getPublicSiteURL())
  }
}

export default async function BilineareqPage(): Promise<JSX.Element> {
  return (
    <BilineareqContent />
  )
}
