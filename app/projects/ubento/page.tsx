import UbentoContent from '@/app/projects/ubento/ubento'
import { Metadata } from 'next'

// export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'UBento',
  description: 'Minimal, bento-box style Ubuntu-based WSL distro front-end.',
}

export default async function UbentoPage() {
  return (
    <UbentoContent />
  )
}
