import ConsentBanner from '@/components/elements/banner/consent'
import Main from '@/components/elements/main/main'
import LoadingSpinner from '@/components/spinner/spinner'
import { Suspense } from 'react'
import styles from '@/app/template.module.css'

export default function Template({
  children
}: {
  children: React.ReactNode
}): JSX.Element {

  return (
    <Suspense fallback={<main><p className='text-foreground text-center'>Loading... </p><LoadingSpinner /></main>}>
      <Main>
        <ConsentBanner />
        <div className={styles.container}>
          <article className={styles.content}>
            <section className={styles.flexboxgrid}>
              {children}
            </section>
          </article>
        </div>
      </Main>
    </Suspense>
  )
}
