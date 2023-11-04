import BilineareqContent from '@/app/projects/bilineareq/bilineareq'
import { Metadata } from 'next'

// export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'BiLinearEQ',
  description: 'A set of gentle 1st-order filter types for delicate emphasis/de-emphasis equalization of audio tracks.',
}

export default async function BilineareqPage() {
  return (
    <BilineareqContent />
  )
}
