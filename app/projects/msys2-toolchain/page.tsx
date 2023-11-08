import MsystoolchainContent from '@/app/projects/msys2-toolchain/msys2-toolchain_content'
import { Metadata } from 'next'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Msys2-Toolchain',
  description: 'Full CMake build support for all Msys64 sub-systems, with optional vcpkg integration.',
}

export default async function MsystoolchainPage() {
  return (
    <MsystoolchainContent />
  )
}
