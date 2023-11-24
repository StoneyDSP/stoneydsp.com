import NonlinearfiltersContent from '@/components/articles/projects/nonlinearfilters'
import { getPublicSiteURL } from '@/utils/headers/URL'
import { Metadata } from 'next'

// export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'NonLinearFilters',
  description: 'A collection of Non-Linear filter topologies.',
  alternates: {
    canonical: new URL('projects/nonlinearfilters', getPublicSiteURL())
  }
}

export default async function NonLinearFiltersPage(): Promise<JSX.Element> {
  return (
    <NonlinearfiltersContent />
  )
}
