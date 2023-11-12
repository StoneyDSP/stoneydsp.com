'use server'
import {
  GitStatsCard,

  RepoCards,
  ResourceCards
} from '@/components/cards'
import {
  Ribbon,
  HRGradient,
  BackToTop
} from '@/components/layouts'
import styles from '@/app/layout.module.css'

// export const dynamic = 'force-dynamic'

export default async function HomeContent() {

  // const nonce = headers().get('x-nonce')

  return (

    <div className={styles.container}>

      <article className={styles.content}>

        <div className={styles.flexboxgrid}>

          <HRGradient />

          <h2 className='animate-in text-center'>
            Hi! I&#39;m Nathan, a.k.a StoneyDSP.
          </h2>

          <HRGradient />

          <ResourceCards />

          <HRGradient />

          <h2 className='animate-in text-center'>
            Welcome to my workbench.
          </h2>

          <HRGradient />

          <GitStatsCard />

          <HRGradient />

          <RepoCards />

        </div>

        <HRGradient />

        <BackToTop />

        <HRGradient />

      </article>

    </div>
  )
}
