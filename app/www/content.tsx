import 'server-only'
import { ResourceCards } from '@/components/cards'
import HRGradient from '@/components/layouts/HRGradient'
import BackToTop from '@/components/layouts/BackToTop'
import { LogoWideL } from '@/components/icons/logo/wide'
// import { Title, Text } from '@/lib/Typography'

export default async function HomeContent(): Promise<JSX.Element> {

    return (
      <>
        <HRGradient />

        <div className='flex flex-col justify-center'>
          <div className='items-center justify-center'>

            <h1 className='animate-in text-center pb-8 drop-shadow'>
                StoneyDSP
            </h1>

            <HRGradient />

            <div className='animate-spin'>
              <LogoWideL />
            </div>

            <HRGradient />

            <h2 className='pt-8 text-center italic drop-shadow'>
              Systems, Web, Audio & Visual programming
            </h2>

          </div>
        </div>

        <HRGradient />

        <ResourceCards />

        <HRGradient />

        <BackToTop />

        <HRGradient />

      </>
    )
}
