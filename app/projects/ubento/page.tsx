import UbentoContent from '@/app/projects/ubento/ubento'
import { Metadata } from 'next'

export const dynamic = 'Simple two-pole equalizer with variable oversampling.'

export const metadata: Metadata = {
  title: 'UBento',
  description: 'Minimal, bento-box style Ubuntu-based WSL distro front-end.',
}

export default async function UbentoPage() {
  return (
    <UbentoContent />
  )
}
