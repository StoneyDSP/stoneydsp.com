import BiquadsContent from '@/components/articles/projects/biquads'
import { Metadata } from 'next'

// export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Biquads',
  description: 'Multi-mode equalizer with variable BiLinear Tranformations and oversampling.',
  alternates: {
    canonical: 'https://www.stoneydsp.com/projects/biquads'
  }
}

export default async function BiquadsPage() {
  return (
    <BiquadsContent />
  )
}
