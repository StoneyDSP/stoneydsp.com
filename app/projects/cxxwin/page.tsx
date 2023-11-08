import CxxwinContent from '@/app/projects/cxxwin/cxxwin'
import { Metadata } from 'next'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'CxxWin',
  description: 'Win32API project implementing a COM application window for Windows platforms in C++ using Direct2D.',
}

export default async function CxxWinPage() {
  return (
    <CxxwinContent />
  )
}
