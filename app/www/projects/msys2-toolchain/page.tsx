import MsystoolchainContent from '@/components/articles/projects/msys2toolchain'
import { getPublicSiteURL } from '@/lib/url'
import { Metadata } from 'next'

// export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Msys2-Toolchain',
  description: 'CMake build support for Msys64.',
  alternates: {
    canonical: new URL('projects/msys2-toolchain', getPublicSiteURL())
  }
}

export default async function MsystoolchainPage(): Promise<JSX.Element> {
  return (
    <MsystoolchainContent />
  )
}
