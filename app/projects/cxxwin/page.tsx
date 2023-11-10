import CxxwinContent from '@/app/projects/cxxwin/cxxwin_content'
import { Metadata } from 'next'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'CxxWin',
  description: 'Win32API project implementing a simple COM application window.',
  alternates: {
    canonical: 'https://www.stoneydsp.com/projects/cxxwin'
  }
}

export default async function CxxWinPage() {
  return (
    <CxxwinContent />
  )
}
