import HRGradient from '@/components/layouts/HRGradient'
import BackToHome from '@/components/layouts/BackToHome'
import BackToTop from '@/components/layouts/BackToTop'
import RepoCards from '@/components/cards/RepoCards'
import Link from 'next/link'
import { Typography } from '@supabase/ui'

const { Title, Text } = Typography

export default async function ProjectsContent() {

  return (
    <>

      <HRGradient />

      <Title level={1} className='animate-in text-center opacity-80 font-bold' /* tabIndex={0} */>
        Welcome to my workbench.
      </Title>

      <HRGradient />

      <Text className='animate-in text-center opacity-80' /* tabIndex={0} */>
        Read about some of my most popular projects here...
      </Text>

      <HRGradient />

      <RepoCards />

      <HRGradient />

      <Text className='animate-in text-center opacity-80' /* tabIndex={0} */>
        ...and <Link href="/contact">let me know what you think</Link>!
      </Text>

      <HRGradient />

      <BackToTop />

      <BackToHome />

      <HRGradient />

    </>
  )
}
