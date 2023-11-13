'use client'
import {
  ButtonBack,
  ButtonLike
} from '@/components/elements'
import { Suspense } from 'react'

export default function Article({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <article className='animate-in min-h-screen'>

      <div
        className='flex flex-col gap-8'
      >
        <ButtonBack />
        <ButtonLike />
      </div>

      <Suspense fallback={<>Loading...</>}>
        {children}
      </Suspense>

    </article>
  )
}
