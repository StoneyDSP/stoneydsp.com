import OrfanidisbiquadContent from '@/app/projects/orfanidisbiquad/orfanidisbiquad'
import { Metadata } from 'next'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Orfanidis Biquad',
  description: 'Multi-mode Biquad filter for audio analysis purposes using variable BiLinear transforms, processing precision, and pre-warped co-efficients to achieve high-quality results.',
}

export default async function OrfanidisbiquadPage() {
  return (
    <OrfanidisbiquadContent />
  )
}
