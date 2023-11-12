'use server'
import {
  HRGradient,
  BackToHome,
  BackToTop
} from '@/components/layouts'
import RepoCards from '@/components/cards/RepoCards'
import styles from '@/app/layout.module.css'

// export const dynamic = 'force-dynamic'

export default async function ProjectsContent() {

  return (
    <div className={styles.container}>

      <article className={styles.content}>

        <div className={styles.flexboxgrid}>

          <h2 className='text-center'>
            Read about some of my most popular projects:
          </h2>

          <HRGradient />

          <RepoCards />

          <HRGradient />

          <BackToTop />

          <BackToHome />

          <HRGradient />

        </div>

      </article>

    </div>
  )
}
