import {
  RepoCards,
  ResourceCards
} from '@/components/cards'
import {
  Ribbon,
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

          {/* <div className='animate-in tableRowOdd py-0 text-center'>
            <div className='animate-in pt-0 pb-1'>
            <HRGradient />
            </div>
          </div> */}

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

          <RepoCards />

        </div>

        <HRGradient />

        <BackToTop />

        <HRGradient />

      </div>

    </div>
  )
}
