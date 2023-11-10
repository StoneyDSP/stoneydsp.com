import NonlinearfiltersContent from '@/app/projects/nonlinearfilters/nonlinearfilters_content'
import { Metadata } from 'next'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'NonLinearFilters',
  description: 'A collection of Non-Linear filter topologies.',
  alternates: {
    canonical: 'https://www.stoneydsp.com/projects/nonlinearfilters'
  }
}

export default async function NonLinearFiltersPage() {
  return (
    <NonlinearfiltersContent />
  )
}
