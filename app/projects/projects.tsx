import {
  HRGradient,
  BackToHome,
  BackToTop
} from '@/components/layouts'
import RepoCards from '@/components/cards/RepoCards/RepoCards'
import styles from '@/app/layout.module.css'

export const dynamic = 'force-dynamic'

export default async function Projects() {

  return (
    <div className={styles.container}>

      <div className={styles.content}>

        <div className={styles.flexboxgrid}>

          {/* <div className='tableRowOdd py-0 text-center'>
            <div className='pt-0 pb-1'>
            <HRGradient />
            </div>
          </div> */}

          <HRGradient />

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

      </div>

    </div>
  )
}
