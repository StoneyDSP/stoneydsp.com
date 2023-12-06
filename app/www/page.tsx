import HomeContent from './content'
import LoadingSpinner from '@/components/layouts/Spinner'
import { getPublicSiteURL } from '@/utils/headers/URL'
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

  try {

    return (
      <Suspense fallback={<LoadingSpinner />}>
        <HomeContent />
      </Suspense>
    )

  } catch(e) {

    const error: any = e
    console.log(` \u{2715} HomePage() - :: Error returning new Home Page: ${error}`)
    throw new Error(error)
  }
}
