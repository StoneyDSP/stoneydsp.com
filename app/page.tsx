import HomeContent from './content'
import { getPublicSiteURL } from '@/utils/headers/URL'
import { Metadata } from 'next'
// import { cookies } from 'next/headers'

// export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  description: 'Systems, Web, Audio & Graphics',
  alternates: {
    canonical: new URL(getPublicSiteURL())
  },

}

export default async function Index(): Promise<JSX.Element> {

  // console.log(` \u{25CB} Index() :: Returning new Index Page... `)

  try {

    // console.log(` \u{2713} Index() :: Returned new Index Page. `)

    return (
      <HomeContent />
    )

  } catch(e) {

    const error: any = e
    console.log(` \u{2715} Index() - :: Error returning new Index Page: ${error}`)
    throw new Error(error)
  }
}
