import {
  HRGradient,
  BackToHome,
  BackToTop
} from '@/components/layouts'
import styles from '@/app/layout.module.css'

export const dynamic = 'force-dynamic'

export default async function Contact() {

  return (
    <div className={styles.container}>

      <div className={styles.content}>

        <div className={styles.flexboxgrid}>

          <HRGradient />

          <BackToTop />

          <BackToHome />

          <HRGradient />

        </div>

      </div>

    </div>
  )
}
