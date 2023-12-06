// import Main from '@/components/elements/main/main'
import Header from '@/components/elements/header'
import Footer from '@/components/elements/footer'
import LoadingSpinner from '@/components/spinner/spinner'
// import { AuthWrapper } from '@/components/elements/banner/consent'
import { Suspense } from 'react'
import styles from '@/app/template.module.css'

export default async function Template({
  children
}: {
  children: React.ReactNode
}) {

  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Header />
      <main className='animate-spin-in'>
        <div className={styles.container}>
          <article className={styles.content}>
            <section className={styles.flexboxgrid}>
            <Suspense fallback={<LoadingSpinner />}>
              {children}
              {/* <AuthWrapper /> */}
              </Suspense>
            </section>
          </article>
        </div>
      </main>
      <Footer />
    </Suspense>
  )
}
