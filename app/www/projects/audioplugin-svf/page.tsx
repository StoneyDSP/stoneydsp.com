import AudiopluginsvfContent from '@/components/articles/projects/audioplugin-svf'
import { getPublicSiteURL } from '@/lib/url'
import { Metadata } from 'next'

// export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Audioplugin-SVF',
  description: 'Multi-Mode State Variable Filter using TPT.',
  alternates: {
    canonical: new URL('projects/audioplugin-svf', getPublicSiteURL())
  }
}

export default async function AudiopluginsvfPage(): Promise<JSX.Element> {
  return (
    <AudiopluginsvfContent />
  )
}
