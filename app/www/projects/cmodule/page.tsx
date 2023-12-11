import CmoduleContent from './content'
import { getPublicSiteURL } from '@/lib/url'
import { Metadata } from 'next'

// export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'cmodule',
  description: 'Multi-platform, multi-architecture NodeJs binary modules written in C/C++.',
  alternates: {
    canonical: new URL('projects/cmodule', getPublicSiteURL())
  }
}

export default async function CmodulePage(): Promise<JSX.Element> {
  return (
    <CmoduleContent />
  )
}
