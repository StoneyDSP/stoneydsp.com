'use server'
import 'server-only'
import ButtonBack from '@/components/elements/button/back'
import ButtonLike from '@/components/elements/button/like'
import LoadingSpinner from '@/components/spinner/spinner'
import { Suspense } from 'react'

const BlogArticle = async ({
  children,
}: {
  children: React.ReactNode | Promise<React.ReactNode>
}) => {

  return (
    <section className='animate-in min-h-screen'>

      <div className='flex flex-col gap-8'>
        <ButtonBack />
        <ButtonLike />
      </div>

      <Suspense fallback={
        <main><LoadingSpinner /></main>
      }>
        {children}
      </Suspense>

    </section>
  )
}

export default BlogArticle
