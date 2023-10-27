import RepoCards from '@/components/cards/RepoCards/RepoCards'
import HRGradient from '@/components/layouts/HRGradient'
import TextLargeBoldCenter from '@/components/layouts/TextLargeBoldCenter'

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

        </div>

        <HRGradient />

      </div>

    </div>
  )
}
