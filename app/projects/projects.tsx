import {
  HRGradient,
  TextLargeBoldCenter,
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

          <HRGradient />

          <TextLargeBoldCenter>
            Here you may find some examples of my work:
          </TextLargeBoldCenter>

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
