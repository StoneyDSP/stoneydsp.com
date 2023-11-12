import CmoduleContent from './cmodule_content'
import { Metadata } from 'next'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'cmodule',
  description: 'Multi-platform, multi-architecture NodeJs binary modules written in C/C++.',
  alternates: {
    canonical: 'https://www.stoneydsp.com/projects/cmodule'
  }
}

export default async function CmodulePage() {
  return (
    <CmoduleContent />
  )
}
