import HomeContent from './content'
import LoadingSpinner from '@/components/layouts/Spinner'
import { getPublicSiteURL } from '@/lib/url'
import { Metadata } from 'next'
import { Suspense } from 'react'
// import { cookies } from 'next/headers'

// export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  description: 'Systems, Web, Audio & Graphics',
  alternates: {
    canonical: new URL(getPublicSiteURL())
  },

}

export default async function HomePage(): Promise<JSX.Element> {

  return (
    <Suspense fallback={<LoadingSpinner />}>
      <HomeContent />
    </Suspense>
  )
}
