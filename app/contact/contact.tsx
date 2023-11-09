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

          {/* <div className='tableRowOdd py-0 text-center'>
            <div className='pt-0 pb-1'>
            <HRGradient />
            </div>
          </div> */}

          <h2 className='text-center'>
            Hi! I&#39;m Nathan, a.k.a StoneyDSP.
          </h2>

          <HRGradient />

          <HRGradient />

          <BackToTop />

          <BackToHome />

          <HRGradient />

        </div>

      </div>

    </div>
  )
}
