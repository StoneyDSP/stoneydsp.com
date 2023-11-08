import BiquadsContent from '@/app/projects/biquads/biquads_content'
import { Metadata } from 'next'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Biquads',
  description: 'Simple two-pole equalizer with variable oversampling.',
}

export default async function BiquadsPage() {
  return (
    <BiquadsContent />
  )
}
