import UbentoContent from '@/components/articles/projects/ubento'
import { Metadata } from 'next'

// export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'UBento',
  description: 'Minimal, bento-box style Ubuntu-based WSL distro front-end.',
  alternates: {
    canonical: 'https://www.stoneydsp.com/projects/ubento'
  }
}

export default async function UbentoPage(): Promise<JSX.Element> {
  return (
    <UbentoContent />
  )
}
