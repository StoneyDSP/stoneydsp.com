import NonlinearfiltersContent from '@/app/projects/nonlinearfilters/nonlinearfilters'
import { Metadata } from 'next'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'NonLinearFilters',
  description: 'A collection of Non-Linear filters of various topologies and types, for analysis and occasional mixing/production uses.',
}

export default async function NonLinearFiltersPage() {
  return (
    <NonlinearfiltersContent />
  )
}
