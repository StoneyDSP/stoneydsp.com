import OrfanidisbiquadContent from '@/components/articles/projects/orfanidisbiquad'
import { Metadata } from 'next'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Orfanidis Biquad',
  description: 'De-cramped digital filter design.',
  alternates: {
    canonical: 'https://www.stoneydsp.com/projects/orfanidisbiquad'
  }
}

export default async function OrfanidisbiquadPage() {
  return (
    <OrfanidisbiquadContent />
  )
}
