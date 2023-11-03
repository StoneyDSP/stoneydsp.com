import UbentoContent from '@/app/projects/ubento/ubento'
import { Metadata } from 'next'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'UBento',
}

export default async function BiquadsPage() {
  return (
    <UbentoContent />
  )
}
