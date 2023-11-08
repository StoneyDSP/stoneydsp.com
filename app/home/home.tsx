import {
  RepoCards,
  ResourceCards
} from '@/components/cards'
import {
  HRGradient,
  TextLargeBoldCenter,
  BackToTop
} from '@/components/layouts'
// import Image from 'next/image'
// import { headers } from 'next/headers'
import styles from '@/app/layout.module.css'

export const dynamic = 'force-dynamic'

export default async function Home() {

  // const nonce = headers().get('x-nonce')

  return (
    <div className={styles.container}>

      <div className={styles.content}>

        <div className={styles.flexboxgrid}>

          <HRGradient />

          <TextLargeBoldCenter>
            Hi! I&#39;m Nathan, a.k.a StoneyDSP.
          </TextLargeBoldCenter>

          <HRGradient />

          <ResourceCards />

          <HRGradient />

          <TextLargeBoldCenter>
            Here are some examples of my work:
          </TextLargeBoldCenter>

          <HRGradient />

          <RepoCards />

        </div>

        <HRGradient />

        <BackToTop />

        <HRGradient />

      </div>

    </div>
  )
}
