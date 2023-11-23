import AudiopluginsvfContent from '@/components/articles/projects/audioplugin-svf'
import { Metadata } from 'next'

// export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Audioplugin-SVF',
  description: 'Multi-Mode State Variable Filter using TPT.',
  alternates: {
    canonical: 'https://www.stoneydsp.com/projects/audioplugin-svf'
  }
}

export default async function AudiopluginsvfPage() {
  return (
    <AudiopluginsvfContent />
  )
}
