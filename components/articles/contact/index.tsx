'use server'
import {
  HRGradient,
  BackToHome,
  BackToTop
} from '@/components/layouts'
import { ContactForm } from '@/components/elements'
import styles from '@/app/layout.module.css'

export default async function ContactContent() {

  return (
    <div className={styles.container}>

      <article className={styles.content}>

        <div className={styles.flexboxgrid}>

          <h2 className='text-center' tabIndex={0}>
            Hi! I&#39;m Nathan, a.k.a StoneyDSP.
          </h2>

          <HRGradient />

          <ContactForm />

          <HRGradient />

          <HRGradient />

          <BackToTop />

          <BackToHome />

          <HRGradient />

        </div>

      </article>

    </div>
  )
}
