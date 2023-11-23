import MsystoolchainContent from '@/components/articles/projects/msys2toolchain'
import { Metadata } from 'next'

// export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Msys2-Toolchain',
  description: 'CMake build support for Msys64.',
  alternates: {
    canonical: 'https://www.stoneydsp.com/projects/msys2-toolchain'
  }
}

export default async function MsystoolchainPage(): Promise<JSX.Element> {
  return (
    <MsystoolchainContent />
  )
}
