import ConsentBanner from '@/components/elements/banner/consent'
import Main from '@/components/elements/main/main'
import { Suspense } from 'react'

export default function Template({
  children
}: {
  children: React.ReactNode
}): JSX.Element {

  return (
    <Suspense fallback={<p className='text-foreground'>Loading...</p>}>
      <Main>
        <ConsentBanner />
        {children}
      </Main>
    </Suspense>
  )
}
