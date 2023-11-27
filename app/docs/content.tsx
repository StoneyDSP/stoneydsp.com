import HRGradient from '@/components/layouts/HRGradient'
import BackToHome from '@/components/layouts/BackToHome'
import BackToTop from '@/components/layouts/BackToTop'
import { LogoWideL } from '@/components/icons/logo/wide'
import { Typography } from '@supabase/ui'

const { Title, Text } = Typography

export default async function DocsContent(): Promise<JSX.Element> {

  return (
    <>

      <HRGradient />

      <div className='flex flex-col items-center'>
        <Title level={1} className='animate-in w-2/3 text-center opacity-80 font-normal' /* tabIndex={0} */>
          Docs
        </Title>
      </div>

      <HRGradient />

      <Text className='animate-in text-center opacity-80 text-3xl' /* tabIndex={0} */>
        &ldquo;Under construction...&rdquo;
      </Text>

      <HRGradient />

      <LogoWideL />

      <HRGradient />

      <Text className='animate-in text-center opacity-80 text-3xl' /* tabIndex={0} */>
        &ldquo;...Check back soon!&rdquo;
      </Text>

      <HRGradient />

      <BackToTop />

      <BackToHome />

      <HRGradient />

    </>
  )
}
