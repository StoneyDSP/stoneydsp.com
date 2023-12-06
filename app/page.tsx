import { Metadata } from 'next'
import { getPublicSiteURL } from '@/utils/headers/URL'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'StoneyDSP',
  description: 'Systems, Web, Audio & Graphics',
  alternates: {
    canonical: new URL('/', getPublicSiteURL())
  }
}

export default function Page({
  searchParams,
}: {
  searchParams: { message: string }
}) {

  const message = searchParams?.message

  try {

    return (
      <main>
        <h1>StoneyDSP</h1>
        {message && (
          <p className="mt-4 p-4 bg-foreground/10 text-foreground text-center">
            {message}
          </p>
        )}
      </main>
    )

  } catch(e) {

    const error: any = e
    console.log(` \u{2715} :: Error returning new ${metadata.title} Page: ${error}`)
    throw new Error(error)
  }
}
