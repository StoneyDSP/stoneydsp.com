import MsystoolchainContent from '@/app/projects/msys2-toolchain/msys2-toolchain_content'
import { Metadata } from 'next'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Msys2-Toolchain',
  description: 'CMake build support for Msys64.',
  alternates: {
    canonical: 'https://www.stoneydsp.com/projects/msys2-toolchain'
  }
}

export default async function MsystoolchainPage() {
  return (
    <MsystoolchainContent />
  )
}
