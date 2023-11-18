'use client'
import 'client-only'
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
      <Suspense fallback={<>Loading...</>}>

        <div
          className='flex flex-col gap-8'
        >
          <ButtonBack />
          <ButtonLike />
        </div>
        
        {children}
      
      </Suspense>

    </article>
  )
}
