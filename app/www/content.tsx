import {
  GitStatsCard,
  GitStatsTopLangsCard,
  RepoCards,
  ResourceCards
} from '@/components/cards'
import HRGradient from '@/components/layouts/HRGradient'
import BackToTop from '@/components/layouts/BackToTop'
// import { LogoWideXL } from '@/components/icons/logo/wide'

export default async function HomeContent() {

  // const nonce = headers().get('x-nonce')

  return (
    <>
      <HRGradient />

      <h2 className='animate-in text-center' tabIndex={0}>
        StoneyDSP
      </h2>

      <HRGradient />

      <ResourceCards />

      <HRGradient />

      <h2 className='animate-in text-center' tabIndex={0}>
        Welcome to my workbench.
      </h2>

      <HRGradient />

      <div className='flex justify-center align-middle items-center'>
        <GitStatsCard />
      </div>

      <HRGradient />

      <div className='flex justify-center align-middle items-center'>
        <GitStatsTopLangsCard />
      </div>

      <HRGradient />

      <RepoCards />

      {/* </div> */}

      <HRGradient />

      <BackToTop />

      <HRGradient />

      {/* </article>

    </div>*/}
    </>
  )
}
