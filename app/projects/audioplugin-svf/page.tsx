import AudiopluginsvfContent from '@/app/projects/audioplugin-svf/audioplugin-svf'
import { Metadata } from 'next'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Audioplugin-SVF',
  description: 'Simple Multi-Mode State Variable Filter using TPT, built directly from the StoneyDSP AudioPlugin template repository and the juce State Variable TPT Filter module (with a few mods)...',
}

export default async function AudiopluginsvfPage() {
  return (
    <AudiopluginsvfContent />
  )
}
