import BiquadsContent from '@/app/projects/biquads/biquads'
import { Metadata } from 'next'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Biquads',
}

export default async function BiquadsPage() {
  return (
    <BiquadsContent />
  )
}
