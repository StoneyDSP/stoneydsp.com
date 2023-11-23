'use client'
import 'client-only'
import ButtonBack from '@/components/elements/button/back'
import ButtonLike from '@/components/elements/button/like'
import { Suspense } from 'react'

export default function Article({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <article className='animate-in min-h-screen'>

      <div className='flex flex-col gap-8'>
        <ButtonBack />
        <ButtonLike />
      </div>

      <Suspense fallback={<span className='text-foreground'>Loading article...</span>}>
        {children}

      </Suspense>

    </article>
  )
}
