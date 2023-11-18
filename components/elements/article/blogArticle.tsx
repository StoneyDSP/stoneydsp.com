'use client'
import 'client-only'
import {
  ButtonBack,
  ButtonLike
} from '@/components/elements'
import SpinnerRoot from '@/components/layouts/Spinner'
import { Suspense } from 'react'

export default function BlogArticle({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <section className='animate-in min-h-screen'>

      <Suspense fallback={<SpinnerRoot />}>

        <div
          className='flex flex-col gap-8'
        >
          <ButtonBack />
          <ButtonLike />
        </div>

        
        {children}

      </Suspense>

    </section>
  )
}
