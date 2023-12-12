import { Metadata } from 'next'
import { getPublicSiteURL } from '@/lib/url'

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
}
