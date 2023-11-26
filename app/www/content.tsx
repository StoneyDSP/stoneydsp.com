import { ResourceCards } from '@/components/cards'
import HRGradient from '@/components/layouts/HRGradient'
import BackToTop from '@/components/layouts/BackToTop'
import { Typography } from '@supabase/ui'
import { LogoWideL } from '@/components/icons/logo/wide'

const { Title, Text } = Typography

export default async function HomeContent() {

  // const nonce = headers().get('x-nonce')

  return (
    <>
      <HRGradient />

      <div className='flex flex-col justify-center'>
        <div className='items-center justify-center'>

          <Title level={1} className='animate-in text-center pb-8'>
              StoneyDSP
          </Title>

          <HRGradient />

          <LogoWideL />

          <HRGradient />

          <Text className='animate-in text-center italic'>
            <Title level={2} className='pt-8'>
              Systems, Web, Audio & Visual programming
            </Title>
          </Text>

        </div>
      </div>

      <HRGradient />

      <ResourceCards />

      <HRGradient />

      {/* <h2 className='animate-in text-center' tabIndex={0}>
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

      <HRGradient /> */}

      <BackToTop />

      <HRGradient />

    </>
  )
}
