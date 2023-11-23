import BilineareqContent from '@/components/articles/projects/bilineareq'
import { Metadata } from 'next'

// export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'BiLinearEQ',
  description: 'A set of gentle 1st-order filters.',
  alternates: {
    canonical: 'https://www.stoneydsp.com/projects/bilineareq'
  }
}

export default async function BilineareqPage(): Promise<JSX.Element> {
  return (
    <BilineareqContent />
  )
}
