import CxxwinContent from './content'
import { getPublicSiteURL } from '@/lib/url'
import { Metadata } from 'next'

// export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'CxxWin',
  description: 'Win32API project implementing a simple COM application window.',
  alternates: {
    canonical: new URL('projects/cxxwin', getPublicSiteURL())
  }
}

export default async function CxxWinPage(): Promise<JSX.Element> {
  return (
    <CxxwinContent />
  )
}
