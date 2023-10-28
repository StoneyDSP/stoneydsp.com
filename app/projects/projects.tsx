import {
  HRGradient,
  TextLargeBoldCenter,
  BackToHome
} from '@/components/layouts'
import RepoCards from '@/components/cards/RepoCards/RepoCards'
import styles from './projects.module.css'

export const dynamic = 'force-dynamic'

export default async function Projects() {

  return (
    <div className={styles.container}>

      <div className={styles.content}>

        <div className="flex flex-col gap-8 bg-background text-foreground">

          <HRGradient />

          <TextLargeBoldCenter>
            Here you may find some examples of my work:
          </TextLargeBoldCenter>

          <HRGradient />

          <RepoCards />

          <HRGradient />

          <BackToHome />

          <HRGradient />

        </div>

      </div>

    </div>
  )
}
